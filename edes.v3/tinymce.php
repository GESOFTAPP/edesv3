<?PHP
function getHeader($titulo=''){
return <<<EOD
<html xmlns:v="urn:schemas-microsoft-com:vml"
xmlns:o="urn:schemas-microsoft-com:office:office"
xmlns:w="urn:schemas-microsoft-com:office:word"
xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta http-equiv=Content-Type content="text/html; charset=utf-8">
<meta name=ProgId content=Word.Document>
<meta name=Generator content="Microsoft Word 9">
<meta name=Originator content="Microsoft Word 9">
<title>{$titulo}</title>
<style>
body{
font-family: verdana;
font-size: 8pt;
}
@font-face
{font-family:Verdana;
panose-1:2 11 6 4 3 5 4 4 2 4;
mso-font-charset:0;
mso-generic-font-family:swiss;
mso-font-pitch:variable;
mso-font-signature:536871559 0 0 0 415 0;}
p.MsoNormal, li.MsoNormal, div.MsoNormal
{mso-style-parent:"";
margin:0in;
margin-bottom:.0001pt;
mso-pagination:widow-orphan;
font-size:7.5pt;
mso-bidi-font-size:8.0pt;
font-family:"Verdana";
mso-fareast-font-family:"Verdana";}
p.small
{mso-style-parent:"";
margin:0in;
margin-bottom:.0001pt;
mso-pagination:widow-orphan;
font-size:1.0pt;
mso-bidi-font-size:1.0pt;
font-family:"Verdana";
mso-fareast-font-family:"Verdana";}
@page Section1
{size:8.5in 11.0in;
margin:1.0in 1.25in 1.0in 1.25in;
mso-header-margin:.5in;
mso-footer-margin:.5in;
mso-paper-source:0;}
div.Section1
{page:Section1;}
</style>
</head>
<body>
EOD;
}
if( isset($_GET["PRUEBA"]) && $_GET["PRUEBA"]==1 ){
$txt = $_POST["CONTENIDO"];
$txt = str_replace("{#~92~#}", CHR92, $txt);
$dim = json_decode($_POST["VARIABLES"]);
for($n=0; $n<count($dim); $n++){
$variable = $dim[$n][0];
if( count($dim[$n])>4 ){
$txt = str_replace($dim[$n][2], $dim[$n][4], $txt);
}
}
$html = $txt;
$hdr  = getHeader("titulo de prueba");
$doc  = $hdr.$html."</body></html>";
$file = "prueba";
@header("Cache-Control: ");
@header("Pragma: ");
@header("Content-type: application/octet-stream");
@header('Content-Disposition: attachment; filename="'.$file.'.doc"');
echo $doc;
eEnd();
}
if( isset($_GET["GRABAR"]) && $_GET["GRABAR"]==1 ){
$txt = str_replace("{#~92~#}", CHR92, html_entity_decode($_POST["CONTENIDO"]));
$file = $_POST["FILE"];
$file = eScript($file).'.html';
file_put_contents($file, $txt);
echo "Grabado";
eEnd();
}
if( isset($_GET["file"]) ){
$file = eScript($_GET["file"]).'.html';
$fileHelp = $_GET["file"];
if( isset($_GET["template"]) && !file_exists($file) ){
copy(eScript($_GET["template"]).'.html', $file);
}
$html = file_get_contents($file);
$ChangeData = false;
$NomArrayVar = (isset($_GET['arrayVar']) ? $_GET['arrayVar']:"_MenuVariables");
eHTML('$tinymce.php', '', 'EDITOR WYSIWYG');
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
</STYLE>
<SCRIPT>
document.title = "TAB";
var winPadre = top;
winPadre.S.init(window,"all,tab");
setTimeout(function(){
var winFrame = (top.window.opener) ? frames[0] : window;
winFrame.document.body.onkeydown = function(ev){
if( ev.keyCode==115 ){
InsertTab(tinyMCE.editors[0]);
return S.eventClear(window);
}else if( ev.keyCode==121 ){
SaveFile();
}
}
},2000);
</SCRIPT>
<SCRIPT SRC="lib/tinymce/js/tinymce/tinymce.min.js"></SCRIPT>
</HEAD>
<BODY>
<DIV id="TEMPORAL" style="display:none"><?=$html?></DIV>
<FORM accept-charset='utf-8' style='margin-bottom:0px;padding-bottom:0px' eType='Directo' AUTOCOMPLETE='off' NAME='FRM1' METHOD='POST'>
<TEXTAREA name="texto" id="texto" COLS=100 ROWS=30 MAXLENGTH=-1 WRAP=VIRTUAL></TEXTAREA>
<INPUT type="hidden" name="nombre" id="nombre" value="<?=$fileHelp?>">
</FORM>
<SCRIPT>
var _MenuVar = (_WOPENER.<?=$NomArrayVar?>!=undefined);
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
force_br_newlines: true,
force_p_newlines: false,
forced_root_block: '',
help_tabs: ['shortcuts'],
menubar: true,
menu: {
edit: {title: 'Edit', items: 'undo redo | cut copy paste pastetext | selectall'},
format: {title: 'Format', items: 'bold italic underline strikethrough superscript subscript | formats | removeformat'}
},
plugins: [
'advlist autolink lists link image charmap print preview anchor textcolor',
'searchreplace visualblocks code',
'media table paste help save'
],
toolbar: 'undo redo | formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help | myTab myTab2 mysave',
content_style: "span[id='var']{ color:red; }",
setup: (editor) => {
if( _MenuVar ){
editor.ui.registry.addButton('myTab', {
text: 'Variables',
onAction: () => InsertVariable(editor)
})
editor.ui.registry.addButton('myTab2', {
text: 'Imprimir prueba',
onAction: () => ImprimirPrueba(editor)
})
}
editor.ui.registry.addButton('mysave', {
text: 'Grabar',
tooltip: "<?=$fileHelp?>",
onAction: () => SaveFile()
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
setTimeout(function(){
S(".tox-statusbar__branding").nodeRemove();
S(".tox-statusbar").nodeRemove();
}, 100);
function SaveFile(){
tinyMCE.triggerSave();
top.S.call("edes.php?E:$tinymce.php&GRABAR=1", {
CONTENIDO:document.forms[0].texto.value.replace(/\\/g,"{#~92~#}"),
FILE:document.forms[0].nombre.value
}, {info:true});
return S.eventClear(window);
}
function ImprimirPrueba(editor){
var txt = document.forms[0].texto.value;
S("<div id='CLEARTAG'>"+txt+"</DIV>").nodeEnd();
S("SPAN[id='var']", "#CLEARTAG").each(function(k,o){
S(o).HTML(S(o).text());
});
txt = S("#CLEARTAG").html();
S("#CLEARTAG").nodeRemove();
S(window).callSrvPost("edes.php?E:$tinymce.php&PRUEBA=1", {
CONTENIDO:txt.replace(/\\/g,"{#~92~#}"),
VARIABLES:JSON.stringify(_WOPENER.<?=$NomArrayVar?>)
});
}
function InsertVariable(editor){
S(event.target).menu(_WOPENER.<?=$NomArrayVar?>, {function:function(op, label, triger, oTR){
if( oTR.title!="" ) label = oTR.title;
op = "<span title='"+label+"' id='var'>"+op+"</span> ";
editor.insertContent(op);
}});
}
</SCRIPT>
</BODY>
</HTML>
<?PHP
eEnd();
}