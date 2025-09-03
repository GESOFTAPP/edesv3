<?PHP
if( isset($_GET["PK"]) ){
list($file,$tipo) = explode("~", $_GET["PK"]);
$file = DIREDES.'h/'.mb_strtolower(str_replace(" ","_",$file)).'.htm';
$file = eClearAccent($file);
if( !file_exists($file) ){
if( SESS::$_D_!="" ) echo "[{$file}]";
else echo 'Ayuda no encontrada.';
exit;
}
$file = file_get_contents($file);
$file = str_replace('<!DOCTYPE HTML>', '<!DOCTYPE HTML>', $file);
$ini = '<LINK REL="stylesheet" HREF="edes.php?R:$h/i/';
$fin = '" TYPE="text/css">';
$p1 = mb_strpos($file, $ini);
$p2 = mb_strpos($file, $fin);
$css = mb_substr($file, $p1+mb_strlen($ini), $p2-$p1-mb_strlen($ini));
$sustituir = mb_substr($file, $p1, $p2-$p1+mb_strlen($fin));
$css = DIREDES."h/i/{$css}";
$css = "<style>".file_get_contents($css)."</style>";
$file = str_replace($sustituir, $css, $file);
$file = str_replace('<BODY style=', '<BODY onkeydown=top.CerrarAyuda(event) style=', $file);
die($file);
}
if( isset($_GET["GRABAR"]) && $_GET["GRABAR"]==1 ){
$txt = str_replace("{#~92~#}", CHR92, html_entity_decode($_POST["AYUDAHTML"]));
$file = $_POST["FILE"];
if( eSubstrCount($txt, "")>0 ){
$dim = explode("\n", $txt);
for($n=0; $n<count($dim); $n++){
if( mb_substr($dim[$n],0,4)=="<th " ){
$dim[$n] = str_replace(mb_strtolower(eFileGetVar('/_datos/config/core.css->$pDesktop')), "{background}", $dim[$n]);
$dim[$n] = str_replace(mb_strtolower(eFileGetVar('/_datos/config/core.css->$cDesktop')), "{color}", $dim[$n]);
$txt = implode("\n", $dim);
break;
}
}
}
gsActivity("/_datos/config/".$file);
file_put_contents("../_datos/config/".$file.'.html', $txt);
echo "Grabado...";
eEnd();
}
if( isset($_GET["file"]) ){
if( file_exists('../_datos/config/'.$_GET["file"].SESS::$_LANGUAGE_SUFFIX.'.html') ){
$file = '../_datos/config/'.$_GET["file"].SESS::$_LANGUAGE_SUFFIX.'.html';
$fileHelp = $_GET["file"].SESS::$_LANGUAGE_SUFFIX;
}else if( file_exists('../_datos/config/'.$_GET["file"].'.html') ){
$file = '../_datos/config/'.$_GET["file"].'.html';
$fileHelp = $_GET["file"];
}else if( mb_substr($_GET["file"],-3)[0]=="_" ){
$fileHelp = $_GET["file"];
$file = '../_datos/config/'.$_GET["file"];
copy(mb_substr($file,0,-3).".html", $file.".html");
$file .= ".html";
}
$html = file_get_contents($file);
$ChangeData = false;
if( eSubstrCount($html, "")>0 ){
$ChangeData = true;
$html = str_replace("{background}", eFileGetVar('/_datos/config/core.css->$pDesktop'), $html);
$html = str_replace("{color}", eFileGetVar('/_datos/config/core.css->$cDesktop'), $html);
}
eHTML('$wysiwyg_file.php', '', 'AYUDA');
?>
<STYLE>
body{
margin:0px;
padding:0px;
_visibility:hidden;
}
.ICONWINDOW, .ICONINPUT, I {
font-size:10px !important;
color:#1B6B8D;
}
<?PHP
if( $file!="/_datos/config/key_help.htm" ){
$ini = '<LINK REL="stylesheet" HREF="edes.php?R:$h/i/';
$fin = '" TYPE="text/css">';
$p1 = mb_strpos($html, $ini);
$p2 = mb_strpos($html, $fin);
$css = mb_substr($html, $p1+mb_strlen($ini), $p2-$p1-mb_strlen($ini));
$css = DIREDES."h/i/{$css}";
echo file_get_contents($css);
}
?>
</STYLE>
<SCRIPT>
document.title = "TAB";
var winPadre = top.window.opener;
try{
if( top.window.opener.name ){}
}catch(e){
winPadre = top;
}
winPadre.S.init(window,"all,tab");
setTimeout(function(){
var winFrame = (top.window.opener) ? frames[0] : window;
winFrame.document.body.onkeydown = function(ev){
if( ev.keyCode==115 ){
InsertTab(tinyMCE.editors[0]);
return S.eventClear(window);
}else if( ev.keyCode==121 ){
GrabarAyuda();
}
}
},2000);
</SCRIPT>
<SCRIPT SRC="lib/tinymce/js/tinymce/tinymce.min.js"></SCRIPT>
<?PHP
?>
</HEAD>
<BODY>
<DIV id=TEMPORAL style="display:none"><?=$html?></DIV>
<FORM accept-charset='utf-8' style='margin-bottom:0px;padding-bottom:0px' eType='Directo' AUTOCOMPLETE='off' NAME='FRM1' METHOD='POST'>
<TEXTAREA name="texto" id="texto" COLS=100 ROWS=30 MAXLENGTH=-1 WRAP=VIRTUAL></TEXTAREA>
<INPUT type="hidden" name="nombre" id="nombre" value="<?=$fileHelp?>">
</FORM>
<SCRIPT>
document.forms[0].texto.value = document.getElementById("TEMPORAL").innerHTML;
var _Tiny = tinymce.init({
<?PHP
if( SESS::$_LANGUAGE_!='en' ){
echo "language: '".SESS::$_LANGUAGE_."',";
}
?>
selector: 'textarea#texto',
width: document.body.clientWidth,
height: document.body.clientHeight,
force_br_newlines : true,
force_p_newlines : false,
forced_root_block : '',
help_tabs: ['shortcuts'],
menubar: true,
plugins: [
'advlist autolink lists link image charmap print preview anchor textcolor',
'searchreplace visualblocks code fullscreen',
'insertdatetime media table paste code help wordcount save'
],
toolbar: 'undo redo | formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help | myTab mysave',
setup: (editor) => {
editor.ui.registry.addButton('mysave', {
text: 'Grabar',
tooltip: "<?=$fileHelp?>.html",
onAction: () => GrabarAyuda()
}),
editor.on('keydown', function(event) {
if( event.keyCode==9 ){
if( event.shiftKey) {
editor.execCommand('Outdent');
}else{
editor.execCommand('Indent');
}
event.preventDefault();
return false;
}
});
}
});
function GrabarAyuda(){
if( _WOPENER && _WOPENER._Source ){
if( _WOPENER._Source=="$a/d/help_edes_label.edf" || _WOPENER._Source=="$a/d/help_edes_e.edf" || _WOPENER._Source=="$a/d/help_edes_js.edf" ){
_WOPENER._oTR.style.fontStyle = "italic";
_WOPENER._oTR.style.color = "red";
}
}
tinyMCE.triggerSave();
if( top.edCall && winPadre==top ){
top.edCall("edes.php?E:$wysiwyg_file.php&GRABAR=1", {
AYUDAHTML:document.forms[0].texto.value.replace(/\\/g,"{#~92~#}"),
FILE:document.forms[0].nombre.value
}, {info:true});
}else{
top.S.call("edes.php?E:$wysiwyg_file.php&GRABAR=1", {
AYUDAHTML:document.forms[0].texto.value.replace(/\\/g,"{#~92~#}"),
FILE:document.forms[0].nombre.value
}, {info:true});
}
return S.eventClear(window);
}
<?PHP
?>
</SCRIPT>
</BODY>
</HTML>
<?PHP
eEnd();
}