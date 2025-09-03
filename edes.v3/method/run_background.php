<?PHP
$runBackground = function($url=null, $get=[], $post=[]){
global $_JSEND;
S::$runBackground++;
$_JSEND .= "";
$dim = [];
$n = 0;
foreach($_GET as $key=>$value){
$n++;
if( $n==1 && $url==null ){
$url = $key;
}
if( $key[0]!="_" ) continue;
$dim[$key] = $value;
}
$_GET = [];
$_GET[$url] = "";
foreach($get as $key=>$value){
$_GET[$key] = $value;
}
foreach($dim as $key=>$value){
if( $key=="_SPIDER_" ) continue;
$_GET[$key] = $value;
}
$_POST = $post;
$data = serialize(array(
S::getClientIP()
,$_SERVER['HTTP_USER_AGENT']
,((empty($_POST)) ? "GET" : "POST")
,$_GET
,$_POST
));
$_User = S::$_User;
S::qQuery("insert into {$_ENV['eDesDictionary']}gs_download
( nm_download   , type_file, status, total_sleep, total_seconds , total_download, records, cd_gs_user,             cdi          ) values
('Processing...',   'html' ,   'P' ,      0     ,      0        ,      0        ,    0   , '{$_User}', '".date('Y-m-d H:i:s')."')"
);
$pk = S::qId();
$id = "id-".S::$_User."-".str_pad(microtime(true), 15, "0")."-".$pk;
file_put_contents("../_tmp/php/".$id, $data);
$command = "php edes.php {$id} > /dev/null 2>&1 &";
$v = popen($command, 'r');
$ok = ($v!==false);
if( !$ok ){
eTrace("Error");
}
pclose($v);
}
?>