<?PHP
if( !$_ENV["_CompressedPages"] ){
die("\n\n\nError: eInit() is overridden\n\n\n");
}
$debug = debug_backtrace();
if( $debug[1]['function']!="eBacktrace" ) eInit();
eHTML();
?>
<script>
top.S.init(window, "all,list");
document.name = "ePrintR()";
</script>
<?PHP
echo "<i onclick='showHelp(this)'>@</i>";
echo "<i onclick='seekText()' oncontextmenu='clearSeek()' id='iconSeek' style='margin-left:5px;'>S</i>";
echo "<i onclick='showAllLevels()' style='margin-left:20px;'>c</i>";
echo "<i onclick='showALevel()' style='margin-left:5px;'>d</i>";
$argv = $funcGetArgs;
for($i=0; $i<count($argv); $i++){
$nomVar = "";
if( gettype($argv[$i])=="string" && mb_substr($argv[$i],-1)==":" ){
$nomVar = "<b>".mb_substr($argv[$i], 0, -1)."</b>";
$i++;
}
if( gettype($argv[$i])=="boolean" ){
if( $nomVar!="" ) $nomVar .= ": ";
echo "<hr>";
echo "<div nivel=0 class='CUR-AUTO'>{$nomVar}".($argv[$i] ? "true":"false")."</div>";
continue;
}
if( gettype($argv[$i])!="array" ){
if( $nomVar!="" ) $nomVar .= ": ";
echo "<hr>";
echo "<div nivel=0 class='CUR-AUTO'>{$nomVar}".$argv[$i]."</div>";
continue;
}
$tmp = explode("\n", print_r($argv[$i], true));
if( $nomVar=="" ) $nomVar = "(var)";
$tmp[0] = trim("{$nomVar}:");
for($n=1; $n<count($tmp); $n++){
if( trim($tmp[$n])=="(" ){
$tmp[$n] = "";
if( $n>1 ){
list($tmp[$n-1]) = explode(" => ", $tmp[$n-1]);
}
}
if( trim($tmp[$n])==")" ){
$tmp[$n] = "";
}
}
echo "<hr>";
for($n=0; $n<count($tmp); $n++){
$tmp[$n] = rtrim($tmp[$n]);
if( trim($tmp[$n])=="" ) continue;
$nivel = mb_strlen($tmp[$n])-mb_strlen(ltrim($tmp[$n]));
$cursor = "";
if( $nivel==0 ){
$cursor = " class='CUR-CONTEXT'";
}else if( trim($tmp[$n])[0]=="[" && mb_substr(trim($tmp[$n]), -1)=="]" ){
$cursor = " class='CUR-POINTER'";
}
echo "<div nivel={$nivel}{$cursor}>".rtrim($tmp[$n])."</div>";
}
}
echo "<style>";
echo "* { font-family: monospace; }";
echo ".CUR-AUTO { cursor:var(--cAuto); }";
echo ".CUR-POINTER, I { cursor:var(--cPoint); }";
echo "I { display:inline-block; cursor:var(--cPointer); }";
echo ".CUR-CONTEXT { cursor:var(--cContext); }";
echo "div { cursor:text; font-family:monospace; }\n";
$p = 0;
for($i=0; $i<32; $i+=4){
$px = $p*15;
echo "div[nivel='{$i}'] { padding-left:{$px}px; }\n";
$p++;
}
echo "</style>";
?>
<script>
S("DIV").on("click", function(){
var  o = this
,index = S(o).attr("nivel")*1
,view;
o = o.nextSibling;
view = o.offsetWidth>0;
while( true ){
if( !o || o.tagName!="DIV" || S(o).attr("nivel")==null ){
break;
}else if( index < S(o).attr("nivel")*1 ){
S.display(o, !view);
o = o.nextSibling;
}else{
break;
}
}
});
S("DIV").on("contextmenu", function(){
var  o = this
,index = S(o).attr("nivel")*1+4
,view;
if( index==4 ){
o = o.nextSibling;
view = o.nextSibling.offsetWidth>0;
while( true ){
if( !o || o.tagName!="DIV" || S(o).attr("nivel")==null ){
break;
}else if( index < S(o).attr("nivel")*1 ){
S.display(o, !view);
o = o.nextSibling;
}else if( index == S(o).attr("nivel")*1 ){
S(o).block();
o = o.nextSibling;
}else{
break;
}
}
}
return S.eventClear(window);
});
function seekText(){
S.alert({
icon	: '<i class="ICONDESKTOP">S</i>'
,button	: "Y,N"
,title	: "Texto a buscar"
,text	: ""
,form	: [ ['| seek | # | T | 30 | 250 | M |||', ""] ]
,function: function(op, para){
if( op!=1 ) return;
clearSeek();
if( para.seek=="" ) return;
S("#iconSeek").css("cursor:copy");
var  xSeek = para.seek
,patron = S.accentToRegExp(xSeek);
if( xSeek.length>2 && xSeek[0]=="/" && S.count("/", xSeek)>=2 ){
for(let i=1; i<4; i++){
if( S.right(xSeek, i)[0]!="/" ){
continue;
}
let flags = S.right(xSeek, i-1);
xSeek = S.mid(xSeek, 1, xSeek.length-i-1);
patron = new RegExp(xSeek, flags);
break;
}
}
S("DIV").each(function(k, o){
var contenido = S.replace(S(o).html(), "&gt;", ">");
if( patron.test(contenido) ){
var  dim = contenido.match(patron)
,unique = [], i;
for(i=0; i<dim.length; i++){
unique[dim[i]] = true;
}
for(i in unique){
contenido = S.replace(contenido, i, "<mark>" + i + "</mark>");
}
S(o).html(contenido);
if( o.offsetHeight==0 ){
showParent(o);
}
}
});
}
});
}
function clearSeek(){
S("#iconSeek").css("cursor:default");
S("MARK").each(function(k, o){
S(o).HTML(S(o).html());
});
return S.eventClear(window);
}
function showParent(o){
if( o.tagName=="MARK" ) o = o.parentNode;
var nivel = S(o).attr("nivel")*1;
S(o).block();
o = o.previousSibling;
while( true ){
if( !o || o.tagName!="DIV" || S(o).attr("nivel")==null ){
break;
}else if( nivel > S(o).attr("nivel")*1 ){
S(o).block();
o = o.previousSibling;
}else if( nivel == S(o).attr("nivel")*1 ){
o = o.previousSibling;
}else{
break;
}
}
}
function showAllLevels(){
S("DIV").block();
}
function showALevel(){
S("DIV").none();
S("DIV[nivel='0']").block();
}
function showHelp(o){
S(o).info(`	<center><u>Ayuda S.printR()</u></center><br>
La función "S.printR()" muestra el contenido de las variables pasadas como parámetros.<br>
Si el valor es un "Array()" se puede colapsar/expandir haciendo click sobre su nombre.<br>
En los array de nivel "0" con click-dch se colapsa/expande todos los niveles del array.<br>
Si el parámetro anterior a la variable a mostrar es un string que termina en ":" este será el nombre de la variable.
`);
}
try{top.eLoading(false,window);}catch(e){}
document.body.style.visibility="visible";
try{window.frameElement.WOPENER.document.body.style.visibility="visible";}catch(e){}
try{if(top.eIsWindow(window)) top.eSWView(window);}catch(e){}
try{if(window.frameElement.MODAL!=undefined) top.ShowCallSrv();}catch(e){}
try{
if( S(window.frameElement.parentNode).css("display")=="none" ){
top.S(window.frameElement.parentNode).block();
}
}catch(e){}
</script>
<?PHP
eEnd();
?>