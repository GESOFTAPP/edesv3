<?PHP
eHTML();
?>
<style>
BODY {
background-color:#ffffff;
padding-right: 8px;
}
SPAN {
width:50px;
height:50px;
border:1px solid #eeeeee;
display: block;
float:left;
margin-right:10px;
margin-top:10px;
text-align:center;
vertical-align:top;
}
IMG, SVG {
max-width:48px;
max-height:48px;
cursor:pointer;
}
.PRE-SELECCION * {
max-width:48px;
max-height:48px;
}
.FAVORITES * {
max-width:48px;
max-height:48px;
}
.grid {
display: grid;
grid-template-columns: auto 50px 50px;
}
.gridTOTAL {
display: grid;
grid-template-columns: auto 50px 50px;
grid-template-rows: 20px auto;
}
</style>
<script>
top.S.init(window, "all");
setTimeout(function(){
S(["#__gif", "#__png", "#__jpg", "#__jpeg", "#__svg", "#__img"],top).on("click", function(ev){
var o = S.event(ev),
ext = S.mid(o.id,2,0);
if( o.getAttribute("eON")=="1" ){
o.innerHTML = "&#320;";
o.setAttribute("eON", 0);
if( ext=="img" ){
S("img").each(function(k,img){
S(img.parentElement).none();
});
S(["#__gif", "#__png", "#__jpg", "#__jpeg"], top).each(function(k,i){
i.setAttribute("eON", 0);
i.innerHTML = "&#320;";
});
}else if( ext=="svg" ){
S("svg").each(function(k,img){
S(img.parentElement).none();
});
}else{
S("img[src$='"+ext+"']").each(function(k,img){
S(img.parentElement).none();
});
}
}else{
o.innerHTML = "&#321;";
o.setAttribute("eON", 1);
if( ext=="img" ){
S("img").each(function(k,img){
S(img.parentElement).block();
});
S(["#__gif", "#__png", "#__jpg", "#__jpeg"], top).each(function(k,i){
i.setAttribute("eON", 1);
i.innerHTML = "&#321;";
});
}else if( ext=="svg" ){
S("svg").each(function(k,img){
S(img.parentElement).none();
});
}else{
S("img[src$='"+ext+"']").each(function(k,img){
S(img.parentElement).block();
});
}
}
});
if( _WOPENER.Procesando ) _WOPENER.Procesando(0);
}, 1);
function selIcono(o){
var img;
o = o.children[0];
_WOPENER._IconNew.innerHTML = S(o).HTML();
if( o.tagName=="svg" ){
img = S.fileFullname(o.parentElement.getAttribute("src"));
}else{
img = S.fileFullname(o.src);
}
_WOPENER._IconNew.setAttribute("icon", "g/"+img);
_WOPENER._SeModOpciones = true;
S(window).window();
}
function eliminarIcono(){
_WOPENER._IconNew.innerHTML = "";
_WOPENER._IconNew.setAttribute("icon", "");
_WOPENER._SeModOpciones = true;
S(window).window();
}
function preSelIcono(o){
var boxName = o.parentNode.className, aQui;
if( boxName=="FAVORITES" ){
return S.eventClear(window);
}
aQui = S((boxName=="TODO") ? ".PRE-SELECCION":".TODO").obj;
S(o).nodeMove(aQui);
return S.eventClear(window);
}
function SearchIcons(){
var k = S.eventCode(event);
if( k==undefined || k==27 ){
S("#SearchIconByName").val("");
}
setTimeout(function(){
SearchIcons2();
}, 0);
}
function SearchIcons2(){
var nameSeek = S("#SearchIconByName").val(), name, view;
S(".TODO SPAN>IMG, .TODO SPAN>SVG, .PRE-SELECCION SPAN>IMG, .PRE-SELECCION SPAN>SVG, .FAVORITES SPAN>IMG, .FAVORITES SPAN>SVG").each(function(k, o){
name = (o.tagName=="svg") ? o.parentNode.getAttribute("src") : o.src;
name = S.fileName(name);
view = (name.indexOf(nameSeek)>-1) ? "block" : "none";
o.parentNode.style.display = view;
});
}
function EnterSearchIcons(){
if( S.eventCode(window.event)==13 ){
SearchIcons();
return false;
}
return true;
}
function MoveToFavorites(){
var  icons = S("#BROWSE TR TD:nth-child(3)[icon]", _WOPENER)
,aQui = S(".FAVORITES").obj
,tmp=[], iconFavorites=[], name;
icons.each(function(k,o){
name = o.getAttribute("icon");
if( name=="" ) return;
name = S.fileName(name);
tmp[name] = 1;
})
for(name in tmp) iconFavorites.push(name);
S(".TODO SPAN>IMG, .TODO SPAN>SVG").each(function(k, o){
name = (o.tagName=="svg") ? o.parentNode.getAttribute("src") : o.src;
name = S.fileName(name);
if( iconFavorites.indexOf(name)>-1 ){
S(o.parentNode).nodeMove(aQui);
}
});
}
</script>
<style>
.AddButton {
float: right;
margin: 0 20px 0 0;
}
</style>
</head>
<body>
<div class="grid">
<div>
<div style="display:table; width:max-content; float:left;">
<?PHP
eAddButton("D", "Eliminar el icono de la opción", "eliminarIcono()", "", "style='height:auto; width:auto; float:none; padding-top:2px; padding-bottom:2px; padding-left:10px; padding-right:10px;'", "AddButton");
?>
</div>
<div style="display:table; float:left;" title="Filtrar iconos">
<input id="SearchIconByName" style="width:150px;" onkeydown="SearchIcons()" on-keydown="EnterSearchIcons()" placeholder="Filtrar...">
</div>
<div style="display:none; float:left; padding-top:3px;">
<i class="ICONINPUT" onclick="SearchIcons()">S</i>
</div>
</div>
<div style="font-size:50%; border-bottom:1px solid #dddddd; border-left:1px solid #dddddd; text-align:center; min-width:50px; padding-top:10px;">Preselection</div>
<div style="font-size:50%; border-bottom:1px solid #dddddd; border-left:1px solid #dddddd; text-align:center; min-width:50px; padding-top:10px;">Favorites</div>
<div class="TODO">
<?PHP
$DirBase = "g";
$di = opendir($DirBase);
while( $file = readdir($di) ){
if( $file=='.' || $file=='..' ){
continue;
}
$ext = mb_substr($file, -3);
if( $ext=="" ){
continue;
}else if( preg_match('/^(gif|png|jpg|jpeg)$/iu', $ext) ){
$NomFile = "{$DirBase}/{$file}";
echo "<span onclick='selIcono(this)' oncontextmenu='preSelIcono(this)' title='{$file}'><img src='{$NomFile}'></span>";
}else if( preg_match('/^svg$/iu', $ext) ){
$NomFile = "{$DirBase}/{$file}";
echo "<span onclick='selIcono(this)' oncontextmenu='preSelIcono(this)' title='{$file}' src='{$NomFile}'>";
include($NomFile);
echo '</span>';
}
}
closedir($di);
?>
</div>
<div class="PRE-SELECCION"	style="border-left:1px solid #dddddd"></div>
<div class="FAVORITES"		style="border-left:1px solid #dddddd"></div>
</div>
<script>
MoveToFavorites();
</script>
</body>
</html>