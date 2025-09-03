<?PHP
if( !isset(SESS::$_Tree) ){
include( 'index.html' );
exit;
}
$_SERVER['QUERY_STRING'] = mb_substr( $_SERVER['QUERY_STRING'],4);
list( $_SERVER['QUERY_STRING'] ) = explode( '&', $_SERVER['QUERY_STRING'] );
$File = $_SERVER['QUERY_STRING'];
$NomExt = mb_substr($File,mb_strrpos($File,'.')+1);
if( $NomExt!='' ){
}else{
exit;
}
?>
<!DOCTYPE HTML>
<HTML><HEAD>
<META HTTP-EQUIV="imagetoolbar" CONTENT="no">
<TITLE> <?= $TITULO ?> </TITLE>
<style>
body, html{
height:100%;
width:100%;
}
BODY {
BACKGROUND: #f2f2f2;
FONT-FAMILY: ARIAL;
}
TD {
FONT-SIZE: 11px;
COLOR: #0009a5;
text-align: center;
}
</style>
<SCRIPT type="text/javascript">
top.S.init(window);
function Recalcular(){
var Ancho = S("#FOTO").obj.clientWidth,
Alto = S("#FOTO").obj.clientHeight;
top.eSWIResize(window,Ancho,Alto);
<?PHP if( $_GET['MAXIMIZE'] ){ ?>
document.body.style.scroll = "none";
with( S("#FOTO").obj.style ){
width = "100%";
height = "100%";
}
with( S("#FOTO").obj.style ){
width = document.body.offsetWidth+"px";
height = document.body.offsetHeight+"px";
}
<?PHP }	?>
top.eSWLoading(window, 0);
top.eSWView(window);
if( S("IMG").length>0 ){
if( S("IMG").css("width")>document.body.clientWidth ){
S("IMG").css("width", document.body.clientWidth);
}
}
}
function PonFoco(){
setTimeout(function(){
window.focus();
}, 250);
}
function CerrarVentana(){
if( S.eventCode(event)==27 ) top.eSWClose(window);
}
top.S.windowCloseWithEsc(window);
</SCRIPT>
</HEAD>
<BODY style='margin:0px' onload='Recalcular();PonFoco();' onhelp='return false;' onkeydown=CerrarVentana() oncontextmenu='<?=((SESS::$_D_=='~')?'':'return false;')?>' onselectstart='return false' ondragstart='return false'>
<div id=FOTO style='width:1px;height:1px;' <?=(($_GET['MAXIMIZE'])?'':' onresize="Recalcular()"')?>>
<?PHP
if( eSubstrCount($NomExt, 'avi')==1 ){
if( eSubstrCount($File,'/http/')>0 ){
list( ,$File ) = explode('/http/',$File);
echo "<EMBED SRC='{$File}' LOOP='TRUE' AUTOSTART='TRUE'>";
}else{
echo "<EMBED SRC='edes.php?R:{$File}' LOOP='TRUE' AUTOSTART='TRUE'>";
}
}else if( eSubstrCount($NomExt, 'swf')==0 ){
if( eSubstrCount($File,'/http/')>0 ){
list(,$File) = explode('/http/',$File);
echo "<IMG SRC='{$File}' id=iFOTO BORDER=0 ALT='' TITLE='{$TITULO}'>";
}else{
echo "<IMG SRC='edes.php?R:{$File}' id=iFOTO BORDER=0 ALT='' TITLE='{$TITULO}'>";
}
}else if( eSubstrCount($NomExt, 'swf')==1 ){
if( eSubstrCount($File,'/http/')>0 ){
list( ,$File ) = explode('/http/',$File);
echo '<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=5,0,0,0">';
echo "<PARAM NAME=movie   VALUE='{$File}'>";
echo '<PARAM NAME=quality VALUE=high>';
echo '<PARAM NAME=bgcolor VALUE=#F8F8E3>';
echo "<EMBED src='{$File}' quality=high bgcolor=#F8F8E3 TYPE='application/x-shockwave-flash' PLUGINSPAGE='http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash'></EMBED>";
echo '</OBJECT>';
}else{
echo '<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=5,0,0,0">';
echo "<PARAM NAME=movie   VALUE='edes.php?R:{$File}'>";
echo '<PARAM NAME=quality VALUE=high>';
echo '<PARAM NAME=bgcolor VALUE=#F8F8E3>';
echo "<EMBED src='edes.php?R:{$File}' quality=high bgcolor=#F8F8E3 TYPE='application/x-shockwave-flash' PLUGINSPAGE='http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash'></EMBED>";
echo '</OBJECT>';
}
}
?>
</div>
</BODY></HTML>
<?PHP
?>