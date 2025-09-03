<?PHP
if( $_SERVER["REQUEST_METHOD"]!="POST" ){
exit;
}
$eDesKey = apache_request_headers()['eDesKey'];
if( empty($eDesKey) ){
exit;
}
$data = json_decode(file_get_contents('php://input'), true);
if( empty($data["balancer"]) ){
exit;
}
$file = "../_datos/config/balancer.key";
if( !file_exists($file) ){
exit;
}
$key = trim(file_get_contents($file));
if( $key!=$eDesKey ){
exit;
}
http_response_code(200);
include(DIREDES."method/load_average.php");
$res = $loadAverage();
$total = count($res);
die($res[$total-3].",".$res[$total-2].",".$res[$total-1]);
?>