<?PHP
$loadAverage = function($tpc=0){
$gestor = popen('uptime', 'r');
$leer = fread($gestor, 1024);
pclose($gestor);
$res = explode(" ", str_replace(",", "", $leer));
$total = count($res);
if( $tpc==0 ){
return [(float)$res[$total-3], (float)$res[$total-2], (float)$res[$total-1]];
}
return ( $tpc>(float)$res[$total-3] && $tpc>(float)$res[$total-2] && $tpc>(float)$res[$total-1] );
}
?>