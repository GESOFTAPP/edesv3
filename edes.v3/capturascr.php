<?PHP
if( !empty($_POST["delete"]) ){
$name = str_replace(array("/","\\"), array("_","_"), $_POST["delete"]);
if( $name=="undefined" ) eEnd();
for($i=1; $i<=20; $i++){
$file = "g/screenshot/{$name}_{$i}.png";
if( file_exists($file) ){
@unlink($file);
}
}
echo 'top.S.info();';
echo 'top.S.info(window, "Capturas de la opción actual borradas", 3, "OK");';
eEnd();
}
$data = $_POST["scr"];
if( preg_match('/^data:image\/(\w+);base64,/u', $data, $type) ){
$data = mb_substr($data, mb_strpos($data, ',') + 1);
$type = mb_strtolower($type[1]);
if( !in_array($type, ['jpg', 'jpeg', 'gif', 'png']) ){
exit;
}
$data = base64_decode($data);
if( $data===false ){
exit;
}
}else{
exit;
}
if( $_GET["name"]!="" ){
$name = trim($_GET["name"]);
if( mb_substr($name,0,11)=="screenshot:" ){
CrearDirectorios("g/screenshot/");
$name = mb_substr($name, 11);
$name = str_replace(array("/","\\"), array("_","_"), $name);
for($i=1; $i<=20; $i++){
$file = "g/screenshot/{$name}_{$i}.{$type}";
if( !file_exists($file) ){
file_put_contents($file, $data);
break;
}
}
}else{
$name = str_replace(array("/","\\","&",":"), array("","","",""), $name);
file_put_contents("../_tmp/zip/{$name}.{$type}", $data);
}
}else if( SESS::$spider['prefijo']!="" ){
file_put_contents(SESS::$spider['prefijo'].".{$type}", $data);
}
echo 'top.S.info();';
echo 'top.S.info(window, "Captura grabada", 3, "OK");';
eEnd();
function CrearDirectorios($BakFile){
global $_DirBase;
$tmp = explode('/', $BakFile);
$sDir = '';
for($n=0; $n<count($tmp)-1; $n++){
$sDir .= $tmp[$n].'/';
if( mb_substr($tmp[$n],-1)==':' ) continue;
if( $tmp[$n]=='' ) continue;
if( !is_dir($sDir) ){
mkdir($sDir, 0777);
}
if( !is_writeable($sDir) ){
if( !chmod($sDir, 0777) && !chmod($sDir, 0666) ){
echo "0|Error creando directorio de bak: [{$sDir}] de [{$BakFile}]|";
eEnd();
}
}
}
}
?>