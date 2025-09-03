<?PHP
if( S::$_User==-1 || $_gsID!=getmypid() ) exit;
$_ENV["_gsEditDirect"] = "";
if( S::$_User==-2 && $_SERVER['REQUEST_METHOD']=="GET" ){
$n = 0;
foreach($_GET as $k=>$v){
$n++;
}
if( $n!=1 ) exit;
list(,, $login, $password, $development, $filemtime) = explode("/", $_SERVER["QUERY_STRING"]);
if( $filemtime!=filemtime("../http") ) exit;
include('../_datos/config/setup.class.php');
$_ENV['ON']  = SETUP::$System["CheckboxOn"];
$_ENV['OFF'] = SETUP::$System["CheckboxOff"];
$_ENV['eDesDictionary'] = SETUP::$System['SysDictionary'];
if( !empty($_ENV['eDesDictionary']) ) $_ENV['eDesDictionary'] .= ".";
include(DIREDES."context.php");
$claveMD5 = mb_strtoupper(md5($login.mb_strtoupper(md5($password))));
eLoadVar();
if( !empty(getenv('MAIL_KEYCODE')) ){
$_SqlTransaction	= true;
$dim = explode("|", ePassword(getenv('MAIL_KEYCODE')));
for($n=0; $n<count($dim); $n++){
$command = trim($dim[$n]);
eExplodeOne($command, "=", $key, $value);
if( $key=="SqlInit" ){
if( !isset($GLOBALS["_{$key}"]) || !is_array($GLOBALS["_{$key}"]) ){
$GLOBALS["_{$key}"] = array();
}
array_push($GLOBALS["_{$key}"], $value);
continue;
}
$GLOBALS["_{$key}"] = $value;
}
$_Development = ($_Development=="true");
unset($dim);
}
include(DIREDES.$_Sql.".inc");
$IP = S::getClientIP();
do{
mt_srand(microtime(true));
$cadena = str_shuffle(S::$sessionChars);
$cadenaLeng = mb_strlen($cadena)-1;
$eDesSession = "";
while( mb_strlen($eDesSession)<40 ){
$eDesSession .= $cadena[rand(0,$cadenaLeng)];
}
$tmpSession = _SessionCheck($eDesSession);
$xIp = _IpSet($IP, $tmpSession);
$eDesSession = $xIp."-".$tmpSession;
$file = '../_tmp/sess/'.$eDesSession;
}while( file_exists($file) && _SessionCheck($eDesSession, true) );
$_ENV[SYS]['eDesSession'] = $eDesSession;
$_ENV[SYS]['fileSession'] = '../_tmp/sess/'.$eDesSession;
$_GET['_SESS_'] = $eDesSession;
SYS::createClassSession($_ENV[SYS]['fileSession']);
chmod($_ENV[SYS]['fileSession'], 0666);
SYS::readSession();
$nv = rand(1,9);
$pIzq1 = str_repeat("(", $nv);
$pDch1 = str_repeat(")", $nv);
$nv = rand(1,9);
$pIzq2 = str_repeat("(", $nv);
$pDch2 = str_repeat(")", $nv);
$sql = "select login,pass,  pass_tmp, pass_tmp_cdi,  pass_error, pass_error_cdi,  cd_gs_user, email,  ip, ip2, ip_from, ip_to  from {$_ENV['eDesDictionary']}gs_user  where {$pIzq1}login={$pIzq2}'{$login}'{$pDch2}{$pDch1}";
qQuery($sql);
$r=qArray();
if( $r["pass"]!=$claveMD5 ) exit;
$_SERVER['PHP_AUTH_USER'] = $login;
$_SERVER['PHP_AUTH_PW'] = $development;
SESS::$_UserLogin = $login;
SESS::$_gsACCESO['EMAIL'] = $login;
SESS::$_User = $r["cd_gs_user"];
SESS::$_Node = 1;
SESS::$_Tree = 1;
S::$_User = $r["cd_gs_user"];
SESS::$SessionMaxLife = date("U")+(60*60*24);
SESS::$MyExplorer = md5($IP.$_SERVER['HTTP_USER_AGENT']);
SESS::$sql = [
'file'=>'sql',
'driver'=>$_Sql,
'hostname'=>$_SqlHostName,
'database'=>$_SqlDiccionario,
'databaseSYS'=>$_SqlSysDiccionario,
'user'=>$_SqlUsuario,
'password'=>$_SqlPassword,
'transaction'=>$_SqlTransaction,
'init'=>$_SqlInit,
'pdoType'=>$_SqlPDOType,
'pdoConnect'=>$_SqlPDOConnect,
'default'=>'',
'statistics'=>$_Estadistica
];
include(DIREDES."t/lp.gs");
SYS::sessionSave();
$_ENV["_gsEditDirect"] = 'S';
}
$_DirG = 'g/e';
if( SESS::$_gsACCESO['ACCESO']<1 ) die('Error:78w');
if( SESS::$_gsACCESO['Edit']<1 ) die('Error:79w');
include('../_d_/cfg/edes.ini');
if( !isset($_FontSize) ) $_FontSize = 10;
include(DIREDES."t/{$_Language}.lng");
if( $_POST["script"]!="SQL" && $_GET['_DB']!='NO' ){
$_Sql 				= SESS::$sql['driver'];
$_SqlHostName 		= SESS::$sql['hostname'];
$_SqlDiccionario 	= SESS::$sql['database'];
$_SqlUsuario 		= SESS::$sql['user'];
$_SqlPassword 		= SESS::$sql['password'];
$_SqlTransaction 	= SESS::$sql['transaction'];
$_SqlInit 			= SESS::$sql['init'];
$_SqlPDOType 		= SESS::$sql['pdoType'];
$_SqlPDOConnect 	= SESS::$sql['pdoConnect'];
include_once(DIREDES.$_Sql.'.inc');
}
if( $_GET["HelpDown"]==1 ){
$file = "../_tmp/zip/help_edesweb.zip";
if( file_exists($file) ) unlink($file);
$ok = eZipDirectory(DIREDES."h", $file);
if( !$ok ){
eJS("alert('Error al crear \"help_edesweb.zip\"');");
}else{
eJS('top.S.infoHide(top);top.S.callSrv("edes.php?D:/_tmp/zip/help_edesweb.zip&FILE=help_edesweb.zip", window);');
}
eEnd();
}
if( $_GET["HelpUp"]==1 ){
}
if( isset($_POST["fuente"]) && $_POST["fuente"]!="" && isset($_POST["btoa"])){
}
if( isset($_GET["EDITLANGUAGE"]) ){
$txt = $_POST["language"];
$txt = str_replace(["&#13;", "&#10;"], ["\r", "\n"], $txt);
file_put_contents(DIRTMP."{$_ENV['user']}.lng", $txt);
?>
var file = "<?=DIRTMP."{$_ENV['user']}.lng"?>";
top.S.window("edes.php?Fa:$a/u/language.edf&_file="+file+"&_line=<?=$_POST["line"]?>", {title:"File: "+file, modal:true, width:800, height:"100%"});
<?PHP
eEnd();
exit;
}
if( isset($_GET["EXPLORADOR"]) ){
function Explorador($dir, $ext, &$dim){
$long = (mb_strlen($ext)+1)*-1;
$df = opendir($dir);
while( $file=readdir($df) ){
if( $file!="." && $file!=".." ){
if( is_dir("{$dir}/{$file}") ){
if( !preg_match('/^(http|gescomu|_d_|tree|_bak_|_hito|_spider|_doc_|_tmp|_version_|_check|lib)$/u', $file) && !preg_match('/\./u', $file) ){
Explorador("{$dir}/{$file}", $ext, $dim);
}
}else if( mb_substr($file,$long)==".{$ext}" ){
$dim[] = str_replace("../d/","","{$dir}/{$file}");
}
}
}
closedir($df);
}
Explorador("..", $_GET["EXPLORADOR"], $dim);
sort($dim);
$opDir = array();
for($n=0; $n<count($dim); $n++){
$txt = '$'."opDir['".str_replace("/","']['",$dim[$n])."']=1;";
eval($txt);
}
function GeneraVar($op, $nivel, &$txt, $dir){
if( $nivel==0 ) $txt = "[['-Script a Insertar (idf)'],";
foreach($op as $k=>$v){
if( is_array($v) ){
$txt .= "['{$k}','',[";
GeneraVar($v, $nivel+1, $txt, $dir.(($dir!="")?"/":"").$k);
$txt .= "]],";
}else{
$txt .= "['{$k}','','{$dir}'],";
}
}
if( $nivel==0 ){
$txt .= "]";
$txt = str_replace(array(",]"), array("]"), $txt);
}
}
GeneraVar($opDir, 0, $txt, "");
?>
<script type="text/javascript">
top.S("body", top).tree(<?=$txt?>,{expanded:true, icon:"system", function:function(op, tr, para, label){
if( op!="" ) op = op+"/";
top.S.callSrv("edes.php?E:$t/ed.gs&INSERTAR="+op+label, window);
top.S(this).nodeRemove();
}}).modal({close:true});
</script>
<?PHP
eEnd();
}
if( isset($_GET["INSERTAR"]) ){
?>
<textarea id="CONTENEDOR"><?=file_get_contents(eScript($_GET["INSERTAR"]))?></textarea>
<script type="text/javascript">
if( top.EditorActivo() ){
var nLinea = top._Editor.getCursor()["line"]*1,
line = top._Editor.doc.getLine(nLinea),
c = top._Editor.getCursor()["ch"],
dim = top._Editor.doc.getValue().split("\n"),
st = top._Editor.getDoc().scrollTop;
if( top.S.trim(line)=="" ){
top._Editor.setCursor(nLinea, 0);
dim[nLinea] = top.S("#CONTENEDOR",window).val();
top._CargaEDF(dim.join("\n"));
top._Editor.scrollTo(0, st);
top._Editor.setCursor(nLinea, 0);
}else{
top.S.error("Solo se puede insertar en una linea vacía");
}
}
</script>
<?PHP
eEnd();
}
if( isset($_GET["DEBUGSQL"]) && $_GET["DEBUGSQL"]=='CHANGE' ){
if( SESS::$_DEBUGSQL ){
SESS::$_DEBUGSQL = false;
}else{
SESS::$_DEBUGSQL = true;
}
?>
<script type="text/javascript" charset="UTF-8">
try{
var _gsEditStack = top.opener._gsEditStack, i,
action = "<?=(SESS::$_DEBUGSQL ? "+DEBUGSQL" : "-DEBUGSQL")?>";
for(i in _gsEditStack) if( _gsEditStack[i]!=null ){
try{
top.S("#_DEBUGSQL", _gsEditStack[i]).class(action);
}catch(e){}
}
for(i=0; i<_gsEditStack.length; i++) if( _gsEditStack[i]!=null ){
try{
top.S("#_DEBUGSQL", _gsEditStack[i]).class(action);
}catch(e){}
}
top.S("#_DEBUGSQL", top).class(action);
top.S.info("Debug <?=((SESS::$_DEBUGSQL)?"activado":"desactivado")?>",2);
}catch(e){}
</script>
<?PHP
eEnd();
}
if( isset($_GET["Development"]) && $_GET["Development"]=="Tree" ){
include(DIREDES."t/devoption.gs");
eEnd();
}
if( isset($_GET["Development"]) && $_GET["Development"]=="Personal" ){
include(DIREDES."t/devoption.gs");
eEnd();
}
if( isset($_GET["_Assistant"]) && $_GET["_Assistant"]==1 ){
eAssistant();
}
if( isset($_GET["SPIDER"]) ){
switch($_GET["SPIDER"]){
case "OPEN":
_SpiderOpen($_GET["PREFIJO"]);
break;
case "CLOSE":
_SpiderClose();
break;
case "CLEAR":
_SpiderDelete();
break;
}
}
if( isset($_GET["TRACEAR"]) ){
switch( $_GET["TRACEAR"] ){
case "on":
SESS::$_TRACE_URL_ON = true;
@unlink("../_tmp/log/trace.".S::$_User.".txt");
?>
<script type="text/javascript">
top.S.info("Trace URL ON",3);
top.document.body.focus();
</script>
<?PHP
eEnd();
break;
case "off":
SESS::$_TRACE_URL_ON = false;
@unlink("../_tmp/log/trace.".S::$_User.".txt");
?>
<script type="text/javascript">
top.S.info("Trace URL OFF",3);
top.document.body.focus();
</script>
<?PHP
eEnd();
break;
case "view":
$_GET["LoadSel"] = "TRACEURL";
break;
case "traceAll":
if( file_exists("edes.php.log") ){
@unlink("edes.php.log");
eJS('top.S.warning("Trace ALL OFF",3);');
}else{
file_put_contents("edes.php.log", "");
eJS('top.S.ok("Trace ALL ON",3);');
}
break;
case "traceAllView":
$_GET["LoadSel"] = "/http/edes.php.log";
break;
default:
exit;
}
}
if( isset($_GET["SeekField"]) ){
include(DIREDES."t/seekfield.gs");
eEnd();
}
if( isset($_GET["SeekStringHelp"]) ){
include(DIREDES."t/seekhelp.gs");
eEnd();
}
if( isset($_GET["SeekFile"]) ){
include(DIREDES."t/seekfile.gs");
eEnd();
}
if( isset($_GET["SeekString"]) ){
include(DIREDES."t/seekstring.gs");
eEnd();
}
if( isset($_GET["INDICEAYUDA"]) ){
switch( mb_strtoupper($_GET["INDICEAYUDA"]) ){
case "EDESWEB":
$_GET["LoadSel"] = '$h/i/edesweb.ind';
break;
case "LABEL":
$_GET["LoadSel"] = '$h/i/label.ind';
break;
case "LENGUAJE":
$_GET["LoadSel"] = '$h/i/help2.ind';
break;
case "GROUP.VAR":
$_GET["LoadSel"] = '../_datos/config/group.var';
break;
default:
exit;
}
}
function isBase64($str){
$res = (base64_decode($str, true) !== false);
if( $res ){
$res = preg_match('/^(?:[A-Z0-9+\/]{4})*(?:[A-Z0-9+\/]{2}==|[A-Z0-9+\/]{3}=|[A-Z0-9+\/]{4})$/i', $str);
}
return $res;
}
if( isset($_POST["script"]) && isset($_POST["md5"]) && isset($_POST["fuente"]) ){
if( $_POST["script"]=="TRACEURL" ) exit;
$_POST["fuente"] = str_replace("{#~92~#}", CHR92, $_POST["fuente"]);
if( $_POST["md5"]=="EXE" ){
if( $_POST["script"]=="SQL" ){
$Todo = $_POST["fuente"];
include(DIREDES."t/35.gs");
}else if( $_POST["script"]=="PHP" ){
include(DIREDES."t/35.gs");
}else if( $_POST["script"]=="HTM" ){
$Fichero = '../_tmp/edes_htm.'.$_User;
file_put_contents($Fichero, $_POST["fuente"], 0666);
if( trim($_POST["fuente"])<>"" ){
for($n=SESS::$_RecentFiles; $n>0; $n--){
$file = "../_d_/usr/htm.".S::$_User.".{$n}";
if( file_exists($file) ){
if( $n==SESS::$_RecentFiles ) @unlink($file);
else @rename($file, "../_d_/usr/htm.".S::$_User.".".($n+1));
}
}
file_put_contents("../_d_/usr/htm.".S::$_User.".1", $_POST["fuente"], 0666);
}
}
eEnd();
}else if( $_POST["script"]=="HTM" ){
$Fichero = '../_tmp/edes_htm.'.$_User;
file_put_contents($Fichero, $_POST["fuente"], 0666);
if( trim($_POST["fuente"])<>"" ){
for($n=SESS::$_RecentFiles; $n>0; $n--){
$file = "../_d_/usr/htm.".S::$_User.".{$n}";
if( file_exists($file) ){
if( $n==SESS::$_RecentFiles ) @unlink($file);
else @rename($file, "../_d_/usr/htm.".S::$_User.".".($n+1));
}
}
file_put_contents("../_d_/usr/htm.".S::$_User.".1", $_POST["fuente"], 0666);
}
eEnd();
}
if( $_POST["script"][0]=='$' && SESS::$_D_!="~" ){
die(".");
}
$oScript = $script;
$script = eScript($_POST['script'], $bak);
if( isset(SESS::$_gsDirAccess) && count(SESS::$_gsDirAccess)>0 ){
$ConAcceso = false;
for($n=0; $n<count(SESS::$_gsDirAccess); $n++){
if( eSubstrCount($script, '/'.SESS::$_gsDirAccess[$n].'/')==1 ){
$ConAcceso = true;
break;
}
}
if( !$ConAcceso ){
echo 'InfoError("Sin Acceso");';
eEnd();
}
}
if( file_exists($script) && !is_writable($script) ){
echo "top._PARENT.S.error(top, 'El fichero &#34;".basename($script)."&#34; no tiene permiso de escritura');";
eEnd();
}
clearstatcache();
$md5Old = md5_file($script);
$scriptOrigin = $script;
if( $md5Old!=$_POST['md5'] ){
echo 'top.S.info();setTimeout(function(){alert("Operación anulada")}, 100);';
eEnd();
}
if( eSubstrCount($_POST["fuente"], '$'.'_SE'.'SSION')>0 ){
$stxt = $_POST["fuente"];
$pos = mb_stripos($txt, '[Note]');
if( $pos!==false ){
$stxt = mb_substr($stxt, 0, $pos);
}
if( eSubstrCount($stxt, '$'.'_SE'.'SSION')>0 ){
eExplodeLast($script, "/", $no, $script);
echo 'top.S.info();';
echo 'top._PARENT.S.error(top, "Variable &#34;$'.'_SE'.'SSION[]&#34; en &#34;<b>'.eSubstrCount($stxt, '$_S'.'ESSION').':'.$script.'</b>&#34; no permitida, cámbiela por &#34;$_ENV[\':\'][]&#34; o &#34;$_SESS[]&#34;", 10000);';
eEnd();
}
}
copy($script, $script.'.bak');
$grabarFile = false;
$chequeaPHP = false;
if( $script=='../_datos/config/key_help.htm' ){
$texto = str_replace("{#~92~#}", CHR92, $_POST["fuente"]);
file_put_contents($script, $texto, 0666);
file_put_contents(DIREDES."web/aplication/_datos/config/key_help.htm", $texto, 0666);
file_put_contents("../../edes.v3.ok/_datos/config/key_help.htm", $texto, 0666);
}else if( $script=='../tree/__personal.'.SESS::$_UserLogin ){
$texto = str_replace("{#~92~#}", CHR92, $_POST["fuente"]);
$texto = gzcompress("__personal.".SESS::$_UserLogin."\n".$texto, 9);
file_put_contents($script, $texto, 0666);
}else if( eSubstrCount(str_replace('\\', '/', $script), '/edes.v3/')==1 || eSubstrCount(str_replace('\\','/',$script),"/edes.v3/")==1 ){
if( SESS::$_D_!="~" ){
echo 'top.S.info();setTimeout(function(){alert("Grabación no autorizada...")},100);';
eEnd();
}else{
$sFile = str_replace('\\','/',$script);
if( eSubstrCount($sFile,"__edes.arb") || eSubstrCount($sFile,"__analista.arb") || eSubstrCount($sFile,"__master.arb") || eSubstrCount($sFile,"__programador.arb") ){
eExplodeLast(str_replace('\\','/',$script), "/", $no, $NomArbol);
$texto = $_POST["fuente"];
$texto = str_replace("{#~92~#}", CHR92, $texto);
$texto = gzcompress($NomArbol."\n".$texto, 9);
file_put_contents($script, $texto, 0666);
}else{
if( mb_substr($script,-4)==".zdf" ){
$_POST["fuente"] = "eDes ".gzcompress($_POST["fuente"]);
}
file_put_contents($script, str_replace("{#~92~#}", CHR92, $_POST["fuente"]."\n"), 0666);
$chequeaPHP = true;
}
}
}else{
if( $script=="../_datos/config/sql.ini" || $script=="../_datos/config/share.ini" || $script=="../_datos/config/desktop.ini" || $script=="../_datos/config/session.ini" || $script=="../_datos/config/desktop_user_web.ini" ){
global $_gotoError;
$_gotoError = null;
$res = chequearFilePHP($script, str_replace(array("{#~92~#}"), array(CHR92), $_POST["fuente"]));
if( $res<>"ok" ){
echo "setTimeout(function(){top._PARENT.S.error(top,'Operación anulada.<br><br>{$res}');".(($_gotoError<>null)? "top._Editor.setCursor({$_gotoError});":"")."},100);";
eEnd();
}
}
if( $script=="../_d_/usr/note.".S::$_User ) $_POST["fuente"] = gzcompress($_POST["fuente"], 6);
$texto = $_POST["fuente"];
$grabarFile = true;
$chequeaPHP = true;
}
if( trim($_POST['fuente'])=='' ){
@unlink($script);
@unlink($script.".bak");
echo 'top.S.info();top._PARENT.S.error(top,"Fichero borrado");';
eEnd();
}
if( isBase64($_POST['fuente']) ) {
$res = "ERROR: file in base64";
echo "setTimeout(function(){top._PARENT.S.error(top,'{$res}');".(($_gotoError!=null)? "top._Editor.setCursor({$_gotoError});":"")."}, 1000);";
eEnd();
}
if( $chequeaPHP ){
global $_gotoError;
$_gotoError = null;
$res = chequearPHP(str_replace("{#~92~#}", CHR92, $_POST["fuente"]));
if( $res!="ok" ){
echo "setTimeout(function(){top._PARENT.S.error(top,'{$res}');".(($_gotoError!=null)? "top._Editor.setCursor({$_gotoError});":"")."}, 1000);";
eEnd();
}
}
$extFile = eFileType($script);
if( $extFile=="ecss" ){
include(DIREDES."t/parse_css.php");
$txtCSS = _parseStringCSS($texto, "r");
$fileCSS = mb_substr($script, 0, -mb_strlen($extFile))."css";
file_put_contents($fileCSS, $txtCSS);
}
if( $grabarFile ){
if( mb_substr($script,-4)==".zdf" ){
$texto = "eDes ".gzcompress($texto);
}
file_put_contents($script, str_replace("{#~92~#}", CHR92, $texto."\n"), 0666);
if( $script=='---../_datos/config/group.var---' ){
$dim = eFileGetVar();
$dim[SETUP]['_Charset'] = ($dim[SETUP]['System']['CharsetText'] ? 'UTF-8' : 'UTF-8');
$dim[SETUP]['_DevelopmentSrv'] = ($_Development ? true : false);
$dim['Desktop']['DefaultTreeFolder'] = explode(",", $dim['Desktop']['DefaultTreeFolder']);
$dim[SETUP]['LogTrace'] = array();
$tmp = explode(",", eNsp($dim[SETUP]['LogHistory']['LogTrace']));
for($n=0; $n<count($tmp); $n++) $dim[SETUP]['LogTrace'][$tmp[$n]] = true;
$classTxt = SYS::arrayToClass('SETUP', $dim, true);
file_put_contents('../_datos/config/setup.class.php', $classTxt);
}
}
clearstatcache();
$md5 = md5_file($script);
CrearDirectorios($bak);
file_put_contents($bak.'.edt', $_POST['status'], 0666);
$_DirEDes = $_PathHTTP;
$tmp = explode('/', $_PathHTTP);
$_DirApli = ''; for($n=0; $n<count($tmp)-2; $n++) $_DirApli .= $tmp[$n].'/';
$_DirEDes = ''; for($n=0; $n<count($tmp)-3; $n++) $_DirEDes .= $tmp[$n].'/';
$_DirBase = $_DirEDes;
eExplodeLast($script, '/', $fPath, $NomScript);
eExplodeLast($bak, '/', $fPathBak);
$fPath = $script;
$fPathBak .= '/'.$NomScript;
CrearDirectorios($fPathBak);
system("diff {$script} {$script}.bak > {$script}.diff");
$i = (int)eGetMicrotime();
CrearDirectorios("{$_DirApli}_bak_/_daily/{$NomScript}");
copy($script, "{$_DirApli}_bak_/_daily/{$NomScript}.{$i}");
copy("{$script}.diff", "{$_DirApli}_bak_/_daily/{$NomScript}.{$i}.diff");
$_Backup  = eFileGetVar('../_d_/cfg/edes.ini->$_Backup' );
$_Backup2 = eFileGetVar('../_d_/cfg/edes.ini->$_Backup2');
$_nBackup = eFileGetVar('../_d_/cfg/edes.ini->$_nBackup');
if( eSubstrCount($script, '/edes.v3/')==0 ){
if( !empty($_Backup) ){
if( $_Backup[0]=='/' ) $_Backup = mb_substr($_Backup,1,0);
if( mb_substr($_Backup,-1)=='/' ) $_Backup = mb_substr($_Backup,0,-1);
$_Backup = str_replace('../', "{$_DirBase}{$_Backup}/", $script);
$_BackupDiff = $_Backup.".diff";
CrearDirectorios($_Backup);
}
if( !empty($_Backup2) ){
if( $_Backup2[0]=='/' ) $_Backup2 = mb_substr($_Backup2,1,0);
if( mb_substr($_Backup2,-1)=='/' ) $_Backup2 = mb_substr($_Backup2,0,-1);
$_Backup2 = str_replace('../', "{$_DirBase}{$_Backup2}/", $script);
$_Backup2Diff = $_Backup2.".diff";
CrearDirectorios($_Backup2);
}
}else{
$_Backup  = '';
$_Backup2 = '';
}
if( $_nBackup!='' && $_nBackup!='0' ){
if( !is_numeric($_nBackup) ){
$fPathBak = $fPathBak.'.'.date($_nBackup);
}else if( $_nBackup==-2 ){
$fPathBak = '';
error_log(((file_exists($fPathBak)) ? CHR13.CHR10:'').str_repeat('·',75).'[Bak] '.date('Y-m-d H:i:s').CHR13.CHR10.file_get_contents($fPath), 3, $fPathBak);
}else if( $_nBackup==-1 ){
$fPathBak = $fPathBak.'.'.date('Ymd');
}else if( $_nBackup>0 ){
$fPathBak = $fPathBak.'.'.(date('z') % $_nBackup);
}
$fPathBakDiff = $fPathBak.'.diff';
if( !empty($fPathBak) ){
copy($script		 , $fPathBak    );
copy("{$script}.diff", $fPathBakDiff);
}
}
if( !empty($_Backup) ){
copy($script		 , $_Backup    );
copy("{$script}.diff", $_BackupDiff);
}
if( !empty($_Backup2) ){
copy($script		 , $_Backup2    );
copy("{$script}.diff", $_Backup2Diff);
}
$_User = S::$_User;
$cdi = date('Y-m-d H:i:s', $i);
$tipo = 'F';
if( eSubstrCount($oScript,'/_datos/config')>0 || eSubstrCount($oScript,'/tree/')>0 ){
$tipo = 'C';
}
if( $md5Old!=$md5 ){
S::qQuery("insert into {$_ENV['eDesDictionary']}gs_activity (cd_gs_user, cdi, script, edes, email) values ({$_User}, '{$cdi}', '{$oScript}', '{$tipo}', '".SESS::$_UserEMail."')");
}
$Recientes = '../_d_/usr/recientes.'.S::$_User;
$Dim = [];
if( file_exists($Recientes) ){
$Dim = file($Recientes);
}
$txt = $_POST['script']."\n";
for($i=0; $i<count($Dim); $i++){
$Dim[$i] = trim($Dim[$i]);
if( $_POST['script']!=$Dim[$i] && $Dim[$i]!="" ) $txt .= $Dim[$i]."\n";
if( $i>SESS::$_RecentFiles ) break;
}
file_put_contents($Recientes, $txt, 0666);
$MasInfo = '';
if( eSubstrCount($_POST['fuente'], '[Fields] PDF')>0 ){
$total = 1;
$dim = explode(CHR10, $_POST['fuente']);
for($n=0; $n<count($dim); $n++){
if( mb_strtoupper(trim($dim[$n]))=='[FIELDS] PDF' ){
for($i=$n+1; $i<count($dim); $i++){
$x = trim($dim[$i]);
if( $x!='' && $x[0]!='.' && $x[0]!='/' && $x[0]!='{' ){
if( $x[0]=='[' ) break;
$lon = explode('|', $x)[4];
$total += ($lon*1)+1;
}
}
if( $total>1 ){
if( $total>176 ){
$MasInfo = ",'ERROR en longitud del PDF {$total} (máximo 176)'";
}else{
$MasInfo = ",'Longitud del PDF {$total}'";
}
}
break;
}
}
}
$CampoProhibido = '';
if( preg_match('/\[FIELDS\]/iu', $_POST['fuente']) ){
$noFields = file_get_contents(DIREDES."t/fields.no");
$noFields = '/^('.str_replace(array(CHR10, CHR13), array("|", ""), $noFields).')$/i';
$dim = explode(CHR10, $_POST['fuente']);
for($n=0; $n<count($dim); $n++){
if( preg_match('/\[FIELDS\]/iu', $dim[$n]) ){
for($i=$n+1; $i<count($dim); $i++){
$x = trim($dim[$i]);
if( $x!='' && $x[0]!='.' && $x[0]!='/' && $x[0]!='{' ){
if( $x[0]=='[' ) break;
$campo = trim(explode('|', $x)[1]);
if( $campo!="" ){
$campo = trim(explode('{', $campo.'{')[0]);
$campo = trim(explode(':', $campo.':')[0]);
if( preg_match($noFields, $campo) ){
$CampoProhibido = ",'ERROR nombre de campo no permitido &#34;<b>{$campo}</b>&#34;'";
}
}
}
}
}
}
}
if( mb_substr($_POST["script"],0,2)=="p/" ){
$script = $_POST["script"];
$code = str_replace("{#~92~#}", CHR92, $texto."\n");
include(DIREDES."t/parseador.php");
}
clearstatcache();
$md5 = md5_file($scriptOrigin);
echo "Grabado('{$md5}','".$_POST["script"]."','".str_replace("\n", "|", trim($txt))."'{$MasInfo}{$CampoProhibido});";
eEnd();
}
if( $_GET["LoadSel"] && $_GET["TOTRON"]==1 ){
if( eSubstrCount($_GET["LoadSel"], "_php.")>0 ){
copy(eScript($_GET["LoadSel"]), "../_d_/usr/php.".S::$_User.".tmp");
$_GET["LoadSel"] = "PHP";
$_GET["_LastPHP"] = "tmp";
}else{
copy(eScript($_GET["LoadSel"]), "../_d_/usr/sql.".S::$_User.".tmp");
$_GET["LoadSel"] = "SQL";
$_GET["_LastSQL"] = "tmp";
}
}
if( $_GET["LoadSel"] ){
$bakLoadSel = $_GET["LoadSel"];
if( $_GET["LoadSel"][0]=='$' && SESS::$_D_!="~" ){
die(".");
}
$_GET["LoadSel"] = str_replace(
array("session.def.ini","session.ini.ini")
,array("session.def"    ,"session.ini")
,$_GET["LoadSel"]
);
if( mb_substr($_GET["LoadSel"],-4)==".ini" && eSubstrCount($_GET["LoadSel"], "/")==0 ) $_GET["LoadSel"] = "/_datos/config/".$_GET["LoadSel"];
if( mb_substr($_GET["LoadSel"],-4)==".def" && eSubstrCount($_GET["LoadSel"], "/")==0 ) $_GET["LoadSel"] = "/_datos/config/".$_GET["LoadSel"];
if( mb_substr($_GET["LoadSel"],-4)==".arb" && eSubstrCount($_GET["LoadSel"], "/")==0 ) $_GET["LoadSel"] = '$t/'.$_GET["LoadSel"];
if( $_GET["LoadSel"]=="ChangeLog" ) $_GET["LoadSel"] = '$_change.log';
$res = cargarScript($_GET["tab"], $_GET["LoadSel"]);
if( gettype($res)!="boolean" ){
$fileTmp = $GLOBALS["__scriptUser"];
if( $fileTmp[0]=="." ){
}else if( $fileTmp[0]=="/" ){
$fileTmp = "..".$fileTmp;
}else{
$fileTmp = "../d/".$fileTmp;
}
?>
<script type="text/javascript" charset="UTF-8">
var WOPENER = window.frameElement.WOPENER;
WOPENER.S.init(window);
S("TR[eTAB]", WOPENER).none();
var tr = S(".TABS", WOPENER).tr("I", null, [{css:"padding:0px;vertical-align:top;", text:S('#SCRIPT<?=$_GET["tab"]?>').HTML()}], {eTab:<?=$_GET["tab"]?>});
S('#SCRIPT<?=$_GET["tab"]?>').HTML("");
var txt = WOPENER.document.forms["FRM<?=$_GET["tab"]?>"].fuente.value;
txt = txt.replace(/#~#/g,"&").replace(/#<#/g,"<").replace(/#>#/g,">");
WOPENER.document.forms["FRM<?=$_GET["tab"]?>"].fuente.value = txt;
<?PHP
if( $_GET["CDI"] !="" ) $_GET["LoadSel"] = "ERROR-HTML";
if( $_GET["POST"]!="" ) $_GET["LoadSel"] = "ERROR-POST";
if( $_GET["LoadSel"]=="ERRORES" ){
$_GET["topLinea"] = 99999;
}
?>
WOPENER.DimScript[<?=$_GET["tab"]?>] = ["<?=$_GET["LoadSel"]?>","",""];
setTimeout(function(){
WOPENER.S.info();
WOPENER.document.body.focus();
if( WOPENER.SetEditor ){
WOPENER.SetEditor(WOPENER.document["FRM<?=$_GET["tab"]?>"]["fuente"]<?=(($_GET["topLinea"]<>"")? ",".($_GET["topLinea"]-1):"")?>, "<?=$_GET["col"]?>");
}else{
S("TR[eTAB='<?=$_GET["tab"]?>']", WOPENER).css("display:inline-grid; width:100%; height:100%;");
S(".TABSCRIPT", WOPENER).class("-TABNOW");
S(S(".TABSCRIPT", WOPENER).dim[<?=$_GET["tab"]?>]).class("+TABNOW");
WOPENER.document["FRM<?=$_GET["tab"]?>"].elements["fuente"].style.display = "block";
}
}, 200);
</script>
<?PHP
}
eEnd();
}
if( $_GET["SHELL"]==1 || $_GET["TRON"]==1 || $_GET["TRON_1"]==1 || $_GET["SAVESQL"]==1 ){
if( $_GET["SHELL"]==1 ) $txt = "SHELL";
if( $_GET["TRON"]==1 ) $txt = "TRON";
if( $_GET["TRON_1"]==1 ) $txt = "TRON_1";
if( $_GET["SAVESQL"]==1 ) $txt = "SAVESQL";
cargarShell($_GET["tab"], $txt, "display:table");
?>
<script type="text/javascript" charset="UTF-8">
var WOPENER = window.frameElement.WOPENER, p,n,ok=true;
WOPENER.S.init(window);
S("TR[eTAB]", WOPENER).none();
var tr = S(".TABS", WOPENER).tr("I", null, [{css:"display:table;padding:0px;vertical-align:top;", text:S('#SCRIPT<?=$_GET["tab"]?>').HTML()}], {eTab:<?=$_GET["tab"]?>});
S('#SCRIPT<?=$_GET["tab"]?>').HTML("");
S(S("TR[eTAB='<?=$_GET["tab"]?>']", WOPENER).obj.parentNode).dim[0].style.display = "block";
S(S("TR[eTAB='<?=$_GET["tab"]?>']", WOPENER).obj).dim[0].style.display = "block";
S("TD", S("TR[eTAB='<?=$_GET["tab"]?>']", WOPENER).obj).dim[0].style.width = "100%";
S("TD", S("TR[eTAB='<?=$_GET["tab"]?>']", WOPENER).obj).dim[0].style.height = "100%";
<?PHP if( $txt!="SHELL" ){ ?>
for(n=0; n<WOPENER.DimScript.length; n++){
if( WOPENER.DimScript[n][0]=="<?=$txt?>" ){
WOPENER.verElScript(n);
ok = false;
break;
}
}
<?PHP } ?>
if( ok ){
WOPENER.DimScript[<?=$_GET["tab"]?>] = ["<?=$txt?>","",""];
}else{
if( "<?=$txt?>"=="SAVESQL" || "<?=$txt?>"=="TRON" || "<?=$txt?>"=="TRON_1" ){
S("TR[eTAB='<?=$_GET["tab"]?>']", WOPENER).obj.outerHTML = "";
}
}
setTimeout(function(){
WOPENER.document.body.focus();
if( ok ) WOPENER.verElScript(<?=$_GET["tab"]?>);
}, 200);
</script>
<?PHP
eEnd();
}
if( $_GET["ORDEN"] ){
echo "<script type='text/javascript'>";
$op = explode(",", $_GET["ORDEN"]);
for($n=0; $n<count($op); $n++){
switch($op[$n]){
case 28:
@unlink("../_tmp/__tron.".S::$_User);
if( count($op)==1 ) echo 'top.S.info("TRON borrado",3);';
break;
case 29:
@unlink("../_tmp/log/sql.".S::$_User);
echo 'top.S.info("SAVESQL borrado",3);';
break;
case 89:
@unlink("../_tmp/err/_log.err");
@unlink("../_tmp/err/_log_short.err");
if( count($op)==1 ) echo 'top.S.info("Errores borrados",3);';
break;
case 92:
@unlink("../_tmp/__tron.-1");
if( count($op)==1 ) echo 'top.S.info("TRON-1 borrado",3);';
break;
case 94:
@unlink("../_tmp/err/_parse_error.".S::$_User);
if( count($op)==1 ) echo 'top.S.info("_parse_error borrados",3);';
break;
case 98:
@unlink("../_tmp/err/_log_php.".date('ym'));
if( count($op)==1 ) echo 'top.S.info("_log_php borrado",3);';
break;
}
}
if( count($op)>1 ){
echo 'top.S.info("Borrado todo", 3);';
}
echo "</script>";
exit;
}
if( $_GET["help"] ){
$script = DIREDES."h/".trim(mb_strtolower($_GET["help"])).".htm";
echo '<textarea id="help">';
$texto = file_get_contents($script);
echo '<div style="display:none">';
echo '<style>#TIP{padding:3px;}'.file_get_contents(DIREDES.'h/i/label.css').'</style>';
echo '</div>';
$ini = mb_strpos($texto, '<'.'!-- [HelpIni] --'.'>')+18;
$fin = mb_strpos($texto, '<'.'!-- [HelpEnd] --'.'>');
$texto = mb_substr($texto, $ini, $fin-$ini);
echo $texto;
echo '</textarea>';
?>
<script type="text/javascript" charset="UTF-8">
top.S.init(window);
top.S.info(S("#help").val());
var Esquema = S("#Esquema",WOPENER).obj, n;
Esquema.style.borderSpacing = "0px";
for(n=0; n<Esquema.rows.length; n++){
if( S.trim(Esquema.rows[n].cells[0].innerText)=="" ){
S(Esquema.rows[n]).none();
if( Esquema.rows[n-1].id[0]=="t" ){
S(Esquema.rows[n-1]).none();
}
}
}
WOPENER.focus();
</script>
<?PHP
exit;
}
if( $_GET["EXPJS"] ){
$txt = "";
foreach($_POST as $k=>$v) $txt .= str_replace(array('"','{#~92~#}'),array('&#34;','&#92;'), $v)."\n";
file_put_contents("../_d_/usr/expjs.".S::$_User, $txt, 0666);
eEnd();
}
if( $_GET["EXPPHP"] ){
$txt = "";
foreach($_POST as $k=>$v) $txt .= str_replace(array('"','{#~92~#}'),array('&#34;','&#92;'), $v)."\n";
file_put_contents("../_d_/usr/expphp.".S::$_User, $txt, 0666);
$resp = "";
$exp = str_replace('{#~92~#}', '\\', trim($_POST["ExpresionPHP"]));
if( $exp[0]<>'/' ) $exp = '/'.$exp.'/u';
foreach($_POST as $k=>$v){
if( $k<>"ExpresionPHP" ){
$resp .= "{$k}=";
try{
if( preg_match($exp, $v) ){
$resp .= "j;";
}else{
$resp .= "i;";
}
}catch(Exception $e){
$resp .= "=;";
}
}
}
echo "<script type='text/javascript'>";
echo "top.ResultadosExpPHP('{$resp}');";
echo "</script>";
eEnd();
}
if( $_GET["TE"]=="EDF" && $_GET["SC"]!="" ){
$_DirEDes = DIREDES;
list($ddbb, $tabla, $owner) = explode(".", $_GET["SC"]);
if( $owner!="" ){
$_SqlOwner = $ddbb;
$ddbb = $tabla;
$tabla = $owner;
}else if( $tabla=="" ){
$tabla = $ddbb;
$ddbb = "";
}
$_Sql = "";
$_SqlPDOType = "";
if( $ddbb!="" ){
$__DDBB = $ddbb;
$tmp2 = $ddbb;
if( eSubstrCount(str_replace('\\','/',$tmp2),'/')==0 ) $tmp2 = '/_datos/config/'.$tmp2;
if( eSubstrCount($tmp2,'.')==0 ) $tmp2 .= '.ini';
$_OtroDiccionario = true;
}else{
$tmp2 = '/_datos/config/sql.ini';
$_OtroDiccionario = false;
}
include(eScript($tmp2));
eInclude($_Sql);
if( eSubstrCount($tabla,"->")>0 ){
list($ddbb2, $tabla) = explode("->", $tabla);
if( eSqlType('mysql,mysqli') ){
qQuery("use {$ddbb2}");
}
}
$txt = crearEDF($tabla);
file_put_contents(eScript($_GET["SCRIPT"]), $txt, 0666);
echo '<script type="text/javascript">window.frameElement.WOPENER.Orden(6,"'.$_GET["SCRIPT"].'");</script>';
die("ok");
}
if( isset($SUBLIST) ){
include(DIREDES."t/31.gs");
eEnd();
}
if( isset($_GET["cfg"]) ){
file_put_contents("../_d_/usr/cfg.".S::$_User, $_GET["cfg"], 0666);
?>
<script>
top.S.info("Configuración grabada", 1);
</script>
<?PHP
eEnd();
}
if( $_GET["OWNER"] ){
if( !function_exists('qCount') ){
global $_SqlHostName, $_SqlUsuario, $_SqlPassword, $_SqlDiccionario;
$tmpFile = '../_datos/config/sql.ini';
include($tmpFile);
include(DIREDES.$_Sql.'.inc');
}else{
sql_Conecta();
}
list($Buscar) = explode('&',$_GET['OWNER']);
$Buscar = str_replace('edes.php?','',$Buscar);
if( eSubstrCount($Buscar, ':')>0 ){
list($Modo, $Buscar) = explode(':',$Buscar);
if( eSubstrCount($Buscar, '.')==0 ){
if( eSubstrCount($Modo, '#')>0 || eSubstrCount($Modo, 'F')>0 || eSubstrCount($Modo, 'L')>0 ) $Buscar .= 'edf';
else $Buscar .= 'gdf';
}
}
$Dim = array();
$nMax = 0;
qQuery("select cd_gs_user,count(*) from {$_ENV['eDesDictionary']}gs_activity where script='{$Buscar}' group by 1 order by 2 desc");
while( $r=qRow() ){
qQuery("select user_name,user_surname from {$_ENV['eDesDictionary']}gs_user where cd_gs_user={$r[0]}", $p1);
list($Nombre, $Apel) = qRow($p1);
qQuery("select max(cdi) from {$_ENV['eDesDictionary']}gs_activity where script='{$Buscar}' and cd_gs_user={$r[0]}", $p1);
list($cdi) =qRow($p1);
$Dim[] = $cdi.'|'.$r[1].'|'.trim($Nombre).' '.trim($Apel);
if( $nMax < $r[1] ) $nMax = $r[1];
}
sort($Dim);
$txt = '';
for($n=count($Dim)-1; $n>=0; $n--){
$tmp = explode('|',$Dim[$n]);
if( $txt!='' ) $txt .= '<br>';
$txt .= str_pad($tmp[1], mb_strlen($nMax.''), '0', STR_PAD_LEFT).' Â· '.$tmp[0].' Â· '.$tmp[2];
}
?>
<script>
top.S.info('<?= 'SCRIPT: '.$Buscar.'<br><br>'.$txt ?>', 99);
</script>
<?PHP
eEnd();
}
if( $_GET["LISTDIR"] ){
$dim =array();
$hd = opendir("../d");
while( $file=readdir($hd) ){
if( $file=="." || $file==".." || is_dir($file) ) continue;
if( mb_substr($file,-4)==".idf" ){
$dim[] = $file;
}
}
closedir($hd);
$txt = "";
for($n=0; $n<count($dim); $n++){
$txt .= "menu.push(['{$dim[$n]}', '', '']);";
}
$txt = <<<EOD
var menu = [['-Include']];
{$txt}
top.S('body').tree(menu,{expanded:true, modal:true, function:function(op,tr,para,label){
var cm = top._Editor,
nLinea = cm.getCursor()["line"]*1,
line = cm.doc.getLine(nLinea),
c = cm.getCursor()["ch"],
n = cm.getDoc().scrollTop,
rem = (line+"/"+"/").split("/"+"/")[1];
line = line.split(")")[0]+") "+label;
if( rem!="" ) line += "\\t\\t\\t"+"/"+"/"+rem;
var dim = cm.doc.getValue().split("\\n");
dim[nLinea] = line;
top._CargaEDF(dim.join("\\n"));
cm.scrollTo(0, n);
cm.setCursor(nLinea, line.length);
top.S(this).nodeRemove();
}});
EOD;
eExeScript($txt);
}
if( isset($_GET["RestoreCopy"]) ){
?>
<textarea id="CONTENEDOR"><?=file_get_contents(eScript($_GET["RestoreCopy"]))?></textarea>
<script type="text/javascript">
if( top.EditorActivo() ){
var txt = top.S("#CONTENEDOR", window).val();
txt = txt.replace(/#&#34;/g, '"').replace(/#&#39;/g, "'").replace(/#&#60;/g, "<").replace(/#&#62;/g, ">").replace(/#&#92;/g, "\\").replace(/#&#chr10;/g, String.fromCharCode(10)).replace(/#&#chr13;/g, String.fromCharCode(13));
top._Editor.doc.setValue(txt);
top.colorear();
top.S.warning("<b>Restored script</b><br>some characters may be incorrectly recovered");
}
</script>
<?PHP
eEnd();
}
if( isset($_GET["ListRestoreCopy"]) ){
$file = $_GET["ListRestoreCopy"];
$files = [];
eExplodeLast($file, "/", $iz, $nameFile);
$filesTmp  = glob("../_bak_/_daily/{$nameFile}.*");
for($i=0; $i<count($filesTmp); $i++){
if( eFileType($filesTmp[$i])=="diff"  ){
continue;
}
$time = eFileType($filesTmp[$i]);
$files[] = date("Y-m-d H:i:s", $time)."|".$filesTmp[$i];
}
$filesTmp = glob("../_bak_/d/{$file}.*");
for($i=0; $i<count($filesTmp); $i++){
$type = eFileType($filesTmp[$i]);
if( !is_numeric($type) || $type=="diff" || eSubstrCount($filesTmp[$i], ".test.")==1 ){
continue;
}
$time = filemtime($filesTmp[$i]);
$files[] = date("Y-m-d H:i:s", $time)."|".$filesTmp[$i];
}
rsort($files);
$lastDate = "";
$total = count($files);
$coma = ",";
$final = "";
for($i=0; $i<$total; $i++){
list($date, $filename) = explode("|", $files[$i]);
$header = ' style="font-family:number"';
$pre = "";
$suf = "";
$coma = ",";
$carpeta = "";
if( $lastDate!=substr($date, 0, 7) ){
$lastDate = substr($date, 0, 7);
$carpeta = "{$final},['{$lastDate}','',[";
$coma = "";
$final = "]]";
}
$files[$i] = "{$carpeta}{$coma}['{$pre}{$date}{$suf}', '', '{$filename}', '', '', '', '{$header}']";
}
$menu = implode("", $files).$final;
$txt = <<<EOD
var dim =[["-List of copies"]{$menu}];
top.SelRestoreCopy(dim);
EOD;
eExeScript($txt);
}
if( $_GET["VERINCLUDE"] ){
$txt = file_get_contents("../d/".$_GET["VERINCLUDE"]);
$txt = trim(str_replace(array("<",">","\n","\r"," ","'",'"'), array("&#60;","&#92;","<br>","<br>","&nbsp;","&39;","&34;"), $txt));
$txt = "var o = top.S.info('>>><center>".$_GET["VERINCLUDE"]."</center><textarea wrap=\'VIRTUAL\' style=\'font-family:monospace\'>{$txt}</textarea>');top.verInclude(o);";
eExeScript($txt);
}
if( $_GET["_SetupTable"]=="save" ){
file_put_contents("../_d_/usr/schema.".S::$_User, $_POST['data']);
echo "Grabado";
eEnd();
}
function crearEDF($TABLA){
global $_DirEDes, $_Sql, $_SqlPDOType;
if( $TABLA<>"" ){
$TABLA = trim($TABLA);
$GLOBALS["_CreateQuestion"] = false;
if( eSubstrCount($TABLA, "{question}")==1 ){
$GLOBALS["_CreateQuestion"] = true;
$TABLA = trim(str_replace("{question}", "", $TABLA));
}
include("{$_DirEDes}t/credf.inc");
if( eSqlType('mysql') ){
$Todo = CreaFCHMySql($TABLA);
}else if( eSqlType('mysqli') ){
$Todo = CreaFCHMySqli($TABLA);
}else if( eSqlType('informix','pdo.informix') ){
$Todo = CreaFCHInformix($TABLA);
}else if( eSqlType('oracle', 'pdo.oracle') ){
$Todo = CreaFCHOracle($TABLA);
}else{
eEnd();
}
return $Todo;
}
}
_HeaderAdd();
eHTML();
echo '<link id="FAVICON" rel="icon" href="edes.php?E:$keyhelp/edes_'.((SESS::$_Development)?"d":"p" ).'.ico" type="image/x-icon"/>';
echo "\n";
if( isset($_ENV["_gsEditDirect"]) && $_ENV["_gsEditDirect"]=='S' ){
?>
<style>
@font-face{
font-family:'eDes';
font-weight:normal;
font-style:normal;
text-transform:none;
font-display:fallback;
src:local('eDes'),
url('fonts/edes.woff?v=4.7.0') format('woff'),
url('fonts/edes.ttf?v=4.7.0') format('truetype'),
url('fonts/edes.svg?v=4.7.0#fontawesomeregular') format('svg'),
url('fonts/edes.eot'),
url('fonts/edes.eot?#iefix&v=4.7.0') format('embedded-opentype');
}
@font-face{
font-family:'numbers';
font-weight:400;
font-style:normal;
font-display:fallback;
src:local('numbers'),
url('fonts/enumbers.woff') format('woff'),
url('fonts/enumbers.ttf') format('truetype'),
url('fonts/enumbers.svg#enumbers') format('svg'),
url('fonts/enumbers.eot'),
url('fonts/enumbers.eot?#iefix') format('embedded-opentype');
}
@font-face{
font-family:'Libre Franklin';
font-style:normal;
font-weight:400;
font-display:fallback;
src:local('Libre Franklin'), local('LibreFranklin-Regular'),
url('fonts/libre-franklin-v4-latin-regular.woff2') format('woff2'),
url('fonts/libre-franklin-v4-latin-regular.woff') format('woff'),
url('fonts/libre-franklin-v4-latin-regular.ttf') format('truetype'),
url('fonts/libre-franklin-v4-latin-regular.svg#LibreFranklin') format('svg'),
url('fonts/libre-franklin-v4-latin-regular.eot'),
url('fonts/libre-franklin-v4-latin-regular.eot?#iefix') format('embedded-opentype');
}
@font-face{
font-family:'Libre Franklin';
font-style:normal;
font-weight:700;
font-display:fallback;
src:local('Libre Franklin Bold'), local('LibreFranklin-Bold'),
url('fonts/libre-franklin-v4-latin-700.woff2') format('woff2'),
url('fonts/libre-franklin-v4-latin-700.woff') format('woff'),
url('fonts/libre-franklin-v4-latin-700.ttf') format('truetype'),
url('fonts/libre-franklin-v4-latin-700.svg#LibreFranklin') format('svg'),
url('fonts/libre-franklin-v4-latin-700.eot'),
url('fonts/libre-franklin-v4-latin-700.eot?#iefix') format('embedded-opentype');
}
<?php
include("css/all.css");
?>
</style>
<?PHP
}
_FileNoCache('core.js', 'Comment="Motor Javascript" id="eDesCore"');
?>
<script type="text/javascript" charset="UTF-8">
if( window.frameElement!=null || top.location!=self.location ){
top.location.href = self.location.href;
}
try{
history.replaceState({foo:"bar"}, "-*-", '<?=SETUP::$System['UrlStatus']?>' || "edes.php");
}catch(e){}
window.name = 'gsEdit';
document.title = "> <?= $_GET["RF"] ?>";
<?PHP if( isset($_ENV["_gsEditDirect"]) && $_ENV["_gsEditDirect"]=='S' ){
echo "var _PARENT = window;";
echo 'S.session.pk = "'.$_GET['_SESS_'].'";';
}else{
echo "var _PARENT = top.window.opener;";
echo 'S.session.pk = _PARENT.S.session.pk;';
}
?>
<?PHP
if( !SESS::$_BYPHONE ){
?>
S.setup.system = '<?=SESS::$OS?>';
S.sheetCopyOne(window, "e-xcss"+S.setup.system);
S.sheetCopyOne(window, "all");
S.sheetCopyOne(window, "tab");
S.sheetCopyOne(window, "list");
<?PHP
}else{
?>
top.window.opener.S.init(window, "all,tab,list");
var oStyle = top.window.opener.document.styleSheets, r,i,t,reglas, sheet=S.sheet(window);
for(r=0; r<oStyle.length; r++){
if( oStyle[r].title!="all" ){
continue;
}
reglas = oStyle[r].rules
t = reglas.length;
for(i=0; i<t; i++){
if( /^@font-face /.test(reglas[i].cssText) ){
sheet.insertRule(reglas[i].cssText, sheet.cssRules.length);
}
}
}
<?PHP
}
?>
S.marksSetup({
thousands:"<?=SETUP::$System['FormatNumber'][0]?>",
decimal:"<?=SETUP::$System['FormatNumber'][1]?>",
month:"<?=SETUP::$System['FormatMonth']?>",
date:"<?=SETUP::$System['FormatDate']?>",
datetime:"<?=SETUP::$System['FormatDateTime']?>",
delimiter:"<?=SETUP::$System['FormatDelimiter']?>",
phone:"<?=SETUP::$System["_FormatT"]?>",
formatP4:["<?=mb_substr(SETUP::$System["_FormatP4EXP"],1,-1)?>", "<?=SETUP::$System["_FormatP4TKNdb"]?>", "<?=mb_substr(SETUP::$System["_FormatP4EXPdb"],1,-1)?>", "<?=SETUP::$System["_FormatP4TKNuser"]?>"],
formatF4:["<?=mb_substr(SETUP::$System["_FormatF4EXP"],1,-1)?>", "<?=SETUP::$System["_FormatF4TKNdb"]?>", "<?=mb_substr(SETUP::$System["_FormatF4EXPdb"],1,-1)?>", "<?=SETUP::$System["_FormatF4TKNuser"]?>"],
formatCDI:["<?=mb_substr(SETUP::$System["_FormatCDIEXP"],1,-1)?>", "<?=SETUP::$System["_FormatCDITKNdb"]?>", "<?=mb_substr(SETUP::$System["_FormatCDIEXPdb"],1,-1)?>", "<?=SETUP::$System["_FormatCDITKNuser"]?>"],
formatT:["<?=mb_substr(SETUP::$System["_FormatTEXP"],1,-1)?>", "<?=SETUP::$System["_FormatTTKNdb"]?>", "<?=mb_substr(SETUP::$System["_FormatTEXPdb"],1,-1)?>", "<?=SETUP::$System["_FormatTTKNuser"]?>"],
weekday:<?=SETUP::$System['FirstWeekDay']?>,
checkbox:"<?=SETUP::$System['CheckboxValues']?>"
});
</script>
<link rel="stylesheet" href="lib/cm/codemirror.css">
<link rel="stylesheet" href="lib/cm/material-ocean.css">
<link rel="stylesheet" href="lib/cm/addon/dialog/dialog.css">
<link rel="stylesheet" href="lib/cm/addon/hint/show-hint.css">
<script src="lib/cm/codemirror.js" charset="UTF-8"></script>
<script src="lib/cm/addon/search/search.js" charset="UTF-8"></script>
<script src="lib/cm/addon/search/searchcursor.js" charset="UTF-8"></script>
<script src="lib/cm/addon/search/jump-to-line.js" charset="UTF-8"></script>
<script src="lib/cm/addon/dialog/dialog.js" charset="UTF-8"></script>
<script src="lib/cm/mode/smalltalk/smalltalk.js" charset="UTF-8"></script>
<script src="lib/cm/addon/hint/show-hint.js" charset="UTF-8"></script>
<script src="lib/cm/addon/hint/anyword-hint.js" charset="UTF-8"></script>
<script src="lib/cm/addon/selection/active-line.js" charset="UTF-8"></script>
<script src="lib/cm/addon/selection/mark-selection.js" charset="UTF-8"></script>
<script src="lib/cm/mode/htmlmixed/htmlmixed.js" charset="UTF-8"></script>
<script src="lib/cm/mode/javascript/javascript.js" charset="UTF-8"></script>
<script src="lib/cm/mode/xml/xml.js" charset="UTF-8"></script>
<script src="lib/cm/mode/php/php.js" charset="UTF-8"></script>
<script src="lib/cm/mode/css/css.js" charset="UTF-8"></script>
<script src="lib/cm/mode/sql/sql.js" charset="UTF-8"></script>
<script src="lib/cm/addon/fold/foldcode.js" charset="UTF-8"></script>
<script src="lib/cm/addon/fold/foldgutter.js" charset="UTF-8"></script>
<script src="lib/cm/addon/fold/brace-fold.js" charset="UTF-8"></script>
<script src="lib/cm/addon/fold/indent-fold.js" charset="UTF-8"></script>
<script src="lib/cm/addon/fold/comment-fold.js" charset="UTF-8"></script>
<link rel="stylesheet" href="lib/cm/addon/fold/foldgutter.css">
<style name="MAIN">
body, html{
height:100%;
width:100%;
}
BODY {
margin:0px;
padding:0px;
overflow:hidden;
}
TABLE { display:table;}
TR { display:table-row;}
TD, TH { display:table-cell;}
.CodeMirror * {
font-family: monospace;
}
.MENU {
}
.MENU TR {
background-color: aliceblue;
}
.MENU TD {
color:black;
cursor:var(--cPointer);
padding: 0px 5px 0px 5px;
}
.MENU TD:hover {
color: red;
}
.SCRIPT {
color: #ffffff;
background-color: #000099;
font-weight: bold;
}
TEXTAREA, TD {
font-size:14px;
}
.style-label {
background-color:#e6f6fd;
color:#0000e7;
font-weight:bold;
}
.style-note {
background-color:#f9f9f9;
color:#7f7f7f;
}
.style-condition {
color:#ffe9e9;
}
.style-label-claro {
background-color:#e6f6fd !important;
color:#0000e7 !important;
font-weight:bold;
}
.style-note-claro {
background-color:#f9f9f9 !important;
color:#7f7f7f !important;
}
.style-condition-claro {
color:#ffe9e9 !important;
}
.style-label-oscuro {
background-color:#00007d !important;
color:#0099ff !important;
font-weight:bold;
}
.style-note-oscuro {
background-color:#353535 !important;
color:#000000 !important;
}
.style-condition-oscuro {
color:#cccccc !important;
}
#TABCONTENEDOR {
border-top:1px solid #dddddd;
}
.TABSCRIPT {
padding:2px 4px 2px 4px;
border-right:1px solid #dddddd;
border-bottom:1px solid #dddddd;
display:table;
float:left;
cursor:var(--cPointer);
color:#7f7f7f;
}
.TABSCRIPT:hover {
background-color:#dcdcdc;
}
.TABNOW {
color: #444444;
background-color:#dcdcdc;
}
.TABCONMARCA {
font-weight: bold;
-color:#000099;
-font-weight: bold;
font-style: italic;
}
.ORDEN {
padding:2px 4px 2px 4px;
border-right:1px solid #dddddd;
border-bottom:1px solid #dddddd;
display:table;
cursor:var(--cPointer);
}
.ORDEN:hover {
background-color:#dcdcdc;
}
#fuente{
cursor:var(--cPointer);
}
DIV #FILE{
background-color:#eaeaea;
color:blue;
margin-top:12px;
cursor:var(--cPointer);
font-weight: bold;
}
DIV #LINEA{
cursor:var(--cPointer);
word-wrap:break-word;
white-space: pre-line;
width:100%;
}
DIV #LINEAREM{
cursor:var(--cPointer);
word-wrap:break-word;
white-space: pre-line;
width:100%;
color:#9a9a9a;
}
#VerLabelFunc {
cursor:var(--cAuto);
}
#ListLabelFunc {
cursor:var(--cPointer);
}
FORM[name='FORMHELP'] INPUT {
font-family: monospace;
}
.DEBUGSQL {
background-color: red;
color: #ffffff;
}
#MARCADOR {
position:absolute;
display:none;
margin-top:2px;
margin-left:-4px;
color:#aaaaaa;
}
#MARCA {
color:#ae2222;
}
.LASTGOTO:before {
content:"*";
font-weight:bold;
color:#666666;
position:relative;
left:-10px;
}
.menuNumeric TD {
font-family: numeric;
}
.CodeMirror div.CodeMirror-cursor {
}
.--CodeMirror-linebackground {
background-color:red;
}
.CodeMirror-vscrollbar::-webkit-scrollbar {
width: 12px;
}
.CodeMirror-hscrollbar::-webkit-scrollbar {
height: 12px;
}
TEXTAREA::-webkit-scrollbar:vertical{
width:12px;
}
TEXTAREA::-webkit-scrollbar:horizontal{
height:12px;
}
</style>
<script type="text/javascript" charset="UTF-8">
var _ExpandeEditor=null,
_LastScript=[],
_AplicationEDES = "gsEdit";
DGT = document.getElementsByTagName;
var _ThemeOscuro = "material-ocean",
_ThemeClaro = "",
_Theme = _ThemeClaro,
_ColorCondi = S.rgb2hex(S.ruleGet(window, ".style-condition-claro")),
_AutoSave = false;
var _Accion="M", _Mode="mR", _UpdateToView=false;
function SeCargo(NomFunc, CampoFoco){
if( (CampoFoco==undefined || CampoFoco=="") && _FieldFocus!="" ) CampoFoco = _FieldFocus;
try{
if( !top.eReadyState(window) ){
setTimeout('SeCargo("'+NomFunc+'","'+CampoFoco+'")', 50);
return;
}
}catch(e){
setTimeout('SeCargo("'+NomFunc+'","'+CampoFoco+'")', 50);
return;
}
if( NomFunc.length>0 ) eval(NomFunc);
(top.eIsWindow(window)) ? eLoading(false) : top.eLoading(false,window);
if( /^(?:a|mR)$/.test(_Mode) && S("INPUT[type=file]").length>0 ){
S("#PAGINA").on('dragover', S.fileDrag);
}
window.focus();
if( CampoFoco!='' && !_UpdateToView ){
var FocoOn = false;
try{
if( !DGI(CampoFoco).readOnly && !DGI(CampoFoco).getAttribute("eReadOnly") && DGI(CampoFoco).offsetWidth>0 ){
eFocus(CampoFoco);
FocoOn = true;
}else{
SiguienteCampo(CampoFoco);
}
}catch(e){
SiguienteCampo();
}
_CampoFoco = document.activeElement;
}
}
function eLoading(on){
}
<?PHP
$file = "../_d_/usr/cfg.".S::$_User;
list($cfg, $auto) = explode("|", file_get_contents($file));
if( $cfg=="1" ){
?>
_Theme = _ThemeOscuro;
_ColorCondi = S.rgb2hex(S.ruleGet(window, ".style-condition-oscuro"));
S(window).rule(".style-label {"+S.ruleGet(window, ".style-label-oscuro")+"}");
S(window).rule(".style-note {"+S.ruleGet(window, ".style-note-oscuro")+"}");
<?PHP
}
if( $auto=="1" ) echo "_AutoSave = true;";
$Recientes = '../_d_/usr/recientes.'.S::$_User;
if( file_exists($Recientes) ){
echo "_LastScript = [['-Últimos Ficheros']";
$Dim = file($Recientes);
for($i=0; $i<count($Dim); $i++){
$Dim[$i] = trim($Dim[$i]);
if( $Dim[$i]=="/_d_/usr/note.".S::$_User ) $Dim[$i] = "NOTES";
echo ",['".$Dim[$i]."','','']";
}
echo "];\n";
}
?>
function DGI(a){
var el;
if( document.getElementById ){
el = document.getElementById(a);
}else if( document.all ){
el = document.document.all[a];
}else if( document.layers ){
el = document.document.layers[a];
}
return el || document.getElementsByName(a)[0] || null;
}
function ExpandeEditor(){
if( _ExpandeEditor==null ){
if( typeof(_Editor)=="undefined"){
}else if( _Editor ) setTimeout(function(){_Editor.focus()}, 1);
_ExpandeEditor = 1;
}
}
function NextSeekMultiple(metodo, info){
if( _LastJumpSeek==null ){
_LastPosition = 0;
metodo = "nextElementSibling";
}
if( _LastPosition==null ) _LastPosition = 0;
if( metodo=="nextElementSibling" ){
_LastPosition++;
if( S("SPAN[posicion='"+_LastPosition+"']").length==0 ) _LastPosition--;
}else{
_LastPosition--;
if( _LastPosition<1 ) _LastPosition = 1;
}
S(S("SPAN[posicion='"+_LastPosition+"']").obj).eventFire("click");
}
var _LastJumpSeek=null, _LastPosition=null;
function editarFuente(obj){
var o = S.event(window),
oObj = o,
lin = 1, col=0,
txt="", ok=false, n,el;
_LastJumpSeek = o;
if( o.id=="FILE" ){
o = o.nextElementSibling.children[0];
}
if( o.id=="MARCA" ){
_LastPosition = S(o).attr("posicion");
el = o;
o = o.parentNode;
oObj = o;
}else{
oObj = o;
el = o.children[0];
_LastPosition = S(el).attr("posicion");
}
if( S.is(":", o.innerHTML) ){
lin = S.trim(S.mid(o.innerHTML, ":"));
col = S(el).attr("col");
}
while( o!=null && o.id!="FILE" ){
o = o.previousElementSibling;
}
if( o && o.id=="FILE" ){
oObj.style.color = "red";
txt = o.innerText;
if( S.left(txt,5)=="../d/" ) txt = S.mid(txt,5,0);
for(n=0; n<DimScript.length; n++){
if( DimScript[n][0]==txt && (typeof(DimScript[n][5])==undefined || DimScript[n][5]!="display:none" ) ){
lin *= 1;
verElScript(n, --lin, col);
return;
}
}
S.info("Cargando...");
setTimeout(function(){
S.callSrv("edes.php?E:$t/ed.gs&tab="+DimScript.length+"&LoadSel="+txt+"&topLinea="+lin+"&col="+col, window);
}, 0);
}
}
function AyudaPorScript(obj){
var o = S.event(window),
oObj = o,
lin = 1, col=0,
txt="", ok=false, n, label;
if( o.id=="MARCA" ){
o = o.parentNode;
oObj = o;
}
if( S.is(":", o.innerHTML) ){
lin = S.trim(S.mid(o.innerHTML,":"));
col = S(oObj).html().indexOf('<span id="MARCA">') + (S(oObj).attr("mas")*1) - o.innerHTML.indexOf(":")-2;
if(col<0) col = 0;
}
while( o!=null && o.id!="FILE" ){
o = o.previousElementSibling;
}
if( o && o.id=="FILE" ){
o.style.color = "red";
label = o.innerText;
if( <?=((SESS::$_D_=="~")?"true":"false")?> && (event.ctrlKey || event.altKey) ){
S.window("edes.php?E:$help_edes.gs&EDITHELP="+label+"~L", {fullscreen:true, title:label, minimize:0});
}else{
S.window("edes.php?H:"+label, {
title:label,
fullscreen:true,
print:true,
minimize:false,
maximize:false,
resize:false
});
}
}
}
function marcaBusqueda(){
var o = S.event(window);
if( o.tagName=="SPAN" ) o = o.parentNode;
o.style.color = "red";
return S.eventClear(window);
}
var _User = <?=S::$_User?>, _ShowCallSrv=false;
function edCall(url, datos, p){
var xhr = new XMLHttpRequest();
if( !p ) p = {};
if( S.mid(url,2)=="E:" ) url = "edes.php?"+url;
if( !/_CONTEXT=/.test(url) ){
url += "&_CONTEXT="+((p["window"])? p["window"]._CONTEXT : window._CONTEXT);
}
url = S.urlAdd(url, window);
if( datos ){
xhr.open("POST", url);
var data = new FormData(), v;
for(v in datos) data.append(v, datos[v]);
}else{
xhr.open("GET", url);
}
if( url=="edes.php?cluster" && p["pct"] ){
S.progressUpload(p["pct"]);
}
xhr.onload = function(){
if( xhr.status===200 ){
var res = S.trim(xhr.responseText);
if( p["eval"] ){
if( S.left(res,34)=="0|Error creando directorio de bak:" ){
S.error("ERROR:<br>No se ha podido crear el directorio:<br>"+S.mid(res,"[","]"));
}else{
eval(res);
}
return;
}
if( p["return"] ){
p["return"](res);
return;
}
if( p["info"] ){
S.info(res, 3);
return;
}
if(p["window"]){
if(res!="ok") S.runHTML(p["window"], xhr.responseText);
}else{
S.run(window, xhr.responseText);
}
if(p["function"]){
p["function"]();
}
}else{
S.error(window,"<b>ERROR</b><br>"+xhr.status+"/"+xhr.statusText);
}
};
xhr.send(data);
}
var _LastGrabarScript = null
function Grabar(nScript, nLinea, soloGrabar){
if( _Editor==null ) return;
var s,bak,
nomCampo = _Editor.getTextArea().parentNode.name,
nomScript = document[nomCampo]["script"].value,
aNomScript = nomScript,
pCursor = _Editor.getCursor(), txt,
cantEditBak = _Editor.doc.cantEdit;
if( nomScript=="ERRORES" || nomScript=="ERROR-HTML" || nomScript=="ERROR-POST" ) return;
_Editor.doc.cantEdit = true;
if( (nScript==-1 || _ScriptActual==nScript) && (nomScript=="SQL" || nomScript=="PHP" || nomScript=="HTM") ){
if( nomScript=="SQL" || nomScript=="PHP" ){
var sDoc = _Editor.doc.getValue();
_Editor.doc.setValue(sDoc.replace(/\\/g, "{#~92~#}"));
}
if( nomScript!="HTM" ){
document[nomCampo]["fuente"].value = _Editor.doc.getValue();
if( nomScript=="SQL" ){
nLinea = (nLinea!=undefined)?"&_nLinea="+nLinea:"";
bak = document[nomCampo].action;
document[nomCampo].action += nLinea;
document[nomCampo].submit();
document[nomCampo].action = bak;
S.info("Calculando...");
}else{
document[nomCampo].submit();
}
}
if( nomScript=="SQL" || nomScript=="PHP" ){
_Editor.doc.setValue(sDoc);
}
if( nomScript=="HTM" ){
if( event && (event.ctrlKey || event.altKey) ){
var win = window.open("", "WIN"+document[nomCampo].target);
win.document.write(document[nomCampo].elements["fuente"].value);
}else{
var win = frames["RESULT"+S.left(nomCampo,3,0)];
win.document.open();
win.document.write(document[nomCampo].elements["fuente"].value);
}
document[nomCampo]["fuente"].value = _Editor.doc.getValue();
document[nomCampo].target = "TLF";
document[nomCampo].submit();
}
_Editor.setCursor(pCursor,0);
_Editor.focus();
var tabla = S.toTag(document[nomCampo]["script"], "TABLE"),
n = S.mid(tabla.id,6,0);
DimScript[n][5] = null;
tabla.rows[0].cells[0].style.color = "";
document[nomCampo]["update"].value = "";
S("#TABCONTENEDOR DIV").dim[n].style.color = "";
_Editor.doc.cantEdit = cantEditBak;
return S.eventClear(window);
}
_LastGrabarScript = nScript
for(s=0; s<document.forms.length; s++){
if( document.forms[s].target!="TLF" ){
continue;
}
let nForm = document.forms[s].name.substring(3);
if( document.forms[s].elements["update"].value=='S' && ((nScript==nForm && nScript!=undefined) || nScript==-1) ){
nomScript = document.forms[s].elements["script"].value;
if( nomScript==aNomScript ){
AlinearFields(_Editor);
document.forms[s].elements["fuente"].value = _Editor.doc.getValue();
}
bak = document.forms[s].elements["fuente"].value;
if( nomScript=="SQL" || nomScript=="PHP" || nomScript=="HTM" ) continue;
txt = document.forms[s].elements["fuente"].value;
txt = txt.replace(/\\/g,"{#~92~#}");
document.forms[s].elements["update"].value = "T";
edCall("edes.php?E:$t/ed.gs<?=eContextAddUrl().eSessionAddUrl()?>", {
btoa: 1,
script: nomScript,
md5: document.forms[s].elements["md5"].value,
update: document.forms[s].elements["update"].value,
status: document.forms[s].elements["status"].value,
fuente: txt
}, {
eval:true,
ansi:true
});
S.info("Grabando: "+document.forms[s].elements["script"].value+"...");
break;
}
}
_Editor.setCursor(pCursor,0);
_Editor.focus();
var todosGrabados = true;
for(s=0; s<document.forms.length; s++){
if( document.forms[s].target=="TLF" && document.forms[s].elements["update"].value=='S' ){
todosGrabados = false;
}
}
if( todosGrabados ){
DGI("IconoGrabar").style.color = "";
S.info("Grabado",1);
}
if( window.event && !soloGrabar ){
if( event.shiftKey || event.altKey ) window.open("", "Main");
if( event.shiftKey ) window.opener.S.windowFocus().location.reload();
}
_Editor.doc.cantEdit = cantEditBak;
}
function Grabado(md5, script, ultimosFiles, masInfo){
var tabla,s,n,dim=ultimosFiles.split("|"), ok=false;
for(s=0; s<document.forms.length; s++){
if( document.forms[s].target!="TLF" ) continue;
if( /^(S|T)$/.test(document.forms[s].elements["update"].value) && document.forms[s].elements["script"].value==script ){
document.forms[s].elements["update"].value = "";
document.forms[s].elements["md5"].value = md5;
tabla = S.toTag(document.forms[s], "TABLE");
n = S.mid(tabla.id,6,0);
DimScript[n][5] = null;
S("#TABCONTENEDOR DIV").dim[n].style.color = "";
tabla.rows[0].cells[0].style.color = "";
S.info();
ok = true;
break;
}
}
S.info();
Grabar(_LastGrabarScript);
_LastScript = [['-Últimos Ficheros']];
for(n=0; n<dim.length; n++){
_LastScript[n+1] = [dim[n],'',''];
}
if( masInfo!=undefined ){
setTimeout(function(){
S.warning(masInfo, 60);
}, 2000);
}
}
function InfoError(txt){
S.info();
S.error(txt);
}
function verInclude(o){
var help = o
s = S.screen(window);
o = o.obj.children[1];
S(o).val(S.replace(S(o).val(),"&#60;","<","&#92;",">", '<br>','\n'));
S(o).css({width:(s.w-500), height:(s.h-100)});
help.center();
}
function keyGet(o){
switch( S.eventCode(window.event) ){
case 13:
case 121:
S("#getNameScript").hidden();
S.callSrv("edes.php?E:$t/ed.gs&tab="+DimScript.length+"&LoadSel="+o.value, window);
break;
case 27:
S("#getNameScript").hidden();
break;
}
}
var DimScript=[];
function menuFicheros(obj){
var t=0;
S("TABLE", S("#CONTENEDORSCRIPT")).each(function(pk, o){
if( o.className=="TABS" && S(o).css("display")!="none" && o.rows.length>0 ){
t++;
}
});
if( t>0 ){
var o = S(obj).menu(DimScript, {function:verScript, trigger:false});
}else{
S("#getNameScript").visible();
S("#getNameScript").obj.focus();
}
}
function MarcarScript(n){
S("#VerLabelFunc").none();
S("#MARCADOR").none();
S(".TABSCRIPT").class("-TABNOW");
S(S("#TABCONTENEDOR").obj.children[0].children[n]).class("+TABNOW");
}
function ResaltarScript(){
var o = S.event(window);
S(o).class("/TABCONMARCA");
S.eventClear(window);
}
function EditorActivo(){
if( !S("DIV.TABNOW").length ) return false;
if( /^(\.\.\/tree\/|RESULT\:)/.test(S("DIV.TABNOW").text()) ) return false;
if( /^(SQL|SHELL|TRON|TRON_1|SAVESQL|NOTES|ERRORES|ERROR-POST|TRACEURL|ini|txt)$/.test(S.fileType(S("DIV.TABNOW").text())) ) return false;
return true;
}
function verElScript(ri, lin, col){
var ejecutarKeyFunc = (S("#VerLabelFunc").length && S("#VerLabelFunc").width()>0 && !S("#ANCLAR", "#VerLabelFunc").class("?OFF")),
p;
S("#VerLabelFunc").none();
S("#MARCADOR").none();
_ScriptActual = ri;
S("TR[eTAB]").none();
S("TR[eTAB='"+ri+"']").block("table-row");
S("#SCRIPT"+ri).css("display:table;width:100%;height:100%");
S("#SCRIPT"+ri).obj.parentNode.parentNode.parentNode.style.height = "100%";
var height = S(S("#SCRIPT"+ri).obj.parentNode.parentNode).obj.parentNode.offsetHeight;
S(S("#SCRIPT"+ri).obj.parentNode.parentNode).css("display:table;width:100%;height:"+height);
if( 	DimScript[ri][0]!="SHELL"
&&	DimScript[ri][0]!="TRON"
&&	DimScript[ri][0]!="TRON_1"
&&	DimScript[ri][0]!="SAVESQL"
&&	S.left(DimScript[ri][0],7)!="RESULT:"
){
SetEditor(document["FRM"+ri]["fuente"], lin, col);
}else{
MarcarScript(ri);
}
FormateaEditor();
if( DimScript[ri][0]=="SHELL" ){
var oIFrame = window.frames["RESULT"+ri];
if( oIFrame.document.body==null || S(":Comando", oIFrame).length==0 ){
setTimeout(function(){
verElScript(ri, lin, col);
}, 100);
return;
}
var	xy = S.screen(window),
oStatus = S("#STATUS", oIFrame).obj,
oComando = S(":Comando", oIFrame).obj.parentNode,
a1 = S("#SCRIPT"+ri).xy().h,
a2 = oStatus.offsetHeight,
a3 = oComando.offsetHeight,
a4 = S("#SCRIPT"+ri).obj.rows[0].offsetHeight,
alto = a1-a2-a3-a4-15;
S(S("#ShellOK", oIFrame).obj.parentNode.parentNode).css("height:"+(alto));
oIFrame.frameElement.setAttribute("SeCargo",1);
}else if( DimScript[ri][0]=="TRON" || DimScript[ri][0]=="TRON_1" || DimScript[ri][0]=="SAVESQL" ){
S("TEXTAREA", "#SCRIPT"+ri).css("height:"+S(S("#SCRIPT"+ri).obj.rows[1]).height());
}
var oIFrame = S(".cIFrame IFRAME", "#SCRIPT"+ri).obj;
if( oIFrame && oIFrame.eWINDOW ){
oIFrame.eWINDOW.document.body.scrollTop = S(oIFrame).attr("eScrollTop");
S.scrollSet(oIFrame.eWINDOW.document.body, {left:0, top:S(oIFrame).attr("eScrollTop")});
}
if( ejecutarKeyFunc ){
var func = S("#VerLabelFunc").obj["eKey"];
func(_Editor, S("#VerLabelFunc").attr("eSeek"));
S("#VerLabelFunc #ANCLAR").eventFire("click");
}
}
function verScriptMH(){
var o = S.event(window),
p = o.parentNode.children, n;
for(n=0; n<p.length; n++){
if( o==p[n] ){
verElScript(n);
}
}
}
function verScript(op, script, trigger, tr){
if( op=="" ){
var ri=tr.rowIndex;
}else{
var ri=-1, p=-1;
for(i=0; i<DimScript.length; i++){
if( DimScript[i][5]!='display:none' ){
if( ++p==op ){
ri = i;
break;
}
}
}
if( ri==-1 ) return;
}
verElScript(ri);
}
function cerrarScript(){
var o = S.event(window);
var tabla = S.toTag(o, "TABLE"),
n = S.mid(tabla.id,6,0);
cerrarScriptKO(n);
}
function cerrarScriptKO(n){
var txt = DimScript[n][0],
i, ok=false;
if( txt=="TRON" || txt=="TRON_1" || txt=="SAVESQL" ){
S("TR[eTAB='"+n+"']").none();
}else{
S("TR[eTAB='"+n+"']").text("");
S("TR[eTAB='"+n+"']").none();
S("TR[eTAB='"+n+"']").obj.removeAttribute("eTAB");
if( document.forms[n] && document.forms[n].elements["update"] ){
document.forms[n].elements["update"].value = "";
}
}
DimScript[n][5] = 'display:none';
S("#TABCONTENEDOR").obj.children[0].children[n].style.display = "none";
_Editor = null;
for(i=n-1; i>=0; i--){
if(S("#SCRIPT"+i).exists()){
verElScript(i);
ok=true;
break;
}
}
if(!ok){
for(i=n+1; i<DimScript.length; i++){
if(S("#SCRIPT"+i).exists()){
verElScript(i);
ok=true;
break;
}
}
}
if( !ok ){
for(i=0; i<DimScript.length; i++){
if(S("#SCRIPT"+i).exists()){
verElScript(i);
ok=true;
break;
}
}
}
}
function toolsClick(op, script, trigger, tr){
switch(tr.rowIndex){
case 0:
S.selectRange(_ToolsTxt[3], _ToolsTxt[1], _ToolsTxt[2], true);
break;
case 2:
S.callSrv("edes.php?E:$t/ed.gs&tab="+DimScript.length+"&LoadSel="+_ToolsTxt[0], window);
break;
case 3:
S.callSrv("edes.php?E:$t/ed.gs&help="+_ToolsTxt[0], window);
break;
}
}
function loadExt(script){
S.callSrv("edes.php?E:$t/ed.gs&tab="+DimScript.length+"&LoadSel="+S.replace(script," ","_")+"&TOTRON=1", window);
}
var _foldCode = false;
function FoldCodeGet(){
var dim = S(".CodeMirror-foldgutter-folded").dim, n, t=dim.length, res=[];
for(n=0; n<t; n++){
res.push(dim[n].parentNode.parentNode.children[0].innerText);
}
var oStatus = document[_Editor.getTextArea().parentNode.name]["status"],
cnf = (oStatus.value+"||").split("|");
oStatus.value = cnf[0]+"|"+cnf[1]+"|"+res.join(",");
}
function FoldCodePut(){
var oStatus = document[_Editor.getTextArea().parentNode.name]["status"],
cnf = (oStatus.value+"||").split("|"),
dim = cnf[2].split(","),
t = dim.length,
totalLinea = _Editor.doc.lineCount(), linea,n,x;
for(n=0; n<t; n++){
linea = dim[n]*1-1;
x = S.trim(_Editor.doc.getLine(linea));
if( S.left(x,9)=="function ") _Editor.foldCode({line:linea, ch:0, xRel: -1}, null, "fold");
}
}
function Orden(pk, txt){
var w = "&_w="+S.screen(window).w;
switch(pk){
case 1:
if( event.altKey ){
S.window("edes.php?Ll:$t/browse_sql.edf", {title:"Browse SQL", modal:true, width:500, height:"75%"});
}else{
S.callSrv("edes.php?E:$t/ed.gs&tab="+DimScript.length+"&LoadSel=SQL&_DB=NO"+w, window);
}
break;
case 2:
if( event.altKey ){
S.window("edes.php?Ll:$t/browse_php.edf", {title:"Browse PHP", modal:true, width:500, height:"75%"});
}else{
S.callSrv("edes.php?E:$t/ed.gs&tab="+DimScript.length+"&LoadSel=PHP"+w, window);
}
break;
case 3:
S.callSrv("edes.php?E:$t/ed.gs&tab="+DimScript.length+"&LoadSel=HTM"+w, window);
break;
case 5:
S.callSrv("edes.php?E:$t/ed.gs&tab="+DimScript.length+"&SHELL=1"+w, window);
break;
case 6:
_Editor = null;
for(var i=0; i<DimScript.length; i++){
if(S("#SCRIPT"+i).exists()){
if( S(":FRM"+i).obj!= null && S(":FRM"+i).obj.elements["script"].value==txt ){
cerrarScriptKO(i);
break;
}
}
}
S.callSrv("edes.php?E:$t/ed.gs&tab="+DimScript.length+"&LoadSel="+txt, window);
break;
case 7:
s = prompt("Name table", "");
if(s!=null) s=S.trim(s);
else break;
if(s!="" && s.indexOf(" ")==-1){
S.callSrv("edes.php?E:$t/ed.gs&tab="+DimScript.length+"&TE=EDF&SC="+s+"&SCRIPT="+DimScript[_ScriptActual][0], window);
}
break;
case 8:
S.callSrv("edes.php?E:$t/ed.gs&tab="+DimScript.length+"&TRON=1", window);
break;
case 88:
S.callSrv("edes.php?E:$t/ed.gs&tab="+DimScript.length+"&TRON_1=1", window);
break;
case 9:
if( event.ctrlKey || event.altKey ){
S.callSrv("edes.php?E:$t/ed.gs&DEBUGSQL=CHANGE", window);
}else{
S.callSrv("edes.php?E:$t/ed.gs&tab="+DimScript.length+"&SAVESQL=1", window);
}
break;
case 10:
AyudaDeTeclado();
break;
case 11:
if( _Editor==null ) return;
var cm = _Editor,
dim = saveConfig(cm).split(","), n, op=[["-BreakPoint"]], txt;
for(n=1; n<dim.length; n++){
txt = cm.doc.getLine(dim[n]*1).replace(/\</g,"&#60;").replace(/\>/g,"&#62;");
op[n] = [
txt,
"",
"gotoPoint(null,"+n+")"
];
}
if( op.length>1 ){
S(S.event(window)).menu(op, {function:gotoPoint(cm,n), trigger:false});
}
break;
case 12:
if( _Editor==null ) return;
var cm = _Editor,
t = cm.doc.lineCount(), n;
for(n=0; n<t; n++){
if( cm.lineInfo(n).gutterMarkers!=undefined ){
cm.setGutterMarker(n, "breakpoints", null);
}
}
S.info("BreakPoint borrados", 1);
break;
case 13:
var dim = [
["-Tools"],
["Cargar Script","","2"],
["Cargar Script LNG","","16"],
["Code Folding "+(_foldCode ? "Off":"On"),"","0"],
["Crear EDF","","1"],
["Crear SubList","","13"],
["Crear Unit-Test","","15"],
["Development Tree","","3"],
["Insertar script (idf)","","14"],
["Notas","","4"],
["-Seek"],
["Field","","6"],
["File","","38"],
["String","","7"],
["&#218;ltimos Ficheros","","8"],
["&#218;ltimos Errores","","12"],
["-Expresión Regular"],
["Javascript","","10"],
["PHP","","11"],
["-DDBB"],
["Data Dictionary", "", "40"],
["SQL list generator", "", "41"]
<?PHP
if( SESS::$_D_=="~" ){
echo ',["-eDes Files"]';
echo ',["Ver: Parse error.'.S::$_User.'","","91"],';
echo ',["Ver: Log PHP.'.date('ym').'","","97"],';
echo ',["Ver: Tron-1","","88"],';
echo ',["-"]';
echo ',["Borrar: Parse error.'.S::$_User.'","","94"],';
echo ',["Borrar: Log PHP.'.date('ym').'","","98"],';
echo ',["Borrar: Tron-1","","92"],';
echo ',["-"]';
echo ',["Borrar: &#218;ltimos Errores","","89"],';
echo ',["Borrar: *","","96"],';
}
?>
];
S(S.event(window)).menu(dim, {function:function(op, script, trigger, tr){
switch(op*1){
case 88:
Orden(88);
break;
case 89:
S.callSrv("edes.php?E:$t/ed.gs&tab="+DimScript.length+"&ORDEN=89", window);
break;
case 91:
S.callSrv("edes.php?E:$t/ed.gs&tab="+DimScript.length+"&LoadSel=/_tmp/err/_parse_error."+_User, window);
break;
case 97:
S.callSrv("edes.php?E:$t/ed.gs&tab="+DimScript.length+"&LoadSel=/_tmp/err/_log_php.<?=date('ym')?>", window);
break;
case 92: case 93: case 94: case 98:
S.callSrv("edes.php?E:$t/ed.gs&tab="+DimScript.length+"&ORDEN="+op, window);
break;
case 96:
S.callSrv("edes.php?E:$t/ed.gs&tab="+DimScript.length+"&ORDEN=28,89,92,93,94", window);
break;
case 0:
var t = _Editor.doc.lineCount(), n, op = (_foldCode?"unfold":"fold");
for(n=0; n<t; n++){
x = S.trim(_Editor.doc.getLine(n));
if( S.left(x,9)=="function ") _Editor.foldCode({line:n, ch:n, xRel: -1}, null, op);
}
FoldCodeGet();
_foldCode = !_foldCode;
break;
case 1:
var s = prompt("Name table", "");
if(s!=null) s=S.trim(s);
else break;
if(s!="" && s.indexOf(" ")==-1){
s = S.replace(s, "?", "{question}")
var url = "edes.php?E:$t/ed.gs&tab="+DimScript.length+"&TE=EDF&SC="+s+"&SCRIPT="+DimScript[_ScriptActual][0];
if( !_ShowCallSrv ){
S.callSrv(url, window);
}else{
var obj = S(S.createHTML('<SPAN id="_ICALL" style="position:absolute;left:0px;top:0px;zIndex:99999999999;border:2px dotted #cc00cc;background-color:#f0f0d4;width:100%;height:33%;">'+'<IFRAME id="ICALL" name="TLF" src="edes.php?E:/_datos/config/empty_frame.htm" eStatus=0 eNORESIZE=true WOPENER=w frameBorder=1px style="width:100%;height:100%;"></IFRAME>'+'</SPAN>'))
.nodeAfter(document.body).dim[0].children[0],
iwin = obj.contentWindow || obj.contentDocument.parentWindow;
S(obj).attr("WOPENER", window);
S("#_ICALL").attr("eWindow", obj);
iwin.location.replace(S.accessHref(iwin, url));
}
}
break;
case 13:
if( _Editor==null || /^(SQL|PHP|HTM|SHELL|TRON|TRON_1|SAVESQL|NOTES|Seek|ERRORES)/.test(document[_Editor.getTextArea().parentNode.name]["script"].value) ){
break;
}
var t = _Editor.doc.lineCount(), txt="",n,nInsert=-1;
for(n=0; n<t; n++){
txt = S.trim(S.upper(_Editor.doc.getLine(n)));
if( txt.indexOf("[FORMSTATIC]")==0 ){
S.info("No se pueden crear SubList con la etiqueta [FormStatic]", 10);
return;
}
if( txt.indexOf("[NOTE]")==0 || txt.indexOf("[EXIT]")==0 ) break;
if( txt.indexOf("[DBTABLE]")==0 || txt.indexOf("[DBINDEX]")==0 || txt.indexOf("[DBORDER]")==0 || txt.indexOf("[DBSERIAL]")==0 ){
nInsert = Math.max(nInsert,n);
}
}
var s = prompt("Tabla [, Fuente]", "");
if(s!=null) s=S.nsp(s);
else break;
if( !S.is(",",s) ) s += ",";
s += ","+document[_Editor.getTextArea().parentNode.name]["script"].value+","+nInsert;
if(s!="" && s.indexOf(" ")==-1){
var url = "edes.php?E:$t/ed.gs&tab="+DimScript.length+"&SUBLIST="+s+"&SCRIPT="+DimScript[_ScriptActual][0];
if( !_ShowCallSrv ){
S.callSrv(url, window);
}else{
var obj = S(S.createHTML('<SPAN id="_ICALL" style="position:absolute;left:0px;top:0px;zIndex:99999999999;border:2px dotted #cc00cc;background-color:#f0f0d4;width:100%;height:33%;">'+'<IFRAME id="ICALL" name="TLF" src="edes.php?E:/_datos/config/empty_frame.htm" eStatus=0 eNORESIZE=true WOPENER=w frameBorder=1px style="width:100%;height:100%;"></IFRAME>'+'</SPAN>'))
.nodeAfter(document.body).dim[0].children[0],
iwin = obj.contentWindow || obj.contentDocument.parentWindow;
S(obj).attr("WOPENER", window);
S("#_ICALL").attr("eWindow", obj);
iwin.location.replace(S.accessHref(iwin, url));
iwin.style.border = "5px solid red";
obj.style.border = "5px solid red";
}
}
break;
case 2:
var s = prompt("Name script", "");
if(s!=null) s=S.trim(s);
else break;
if(s!="" && s.indexOf(" ")==-1){
S.callSrv("edes.php?E:$t/ed.gs&tab="+DimScript.length+"&LoadSel="+s, window);
}
break;
case 16:
if( _ScriptActual==null ) break;
if( DimScript[_ScriptActual].length>4 && DimScript[_ScriptActual][5]=="display:none" ) break;
var dim=[],n,type,file;
for(n=0; n<DimScript.length; n++) dim.push(DimScript[n][0]);
type = S.fileType(DimScript[_ScriptActual][0]);
if( /^(edf|gdf|idf|fdf|ldf|sdf|sel)$/i.test(type) ){
n = S.is(DimScript[_ScriptActual][0]+".lng", dim, true);
if( n>-1 ){
verScript(n+"");
S.info("Script ya cargado", 1);
break;
}
file = DimScript[_ScriptActual][0];
if( file[0]=="$" ) file = '$lng/'+S.fileFullname(DimScript[_ScriptActual][0]);
S.callSrv("edes.php?E:$t/ed.gs&tab="+DimScript.length+"&LoadSel="+file+".lng", window);
}else{
S.info("El script no lleva asociado ningún fichero LNG", 5);
}
break;
case 3:
S.callSrv("edes.php?E:$t/ed.gs&tab="+DimScript.length+"&LoadSel=../tree/__personal.<?=SESS::$_UserLogin?>", window);
break;
case 4:
S.callSrv("edes.php?E:$t/ed.gs&tab="+DimScript.length+"&LoadSel=NOTES", window);
break;
case 6:
var s = prompt("Name field", "");
if(s!=null) s=S.trim(s);
else break;
S.info("Buscando...");
setTimeout(function(){
S.callSrv("edes.php?E:$t/ed.gs&tab="+DimScript.length+"&SeekField="+S.replace(s,"'","\'"), window);
}, 0);
break;
case 38:
var s = prompt("File", "");
if(s!=null) s=S.trim(s);
else break;
S.info("Buscando...");
setTimeout(function(){
S.callSrv("edes.php?E:$t/ed.gs&tab="+DimScript.length+"&SeekFile='"+S.replace(s,"'","\'","=","\=")+"'", window);
}, 0);
break;
case 7:
var s = prompt("String", "");
if(s!=null) s=S.trim(s);
else break;
S.info("Buscando...");
setTimeout(function(){
S.callSrv("edes.php?E:$t/ed.gs&tab="+DimScript.length+"&SeekString='"+S.replace(s,"'","\'","=","\=")+"'", window);
}, 0);
break;
case 8:
S(S.event(window)).menu(_LastScript, {noMark:true, function:function(op, script, trigger, tr){
if( tr.rowIndex>0 ){
for(var i=0; i<DimScript.length; i++){
if( DimScript[i][0]==script && DimScript[i][5]!='display:none' ){
verElScript(i);
return S.eventClear(window);
}
}
S.callSrv("edes.php?E:$t/ed.gs&tab="+DimScript.length+"&LoadSel="+script, window);
}
}});
break;
case 10:
case 11:
S(S.event(window)).around("#VerExpresion"+((op==10)?"JS":"PHP"), {"margin-right":12});
break;
case 12:
S.callSrv("edes.php?E:$t/ed.gs&tab="+DimScript.length+"&LoadSel=ERRORES", window);
break;
case 14:
if( _Editor==null || /^(SQL|PHP|HTM|SHELL|TRON|TRON_1|SAVESQL|NOTES|Seek|ERRORES)/.test(document[_Editor.getTextArea().parentNode.name]["script"].value) ){
break;
}
var nLinea = _Editor.getCursor()["line"]*1,
line = _Editor.doc.getLine(nLinea);
if( S.trim(line)!="" ){
S.error("Solo se puede insertar en una linea vacía");
}else{
S.callSrv("edes.php?E:$t/ed.gs&EXPLORADOR=idf", window);
}
break;
case 15:
if( _Editor==null || /^(SQL|PHP|HTM|SHELL|TRON|TRON_1|SAVESQL|NOTES|Seek|ERRORES)/.test(document[_Editor.getTextArea().parentNode.name]["script"].value) ){
break;
}
if( _Editor!=null && S.right(DimScript[_ScriptActual][0],5)!=".test" ){
S.callSrv("edes.php?E:$t/ed.gs&tab="+DimScript.length+"&LoadSel="+DimScript[_ScriptActual][0]+".test", window);
}
break;
case 40:
S.window("edes.php?E:$a/d/dictionary.php", {title:"Data Dictionary", modal:true, fullscreen:true});
break;
case 41:
var sdim = [
["-Sql Management"],
["Alta","","a"],
["Baja","","b"],
["Consulta","","c"],
["Modificación","","m"],
["-"],
["Ejecutar","","e"]
];
S(S.event(window)).menu(sdim, {function:function(op, script, trigger, tr){
if( op==null ) return;
if( op=="e" ){
S.window("edes.php?Fc:$a/d/list_sql.edf&_Ejecutar=1", {title:"Sql Management", modal:true, fullscreen:!true});
}else{
S.window("edes.php?F"+op+":$a/d/list_sql.edf", {title:"Sql Management", modal:true, fullscreen:!true});
}
}});
break;
}
}});
break;
case 14:
var dim = [
["-Ayuda Lenguajes"],
["Completa", "", "1", "Click Izq: Ayuda en ventana actual\nClick Dcha: Ayuda en nueva ventana"],
["Etiquetas","","2"],
["PHP","","3"],
['Javascript "S"',"","4"],
['Javascript "e"',"","5"],
['Descargar "ayuda.chm"',"","23"],
["Webs","","36"],
["Buscador en la Ayuda","","37"],
["-Ayuda en linea"],
["Etiquetas","","32"],
["PHP","","33"],
['Javascript "S"',"","34"],
['Javascript "e"',"","35"],
["-Ayuda Editores"],
["HTM","","6"],
["PHP","","7"],
["SQL","","8"],
["Script","","9"],
["-Ayuda de Teclado"],
["HTM","","10"],
["PHP","","11"],
["SQL","","12"],
["Script","","13"],
["Shell","","14"],
["-Varios"],
["Help in new Window","","38"],
["Icono eDes","","22"],
["Macros","","21"]
];
S(S.event(window)).menu(dim, {function:function(op, script, trigger, tr){
switch(op*1){
case 1:
if( window.event.ctrlKey || window.event.altKey ){
window.open("edes.php?E:$help_edes.gs<?=eSessionAddUrl()?>", "HELP-EDES");
break;
}
var w = frames["HELPEDES"].frameElement;
w.style.display = "block";
w.focus();
w = frames["HELPEDES"];
var o = S("#BUSCAR",w),
ct = S.xy(S("#TREEMAIN",w).obj.parentElement),
ci = S.xy(o.obj);
o.css("width:"+(S(S("#TREEMAIN",w).obj.parentElement).css("width")-27-7));
break;
case 2:
S.window("edes.php?Ll:$a/d/help_edes_label.edf", {title:"Listado de Etiqueta", modal:true});
break;
case 3:
S.window("edes.php?Ll:$a/d/help_edes_e.edf", {title:"Listado de Funciones PHP", modal:true});
break;
case 4:
S.window("edes.php?Ll:$a/d/help_edes_js.edf", {title:"Listado de Funciones Javascript", modal:true});
break;
case 5:
break;
case 6:
AyudaHTM();
break;
case 7:
AyudaPHP();
break;
case 8:
AyudaSQL();
break;
case 9:
AyudaScript();
break;
case 10:
break;
case 11:
break;
case 12:
break;
case 13:
break;
case 14:
AyudaSHELL();
break;
case 21:
MostrarMacros();
break;
case 22:
S.window("edes.php?Ll:$a/d/icono.edf&_SoloView=3&_CONTEXT=<?=eCacheSqlPut('url', '', 'Ll:$a/d/icono.edf')?>", {title:"Listado de iconos eDes"});
break;
case 23:
DownloadAyuda();
break;
case 32:
case 33:
case 34:
case 35:
S.warning("Sin implementar");
break;
case 36:
var dim2 = [
<?PHP
$n = 0;
foreach($_WEB as $k=>$v){
if( empty($k) ){
continue;
}
if( $n++>0 ) echo ",";
if( $k[0]=="-" ){
echo '["'.$k.'"]';
}else{
echo '["'.$k.'", "", ">'.$v.'"]';
}
}
?>
];
S(S.event(window)).menu(dim2, {function:function(op, script, trigger, tr){
S.open(script, S.mid(op,1,0));
}});
break;
case 37:
var s = prompt("String", "");
if(s!=null) s=S.trim(s);
else break;
S.info("Buscando...");
setTimeout(function(){
S.callSrv("edes.php?E:$t/ed.gs&tab="+DimScript.length+"&SeekStringHelp='"+S.replace(s,"'","\'","=","\=")+"'", window);
}, 0);
break;
case 38:
window.open("edes.php?E:$help_edes.gs<?=eSessionAddUrl()?>", "HELP-EDES");
break;
}
}});
break;
case 15:
frames["HELPEDES"].frameElement.style.display = "none";
if( _Editor ) _Editor.focus();
break;
case 28:
case 29:
S.callSrv("edes.php?E:$t/ed.gs&tab="+DimScript.length+"&ORDEN="+pk, window);
break;
}
return S.eventClear(window);
}
function ListRestoreCopy(){
if( /^(PHP|SQL|HTM|SAVESQL|TRON|TRON_1|ERRORES|ERROR-HTML|ERROR-POST|Seek String|Seek File|Seek Field)$/i.test(DimScript[_ScriptActual][0]) ){
S.info("Unlogged script", 3);
return;
}
S.callSrv("edes.php?E:$t/ed.gs&ListRestoreCopy="+DimScript[_ScriptActual][0], window);
}
function SelRestoreCopy(dim){
S("#ListRestoreCopy").tree(dim, {
expanded:true,
icon:"system",
modal:true,
userFunction:true,
_parent: S("#ListRestoreCopy").obj,
_r:"200px",
_y:0,
_point:true,
_x:500,
_y:0,
function:function(op, tr, para, label){
S.callSrv("edes.php?E:$t/ed.gs&RestoreCopy="+op, window);
S(this).nodeRemove();
}
});
S(".TREE").css("left", S(".MENU").width()-S(".TREE").width());
}
<?PHP if( SESS::$_D_=="~" ){ ?>
function MenuEDes(){
var dim = [
["-Ficheros indice ayuda"],
["Etiquetas",""			,">$h/help_edes_label.txt"],
["PHP",""				,">$h/help_edes_php.txt"],
['Javascript "S"',""	,">$h/help_edes_js.txt"],
['Javascript "e"',""	,">$h/help_edes_e.txt"],
['Javascript "real"',""	,">$h/help_js.txt"],
['PHP "real"',""		,">$h/help_php.txt"],
['Macros',""			,">$t/macros.txt"],
["-Ficheros PHP ayuda"],
["Etiquetas",""			,">$m/help_edes_label.php"],
["PHP",""				,">$m/help_edes_e.php"],
['Javascript "S"',""	,">$m/help_edes_js.php"],
['.Javascript "e"',"","28"],
['.Javascript "real"',"","29"],
['.PHP "real"',"","30"],
["-Indice de Ayudas"],
["eDesWeb","","ia"],
["Label","","ia"],
["Lenguaje","","ia"],
["-Tree"],
["eDes",""		 ,">__edes.arb"],
["Analista",""	 ,">__analista.arb"],
["Master",""	 ,">__master.arb"],
["Programador","",">__programador.arb"],
["Varios",""	 ,">__varios.arb"],
["-CSS"],
["all.css",""	,">/_datos/config/all.css"],
["core.css",""	,">/_datos/config/core.css"],
["list.css",""	,">/_datos/config/list.css"],
["pdf.css",""	,">/_datos/config/pdf.css"],
["tab.css",""	,">/_datos/config/tab.css"],
["-SPIDER"],
["Open","","*"],
["Close","","*"],
["Clear","","*"]
];
S(S.event(window)).menu(dim, {function:function(op, script, trigger, tr){
switch(op){
case "ia":
S.callSrv("edes.php?E:$t/ed.gs&tab="+DimScript.length+"&INDICEAYUDA="+script, window);
break;
case "*":
script = S.upper(script);
if( script=="OPEN" ){
var s = prompt("Prefijo Spider", "");
if(s!=null){
s=S.trim(s);
S.callSrv("edes.php?E:$t/ed.gs&SPIDER=OPEN&PREFIJO="+s, window);
}
}else{
S.callSrv("edes.php?E:$t/ed.gs&SPIDER="+script, window);
}
break;
case "28":
break;
case "29":
break;
case "30":
break;
default:
S.callSrv("edes.php?E:$t/ed.gs&tab="+DimScript.length+"&LoadSel="+S.left(op,1,0), window);
}
}});
}
function MenuEDes2(){
var dim = [
["-eDes Configuración"],
["edes.ini", "", ">/_d_/cfg/edes.ini"]
];
S(S.event(window)).menu(dim, {function:function(op, script, trigger, tr){
switch(op){
case "..":
break;
default:
S.callSrv("edes.php?E:$t/ed.gs&tab="+DimScript.length+"&LoadSel="+S.left(op,1,0), window);
}
}});
return S.eventClear(window);
}
<?PHP } ?>
var _TraceQueryString = <?=(SESS::$_TRACE_URL_ON ? "true":"false")?>;
function MenuSys(){
var dim = [
["-Ficheros .ini"],
["Sql","","sql"],
["Desktop","","desktop"],
["DesktopUser","","desktop_user_web"],
["PDF","","pdf"],
["Session.def","","session_def"],
["Session.ini","","session_ini"],
["Share","","share"],
["GroupVar","","group"],
["-Trace QueryString"],
["On","","on",null,null,null],
["Off","","off"],
["View","","view"],
<?PHP
if( SESS::$_D_=="~" ){
echo '["Trace ALL","","traceAll",null,null, '.(file_exists("edes.php.log")?'"color:red"':'null').'],';
echo '["Trace ALL View","","traceAllView"],';
}
?>
["-Tools"],
['AutoSave "'+((_AutoSave)?"OFF":"ON")+'"',"","AutoSave"],
['Theme "'+((_Theme=="")?"oscuro":"claro")+'"',"","theme"]
<?PHP
foreach($_TaskManager as $k=>$v) echo ',["'.$k.'","",">'.$v.'"]';
?>
,["-Backup"]
,["Script actual","","Bak"]
], n;
for(n=0; n<dim.length; n++) if( dim[n][0]=="On" ){
dim[n][5] = _TraceQueryString ? "color:red":null;
}
if( S("#SCRIPT"+_ScriptActual).length && /^(PHP|SQL|HTM)$/i.test(S("#SCRIPT"+_ScriptActual).obj.rows[0].cells[1].innerText) ){
dim = dim.concat([
["-Ventana resultados"],
["20%","","result1"],
["50%","","result2"],
["80%","","result3"]
]);
}
if( _PARENT._M_=="~" ){
dim = dim.concat([
["-eDes"],
["ChangeLog","","ChangeLog"],
["Actualizar eDes","","newEDES"],
["import/Export","","ImpExp"],
["Crear key App","","CreateKey"],
["eDes.ini","","edes"],
["Help Download","","HelpDown"]
]);
}else if( _PARENT._M_=="A" ){
dim = dim.concat([
["-eDes"],
["eDes","","edes"]
]);
}
S(S.event(window)).menu(dim, {function:function(op, script, trigger, tr){
if( op[0]==">" ){
window.open(S.mid(op,1,0));
return;
}
switch(op){
case "on":
_TraceQueryString = true;
case "off":
if( op=="off" ) _TraceQueryString = false;
case "view":
case "traceAll":
case "traceAllView":
S.callSrv("edes.php?E:$t/ed.gs&tab="+DimScript.length+"&TRACEAR="+op, window);
break;
case "group":
S.callSrv("edes.php?E:$t/ed.gs&tab="+DimScript.length+"&INDICEAYUDA=group.var", window);
break;
case "result1":
_HelghtResult = 1.2;
FormateaEditor();
break;
case "result2":
_HelghtResult = 2;
FormateaEditor();
break;
case "result3":
_HelghtResult = 8;
FormateaEditor();
break;
case "ChangeLog":
S.callSrv("edes.php?E:$t/ed.gs&tab="+DimScript.length+"&LoadSel="+op, window);
break;
case "theme":
if( _Theme=="" ){
_Theme = _ThemeOscuro;
_ColorCondi = S.rgb2hex(S.ruleGet(window, ".style-condition-oscuro"));
S(window).rule(".style-label {"+S.ruleGet(window, ".style-label-oscuro")+"}");
S(window).rule(".style-note {"+S.ruleGet(window, ".style-note-oscuro")+"}");
}else{
_Theme = _ThemeClaro;
_ColorCondi = S.rgb2hex(S.ruleGet(window, ".style-condition-claro"));
S(window).rule(".style-label {"+S.ruleGet(window, ".style-label-claro")+"}");
S(window).rule(".style-note {"+S.ruleGet(window, ".style-note-claro")+"}");
}
S.callSrv("edes.php?E:$t/ed.gs&cfg="+(_Theme=="" ? "":"1")+"|"+(_AutoSave ? "1":""), window);
_Editor.setOption("theme", _Theme);
colorear();
break;
case "AutoSave":
_AutoSave = !_AutoSave;
S.callSrv("edes.php?E:$t/ed.gs&cfg="+(_Theme=="" ? "":"1")+"|"+(_AutoSave ? "1":""), window);
break;
case "edes":
S.callSrv("edes.php?E:$t/ed.gs&tab="+DimScript.length+"&LoadSel=/_d_/cfg/edes.ini", window);
break;
case "newEDES":
S.window("Fa:$a/d/_new_edes");
break;
case "ImpExp":
S.window("Fa:$a/d/db_ie");
break;
case "CreateKey":
S.window("Fa:$a/d/create_key");
break;
case "HelpDown":
top.S.info("Descargando...");
case "HelpUp":
S.callSrv("edes.php?E:$t/ed.gs&"+op+"=1", window);
break;
case "Bak":
S.window("edes.php?Ll:$a/d/bak_script.edf&script="+DimScript[_ScriptActual][0], {title:"Backup script: <b>"+DimScript[_ScriptActual][0]+"</b>", modal:true});
break;
case "session_def":
case "session_ini":
op = op.replace("_", ".", op);
default:
S.callSrv("edes.php?E:$t/ed.gs&tab="+DimScript.length+"&LoadSel="+op+".ini", window);
}
}});
return S.eventClear(window);
}
function DownloadAyuda(){
var dim = [["<a href='edes.php?D:$h/i/edes.chm<?=eSessionAddUrl()?>'>Descargar&nbsp;edes.chm</a>", "", ""]];
S(S.event(window)).menu(dim, {noMark:true, function:function(op, script, trigger, tr){}});
return S.eventClear(window);
}
<?PHP
$dimSQL = array("");
for($n=1; $n<=SESS::$_RecentFiles; $n++){
$fileSQL = "../_d_/usr/sql.".S::$_User.".{$n}";
if( file_exists($fileSQL) ) $dimSQL[$n] = file_get_contents($fileSQL);
}
if( count($dimSQL)>0 ){
echo 'var _dimSQL = [["-Últimos SQL"]';
for($n=1; $n<=SESS::$_RecentFiles; $n++){
if( $dimSQL[$n]=="" ) continue;
$fileSQL = "../_d_/usr/sql.".S::$_User.".{$n}";
$i = date('Y-m-d H:i:s', filemtime($fileSQL));
$txt = str_replace(
array(  '"'  ,   "'"  ,  '\\'  ,   '/'  , CHR10 , CHR13 , mb_chr(9)),
array('&#34;', '&#39;', '&#92;', '&#47;', '&#10#;', '&#13#;', '&#9#;'),
$dimSQL[$n]
);
echo ",['{$i}','','','{$txt}']";
}
echo "];\n";
?>
for(var n=1; n<_dimSQL.length; n++) _dimSQL[n][3] = S.replace(_dimSQL[n][3], "&#10#;","\n", "&#13#;","", "&#47#;","/", "&#9#;","    ");
function UltimosSQL(){
S(S.event(window)).menu(_dimSQL, {class:"menuNumeric", function:function(op, script, trigger, tr){
if( tr.rowIndex>0 ){
S.callSrv("edes.php?E:$t/ed.gs&tab="+DimScript.length+"&LoadSel=SQL&_DB=NO&_LastSQL="+tr.rowIndex, window);
}
}});
<?PHP
}
?>
return S.eventClear(window);
}
<?PHP
$dimPHP = array("");
for($n=1; $n<=SESS::$_RecentFiles; $n++){
$filePHP = "../_d_/usr/php.".S::$_User.".{$n}";
if( file_exists($filePHP) ) $dimPHP[$n] = file_get_contents($filePHP);
}
if( count($dimPHP)>0 ){
echo 'var _dimPHP = [["-Últimos PHP"]';
for($n=0; $n<=SESS::$_RecentFiles; $n++){
if( $dimPHP[$n]=="" ) continue;
$filePHP = "../_d_/usr/php.".S::$_User.".{$n}";
$i = date('Y-m-d H:i:s', filemtime($filePHP));
$dimPHP[$n] = str_replace('&', '{-#38#-}', $dimPHP[$n]);
$txt = str_replace(
array(  '"'  ,   "'"  ,  '\\'  ,   '/'  , CHR10 , CHR13 , mb_chr(9)),
array('&#34;', '&#39;', '&#92;', '&#47;', '&#10#;', '&#13#;', '&#9#;'),
$dimPHP[$n]
);
echo ",['{$i}','','','{$txt}']";
}
echo "];\n";
?>
for(var n=1; n<_dimPHP.length; n++){
_dimPHP[n][3] = S.replace(
_dimPHP[n][3]
,"&#10#;", "\n"
,"&#13#;", ""
,"&#47#;", "/"
,"&#9#;" , "    "
);
}
function UltimosPHP(){
S(S.event(window)).menu(_dimPHP, {class:"menuNumeric", function:function(op, script, trigger, tr){
if( tr.rowIndex>0 ){
S.callSrv("edes.php?E:$t/ed.gs&tab="+DimScript.length+"&LoadSel=PHP&_DB=NO&_LastPHP="+tr.rowIndex, window);
}
}});
<?PHP
}
?>
return S.eventClear(window);
}
<?PHP
$dimHTM = array("");
for($n=1; $n<=SESS::$_RecentFiles; $n++){
$fileHTM = "../_d_/usr/htm.".S::$_User.".{$n}";
if( file_exists($fileHTM) ) $dimHTM[$n] = file_get_contents($fileHTM);
}
if( count($dimHTM)>0 ){
echo 'var _dimHTM = [["-Últimos HTM"]';
for($n=0; $n<=SESS::$_RecentFiles; $n++){
if( $dimHTM[$n]=="" ) continue;
$fileHTM = "../_d_/usr/htm.".S::$_User.".{$n}";
$i = date('Y-m-d H:i:s', filemtime($fileHTM));
$txt = str_replace(
array(  '"'  ,   "'"  ,  '\\'  ,   '/'  , CHR10 , CHR13 , mb_chr(9)),
array('&#34;', '&#39;', '&#92;', '&#47;', '&#10#;', '&#13#;', '&#9#;'),
$dimHTM[$n]
);
echo ",['{$i}','','','{$txt}']";
}
echo "];\n";
?>
for(var n=1; n<_dimHTM.length; n++) _dimHTM[n][3] = S.replace(_dimHTM[n][3], "&#10#;","\n", "&#13#;","", "&#47#;","/", "&#9#;","    ");
function UltimosHTM(){
S(S.event(window)).menu(_dimHTM, {class:"menuNumeric", function:function(op, script, trigger, tr){
if( tr.rowIndex>0 ){
S.callSrv("edes.php?E:$t/ed.gs&tab="+DimScript.length+"&LoadSel=HTM&_DB=NO&_LastHTM="+tr.rowIndex, window);
}
}});
<?PHP
}
?>
return S.eventClear(window);
}
function CerrarAyuda(evt){
if( S.eventCode(evt)==27 ) Orden(15);
}
var _ToolsTxt="";
function loadPHP(txt){
txt = txt.replace(/#&#34;/g, '"').replace(/#&#39;/g, "'").replace(/#&#60;/g, "<").replace(/#&#62;/g, ">").replace(/#&#92;/g, "\\").replace(/#&#chr10;/g, String.fromCharCode(10)).replace(/#&#chr13;/g, String.fromCharCode(13));
_Editor.doc.setValue(txt);
_Editor.refresh();
_Editor.focus();
}
function marcarEntrada(){
var o = S.event(window);
if( o.tagName=="SPAN" ) o = S.toTag(o,"TD");
if( o.tagName=="B" ) o = S.toTag(o,"TD");
if( o.tagName=="TD" ){
if( o.tagName!="TR" ) o = S.toTag(o,"TR");
if( S(o).css("color")!="rgb(255, 0, 0)" ){
S(o).css("color:red");
S("#ANCLAR").class("+OFF");
EsquinaTopDch(S("#ANCLAR").obj, '#ListLabelFunc');
}
}
return S.eventClear(window);
}
function gotoLabel(){
var tr = S.event(window),
list = S("#VerLabelFunc");
if( tr.tagName=="SPAN" ) tr = S.toTag(tr,"TD");
if( tr.tagName=="B" ) tr = S.toTag(tr,"TD");
if( tr.tagName=="TD" ){
if( tr.tagName!="TR" ) tr = S.toTag(tr,"TR");
S(".LASTGOTO",list).class("-LASTGOTO");
if( S(list).attr("eClose")==1 ){
S("#MARCADOR").none();
S(list).none();
}
if( S(tr).css("color")!="rgb(255, 0, 0)" ) tr.style.color = "#4682b4";
S(tr.cells[0]).around("#MARCADOR", {type:"9"});
_Editor.setCursor(tr.getAttribute("nl")*1,0);
_Editor.focus();
}
}
function EsquinaTopDch(o, id){
var altoTab = 0;
S(".TABSCRIPT").each(function(k,o){
if( S(o).css("height")>0 ){
altoTab = o.offsetHeight;
return null;
}
});
S(o).class("/OFF");
var xy = S.screen(window),
list = S.toTag(S(o).obj, "span"),
c = S(list).css("width,height"),
left = xy.w-c.width-(list.scrollHeight>list.offsetHeight ? 18:0),
y = S("#LINEAUNO").css("height")+altoTab;
S(list).css({left:left, top:y});
S(list).attr("eClose", S(o).class("?OFF")?1:0);
if( xy.h<(y+S(list).obj.offsetHeight) ){
S(list).css("height", xy.h-y);
}
}
function sqlFormat(text, step){
var dimPorCadena = text.replace(/'/g,"\"").replace(/\s{1,}/g," ").replace(/\'/ig,"~::~\'").split('~::~'),
len = dimPorCadena.length,
dim = [],
indent = 0,
tab = S.repeat(" ",4);
inComment = true,
inQuote = false,
parentesis = 0,
str = '',
i = 0;
for(i=0; i<len; i++){
if( i%2 ){
dim = dim.concat(dimPorCadena[i]);
}else{
dim = dim.concat(sqlSplit(dimPorCadena[i], tab));
}
}
len = dim.length;
for(i=0; i<len; i++){
parentesis -= (dim[i].replace(/\(/g,'').length - dim[i].replace(/\)/g,'').length);
if( /\s{0,}\s{0,}SELECT\s{0,}/.exec(dim[i]) ){
dim[i] = dim[i].replace(/\, /g, ",");
dim[i] = dim[i].replace(/\,/g, ",\n"+tab+tab+"")
}
if( /\s{0,}\s{0,}SET\s{0,}/.exec(dim[i]) ){
dim[i] = dim[i].replace(/\,/g, ",\n"+tab+tab+"")
}
if( /\s{0,}\(\s{0,}SELECT\s{0,}/.exec(dim[i]) ){
indent++;
str += "\n"+S.repeat(" ",(indent)*4)+dim[i];
}else if( /\'/.exec(dim[i]) ){
if( parentesis<1 && indent ){
indent--;
}
str += dim[i];
}else{
str += "\n"+S.repeat(" ",(indent)*4)+dim[i];
if( parentesis<1 && indent ){
indent--;
}
}
}
return str.replace(/^\n{1,}/,'').replace(/\n{1,}/g,"\n");
function sqlSplit(str, tab){
var toReturn = str.replace(/\s{1,}/g," ")
.replace(/ AND /ig,"~::~"+tab+tab+"AND ")
.replace(/ BETWEEN /ig,"~::~"+tab+"BETWEEN ")
.replace(/CASE /ig,"~::~"+tab+"CASE ")
.replace(/ ELSE /ig,"~::~"+tab+"ELSE ")
.replace(/ END /ig,"~::~"+tab+"END ")
.replace(/ FROM /ig,"~::~"+tab+"FROM ")
.replace(/ GROUP\s{1,}BY/ig,"~::~"+tab+"GROUP BY ")
.replace(/ HAVING /ig,"~::~HAVING ")
.replace(/ IN /ig," IN ")
.replace(/ JOIN /ig,"~::~JOIN ")
.replace(/ CROSS~::~{1,}JOIN /ig,"~::~CROSS JOIN ")
.replace(/ INNER~::~{1,}JOIN /ig,"~::~"+tab+"INNER JOIN ")
.replace(/ LEFT~::~{1,}JOIN /ig,"~::~"+tab+tab+"LEFT JOIN ")
.replace(/ RIGHT~::~{1,}JOIN /ig,"~::~"+tab+"RIGHT JOIN ")
.replace(/ ON /ig,"~::~"+tab+tab+"ON ")
.replace(/ OR /ig,"~::~"+tab+tab+"OR ")
.replace(/ ORDER\s{1,}BY /ig,"~::~"+tab+"ORDER BY ")
.replace(/ OVER /ig,"~::~"+tab+"OVER ")
.replace(/\(\s{0,}SELECT /ig,"~::~(SELECT ")
.replace(/\)\s{0,}SELECT /ig,")~::~SELECT ")
.replace(/ THEN /ig," THEN~::~"+tab+"");
if( (/ UNION /ig).test(str) ){
if( (/ UNION ALL /ig).test(str) ){
toReturn = toReturn.replace(/ UNION ALL /ig,"~::~UNION ALL~::~");
}else{
toReturn = toReturn.replace(/ UNION /ig,"~::~UNION~::~");
}
}
toReturn = toReturn.replace(/ USING /ig,"~::~USING ")
.replace(/ WHEN /ig,"~::~"+tab+"WHEN ")
.replace(/ WHERE /ig,"~::~"+tab+"WHERE ")
.replace(/ WITH /ig,"~::~WITH ")
.replace(/ ALL /ig," ALL ")
.replace(/ AS /ig," AS ")
.replace(/ ASC /ig," ASC ")
.replace(/ DESC /ig," DESC ")
.replace(/ DISTINCT /ig," DISTINCT ")
.replace(/ EXISTS /ig," EXISTS ")
.replace(/ NOT /ig," NOT ")
.replace(/ NULL /ig," NULL ")
.replace(/ LIKE /ig," LIKE ")
.replace(/\s{0,}SELECT /ig,"SELECT ")
.replace(/\s{0,}UPDATE /ig,"UPDATE ")
.replace(/ SET /ig," SET ")
.replace(/~::~{1,}/g,"~::~");
return toReturn.split('~::~');
}
}
function FormularioFuncion(){
S(window).callSrvPost("edes.php?E:$t/ed.gs&_Assistant=1",{
comando:"[UploadFile]",
contenido:""
});
}
function getAssistan(cmd, tabla, xLinea, nLinea){
S(window).callSrvPost("edes.php?E:$t/ed.gs&_Assistant=1", {
comando:cmd,
linea:nLinea,
xlinea:xLinea,
tabla:tabla,
contenido:""
});
}
var _HelpInLine = {
<?PHP
$dimHelp = explode(",", "PHP,CSS,JS,HTML");
for($n=0; $n<count($dimHelp); $n++){
$pk = $dimHelp[$n];
if( isset($_HelpInLine[$pk]) ){
echo '"'.$pk.'":["'.$_HelpInLine[$pk][0].'", "'.$_HelpInLine[$pk][1].'", "'.$_HelpInLine[$pk][2].'"],';
}
}
?>
"":["","",""]
}
function AyudaLabel(label){
S.info();
if( S.left(_HelpLast[0],4)!="EDES" ){
if( _HelpInLine[_HelpLast[0]][0]!="" ){
var o = _HelpInLine[_HelpLast[0]][1].split(","),
d = _HelpInLine[_HelpLast[0]][2].split(","), n;
for(n=0; n<o.length; n++){
label = S.replace(label, o[n], d[n]);
}
S.open(_HelpLast[0], _HelpInLine[_HelpLast[0]][0].replace("#",label));
}
}else{
if( <?=((SESS::$_D_=="~")?"true":"false")?> && (event.ctrlKey || event.altKey) ){
S.window("edes.php?E:$help_edes.gs&EDITHELP="+label+"~L", {fullscreen:true, title:label, minimize:0});
}else{
S.window("edes.php?H:"+label, {
title:label,
fullscreen:true,
print:true,
minimize:false,
maximize:false,
resize:false
});
}
}
return S.eventClear(window);
}
function LanzarSubmit(){
var code = S.eventCode(event);
if( code==121 ){
S(".AddButton").eventFire("click");
}else if( code==27 ){
S(".WINDOW I[op='C']").eventFire("click");
}
}
function Assistant(dim, linea){
var txt = "<form accept-charset='utf-8' name='FORMHELP' onclick='S.selectNone(window)' onkeydown='LanzarSubmit()' ><table style='display:table'>", n, i, tmp, sel, item, dimDelimiter=[], foco=false;
for(n=1; n<dim.length; n++){
tmp = dim[n].split("|");
if( tmp[0]=="-" ){
txt += "<tr><td colspan=2><hr></td></tr>";
continue;
}
if( tmp[1]=="[DELIMITER]" ){
dimDelimiter[S.trim(tmp[2])] = S.trim(tmp[3]);
continue;
}
if( tmp[8]!="" ) tmp[8] = " eCND='"+tmp[8]+"'";
txt += "<tr>";
if( tmp[1]!="Rem" ){
txt += "<td><label for='"+tmp[1]+"'>"+tmp[0]+"</label></td><td>";
}else{
txt += "<td style='color:red'><label for='"+tmp[1]+"'>"+tmp[0]+"</label></td><td>";
}
switch(tmp[3]){
case "T":
txt += "<input type=text name='"+tmp[1]+"' onfocus=S.key('"+tmp[2]+"',"+tmp[4]+") maxlength='"+tmp[4]+"' size='"+tmp[4]+"'"+tmp[8];
if( /\+|\-/.test(tmp[2]) ) txt += " style='text-align:right'";
if( tmp[7]!="" ) txt += " value='"+tmp[7]+"'";
if( tmp[6]=="-" ) txt += ' class="READONLY" readonly="true" on_click="_CpField()"';
if( tmp[6]=="M" ) txt += " class='EDITABLE'";
if( tmp[6]=="M" && !foco ){
foco = true;
txt += " autofocus";
}
txt += ">";
break;
case "C":
txt += "<input name='"+tmp[1]+"' id='"+tmp[1]+"' type='checkbox' diferente='' checkbox='1' conimagen='1' size='1' value='' onchange='this.value=(this.checked?S.setup.checkOn:S.setup.checkOff)' class='EDITABLE' ewe='1' onfocus='S.key(&quot;N&quot;,1,0)'";
if( tmp[7]!="" ){
var def = (tmp[7]+"~~").split("~");
if( def[0]==S.setup.checkOn ) txt += " checked=true value='"+S.setup.checkOn+"'";
txt += ' eConver="'+def[1]+"~"+def[2]+'"';
}
if( tmp[6]=="M" ) txt += " class='EDITABLE'";
if( tmp[6]=="M" && !foco ){
foco = true;
txt += " autofocus";
}
txt += ">";
break;
case "S":
txt += '<input name="'+tmp[1]+'" i_ss="1" value="'+tmp[7]+'" style="display:none" alto="1" size="2" _td="0">';
txt += '<span class="SELECTINPUT" onclick="S.key(\'S\')">';
var sel = tmp[10].split(";"), valInput="";
for(i=0; i<sel.length; i++){
item = S.splitLast(",", sel[i]);
if( S.trim(item[0])==S.trim(tmp[7]) ){
valInput = item[1];
break;
}
}
txt += '<input name="_INPUT_'+tmp[1]+'" ind="-1" tmpind="-1" pp="1" onfocus="S.key(\'S\')" class="EDITABLE" ewe="1" type="TEXT" value="'+valInput+'"';
if( tmp[6]=="M" ) txt += " class='EDITABLE'";
if( tmp[6]=="M" && !foco ){
foco = true;
txt += " autofocus";
}
txt += '>';
txt += '</span>';
txt += '<div class="SELECT EDITABLE SCROLLBAR" style="display:none;">';
txt += '<table id="'+tmp[1]+'_TABLE" cols="2"><colgroup><col><col></colgroup><tbody>';
for(i=0; i<sel.length; i++){
item = S.splitLast(",", S.trim(sel[i]));
if( item[1]=="" ) item[1] = "&nbsp;";
if( item[0]=="~" ){
txt += '<tr class="Line"><td></td><td></td></tr>';
}else{
txt += '<tr><td>'+item[0]+'</td><td>'+item[1]+'</td></tr>';
}
}
tmp[10] = "";
txt += '</tbody></table>';
txt += '</div>';
break;
}
if( tmp[10]!=undefined && tmp[10]!="" ){
tmp[10] = S.trim(tmp[10]);
if( tmp[10][0]==":" ){
txt += "<i class='ICONINPUT' onclick='eTreeMenu(this)' eField='"+tmp[1]+"' eData='"+S.mid(tmp[10],1,0)+"'";
}else{
txt += "<i class='ICONINPUT' onclick='eTreeData(this)' eField='"+tmp[1]+"' eData='"+tmp[10]+"'";
}
if( dimDelimiter[S.trim(tmp[1])] ) txt += " delimiter="+dimDelimiter[S.trim(tmp[1])];
txt += ">S</i>";
}
txt += "</td></tr>";
}
txt += "</table></form>";
var win2 = S.window("", {
title:dim[0],
content:'<div class="" style="white-space:nowrap; display:table; overflow:auto; height:100%;padding:1px;margin:5px;">'+txt+'</div>',
status:'<table class="AddButton" title="" border="0px" cellspacing="0px" cellpadding="1px" style="display:inline-flex;"><tr><td>Aceptar</td></tr></table>',
modal:true,
print:false,
minimize:false,
maximize:false,
resize:false,
onclose:function(){
S("[id*='_TABLE']").each(function(k,o){
S(o.parentElement).nodeRemove();
});
S(this).nodeRemove();
}
});
S(win2).windowIcon("I",'<i class="ICONWINDOW" style="margin-right:2px" onclick=AyudaLabel("'+dim[0]+'")>?</i>');
JSLOAD();
S.infoHide(window);
S(".AddButton", win2).on("click",function(k){
if( !S(":FORMHELP").submitCheck() || !JSCHECK() ){
return S.eventClear(window);
}
var txt = dim[0]+" ", Rem="", ConditionLine="",
valor = S(":FORMHELP").obj.elements,label="",tmp,n,i=0;
for(n=0; n<valor.length; n++){
if( valor[n].name=="Rem" ){
Rem = valor[n].value;
}else if( valor[n].name=="ConditionLine" ){
ConditionLine = valor[n].value;
}else if( valor[n].name[0]!="_" ){
if( i++>0 ) txt += " | ";
if( valor[n].type=="checkbox" ){
if( valor[n].getAttribute("eConver")!=null ){
var conver = S.splitLast("~", valor[n].getAttribute("eConver")),
tmp = S.splitLast("=", conver[1]);
valor[n].value = valor[n].checked ? S.setup.checkOn : S.setup.checkOff;
if( tmp[1]=="S" && valor[n].checked ){
txt += tmp[0];
}else if( conver[0]==valor[n].value || (conver[0]=="S" && valor[n].checked) || (conver[0]=="" && !valor[n].checked) ){
}else{
txt += (valor[n].value==S.setup.checkOn ? "true":"false");
}
}else{
txt += (valor[n].checked ? "true":"false");
}
}else{
txt += valor[n].value;
}
}
}
txt = S.trim(txt);
if( ConditionLine!="" ) txt = ConditionLine+" "+txt;
if( Rem!="" ) txt += "\t\t\t\/"+"/ "+Rem;
if( dim[0]=="[Line]" ){
label = "[Line]";
tmp = txt.split("]");
tmp = tmp[1].split("|");
for(n=0; n<tmp.length; n++) tmp[n] = S.trim(tmp[n]);
txt = tmp[0]+" -";
if( (tmp[1]+tmp[2])!="" ) txt += "|"+tmp[1];
if( tmp[2]!="" ) txt += "||"+tmp[2]+"||||||";
}else if( dim[0]=="[Fields]" ){
label = "[Fields]";
txt = S.left(txt,8,0);
tmp = txt.split("|");
txt = "";
for(n=0; n<tmp.length; n++) tmp[n] = S.trim(tmp[n]);
if( tmp[0]!="" ) txt = tmp[0];
if( tmp[1]!="" ){
if( txt!="" ) txt += "|";
txt = tmp[1];
}
if( tmp[2]!="" ){
if( txt!="" ) txt += "|";
txt = tmp[2];
}
if( tmp[3]!="" ) txt += "\t\t/"+"/ "+tmp[3];
txt = label+" "+txt;
}else if( dim[0]=="[Field]" && S.count("|",txt)>=15 ){
txt = S.left(txt,7,0);
tmp = txt.split("|");
txt = "";
for(n=0; n<tmp.length; n++) tmp[n] = S.trim(tmp[n]);
txt = tmp[0];
if( txt!="" ) txt += " ";
txt += tmp[1];
if( tmp[1]!="" && /[0-9]/.test(S.right(tmp[1],1)) ) txt += " ";
txt += tmp[2]+"\\"+tmp[3]+"\\"+tmp[4];
while( S.right(txt,1)=="\\" ){
txt = S.trim(S.mid(txt,0,-1));
}
for(n=5; n<10; n++) txt += "|"+tmp[n]
if( tmp[10]!="" ) txt += "/"+tmp[10];
txt += "|"+tmp[11];
if( tmp[12]!="" ) txt += " "+tmp[12];
for(n=13; n<tmp.length-1; n++) txt += "|"+tmp[n];
if( tmp[16]!="" ) txt += "\t\t/"+"/ "+tmp[16];
label = "[Field]";
}else{
while( S.right(txt,1)=="|" ){
txt = S.trim(S.mid(txt,0,-1));
}
}
dim = _Editor.doc.getValue().split("\n");
var prefijo="", sufijo="";
if( dim[linea][0]=="¿" ) prefijo = "¿"+S.mid(dim[linea], "¿", "?")+"? ";
n = _Editor.getDoc().scrollTop;
dim[linea] = prefijo+txt+sufijo;
_CargaEDF(dim.join("\n"));
if( label=="[Field]" || label=="[Line]" ){
AlinearFields(_Editor);
}
S("[id*='_TABLE']").each(function(k,o){
S(o.parentElement).nodeRemove();
});
S(win2).window();
_Editor.focus();
_Editor.scrollTo(0, n);
_Editor.setCursor(linea*1, 0);
});
}
function eTreeData(o){
var tmp = o.getAttribute("eData").split(";"),
t=tmp.length, n,i, menu=[], submenu=[], carpeta="", item;
menu.push([tmp[0]]);
for(n=1; n<t; n++){
tmp[n] = S.trim(S.replace(tmp[n],"[,]","&#44;"));
item = S.splitLast(",", tmp[n]);
item[0] = S.trim(S.replace(item[0],"&#44;",","));
item[1] = S.trim(item[1]);
if( item[0][0]=="~" ){
carpeta = S.trim(S.mid(item[0],1,0));
submenu = [];
for(i=n+1; i<t; i++){
tmp[i] = S.trim(S.replace(tmp[i],"[,]","&#44;"));
item = S.splitLast(",", tmp[i]);
item[0] = S.trim(S.replace(item[0],"&#44;",","));
item[1] = S.trim(item[1]);
if( item[0]=="~" ){
n = i;
break;
}
submenu.push([item[1], "", item[0]]);
}
menu.push([carpeta, "", submenu]);
}else{
menu.push([item[1], "", item[0]]);
}
}
S(o).tree(menu,{icon:carpeta!=""?"system":"", expanded:true, modal:true, parameter:o.getAttribute("eField"), function:function(op,tr,para,label){
S(":"+para).val(op);
S(this).nodeRemove();
}});
}
function eTreeMenu(o){
var tmp = o.getAttribute("eData").split(";"),
datos = S(":"+o.getAttribute("eField")).val(),
delimiter = o.getAttribute("delimiter"),
t=tmp.length, n,i, menu=[], item;
menu.push([tmp[0]]);
for(n=1; n<t; n++){
tmp[n] = S.trim(S.replace(tmp[n],"[,]","&#44;"));
item = S.splitLast(",", tmp[n]);
item[0] = S.trim(S.replace(item[0],"&#44;",","));
item[1] = S.trim(item[1]);
menu.push([item[1], "[]"+(datos.indexOf(item[0])>-1?"c":""), item[0]]);
}
menu.push(["=Aceptar", "", "A",null,null,"margin:20px;padding:20px;"]);
S(obj).menu(menu, {zIndex:9999, type:"14", function:function(dim,b,c){
var txt="", n;
for(n=0; n<dim.length; n++){
if( dim[n][0] ){
if( delimiter!=null && txt!="" ) txt += delimiter;
txt += S.trim(dim[n][1]);
}
}
S(":"+o.getAttribute("eField")).val(txt);
}});
}
var _HelghtResult=2, _FormateaEditor=0;
function FormateaEditor(n){
if( typeof(_ScriptActual)=="undefined" ){
if( ++_FormateaEditor<9 ){
setTimeout(function(){
FormateaEditor(n);
}, 500);
}
return;
}
_FormateaEditor = 0;
var wh = S.windowSize(window);
S("#TODO").css("heigth","100%");
S("#TODO").css("width","100%");
S("#TODO").block("table");
S("#TODO TBODY").obj.style.width="100%";
if( S("#SCRIPT"+_ScriptActual).length==0 ) return;
var wh = S.windowSize(window),
v1 = S("#LINEAUNO").obj.offsetHeight,
v2 = S("#TABCONTENEDOR").obj.offsetHeight,
v3 = (S("#SCRIPT"+_ScriptActual).length==0 ? 0 : S("#SCRIPT"+_ScriptActual).obj.rows[0].offsetHeight),
nmScript = S("#SCRIPT"+_ScriptActual).obj.rows[0].cells[1].innerText,
alto = v1+v2+v3;
wh = S.windowSize(window);
alto = wh["height"] - alto;
if( v3>0 && (nmScript!="SHELL" && nmScript!="SHELL" && nmScript!="TRON" && nmScript!="TRON_1" && nmScript!="SAVESQL" && S.left(nmScript,7)!="RESULT:") ){
if( !_Editor ){
setTimeout(function(){
FormateaEditor(n);
},500);
return;
}
n = (/^(PHP|SQL|HTM)$/i.test(nmScript))? 2:1;
if( n==2 ){
_Editor.setSize(wh["width"], alto/_HelghtResult);
S(".cIFrame", "#SCRIPT"+_ScriptActual).css({height: alto-(alto/_HelghtResult), width:document.body.clientWidth});
}else{
_Editor.setSize(_WIDTH, alto);
}
S(".CodeMirror", ":FRM"+_ScriptActual).css("width:"+document.body.clientWidth+"px");
}
}
function ajustaAlto(sc){
var wh = S.windowSize(window),
v1 = S("#LINEAUNO").obj.offsetHeight,
v2 = S("#TABCONTENEDOR").obj.offsetHeight,
v3 = (S("#SCRIPT"+sc).length==0 ? 0 : S("#SCRIPT"+sc).obj.rows[0].offsetHeight),
nmScript = S("#SCRIPT"+sc).obj.rows[0].cells[1].innerText,
alto = v1+v2+v3;
wh = S.windowSize(window);
alto = wh["height"] - alto - 18;
setTimeout(function(){
S("#fuente", ":FRM"+sc).css("height:"+alto);
}, 500);
}
function makeMarker(){
var marker = document.createElement("div");
marker.style.color = "red";
marker.style.fontFamily = "Symbol";
marker.style.fontWeight = "bold";
marker.innerHTML = String.fromCharCode(183);
return marker;
}
function saveConfig(cm){
var p = cm.getDoc().scrollLeft+","+
cm.getDoc().scrollTop+","+
cm.getCursor()["line"]+","+
cm.getCursor()["ch"]+"|",
codeFold = (document[cm.getTextArea().parentNode.name]["status"].value+"||").split("|")[2],
t = cm.doc.lineCount(), n, i;
for(n=0; n<t; n++){
i = cm.lineInfo(n);
if( i.gutterMarkers && i.gutterMarkers.breakpoints ){
p += ","+n;
}
}
p = p+"|"+codeFold;
document[cm.getTextArea().parentNode.name]["status"].value = p;
return p.split("|")[1];
}
function gotoPoint(cm,n){
if(cm==null) cm = _Editor;
var c=cm.doc.getCursor(),
dll=cm.doc.lineCount(),
i=null, x, p=0;
for(x=0; x<dll; x++){
i = cm.lineInfo(x);
if(i.gutterMarkers && i.gutterMarkers.breakpoints){
if(++p==n){
cm.setCursor(x);
cm.focus();
return;
}
}
}
}
function alineaISubList(format){
var t=format.length, txt="", linea="", i,n, dim, maxCol=0, col=[];
for(n=0; n<t; n++) maxCol = Math.max(maxCol, format[n].split("|").length);
for(n=0; n<maxCol; n++) col.push(0);
for(n=0; n<t; n++){
dim = format[n].split("|");
if( dim.length==maxCol ){
for(i=0; i<maxCol; i++){
col[i] = Math.max(col[i], S.trim(dim[i]).length);
if(n==0 && i==0) col[i]-=3;
}
}
}
for(n=0; n<t; n++){
dim = format[n].split("|");
if( dim.length==maxCol ){
linea = "    ";
for(i=0; i<maxCol; i++){
if(i>0) linea += " | ";
dim[i] = S.trim(dim[i]);
if(i==0 && S.mid(dim[i],1)=="." ){
dim[i] = S.trim(S.mid(dim[i],1,0));
linea = " .  "+S.padR(dim[i], col[i], ' ');
}else{
if(n==0 && i==0){
linea = S.padR(dim[i], col[i]+4, ' ');
}else{
linea += S.padR(dim[i], col[i], ' ');
}
}
}
txt += S.rtrim(linea)+S.char(13);
}else{
txt += format[n]+S.char(13);
}
}
return txt;
}
function _CargaEDF(txt){
_Editor.doc.setValue(S.rtrim(txt));
_Editor.refresh();
_Editor.focus();
colorear();
}
function alineaFields(format){
var t=format.length, txt="", linea="", i,n,x, dim, col=[0,0,0,0,0,0,0,0,0,0,0], rem="", punto,coma, bak;
for(n=0; n<t; n++){
format[n] = S.trim(format[n]);
dim = format[n].split("/"+"/");
dim = dim[0].split("|");
if( dim.length==10 || dim.length==11 ){
for(i=0; i<dim.length; i++){
dim[i] = S.trim(dim[i]);
if(i==0){
if( dim[i][0]=="." ){
dim[i] = S.trim(S.mid(dim[i],1,0));
}else if( dim[i][0]=="," || dim[i][0]=="+" || dim[i][0]=="<" ){
if( dim[i][0]=="<" && />/.test(dim[i]) ){
coma = " ";
}else{
coma = dim[i][0];
dim[i] = S.trim(S.mid(dim[i],1,0));
}
if( /[1-9]/.test(dim[i][0]) ){
bak = dim[i][0];
dim[i] = coma+bak+" "+S.trim(S.mid(dim[i],1,0));
}else{
dim[i] = coma+"  "+dim[i];
}
}else{
dim[i] = "   "+dim[i];
}
}
col[i] = Math.max(col[i], dim[i].length);
}
}
}
col[0] += 2;
for(n=0; n<t; n++){
dim = format[n].split("/"+"/");
rem = dim[1] || "";
if( rem!="" ) rem = "\t\t\t/"+"/"+rem;
dim = dim[0].split("|");
if( dim.length==10 || dim.length==11 ){
linea = "";
for(i=0; i<dim.length; i++){
if(i>0) linea += " | ";
dim[i] = S.trim(dim[i]);
if(i==0){
punto = "";
if( dim[i][0]=="." ){
punto = ".";
dim[i] = S.trim(S.mid(dim[i],1,0));
}
if( dim[i][0]=="," || dim[i][0]=="+" || dim[i][0]=="<" ){
if( dim[i][0]=="<" && />/.test(dim[i]) ){
coma = " ";
}else{
coma = dim[i][0];
dim[i] = S.trim(S.mid(dim[i],1,0));
}
if( /[1-9]/.test(dim[i][0]) ){
bak = dim[i][0];
dim[i] = "  "+coma+bak+" "+S.trim(S.mid(dim[i],1,0));
}else{
dim[i] = "  "+coma+"  "+dim[i];
}
}else{
dim[i] = "     "+dim[i];
}
if( punto!="" ) dim[i] = " ."+S.mid(dim[i],2,0);
}
linea += S.padR(dim[i], col[i], " ");
}
txt += S.rtrim(linea)+rem+S.char(13);
}else{
if( S.trim(dim[0])=="-" ){
if( dim.length==1 ){
format[n] = "  "+format[n];
}else if( dim.length==2 ){
format[n] = "  - |"+S.trim(dim[1]);
}
}
txt += format[n]+S.char(13);
}
}
return txt;
}
function AlinearFields(cm){
var p = [
cm.getDoc().scrollLeft,
cm.getDoc().scrollTop,
cm.getCursor()["line"],
cm.getCursor()["ch"]
],
t = cm.doc.lineCount(),
txt="", n, i, x, l, ok=false, format=[];
for(n=0; n<t; n++){
x = cm.doc.getLine(n);
if( S.upper(x).indexOf("[FIELDS]")==0 ){
ok = true;
format=[];
txt += x+S.char(13);
for(i=n+1; i<t; i++){
x = cm.doc.getLine(i);
if( S.trim(x)[0]=="[" ){
txt += alineaFields(format);
n = i-1;
ok = false;
break;
}else{
format.push(x);
}
}
if( ok ){
txt += alineaFields(format);
break;
}
}else if( S.upper(x).indexOf("{SLGROUPLABELS}")==0 || S.upper(x).indexOf("{SLGL}")==0 ){
ok = true;
format=[];
format.push(x);
for(i=n+1; i<t; i++){
x = cm.doc.getLine(i);
if( S.trim(x)[0]=="[" || S.trim(x)[0]=="{" ){
txt += alineaISubList(format);
n = i-1;
ok = false;
break;
}else{
format.push(x);
}
}
if( ok ){
txt += alineaISubList(format);
break;
}
}else{
ok = false;
txt += x+S.char(13);
}
}
var bp = saveConfig(cm);
cm.doc.setValue(S.rtrim(txt));
cm.refresh();
cm.focus();
document[cm.getTextArea().parentNode.name]["update"].value = 'S';
colorear();
bp = bp.split(",");
for(n=1; n<bp.length; n++){
cm.setGutterMarker(bp[n]*1, "breakpoints", makeMarker());
}
cm.scrollTo(p[0], p[1]);
cm.setCursor(p[2], p[3]);
}
function colorear(){
var t = _Editor.doc.lineCount(),n,i,x,bak,note=false, zonaCss=false, eti,
esDF = (S.right(document[_Editor.getTextArea().parentNode.name]["script"].value,3)!="txt");
for(n=0; n<t; n++){
bak = _Editor.doc.getLine(n);
x = S.trim(bak);
if( note ){
_Editor.addLineClass(n, 'wrap', "style-note");
if( S.right(x,2)=="*"+"/" ) note = false;
continue;
}
eti = getLabel(x, false);
if( eti!="" ){
x = S.upper(S.mid(x,"[","]"));
if( S.upper(x)=="CSSADD" ){
zonaCss = true;
_Editor.addLineClass(n, 'wrap', "style-label");
continue;
}else{
zonaCss = false;
if( esDF && _Multiline.indexOf(","+S.upper(x)+",")>-1 ){
if( x!="NOTE" ){
_Editor.addLineClass(n, 'wrap', "style-label");
}else{
for(i=n; i<t; i++) _Editor.addLineClass(i, 'wrap', "style-note");
break;
}
}else{
i = bak.indexOf("[");
_Editor.markText({line:n, ch:i}, {line:n, ch:x.length+2+i||1000}, {className:"style-label"});
}
}
}else if( zonaCss ){
if( x.indexOf("/"+"*")>-1 ){
_Editor.markText({line:n, ch:bak.indexOf("/"+"*")+0}, {line:n, ch:bak.indexOf("*"+"/")+2||1000}, {css:"background-color:"+_ColorCondi+";"});
}
}else if( x[0]=="{" && x.indexOf("}")>-1 && /^[\{\}A-Za-z]{1,20}$/.test(S.mid(x,"{","}")) ){
x = S.upper(S.mid(x,"{","}"));
if( _Multiline.indexOf(","+S.upper(x)+",")>-1 ){
_Editor.addLineClass(n, 'wrap', "style-label");
}else{
_Editor.markText({line:n, ch:bak.indexOf("{")+0}, {line:n, ch:bak.indexOf("}")+1||1000}, {className:"style-label"});
}
}else if( x[0]=="¿" ){
_Editor.markText({line:n, ch:bak.indexOf("¿")+0}, {line:n, ch:bak.indexOf("?")+1||1000}, {css:"background-color:"+_ColorCondi+";font-weight:bold;"});
}else if( x[0]=="?" && x!="?>" ){
_Editor.markText({line:n, ch:bak.indexOf("?")+0}, {line:n, ch:bak.indexOf("?")+1}, {css:"background-color:"+_ColorCondi+";font-weight:bold;"});
}else if( x[0]=="#" ){
_Editor.markText({line:n, ch:bak.indexOf("#")+0}, {line:n, ch:bak.indexOf("¿")+1 || bak.indexOf(")")+1}, {css:"background-color:"+_ColorCondi+";font-weight:bold;"});
}else if( x[0]=="." || x[0]=="/" ){
_Editor.addLineClass(n, 'wrap', "style-note");
if( S.left(x,2)=="/"+"*" ) note = true;
if( S.right(x,2)=="*"+"/" ) note = false;
}
}
}
function listWindow(o){
var dim = [
["-Menú"]
,["Desktop", "", "Main"]
], seAyadio=false, index=null, label;
for(index in top.opener._gsEditStack){
if( /^[0-9]$/.test(index) || index=="" || window.name==index) continue;
if( !seAyadio ){
seAyadio = true;
dim.push(["-"]);
}
label = S.replace(index, ".", "#46#");
dim.push([index, "", label]);
}
S(o).menu(dim, {function:function(op, label){
if( op==null ) return;
op = S.replace(op, "#46#", ".");
window.open("", op);
}, noMark:true});
return S.eventClear(window);
}
</script>
<script type="text/javascript" charset="UTF-8" name="JSLOADScript">
function JSLOAD(){
}
</script>
<script type="text/javascript" charset="UTF-8" name="JSCHECKScript">
function JSCHECK(){
return true;
}
</script>
</head>
<body onfocus="ExpandeEditor()" onresize="FormateaEditor()">
<table border=0px cellspacing=0px cellpadding=0px style="width:100%;height:100%;border-spacing:0px;display:table;" id="TODO">
<tr style="height:1px;"><td style="padding:0px;height:1px;margin:2px" id="LINEAUNO">
<table class=MENU border=0px cellspacing=0px cellpadding=0px style="width:100%;height:28px;border-spacing:0px">
<tr>
<td><div class='ORDEN' onclick='menuFicheros(this)' title="Seleccionar solapa/script">Script</div></td>
<td width=100% style="cursor:var(--cAuto);padding:0px" title="Código de usuario <?=S::$_User?>">&nbsp;
<input type="text" id="getNameScript" onkeydown=keyGet(this) style="visibility:hidden">
</td>
<td><div class='ORDEN' onclick='Orden(2)' oncontextmenu='UltimosPHP()' title="Click Izq: Nuevo PHP<?="\n"?>Click Dch: Últimos PHP<?="\n"?>Alt Click: Browser PHP">PHP</div></td>
<td><div class='ORDEN' onclick='Orden(1)' oncontextmenu='UltimosSQL()' title="Click Izq: Nuevo SQL<?="\n"?>Click Dch: Últimos SQL<?="\n"?>Alt Click: Browser SQL">SQL</div></td>
<td><div class='ORDEN' onclick='Orden(3)' oncontextmenu='UltimosHTM()' title="Click Izq: Nuevo HTML<?="\n"?>Click Dch: Últimos HTML">HTM</div></td>
<td><div class='ORDEN' onclick='Orden(5)'>SHELL</div></td>
<td><div class='ORDEN' onclick='Orden(8)' oncontextmenu='Orden(28)' title="Click Izq: Ver TRON<?="\n"?>Click Dch: Borrar TRON">TRON</div></td>
<?PHP
if( SESS::$OS=="WIN" ){
$textHelp = "[click] Ver SAVESQL\n[click-right] Borrar SAVESQL\n[Alt-click] On/Off SaveSQL";
}else{
$textHelp = "[click] Ver SAVESQL\n[click-right] Borrar SAVESQL\n[option-click] On/Off SaveSQL";
}
?>
<td><div class='ORDEN<?=(SESS::$_DEBUGSQL ? " DEBUGSQL":"")?>' id=_DEBUGSQL onclick='Orden(9)' oncontextmenu='Orden(29)' title="<?=$textHelp?>">SAVESQL</div></td>
<td><div class='ORDEN' onclick='Orden(10)'>Key</div></td>
<td><div class='ORDEN' onclick='Orden(14)' oncontextmenu='DownloadAyuda()' title="Click Izq: Ayuda<?="\n"?>Click Dch: Descargar Ayuda CHM">Help</div></td>
<td><i style="font-size:10px" class="ICONDESKTOP" onclick="ListRestoreCopy()" id="ListRestoreCopy" title="Restore copy" style="cursor:val(--vPointer)">&#242;</i></td>
<td><i style="font-size:10px" class="ICONDESKTOP" onclick="S(this).fullscreen()" oncontextmenu="listWindow(this)" title="<?=$__Lng[126]?>" style="cursor:val(--vPointer)">:</i></td>
<td style="padding-right:0px;font-size:75%;" onclick='Orden(11)' oncontextmenu='Orden(12)' title="Click Izq: Menú BreakPoint<?="\n"?>Click Dch: Borrar todos los BreakPoint"><i class="ICONWINDOW" style="font-size:10px">*</i></td>
<?PHP if( SESS::$_D_=="~" ){ ?>
<td onclick='MenuEDes()' oncontextmenu='MenuEDes2()'><i class="ICONWINDOW ICONDEVELOPMENT" style="font-size:10px;padding-left:2px">=</i></td>
<?PHP } ?>
<td style="padding-right:30px" onclick='Orden(13)' oncontextmenu='MenuSys()'><i class="ICONWINDOW" style="font-size:10px">=</i></td>
<td width=1px align=center valign=middle onclick='Grabar(-1)' style="padding:0px 2px 0px 0px" title="Click: Grabar/Ejecutar Script<?="\n"?>Alt Click: +Foco Desktop<?="\n"?>Shift Click: +Foco Desktop + Reload"><i class=ICONWINDOW id=IconoGrabar>w</i></td>
</tr>
</table>
</td></tr>
<tr style="padding:0px;height:1px;"><td style="padding:0px;display:flex;" id="TABCONTENEDOR">
<span style="width:100%" onclick="verScriptMH()" oncontextmenu="ResaltarScript()"></span>
</td></tr>
<tr style="padding:0px;"><td style="padding:0px;vertical-align:top;" id="CONTENEDORSCRIPT">
<table class="TABS" border=0px cellspacing=0px cellpadding=0px style="width:100%;height:100%;border-spacing:0px">
<?PHP
if( $_GET["RF"] ){
$display = "";
$scriptUser = $_GET["RF"];
$dim[] = $scriptUser;
for($n=0; $n<count($dim); $n++){
echo '<tr eTAB='.$n.' style="padding:0px;"><td style="padding:0px;vertical-align:top;">';
$dim2 = cargarScript($n, $dim[$n], $display);
echo '</td></tr>';
if( gettype($dim2)!="boolean" && count($dim2)>0 ){
for($i=0; $i<count($dim2); $i++){
if( !in_array($dim2[$i], $dim) ) $dim[] = $dim2[$i];
}
}
$display = "display:none;";
}
}
function cargarShell($pk, $scriptUser, $display=""){
echo "<table id='SCRIPT{$pk}' border=0px cellspacing=0px cellpadding=0px style='border-spacing:0px;width:100%;height:100%;{$display}'>";
echo '<tr class=SCRIPT style="height:1px">';
echo "<td style='padding:5px 10px 5px 10px;width:1px;border-right:1px solid #ffffff'>".($pk+1)."</td>";
echo "<td style='padding-left:10px'>{$scriptUser}</td>";
echo "<td width=1px align=center valign=middle onclick='cerrarScript()'><i class=ICONWINDOW style='color:#ffffff'>5</i></td>";
echo '</tr>';
echo '<tr style="height:100%">';
echo "<td colspan=3 style='margin:0px;padding:0px;'>";
if( $scriptUser=="SHELL" ){
echo '<iframe SeCargo=0 frameborder=1px src="edes.php?E:$t/vsh.gs'.eSessionAddUrl().'" name="RESULT'.$pk.'" eNORESIZE=true style="width:100%;height:100%;border-width:1px 0px 0px 0px;border-color:#dddddd;border-style:solid;"></iframe>';
}else{
echo '<textarea name="fuente" id="fuente" WRAP="VIRTUAL" style="width:99%; height:99%; margin:0px; padding:5px; white-space:nowrap; font-family:monospace"'.(($scriptUser=="SAVESQL")?" onkeydown=EsF1SQL(this)":"").'>';
if( $scriptUser=="TRON" ){
echo file_get_contents("../_tmp/__tron.".S::$_User);
}else if( $scriptUser=="TRON_1" ){
echo file_get_contents("../_tmp/__tron.-1");
}else{
echo file_get_contents("../_tmp/log/sql.".S::$_User);
}
echo '</textarea>';
}
echo "</td>";
echo "</tr>";
echo '</table>';
?>
<script type="text/javascript" charset="UTF-8">
top.S("#VerLabelFunc").none();
top.S("#MARCADOR").none();
var ejecutar = true, pk="<?=$pk?>";
if( "<?=$scriptUser?>"!="SHELL" ){
var p = top.S("#TABCONTENEDOR").obj.children[0].children, n;
for(n=0; n<p.length; n++){
if( "<?=$scriptUser?>"==p[n].innerText && top.S("#SCRIPT"+n).exists() ){
top.S("TR[eTAB='"+n+"']").block("table-row");
top.S("TEXTAREA", top.S("#SCRIPT"+n)).obj.value = document.getElementById("fuente").value;
top.S("TEXTAREA", top.S("#SCRIPT"+n)).obj.scrollTop = 99999;
p[n].style.display = "";
ejecutar = false;
break;
}
}
<?PHP if( $scriptUser=="TRON" ){ ?>
setTimeout(function(){
var  dim = top.S(".SCRIPT", top).dim, oTextarea
,total = dim.length;
for(n=0; n<total; n++){
if( dim[n].cells[1].innerText=="TRON" ){
k = parseInt(dim[n].cells[0].innerText)-1;
oTextarea = top.S("TEXTAREA", top.S("#SCRIPT"+k, top).obj).obj
var xy = S.xy(top.S(oTextarea).obj);
top.S(oTextarea).none();
setTimeout(function(){
var  wh = S.windowSize(top)
,_WIDTH = wh["width"]
,_HEIGHT = wh["height"];
var  w = _WIDTH-12
,h = _HEIGHT-xy.y-12
S(oTextarea).css("width:"+w+"px; height:"+h+"px;");
top.S(oTextarea).block();
}, 100);
break;
}
}
}, 100);
<?PHP } ?>
}
if( ejecutar ){
var obj = top.S("#TABCONTENEDOR").obj.children[0];
top.S("<div class='TABSCRIPT'><?=$scriptUser?></div>").nodeEnd(obj);
setTimeout(function(){
try{
top.S("TEXTAREA", top.S("#SCRIPT"+pk)).obj.scrollTop = 99999;
}catch(e){}
}, 100);
}
</script>
<?PHP
return $dimScript;
}
function cargarScript($pk, $scriptUser, $display=""){
if( $scriptUser=="HTM" ){
$script = eScript("/_tmp/edes_htm.".S::$_User, $bak);
if( eSubstrCount($script,".")==0 ){
$script .= '.edf';
$scriptUser .= ".edf";
if( isset($_GET["LoadSel"]) ) $_GET["LoadSel"] .= ".edf";
}
clearstatcache();
$md5 = md5_file($script);
$status = file_get_contents($bak.'.edt');
$sg = $pk;
}else if( $scriptUser=="SHELL" || $scriptUser=="TRON" || $scriptUser=="TRON_1" || $scriptUser=="SAVESQL" || $scriptUser=="TRACEURL" || $scriptUser=="HACKER" ){
}else if( $scriptUser!="SQL" && $scriptUser!="PHP" && $scriptUser!="HTM" ){
if( $scriptUser=="NOTES" ) $scriptUser = "/_d_/usr/note.".S::$_User;
if( $scriptUser=="ERRORES" ){
$scriptUser = "/_tmp/err/_log_short.err";
$script = eScript($scriptUser, $bak);
}else if( $scriptUser=="ERROR" ){
$scriptUser = "/_tmp/err/_log.err";
$script = eScript($scriptUser, $bak);
}else if( $scriptUser=="/_datos/config/key_help.htm" ){
$scriptUser = "../_datos/config/key_help.htm";
$script = DIREDES."web/aplication/_datos/config/key_help.htm";
}else{
$script = eScript($scriptUser, $bak);
}
if( eSubstrCount($script, ".")==0 ){
$script .= '.edf';
$scriptUser .= ".edf";
if( isset($_GET["LoadSel"]) ) $_GET["LoadSel"] .= ".edf";
}
clearstatcache();
$md5 = md5_file($script);
$status = file_get_contents($bak.'.edt');
$sg = "";
if( isset(SESS::$_gsDirAccess) && count(SESS::$_gsDirAccess)>0 ){
$ConAcceso = false;
for($n=0; $n<count(SESS::$_gsDirAccess); $n++){
if( eSubstrCount($script, '/'.SESS::$_gsDirAccess[$n].'/')==1 ){
$ConAcceso = true;
break;
}
}
if( !$ConAcceso ){
return false;
}
}
}else{
$script = $scriptUser;
$md5 = "EXE";
$sg = time();
}
$nmScriptUser = $scriptUser;
if( $scriptUser=="/_d_/usr/note.".S::$_User ) $nmScriptUser = "NOTES";
if( $scriptUser=="/_tmp/err/_log_short.err" ){
$nmScriptUser = "ERRORES";
$scriptUser = "ERRORES";
}else if( $scriptUser=="/_tmp/err/_log.err" ){
if( $_GET["POST"]!="" ){
$nmScriptUser = "ERROR-POST";
$scriptUser = "ERROR-POST";
}else{
$nmScriptUser = "ERROR-HTML";
$scriptUser = "ERROR-HTML";
}
}
clearstatcache();
echo "<table id='SCRIPT{$pk}' border=0px cellspacing=0px cellpadding=0px style='border-spacing:0px;{$display}width:100%;height:100%;'>";
echo '<tr class=SCRIPT style="height:1px;">';
echo "<td style='padding:5px 10px 5px 10px;width:1px;border-right:1px solid #ffffff;cursor:var(--cAuto);'>".($pk+1)."</td>";
echo "<td style='padding-left:10px;cursor:var(--cAuto);'>{$nmScriptUser}</td>";
echo "<td width=1px align=center valign=middle onclick='cerrarScript()'><i class=ICONWINDOW style='color:#ffffff;cursor:var(--cPointer);'>5</i></td>";
echo '</tr>';
echo '<tr style="height:'.(($scriptUser<>"SQL" && $scriptUser<>"PHP" && $scriptUser<>"HTM")?"100":"50").'%">';
echo "<td colspan=3 style='margin:0px;padding:0px;'>";
if( $scriptUser=="HTM--" ){
echo '<form accept-charset="utf-8" name="FRM'.$pk.'" target="'.(($scriptUser<>"SQL" && $scriptUser<>"PHP" && $scriptUser<>"HTM")?"TLF":"RESULT".$sg).'" method="post" action="javascript:" style="width:100%;height:100%;display:flex;">';
}else{
echo '<form accept-charset="utf-8" name="FRM'.$pk.'" target="'.(($scriptUser<>"SQL" && $scriptUser<>"PHP" && $scriptUser<>"HTM")?"TLF":"RESULT".$sg).'" method="post" action="edes.php?E:$t/ed.gs'.(($scriptUser=="SQL")?"&_DB=NO":"").eContextAddUrl().eSessionAddUrl().'" style="width:100%;height:100%;display:flex;">';
}
echo "<input type='hidden' name='script' value='{$scriptUser}'>";
echo "<input type='hidden' name='md5' value='{$md5}'>";
echo "<input type='hidden' name='update' value=''>";
echo "<input type='hidden' name='status' value='{$status}'>";
if( $scriptUser=="ERROR-HTML" ) echo "<input type='hidden' name='_CdiPost' value='{$_GET['CDI']}'>";
echo '<textarea name="fuente" id="fuente" WRAP="VIRTUAL" style="width:100%;margin:0px;padding:5px;white-space:nowrap;'.(($scriptUser=="Shell" || $scriptUser=="TRON" || $scriptUser=="TRON_1" || $scriptUser=="SAVESQL")?"":"display:none").'"';
if( $scriptUser=="PHP" ) echo " gotoLine=1";
if( $scriptUser=="HTM" ) echo " gotoLine=3";
echo '>';
if(		  $scriptUser=="PHP" ){
if( $_GET["_LastPHP"] ){
echo file_get_contents("../_d_/usr/php.".S::$_User.".".$_GET["_LastPHP"]);
}else{
echo '<'.'?PHP'."\n\n?".'>';
}
}else if( $scriptUser=="SQL" ){
}else if( $scriptUser=="TRACEURL" ){
$dim = file("../_tmp/log/trace.".S::$_User.".txt");
if( getType($dim)=="array" ){
for($n=0; $n<count($dim); $n++){
if( mb_substr($dim[$n],28,12)!=': E:$t/ed.gs' && mb_substr($dim[$n],28,17)!=': E:$help_edes.gs' ){
echo $dim[$n];
}
}
}
}else if( $scriptUser=="HTM" ){
if( $_GET["_LastHTM"] ){
echo file_get_contents("../_d_/usr/htm.".S::$_User.".".$_GET["_LastHTM"]);
}else if( !file_exists($script) ){
global $_eDesTitle;
echo "<!DOCTYPE HTML><HTML><HEAD><META HTTP-EQUIV='Content-Type' CONTENT='text/html; charset=UTF-8'>\n";
echo "<STYLE type='text/css'></STYLE>\n";
echo "<SCRIPT type='text/javascript' charset='UTF-8'>\n\n</SCRIPT>\n";
echo "</HEAD><BODY>\n\n</BODY></HTML>";
}
}else if( $scriptUser=="ERRORES" ){
$texto = "";
$dim = array();
if( file_exists($script) ){
$dim = file($script);
}
for($n=0; $n<count($dim); $n++){
if( mb_strlen(trim($dim[$n]))==19 && mb_substr($dim[$n],0,2)=="20" && mb_substr($dim[$n],13,1)==":" ){
if( mb_substr(trim($dim[$n+1]),0,4)=="USER" ){
list(,$user) = explode(":", $dim[$n+1]);
}else if( mb_substr(trim($dim[$n+2]),0,4)=="USER" ){
list(,$user) = explode(":", $dim[$n+2]);
}
$user = ($user*1);
if( $user==S::$_User || $user==0 ){
$texto .= $dim[$n];
for($i=$n+1; $i<count($dim); $i++){
if( mb_strlen(trim($dim[$i]))==19 && mb_substr($dim[$i],0,2)=="20" && mb_substr($dim[$i],13,1)==":" ){
$n = $i-1;
break;
}
$texto .= $dim[$i];
}
}
}
}
}else if( $scriptUser=="ERROR-HTML" ){
$_GET["CDI"] = trim($_GET["CDI"]);
$texto = "";
$dim = file($script);
for($n=0; $n<count($dim); $n++){
if( trim($dim[$n])==$_GET["CDI"] ){
list(,$user) = explode(":", $dim[$n+1]);
if( ($user*1)==S::$_User ){
for($i=$n+1; $i<count($dim); $i++){
if( mb_substr($dim[$i],0,10)=="	HTML...: " ){
$texto = mb_substr($dim[$i],10);
for($p=$i+1; $p<count($dim); $p++){
if( mb_strlen(trim($dim[$p]))==19 && mb_substr($dim[$p],0,2)=="20" && mb_substr($dim[$p],13,1)==":" ){
break 3;
}
$texto .= mb_substr($dim[$p],3);
}
}
}
}
}
}
}else if( $scriptUser=="ERROR-POST" ){
$texto = "";
$dim = file($script);
for($n=0; $n<count($dim); $n++){
if( trim($dim[$n])==$_GET["POST"] ){
list(,$user) = explode(":", $dim[$n+1]);
if( ($user*1)==S::$_User ){
for($i=$n+1; $i<count($dim); $i++){
if( mb_substr($dim[$i],0,10)=="	POST...: " ){
$texto = mb_substr($dim[$i],10);
for($p=$i+1; $p<count($dim); $p++){
if( mb_substr($dim[$p],0,10)=="	HTML...: " || mb_substr($dim[$p],0,10)=="	GET....: " ){
break 3;
}
$texto .= mb_substr($dim[$p],3);
}
}
}
}
}
}
}
$EditorActivo = "true";
if( $scriptUser=="SQL" || $scriptUser=="SHELL" || $scriptUser=="TRON" || $scriptUser=="TRON_1" || $scriptUser=="SAVESQL" || $scriptUser=="TRACEURL" ){
$EditorActivo = "false";
}
if( $scriptUser!="SQL" && $scriptUser!="PHP" && $scriptUser!="SHELL" && $scriptUser!="TRON" && $scriptUser!="TRON_1" && $scriptUser!="SAVESQL" && $scriptUser!="TRACEURL" ){
if( file_exists($script) ){
if( $script=="../tree/__personal.".SESS::$_UserLogin ){
$texto = gzuncompress(file_get_contents($script));
list($oEmail) = explode("\n", $texto);
if( trim(mb_substr($oEmail,11))==SESS::$_UserLogin ){
$texto = trim(mb_substr($texto, mb_strlen($oEmail)));
}else{
$texto = "Acceso no autorizado...";
}
}else if( eSubstrCount(str_replace('\\','/',$script),"/edes.v3/")==1 || eSubstrCount(str_replace('\\','/',$script),"/edes.v3/")==1 ){
if( SESS::$_D_<>"~" ){
$texto = "Acceso no autorizado...";
}else{
$sFile = str_replace('\\','/',$script);
if( eSubstrCount($sFile,"__edes.arb") || eSubstrCount($sFile,"__analista.arb") || eSubstrCount($sFile,"__master.arb") || eSubstrCount($sFile,"__programador.arb") ){
$texto = gzuncompress(file_get_contents($script));
eExplodeLast(str_replace('\\','/',$script), "/", $no, $NomArbol);
list($oEmail) = explode("\n", $texto);
if( trim($oEmail)==$NomArbol ){
$texto = trim(mb_substr($texto, mb_strlen($oEmail)));
}else{
$texto = "Acceso no autorizado...";
}
}else{
$texto = file_get_contents($script);
if( mb_substr($script,-4)==".zdf" && mb_substr($texto,0,5)=='eDes ' ){
$texto = gzuncompress(mb_substr($texto,5));
}
}
}
}else if( $scriptUser=="ERRORES" || $scriptUser=="ERROR-HTML" || $scriptUser=="ERROR-POST" ){
}else if( $_GET["_LastHTM"] ){
}else{
$texto = file_get_contents($script);
if( $nmScriptUser=="NOTES" ) $texto = gzuncompress($texto);
if( mb_substr($script,-4)==".zdf" && mb_substr($texto,0,5)=='eDes ' ){
$texto = gzuncompress(mb_substr($texto,5));
}
}
$texto = str_replace(
array("&"  ,  "<" , ">" ),
array("#~#", "#<#","#>#"),
$texto
);
echo $texto;
}else if( mb_substr($scriptUser,-5)==".test" ){
echo "/"."*";
?>
eTest(NmFunction1, [
[Parameter1, Parameter2, Parameter..., Result],
["field1=value", "field2=value", "field...=value", Parameter1, Parameter2, Parameter..., Result],
...
],
NmFunction2, Dim2,
NmFunction..., Dim...
);
eTest();
<?PHP
echo "*"."/";
}else if( mb_substr($scriptUser,-4)==".lng" ){
echo "[Language] ".SESS::$_LanguageDefault;
qQuery("select cd_gs_language from {$_ENV['eDesDictionary']}gs_language where cd_gs_language<>'".SESS::$_LanguageDefault."' order by cd_gs_language");
while($r=qRow()){
echo ",".$r[0];
}
}
}
if( $scriptUser=="SQL" && $_GET["_LastSQL"] ){
echo file_get_contents("../_d_/usr/sql.".S::$_User.".".$_GET["_LastSQL"]);
}
echo '</textarea>';
if( $scriptUser=="/_d_/usr/note.".S::$_User ) $scriptUser = "NOTES";
?>
<script type="text/javascript" charset="UTF-8">
var txt = document["FRM<?=$pk?>"].fuente.value;
txt = txt.replace(/#~#/g,"&").replace(/#<#/g,"<").replace(/#>#/g,">");
document["FRM<?=$pk?>"].fuente.value = txt;
top.S("#VerLabelFunc").none();
top.S("#MARCADOR").none();
var obj = top.S("#TABCONTENEDOR").obj.children[0];
top.S("<div class='TABSCRIPT'><?=$scriptUser?></div>").nodeEnd(obj);
<?PHP
if( $scriptUser=="ERRORES" ){
}
?>
</script>
<?PHP
echo "</form>";
echo "</td>";
echo "</tr>";
if( $scriptUser=="SQL" || $scriptUser=="PHP" || $scriptUser=="HTM" ){
echo '<tr style="height:50%">';
echo "<td class=cIFrame colspan=3 style='margin:0px;padding:0px;border-top:2px solid #DDDDDD'>";
echo '<iframe frameborder=1px src="edes.php?R:$iframe_my.htm'.eSessionAddUrl().'" name="RESULT'.$sg.'" eNORESIZE=true style="width:100%;height:100%;border-width:1px 0px 0px 0px;border-color:#dddddd;border-style:solid;"></iframe>';
echo "</td>";
echo "</tr>";
}else if( $scriptUser=="SHELL" || $scriptUser=="TRON" || $scriptUser=="TRON_1" || $scriptUser=="SAVESQL" ){
echo '<tr>';
echo "<td colspan=2 style='margin:0px;padding:0px;'>";
echo "<input type='text' id='INPUT{$pk}' style='width:100%; border-style:none;'>";
echo "</td>";
echo "</tr>";
}
echo '</table>';
$dimScript = array();
if( mb_substr($scriptUser,-4)!=".txt" ){
$dim = explode("\n",$texto);
for($n=0; $n<count($dim); $n++){
$dim[$n] = trim($dim[$n]);
if( $dim[$n][0]=="." || $dim[$n][0]=="/" ) continue;
if( mb_strtoupper(mb_substr($dim[$n],0,6))=="[NOTE]" ) break;
if( eSubstrCount(mb_strtoupper($dim[$n]), "[TAB]")>0 ){
list($token) = explode(REM, $dim[$n]);
if( mb_strtoupper(trim($token))=="[TAB]" ){
for($i=$n+1; $i<count($dim); $i++){
$dim[$i] = trim($dim[$i]);
if( $dim[$i][0]=="." || $dim[$i][0]=="/" ) continue;
if( $dim[$i][0]=="[" ) break;
list($token) = explode(REM, $dim[$i]);
if( $token<>"" ){
$token = explode("|", str_replace(" ","",$token));
if( preg_match('/-NoZone/iu', $token[2]) ){
$token[2] = trim(preg_replace('/-NoZone/i', '', $token[2]));
}
if( eSubstrCount($token[2],".")==0 ) $token[2] .= '.edf';
$token[2] = trim($token[2]);
if( $token[2][0]=="-" ) $token[2] = trim(mb_substr($token[2],1));
$dimScript[] = $token[2];
}
}
$n=$i;
}else{
$token = explode("|", str_replace(" ","",$token));
if( preg_match('/-NoZone/iu', $token[2]) ){
$token[2] = trim(preg_replace('/-NoZone/i', '', $token[2]));
}
if( eSubstrCount($token[2],".")==0 ) $token[2] .= '.edf';
$token[2] = trim($token[2]);
if( $token[2][0]=="-" ) $token[2] = trim(mb_substr($token[2],1));
$dimScript[] = $token[2];
}
}else if( eSubstrCount(mb_strtoupper($dim[$n]), "[LOADINI]")>0 ){
list($dim[$n]) = explode(REM,$dim[$n]);
list(,$token) = explode("]",$dim[$n]);
$tmp = explode(",",str_replace(" ","",$token));
for($i=0; $i<count($tmp); $i++){
if( !in_array($tmp[$i], $dimScript) ){
if( mb_substr($tmp[$i],-5)!=".test" ){
$dimScript[] = $tmp[$i];
}
}
}
}
}
}
$GLOBALS["__scriptUser"] = $scriptUser;
if( file_exists($script.".test") ) $dimScript[] = $script.".test";
return $dimScript;
}
?>
</td></tr>
</table>
<script type="text/javascript" charset="UTF-8">
document.body.focus();
var _HelpPHP = {
<?PHP
$files = array(DIREDES."h/help_php.txt", "../../lib/edesweb/help_php.txt");
for($i=0; $i<2; $i++){
if( file_exists($files[$i]) ){
$help = file($files[$i]);
for($n=0; $n<count($help); $n++){
$linea = trim($help[$n]);
if( $linea<>"" && $linea[0]<>"#" ){
list($cmd, $linea) = explode("(", $linea);
echo "'".mb_strtolower(trim($cmd))."':'".$cmd."(".$linea."',\n";
}
}
}
}
?>
"":""
};
var _HelpJS = {
<?PHP
$files = array(DIREDES."h/help_js.txt", "../../lib/edesweb/help_js.txt");
for($i=0; $i<2; $i++){
if( file_exists($files[$i]) ){
$help = file($files[$i]);
for($n=0; $n<count($help); $n++){
$linea = trim($help[$n]);
if( $linea<>"" && $linea[0]<>"#" ){
eExplodeOne($linea, "(", $cmd, $linea);
if( eSubstrCount($cmd, ".")>0 ){
list(,$cmd) = explode(".", $cmd);
}
echo "'".mb_strtolower(trim($cmd))."':'".$cmd.'('.str_replace("'","&#39;",$linea)."',\n";
}
}
}
}
?>
"":""
};
var _HelpEDESLABEL = {
<?PHP
$files = array(DIREDES."h/help_edes_label.txt", "../../lib/edesweb/help_edes_label.txt");
for($i=0; $i<2; $i++){
if( file_exists($files[$i]) ){
$help = file($files[$i]);
for($n=0; $n<count($help); $n++){
$linea = trim($help[$n]);
if( $linea<>"" && $linea[0]<>"#" ){
list($linea, $desc) = explode("~", $linea);
eExplodeOne($linea, "]", $cmd, $linea);
echo "'".mb_strtolower(mb_substr($cmd,1))."':'".$cmd.']'.str_replace("'","&#39;",$linea)."',\n";
}
}
}
}
?>
"":""
};
var _HelpEDESPHP = {
<?PHP
$files = array(DIREDES."h/help_edes_e.txt", "../../lib/edesweb/help_edes_e.txt");
for($i=0; $i<2; $i++){
if( file_exists($files[$i]) ){
$help = file($files[$i]);
for($n=0; $n<count($help); $n++){
$linea = trim($help[$n]);
if( $linea<>"" && $linea[0]<>"#" ){
list($linea, $desc) = explode("~", $linea);
eExplodeOne($linea, "(", $cmd, $linea);
if( eSubstrCount($cmd, ".")>0 ){
list(,$cmd) = explode(".", $cmd);
}
echo "'".mb_strtolower(trim($cmd))."':'".$cmd.'('.str_replace("'","&#39;",$linea)."',\n";
}
}
}
}
?>
"":""
};
var _HelpEDESJS = {
<?PHP
$files = array(DIREDES."h/help_edes_js.txt", "../../lib/edesweb/help_edes_js.txt");
for($i=0; $i<2; $i++){
if( file_exists($files[$i]) ){
$help = file($files[$i]);
for($n=0; $n<count($help); $n++){
$linea = trim($help[$n]);
if( $linea<>"" && $linea[0]<>"#" ){
list($linea, $desc) = explode("~", $linea);
eExplodeOne($linea, "(", $cmd, $linea);
if( trim($cmd)==".HTML" || trim($cmd)==".TEXT" ){
echo "'".trim($cmd)."':'".$cmd.'('.str_replace("'","&#39;",$linea)."',\n";
}else{
echo "'".mb_strtolower(trim($cmd))."':'".$cmd.'('.str_replace("'","&#39;",$linea)."',\n";
}
}
}
}
}
?>
"":""
};
var _HelpLast = ["",""];
function gsEdit(win){
top.opener.gsEdit(win);
}
function EnQueLenguaje(nLinea){
var dim = _Editor.doc.getValue().split("\n"), leng="", n;
for(n=nLinea; n>=0; n--){
if( S.trim(dim[n])[0]=="[" ){
leng = S.mid(S.trim(dim[n]),1,3).toUpperCase();
if( leng=="PHP" ){
leng = "PHP";
}else{
leng = S.left(leng,2);
if( leng=="JS" ){
}else if( leng=="DB" ){
leng = "PHP";
}else{
leng = "";
}
}
break;
}
}
return leng;
}
function EsF1SQL(o){
if( S.eventCode(event)==112 && (event.ctrlKey || event.altKey) ){
var dim = S(o).val().split(S.char(10)), n,t=0, txt,
pos = S.posCursor(o), p=-1;
for(n=0; n<dim.length; n++){
t += dim[n].length;
if( t>pos[0] ){
p = n;
break;
}
}
if( p>-1 ){
txt = S.trim(dim[p]);
txt = S.trim(S.mid(txt, " ", 0));
txt = S.trim(S.mid(txt, " ", 0));
dim[p] = S.replace(dim[p], txt, S.char(10)+S.char(10));
txt = sqlFormat(txt, "\t");
var dim2 = (txt.split(S.char(10)));
for(n=0; n<dim2.length; n++){
dim2[n] = S.repeat(" ",15)+dim2[n]+S.char(10);
}
dim[p] += dim2.join("");
S(o).val( dim.join(S.char(10)) );
}
return S.eventClear(event);
}
}
function getLabel(txt, withInclude){
var x = S.trim(txt), eti="";
if( x[0]=="#" || x[0]=="¿" ){
if( withInclude && S.left(x,9)=="#include(" ){
return "#include";
}
if( (x.substr(0,2)=="#(" || x.substr(0,3)=="#!(") && x.indexOf(")")>-1 && S.trim(S.mid(x, x.indexOf(")")+1, 0))[0]=="[" ){
eti = S.mid(x,"[","]");
}else if( x[0]=="¿" && x.indexOf("?")>-1 && S.trim(S.mid(x, x.indexOf("?")+1, 0))[0]=="[" ){
eti = S.mid(x,"[","]");
}
}else if( x[0]=="[" && x.indexOf("]")>-1 && /^[\[\]A-Za-z]{1,20}$/.test(S.mid(x,"[","]")) ){
eti = S.mid(x,"[","]");
}
return (/^[\[\]A-Za-z]{1,20}$/.test(eti) && eti!="")? eti : "";
}
function CalculaPalabraClave(){
function getTabla(){
var dim = _Editor.doc.getValue().split("\n"), tabla="", n;
for(n=0; n<dim.length; n++){
if( dim[n].toUpperCase().indexOf("[DBTABLE]")>-1 ){
tabla = dim[n].split("]")[1];
tabla = (tabla+"/").split("/")[0];
break;
}
}
return S.trim(tabla);
}
function getLabelParent(line){
var dim = _Editor.doc.getValue().split("\n"), parent="", n;
for(n=line; n>0; n--){
if( /^\[/.test(dim[n]) && /\]/.test(dim[n]) ){
return S.upper(S.mid(dim[n], "[", "]"));
}
}
return "";
}
S.info("Procesando...");
var cm = _Editor,
gc = cm.getCursor(),
l = gc["line"],
c = gc["ch"],
line = S.trim(cm.doc.getLine(l)),
xy = cm.cursorCoords(),
sel = cm.doc.getSelection().toLowerCase(),
h = cm.defaultTextHeight(),
w = cm.defaultCharWidth(),
parent = getLabelParent(l),
t = String.fromCharCode(9), n,i,p,s,st, token="", ch="", ok, leng="";
if( parent!="FIELDS" && parent!="SUBLIST" ){
if( c==0 ){
line = S.trim(line);
if( S.mid(line,c,1)=="[" ){
c = line.indexOf("]")+1;
}else if( /\(/.test(line) ){
c = line.indexOf("(")+1;
}else if( parent!="FIELDS" ){
return "";
}
}
if( /^#include\(/.test(line) ){
S.callSrv("edes.php?E:$t/ed.gs&LISTDIR=1", window);
return;
}
if( sel!="" ){
sel = "";
c++;
}
c--;
line = cm.doc.getLine(l);
if( c>0 && (S.mid(line,c,1)=="" || S.mid(line,c,1)=="\t" || S.mid(line,c,1)==" ") ) c--;
if( c>0 && (S.mid(line,c,1)=="" || S.mid(line,c,1)=="\t" || S.mid(line,c,1)==" ") ) c--;
if( /\(|\]/.test(S.mid(line,c,1)) ){
token = S.mid(line,c--,1);
}else{
if( line=="[" ){
S.window("edes.php?Ll:$a/d/help_edes_label.edf", {title:"Seleccionar Etiqueta", modal:true});
return "";
}
if( S.mid(line,0,1)=="[" ){
c = line.indexOf("]")-1;
token = "]";
}else if( S.mid(line,0,1)=="¿" ){
c = line.indexOf("?");
c = line.indexOf("]", c)-1;
token = "]";
}
}
for(n=c; n>=0; n--){
ch = S.mid(line,n,1);
if( /\+|\-|\:|\=|\%|\,|\;|\"|\'|\<|\>|\\|\s|\t|\{|\}|\]|\¡|\!|\(|\)/.test(ch) ) break;
if( ch=="." ){
ok = true;
if( n>0 ){
if( S.mid(line,n-1,1)!="S" ){
if( S.mid(line,n-1,1)==")" ){
p = 0;
s = false;
for(i=n-1; i>=0; i--){
switch(S.mid(line,i,1)){
case "(":
if( !s ) p++;
break;
case ")":
if( !s ) p--;
break;
case "'":
if( !s ){
st = "'";
s = true
}else if( st=="'" ) s = false;
break;
case '"':
if( !s ){
st = '"';
s = true
}else if( st=='"' ) s = false;
break;
case "S":
if( !s && p==0 ){
token = "."+token;
}
break;
}
}
}
ok = false;
}
}
if( !ok ) break;
}
token = ch+token;
if( ch=="[" ) break;
}
if( token=="S" || token=="S." ){
S.window("edes.php?Ll:$a/d/help_edes_js.edf", {title:"Seleccionar Función", modal:true});
return "";
}else if( token=="e" ){
S.window("edes.php?Ll:$a/d/help_edes_e.edf", {title:"Seleccionar Función", modal:true});
return "";
}
if( ch=="<" ){
token = S.lower(token);
_HelpLast = ["HTML",token];
AyudaLabel(token);
return "";
}
if( S.mid(token,-1)=="]" ){
var tabla = getTabla();
if( window["_HelpEDESLABEL"][S.lower(S.mid(token,"[","]"))]!=undefined ){
token = S.lower(S.mid(token,"[","]"));
xy["top"] += h;
xy["left"] -= w*sel.length;
_HelpLast = ["EDESLABEL",token];
var tip = S.info(window["_HelpEDESLABEL"][token]+'<i class="ICONWINDOW" style="margin-left:12px" onclick=AyudaLabel("'+token+'")>?</i>').css("left:"+xy["left"]+";top:"+xy["top"]),
scr = S.screen(window);
if( xy["top"]+tip.obj.offsetHeight>scr.h ){
tip.css("top", xy["top"]-h-tip.obj.offsetHeight);
}
if( xy["left"]+tip.obj.offsetWidth>scr.w ){
tip.css("left:0");
}
}else{
if( window["_HelpEDESLABEL"]["["+S.lower(S.mid(token,"[","]"))]!=undefined ){
_HelpLast = ["EDESLABEL",token];
line = S.replace(S.trim(line), "\\","{#92#}", "¿", "{#191#}", "?", "{#63#}");
getAssistan(token, tabla, line, l);
}else{
S.error('La etiqueta no existe');
return;
}
}
}else if( S.mid(token,-1)=="(" ){
token = S.mid(token,0,-1);
if( token[0]=="." || S.left(token,2)=="S." ){
leng = "EDESJS";
if( window["_Help"+leng][S.lower(token)]==undefined ){
if( token[0]=="." && S.mid(line,n-1,1)==")" && S.is("S(",line) ){
S.error('El metodo no existe');
return;
}
var stoken = token;
if( stoken[0]=="." ) stoken = S.mid(stoken,1,0);
if( window["_Help"+leng][S.lower(stoken)]==undefined ){
token = stoken;
if( S.left(token,2)=="S." ){
if( window["_Help"+leng][S.left(token,1,0)]==undefined ){
S.error('El metodo no existe');
}else{
S.error('Este metodo pertenece a "S(..)." y no a "S."');
}
return;
}
leng = "PHP";
}
}
}else if( token[0]=="e" && S.mid(token,1,1)==S.upper(S.mid(token,1,1)) ){
leng = "EDESPHP";
}else{
leng = EnQueLenguaje(l);
}
if( !/^(\.TEXT|\.HTML)$/.test(token) ){
token = S.lower(token);
}
if( S.left(token,2)=="s." && window["_Help"+leng][S.left(token,1,0)]!=undefined ){
token = S.left(token,1,0);
}
if( leng!="" && window["_Help"+leng][token]!=undefined ){
xy["top"] += h;
xy["left"] -= w*sel.length;
_HelpLast = [leng,token];
S.info(window["_Help"+leng][token]+'<i class="ICONWINDOW" style="margin-left:12px" onclick=AyudaLabel("'+token+'")>?</i>').css("left:"+xy["left"]+";top:"+xy["top"]);
var tip = S("#TIP",window),
scr = S.screen(window);
if( xy["top"]+tip.obj.offsetHeight>scr.h ){
tip.css("top", xy["top"]-h-tip.obj.offsetHeight);
}
if( xy["left"]+tip.obj.offsetWidth>scr.w ){
tip.css("left:0");
}
}else if( _HelpInLine[leng] && _HelpInLine[leng][0]!="" ){
token = S.lower(token);
if( token[0]=="." ) token = S.mid(token,1,0);
_HelpLast = [leng,token];
AyudaLabel(token);
return "";
}
}
}else{
_HelpLast = ["EDESLABEL","[Field]"];
var tabla = getTabla();
line = S.replace(S.trim(line), "\\","{#92#}", "¿", "{#191#}", "?", "{#63#}");
if( /^\[Fields\]/.test(line) ){
getAssistan("[Fields]", tabla, line, l);
}else if( line[0]=="-" || ((line[0]=="#" || line[0]=="¿" ) && S.right(S.trim(line.split("|")[0]),1)=="-") ){
getAssistan("[Line]", tabla, line, l);
}else if( line=="?Â¿" || line=="?" || (line[0]=="#" && S.right(line,1)=="¿") || (line[0]=="¿" && S.right(line,1)=="¿") ){
S.info("Linea no editable", 3);
}else if( line[0]=="{" ){
S.infoHide(window);
if( parent=="FIELDS" ){
var dim = [
["-SubEtiquetas"],
["{F}","","","{F} Filename"],
["{H}","","","{H} Filename [ | NoTD ]"],
["{I}","","","{I} CódigoHTML"],
["{J}","","","{J} Filename"],
["{P}","","","{P} Filename [ | NoTD ]"],
["-"],
["{Z}","","","{Z} (fin de campos visibles en todas las solapas)"],
["-"],
["{iSubist}","","","SubLista en un IFrame"],
["-"],
["{Columns}","","","{Columns} { NºColumnas [ | Propiedades [ | Title [ | CódigoEnLinea ] ] ]"],
["{FC}","","","{FC}{ [ ParametroOpcional ]"],
["{FR}","","","{FR}{ [ParametroOpcional]"],
["{FS}","","","{FS}{ Title [ | Style ]"],
["{TAB}","","","{TAB} {Tab} Caption [ | Action/color | Icon | Show | Title ]"]
];
}else if( parent=="SUBLIST" ){
var dim = [
["-SubEtiquetas"],
["slAlign","","","\t{slAlign}"],
["slCSS","","","\t{slCSS}"],
["slColsOp","","","\t{slColsOp}"],
["slColsWidth","","","\t{slColsWidth}"],
["slFormat","","","\t{slFormat}"],
["slFunction","","","\t{slFunction}"],
["slGreenBar","","","\t{slGreenBar}"],
["slGroupLabels","","","\t{slGroupLabels}"],
["slIcon","","","\t{slIcon}"],
["slJSCheck","","","\t{slJSCheck}"],
["slMenu","","","\t{slMenu}"],
["slOnClick","","","\t{slOnClick}"],
["slSequence","","","\t{slSequence}"],
["slSort","","","\t{slSort}"],
["slSql","","","\t{slSql}"],
["slSubMenu","","","\t{slSubMenu}"],
["slTH","","","\t{slTH}"],
["slTipIcon","","","\t{slTipIcon}"],
["slTipTH","","","\t{slTipTH}"],
["slTypeData","","","\t{slTypeData}"],
["slUnique","","","\t{slUnique}"],
["slWin","","","\t{slWin}"]
];
}
S("body").menu(dim, {function:function(op, script, trigger, tr){
var nLinea = cm.getCursor()["line"]*1,
xLinea = cm.doc.getLine(nLinea),
pos = {line: nLinea, ch:1};
cm.setSelection({line: nLinea, ch:0}, {line: nLinea, ch:99});
cm.replaceSelection(tr.title);
}});
}else{
getAssistan("[Field]", tabla, line, l);
}
}
return "";
}
function MostrarMacros(){
var ops = [["-Macros"]], n=0, dim=[], n;
for(pk in _Macro) if( pk!="" ){
if( S.count(" ", pk)==0 ){
if( S.left(pk,2)=="::" ){
dim[n++] = "-"+S.mid(pk,2,0);
}else{
dim[n++] = pk;
}
}
}
for(n=0; n<dim.length; n++){
if( !S.is("##", dim[n]) ){
ops.push([dim[n].split("/")[0],"",dim[n]]);
}
}
S("body").tree(ops, {zIndex:4, expanded:true, modal:true, function:function(pk,tr,para){
if( _Macro[pk]==undefined ) pk=S.upper(pk);
if( _Macro[pk]==undefined ) pk=S.lower(pk);
val = getMacro(pk);
if( val[0]==":" ) val = getMacro(S.left(val,1,0));
var cm = _Editor,
s = S.trim(cm.doc.getSelection()),
dim=[],
nLinea = cm.getCursor()["line"]*1,
line = cm.doc.getLine(nLinea),
c = cm.getCursor()["ch"], tmp, tmp2, n, t=0, rep="", add="", linea, aLinea, txt="", i,nt, lng,
conSel = (val!="");
for(n=0; n<c; n++){
if( line[n]=="\t" ) t++;
else break;
}
tmp = val.split("\n");
val = "";
for(n=0; n<tmp.length; n++){
if( tmp[n]!="" && tmp[n][0]=="#" ) continue;
if( val!="" ) val += S.repeat("\t", t);
val += tmp[n]+"\n";
}
val = S.replace(val, "{R}", "");
val = S.replace(val, "##", "");
for(n=0; n<10; n++) val = S.replace(val, "#"+n, "");
S(this).nodeRemove();
cm.replaceSelection(val);
_Editor.setCursor(nLinea, t);
}});
}
function MostrarTabla(db, token, campo){
edCall("edes.php?E:$t/35.gs<?=eContextAddUrl().eSessionAddUrl()?>", {
DDBB: db,
TABLE: token
}, {
return:function(txt){
if( txt=="NoExist" ){
S.error('La tabla "'+token+'" no existe');
return;
}
var oCampo = campo;
S.info(txt);
var o = S(".INFOTABLE");
if( o.length ){
S("TH", o).on("click", function(ev){
o.attr("e-order", (o.attr("e-order")==null || o.attr("e-order")==1)? 0:1);
S.sort(o.obj, 0, o.attr("e-order")==1);
return S.eventClear(window);
});
S("TH",o).title("Ordenar campos");
var sc = S.screen(window);
if( sc.h<o.css("height") ){
S(o.obj.parentNode).css({overflow:"auto", height:sc.h-24, display:"inline-block"});
}
if( campo!="" ){
S("TD", o).each(function(k,o){
if( S(o).text()==campo ){
o.parentNode.style.color="red";
return false;
}
});
}
}
},
ansi:true
});
}
function func_F6(cm, buscaEsto){
var t = cm.doc.lineCount(),
l = cm.getCursor()["line"],
line = cm.doc.getLine(l),
cw = cm.findWordAt(cm.getCursor()),
token = S.trim(line.substring(cw["anchor"]["ch"], cw["head"]["ch"])),
oToken = token,
tabla = S("#ListLabelFunc").obj, tr, patron,
dim=[], n, tmp, eti,
sel = cm.doc.getSelection();
token = sel||token;
if( buscaEsto!=undefined ) token = buscaEsto;
if( token=="" || !/[0-9a-zA-Z]/.test(token) ) return;
S("#VerLabelFunc").attr({eKey:func_F6, eSeek:token});
if( token[0]=="$" ) token = S.mid(token,1,0);
if( sel!="" && oToken!=sel ){
patron = new RegExp("("+S.replace(token, "$", "\\$")+")+", "g");
}else{
patron = new RegExp("(\\b)("+S.replace(token, "$", "\\$")+")(\\b)+", "g");
}
S("#VerLabelFunc").obj.title = "";
for(n=0; n<t; n++){
line = cm.doc.getLine(n);
eti = getLabel(S.trim(line), false);
if( eti!="" && (S.upper(eti)=="NOTE" || S.upper(eti)=="EXIT") ) break;
if( patron.test(line) ){
var xCampo = line.split("|")[1];
if( S.count("|", line)==9 && patron.test(xCampo) ){
dim.push([n, line.replace(patron, "<span style='color:#3b50e8;font-weight:bold;'>"+token+"</span>")]);
}else{
line = S.replace(line, "<","&#60;", ">","&#62;");
if( eti!="" ){
line = line.replace("["+eti+"]", "<span style='color:#3b50e8;font-weight:bold;'>["+eti+"]</span>");
}
dim.push([n, line.replace(patron, "<b>"+token+"</b>")]);
}
}
}
if( dim.length>0 ){
var	tabla = S("#ListLabelFunc").obj, tr,td;
S("TABLE TD","#VerLabelFunc").dim[0].innerText = "CAMPO/VARIABLE";
while(tabla.rows.length>0) tabla.deleteRow(0);
S("#VerLabelFunc").css("height","auto");
for(n=0; n<dim.length; n++){
tmp = dim[n];
tr = tabla.insertRow();
tr.setAttribute("nl",tmp[0]);
td = tr.insertCell();
td.style.textAlign = "right";
td.style.maxWidth = "400px";
td.style.color = (tmp[0]==l) ? "red" : "#888888";
td.innerHTML = (tmp[0]+1)+": ";
td = tr.insertCell();
td.style.maxWidth = "400px";
td.innerHTML = "<span style='text-overflow:ellipsis; white-space:nowrap; overflow-x:hidden; display:inline-block; max-width:400px'>"+tmp[1]+"</span>";
}
var sc = S.screen(window);
S("#VerLabelFunc").attr("eClose",1);
S("#ANCLAR").class("+OFF");
S('#MARCADOR').none();
S("BODY").around("#VerLabelFunc");
if( sc.h<S("#VerLabelFunc").css("height") ){
S("#VerLabelFunc").css({overflow:"auto", height:sc.h});
}
S(S(tabla).col(1)).each(function(k,o){
if( o.children[0].scrollWidth>o.scrollWidth ) o.title = o.innerText;
});
}
dim = []; l = 0
for(n=0; n<DimScript.length; n++){
if( DimScript[n].length==3 && DimScript[n][0]!=S.upper(DimScript[n][0]) ){
tmp = S(":fuente", "#SCRIPT"+n).val();
t = tmp.match(patron);
t = (t ? t.length : 0);
if( t>0 ) dim.push(t+' '+DimScript[n][0]);
l = t>l ? t:l;
}
}
for(n=0; n<dim.length; n++){
tmp = dim[n].split(" ");
dim[n] = S.padL(tmp[0], (l+"").length, " ")+" "+tmp[1];
}
S("#VerLabelFunc").obj.title = dim.join("\n");
}
function func_F7(cm){
var t = cm.doc.lineCount(),
tabla = S("#ListLabelFunc").obj, tr,
dim=[], n, tmp, color, eti;
S("#VerLabelFunc").attr({eKey:func_F7, eSeek:""});
S("#VerLabelFunc").obj.title = "";
S("TABLE TD","#VerLabelFunc").dim[0].innerText = "ETIQUETAS";
while(tabla.rows.length>0) tabla.deleteRow(0);
for(n=0; n<t; n++){
x = S.trim(cm.doc.getLine(n));
eti = getLabel(x, true);
if( /^(NOTE|EXIT)$/i.test(eti) ) break;
if( eti=="#include" ){
dim.push(eti+"~~"+x.substr(8,38)+"~~"+n+"~~"+eti);
}else if( eti!="" ){
tmp = x.split("]");
dim.push(eti+"~~"+tmp[1].substr(0,30)+"~~"+n+"~~"+eti);
}
}
if( dim.length>0 ){
S("#VerLabelFunc").css("height","auto");
dim.sort();
for(n=0; n<dim.length; n++){
tmp = dim[n].split("~~");
tr = tabla.insertRow();
tr.setAttribute("nl",tmp[2]);
color = ""
switch(S.upper(tmp[3])){
case "DEBUG":
color = "brown";
break;
case "FIELDS":
color = "#3b50e8";
break;
case "NOTE":
color = "#929191";
break;
}
if( color!="" ) color = " style='color:"+color+"'";
tr.insertCell().innerHTML = "<b"+color+">"+tmp[3]+"</b>";
tr.cells[0].style.whiteSpace = "nowrap";
tr.insertCell().innerText = tmp[1];
}
var sc = S.screen(window);
S("#VerLabelFunc").attr("eClose",1);
S("#ANCLAR").class("+OFF");
S('#MARCADOR').none();
S("BODY").around("#VerLabelFunc");
if( sc.h<S("#VerLabelFunc").css("height") ){
S("#VerLabelFunc").css({overflow:"auto", height:sc.h});
}
}else{
S("#MARCADOR").none();
S("#VerLabelFunc").none();
S.info("No hay etiquetas",2);
}
}
function func_F8(cm){
var t = cm.doc.lineCount(),
tabla = S("#ListLabelFunc").obj, tr,
dim=[], n, tmp, label="", eti;
S("#VerLabelFunc").attr({eKey:func_F8, eSeek:""});
S("TABLE TD","#VerLabelFunc").dim[0].innerText = "FUNCIONES";
while(tabla.rows.length>0) tabla.deleteRow(0);
S("#VerLabelFunc").obj.title = "";
for(n=0; n<t; n++){
x = S.trim(cm.doc.getLine(n));
eti = getLabel(x, false);
if( eti!="" ){
tmp = x.substr(1).split("]");
label = x;
if( /^(NOTE|EXIT)$/i.test(eti) ) break;
}
if( x.substr(0,9)=="function " ){
dim.push(S.mid(x," ","(").toUpperCase()+"~~"+S.mid(x,"(","}").substr(1)+"~~"+n+"~~"+S.mid(x," ","(")+"~~"+label);
}
}
if( dim.length>0 ){
S("#VerLabelFunc").css("height","auto");
dim.sort();
for(n=0; n<dim.length; n++){
tmp = dim[n].split("~~");
tr = tabla.insertRow();
tr.setAttribute("nl",tmp[2]);
tr.insertCell().innerHTML = "<b>"+tmp[3]+"</b>";
tr.insertCell().innerText = tmp[1];
tr.insertCell().innerText = tmp[4];
}
var sc = S.screen(window);
S("#VerLabelFunc").attr("eClose",1);
S("#ANCLAR").class("+OFF");
S('#MARCADOR').none();
S("BODY").around("#VerLabelFunc");
if( sc.h<S("#VerLabelFunc").css("height") ){
S("#VerLabelFunc").css({overflow:"auto", height:sc.h});
}
}else{
S("#MARCADOR").none();
S("#VerLabelFunc").none();
S.info("No hay funciones de usuario",2);
}
}
var _Editor = null,
_BuscaDefFuncion = null,
_ScriptActual = 0
_EditorPuntero = new Array();
function ColapsarJSIni(){
var txt = document.forms[_ScriptActual].elements["fuente"].value;
var txt = _Editor.doc.getValue();
var l = cm.getCursor()["line"],
c = cm.getCursor()["ch"],
x = S.trim(_Editor.doc.getLine(l)),
eti = getLabel(x, true);
}
function openMermaid(txt, title){
if( S("SPAN.WINDOW").length ){
return;
}
var win = S.window("edes.php?E:$t/mermaid_view.php<?=eSessionAddUrl()?>", {fullscreen:true, title:"Mermaid: "+title, minimize:0});
S(win).callSrvPost("edes.php?E:$t/mermaid_view.php<?=eSessionAddUrl()?>", {"mermaid":txt}, win);
}
function getContentLabel(l, source){;
var dim = source.split("\n"), tmp=[], txt;
for(n=l+1; n<dim.length; n++){
txt = S.trim(dim[n]);
if( txt!="" ){
if( txt[0]=="[" ) break;
tmp.push(txt);
}
}
return tmp;
}
function SetEditor(Obj, topLinea, col){
var tituloTab = Obj.parentNode.elements["script"].value;
_ScriptActual = Obj.parentNode.name.substr(3)*1;
if( _Editor!=null ){
saveConfig(_Editor);
document[_Editor.getTextArea().parentNode.name]["fuente"].value = _Editor.doc.getValue();
_Editor.toTextArea();
}
S(".TABSCRIPT").class("-TABNOW");
S(S("#TABCONTENEDOR").obj.children[0].children[_ScriptActual]).class("+TABNOW");
if( _EditorPuntero[_ScriptActual] ){
_EditorPuntero[_ScriptActual].toTextArea();
_EditorPuntero[_ScriptActual] = null;
}
_Editor = CodeMirror.fromTextArea(Obj, {
mode:"javascript",
theme:_Theme,
lineNumbers:true,
styleActiveLine:true,
indentWithTabs:true,
smartIndent:true,
indentUnit:4,
dragDrop:true,
foldGutter:true,
gutters:["CodeMirror-linenumbers", "CodeMirror-foldgutter", "breakpoints"],
styleSelectedText:true,
matchBrackets:true,
readOnly:(tituloTab=="ERRORES" || tituloTab=="ERROR-HTML" || tituloTab=="ERROR-POST" || S.mid(tituloTab,1)=="$"<?=((SESS::$_D_=="~")?" && false":"")?>),
extraKeys:{
"Shift-Ctrl-P":function(cm){
NextSeekMultiple("previousElementSibling", "Ha llegado al principio");
},
"Shift-Ctrl-N":function(cm){
NextSeekMultiple("nextElementSibling", "Ha llegado al final");
},
"Ctrl-Q": function(cm){
cm.foldCode(cm.getCursor());
},
"F1":function(cm){
var l = cm.getCursor()["line"],
c = cm.getCursor()["ch"]
line = cm.doc.getLine(l),
t = String.fromCharCode(9), n, token="", ch="";
if( line.length==19 && document[_Editor.getTextArea().parentNode.name]["script"].value=="ERRORES" ){
if( /^[0-9\-\:\s]{19}$/.test(line) ){
if( cm.doc.getLine(l+3).substr(0,8)=="	SQL...." ){
S.callSrv("edes.php?E:$t/ed.gs&tab="+DimScript.length+"&LoadSel=ERROR&POST='"+line+"'", window);
}else{
S.callSrv("edes.php?E:$t/ed.gs&tab="+DimScript.length+"&LoadSel=ERROR&CDI='"+line+"'", window);
}
return;
}
}
if( document[_Editor.getTextArea().parentNode.name]["_CdiPost"] ){
S.callSrv("edes.php?E:$t/ed.gs&tab="+DimScript.length+"&LoadSel=ERROR&POST='"+document[_Editor.getTextArea().parentNode.name]["_CdiPost"].value+"'", window);
return;
}
for(n=c; n<line.length; n++){
ch = S.mid(line,n,1);
token += ch;
if( /\s|\t|\(|\]|\}/.test(ch) ) break;
}
if( S.mid(token,-1)!="(" && S.mid(token,-1)!="]" && S.mid(token,-1)!="}" ){
if( S("#TIP").length ){
S.info();
}else if( _HelpLast[0]!="" ){
S.info(window["_Help"+_HelpLast[0]][_HelpLast[1]]);
}
return;
}
for(n=c-1; n>=0; n--){
ch = S.mid(line,n,1);
if( !/\[|\+|\-|\.|\-|\:|\=|\%|\,|\;|\"|\'|\<|\>|\\|\s|\t|\{|\{|\}|\[|\]|\¡|\!|\(|\)/.test(ch) ){
token = ch+token;
}else{
break;
}
}
token = S.trim(S.mid(token,0,-1));
if( token!="" ){
frames["HELPEDES"].VerUnaAyuda(token, ch, (n>0? S.mid(line,n-1,1):""));
frames["HELPEDES"].frameElement.focus();
}
},
"F2":function(cm){
var l = cm.getCursor()["line"],
c = cm.getCursor()["ch"],
line = cm.doc.getLine(l),
t, n, token="", ch="", db="",
cw = cm.findWordAt(cm.getCursor()),
word = S.trim(line.substring(cw["anchor"]["ch"], cw["head"]["ch"]));
if( word=="lng" && S.left(line,9)=="#include(" ){
let NomFile = DimScript[_ScriptActual][0]+".lng";
top.S.window("edes.php?Fa:$a/u/language.edf&_file="+NomFile, {title:"File: "+NomFile, modal:true, width:800, height:"100%"});
return;
}
if( S.upper(S.trim(S.left(line,9)))=="[MERMAID]" || S.upper(S.trim(S.left(line,5)))=="[UML]" ){
var tmp = getContentLabel(l, _Editor.doc.getValue());
if( tmp.length>0 ){
var txt = tmp.join("|");
openMermaid(txt, line.split("]")[1]);
}
return;
}
if( S.upper(S.trim(S.left(line,10)))=="[LANGUAGE]" ){
var dim = getContentLabel(l, _Editor.doc.getValue());
S.call("edes.php?E:$t/ed.gs&EDITLANGUAGE=1", {"language":line+"\n"+dim.join("\n"), "line":l});
return;
}
if( S.count("\n",cm.doc.getSelection())>0 ){
t = S.count("\n",cm.doc.getSelection());
var odim = [],
dim = _Editor.doc.getValue().split("\n"),
dimSel = cm.doc.getSelection().split("\n"),
esSelect = true, primeraLinea = -1, ultimaLinea, a;
for(c=0; c<dimSel.length; c++) if( S.trim(dimSel[c])!="" && primeraLinea==-1 ){
for(n=l-t; n<l+t; n++){
if( S.trim(dimSel[c])==S.trim(dim[n]) ){
primeraLinea = n;
for(a=c+1; a<dimSel.length; a++) if( S.trim(dimSel[a])!="" ){
ultimaLinea = a;
}
ultimaLinea += primeraLinea;
break;
}
}
}
if( primeraLinea==-1 ) return;
for(c=primeraLinea; c<=ultimaLinea; c++){
ch = cm.doc.getLine(c);
odim.push(ch);
if( S.is("/"+"/",ch) ) ch = S.mid(ch,"","//");
if( c!=ultimaLinea && ( (!/\;$/.test(S.trim(ch)) && !/\;_$/.test(S.nsp(ch))) || !/\,/.test(ch)) ){
esSelect = false;
}else if( c==ultimaLinea && ((/\;$/.test(S.trim(ch)) && /\;_$/.test(S.nsp(ch))) || !/\,/.test(ch)) ){
esSelect = false;
}
}
if( esSelect ){
odim.sort(function(a,b){
if( S.is("/"+"/",a) ) a = S.mid(a,"","//");
if( S.is("/"+"/",b) ) b = S.mid(b,"","//");
a = S.upper(S.trim(S.mid(a,",",";"))); if(a==";") a="";
b = S.upper(S.trim(S.mid(b,",",";"))); if(b==";") b="";
return((a>b)? 1:-1);
});
}else{
odim.sort();
}
for(c=0; c<odim.length; c++) dim[primeraLinea+c] = odim[c];
_CargaEDF(dim.join("\n"));
_Editor.setCursor(primeraLinea, 0);
return;
}
if( /\#include\(/.test(line) ){
line = line.split("#include(")[1];
line = S.trim(line.split(")")[1]);
line = S.trim((line+"/"+"/").split("/"+"/")[0]);
line = (line+" ").split(" ")[0];
if( line!="" ){
S.callSrv("edes.php?E:$t/ed.gs&VERINCLUDE="+line, window);
}
return;
}
for(n=c; n<line.length; n++){
ch = S.mid(line,n,1);
if( /\"|\'/.test(ch) ) break;
token += ch;
if( /\s|\t|\n|\"|\'/.test(ch) ) break;
}
for(n=c-1; n>=0; n--){
ch = S.mid(line,n,1);
if( !/\[|\]|\+|\-|\.|\-|\:|\=|\%|\,|\;|\"|\'|\<|\>|\\|\s|\t|\{|\}|\[|\]|\¡|\!|\(|\)/.test(ch) ){
token = ch+token;
}else break;
}
token = S.trim(token);
if( token!="" ){
if( token[0]=="#" ){
if( S.left(token,-1)==";" ) token = S.left(token,0,-1);
S.info("Color <span style='margin-left:10px; width:100px; border:1px solid "+top.eColorContrastBW(token)+"; background-color:"+token+"; display:inline-block;'>&nbsp;</span>");
return;
}
t = cm.doc.lineCount();
for(n=0; n<t; n++){
line = cm.doc.getLine(n);
if( S.upper(line).indexOf("[DB]")==0 ){
db = line.split("/");
db = db[0].split("]");
db = S.trim(db[1]);
break;
}
}
token = S.trim(S.replace(S.mid(token+" ",0,","),"|",""));
if( token!="" && !/DBTable/i.test(token) ) MostrarTabla(db, token);
}
},
"Ctrl-F2":function(cm){
var t = cm.doc.lineCount(), tabla="", db="", n,x,tmp,
l = cm.getCursor()["line"],
line = cm.doc.getLine(l),
cw = cm.findWordAt(cm.getCursor()),
token = S.trim(line.substring(cw["anchor"]["ch"], cw["head"]["ch"])),
sel = cm.doc.getSelection();
token = sel||token;
for(n=0; n<t; n++){
x = S.trim(cm.doc.getLine(n));
if( x[0]=="[" && x.indexOf("]")>-1 && /^[\[\]A-Za-z]{1,20}$/.test(S.mid(x,"[","]")) ){
tmp = x.substr(1).split("]");
tmp[0] = S.upper(tmp[0]);
if( tmp[0]=="DBTABLE" && tabla=="" ){
tmp = S.trim(tmp[1]).split(/,|;|\|/);
tabla = S.trim(tmp[0]);
}else if( tmp[0]=="DB" && db=="" ){
tmp = S.trim(tmp[1]).split(/,|;|\|/);
db = S.trim(tmp[0]);
}
}
}
MostrarTabla(db, tabla, token);
},
"Shift-Ctrl-Z":function(cm){
var t = cm.doc.lineCount(),
l = cm.getCursor()["line"],
ch = cm.getCursor()["ch"],
line = cm.doc.getLine(l),
cw = cm.findWordAt(cm.getCursor()),
campo = S.trim(line.substring(cw["anchor"]["ch"], cw["head"]["ch"])),
x = cw["anchor"]["ch"], n,c,i,
ocampo = campo,
sel = cm.doc.getSelection(),
condi="", valor="", comilla, cadenaVacia, newLine="";
campo = sel||campo;
if( campo=="" ) return;
if( x>0 && S.mid(line, x-1, 1)=="." ){
campo = S.mid(line, x-2, 2)+campo;
x-=2;
}
console.log("Campo|"+campo+"|");
for(n=x+campo.length; n<line.length; n++){
c = S.mid(line, n, 1);
if( /^[\=\>\<\!\s]$/.test(c) ){
condi += c;
}else{
break;
}
}
condi = S.trim(condi);
console.log("Condición|"+condi+"|");
if( /^[\'\"]$/.test(c) ){
comilla = c;
valor = c;
for(i=n+1; i<line.length; i++){
c = S.mid(line, i, 1);
valor += c;
if( c==comilla ) break;
}
}
console.log("Valor|"+valor+"|");
cadenaVacia = (valor.length==2 && (valor=="''" || valor=='""'));
newLine = "("+campo+condi+valor;
switch( condi ){
case "!=":
case "<>":
if( cadenaVacia ){
newLine += " and "+campo+" is not null";
}else{
newLine += " or "+campo+" is null";
}
break;
case ">=":
newLine = "***";
break;
case "<=":
newLine = "***";
break;
case "=":
if( cadenaVacia ){
newLine += " or "+campo+" is null";
}else{
S.warning("No necesita cambios");
return;
}
break;
case ">":
newLine = "***";
break;
case "<":
newLine = "***";
break;
default:
}
newLine += ")";
newLine = S.mid(line,0,x)+"|"+newLine+"|"+S.mid(line,i+1,line.length);
cm.doc.replaceRange(newLine, {line:l, ch:0}, {line:l, ch:line.length});
},
"F6":function(cm){
func_F6(cm);
},
"Ctrl-F6":function(cm){
func_F6(cm);
S("#VerLabelFunc #ANCLAR").eventFire("click");
},
"F7":function(cm){
func_F7(cm);
},
"Ctrl-F7":function(cm){
func_F7(cm);
S("#VerLabelFunc #ANCLAR").eventFire("click");
},
"F8":function(cm){
func_F8(cm);
},
"Ctrl-F8":function(cm){
func_F8(cm);
S("#VerLabelFunc #ANCLAR").eventFire("click");
},
"F9":function(cm){
var c=cm.doc.getCursor(),
info = cm.lineInfo(c.line);
if( info.gutterMarkers && info.gutterMarkers["CodeMirror-foldgutter"] && info.gutterMarkers["CodeMirror-foldgutter"].className=="CodeMirror-foldgutter-open CodeMirror-guttermarker-subtle" ){
if( info.gutterMarkers.breakpoints ){
cm.setGutterMarker(c.line, "breakpoints", null);
}else{
cm.setGutterMarker(c.line, "breakpoints", makeMarker());
}
}else{
cm.setGutterMarker(c.line, "breakpoints", info.gutterMarkers ? null : makeMarker());
}
},
"F4":function(cm){
var c=cm.doc.getCursor(),
dll=cm.doc.lineCount(),
i=null, x;
for(x=c.line+1; x<dll; x++){
i=cm.lineInfo(x);
if(i.gutterMarkers && i.gutterMarkers.breakpoints){
cm.setCursor(x);
return;
}
}
for(x=0; x<dll; x++){
i=cm.lineInfo(x);
if(i.gutterMarkers && i.gutterMarkers.breakpoints){
cm.setCursor(x);
return;
}
}
},
"Shift-F4":function(cm){
var c=cm.doc.getCursor();var dll=cm.doc.lineCount();var i=null;
for(var x=c.line-1; x>=0; x--){
i=cm.lineInfo(x);
if(i.gutterMarkers && i.gutterMarkers.breakpoints){
cm.setCursor(x);
return;
}
}
for(var x=dll-1; x>=0; x--){
i=cm.lineInfo(x);
if(i.gutterMarkers && i.gutterMarkers.breakpoints){
cm.setCursor(x);
return;
}
}
},
"F10":function(cm){
AlinearFields(cm);
saveConfig(cm);
Obj.value = _Editor.doc.getValue();
var op = _Editor.getTextArea().parentNode.name.replace("FRM","")*1;
Grabar(op);
},
"Ctrl-S":function(cm){
AlinearFields(cm);
saveConfig(cm);
Obj.value = _Editor.doc.getValue();
var op = _Editor.getTextArea().parentNode.name.replace("FRM","")*1;
Grabar(op, null, true);
},
"Cmd-S":function(cm){
AlinearFields(cm);
saveConfig(cm);
Obj.value = _Editor.doc.getValue();
var op = _Editor.getTextArea().parentNode.name.replace("FRM","")*1;
Grabar(op, null, true);
},
"Shift-F10":function(cm){
AlinearFields(cm);
saveConfig(cm);
Obj.value = _Editor.doc.getValue();
var op = _Editor.getTextArea().parentNode.name.replace("FRM","")*1;
Grabar(op, null, true);
window.open("", "Main");
window.opener.S.windowFocus().location.reload();
},
"Alt-T":function(cm){
cm.scrollTo(0, cm.defaultTextHeight()*cm.getCursor()["line"]);
},
"F3":function(cm){
cm.execCommand("findNext");
},
"Ctrl-F3":function(cm){
cm.execCommand("findPrev");
},
"Ctrl-O":function(cm){
var script = _Editor.getTextArea().parentNode.elements["script"].value;
if( !/^(SQL|HTM|PHP)/i.test(script) ){
S.callSrv("edes.php?E:$t/ed.gs&OWNER="+script, window);
}
},
"Ctrl-A":function(cm){
AlinearFields(cm);
},
"Shift-Ctrl-Left":function(cm){
var op = _Editor.getTextArea().parentNode.name.replace("FRM","")*1-1, i;
for(i=op; i>=0; i--){
if( DimScript[i][5]!='display:none' ){
verElScript(i);
break;
}
}
},
"Shift-Ctrl-Right":function(cm){
var op = _Editor.getTextArea().parentNode.name.replace("FRM","")*1+1, i;
for(i=op; i<DimScript.length; i++){
if( DimScript[i][5]!='display:none' ){
verElScript(i);
break;
}
}
},
"Shift-Ctrl-1":function(cm){ verScript("0"); },
"Shift-Ctrl-2":function(cm){ verScript("1"); },
"Shift-Ctrl-3":function(cm){ verScript("2"); },
"Shift-Ctrl-4":function(cm){ verScript("3"); },
"Shift-Ctrl-5":function(cm){ verScript("4"); },
"Shift-Ctrl-6":function(cm){ verScript("5"); },
"Shift-Ctrl-7":function(cm){ verScript("6"); },
"Shift-Ctrl-8":function(cm){ verScript("7"); },
"Shift-Ctrl-9":function(cm){ verScript("8"); },
"Ctrl-0":function(cm){
Orden(12);
},
"Ctrl-1":function(cm){ gotoPoint(cm,1); },
"Ctrl-2":function(cm){ gotoPoint(cm,2); },
"Ctrl-3":function(cm){ gotoPoint(cm,3); },
"Ctrl-4":function(cm){ gotoPoint(cm,4); },
"Ctrl-5":function(cm){ gotoPoint(cm,5); },
"Ctrl-J":function(cm){
var l = cm.getCursor()["line"],
c = cm.getCursor()["ch"]
line = cm.doc.getLine(l),
t = String.fromCharCode(9), n, token="", ch="";
for(n=c; n<line.length; n++){
ch = S.mid(line,n,1);
token += ch;
if( /\s|\t|\(/.test(ch) ) break;
}
if( S.mid(token,-1)!="(" ) return;
for(n=c-1; n>=0; n--){
ch = S.mid(line,n,1);
if( !/\+|\-|\.|\-|\:|\=|\%|\,|\;|\"|\'|\<|\>|\\|\s|\t|\{|\}|\[|\]|\¡|\!|\(|\)/.test(ch) ){
token = ch+token;
}else break;
}
BuscaDefFuncion(cm, token);
},
"Ctrl-M":function(cm){
var s = S.trim(cm.doc.getSelection()),
val = getMacro(s), pk, dim=[],
nLinea = cm.getCursor()["line"]*1,
line = cm.doc.getLine(nLinea),
c = cm.getCursor()["ch"], tmp, tmp2, n, t=0, rep="", add="", linea, aLinea, txt="", i,nt, lng,
conSel = (val!="");
t = S.count(" ",S.trim(line));
tmp = S.trim(line).split(" ");
val = getMacro(tmp[0]);
if( tmp[0]=="cdi" || tmp[0]=="date" ){
dim = _Editor.doc.getValue().split("\n");
dim[nLinea] = ((tmp[0]=="date")? S.date("Y-m-d"):S.date("Y-m-d H:m:i"));
_CargaEDF(dim.join("\n"));
_Editor.setCursor(nLinea, nt);
return;
}
if( tmp[0]=="changelog" ){
dim = _Editor.doc.getValue().split("\n");
dim[nLinea] = "- "+S.date("Y-m-d");
dim.push("");
dim.push("");
for(n=dim.length-1; n>nLinea+1; n--) dim[n] = dim[n-2];
dim[nLinea+1] = "\t- Descripción:";
dim[nLinea+2] = "\t- Cámbios....:";
_CargaEDF(dim.join("\n"));
_Editor.setCursor(nLinea, nt);
return;
}
if( S.trim(line)=="" ){
MostrarMacros();
return;
}
if( _MacroLng[tmp[0]]!=undefined ){
lng = S.lower(EnQueLenguaje(nLinea));
if( S.is(lng, _MacroLng[tmp[0]]) ){
val = getMacro(tmp[0]+"/"+lng);
}
if( lng=="" ){
S.info("Contexto no identificado para ejecutar el Macro");
return;
}
}
if( val=="" ) return;
if( val[0]==":" ){
val = getMacro(S.left(val,1,0));
if( val=="" ) return;
}
nt = 0;
for(n=0; n<c; n++){
if( line[n]=="\t" ) nt++;
else break;
}
linea = val.split("\n");
for(n=0; n<linea.length; n++){
aLinea = S.trim(linea[n]);
if( aLinea!="" && aLinea[0]=="#" && S.mid(aLinea,2,1)==":" ){
add = aLinea.split(":");
if( add[0]=="#R" && t==0 ){
t = add[1]*1;
for(i=0; i<t; i++){
if( tmp[i]==undefined ){
tmp[i] = "";
}
}
}else{
i = S.left(add[0],1,0)*1;
if( tmp[i]==undefined ){
tmp[i] = add[1];
}
}
}else{
txt += S.repeat("\t", nt);
txt += linea[n]+"\n"
}
}
tmp2 = txt.split("\n");
val = "";
rep = "";
add = "";
for(n=0; n<tmp2.length; n++){
if( S.mid(S.trim(tmp2[n]),0,3)=="{R}" ){
rep += tmp2[n]+"\n";
if( !S.is("{##}", val) ) val += "{##}";
}else{
val += tmp2[n]+"\n";
}
}
rep = S.replace(rep, "{R}", "");
for(n=1; n<tmp.length; n++){
if( S.is("#"+n, val) ){
val = S.replace(val, "#"+n, tmp[n]);
}else if( !S.is("#"+n, val) ){
add += S.replace(rep, "##", tmp[n]);
}
}
val = S.replace(val, "{##}", add);
dim = _Editor.doc.getValue().split("\n");
dim[nLinea] = val;
_CargaEDF(dim.join("\n"));
_Editor.setCursor(nLinea, nt);
return;
},
"Ctrl-Space":function(cm){
CodeMirror.showHint(cm, CodeMirror.hint.anyword);
},
"Ctrl-E":function(cm){
var s = S.trim(cm.doc.getSelection()), esNew=true;
if( s=="" ){
s = prompt("Name script", "");
if(s!=null) s=S.trim(s);
}
if(s!="" && s!=null){
S(".TABSCRIPT").each(function(k,o){
if(o.offsetWidth>0 ){
if( s==S.trim(o.innerText) ){
esNew = false;
S(o).eventFire("click");
return null;
}
}
});
if( esNew ){
S.callSrv("edes.php?E:$t/ed.gs&tab="+DimScript.length+"&LoadSel="+s, window);
}
}
},
"Ctrl-U":function(cm){
cm.doc.replaceSelection(cm.doc.getSelection().toUpperCase());
},
"Ctrl-L":function(cm){
cm.doc.replaceSelection(cm.doc.getSelection().toLowerCase());
},
"Ctrl-D":function(cm){
var nLinea = cm.getCursor()["line"]*1,
xLinea = cm.doc.getLine(nLinea),
pos = {line: nLinea};
cm.doc.replaceRange(((xLinea.length===0)?"":"\n")+xLinea, pos);
},
"Ctrl-Enter":function(cm){
var editor = _Editor.getTextArea().parentNode.elements["script"].value;
if( editor=="SQL" ){
Grabar(_Editor.getTextArea().parentNode.name.replace("FRM","")*1, cm.getCursor()["line"]);
}else if( !/^(PHP|SQL|HTM|SAVESQL|TRON|TRON_1|ERRORES|ERROR-HTML|ERROR-POST|Seek String|Seek File|Seek Field)$/i.test(editor) ){
CalculaPalabraClave();
return;
}
},
"Ctrl-F1":function(cm){
if( _Editor.getTextArea().parentNode.elements["script"].value=="SQL" ){
var t = cm.doc.lineCount(),
l = cm.getCursor()["line"],
txt = "", n, desde=0, hasta=0, ori="";
if( S.is(";", cm.doc.getLine(l)) ){
txt = cm.doc.getLine(l);
desde = hasta = l;
}else{
for(n=l; n>=0; n--){
if( S.is(";", cm.doc.getLine(n)) ){
desde = n+1;
break;
}
}
for(n=desde; n<t; n++){
txt += cm.doc.getLine(n);
hasta = n;
if( S.is(";", cm.doc.getLine(n)) ){
break;
}
}
}
txt = S.trim(txt);
if( txt!="" ){
l = false
for(n=0; n<t; n++){
if( n<desde || n>hasta ){
ori +=cm.doc.getLine(n)+"\n";
}else if( !l ){
ori += "{_{AQUI}_}\n";
l = true;
}
}
txt = sqlFormat(txt, "\t");
_Editor.doc.setValue(ori.replace("{_{AQUI}_}", txt));
}
}
}
}
});
_Editor.doc.setValue(Obj.value);
_Editor.on('change', function(cm){
var o = cm.getTextArea();
if( o.parentNode.elements["update"].value=="" ){
var tabla = S.toTag(o, "TABLE"),
n = S.mid(tabla.id,6,0);
tabla.rows[0].cells[0].style.color = "#ed143d";
DimScript[n][3] = null;
DimScript[n][4] = null;
DimScript[n][5] = 'color:#ed143d';
DGI("IconoGrabar").style.color = "#ed143d";
S("#TABCONTENEDOR DIV").dim[n].style.color = "#ed143d";
}
document[o.parentNode.name]["update"].value = 'S';
});
_Editor.on('blur', function(cm){
saveConfig(cm);
document[_Editor.getTextArea().parentNode.name]["fuente"].value = _Editor.doc.getValue();
FoldCodeGet();
var oIFrame = S(".cIFrame IFRAME", "#SCRIPT"+_ScriptActual).obj;
if( oIFrame && oIFrame.eWINDOW ){
p =  oIFrame.eWINDOW.document.body.scrollTop;
if( p==0 ) p = S.scrollGet(oIFrame.eWINDOW.document.body).scrollTop;
S(oIFrame).attr("eScrollTop", p);
}
if( _AutoSave ){
var oForm = document.forms[_ScriptActual];
if( oForm && oForm.elements["update"] && oForm.elements["update"].value=='S' ){
var nomScript = oForm["script"].value;
if( !/^(SQL|PHP|HTM|ERRORES|ERROR\-HTML|ERROR\-POST)$/i.test(nomScript) ){
Grabar(_ScriptActual, null, true);
}
}
}
});
_Editor.on("gutterClick", function(cm, n){
if( _AutoSave ){
var oForm = document.forms[_ScriptActual];
if( oForm && oForm.elements["update"] ) oForm.elements["update"].value = 'S';
}
var info = cm.lineInfo(n);
cm.setGutterMarker(n, "breakpoints", info.gutterMarkers ? null : makeMarker());
});
colorear();
function BuscaDefFuncion(cm, token){
var bak = token, n,ch,linea,
t = cm.doc.lineCount(),
token2 = S.trim(S.mid(token,0,-1))+" = function(",
token3 = S.trim(S.mid(token,0,-1))+": function(";
token = "function "+S.trim(S.mid(token,0,-1));
for(n=0; n<t; n++){
ch = cm.doc.getLine(n);
if( ch.indexOf(token+"(")>-1 || ch.indexOf(token+" (")>-1 ){
setTimeout(function(){
cm.setCursor(n, 0);
}, 250);
return;
}
}
if( _Editor.getTextArea().parentNode.name.replace("FRM","")*1>0 ){
linea = document["FRM0"]["fuente"].value;
if( linea.indexOf(token+"(")>-1 || linea.indexOf(token+" (")>-1 || linea.indexOf(token2)>-1 || linea.indexOf(token3)>-1 ){
setTimeout(function(){
_BuscaDefFuncion = bak;
verScript("0");
}, 250);
}
}
}
if( _BuscaDefFuncion!=null ) BuscaDefFuncion(_Editor, _BuscaDefFuncion);
_Editor.focus();
var nomScript = document[_Editor.getTextArea().parentNode.name]["script"].value;
if( nomScript!="SQL" && nomScript!="PHP" && nomScript!="HTM" ){
FormateaEditor();
}else{
FormateaEditor(2);
}
_Editor.focus();
var cng = (document[_Editor.getTextArea().parentNode.name]["status"].value+"||").split("|"),
p = cng[0].split(","), n,x,lin;
if( p.length==4 ){
_Editor.scrollTo(p[0]*1, p[1]*1);
_Editor.setCursor(p[2]*1, p[3]*1);
}
p = cng[1].split(",");
for(n=1; n<p.length; n++){
_Editor.setGutterMarker(p[n]*1, "breakpoints", makeMarker());
}
p = cng[2].split(",");
for(n=0; n<p.length; n++){
lin = p[n]*1-1;
x = S.trim(_Editor.doc.getLine(lin));
if( S.left(x,9)=="function ") _Editor.foldCode({line:lin, ch:0, xRel: -1}, null, "fold");
}
if( Obj.getAttribute("gotoLine")!=null ){
_Editor.setCursor(Obj.getAttribute("gotoLine")*1,0);
Obj.removeAttribute("gotoLine");
}
if( topLinea!=undefined && (topLinea+"").length>0 ){
setTimeout(function(){
if( col ){
_Editor.setCursor(topLinea, col|0);
}else{
_Editor.setCursor(topLinea);
}
_Editor.scrollTo(0, _Editor.defaultTextHeight()*topLinea);
}, 1);
}
_Editor.focus();
_BuscaDefFuncion = null;
_EditorPuntero[_ScriptActual] = _Editor;
setTimeout(function(){
_ColorCursor = S(".CodeMirror-linebackground").css("background-color");
S(window).rule(".CodeMirror-linebackground {background-color:#f3eddc !important;}");
S(window).rule(".CodeMirror-linebackground {background-color:"+_ColorCursor+" !important;}");
}, 500);
}
function AyudaScript(){
S(document.body).tip(
"<b><center>HELP Script</center></B>"+
'<hr>'+
"Ctrl-M: En una linea en blanco sacará la lista de macros para seleccionar<br>"+
"<span style='margin-left:48px'></span>Si hay contenido generará el macro<br>"+
"<span style='margin-left:48px'></span>También se le puede poner parámetros al macro<br>"+
'Ctrl-Enter: Ayuda en linea Etiqueta o Función<br><span style="margin-left:71px">Ejecuta una sentencia SQL</span><br>'+
'Ctrl-S / F10: Ejecuta el script<br>'+
''
);
}
function AyudaSQL(){
S(document.body).tip(
"<b><center>HELP SQL</center></B>"+
'<hr>'+
'- Se pueden encadenar sentencias SQL separadas por "<B>;</B>".<BR>'+
'- Admite los comentarios de línea si empieza por "<B>.</B>" o por "<B>/'+'/</B>".<BR>'+
'- Admite comentarios de multilínea si empieza una línea por "<B>/'+'*</B>" y "<B>*'+'/</B>" en una sola línea.<BR>'+
'- Comentarios de fin de código "<B>[Note]</B>" no teniendo en cuenta nada a partir de esta linea.<BR>'+
'- Lineas de separación con distinto grosor"<B>-</B>", "<B>=</B>" y "<B>#</B>".<br>'+
'- Si ponemos solo el nombre de una tabla ejecutará "select * from NomTabla".<BR>'+
'- Si ponemos solo el nombre de una tabla precedido por un "<B>*</B>" ejecutará "select count(*) from NomTabla".<BR>'+
'- Prefijo "<B>=</B>" delante de una sentencia "select" no añadirá LIMIT/ROWNUM/FIRST para limitar el select.<br>'+
'- "<B>Ctrl-Enter</B>" ejecutará el sql sobre el que está el cursor.<BR>'+
'- "<B>Ctrl-F1</B>" formateará el sql sobre el que está el cursor.<BR>'+
'- Simula la orden "<B>limit</B>" para el controlador Informix<BR>'+
'- Comando "<B>tables</B>" te muestra un listado con todas las tablas, pudiendo ver su estructura si pulsamos en el nombre, también puede ser "tables NomTabla,NomTabla,,"<br>'+
'<span style="margin-left:20px"></span>saldrá un listado con esas tablas únicamente y al pulsar saldrá la estructura, esta estructura se puede desplazar la ventana por la pantalla, minimizar y maximizar<br>'+
'<span style="margin-left:20px"></span>con un doble click y ocultar con el botón derecho, también si se pulsa con el botón derecho saldrá un listado con los 10 primeros registros. Si se pone el parámetro<br>'+
'<span style="margin-left:20px"></span>"-r" mostrará una columna con el número de registros de cada tabla. Admite el símbolo comodín "*" (ej: tables gs_* todas las tablas que empiezan por "gs_")<BR>'+
'- Comando "<B>structure</B>" NomTabla [,NomTabla,NomTabla,,,] te muestra la estructura de esas tablas.<BR>'+
'- Comando "<B>edit structure</B>" NomTabla te permite tener una copia de la estructura de la tabla en el editor SQL para crear otra tabla a partir de esta.<BR>'+
'- "<B>help</B>" / "<B>?</B>" Muestra la ayuda<br>'+
'- "<B>help sql</B>" Muestra la ayuda del gestor de base de datos activo.<br>'+
'- "<B>fields</B>" lista los campos de todas las tablas, también puede llevar como parámetro una lista de campos separados por coma.<br>'+
'- "<B>NoTrace</B>" No mostrará los comandos en pantalla, solo los resultados.<br>'+
'- Se pueden definir <B>variables</B> dentro del código declarando previamente la variable como: "$NomVariable = \"..Valor..\"; y usándola posteriormente con el formato "{$NomVariable}".<BR>'+
'- Memorizar el <B>cursor</B> en una variable: "$row = select * from tabla" y luego se sustituirá donde encuentre "$row[NomCampo]" por su valor<br>'+
'- Comando "<B>copy TablaOrigen TablaDestino</B>" creará la "TablaDestino" vacía iguan que la "TablaOrigen", cambiando en toda la definición la cadena "TablaOrigen" por "TablaDestino".<BR>'+
'- Funciones para la gestión de ficheros sql:<br>'+
'<span style="margin-left:20px"></span><b>"ls:"</b> Lista los script sql personales.<br>'+
'<span style="margin-left:20px"></span><b>"load: [nmScript]"</b> Carga un script sql.<br>'+
'<span style="margin-left:20px"></span><b>"save: [nmScript]"</b> Graba un script sql.<br>'+
'<span style="margin-left:20px"></span><b>"rm:  [nmScript]"</b> Borra un script sql.<br>'+
'- Funciones para la manipulación del contenido de campos de caracteres:<br>'+
'<span style="margin-left:20px"></span><B>eUpper(tabla.campo)</B>: Convierte a mayúsculas.<br>'+
'<span style="margin-left:20px"></span><B>eLower(tabla.campo)</B>: Convierte a minúsculas.<br>'+
'<span style="margin-left:20px"></span><B>eUpperLower(tabla.campo)</B>: Capitaliza la primera letra.<br>'+
'<span style="margin-left:20px"></span><B>eMaxLeng(tabla.campo)</B>: Devuelve la longitud máxima del contenido del campo.<br>'+
'<span style="margin-left:20px"></span><B>eChange(tabla.campo, CadenaOld, CadenaNew)</B>: Sustituye una cadena/carácter en un campo.<BR>'+
'- Funciones para la información del contenido de un campo de caracteres:<br>'+
'<span style="margin-left:20px"></span><B>eChr(tabla.campo)</B>: Devuelve una cadena con todos los carácteres usados en el campo.<br>'+
'- Exportar resultado del select: [<B>CSV</B>/<B>PDF</B>/<B>TXT</B>/<B>XLS</B>/<B>EXCEL</B>/<B>XML</B>]:[sentencia select].<br>'+
'<span style="margin-left:20px"></span>Con DobleClick se copia el html en el portapapeles y con Alt+DobleClik solo se copia el contenido separado por comas.<br>'+
'- Prefijo "<B>BLOB:</B>" activará la visualización de campos de texto largo, por defecto estos tienen un ancho de 400px, si se quiere de otro ancho pondremos "BLOB,[Ancho]: select ..." (sólo MySql).<br>'+
'- Prefijo "<B>SAVESQL:</B>" se grabará la sentencia sql para actualizarlo en el servidor de procesos, el fichero de log se denomina "/_datos/config/sql.log".<br>'+
'- Prefijo "<B>TIME[,NºDeVeces]:</B>" se ejecutará la sentencia "n" veces dandote el tiempo de ejecución.<br>'+
'- Comando "<B>EXESQL</B>" se ejecutará todas las sentencias pendientes grabadas con "SAVESQL:" desde el fichero "/_datos/config/sql.log".<br>'+
'- Comando "<B>DB: [NmFile]</B>" fichero de configuración de la ddbb, ubicado en "/_datos/config". Este comando tiene que estar en la primera linea.<br>'+
'- Comando "<B>FILL gs_campo [NmTabla/'+'*]</B>" Rellena la tabla "gs_campo" para la definición de las extracciones.<br>'+
'- Comando "<B>phpinfo</B>" Muestra el resultado de la función phpinfo(), si está este comando solo mostrará esta información.<br>'+
'- Comando "<B>STATUS</B>" Proporciona información del estado del servidor.<br>'+
'- Comando "<B>EXPLAIN [NmTabla]</B>" Proporciona información sobre las columnas en una tabla.<br>'+
'- Lista de variables "<B>$variable [, $variable, ...]</B>" Si hay una sola linea de variables las mostrará, máximo 5 variables.<br>'+
'- Importar de un fichero csv: <B>import [ficheroCSV] in [tabla]</B>. El fichero tiene que estar en /_tmp/imp/, sin extensión y la 1ª linea con el nombre de los campos.<br>'+
'- Encriptar/Desencriptar password: <B>password:[password]</B>.<br>'+
''
);
}
function AyudaPHP(){
S(document.body).tip(
"<b><center>HELP PHP</center></B>"+
'<hr>'+
'<b>"DB: [scriptDefiniciónDDBB]"</b>, igual que la etiqueta [DB].<br>'+
'<b>"ls:"</b> Lista los script php personales.<br>'+
'<b>"load: [nmScript]"</b> Carga un script php.<br>'+
'<b>"save: [nmScript]"</b> Graba un script php.<br>'+
'<b>"rm:  [nmScript]"</b> Borra un script php.<br>'+
''
);
}
function AyudaHTM(){
S(document.body).tip(
"<b><center>HELP HTM</center></B>"+
'<hr>'+
"Ctrl-M: Macro<br>"+
'Ctrl-Enter: Ayuda en linea Etiqueta o Función<br><span style="margin-left:71px">Ejecuta una sentencia SQL</span><br>'+
'Ctrl-S / F10: Ejecuta el script<br>'+
''
);
}
function AyudaSHELL(){
S(document.body).tip(
"<b><center>HELP SHELL</center></B>"+
'<hr>'+
'- En la linea de Comandos con el cursor arriba y abajo pasaremos por los últimos comandos.<br>'+
'- Al marcar un texto se copiará en la linea de "Comandos".<br>'+
'- El comando "cat" tiene dos parámetros el fichero a visualizar y opcionalmente el nº de carácteres del principio o final (valor negativo) a visualizar.<br>'+
'- Al pulsar en el "Directorio" hará un dir ascendente en el subdirectorio pulsado, si se pulsa con botón derecho será descendente la ordenación.<br>'+
''
);
}
function AyudaDeTeclado(){
if( DimScript.length==0 ) return;
if( S.left(DimScript[_ScriptActual][0],7)=="RESULT:" ){
S(document.body).tip(
"<b><center>Opciones de teclado:</center></b>"
+"<hr>"
+"Cntr+Shift+N: Next<br>"
+"Cntr+Shift+P: Previous"
);
return;
}
S(document.body).tip(
"<b><center>HELP</center></b>"+
'<hr>'+
'Ctrl-F / F3: Start Find<br>'+
'Ctrl-F3: Previous Find<br>'+
'Ctrl-G: Find next<br>'+
'Shift-Ctrl-F: Replace<br>'+
'Shift-Ctrl-G: Find previous<br>'+
'Shift-Ctrl-R: Replace all<br>'+
'<hr>'+
'Alt-G: Jump to line<br>'+
'Alt-T: Screen top<br>'+
"Ctrl-1/5: Goto BreakPoint 1/5<br>"+
"Ctrl-J: Jump definition function<br>"+
"Ctrl-Q: Code Folding On/Off in function<br>"+
'F4: Next BreakPoint<br>'+
'Shift-F4: Previous BreakPoint<br>'+
'<hr>'+
'F9: BreakPoint On/Off<br>'+
'<hr>'+
'F6: Field/Variable list (Ctrl)<br>'+
'F7: Label list (Ctrl)<br>'+
'F8: Function list (Ctrl)<br>'+
'<hr>'+
"Shift-Ctrl-1/9: Goto Script<br>"+
"Shift-Ctrl-Left: Previous Script<br>"+
"Shift-Ctrl-Right: Next Script<br>"+
'<hr>'+
"Ctrl-E: Edit script<br>"+
"Ctrl-L: Lower<br>"+
"Ctrl-M: Macro<br>"+
"Ctrl-Space: Autocomplete<br>"+
"Ctrl-U: Upper<br>"+
'Ctrl-A: Align [Fields] / [SubList]<br>'+
'Ctrl-D: Duplicate current line<br>'+
'Ctrl-X: Delete current line<br>'+
'Ctrl-S / F10: Save / Execute<br>'+
'Shift-F10: Save + Reload option<br>'+
'Ctrl-F1: Format SQL statement<br>'+
'Ctrl-F2: View Structure Main Table<br>'+
'Ctrl-Enter: Ayuda en linea Etiqueta o Función<br><span style="margin-left:70px">Ejecuta una sentencia SQL</span><br>'+
'<hr>'+
'F1: Help Label/Function (off help)<br>'+
'F2: View Structure Table'
+'<br><span style="margin-left:22px">File #include() ...'
+'<br><span style="margin-left:22px">Color #xxxxxx.		'
+'<br><span style="margin-left:22px">Sort selection.'
+'<br><span style="margin-left:22px">View Mermaid/UML'
+'<br><span style="margin-left:22px">Edit [Language]'
+'<br><span style="margin-left:22px">Edit #include(*) <b>lng</b>'
);
}
function getFunction(pVar, xVar){
var func=[], txt="", i, def="";
for(i in pVar){
if( !pVar[i] ) continue;
txt = pVar[i].toString();
if( top.S.left(txt,10)=="function()" || i[0]=="_" ) continue;
def = xVar +i+ "(" +top.S.mid(txt+"", "(", ")")+ ")";
func.push(def);
}
return func;
}
function setFunction(dim1, dim2, inner){
let func = dim1.concat(dim2), i;
func.sort((a, b) => {
var  nameA = a.toLowerCase()
,nameB = b.toLowerCase();
if( nameA < nameB ) return -1;
if( nameA > nameB ) return 1;
return 0;
});
inner = [];
for(i of func){
inner.push(i);
}
return inner;
}
var orig = CodeMirror.hint.anyword,
_Multiline = ",<?= str_replace(array(CHR13,CHR10), array("",","),mb_strtoupper(file_get_contents(DIREDES."t/multiline.ind"))) ?>,",
_Label = "<?= str_replace(array(CHR13,CHR10), array("",","),file_get_contents(DIREDES."t/label.ind")) ?>".split(","),
_LabelTotal = _Label.length;
CodeMirror.hint.anyword = function(cm){
var inner = orig(cm) || {from: cm.getCursor(), to: cm.getCursor(), list: []},
linea = S.trim(cm.doc.getLine(cm.doc.getCursor().line)), n, seek, ok=false;
if(		  linea=="S"  ){
let  func1 = getFunction(top.S, "S.")
,func2 = getFunction(top.S.fn, "S().");
inner.list = setFunction(func1, func2, inner.list);
}else if( linea=="S." ){
let func = getFunction(top.S, "");
inner.list = setFunction(func, [], inner.list);
}else if( linea=="S(" ){
let func = getFunction(top.S.fn, "");
inner.list = setFunction(func, [], inner.list);
}else if( S.left(linea,2)=="S(" && S.right(linea,2)==")." ){
let func = getFunction(top.S.fn, "");
inner.list = setFunction(func, [], inner.list);
}else if( linea[0]=="[" && linea.indexOf("]")==-1 ){
seek = S.upper(S.mid(linea,1,0));
for(n=0; n<_LabelTotal; n++){
if( S.upper(_Label[n]).indexOf(seek)==0 ){
if(!ok) inner.list = [];
ok = true;
inner.list.push(_Label[n]);
}else if(ok) break;
}
}
return inner;
};
window.focus = function(){
var nomScript = document[_Editor.getTextArea().parentNode.name]["script"].value;
if( nomScript!="SQL" && nomScript!="PHP" && nomScript!="HTM" ){
FormateaEditor();
}else{
FormateaEditor(2);
}
}
window.onbeforeunload = function(){
try{
var _gsEditStack = window.opener._gsEditStack, i, total=0;
_gsEditStack["<?= $dim[0] ?>"] = null;
for(i in _gsEditStack) if( _gsEditStack[i]!=null ){
total++;
}
for(i=0; i<_gsEditStack.length; i++) if( _gsEditStack[i]!=null ){
total++;
}
if( total==0 && S(".DEBUGSQL").length ){
window.opener.S.callSrv("edes.php?E:$t/ed.gs&DEBUGSQL=CHANGE", window.opener);
}
}catch(e){}
}
<?PHP
echo "DimScript = [";
if( isset($dim) ){
for($n=0; $n<count($dim); $n++){
if( isset(SESS::$_gsDirAccess) && count(SESS::$_gsDirAccess)>0 ){
$ConAcceso = false;
for($i=0; $i<count(SESS::$_gsDirAccess); $i++){
if( eSubstrCount(eScript($dim[$n]), '/'.SESS::$_gsDirAccess[$i].'/')==1 ){
$ConAcceso = true;
break;
}
}
if( !$ConAcceso ){
continue;
}
}
if( $n>0 ) echo ",";
echo "['{$dim[$n]}', '', '']";
}
}
echo "];";
$NomWin = explode("/", str_replace('\\', '/', $dim[0]));
$NameTitleTab = trim($NomWin[count($NomWin)-1]);
if( empty($NameTitleTab) ){
$NameTitleTab = "eEdit";
}
?>
document.title = "<?= "> {$NameTitleTab}" ?>";
window.name = "<?= $dim[0] ?>";
var  wh = S.windowSize(window)
,_WIDTH = wh["width"]
,_HEIGHT = wh["height"];
setTimeout(function(){
S.callCreate(window);
if( document["FRM0"] && document["FRM0"]["fuente"] ){
SetEditor(document["FRM0"]["fuente"]);
FormateaEditor();
}
document.getElementsByTagName("TABLE")[0].style.width = _WIDTH+"px";
<?PHP
if( $_GET["_LINE"] ) echo "_Editor.setCursor(".$_GET["_LINE"].",0);";
?>
}, 100);
function getMacro(pk){
if(pk=="" || _Macro[pk]==undefined) return "";
pk = S.replace(_Macro[pk], [
["{#}", "\n"],
["&#39;", "'"],
["&#60;", "<"],
["&#62;", ">"]
]);
return pk;
}
<?PHP
$Macro = array();
$MacroLng = array();
$Dim = file(DIREDES.'t/macros.txt');
$pk = "";
for($n=0; $n<count($Dim); $n++){
if( trim($Dim[$n])!="" ){
if( mb_substr($Dim[$n],0,2)=="::" ){
$Macro[$Dim[$n]] = "1";
}else if( $Dim[$n][0]==':' ){
$tmp2 = explode(":", trim(eNsp($Dim[$n])));
$pk = $tmp2[1];
for($i=2; $i<count($tmp2); $i++){
$Macro[$tmp2[$i]] = ":".$pk;
}
if( eSubstrCount($Dim[$n],"/")>0 ){
$tmp2 = explode("/", $pk);
$MacroLng[$tmp2[0]] .= ",".$tmp2[1];
}
}else{
$Macro[$pk] .= $Dim[$n];
}
}
}
echo "var _Macro = {";
foreach($Macro as $k=>$v){
$v = str_replace(
array("\r", "\n" ,   "'"  ,   "<"  ,   ">"  ),
array( "" , "{#}", "&#39;", "&#60;", "&#62;"),
$v
);
$k = trim($k);
if( eSubstrCount($k, " ")>0 ){
$tmp = explode(" ", $k);
if( eSubstrCount($k, "##")>0 ){
$k = $tmp[0]."##";
}else{
$k = $tmp[0].eSubstrCount($k, " ");
}
}
echo "\n'{$k}':'{$v}',";
}
echo "\n'':''};";
echo "var _MacroLng = {";
foreach($MacroLng as $k=>$v){
echo "\n'{$k}':'{$v}',";
}
echo "\n'':''};";
?>
</script>
<iframe frameborder=1px src="edes.php?E:$help_edes.gs<?=eSessionAddUrl()?>" name="HELPEDES" eNORESIZE=true style="z-index:999;position:absolute;left:0px;top:0px;width:100%;height:100%;border-width:1px 0px 0px 0px;border-color:#dddddd;border-style:solid;display:none;"></iframe>
<iframe frameborder=1px src="edes.php?E:/_datos/config/empty_frame.htm" name="TLF2" eNORESIZE=true style="z-index:999;position:absolute;left:0px;top:0px;width:100%;height:100%;border-width:1px 0px 0px 0px;border-color:#dddddd;border-style:solid;display:none;"></iframe>
<script type="text/javascript" charset="UTF-8">
function CalcularExpJS(){
var n, v, exp=new RegExp(S(":ExpresionJS").val());
for(n=1; n<6; n++){
try{
v = S(":JSValor"+n).val();
if( v!="" ){
if( exp.test(v) ){
DGI("JSResul"+n).innerText = "j";
DGI("JSResul"+n).style.color = "green";
}else{
DGI("JSResul"+n).innerText = "i";
DGI("JSResul"+n).style.color = "red";
}
}
}catch(e){
DGI("JSResul"+n).innerText = " ";
}
}
DGI("ExpresionJS").form.submit();
return S.eventClear(window);
}
function CalcularExpPHP(){
S(":ExpresionPHP").val(S(":ExpresionPHP").val().replace(/\\/g,"{#~92~#}"));
for(var n=1; n<6; n++){
DGI("PHPResul"+n).innerText = " ";
S(":PHPValor"+n).val(S(":PHPValor"+n).val().replace(/\\/g,"{#~92~#}"));
}
DGI("ExpresionPHP").form.submit();
S(":ExpresionPHP").val(S(":ExpresionPHP").val().replace(/\{#~92~#\}/g,"\\"));
for(var n=1; n<6; n++){
DGI("PHPResul"+n).innerText = " ";
S(":PHPValor"+n).val(S(":PHPValor"+n).val().replace(/\{#~92~#\}/g,"\\"));
}
return S.eventClear(window);
}
function ResultadosExpPHP(txt){
var dim = txt.split(";"),n,r;
for(n=0; n<dim.length; n++){
if( dim[n]=="" ) continue;
r = dim[n].split("=")[1];
if( r=="j" ){
DGI("PHPResul"+(n+1)).innerText = "j";
DGI("PHPResul"+(n+1)).style.color = "green";
}else if( r=="i" ){
DGI("PHPResul"+(n+1)).innerText = "i";
DGI("PHPResul"+(n+1)).style.color = "red";
}else{
DGI("PHPResul"+(n+1)).innerText = " ";
}
}
}
</script>
<span id="VerExpresionJS" style="display:none;z-index:100;position:absolute;background-color:#e8e4e4;border:1px solid #949292">
<?PHP
$dim = file("../_d_/usr/expjs.".S::$_User);
?>
<table style="padding:2px;width:100%;border-bottom:1px solid #949292">
<tr><td align=center>Calcula expresión regular Javascript</td><td width="1px"><i class="ICONWINDOW" style="color:#000000;" onclick="document.getElementById('VerExpresionJS').style.display='none'">5</i></td></tr>
</table>
<form accept-charset="utf-8" method="post" action="edes.php?E:$t/ed.gs&EXPJS=1" target=TLF2>
<table style="padding:3px 20px 3px 20px;">
<tr><td>Expresión</td><td colspan=2><input type="text" name="ExpresionJS" value="<?=$dim[0]?>" size=80 maxlength=255></td></tr>
<tr><td>Variable</td><td><input type="text" name="JSValor1" value="<?=$dim[1]?>" size=75></td><td> <i id="JSResul1" class="ICONWINDOW" title="Ejecutar" style="color:#000000;"></i></td></tr>
<tr><td>Variable</td><td><input type="text" name="JSValor2" value="<?=$dim[2]?>" size=75></td><td> <i id="JSResul2" class="ICONWINDOW" title="Ejecutar" style="color:#000000;"></i></td></tr>
<tr><td>Variable</td><td><input type="text" name="JSValor3" value="<?=$dim[3]?>" size=75></td><td> <i id="JSResul3" class="ICONWINDOW" title="Ejecutar" style="color:#000000;"></i></td></tr>
<tr><td>Variable</td><td><input type="text" name="JSValor4" value="<?=$dim[4]?>" size=75></td><td> <i id="JSResul4" class="ICONWINDOW" title="Ejecutar" style="color:#000000;"></i></td></tr>
<tr><td>Variable</td><td><input type="text" name="JSValor5" value="<?=$dim[5]?>" size=75></td><td> <i id="JSResul5" class="ICONWINDOW" title="Ejecutar" style="color:#000000;"></i></td></tr>
<tr><td colspan=3 align=center><button onclick="CalcularExpJS()">Calcular</button></td></tr>
</table>
</form>
</span>
<span id="VerExpresionPHP" style="display:none;z-index:100;position:absolute;background-color:#e8e4e4;border:1px solid #949292">
<?PHP
$dim = file("../_d_/usr/expphp.".S::$_User);
?>
<table style="padding:2px;width:100%;border-bottom:1px solid #949292">
<tr><td align=center>Calcula expresión regular PHP</td><td width="1px"><i class="ICONWINDOW" style="color:#000000;" onclick="document.getElementById('VerExpresionPHP').style.display='none'">5</i></td></tr>
</table>
<form accept-charset="utf-8" method="post" action="edes.php?E:$t/ed.gs&EXPPHP=1" target=TLF2>
<table style="padding:3px 20px 3px 20px;">
<tr><td>Expresión</td><td colspan=2><input type="text" name="ExpresionPHP" value="<?=$dim[0]?>" size=80 maxlength=255></td></tr>
<tr><td>Variable</td><td><input type="text" name="PHPValor1" value="<?=$dim[1]?>" size=75></td><td> <i id="PHPResul1" class="ICONWINDOW" title="Ejecutar" style="color:#000000;"></i></td></tr>
<tr><td>Variable</td><td><input type="text" name="PHPValor2" value="<?=$dim[2]?>" size=75></td><td> <i id="PHPResul2" class="ICONWINDOW" title="Ejecutar" style="color:#000000;"></i></td></tr>
<tr><td>Variable</td><td><input type="text" name="PHPValor3" value="<?=$dim[3]?>" size=75></td><td> <i id="PHPResul3" class="ICONWINDOW" title="Ejecutar" style="color:#000000;"></i></td></tr>
<tr><td>Variable</td><td><input type="text" name="PHPValor4" value="<?=$dim[4]?>" size=75></td><td> <i id="PHPResul4" class="ICONWINDOW" title="Ejecutar" style="color:#000000;"></i></td></tr>
<tr><td>Variable</td><td><input type="text" name="PHPValor5" value="<?=$dim[5]?>" size=75></td><td> <i id="PHPResul5" class="ICONWINDOW" title="Ejecutar" style="color:#000000;"></i></td></tr>
<tr><td colspan=3 align=center><button onclick="CalcularExpPHP()">Calcular</button></td></tr>
</table>
</form>
</span>
<span id="VerLabelFunc" eClose=1 style="display:none;z-index:100;position:absolute;background-color:#e8e4e4;border:1px solid #949292">
<table style="padding:2px;width:100%;border-bottom:1px solid #949292">
<tr>
<td align=center>ETIQUETAS</td>
<td width="1px"><i class="ICONWINDOW OFF" style="color:#000000;" onclick="EsquinaTopDch(this, '#ListLabelFunc')" id="ANCLAR">/</i></td>
<td width="1px"><i class="ICONWINDOW" style="color:#000000;" onclick="S('#MARCADOR').none();document.getElementById('VerLabelFunc').style.display='none'; _Editor.focus();">5</i></td>
</tr>
</table>
<table id="ListLabelFunc" style="padding:3px 20px 3px 20px;" onclick="gotoLabel()" oncontextmenu="marcarEntrada()" style="cursor:var(--cPointer)">
</table>
</span>
<i id="MARCADOR">M</i>
</body>
</html>
<?PHP
eEnd();
function CrearDirectorios($BakFile){
global $_DirBase;
$tmp = explode('/', $BakFile);
$sDir = '';
for($n=0; $n<count($tmp)-1; $n++){
$sDir .= $tmp[$n].'/';
if( mb_substr($tmp[$n],-1)==':' ) continue;
if( $tmp[$n]=='' ) continue;
if( eSubstrCount($sDir, $_DirBase)==0 || $sDir==$_DirBase ) continue;
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
function _SpiderOpen($prefijo="edes"){
SESS::$spider = array("prefijo"=>"../_tmp/log/".$prefijo."_".(time()-1548318045)."_", "opcion"=>"S", "pk"=>0);
?>
<script type="text/javascript" charset="UTF-8">
top.S.info("SPIDER OPEN",3);
top.S.captureImage();
top.document.body.focus();
</script>
<?PHP
eEnd();
}
function _SpiderClose(){
$lista = array();
$ficheroDim = "";
$pre = str_replace("../_tmp/log/", "", SESS::$spider['prefijo']);
$long = mb_strlen($pre);
$dir = '../_tmp/log/';
$df = opendir($dir);
while( $file=readdir($df) ){
if( $file!="." && $file!=".." && !is_dir($file) && mb_substr($file,0,$long)==$pre ){
$lista[] = $dir.$file;
if( mb_substr($file,-6)=="_0.dim" ) $ficheroDim = $dir.$file;
if( mb_substr($file,-6)=="_0.sql" ) $ficheroSql = $dir.$file;
}
}
closedir($df);
$cambiar = array();
$dim = file($ficheroDim);
for($n=0; $n<count($dim); $n++){
if( trim($dim[$n])!="" ){
list($old, $new) = explode(">>>", $dim[$n]);
list($file, $ext) = explode(".", mb_substr(trim($old),5));
eExplodeLast(trim($new), "/", $no, $new);
$cambiar[] = array($old, $file, $ext, "/_spider/".$new);
}
}
$filePnt = str_replace("_0.sql", "_0.pnt", $ficheroSql);
$dim = file($ficheroSql);
for($n=0; $n<count($dim); $n++){
if( trim($dim[$n])!="" ){
list($file, $sql) = explode(">>>", $dim[$n]);
$xFile = str_replace("../_tmp/log/", "../d/_spider/", trim($file));
error_log(md5(trim($sql))."=".$xFile."\n", 3, $filePnt);
}
}
for($n=0; $n<count($lista); $n++){
$txt = file_get_contents($lista[$n]);
for($c=0; $c<count($cambiar); $c++){
$buscar = $cambiar[$c][1];
$pos = mb_strpos($txt, $buscar);
if( $pos!==false ){
$buscarTodo = $cambiar[$c][1].".".$cambiar[$c][2];
$post = mb_strpos($txt, $buscarTodo);
if( $post!==false ){
$txt = mb_substr($txt,0,$pos).$cambiar[$c][3].mb_substr($txt,$pos+mb_strlen($buscarTodo));
}else{
$txt = mb_substr($txt,0,$pos).$cambiar[$c][3].mb_substr($txt,$pos+mb_strlen($buscar));
}
}
}
$txt = file_put_contents($lista[$n], $txt, 0666);
}
if( file_exists("../_tmp/log/".SESS::$spider['prefijo'].".png") ){
$lista[] = "../_tmp/log/".SESS::$spider['prefijo'].".png";
}
if( file_exists($filePnt) ){
$lista[] = $filePnt;
}
$File = mb_substr($pre,0,-1).".zip";
$NomFile = "../_tmp/log/{$File}";
eZipFile($NomFile, $lista);
for($n=0; $n<count($lista); $n++){
@unlink($lista[$n]);
}
SESS::$spider = [];
echo '<script type="text/javascript" charset="UTF-8">';
?>
var dim = [["-Terminar SPIDER"],["<a href='edes.php?D:<?=$NomFile?>&FILE=<?=$File?>'>Descargar&nbsp;ZIP</a>","",""]];
top.S(top.document.body).menu(dim, {noMark:true, function:function(op, script, trigger, tr){}});
<?PHP
echo '</script>';
eEnd();
}
function _SpiderDelete(){
$pre = str_replace("../_tmp/log/", "", SESS::$spider['prefijo']);
$long = mb_strlen($pre);
$dir = '../_tmp/log/';
$df = opendir($dir);
while( $file=readdir($df) ){
if( $file!="." && $file!=".." && !is_dir($file) && mb_substr($file,0,$long)==$pre ){
@unlink($dir.$file);
}
}
closedir($df);
SESS::$spider = [];
echo '<script type="text/javascript">top.S.info("SPIDER CLEAR",3);</script>';
eEnd();
}
function chequearPHP($txt){
global $_gotoError;
$exe = eFileGetVar('Background.php');
if( WINDOW_OS ) $exe .= '.exe';
$syntax = eFileGetVar('Background.syntax');
if( $exe=='' ) return 'ok';
if( $syntax!='' ) $syntax = ' '.$syntax;
$oDir = eGetCWD();
chdir('../_tmp/php/');
$res = '';
$dim = explode("\n", $txt);
$t = count($dim);
$t = count($dim);
for($n=0; $n<$t; $n++){
$txt = trim($dim[$n]);
if( $txt[0]=="/" && $txt[1]=="/" ){
$dim[$n] = "";
}else if( mb_substr($txt,0,2)=="/"."*" && mb_substr($txt,-2)=="*"."/" ){
$dim[$n] = "";
}else if( eSubstrCount($txt,"/"."*")==1 ){
$pi = mb_strpos($txt, "/"."*");
if( eSubstrCount($txt, "*"."/")>0 ){
$pf = mb_strpos($txt, "*"."/");
$dim[$n] = trim(mb_substr($txt,0,$pi)."".mb_substr($txt,$pf+2));
$n--;
}else{
$dim[$n] = trim(mb_substr($txt,0,$pi));
for($i=$n+1; $i<$t; $i++){
$txt = trim($dim[$i]);
if( eSubstrCount($txt, "*"."/")>0 ){
$pf = mb_strpos($txt, "*"."/");
$dim[$i] = trim(mb_substr($txt,$pf+2));
$n = $i-1;
break;
}else{
$dim[$i] = "";
}
}
}
}
}
for($n=0; $n<$t; $n++){
$lineaEtiqueta = $n;
$txt = trim($dim[$n]);
if( $txt[0]=='[' ){
$Etiqueta = mb_strtoupper(eMid($txt, '[', ']'));
switch( $Etiqueta ){
case 'EXIT':
case 'NOTE':
$n = $t+9;
break;
case 'FORMAT':
case 'CALLSRV':
case 'PHPSTART':
case 'PHPCHECK':
case 'PHPEND':
case 'PHPFORM':
case 'PHPHEAD':
case 'PHPINI':
case 'DBEND':
case 'DBINI':
case 'DBINSERT':
case 'DBREAD':
case 'DBSELREC':
case 'DBSQL':
case 'P':
if( mb_strtoupper(trim(explode('|', $txt)[3]))=='NOCHECK' ) continue;
$rem = false;
$Comando = $txt;
$php = '<'.'?PHP	/'."/ {$Comando}\ndie('ok');\n";
for($i=$n+1; $i<$t; $i++){
$txt = trim($dim[$i]);
if( mb_substr($txt,0,2)=='/'.'*' ) $rem = true;
if( $rem ){
$php .= "\n";
}else{
if( $txt[0]=="¿" || mb_substr($txt,0,2)=="?Â¿" || $txt=="?" ){
$php .= "\n";
}else if( ($txt[0]=="?" || $txt[0]=="#") && mb_substr($txt,0,2)<>"?".">" ){
}else if( $txt[0]=="[" && !eIs(mb_substr($txt,0,2), ["['",'["']) ){
$n = $i-1;
break;
}else if( $txt[0]<>"." ) $php .= $txt."\n";
}
if( mb_substr($txt,0,2)=="*/" ) $rem = false;
}
$php .= '?'.'>';
$file = "phpcheck_".S::$_User.".php";
$fileRes = "phpres_".S::$_User.".txt";
if( $syntax=="" ) @unlink($fileRes);
file_put_contents($file, $php, 0666);
if( $syntax=='' ){
$ok = trim(exec("{$exe}{$syntax} {$file} > {$fileRes}"));
$ok = trim(file_get_contents($fileRes));
}else{
$ok = trim(exec("{$exe}{$syntax} {$file}"));
}
if( $ok=='' || mb_substr($ok, 0, 16)!='No syntax errors' ){
if( $res<>'' ) $res .= '<br><br>';
$res .= "ERROR indeterminado en: {$Comando}<br>{$ok}";
if( $_gotoError==null ) $_gotoError = $lineaEtiqueta;
}else if( mb_substr($ok, 0, 16)!='No syntax errors' && $ok!='ok' ){
if( $res!='' ) $res .= '<br><br>';
$qi = mb_strpos($ok, $file);
$qi = mb_strrpos(mb_substr($ok, 0, $qi), ' ');
$qf = mb_strpos($ok, ' ', $qi+2);
$xFile = mb_substr($ok, $qi, $qf-$qi-1);
$qf = mb_strpos($ok,' on ', $qi);
if( $qf===false ){
$ok .= ' ';
$qf = mb_strpos($ok, ' ', $qi+1);
$xFile = mb_substr($ok, $qi, $qf-$qi+1);
}else{
$xFile = mb_substr($ok, $qi, $qf-$qi+4);
}
$ok = str_replace($xFile, ' ', $ok);
$qi = mb_strrpos($ok, ' ');
if( $qi!==false ){
$qi++;
$val = (mb_substr($ok,$qi))*1;
if( $val>0 ){
$val -= 2;
if( $_gotoError==null ) $_gotoError = $lineaEtiqueta+$val;
$ok = mb_substr($ok,0,$qi).$val.'/'.($lineaEtiqueta+$val+1);
}
}
$res .= "{$Comando}<br>{$ok}";
if( $_gotoError==null ) $_gotoError = $lineaEtiqueta;
}
break;
}
}
}
chdir($oDir);
if( $res=="" ) return "ok";
return str_replace(["'", '"'], ['&#39;', '&#34;'],  wordwrap($res, 90, "<br>"));
}
function chequearFilePHP($filePHP, $txt){
global $_gotoError;
$exe = eFileGetVar("Background.php");
if( WINDOW_OS ) $exe .= ".exe";
$syntax = eFileGetVar("Background.syntax");
if( $exe=="" ) return "ok";
if( $syntax<>"" ) $syntax = " ".$syntax;
$oDir = eGetCWD();
chdir("../_tmp/php/");
$res = "";
$php = "<"."?PHP	/"."/ {$filePHP}\ndie('ok'); ?>\n".$txt;
$file = "phpcheck_".S::$_User.".php";
$fileRes = "phpres_".S::$_User.".txt";
if( $syntax=="" ) @unlink($fileRes);
file_put_contents($file, $php, 0666);
if( $syntax=="" ){
$ok = trim(exec("{$exe}{$syntax} {$file} > {$fileRes}"));
$ok = trim(file_get_contents($fileRes));
}else{
$ok = trim(exec("{$exe}{$syntax} {$file}"));
}
if( $ok=="" ){
if( $res<>"" ) $res .= "<br><br>";
$res .= "ERROR indeterminado en: {$filePHP}<br>{$ok}";
if( $_gotoError==null ) $_gotoError = $lineaEtiqueta;
}else if( mb_substr($ok,0,16)<>"No syntax errors" && $ok<>"ok" ){
if( $res<>"" ) $res .= "<br><br>";
$qi = mb_strpos($ok, $file);
$qi = mb_strrpos(mb_substr($ok, 0, $qi), " ");
$qf = mb_strpos($ok, " ", $qi+2);
$xFile = mb_substr($ok, $qi, $qf-$qi-1);
$qf = mb_strpos($ok," on ", $qi);
if( $qf===false ){
$ok .= " ";
$qf = mb_strpos($ok," ", $qi+1);
$xFile = mb_substr($ok, $qi, $qf-$qi+1);
}else{
$xFile = mb_substr($ok, $qi, $qf-$qi+4);
}
$ok = str_replace($xFile, " ", $ok);
$qi = mb_strrpos($ok, " ");
if( $qi!==false ){
$qi++;
$val = (mb_substr($ok,$qi))*1;
if( $val>0 ){
$val -= 2;
if( $_gotoError==null ) $_gotoError = $lineaEtiqueta+$val;
$ok = mb_substr($ok,0,$qi).$val.'/'.($lineaEtiqueta+$val+1);
}
}
$res .= "{$filePHP}<br><br>{$ok}";
if( $_gotoError==null ) $_gotoError = $lineaEtiqueta;
}
chdir($oDir);
if( $res=="" ) return "ok";
return str_replace(["'", '"'], ['&#39;', '&#34;'],  wordwrap($res, 90, "<br>"));
}
function eAssistant(){
$linea = trim($_POST["xlinea"]);
$linea = str_replace("{#191#}", "¿", $linea);
$linea = str_replace("{#63#}" , "?", $linea);
$linea = trim(str_replace("{#92#}", "\\", $linea));
list($linea, $rem) = explode(REM, $linea);
if( mb_ord($linea[0])==194 ) $linea = mb_substr($linea,1);
$cmdInterprete = "";
if( $linea[0]=="¿" || $linea[0]=="#" ){
if( $linea[0]=="¿" ){
$cmdInterprete = "Â¿ ".trim(eMid($linea, "¿", "?"))." ?";
$linea = trim(eRight($linea,"?"));
}else if( $linea[0]=="#" ){
$cmdInterprete = "#".trim(eMid($linea, "#", ")")).")";
$linea = trim(eRight($linea,")"));
}
}
$comando = "";
if( $linea[0]=="[" ){
list($comando,$linea) = explode("]", $linea);
$comando .= "]";
$linea = trim($linea);
}
$TotalParametros = count(explode("|", $linea))+1;
if( $_POST["comando"]=="[Line]" ){
$dim = array();
$dim = explode("|", $linea);
for($n=0; $n<count($dim); $n++) $dim[$n] = trim($dim[$n]);
if( mb_substr($dim[0],-1)=="-" ) $dim[0] = trim(mb_substr($dim[0],0,-1));
$para = array();
$para[0] = $dim[0];
$para[1] = $dim[1];
$para[2] = $dim[3];
$dim = $para;
$dim[] = $rem;
}else if( $_POST["comando"]=="[Fields]" ){
list(,$linea) = explode("]", $linea);
$dim = array();
$columnas = "";
for($n=0; $n<mb_strlen($linea); $n++){
if( is_numeric(mb_substr($linea,$n,1)) ){
$columnas = mb_substr($linea,$n,1);
$linea = trim(str_replace($columnas,"",$linea));
break;
}
}
$extras = "";
$ext = explode(",", "CSV,PDF,TXT,XLS,XML,MIX,TRIM,iSubList");
for($n=0; $n<count($ext); $n++){
if( preg_match("/{$ext[$n]}/iu", $linea) ){
if( $extras!="" ) $extras .= " ";
$extras .= $ext[$n];
$linea = trim(preg_replace("/{$ext[$n]}/i", "", $linea));
}
}
$modo = $linea;
$dim[] = $columnas;
$dim[] = $modo;
$dim[] = $extras;
$dim[] = $rem;
$para = $dim;
}else if( $_POST["comando"]=="[Field]" ){
$dim = array();
$para = explode("|", $linea);
for($n=0; $n<count($para); $n++) $para[$n] = trim($para[$n]);
$txt = $para[0];
$dim[] = $cmdInterprete;
if( is_numeric($txt[0]) || $txt[0]=="," || $txt[0]=="+" ){
if( is_numeric($txt[0]) ){
$dim[] = $txt[0];
$txt = trim(mb_substr($txt,1));
}else if( $txt[0]=="," ){
$txt = trim(mb_substr($txt,1));
if( is_numeric($txt[0]) ){
$tmp = ",".explode(" ",$txt)[0];
$dim[] = $tmp;
$txt = trim(mb_substr($txt,mb_strlen($tmp)));
}else{
$dim[] = ",";
}
}else if( $txt[0]=="+" ){
$tmp = explode(" ",$txt)[0];
$dim[] = $tmp;
$txt = trim(mb_substr($txt,mb_strlen($tmp)));
}
}else{
$dim[] = "";
}
$label = explode("\\", $txt);
for($n=0; $n<3; $n++) $dim[] = $label[$n];
for($n=1; $n<5; $n++) $dim[] = $para[$n];
$label = explode("/", $para[5]);
for($n=0; $n<2; $n++) $dim[] = $label[$n];
if( eSubstrCount($para[6], "=")>0 ){
$dim[] = $para[6];
$dim[] = "";
}else{
$xModo = "";
$prest = $para[6];
$tmp = explode(",","-Q-,*Q*,-Q,Q-,*Q,Q*,A,M,Q,-,*");
for($n=0; $n<count($tmp); $n++) if( eSubstrCount($prest,$tmp[$n])>0 ){
$xModo = $tmp[$n];
break;
}
$dim[] = $xModo;
$tmp = explode(",", "A,M,Q,-,*");
for($n=0; $n<count($tmp); $n++) $prest = str_replace($tmp[$n], "", $prest);
$dim[] = $prest;
}
for($n=7; $n<count($para); $n++) $dim[] = $para[$n];
$dim[] = $rem;
$para = $dim;
}else{
$para = explode("|", $cmdInterprete."|".$linea);
if( $_POST["comando"]=="[DBRange]" && $TotalParametros<6 ){
for($n=count($para)-1; $n<=$TotalParametros; $n++){
$para[] = "";
}
$para[5] = "S";
if( $para[6]=="=" ) $para[6] = "S";
if( $rem!="" ) $para[] = $rem;
}
for($n=0; $n<count($para); $n++){
$para[$n] = trim($para[$n]);
}
}
if( $_POST["comando"][0]=="[" ){
$file = "lbl_".mb_strtolower(mb_substr(mb_strtolower($_POST["comando"]),1,-1));
}
$file = DIREDES."h/hlp/{$file}.edf";
$titulo = "";
$fields = "";
$jsload = "";
$jscheck = "";
$Help = "";
$dim = file($file);
for($n=0; $n<count($dim); $n++){
$linea = trim($dim[$n]);
if( $linea=="" || $linea[0]=="." || $linea[0]=="/" ) continue;
$cmd = mb_strtoupper(eMid($linea, "[", "]"));
if( $cmd=="TITLE" ){
list(,$linea) = explode("]", $linea);
$linea = trim($linea);
if( $_POST["comando"][0]=="[" ) $linea = "[".$linea."]";
$titulo = "'{$linea}'";
}else if( $cmd=="NOTE" || $cmd=="EXIT" ){
break;
}else if( $cmd=="DELIMITER" ){
list(,$linea) = explode("]", str_replace('"', "'", $linea));
$tmp = explode("|", $linea);
if( $fields<>"" ) $fields .= ",";
$fields .= '"'."|[DELIMITER]|{$tmp[0]}|{$tmp[1]}".'"';
}else if( $cmd=="FIELDS" ){
$nc = -1;
for($i=$n+1; $i<count($dim); $i++){
$linea = trim($dim[$i]);
if( $linea=="" || $linea[0]=="." || $linea[0]=="/" ) continue;
if( $linea[0]=="[" ){
break;
}
if( $fields<>"" ) $fields .= ",";
$tmp = explode("|", $linea);
if( trim($tmp[0])<>"-" ) $nc++;
$tmp[7] = trim($tmp[7]);
if( trim($tmp[3])=="C" ){
$conv = "";
list($def,$conv) = explode("/", $tmp[7]);
if( $conv<>"" ){
if( eSubstrCount($conv,"=")==1 ){
list($vo, $vd) = explode("=", $conv);
}else{
eExplodeLast($conv, "=", $vo, $vd);
}
$conv = "~".trim($def)."~".trim($conv);
}
if( $tmp[7]<>"" ){
if( $para[$nc]<>"" ){
if( $para[$nc]=="false" ) $tmp[7] = "";
if( $para[$nc]=="true" ) $tmp[7] = "S";
if( $para[$nc]==$vo ) $tmp[7] = $vd;
}else{
$tmp[7] = $def;
if( $vo==$tmp[7] ) $tmp[7] = $vd;
}
}else{
if( $para[$nc]=="true" || $para[$nc]=="S" ) $tmp[7] = "S";
}
$tmp[7] .= $conv;
}else{
if( $para[$nc]<>"" ) $tmp[7] = $para[$nc];
}
$fields .= '"';
for($p=0; $p<count($tmp); $p++){
if( $p==0 ) $tmp[$p] = str_replace('"', CHR92.'"', $tmp[$p]);
if( $p>0 ) $fields .= "|";
if( $p==10 ){
switch( trim($tmp[$p]) ){
case "fields":
if( $_POST["tabla"]<>"" ){
list($tabla) = explode(",", $_POST["tabla"]);
$tabla = trim($tabla);
list($tabla) = explode(" ", $tabla);
$tabla = trim($tabla);
global $_Sql, $_SqlPDOType;
include_once("../_datos/config/sql.ini");
include_once(DIREDES.$_Sql.'.inc');
include(DIREDES."gettable.php");
$DimCampos = array();
getTable($tabla, false, $DimCampos);
$fields .= "-Fields";
for($n=0; $n<count($DimCampos); $n++){
$fields .= ";".$DimCampos[$n][0].",".$DimCampos[$n][0];
}
}
continue;
case "tipoEdicion":
$tree = <<<EOD
-Tipo Edición;
~String;
N,Nombre;
D,Dirección;
0,Números;
X,Alfanumérico en Mayúsculas;
x,Alfanumérico en Minúsculas;
#X,Alfanumérico Mayúsculas/Minúsculas;
#,Alfanumérico con saltos de linea;
#L,Alfanumérico en Minúsculas con saltos de linea;
#U,Alfanumérico en Mayúsculas con saltos de linea;
N,Nombre en Mayúsculas;
n,Nombre en Minúsculas;
#N,Nombre con Mayúsculas/Minúsculas;
D,Dirección en Mayúsculas;
d,Dirección en Minúsculas;
#D,Dirección con Mayúsculas/Minúsculas;
~;
~Date/Time;
F4,Fecha;
CDI,Fecha y Hora (AAAA-MM-DD HH:MM:SS);
H,Hora (según logintud);
P4,Periodo;
~;
~Numeric;
*,Autoincremental;
+,Positivo;
+[,],Positivo con Decimales;
-,Negativo;
-[,],Negativo con Decimales;
~;
~Varios;
T,Teléfono;
f,Fichero en Minúsculas;
F,Fichero en Mayúsculas;
CP,Código Postal;
@,Dirección EMail;
W,Dirección Web;
DNI,DNI;
NIF,NIF (1#/9#);
nif,NIF/DNI;
CIF,CIF Empresa;
cif,CIF (chequeo básico);
CLR,Color hexadecimal Mayúsculas;
clr,Color hexadecimal Minúsculas;
IP,IP;
DC,Dígitos de Control CC;
NSS,Nº Seguridad Social (11#);
TC,Tarjeta de Crédito;
~
EOD;
$tmp2 = explode("\n", $tree);
for($n=0; $n<count($tmp2); $n++) $tmp2[$n] = trim($tmp2[$n]);
$fields .= implode("", $tmp2);
continue;
case "paths":
$fields .= "-Paths";
$odir = eScript(REM);
$pre = REM;
if( is_dir($odir) ){
$p = opendir($odir);
while( $dir=readdir($p) ){
if( is_dir($odir.$dir) ){
if( $dir<>'.' && $dir<>'..' ){
$fields .= ";{$pre}{$dir},{$pre}{$dir}";
}
}
}
closedir($p);
}
continue;
case "modo":
$modo = '-Modos;A,"A" Editable en Alta; M,"M" Editable; Q,"Q" Pregunta; -,"-" Solo lectura; -Q,"-Q" Solo lectura al preguntar; Q-,"Q-" Pregunta oculta; -Q-,"-Q-" Siempre en modo lectura; *,"*" Campo oculto; *Q,"*Q" Campo oculto al preguntar; Q*,"Q*" Pregunta y el resto oculto; *Q*,"*Q*" Siempre oculto';
$fields .= str_replace('"', "&#34;", $modo);
break;
case "prestacion":
$prestacion = ':-Prestación; L,"L" No mostrar en listados; -,-; c,"c" Copy (b/c/m/s); p,"p" Paste (b/c/m/s); -,-; d,"d" Default (a/b/c/m/s/q/l); q,"q" Multiples filtros (c/b/m); k,"k" Paste del ClipBoard; -,-; F,"F" Calendario de Fechas; P,"P" Calendario de Periodos; U,"U" Icono borrar fichero; E,"E" Icono EMail; W,"W" Icono Navegador; S,"S" Numeros y Periodos deslizante; s,"s" Corrector ortográfico; I,"I" Select modificar interior; i,"i" Select ver interior';
$fields .= str_replace('"', "&#34;", $prestacion);
break;
case "typefile":
$fields .= "-Type file;*,*;xls,xlsx,doc,docx,ppt,pptx,pdf,zip,Office;png,jpg,jpeg,gif,tiff,Image";
break;
default:
$fields .= 	str_replace('"', '&#34;', $tmp[$p]);
}
continue;
}
$fields .= trim($tmp[$p]);
}
$fields .= '"';
}
$n = $i-1;
}else if( $cmd=="JSLOAD" ){
for($i=$n+1; $i<count($dim); $i++){
$linea = trim($dim[$i]);
if( eSubstrCount($linea, REM)>0 ){
list($linea) = explode(REM, $linea);
$linea = trim($linea);
}
if( $linea=="" || $linea[0]=="." || $linea[0]=="/" ) continue;
if( $linea[0]=="[" ){
break;
}
$jsload .= $linea;
}
$n = $i-1;
$jsload = str_replace('"', CHR92.'"', $jsload);
}else if( $cmd=="JSCHECK" ){
for($i=$n+1; $i<count($dim); $i++){
$linea = trim($dim[$i]);
if( eSubstrCount($linea, REM)>0 ){
list($linea) = explode(REM, $linea);
$linea = trim($linea);
}
if( $linea=="" || $linea[0]=="." || $linea[0]=="/" ) continue;
if( $linea[0]=="[" ){
break;
}
$jscheck .= $linea;
}
$n = $i-1;
$jscheck = str_replace('"', CHR92.'"', $jscheck);
}else if( $cmd=="HELP" ){
list(,$Help) = explode("]", $linea);
}
}
if( $jscheck=="" ) $jscheck = "return true;";
?>
<script type="text/javascript" charset="UTF-8">
var win = window.frameElement.WOPENER,
dim = [<?=$titulo.','.$fields?>];
top._HelpLast = ["EDESLABEL","<?=$titulo?>"];
top.S.run(win, "function JSLOAD(){<?=$jsload?>}", 'JSLOADScript');
top.S.run(win, "function JSCHECK(){<?=$jscheck?>}", 'JSCHECKScript');
win.Assistant(dim, '<?=$_POST["linea"]?>', '<?=trim($Help)?>');
setTimeout(function(){
top.S.focus(top.S("INPUT", top.S(":FORMHELP")).obj);
}, 100);
</script>
<?PHP
}
function eIsUTF8($file){
if( WINDOW_OS ) return 0;
$uLinea = shell_exec("file -bi {$file}");
if( preg_match('/charset\=/iu', $uLinea) ){
if( preg_match('/utf\-8/iu', $uLinea) ) return 1;
return 0;
}
return -1;
}