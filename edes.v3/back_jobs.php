<?PHP
define('_ERROR_REPORTING', 5);
define('_TRACK_ERRORS'	 , false);
define('SETUP'  , '.' );
define('DIREDES', __DIR__.'/');
$xDownloadPath	 = $argv[1];
$xDownloadDelete = $argv[2];
$nDaily			 = $argv[3]*1;
include(DIREDES.'del_fichero.inc');
include("../_datos/config/setup.class.php");
if( SETUP::$System['SessionMaxLife']==-1 ){
SETUP::$System['SessionMaxLife'] = 24*30;
}
if( SETUP::$System['SessionMaxLife']!=-1 ){
$daySess = (SETUP::$System['SessionMaxLife']/86400)*2;
BorraFicheros('../_tmp/sess', $daySess);
}
$deleteDefault = [
"cch"=>1
,"exc"=>7
,"pdf"=>1
,"php"=>1
,"zip"=>7
,"lcl"=>2
,"err"=>90
,"log"=>1
];
$DeleteTemporary = (SETUP::$UploadFile['DeleteTemporary'] ?: "");
$tmp = explode(",", str_replace(" ", "", $DeleteTemporary));
for($n=0; $n<count($tmp); $n++){
list($key, $value) = explode(":", $tmp[$n]);
$key = trim($key);
if( isset($deleteDefault[$key]) ){
$deleteDefault[$key] = (int)$value;
}
}
BorraFicheros('../_d_' ,  1, 'dvl');
BorraFicheros('../_tmp', 15);
foreach($deleteDefault as $key=>$value){
BorraFicheros("../_tmp/{$key}", $value);
}
BorraFicheros($xDownloadPath, $xDownloadDelete);
if( !empty($xDownloadPath) && mb_substr_count($xDownloadPath, '/_tmp/exp')==0 ){
BorraFicheros('../_tmp/exp', 7);
}
BorraFicheros('../_bak_/_daily', $nDaily);
function eTron($para=''){
$NomFile = "../_tmp/__tron.sp";
if( gettype($para)!="array" ) $para = array($para);
for($n=0; $n<count($para); $n++){
$txt = $para[$n];
error_log("{$txt}\n", 3, $NomFile);
}
}
?>