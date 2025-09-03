<?PHP
global $_HndDB;
if( SESS::$_D_=="" ) $pkError = rand(1000, 9999);
$url = $_SERVER['REQUEST_URI'];
if( $url[0]=='/' ) $url = mb_substr($url,1);
$LogTxt = date('Y-m-d H:i:s')."\r\n".
"\tUSER...: ".S::$_User."\r\n".
((SESS::$_D_=="")? "\tPK.....: ".$pkError."\r\n":"").
"\tURL....: ".$url."\r\n".
"\tSQL....: ".$sql."\r\n".
"\tERROR..: ".$TxtError."\r\n"
;
$DimNomVar = array_keys($_POST); $DimValor = array_values($_POST);
$MasInfo = "\tPOST...: "."\r\n";
for($n=0; $n<count($DimNomVar); $n++) $MasInfo .= "\t\t ".$DimNomVar[$n].' = '.$DimValor[$n]."\r\n";
$DimNomVar = array_keys($_GET); $DimValor = array_values($_GET);
$MasInfo .= "\tGET....: "."\r\n";
for($n=0; $n<count($DimNomVar); $n++) $MasInfo .= "\t\t ".$DimNomVar[$n].' = '.$DimValor[$n]."\r\n";
eErrorToFile($LogTxt, $LogTxt.$MasInfo);
if( $_HndDB ){
sql_TranBack();
sql_TranOn();
}
if( S::$handleSys ){
S::qTranBack();
S::qTranOn();
}
?>