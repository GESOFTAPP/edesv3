var Favorite = (function(){
var func={}, color="red";
func.view = function(obj){
if( S(obj).class("?OFF") ){
return S.eventClear(window);
}
if( localStorage.getItem('e-config-tree-fixed')!="FT" ){
S(".TREEMAIN").none();
}
let subTree = S("#SUBTREE-Favorite").obj;
S(obj).around(subTree);
subTree.style.height = "";
}
func.init = function(obj, ops){
var oTABLE = S("#SUBTREE-Favorite").obj.children[0], oTR, oSVG, url, op, i;
color = S.ruleGet(top, ".FavoriteON", "color") || "yellow";         // obtiene el color de la hoja de estilo
if( ops.length>0 ){
for(i=0; i<ops.length; i++){
url = ops[i];
mark(url, true);
}
S("TR", oTABLE).block("table-row");
S("TD:nth-child(2)", oTABLE).none();
S("TD[id^='tab_']", oTABLE).each(function(k,o){
o.id = "";
});
if( ops.length>0 ){
S(obj).class("-OFF");                                       // S(obj).color(color);      // (1) pone el mismo color al icono de favoritos
}
}
}
func.add = function(ele){
var obj = ele ?? S.event(window);
if( obj.tagName!="TR" ) obj = S.toTag(obj, "TR");
if( obj.getAttribute("open")!=null || obj.getAttribute("op")==null ){
return S.eventClear(window);
}
var oSVG = obj.children[0].children[0].children[0],
oTABLE = S("#SUBTREE-Favorite").obj.children[0],
exists = false,
url = obj.getAttribute("op"),
oIconMenu = S(".favorite").obj,
action = "+", pUrl="", pRowIndex, oFather;
if( oIconMenu.offsetWidth==0 ) return S.eventClear(window);                 // si el icono  Favorite está oculto no se podrá memorizar las opciones
if( S.right(url,1)==":" ){
oFather = S.toTag(obj, "TABLE");
pRowIndex = obj.rowIndex-1;
while( oFather.rows[pRowIndex].getAttribute("op")==null || oFather.rows[pRowIndex].getAttribute("op")[0]!=":" ){
pRowIndex--;
}
pUrl = oFather.rows[pRowIndex].getAttribute("op");
url = S.left(url,0,-1)+pUrl;
}
S("#SUBTREE-Favorite TR[op]").each(function(k, o){
if( url==o.getAttribute("op") ){
exists = true;
return null;
}
});
if( !exists ){      // comprueba si cabe
let  oTreeFavorite = S("#SUBTREE-Favorite")
,iconFavorite = S(".favorite"), xy, fit;
if( S("TR", oTreeFavorite).length ){
oTreeFavorite.block();
xy = iconFavorite.xy();
fit = (xy.y + xy.h + oTreeFavorite.height() + S("TR", oTreeFavorite).obj.clientHeight > S.screen(top).ch);
oTreeFavorite.none();
if( fit ){
S.info(S.lng(307), 3);
return;
}
}
}
mark(url, !exists);
action = (exists)? "-" : "+";
S.call("edes.php?E:$favorite.php", {url:action+url});
return S.eventClear(window);
}
func.hidden = function(obj){
S(obj).hidden();
screenshotDelete();
}
function mark(url, on){
var oTABLE = S("#SUBTREE-Favorite").obj.children[0], oTR, oSVG,
oIconMenu = S(".favorite").obj, eFavorite, oFather, pRowIndex, pHTML="", preUrl="", urlLeft, urlRight, i,
buscar;
[urlLeft, urlRight] = url.split(":");
buscar = "TR[op='"+urlLeft+":"+urlRight+"'], TR[op=':"+urlRight+"']";
S(buscar).each(function(k, o){
if( o.getAttribute("op")[0]==":" ){     // busca el hijo
pHTML = o.cells[0].innerHTML;
oFather = S.toTag(o, "TABLE");
pRowIndex = o.rowIndex+1;
while( oFather.rows[pRowIndex].getAttribute("op")!=(urlLeft+":") ){
pRowIndex++;
}
o = oFather.rows[pRowIndex];        // preUrl = S.left(o.getAttribute("op"), 0, -1);
}
oSVG = o.children[0].children[0].children[0];
if( k==0 && on ){
oTR = oTABLE.insertRow();
S(oTR).HTML(S(o).HTML());
i = oTABLE.rows.length-1;
oTABLE.rows[i].setAttribute("op", urlLeft+":"+urlRight);
oTABLE.rows[i].cells[0].innerHTML = pHTML + oTABLE.rows[i].cells[0].innerHTML;
if( pHTML!="" ){
oTABLE.rows[i].cells[0].children[2].style.paddingLeft = "10px";
}
}
eFavorite = o.getAttribute("eFavorite");
if( on && eFavorite==null ){
oSVG.setAttribute("setFavorite", 1);
}else{
oSVG.removeAttribute("setFavorite");
let oDelete = S.toTag(o, "SPAN");           // console.log(oDelete.className+' : '+oDelete.id); debugger;
if( oDelete.id=="SUBTREE-Favorite" ){       // TREEMAIN, SUBTREE, id=SUBTREE-Favorite
oTABLE.deleteRow(o.rowIndex);
oSVG.removeAttribute("setFavorite");
}
}
oSVG.style.fill = (on && eFavorite==null)? color : null;
});
if( on ){
S("SVG", oTABLE).css("fill:");
S("TR", oTABLE).block("table-row");
S("TD:nth-child(2)", oTABLE).none();
S("TD[id^='tab_']", oTABLE).each(function(k,o){
o.id = "";
o.parentNode.setAttribute("eFavorite", 1);
});
}
if( oTABLE.rows.length==0 ){
S(oIconMenu).class("+OFF");            //S(oIconMenu).color("");       // (1) pone el mismo color al icono de favoritos
}else{
S(oIconMenu).class("-OFF");            //S(oIconMenu).color(color);      // (1) pone el mismo color al icono de favoritos
sort(oTABLE, 0);
}
}
function sort(oTABLE, col){
var dim=[], r=oTABLE.rows, n;
for(n=0; n<r.length; n++){
dim.push([r[n].cells[col].textContent, r[n].cloneNode(true)]);
}
dim.sort(function(a,b){ return(a[0]>b[0]) ? 1 : -1; });
for(n=0; n<r.length; n++){
oTABLE.children[0].replaceChild(dim[n][1], r[n]);
}
}
return func;
})();