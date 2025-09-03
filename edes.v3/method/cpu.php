<?PHP
$cpu = function(){
$gestor = popen('lscpu', 'r');
$leer = fread($gestor, 1024);
pclose($gestor);
$nCPU = 0;
$leer = explode("\n", trim($leer));
for($n=0; $n<count($leer); $n++){
if( mb_substr($leer[$n],0,6)=="CPU(s)" ){
$nCPU = explode(":", $leer[$n])[1];
}
}
return [$nCPU, $leer];
}
?>