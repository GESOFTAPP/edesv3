<?PHP
class UnPack {
private static $file;
private static $fileFull;
private static $dataPack;
private static $fileInPack;
static function listFile($file, $ftp=null, $location=false){
self::$file		= $file;
self::$fileFull = eScript($file);
$fileFull  = self::$fileFull;
$dimScript = array();
if( mb_substr($file,0,14)!="/_bak_/update/" ){
qQuery("select * from {$_ENV['eDesDictionary']}gs_activity where script='{$file}' and cdi_ftp='{$ftp}' order by cdi_ftp desc");
$r=qArray();
$tmp = explode("/", $fileFull);
$fileFull = $tmp[count($tmp)-1];
$cdi = str_replace(
array(" ", ":")
,array("-", "-")
,$r["cdi_ftp"]
);
list($y, $m, $d, $h, $i, $s) = explode("-", $cdi);
$pk = mktime($h, $i, $s, $m, $d, $y);
$fileFull = "../_bak_/file/{$fileFull}.{$pk}";
}
if( !file_exists($fileFull) ){
return array();
}
$MaxFileSize = filesize($fileFull);
if( mb_substr($file,0,14)!="/_bak_/update/" ){
if( $location ){
$txt = file_get_contents($fileFull);
array_push($dimScript, array(str_replace("..", "", $fileFull), 0, $MaxFileSize, $txt));
}else{
array_push($dimScript, str_replace("..", "", $fileFull));
}
return $dimScript;
}
$fp = fopen($fileFull, 'r');
$p  = 0;
do{
$LongNombre = (int)fread($fp, 2);
$NomFile	= fread($fp, $LongNombre);
$LongFile	= (int)fread($fp, 8);
if( $location ){
$txt = file_get_contents($fileFull);
array_push($dimScript, array($NomFile, $p+2+$LongNombre+8, $LongFile, mb_substr($txt, $p+2+$LongNombre+8, $LongFile)));
}else{
array_push($dimScript, $NomFile);
}
$p += 2+$LongNombre+8+$LongFile;
fseek($fp, $p);
} while( !feof($fp) and ftell($fp)<$MaxFileSize );
fclose($fp);
return $dimScript;
}
private function previousScript($file, $cdi, $cdi_ftp){
$fileInPack = self::listFile($file);
$fileInPackPrevious = array();
$totalFiles = count($fileInPack);
for($i=0; $i<$totalFiles; $i++){
$fileInPackPrevious[$fileInPack[$i]] = array();
}
$sql = "select * from {$_ENV['eDesDictionary']}gs_activity where script like '/_bak_/update/%' and cdi_ftp is not null and cdi_ftp<'{$cdi_ftp}' order by cdi_ftp desc";
qQuery($sql);
$nPack = 0;
while( $r=qArray() ){
++$nPack;
$filePack = $r["script"];
$dim = self::listFile($filePack);
$coincidencias = array_intersect($fileInPack, $dim);
if( count($coincidencias)>0 ){
foreach($coincidencias as $k=>$v){
unset($r["edes"], $r["byts"]);
$fileInPackPrevious[$v] = $r;
unset($fileInPack[$k]);
--$totalFiles;
}
if( $totalFiles<=0 ){
if( count($fileInPackPrevious) ){
break;
}
return;
}
}
}
return $fileInPackPrevious;
}
private function nextScript($file, $cdi, $cdi_ftp){
$fileInPack = self::listFile($file);
$cdi	 = self::$dataPack["cdi"];
$cdi_ftp = self::$dataPack["cdi_ftp"];
$fileInPackPrevious = array();
$totalFiles = count($fileInPack);
for($i=0; $i<$totalFiles; $i++){
$fileInPackNext[$fileInPack[$i]] = array();
}
$sql = "select * from {$_ENV['eDesDictionary']}gs_activity where script like '/_bak_/update/%' and cdi_ftp>'{$cdi_ftp}' order by cdi_ftp, script";
qQuery($sql);
$nPack = 0;
while( $r=qArray() ){
++$nPack;
$filePack = $r["script"];
$dim = self::listFile($filePack);
$coincidencias = array_intersect($fileInPack, $dim);
if( count($coincidencias)>0 ){
foreach($coincidencias as $k=>$v){
unset($r["edes"], $r["byts"]);
$fileInPackNext[$v] = $r;
unset($fileInPack[$k]);
--$totalFiles;
}
if( $totalFiles<=0 ){
if( count($fileInPackNext) ){
break;
}
return;
}
}
}
return $fileInPackNext;
}
private function getActivity($file){
qQuery("select * from {$_ENV['eDesDictionary']}gs_activity where script like '{$file}' order by cdi desc, script");
self::$dataPack = qArray();
}
static function info($file){
self::$file = $file;
self::getActivity($file);
$cdi	 = self::$dataPack["cdi"];
$cdi_ftp = self::$dataPack["cdi_ftp"];
$fileInPack = self::listFile($file);
$fileInfo   = array();
$totalFiles = count($fileInPack);
$fileDirectPrevious = array();
$fileDirectNext = array();
for($i=0; $i<$totalFiles; $i++){
$filePack = $fileInPack[$i];
$fileInfo[$filePack] = array($filePack,  "","","","",  "","","","");
$sql = "select * from {$_ENV['eDesDictionary']}gs_activity where script='{$filePack}' and cdi_ftp is not null and cdi_ftp<'{$cdi_ftp}' and cdi_ftp not in (select cdi from {$_ENV['eDesDictionary']}gs_activity where cdi_ftp is not null) order by cdi_ftp desc, cdi desc";
qQuery($sql);
$data = qArray();
if( !empty($data["script"]) && !empty($data["cdi_ftp"]) && $data["cdi_ftp"]>$cdi ){
$fileDirectPrevious[$filePack] = $data;
}
$sql = "select * from {$_ENV['eDesDictionary']}gs_activity where script='{$filePack}' and cdi_ftp is not null and cdi_ftp>'{$cdi_ftp}' and cdi_ftp not in (select cdi from {$_ENV['eDesDictionary']}gs_activity where cdi_ftp is not null) order by cdi_ftp, cdi";
qQuery($sql);
$data = qArray();
if( !empty($data["script"]) && !empty($data["cdi_ftp"]) && $data["cdi_ftp"]>$cdi ){
$fileDirectNext[$filePack] = $data;
}
}
$dimPrevious = UnPack::previousScript($file, $cdi, $cdi_ftp);
$dimNext	 = UnPack::nextScript($file, $cdi, $cdi_ftp);
foreach($dimPrevious as $k=>$v){
$fileInfo[$k][1] = $v["cd_gs_user"];
$fileInfo[$k][2] = $v["cdi"];
$fileInfo[$k][3] = $v["script"];
$fileInfo[$k][4] = $v["cdi_ftp"];
}
foreach($dimNext as $k=>$v){
$fileInfo[$k][5] = $v["cd_gs_user"];
$fileInfo[$k][6] = $v["cdi"];
$fileInfo[$k][7] = $v["script"];
$fileInfo[$k][8] = $v["cdi_ftp"];
}
for($i=0; $i<$totalFiles; $i++){
$file = $fileInPack[$i];
$k = $file;
if( !empty($fileDirectPrevious[$file]) ){
$fileInfo[$k][1] = $fileDirectPrevious[$file]["cd_gs_user"];
$fileInfo[$k][2] = $fileDirectPrevious[$file]["cdi"];
$fileInfo[$k][3] = $fileDirectPrevious[$file]["script"];
$fileInfo[$k][4] = $fileDirectPrevious[$file]["cdi_ftp"];
}
if( !empty($fileDirectNext[$file]) ){
$fileInfo[$k][5] = $fileDirectNext[$file]["cd_gs_user"];
$fileInfo[$k][6] = $fileDirectNext[$file]["cdi"];
$fileInfo[$k][7] = $fileDirectNext[$file]["script"];
$fileInfo[$k][8] = $fileDirectNext[$file]["cdi_ftp"];
}
}
usort($fileInfo, array("UnPack", "sort"));
return $fileInfo;
}
private function sort($a, $b){
if( empty($a[4]) && empty($a[8]) ){
return false;
}
if( empty($b[4]) && empty($b[8]) ){
return true;
}
$este = 4;
$por  = 4;
if( empty($a[$este]) ){
$este = 8;
}
if( empty($b[$por]) ){
$por = 8;
}
return $a[$este] <= $b[$por];
}
static function infoAPack($file){
qQuery("select script, cd_gs_user, cdi, cdi_ftp as ftp from {$_ENV['eDesDictionary']}gs_activity where script='{$file}'");
$rActibity = qArray();
$user = $rActibity["cd_gs_user"];
$cdi  = $rActibity["cdi"];
qQuery("select cd_type, options, description from {$_ENV['eDesDictionary']}gs_pack where cd_gs_user={$user} and cdi='{$cdi}'");
$rPack = qArray();
$res = array_merge($rActibity, $rPack);
$trace = array();
qQuery("select * from {$_ENV['eDesDictionary']}gs_op where cd_gs_op in ({$rPack['options']}) order by seq");
while( $r=qArray() ){
array_push($trace, $r["caption"]);
}
$res["trace"] = $trace;
return $res;
}
static function extract($files){
$dimSource = array();
for($f=0; $f<count($files); $f++){
$data = UnPack::listFile($files[$f]["pack"], $files[$f]["ftp"], true);
for($i=0; $i<count($data); $i++){
if( $data[$i][0]!=$files[$f]["file"] ){
continue;
}
array_push($dimSource, array("file"=>$files[$f]["file"], "data"=>$data[$i][3]));
}
}
return $dimSource;
}
}
?>