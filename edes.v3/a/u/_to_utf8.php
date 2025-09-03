<?PHP
die("ok");
$_ENV["nLinea"] = 0;
function CopyDirectorio($dorg, $ddest, $ext, $NoExt, $NoCopyEnDir, $FileOk, $DirToUTF8, $noDir, $FileNO){
$Rastro = true;
if( $Rastro ){
$_ENV["nLinea"]++;
echo "<BR><BR><span style='color:red'>[$dorg -> $ddest] ".$_ENV["nLinea"]."</span>";
}
if( !is_readable(  $dorg  ) ) die("<br>Error al abrir directorio de origen '$dorg'");
if( in_array($dorg, $noDir) ){
return;
}
$filePorUTF8 = in_array($dorg, $DirToUTF8);
$di = opendir($dorg);
while( $file = readdir($di) ){
if( $file=='.' || $file=='..' ){
continue;
}
if( is_dir($dorg.'/'.$file) &&  in_array($file, $NoCopyEnDir) ){
continue;
}
if( file_exists($dorg.'/'.$file) != 1 ) die("<BR> >>>>>>>>>>>> No existe el fichero [".$file."]");
if( is_dir($dorg.'/'.$file) && $file != $ddest ){
CopyDirectorio("$dorg/$file", "$ddest/$file", $ext, $NoExt, $NoCopyEnDir, $FileOk, $DirToUTF8, $noDir, $FileNO);
}else{
if( in_array(mb_substr($file, mb_strrpos($file,'.')+1), $NoExt) ){
continue;
}
if( !in_array($file, $FileNO) && (in_array(mb_substr($file, mb_strrpos($file,'.')+1), $ext) || in_array($file, $FileOk) || $filePorUTF8) ){
if($Rastro) echo "<div>UTF8: {$file}</div>";
FileToUtf8("$dorg/$file", "$ddest/$file");
}else{
}
}
}
closedir($di);
}
function FileToUtf8($oFile, $dFile){
}
$Copy   = array('php','php3','php4','gs', 'inc', 'js', 'hta', 'htm','html', 'css', 'ini',  'edf','gdf','ldf','fdf','idf','zdf', 'sdf', 'sel', 'lng');
$NoCopy = array('bak', 'diff', '___', 'alb', 'hta', 'xar', 'old', 'OLD', 'no', 'NO', 'log', 'DS_Store', 'sublime-workspace', 'sublime-project');
$NoCopyEnDir = array('_no', '.vscode', '_bak_', '/_d_/log', '/_d_/usr', '_doc_' );
$FileOk = array('usertree.body', 'usertree.form', 'usertree.rol');
$FileNO = array('socket.io.js');
$DirToUTF8 = array('edes.v3/lng/help', 'edes.v3/web/aplication/help/tip');
$noDir = array('edes.v3/web/aplication/http/charts', 'edes.v3/web/aplication/http/lib', 'edes.v3/_tmp', 'edes.v3/temp', 'edes.v3/a/chart');
chdir("../../");
CopyDirectorio("edes.v3", "edesweb3", $Copy, $NoCopy, $NoCopyEnDir, $FileOk, $DirToUTF8, $noDir, $FileNO);
BorraTemporales("edesweb3/temp");
function BorraTemporales($ddest){
echo "<br>BORRAR FICHEROS TEMPORALES:";
$di = opendir($ddest);
while( $file = readdir($di) ){
if( $file=='.' || $file=='..' ){
continue;
}
if( is_dir("{$ddest}/{$file}") ){
continue;
}
echo "<br>{$ddest}/{$file}";
@unlink("{$ddest}/{$file}");
}
closedir($di);
}
exit;
$file = "../../edes.v3/lng/desktop.lng";
$txt = file_get_contents($file);
$contenidoUTF8 = iconv('Windows-1252', 'UTF-8', $txt);
ePrintR($contenidoUTF8);
$archivoUTF8 = '../_tmp/php/archivo_utf8.txt';
file_put_contents($archivoUTF8, $contenidoUTF8);
?>FIN