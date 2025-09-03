<?PHP
global $processOld, $processIni;
$processOld = [];
$processIni = false;
streamerClient::setup("initProcess", "messageSend", null, 5, -1);
function initProcess(){
global $processOld;
$processOld = getProcess();
$processIni = true;
}
function messageSend(){
global $processOld, $processIni;
$processNew = getProcess();
$dimResult = processDiff($processOld, $processNew);
if( $processIni && count($processNew)>0 && count($processOld)==count($processNew) ){
return null;
}
if( $processIni && count($processOld)==0 && count($processNew)==0 ){
return "close";
}
$message = array(
array(
"message"=>[]
)
);
$message[0]["message"]["total"] = count($processNew);
if( $processIni ){
$message[0]["message"]["sound"] = "yes";
}
$processIni = true;
$processOld = $processNew;
return $message;
}
function getProcess(){
$myScript = "edes.php id-".S::$_User;
$myLeng   = mb_strlen($myScript);
$xSalida = shell_exec("ps -F");
if( !isset($_PHPEXE) ) $_PHPEXE = 'php';
$_PHPEXE = str_replace('\\', '/', $_PHPEXE);
$_PHPEXE = '/'.$_PHPEXE;
$xPhpExe = explode('/', $_PHPEXE);
$xPhpExe = $xPhpExe[count($xPhpExe)-1];
$DimPS = explode("\n", $xSalida);
$process = [];
for($n=0; $n<count($DimPS); $n++){
$txt = trim($DimPS[$n]);
if( empty($txt) ) continue;
while( mb_substr_count($txt,'  ') > 0 ) $txt = str_replace('  ', ' ', $txt);
if( trim($txt)=='' ) continue;
$Dim = explode(' ', $txt);
if( count($Dim)<11 ) continue;
$xPID = $Dim[1];
if( $xPID=='PID' ) continue;
$xEXE = $Dim[11];
if( $xEXE!="edes.php" ) continue;
$xParametros = '';
for($i=11;$i<count($Dim); $i++){
if( $xParametros!='' ) $xParametros .= ' ';
$xParametros .= $Dim[$i];
}
$xEXE = $xParametros;
if( mb_substr($xEXE, 0, $myLeng)!=$myScript ) continue;
$process[] = $xEXE;
}
return $process;
}
function processDiff($dimOld, $dimNew){
$dimDel = array_diff($dimOld, $dimNew);
$dimAdd = array_diff($dimNew, $dimOld);
$dimResult = array(
"del"=>$dimDel
,"add"=>$dimAdd
);
return $dimResult;
}
?>