<?PHP
eLngLoad(DIREDES.'lng/iworkmulti.php', '', 1);
global $__Lng;
if( isset($_MULTIPLEPAGE) ){
$_POST["color"] = $_MULTIPLEPAGE[0];
$_POST["backgroundColor"] = $_MULTIPLEPAGE[1];
$_POST["label"] = $_MULTIPLEPAGE[2];
$_POST["url"] = $_MULTIPLEPAGE[3];
}
S::multiplePage(color, backgroundColor, label, url, label, url, ...);
?>
<!DOCTYPE HTML>
<HTML>
<HEAD>
<META http-equiv="Content-Type" content="text/html; charset=UTF-8">
<STYLE>
HTML, BODY {
width:100%;
height:100%;
padding:0px;
margin:0px;
overflow: hidden;
}
#BOXMAIN {
display: -ms-flex;
display: -webkit-flex;
display: flex;
flex-direction: row;
justify-content: flex-start;
align-items: flex-start;
grid-template-columns: min-content auto;
height: 100%;
}
#BOXIFRAME {
display: inline-block;
width: 100%;
height: 100%;
overflow: auto;
-border:1px solid blue;
}
#BOXMENU {
display: inline-table;
width: min-content;
height: 100%;
padding: 5px;
overflow-y: auto;
overflow-x: hidden;
border-right:1px solid #dddddd;
}
#BOXMENU INPUT {
border: 1px solid #eeeeee;
border-bottom-style: none;
margin-left:1px;
cursor:default;
}
#BOXMENU INPUT:last-child {
border-bottom-style: inherit;
}
#BOXMENU input:focus-visible {
outline: 1px solid #aaaaaa;
}
#BOXMENU input[e-status] {
border:1px solid #aaaaaa;
-background-color: #fbf7e4;
outline: 1px solid #aaaaaa;
color: <?=$_POST["color"]?>;
background-color: <?=$_POST["backgroundColor"]?>;
}
#BOXMENU DIV {
white-space: nowrap;
display: inline-table;
}
#BOXMENU DIV I {
padding-right: 5px;
}
</STYLE>
<SCRIPT type="text/javascript" name=eDes>
document.title = "MultiReport";
top.S.init(window, "all");
var _pk = 1;
function changeIFrame(){
S.inactivity();
var o = S.event(window);
if( o.tagName=="I" ){
var  menu = [
["-<?=$__Lng["Menu"]?>"]
,["<?=$__Lng["Ejecutar"]?>", "&#230;", "Exe"]
]
,oDIV = o.parentNode;
if( S("#BOXMENU DIV").length>1 ){
menu.push(["<?=$__Lng["Borrar"]?>", "&#68;", "Delete"]);
}
if( oDIV.previousElementSibling.tagName=="DIV" ){
menu.push(["<?=$__Lng["Subir"]?>", "¡", "Up"]);
}
if( oDIV.nextElementSibling!=null ){
menu.push(["<?=$__Lng["Bajar"]?>", "!", "Down"]);
}
S(o).menu(
menu
,{function:function(op, b, c, d, e, iconClick){
if( op==null ) return;
var  oDIV = iconClick.parentNode
,oINPUT = S("INPUT", oDIV).obj;
if( op=="Delete" ){
if( S(oINPUT).attr("e-status")=="A" ){
if( S("#BOXMENU INPUT").length==1 ){
S.error("<?=$__Lng["No se puede eliminar todo"]?>");
return;
}
if( oDIV.previousElementSibling.tagName=="DIV" ){
S("INPUT", oDIV.previousElementSibling).attr("e-status", 'A');
var oFocus = S("#BOXMENU INPUT[e-status='A']").obj;
S("#BOXIFRAME IFRAME[id='uIFRAME"+oFocus.name+"']").block();
}
}
S("#BOXIFRAME IFRAME[id='uIFRAME"+oINPUT.name+"']").nodeRemove();
S(oDIV).nodeRemove();
return;
}
if( op=="Exe" ){
frames["uIFRAME"+oINPUT.name].location.replace( S.urlAdd(S(oINPUT).attr("e-href")) );
return;
}
if( op=="Up" ){
var oParent = oDIV.previousElementSibling;
S(oParent).nodeSwap(oDIV);
return;
}
if( op=="Down" ){
var oParent = oDIV.nextElementSibling;
S(oDIV).nodeSwap(oParent);
return;
}
}, arg:o}, o
);
return;
}
if( o.tagName!="INPUT" ){
return;
}
S("#BOXMENU INPUT[e-status='A']").attr("e-status", null);
S(o).attr("e-status", 'A');
S("#BOXIFRAME IFRAME").none();
S("#BOXIFRAME IFRAME[id='uIFRAME"+o.name+"']").block();
if( S("#BOXIFRAME IFRAME[id='uIFRAME"+o.name+"']").obj.src=='about:blank' ){
S("#BOXIFRAME IFRAME[id='uIFRAME"+o.name+"']").obj.src = S.urlAdd(S(o).attr("e-href"));
}
}
function IFrameAdd(url, label){
var  urlFutur = (url[0]=="-")
,status = ' e-status="A"';
if( urlFutur ){
url = S.mid(url,1,0);
status = "";
}else{
S("#BOXMENU INPUT[e-status='A']").attr("e-status", null);
S("#BOXIFRAME IFRAME").none();
}
_pk++;
var txt = `<div>
<i class="ICONINPUT">&#39;</i>
<input placeholder="<?=$__Lng["Rellenar"]?>" value="${label}" name="${_pk}"${status} e-href="${url}">
</div>`;
S(txt).nodeEnd(S("#BOXMENU").obj);
if( urlFutur ) url = null;
top.eNewIframe(window, "BOXIFRAME", "uIFRAME"+_pk, url);
if( urlFutur ) S("#BOXIFRAME IFRAME[id='uIFRAME"+_pk+"']").none();
}
</SCRIPT>
</HEAD>
<BODY>
<div id="BOXMAIN">
<span id="BOXMENU" onclick="changeIFrame()">
<center style="cursor:var(--cAuto)"><?=$__Lng["Menu de opciones"]?></center>
</span>
<span id="BOXIFRAME"></span>
</div>
<script>
IFrameAdd("<?=$_POST["url"]?>", "<?=$_POST["label"]?>");
<?PHP
if( isset($_MULTIPLEPAGE) ){
for($n=4; $n<count($_MULTIPLEPAGE); $n+=2){
$index = strpos($_MULTIPLEPAGE[$n], ":");
if( strpos($_MULTIPLEPAGE[$n], "edes.php")===false && $index!==false && $index<4 ){
$_MULTIPLEPAGE[$n] = "edes.php?".$_MULTIPLEPAGE[$n];
}
echo 'IFrameAdd("-'.$_MULTIPLEPAGE[$n+1].'", "'.$_MULTIPLEPAGE[$n].'");';
}
}
?>
</script>
</BODY>
</HTML>