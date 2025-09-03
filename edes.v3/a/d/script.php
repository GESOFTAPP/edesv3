<?PHP
_HeaderAdd();
eHTML();
?>
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
.CodeMirror * {
font-family: monospace;
}
</style>
</head>
<body>
<?PHP
list($op, $file, $cdi, $time) = explode(",", $_Script);
list($year, $month, $day) = explode("-", str_replace(" ","-", $cdi));
$timeStamp = mktime(0,0,0, $month*1, $day*1, $year*1);
$script		= eScript($file, $bak);
$scriptBak  = "{$script}.bak";
$scriptDiff = "{$script}.diff";
eExplodeLast($script, '/', $fPath, $NomScript);
eExplodeLast($bak   , '/', $fPathBak);
$fPath     = $script;
$fPathBak .= '/'.$NomScript;
$daily		= "../_bak_/_daily/{$NomScript}.{$time}";
$dailyDiff	= "{$daily}.diff";
$_Backup  = eFileGetVar('../_d_/cfg/edes.ini->$_Backup' );
$_Backup2 = eFileGetVar('../_d_/cfg/edes.ini->$_Backup2');
$_nBackup = eFileGetVar('../_d_/cfg/edes.ini->$_nBackup');
$_nDaily  = eFileGetVar('../_d_/cfg/edes.ini->$_nDaily');
if( eSubstrCount($script, '/edes.v3/')==0 ){
if( !empty($_Backup) ){
if( $_Backup[0]=='/' ) $_Backup = mb_substr($_Backup,1,0);
if( mb_substr($_Backup,-1)=='/' ) $_Backup = mb_substr($_Backup,0,-1);
$_Backup = str_replace('../', "../../{$_Backup}/", $script);
$_BackupDiff = $_Backup.".diff";
}
if( !empty($_Backup2) ){
if( $_Backup2[0]=='/' ) $_Backup2 = mb_substr($_Backup2,1,0);
if( mb_substr($_Backup2,-1)=='/' ) $_Backup2 = mb_substr($_Backup2,0,-1);
$_Backup2 = str_replace('../', "../../{$_Backup2}/", $script);
$_Backup2Diff = $_Backup2.".diff";
}
}else{
$_Backup  = '';
$_Backup2 = '';
}
if( $_nBackup!='' && $_nBackup!='0' ){
if( !is_numeric($_nBackup) ){
$fPathBak = $fPathBak.'.'.date($_nBackup, $timeStamp);
}else if( $_nBackup==-2 ){
$fPathBak = '';
}else if( $_nBackup==-1 ){
$fPathBak = $fPathBak.'.'.date('Ymd', $timeStamp);
}else if( $_nBackup>0 ){
$fPathBak = $fPathBak.'.'.(date('z', $timeStamp) % $_nBackup);
}
$fPathBakDiff = $fPathBak.'.diff';
}
$file = null;
if( $op=="S" ){
if( $file==null && file_exists($daily   ) ) $file = $daily;
if( $file==null && file_exists($fPathBak) ) $file = $fPathBak;
}else{
if( $file==null && file_exists($dailyDiff   ) ) $file = $dailyDiff;
if( $file==null && file_exists($fPathBakDiff) ) $file = $fPathBakDiff;
}
if( $file==null ) die("file not found");
?>
<form accept-charset="utf-8" name="FRMBAK" target="" method="post" action="" style="width:100%;height:100%;display:flex;">
<textarea name="fuente" id="fuente" WRAP="VIRTUAL" style="width:100%;height:100%;margin:0px;padding:5px;white-space:nowrap;font-family:monospace"><?= file_get_contents($file) ?></textarea>
</form>
<script type="text/javascript" charset="UTF-8">
var _ThemeOscuro = "material-ocean",
_ThemeClaro = "",
_Theme = _ThemeClaro,
Obj = document.getElementById("fuente");
_Editor = CodeMirror.fromTextArea(Obj, {
mode:"javascript",
theme:_Theme,
lineNumbers:true,
styleActiveLine:true,
indentWithTabs:true,
smartIndent:true,
indentUnit:4,
dragDrop:!true,
foldGutter:true,
gutters:["CodeMirror-linenumbers", "CodeMirror-foldgutter", "breakpoints"],
styleSelectedText:true,
matchBrackets:true,
readOnly:true
});
_Editor.setSize("100%", "100%");
_Editor.focus();
<?PHP if( $op=="R" ){ ?>
var nScript = top._ScriptActual;
var _WO = window.frameElement.WOPENER;
_WO = top;
_WO._Editor.doc.setValue(document.forms["FRMBAK"]["fuente"].value);
_WO._Editor.refresh();
_WO._Editor.focus();
<?PHP } ?>
</script>
</body></html>