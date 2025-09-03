<?PHP
header_remove();
if( !headers_sent() ){
foreach(headers_list() as $header){
list($header) = explode(":", $header);
$header = trim($header);                            // eTron($header);
header_remove($header);
}
}
header('Content-Type: text/event-stream; charset=UTF-8');
header('Cache-Control: no-cache');
header("Content-Encoding: none");
ob_end_clean();
ob_flush();
$pid = getmypid();
SYS::sessionClose();
if( function_exists("cli_set_process_title") ){
cli_set_process_title("event-source");
}
if( empty(SESS::$var["streamer"]) ){
eTron('Error variable "SESS::$var[\'streamer\']" no definida');
eEnd();
}
$file = eScript(SESS::$var["streamer"]);
if( !file_exists($file) ){
eTron('Fichero "'.$file.'" no encontrado, definido en "SESS::$var[\'streamer\']"');
eEnd();
}
include($file);
class streamerClient {
public static $instance = null;
public static $start = null;
public static $message = null;
public static $finish = null;
public static $sleepSeconds = 3;
public static $secondsLife = 300;
public static $refresh = 0;
public static $refreshStep = 60;
public static $startProcessing;
public static $endProcessing;
public static $shm_size = 20;
public static $shm_id = null;
public static $shm_last = "";
public static function setup($start=null, $message, $finish=null, $sleepSeconds=3, $secondsLife=-1){
streamerClient::$start   = $start;
streamerClient::$message = $message;
streamerClient::$finish  = $finish;
streamerClient::$sleepSeconds = $sleepSeconds;
streamerClient::$secondsLife  = $secondsLife;
streamerClient::$startProcessing = time();
if( $secondsLife==-1 ){
streamerClient::$endProcessing = -1;
}else{
streamerClient::$endProcessing = streamerClient::$startProcessing+$secondsLife;
}
if( streamerClient::$refreshStep < $sleepSeconds ){
streamerClient::$refreshStep = $sleepSeconds*1.2;
}
if( $sleepSeconds==-1 ){
streamerClient::$shm_id = shmop_open(0xff3, "c", 0644, streamerClient::$shm_size);
}
streamerClient::waiting();
}
public static function waiting(){
$md5MessageLast = "";
streamerClient::executeFunction(streamerClient::$start);
while( streamerClient::$endProcessing==-1 || streamerClient::$endProcessing > time() ){
if( connection_aborted() ){
break;
}
if( connection_status()!=0 ){
break;
}
$message = streamerClient::executeFunction(streamerClient::$message);
if( $message==null ){
$message = [["message"=>"ok"]];
}else if( $message=="close" ){
streamerClient::sendMessage([["message"=>"close"]]);
break;
}
$md5Message = md5(serialize($message));
if( $md5MessageLast==$md5Message ){
$message = [["message"=>"ok"]];
}
$md5MessageLast = $md5Message;
streamerClient::sendMessage($message);
streamerClient::refreshLife();
if( streamerClient::$sleepSeconds==-1 ){
while( streamerClient::$endProcessing==-1 || streamerClient::$endProcessing > time() ){
if( connection_aborted() ){
break 2;
}
if( connection_status()!=0 ){
break 2;
}
usleep(1000000);
streamerClient::refreshLife();
}
}else{
sleep(streamerClient::$sleepSeconds);
}
}
streamerClient::executeFunction(streamerClient::$finish);
if( function_exists('fastcgi_finish_request') ){
fastcgi_finish_request();
}
streamerClient::sendMessage([["message"=>"close"]]);
exit;
}
public static function sendMessage($msg){
$channel = "";
$dim = [];
$id = microtime(true);
foreach($msg as $key=>$value){
if( gettype($key)=="string" ){
if( $key=="sleep" ){
streamerClient::$sleepSeconds = $value;
continue;
}
if( $key=="channel" ){
$channel = "event: ".$value . PHP_EOL;
continue;
}
}
}
for($i=0; $i<count($msg); $i++){
if( gettype($msg[$i])=="NULL" ){
continue;
}
foreach($msg[$i] as $key=>$value){
if( gettype($key)=="integer" ){
$dim[] = "data: ".addslashes($value);
continue;
}
if( gettype($key)=="string" ){
if( $key=="sleep" ){
streamerClient::$sleepSeconds = $value;
continue;
}
if( $key=="channel" ){
$dim[] = "event: ".$value;  // . PHP_EOL;
continue;
}
if( gettype($value)=="string" ){
$dim[] = "data: ".addslashes($value);
continue;
}
if( $key!="message" ) continue;
if( gettype($key)=="string" ){
$dim2 = [];
$channel2 = "";
foreach($value as $key2=>$value2){
if( $key2=="id" ) continue;
if( $key2=="sleep" ){
streamerClient::$sleepSeconds = $value2;
continue;
}
if( $key2=="channel" ){
$channel2 = "event: ".$value2. PHP_EOL;
continue;
}
$dim2[] = '"'.$key2.'":"'.addslashes($value2).'"';
}
$dim[] = $channel2 . "data:{".implode(",", $dim2)."}". PHP_EOL. PHP_EOL;
}else{
}
}
}
}
$msg = "id: {$id}" . PHP_EOL . implode(PHP_EOL, $dim) . PHP_EOL . PHP_EOL;
echo $msg;
ob_flush();
flush();
return;
}
public static function executeFunction($func=null){
if( $func==null ) return null;
if( mb_strpos($func, "::")!==false ){
list($class, $method) = explode("::", $func);
$class::$method();
return;
}
if( $func[0]=='$' ){
list($instancia, $method) = explode("->", $func);
streamerClient::$instance = mb_substr($instancia, 1);
return streamerClient::$instance->$method();
}
if( mb_strpos($func, "->")!==false ){
list($class, $method) = explode("->", $func);
if( streamerClient::$instance==null ){
streamerClient::$instance = new $class();
}
return streamerClient::$instance->$method();
}
return $func();
}
public static function refreshLife(){
if( streamerClient::$refresh < time() ){
streamerClient::$refresh = time() + (streamerClient::$refreshStep * 0.8);    //- streamerClient::$sleepSeconds;
set_time_limit(streamerClient::$refreshStep);
}
}
}