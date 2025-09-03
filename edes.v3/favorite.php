<?php       // guarda y elimina opciones Favoritas
$action = $_POST["url"][0];
$newURL = mb_substr($_POST["url"],1);
$_User  = S::$_User;
$file   = "../_datos/usr/{$_User}.favorites";
if( file_exists($file) ){
$dim = file($file);
}else{
$dim = array();
}
$newDim = array();
for($n=0; $n<count($dim); $n++){
$oURL = trim($dim[$n]);
if( empty($oURL) ){
continue;
}
if( $oURL==$newURL ){
if( $action=="+" ){                         // si ya existe no lo vuelve a insertar
$action = "";
}
}else{
array_push($newDim, $oURL);
}
}
if( $action=="+" ){
array_push($newDim, $newURL);
}
if( count($newDim)>0 ){
file_put_contents($file, implode("\n", $newDim));
}else{
@unlink($file);
}
die("ok");
?>