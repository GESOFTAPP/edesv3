<!DOCTYPE HTML><HTML><HEAD><META HTTP-EQUIV='Content-Type' CONTENT='text/html; charset=UTF-8'>
<STYLE type='text/css'></STYLE>
<SCRIPT type='text/javascript'>
</SCRIPT>
</HEAD><BODY>
<?PHP
eTrace("START OF CHECK:");      // desde el editor.sql poner el comando "check system"
$paso = 1;
$paso = checkControllerStructure($paso, "CONTROLLER STRUCTURE");                                // solo lo hace en localhost
$paso = checkMissingSqlStructure($paso, "MISSING SQL STRUCTURE");
$paso = RenombraFicheros        ($paso, "FILE NAME");
$paso = CheckDesktopUserWeb     ($paso, "File \"desktop_user_web.ini\"");
$paso = CheckFileCoreCss        ($paso, 'File "core.css"');
$paso = CheckGroupVar           ($paso, 'File "group.var"');
$paso = CheckFileIni            ($paso, 'File "sql.ini"'        , "../_datos/config/sql.ini");
$paso = CheckFileIni            ($paso, 'File "pdf.ini"'        , "../_datos/config/pdf.ini");
$paso = CheckFileIni            ($paso, 'File "manager_op.ini"' , "../_datos/config/manager_op.ini");
$paso = CheckFileIni            ($paso, 'File "edes.ini"'       , "../_d_/cfg/edes.ini");
eTrace("END OF CHECK");
eEnd();
function SystemDBGet(){     // obtiene la estructura sql de las tablas del motor
$totalTables = 0;
$totalFields = 0;
$dim = array();
qQuery('show tables', $p1);
while($r=qRow($p1)){
$table = $r[0];
if( mb_substr($table,0,3)=="gs_" ){
if( mb_substr_count($table, ".")==0 && $table==mb_strtolower($table) && mb_substr($table,-3)!="_ok" && mb_substr($table,-4)!="_old" && mb_substr($table,-4)!="_bak" ){
$totalTables++;
qQuery("SHOW FIELDS FROM {$table}", $p2);
while($row=qArray($p2)){
$totalFields++;
$field = $row['Field'];
$dim[] = "{$table}.{$field}";
}
}
}
}
return $dim;
}
function StructureSqlGet($type, $withSystemTable=true){     // obtienen la estructura sql de la definicion en txt
$dim = file(DIREDES."web/edes.v3/_doc_/tbl/_edes_{$type}.sql");
$fields = array();
$totalLineas = count($dim);
for($n=0; $n<$totalLineas; $n++){
$text = trim($dim[$n]);
if( $text=="" ) continue;
if( preg_match('/^CREATE TABLE/iu', $text) ){
list(,,$table) = explode(" ", $text);
if( mb_substr($table,-1)=="(" ) $table = mb_substr($table,0,-1);
$table = trim($table);
if( !$withSystemTable && preg_match('/^(gs_version|gs_changelog)$/iu', $table) ){
continue;
}
for($i=$n+1; $i<$totalLineas; $i++){
$text = trim($dim[$i]);
if( $text=="" ) continue;
if( preg_match('/^(PRIMARY|KEY|UNIQUE|INDEX)/iu', $text) ) continue;
if( $text[0]==")" ){
$n = $i;
break;
}
list($field) = explode(" ", $text);
$field = trim($field);
$fields[] = "{$table}.{$field}";
}
}
}
return $fields;
}
$dim = TablesGet();
TablesPut($dim);
die("Tablas grabadas");
function TablesPut($dim){
file_put_contents(DIREDES."t/test/tables.txt", implode("\n", $dim));
}
function TablesGet(){
$total = 0;
$dim = array();
qQuery('show tables', $p1);
while($r=qRow($p1)){
if( mb_substr($r[0],0,3)=="gs_" ){
if( mb_substr_count($r[0], ".")==0 && $r[0]==mb_strtolower($r[0]) && mb_substr($r[0],-3)!="_ok" && mb_substr($r[0],-4)!="_old" && mb_substr($r[0],-4)!="_bak" ){
$total++;
array_push($dim, $r[0]);
}
}
}
return $dim;
}
function FieldsPut(){
$tables = file(DIREDES."t/test/tables.txt");
$dim = array();
for($n=0; $n<count($tables); $n++){
$table = trim($tables[$n]);
if( $table=="" ) continue;
qQuery("SHOW FIELDS FROM {$table}");
while($row=qArray()){
$dim[] = "{$table}.".$row['Field'];
}
$dim[] = "";
}
file_put_contents(DIREDES."t/test/fields.txt", implode("\n", $dim));
}
function CheckFileCoreCss($paso, $info){
eTrace("{$paso}) {$info}");
$fileTest = DIREDES."t/test/core.css";
if( !file_exists($fileTest) ) die("<br>El fichero [{$fileTest}] no existe");
$dimKeyTest = LeeVariablesUnicas($fileTest, ":");
$file = "../_datos/config/core.css";                // eTrace("OPTION: ".$file); eTrace("");
$dimKeyOri = LeeVariablesUnicas($file, ":");
$result = array();
$resultAdd = array_diff_assoc($dimKeyTest, $dimKeyOri);
if( count($resultAdd)>0 ){
$result = array_merge($result, ["<u><b>{$info} - Add:</b></u>"]);
$result = array_merge($result, $resultAdd);
}
$resultDel = array_diff_assoc($dimKeyOri, $dimKeyTest);
$txt = FileGetContentsNoRem($file);
if( preg_match('/FUENTES\-eDes/u', $txt) ){
$resultDel = array_merge($resultDel, ["Del label: FUENTES-eDes"]);
}
if( preg_match('/\$CSSADD/u', $txt) ){
$posIni = mb_strpos($txt, '$CSSADD');
if( $posIni!==false ){
$posEnd = mb_strpos($txt, ']', $posIni);
if( $posEnd!==false && mb_strlen(trim(mb_substr($txt, $posIni, $posEnd-$posIni)))!=7 ){
$resultDel = array_merge($resultDel, ["Empty label: \$CSSADD.". ($posEnd-$posIni)]);
}
}
}
if( count($resultDel)>0  ){
$result = array_merge($result, ["<u><b>{$info} - Del:</b></u>"]);
$result = array_merge($result, $resultDel);
}
if( count($result)>0  ){
ePrintR($result);
}
return ++$paso;
}
function CheckFileIni($paso, $info, $file){
eTrace("{$paso}) {$info}");
eExplodeLast($file, "/", $path, $fileName);
$fileTest = DIREDES."t/test/{$fileName}";
if( !file_exists($fileTest) ) die("<br>El fichero [{$fileTest}] no existe");
$dimKeyTest = LeeVariablesUnicas($fileTest, "=");
$fileOri = $file;
if( !file_exists($fileOri) ) die("<br>El fichero [{$fileOri}] no existe");
$dimKeyOri = LeeVariablesUnicas($fileOri, "=");
foreach($dimKeyOri as $k=>$v){
if( !isset($dimKeyTest[$k]) ){
eTrace("Variable: [{$k}] Borrarla - no est? en TEST");
}
}
foreach($dimKeyTest as $k=>$v){
if( !isset($dimKeyOri[$k]) ){
eTrace("Variable: [{$k}] Crearla - no est? en ORIGEN");
}
}
return ++$paso;
}
function FileGetContentsNoRem($file){    // quitar comentarios múltiples
$txt = file_get_contents($file);
$posEnd = 0;
$buscarRem = true;
while( $buscarRem ){                                // eTron(":".mb_strlen($txt).' - '.gettype($posEnd).' - '.$posEnd);
$posIni = mb_strpos($txt, "/"."*", $posEnd);
if( $posIni!==false ){
$posEnd = mb_strpos($txt, "*"."/", $posIni);
if( $posEnd!==false ){
$posEnd += 2;
$txt = mb_substr($txt, 0, $posIni).mb_substr($txt, $posEnd);
if( mb_strlen($txt)>$posEnd ){
continue;
}
}
}
$buscarRem = false;
}
return $txt;
}
function LeeVariablesUnicas($file, $endVar){
$txt = FileGetContentsNoRem($file);
$dim = array();
$dimKey = array();
$tmp = explode("\n", $txt);
for($n=0; $n<count($tmp); $n++){
$data = trim($tmp[$n]);
if( empty($data) ) continue;
if( $data[0]!='$' ) continue;
if( mb_substr($data[0],0,2)==REM ) continue;
$pos = 0;
while( ($pos = mb_strpos($data, REM, $pos))!==false ){
if( mb_substr($data, $pos-1, 1)!=":" ){
break;
}
$pos++;
}
if( $pos!==false ){
$data = mb_substr($data, 0, $pos);
}
list($data, $valor) = explode($endVar, $data);
$data = trim($data);
array_push($dim, $data);
$dimKey[$data] = true;
}
ksort($dimKey);
return $dimKey;
}
function CheckGroupVar($paso, $info){
eTrace("{$paso}) {$info}");
$fileTest = DIREDES."t/test/group.var";
if( !file_exists($fileTest) ) die("<br>El fichero [{$fileTest}] no existe");
$dimTest = getGroupVar($fileTest);
$fileOri = "../_datos/config/group.var";
if( !file_exists($fileOri) ) die("<br>El fichero [{$fileOri}] no existe");
$dimOri = getGroupVar($fileOri);
$gruposASaltarse = array();
$res = array();
foreach($dimOri as $k=>$v){
if( gettype($v)=="array" ){
if( !isset($dimTest[$k]) ){
$res[] = "[{$k}] Borrar grupo";
$gruposASaltarse[$k] = true;
}
}
}
foreach($dimTest as $k=>$v){
if( gettype($v)=="array" ){
if( !isset($dimOri[$k]) ){
$res[] = "[{$k}] Crear grupo";
$gruposASaltarse[$k] = true;
}
}
}
if( count($res)>0 ){
ePrintR("<b><u>{$info}</u></b>:", "Test GRUPOS:", $res);
}
foreach($dimOri as $k=>$v){
if( gettype($v)=="array" && !isset($gruposASaltarse[$k]) ){
foreach($v as $k2=>$v2){
if( !isset($dimTest[$k][$k2]) ){
$res[] = "[{$k}.{$k2}] Borrar miembro";
}
}
}
}
foreach($dimTest as $k=>$v){
if( gettype($v)=="array" && !isset($gruposASaltarse[$k]) ){
foreach($v as $k2=>$v2){
if( !isset($dimOri[$k][$k2]) ){
$res[] = "[{$k}.{$k2}] Crear miembro";
}
}
}
}
if( count($res)>0 ){
ePrintR("<b><u>{$info}</u></b>:", "Test MIEMBROS:", $res);
}
if( count($dimOri)!=count($dimTest) ){
eTrace(">>> Arreglar los cambios de Grupos y Miembros");
exit;
}
if( count($dimOri)==count($dimTest) ){      // eTrace("Orden de los grupos:");
$orderTest = array();
foreach($dimTest as $k=>$v){
if( gettype($v)=="array" ){
array_push($orderTest, $k);
}
}
$orderOri = array();
foreach($dimOri as $k=>$v){
if( gettype($v)=="array" ){
array_push($orderOri, $k);
}
}
for($n=0; $n<count($orderTest); $n++){
if( $orderTest[$n]!=$orderOri[$n] ){
if( $n==0 ){
$res[] = "El grupo [{$orderTest[$n]}] tiene que estar el Primero";
}else{
$res[] = "El grupo [{$orderTest[$n]}] tiene que estar después de [".$orderTest[$n-1].":]";
}
}
}
if( count($res)>0 ){
ePrintR("<b><u>{$info}</u></b>:", "Orden de los grupos:", $res);
}
}
return ++$paso;
}
function getGroupVar($file){
$dim = array();
$tmp = file($file);
for($n=0; $n<count($tmp); $n++){
$data = trim($tmp[$n]);
if( empty($data) ) continue;
if( $data[0]=="." ) continue;
if( mb_substr($data[0],0,2)==REM ) continue;
if( mb_substr($data,-1)==":" ){
$index = mb_substr($data,0,-1);
$dim[$index] = array();
continue;
}
$pos = 0;
while( ($pos = mb_strpos($data, REM, $pos))!==false ){
if( mb_substr($data, $pos-1, 1)!=":" ){
break;
}
$pos++;
}
if( $pos!==false ){
$data = mb_substr($data, 0, $pos);
}
list($pk) = explode("=", $data);
$value = trim(mb_substr($data, mb_strlen($pk)+1));
$pk = trim($pk);
$dim[$index][$pk] = $value;
}
return $dim;
}
function checkControllerStructure($paso, $info){
eTrace("{$paso}) {$info}");
$paso++;
if( !preg_match('/^localhost/iu', $_SERVER['HTTP_HOST']) ){
return $paso;
}
$mysql    = StructureSqlGet("mysql", !false);
$oracle	  = StructureSqlGet("oracle");
$informix = StructureSqlGet("informix");
$dim = array();
$dim = array_merge($dim, ["<u><b>mysql -> informix</b></u>"]);
$result = array_diff($mysql, $informix);
$dim = array_merge($dim, $result);
$dim = array_merge($dim, ["<u><b>mysql -> oracle</b></u>"]);
$result = array_diff($mysql, $oracle);
$dim = array_merge($dim, $result);
$dim = array_merge($dim, ["<u><b>informix -> mysql</b></u>"]);
$result = array_diff($informix, $mysql);
$dim = array_merge($dim, $result);
$dim = array_merge($dim, ["<u><b>informix -> oracle</b></u>"]);
$result = array_diff($informix, $oracle);
$dim = array_merge($dim, $result);
$dim = array_merge($dim, ["<u><b>oracle -> mysql</b></u>"]);
$result = array_diff($oracle, $mysql);
$dim = array_merge($dim, $result);
$dim = array_merge($dim, ["<u><b>oracle -> informix</b></u>"]);
$result = array_diff($oracle, $informix);
$dim = array_merge($dim, $result);
if( count($dim)!=42 ){
ePrintR("<b><u>{$info}</u><b>", $dim);
}
return $paso;
}
function checkMissingSqlStructure($paso, $info){
eTrace("{$paso}) {$info}");
$dim = SystemDBGet();
$mysql = StructureSqlGet("mysql", !false);
$result = array_diff($mysql, $dim);
if( count($result)>0 ){
ePrintR("<u><b>MISSING SQL STRUCTURE:</b></u>", $result);
}
return ++$paso;
}
function RenombraFicheros($paso, $info){
eTrace("{$paso}) {$info}");
if( file_exists("../_datos/config/pass_new.htm") ){
rename("../_datos/config/pass_new.htm", "../_datos/config/user_new.html");
}
if( file_exists("../_datos/config/pass_new_es.htm") ){
rename("../_datos/config/pass_new_es.htm", "../_datos/config/user_new_es.html");
}
if( file_exists("../_datos/config/pass_reset.htm") ){
rename("../_datos/config/pass_reset.htm", "../_datos/config/pass_reset.html");
}
if( file_exists("../_datos/config/pass_reset_es.htm") ){
rename("../_datos/config/pass_reset_es.htm", "../_datos/config/pass_reset_es.html");
}
if( file_exists("../_datos/config/remember_pass.html") ){
rename("../_datos/config/remember_pass.html", "../_datos/config/pass_remember.html");
}
if( file_exists("../_datos/config/remember_pass_es.html") ){
rename("../_datos/config/remember_pass_es.html", "../_datos/config/pass_remember_es.html");
}
if( !file_exists("../_datos/config/cookies_short_es.html") && file_exists("../_datos/config/cookies_short.html") ){
rename("../_datos/config/cookies_short.html", "../_datos/config/cookies_short_es.html");
}
if( !file_exists("../_datos/config/cookies_long_es.html") && file_exists("../_datos/config/cookies_long.html") ){
rename("../_datos/config/cookies_long.html", "../_datos/config/cookies_long_es.html");
}
if( !file_exists("../_datos/config/user_new_es.html") && file_exists("../_datos/config/user_new.html") ){
rename("../_datos/config/user_new.html", "../_datos/config/user_new_es.html");
}
if( !file_exists("../_datos/config/pass_reset_es.html") && file_exists("../_datos/config/pass_reset.html") ){
rename("../_datos/config/pass_reset.html", "../_datos/config/pass_reset_es.html");
}
if( !file_exists("../_datos/config/pass_remember_es.html") && file_exists("../_datos/config/pass_remember.html") ){
rename("../_datos/config/pass_remember.html", "../_datos/config/pass_remember_es.html");
}
if( !file_exists("../_datos/config/key_help_es.html") && file_exists("../_datos/config/key_help.htm") ){
rename("../_datos/config/key_help.htm", "../_datos/config/key_help_es.html");
}
if( !file_exists("../_datos/config/key_help_es.html") && file_exists("../_datos/config/key_help.html") ){
rename("../_datos/config/key_help.html", "../_datos/config/key_help_es.html");
}
if( !file_exists("../_datos/config/cookies_short_es.html") ) eTrace("../_datos/config/cookies_short_es.html");
if( !file_exists("../_datos/config/cookies_long_es.html" ) ) eTrace("../_datos/config/cookies_long_es.html");
if( !file_exists("../_datos/config/user_new_es.html"     ) ) eTrace("../_datos/config/user_new_es.html");
if( !file_exists("../_datos/config/pass_reset_es.html"   ) ) eTrace("../_datos/config/pass_reset_es.html");
if( !file_exists("../_datos/config/pass_remember_es.html") ) eTrace("../_datos/config/pass_remember_es.html");
$path = "../_datos/config/";
$files = array(
"desktop.css",
"login_web.css",
"all.css",
"tab.css",
"list.css",
"message.css"
);
for($n=0; $n<count($files); $n++){
$file = $files[$n];
if( file_exists($path.$file) ){
rename($path.$file, $path."__".$file);
}
}
return $paso;
}
function CheckDesktopUserWeb($paso, $info){
eTrace("{$paso}) {$info}");
$text = file_get_contents("../_datos/config/desktop_user_web.ini");
if( !preg_match('/Favorite\.view\(/u', $text) ){
eTrace("FAVORITE icon is missing");
}
if( !preg_match('/S\(this\)\.fullscreen\(/u', $text) ){
eTrace("FULLSCREEN icon is missing");
}
if( !preg_match('/HeaderHeight\(/u', $text) ){
eTrace("iconoMenu no oncontextmenu");
}
if( !preg_match('/_OptionSeek\(/u', $text) ){
eTrace("search no onkeydown=_OptionSeek(");
}
if( !preg_match('/this\.select\(/u', $text) ){
eTrace("search no onclick=this.select()");
}
return ++$paso;
}
?>
<script>
</script>
</BODY></HTML>