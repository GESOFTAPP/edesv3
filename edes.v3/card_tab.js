function eCardResizeWin(){
if( S.windowIs(window) ){
S(window).windowResize();
setTimeout(function(){
S("#PROCESANDO",_WOPENER).none();
eCardResize();
}, 1);
}else{
eCardResize();
}
}
function eCardResize(DescontarScroll){
var log = false;
function __trace(dim, i, n){
if( !log ) return;
txt = "%";
if( dim[1]==n ) txt = "min";
if( dim[2]==n ) txt = "max";
text += " | "+i+": "+txt+" = "+S.round(n,0);
color = "green";
if( txt=="min" ) color = "blue";
if( txt=="max" ) color = "red";
S(card.dim[i]).css("border:1px solid "+color);
}
if(log){
var text=""; S("#search",top).none();S("#LOGODESKTOP",top).none();S("#iconoMenu",top).css("margin:0");S("#_MINIMIZEDWINDOWS",top).none();S(".USERDEFINITION",top).none();S("#STATELINE", top).visible();
}
S('.CARDBOX').none();
document.body.style.width = "100%";
var dbw = document.body.clientWidth;
S('.CARDBOX').block();
S(".BROWSE").none();
S(".ISubListBODY").css("display:inline-block, width:auto; overflow:scroll; white-space:nowrap;");
S(".ISubListBODY").css("width:100%");
S(".ISubListBODY").css("width:1");
S(".BROWSE").block("table");
var mH = 0, mW=0;
S(".card-td").each(function(k,o){
mW = Math.max(mW, o.offsetWidth);
mH = Math.max(mH, o.offsetHeight);
});
S(".card-td").css("width:"+(mW+2));
S(document.body).css("margin-left:0;margin-right:0");
S('.CARDBOX').none();
if( DescontarScroll==undefined ) DescontarScroll = 0;
var ePadding = S('.CARDBOX').attr("e-padding").split(','),
wBody = dbw-DescontarScroll-(S.windowIs(window)? 10:0),
card = S(".card"),
tCard = card.length,
sc = S.screen(window),
minWidth=[], maxWidth=[], prt=[], rowCard=[], nRow=0, dim=[],
nCard=[], prtRow=[], cardPorRow=[], fila,
i,p,dif, n=0,p, ini=0, op=0, o,
d = S(card.obj).css("border-left-width,padding-left,padding-top,padding-bottom"),
addWidthCard = d["border-left-width"]*2+d["padding-left"]*2,
delHeightCard = d["padding-top"]*1+d["padding-bottom"]*1+3,
colorLineSubList = S.ruleGet(window, ".BROWSE", "background-color");
for(n=0; n<ePadding.length; n++) ePadding[n] *= 1;
n = (ePadding[0]*100)/wBody;
if( n>ePadding[2] ) n = ePadding[2];
if( n<ePadding[1] ) n = ePadding[1];
S('.CARDBOX').css("display:flex; padding-left:"+n+"px; padding-right:0px; padding-top:"+n+"px; padding-bottom:"+n+"px");
wBody -= n;
ePadding[1] = n;
addWidthCard += n-1;
o = S(".card-foot");
if( o.length ){
S("#OpButtons").css("display:inline");
o.css("right:"+(n-5));
S('.CARDBOX').css("padding-bottom:"+(n+o.height())+"px");
}
S(".ISubListBODY").each(function(k,o){
if( o.id!="" ) o.style.borderRight = "1px solid "+colorLineSubList;
});
if(log) text = S.right(S.date("t"),3)+" | padd:"+ePadding[1]+" | body:"+wBody+" | Row:";
for(n=0; n<tCard; n++){
card.dim[n].style.marginRight = 0;
var o = card.dim[n],
pctw = o.getAttribute("eWidth")*1,
minw = o.getAttribute("eMinWidth")*1,
maxw = o.getAttribute("eMaxWidth")*1,
media;
S(o).css("margin-top:"+ePadding[1]+"px; margin-right:"+ePadding[1]+"px;");
if( pctw=="" ) pctw = 0;
if( maxw=="" ){
maxw = minw;
media = minw;
}else{
media = (minw+maxw)/2;
}
o.style.width = "auto";
o.style.height = "auto";
o.style.width = "1px";
o.style.height = "1px";
S("#OpButtons", o).css("padding-top:9");
dim[n] = [pctw, minw, maxw, media, S(o).width(), S(o).css("height"), 0, o.getAttribute("eUnique")];
}
nRow = 0;
sumaWidth = 0;
prtRow[0] = 0;
for(n=0; n<tCard; n++){
if( (sumaWidth+dim[n][1]+addWidthCard)>=wBody || dim[n][7]=="1" || (n>0 && dim[n-1][7]=="1") ){
nRow++;
sumaWidth = 0;
prtRow[nRow] = 0;
}
sumaWidth += dim[n][1]+addWidthCard;
prtRow[nRow] += dim[n][0];
rowCard[n] = nRow;
if( typeof(cardPorRow[nRow])=="undefined" ) cardPorRow[nRow] = 0;
cardPorRow[nRow]++;
p = S(".card-td I, .card-td IMG", card.dim[n]).length;
dim[n][6] = p;
if( p==0 ){
S(".card-td", card.dim[n]).none();
}
}
if(log) text += cardPorRow.join(",");
for(fila=0; fila<rowCard.length; fila++){
for(i=0; i<tCard; i++){
if( rowCard[i]==fila ){
descontar = addWidthCard*cardPorRow[fila];
if( cardPorRow[fila]==1 ){
if( (dim[i][2]+descontar)>wBody ){
n = wBody-descontar;
if( n<dim[i][1] ){
n = dim[i][1];
}else{
}
}else{
n = wBody-descontar;
if( n>dim[i][2] ){
n = dim[i][2];
}else if( n<dim[i][1] ){
n = dim[i][1];
}else{
}
if( dim[i][7]=="1" && (wBody-n-20)>0 ){
card.dim[i].style.marginRight = (wBody-n-20)+'px';
}
}
__trace(dim[i], i, n);
card.dim[i].style.width = n+"px";
if( S(".ISubListBODY", card.dim[i]).length ){
S(".ISubListBODY", card.dim[i]).css("width:"+(n-(dim[i][6]>0 ? addWidthCard:0)));
}
}else{
var minWidth = descontar,
maxWidth = descontar,
repartir,
maxHeight = 0,
memWidth = [];
for(p=0; p<tCard; p++){
if( rowCard[p]==fila ){
n = dim[p][1];
minWidth += n;
maxWidth += dim[p][2];
i = p;
memWidth[p] = n;
maxHeight = Math.max(maxHeight, S(card.dim[p]).css("height"));
}
}
if( maxWidth<wBody ){
for(p=0; p<tCard; p++){
if( rowCard[p]==fila ){
n = dim[p][2];
memWidth[p] = n;
}
}
}else if( minWidth<wBody ){
repartir = maxWidth-minWidth;
if( (wBody-minWidth)<repartir ){
repartir = (wBody-minWidth-1);
}
dif = repartir/(maxWidth-minWidth);
for(p=0; p<tCard; p++){
if( rowCard[p]==fila ){
n = (dim[p][2]-dim[p][1])*dif;
memWidth[p] = (dim[p][1]+n);
}
}
}
for(p=0; p<tCard; p++) if( rowCard[p]==fila ){
__trace(dim[p], p, memWidth[p]);
card.dim[p].style.width = memWidth[p]+"px";
S(card.dim[p]).css("height:"+(maxHeight-19));
if( S(card.dim[p]).css("height")<maxHeight ){
S(card.dim[p]).css("height:"+(maxHeight+1));
}
if( S(".ISubListBODY", card.dim[p]).length ){
S(".ISubListBODY", card.dim[p]).css("width:"+(memWidth[p]-(dim[p][6]>0 ? addWidthCard:0)));
}
}
}
}
}
}
if( S("#OpButtons").length ){
n = S(card.dim[tCard-1]).css("height")-S("#OpButtons").css("height")-(S("#OpButtons").xy().y-S(card.dim[tCard-1]).xy().y)+S(card.dim[tCard-1]).css("paddingBottom");
S("#OpButtons").css("marginTop", n);
}
if( DescontarScroll==0 && sc.cw!=sc.ow ){
document.body.onresize = null;
eCardResize(top._ScrollWidth*1);
setTimeout(function(){
document.body.onresize = function(){eCardResize();}
}, 1);
}
if(log){
console.log(text);
S("#STATELINE", top).html(text);
}
}