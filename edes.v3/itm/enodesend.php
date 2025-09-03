<?PHP
function eNodeSend_($records){
global $urlNode, $phpNodeService, $phpNodeKey;
$dataJson = json_encode($records);
$ch = curl_init($urlNode.$phpNodeService);
if( $ch===false ){
return false;
}else{
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($ch, CURLOPT_POSTFIELDS, $dataJson);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
"phpNodeKey: ".$phpNodeKey,
"Content-Type: application/json",
"Content-Length: ".mb_strlen($dataJson))
);
curl_setopt($ch, CURLOPT_TIMEOUT, 1);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
$res = curl_exec($ch);
curl_close($ch);
if( $res=="" ){
}else if( $res!="ok" ){
}else if( $res=="ok" ){
return true;
}
return false;
}
}
?>