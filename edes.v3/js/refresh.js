var refresh = {
sequence	: S.date("u")*1
,list		: []
,listLength	: 0
,timeout	: null
,flagShow	: null
,init: function(flagShow){
if( flagShow!=undefined ){
refresh.flagShow = S(flagShow).obj;
}
S(".ICON-FLAG OBJECT").each(function(k, ele){
var msc = ele.getAttributeNS(null, 'e-interval');
if( msc==null ){
msc = 60;
}
msc *= 1000;
refresh.list[k] = [msc, msc, ele, k, 0];
ele.onload = function(){
var  obj = this.contentDocument.children[0]
,eValue	= obj.getAttributeNS(null, 'e-value')
,eTarget= obj.getAttributeNS(null, 'e-target')
,eColor = obj.getAttributeNS(null, 'e-color')
,eLabel = obj.getAttributeNS(null, 'e-label')
,eSound = obj.getAttributeNS(null, 'e-sound')
,eFunction = obj.getAttributeNS(null, 'e-function')
;
obj.style.fill = eColor;
if( eTarget!=null ){
S(eTarget).obj.value = eValue;
S(eTarget).color(eColor);
if( eLabel!=null ){
S(eTarget).html(eLabel);
}
}
if( eSound!=null ){
S.sound(eSound);
}
if( eFunction!=null ){
let  para={}
,clave
,valor
,regex = /(\s|\t)e\-[a-zA-Z]{1,50}\=(["'])(.*?)(["'])/g
;
while( (grupo = regex.exec(obj.outerHTML))!==null ){
[clave, valor] = S.trim(grupo[0]).split("=");
para[clave] = S.mid(valor,1,-1);
}
window[eFunction](obj, para);
}
}
});
refresh.listLength = refresh.list.length;
refresh.exe();
}
,exe: function(){
var i, ele, tmp, refreshTotal=0;
if( refresh.flagShow!=null ){
refresh.flagShow.style.animation = "none";
refresh.flagShow.offsetHeight;
refresh.flagShow.style.animation = null;
}
for(i=0; i<refresh.listLength; i++){
if( refresh.list[i][0]>0 ){
continue;
}
refreshTotal++;
refresh.list[i][0] = refresh.list[i][1];
++refresh.list[i][4];
ele = refresh.list[i][2];
tmp = ele.data.split("&refresh");
ele.data = tmp[0]+"&refresh="+(++refresh.sequence);
}
let minTimeout = refresh.sort();
for(i=0; i<refresh.listLength; i++){
refresh.list[i][0] -= minTimeout;
}
refresh.timeout = setTimeout(function(){
refresh.exe();
}, minTimeout);
}
,sort: function(){
refresh.list.sort(function(a, b){
if( a[0]===b[0] ){
return 0;
}else{
return (a[0] < b[0]) ? -1 : 1;
}
});
return refresh.list[0][0];
}
,stop: function(){
if( refresh.timeout==null ){
return;
}
clearTimeout(refresh.timeout);
setTimeout(function(){
if( refresh.flagShow!=null ){
S(refresh.flagShow).class("+OFF").color("#dddddd");
}
for(let i=0; i<refresh.listLength; i++){
try {
refresh.list[i][2].contentDocument.children[0].style.fill = "#dddddd";
}catch(err){}
}
}, 1000);
}
,start: function(){
if( refresh.listLength==0 ){
refresh.init();
return;
}
for(let i=0; i<refresh.listLength; i++){
refresh.list[i][0] = 0;
}
if( refresh.flagShow!=null ){
S(refresh.flagShow).class("-OFF").color("");
}
refresh.exe();
}
}