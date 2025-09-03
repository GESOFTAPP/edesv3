function eEvent(){
return S.event(window);
}
function eEventClear(){
return S.eventClear(window);
}
var W	= window,
WE	= top,
WO	= window.open,
DB	= document.body,
DGT	= document.getElementsByTagName,
_WType = 1;
function eTrim( txt ){
txt = txt.replace(/^\s+/g,'').replace(/\s+$/g,'').replace(/\s+\s+/g,' ');
return txt.replace(String.fromCharCode(0),'').replace(String.fromCharCode(13),'').replace(String.fromCharCode(10),'');
}
function Trim(x){ return eTrim(x); }
String.prototype.trim = function(){
return this.replace(/^\s+|\s+$/g,'').replace(/\s+\s+/g,' ');
}
function eClearEvent(men){
try{
S.eventClear(window);
if( null!=men ) top.eAlert(S.lng(209), S.lng(216), 'A', 'W');
}catch(e){}
return false;
}
function AnulaKey(m){ return eClearEvent(m); }
function _3CXClear(){
setTimeout(function(){
S("tcxspan").each(function(k,o){
o.outerHTML = o.innerText;
});
}, 1000);
}
var n=0,
_yHOrigen, _yEOrigen, _xVOrigen,
_ColorOrigen = '',
_cDeslizante = 0,
_visibleRowsScreen = null;
var _OkChange = null;
function Cerrar(){
var txt = "";
if( _OkChange!=null ){
S("body").visible();
txt = S.lng(199);
window.event.returnValue = txt;
}
return txt;
}
function eLoading(on){
S.loading(window, on);
}
var _secondsKeyLast = S.date("u")*1;
function _MovBody(){
if( !_MAXRECFULL && (S.date("u")*1)<(_secondsKeyLast+250) ){
return S.eventClear(window);
}
_secondsKeyLast = S.date("u")*1;
if( S(":HASTA").length ){
let oTABLE = S.toTag(S.event(window.event),"TABLE");
if( oTABLE && (oTABLE.id=="oDESDE_TABLE" || oTABLE.id=="oMAXREC_TABLE") ){
return true;
}
Paginar((window.event.wheelDelta<0) ? '>' : '<');
return S.eventClear(window);
}
if( !S.toTag(S.event(window.event), "TABLE", "=id=BROWSE") ){
return;
}
PaginarRueda();
}
function _MovTitulos(){
setTimeout('MovTitulos();', 250);
}
var _InScroll=null, _IniMovTitulos=false;
function MovTitulos(){
if( _ModeCard || DGI('TablaTH')==null || S("#BROWSE").attr("eCard")==1 ){
return;
}
if( document.body.style.visibility=="hidden" ){
setTimeout('MovTitulos(1);',10);
return;
}
if( !_IniMovTitulos ){
TitulosON();
_IniMovTitulos = true;
}
if( S("#TablaTH").obj.offsetWidth>0 && (S("#BROWSE").obj.offsetWidth!=S("#TablaTH").obj.children[0].offsetWidth || S.xy(DGI("TablaTH")).x!=S.xy(DGI("BROWSE")).x) ){
S("#TablaTH").obj.innerHTML = S("#TablaTV").obj.innerHTML = S("#TablaTE").obj.innerHTML = "";
TitulosON();
}
clearTimeout(_InScroll);
_InScroll = setTimeout(function(){
_RecalcHeaderSlide();
}, 1);
}
function _RecalcHeaderSlide(){
var i,Obj;
if( document.body.getAttribute("DimScroll")!=null ){
for(i in document.body.DimScroll){
if( document.body.DimScroll[i]!=null ){
Obj = document.body.DimScroll[i];
if( Obj.sourceIndex==0 ) continue;
with( Obj.style ){
left = document.body.scrollLeft+Obj.xOffset;
top = document.body.scrollTop+Obj.yOffset;
}
}
}
}
var TablaTH = DGI('TablaTH');
if( TablaTH==null ) return;
var x = 1, el = DGI('BROWSE'),
sa = S(el).css("borderLeftWidth"),
Alto = el.offsetHeight;
if( (sa+"").indexOf('px')>-1 ) x = parseInt(sa);
if( el==null ) return;
while( el!=null ){
x += el.offsetLeft;
el = el.offsetParent;
}
TablaTH.style.left = (x-1)+"px";
var s = S.scrollGet(document.body);
if( _yHOrigen<s["scrollTop"] && _yHOrigen+Alto-TablaTH.offsetHeight>s["scrollTop"] ){
TablaTH.style.display = 'block';
TablaTH.style.top  = (s["scrollTop"]-1)+"px";
setTimeout(function(){
DGI('TablaTH').style.top = (s["scrollTop"]-1)+"px";
}, 250 );
}else{
TablaTH.style.display = 'none';
}
if( _PagIncremental && document.body.scrollHeight>document.body.clientHeight && DGI("DESDE").value<DGI("HASTA").value ){
var _NumScreen = 1.5,
Medida = s["scrollTop"] + (document.body.clientHeight*_NumScreen);
if( Medida>document.body.scrollHeight && top.eReadyState(top.TLF) ) Paginar(">",1);
}
if( _cDeslizante==0 ) return;
TablaTE.style.left = TablaTV.style.left = x+"px";
if( _xVOrigen<s["scrollLeft"] ){
TablaTV.style.display = 'block';
TablaTV.style.left = s["scrollLeft"]+"px";
}else{
TablaTV.style.display = 'none';
}
if( _yEOrigen<s["scrollTop"] ){
TablaTE.style.display = 'block';
TablaTE.style.top = (s["scrollTop"]-1)+"px";
if( _xVOrigen<s["scrollLeft"] ){
TablaTE.style.left = s["scrollLeft"]+"px";
}else{
TablaTE.style.display = 'none';
}
}else if( _xVOrigen<s["scrollLeft"] ){
with( TablaTE.style ){
display = 'block';
top  = (_yHOrigen+((parseInt(S("#BROWSE.AltoTH"))==0)? 0:0))+"px";
left = s["scrollLeft"]+"px";
}
}else{
TablaTE.style.display = 'none';
}
var dTE = S("#TablaTH TABLE TH").dim;
S("#BROWSE TH[nc]").each(function(k,o){
if( _cDeslizante>k ){
dTE[k].style.width = px(o.offsetWidth);
}else return null;
});
}
function _SCOnclick(){
var Obj=S.event(window), p, Des=0;
if( _MAXRECFULL && DGI('MAXREC')!=null ){
var MaxRec = DGI('MAXREC').value*1,
Desde = DGI('DESDE').value*1;
Des = (Desde-1)*MaxRec;
}
if( Obj.tagName=='IMG' && Obj.src.indexOf('l_order.')>-1 ){
var Sumar = S.toTag(Obj,'DIV').SlideCol;
Obj = Obj.parentNode;
if( _SortList==Obj.cellIndex+Sumar ){
p = Obj.parentNode.rowIndex+1+(S("#BROWSE.AltoTH")*1)+Des;
S(DGI("BROWSE").rows[p].cells[_SortList].children[0]).eventFire("click");
}
return eClearEvent();
}
if( Obj.tagName=='TD' ){
p = Obj.parentNode.rowIndex;
S(S("#BROWSE TBODY TR").dim[p].cells[0]).eventFire("click");
}
return eClearEvent();
}
function _SCTHOnclick(){
var Obj=S.event(window);
if( /^(IMG|I|SPAN)$/.test(Obj.tagName) ) Obj = Obj.parentNode;
if( Obj.tagName!='TH' || _NOSORT ) return;
var eObj = DGI("BROWSE").rows[Obj.parentNode.rowIndex].cells[Obj.cellIndex],
ctrl = window.event && (window.event.ctrlKey || window.event.altKey);
_SortTD = eObj;
SePulso();
setTimeout(function(){
var sortAsc = !S.is("underline",S(eObj).css("textDecoration")),
type = S(eObj).attr("TD");
if( !type ){
S("#PROCESANDO",window).none();
return;
}else if( type[0]=="-" || type[0]=="+" ){
type = "N";
}else if( type=="F4" ){
type = "D";
}else if( type=="P4" ){
type = "P";
}else{
type = "S";
}
S("#BROWSE").sort(S(eObj).attr("nc"), type, sortAsc?"asc":"desc", ctrl);
S("#PROCESANDO",window).none();
}, 1);
return eClearEvent();
}
function _RecalcSlideTH(){
var Origen = DGI("BROWSE"),
Destino = DGI('TablaTH');
if( Origen==null || Destino==null || Destino.children.length==0 ) return;
if( Destino.children.length==0 ) return;
var oAltoTH = S(Origen).attr("AltoTH")*1, i,n;
Destino.style.width = px(Origen.offsetWidth);
for(i=0; i<=oAltoTH; i++){
for(n=0; n<Origen.rows[i].cells.length; n++){
if( Origen.rows[i].cells[n].offsetWidth>0 ){
Destino.children[0].rows[i].cells[n].style.width = "1px";
Destino.children[0].rows[i].cells[n].style.width = px(Origen.rows[i].cells[n].offsetWidth - 4);
}
}
}
Destino.children[0].style.width = Destino.style.width = px(Origen.offsetWidth);
var x = 1, el = Origen,
sa = S(Origen).css("borderLeftWidth");
x = parseInt(sa);
while( el!=null ){
x += el.offsetLeft;
el = el.offsetParent;
}
Destino.style.left = px(x);
}
function TitulosON(){
var Origen = DGI("BROWSE");
if( Origen==null ) return;
var oAltoTH = S(Origen).attr("AltoTH")*1,
classBrowse = DGI("BROWSE").className;
var Destino = document.getElementById('TablaTH');
Destino.innerHTML = '<table onclick="_SCTHOnclick()" AltoTH='+oAltoTH+' class="'+classBrowse+'" cellspacing=0px cellpadding=0px border=0px style="display:table;width:auto;">' +
Origen.children[0].outerHTML +
Origen.children[1].outerHTML +
'</table>';
Destino.children[0].id = "";
with( Destino.children[0].style ){
borderTop	 = '0px solid '+S(Origen).css("backgroundColor");
borderBottom = '0px solid '+S(Origen).css("backgroundColor");
}
var x = 1; y = 0, el = Origen;
while( el!=null ){
y += el.offsetTop;
x += el.offsetLeft;
el = el.offsetParent;
}
_yHOrigen = y;
with( Destino.style ){
width	= Origen.offsetWidth+"px";
top		= _yHOrigen+"px";
left	= x+"px";
display = "block";
}
var i,n,w,padding=0;
for(i=0; i<=oAltoTH; i++) for(n=0; n<Origen.rows[i].cells.length; n++){
w = S(Origen.rows[i].cells[n]).css("width");
if( w>0 && S(Origen.rows[i].cells[n]).attr("NC")!="" ){
if( padding==0 ){
padding = S(Origen.rows[i].cells[n]).cssVal("paddingLeft")+S(Origen.rows[i].cells[n]).cssVal("paddingRight");
}
w -= padding;
S(Destino.children[0].rows[i].cells[n]).attr("NC", S(Origen.rows[i].cells[n]).attr("NC"));
S(Destino.children[0].rows[i].cells[n]).attr("pCS", S(Origen.rows[i].cells[n]).attr("pCS"));
if( _RD ){
with( Destino.children[0].rows[i].cells[n] ){
onmousemove = _RDCursorOver;
onmouseleave = _RDCursorOut;
onmousedown = _RDDown;
}
}
}
}
S("TH", S(".BROWSE").dim[0]).each(function(k,o){
S("TH", S(".BROWSE").dim[1]).dim[k].style.maxWidth="auto";
S("TH", S(".BROWSE").dim[1]).dim[k].style.width=S(o).css("width")+"px";
});
Destino.style.display = "none";
_xVOrigen = Origen.offsetLeft + Origen.offsetLeft + 3;
if( _cDeslizante==0 ){
document.body.onscroll = MovTitulos;
return;
}
var DimCol = new Array(),
pRow = oAltoTH+1,
nc=0, sId, n, txt = '<table class="'+classBrowse+' style="display:table;width:auto;">';
if( Origen.rows[pRow] ){
for(n=oAltoTH+1; n<Origen.rows.length; n++){
if( Origen.rows[n].offsetHeight>0 ){
pRow = n;
break;
}
}
for(n=0; n<Origen.rows[pRow].cells.length; n++){
if( Origen.rows[pRow].cells[n].offsetWidth>0 ) DimCol[DimCol.length] = n;
}
}
if( DimCol.length<_cDeslizante ) _cDeslizante = DimCol.length;
var Destino = document.getElementById('TablaTV');
for(n=0; n<_cDeslizante; n++){
sId = Origen.children[0].children[DimCol[n]].id;
if( sId!='' ) sId = ' id='+sId;
txt += Origen.children[0].children[DimCol[n]].outerHTML;
}
Destino.innerHTML = txt+'</table>';
try{
Destino.SlideCol = DimCol[0];
}catch(e){
Destino.SlideCol = -1;
}
nc = y - 1 + Origen.rows[0].offsetHeight+3;
if( oAltoTH==1 ) nc += Origen.rows[1].offsetHeight+1;
Destino.style.top = (nc-1)+"px";
Destino.style.left = _xVOrigen+"px";
var  no, NewTR, td, menosAlto=(_ListTypeFormat=="S"?1:0)
,totalRows = Origen.rows.length;
Destino = Destino.children[0];
padding = 0;
for(n=1+oAltoTH; n<totalRows; n++){
no = n-oAltoTH;
NewTR = Destino.insertRow(no-1);
if( Origen.rows[n].getAttribute("eMark")!=null ) NewTR.setAttribute("eMark",0);
if( Origen.rows[n].offsetHeight==0 ) NewTR.style.display="none";
for(nc=0; nc<_cDeslizante; nc++){
if( nc>=DimCol[nc] ){
td = Origen.rows[n].cells[DimCol[nc]];
NewTR.insertCell();
with( NewTR ){
cells[nc].innerHTML = td.innerHTML;
cells[nc].style.width = (td.offsetWidth-padding)+"px";
cells[nc].style.height = (td.offsetHeight-padding-menosAlto)+"px";
cells[nc].id = td.id;
cells[nc].style.display = "table-cell";
}
}
}
if( Origen.rows[n].id!='' ) NewTR.id = Origen.rows[n].id;
if( S(Origen.rows[n]).css("color") ) NewTR.style.color = S(Origen.rows[n]).css("color");
if( S(Origen.rows[n]).css("backgroundColor")!="" && S(Origen.rows[n]).css("backgroundColor")!='transparent' ) NewTR.style.backgroundColor = S(Origen.rows[n]).css("backgroundColor");
if( Origen.rows[n].className!='' ) NewTR.className = Origen.rows[n].className;
}
Destino.onmouseover = DGI("BROWSE").onmouseover;
Destino.onmouseout = DGI("BROWSE").onmouseout;
if( DGI("BROWSE").onclick!=null ) Destino.onclick = _SCOnclick;
var Destino = document.getElementById('TablaTE');
Destino.innerHTML = '';
Destino.innerHTML = '<table onclick="_SCTHOnclick()" class="'+classBrowse+' style="display:table;width:auto;">' +
Origen.children[0].outerHTML +
Origen.children[1].outerHTML +
'</table>';
for(n=0; n<=oAltoTH; n++){
no = 0;
for(nc=0; nc<Origen.rows[n].cells.length; nc++){
td = Destino.children[0].rows[n].cells[nc];
if( n==0 && no>=_cDeslizante ){
td.style.display = 'none';
}else if( td.getAttribute("nc")*1>=_cDeslizante ){
td.style.display = 'none';
}else if( Origen.rows[n].cells[nc].offsetWidth>padding ){
td.style.display = "table-cell";
td.style.width = (Origen.rows[n].cells[nc].offsetWidth-padding)+"px";
td.style.height = (Origen.rows[n].cells[nc].offsetHeight-padding)+"px";
td.style.textDecoration = Origen.rows[n].cells[nc].style.textDecoration;
S(td).attr("NC", S(Origen.rows[n].cells[nc]).attr("NC"));
}
no += (td.colSpan||1);
}
}
_yEOrigen = y;
if( oAltoTH==1 ) _yEOrigen += Origen.rows[2].offsetHeight + 2;
Destino.style.top = (_yEOrigen + Origen.clientTop)+"px";
Destino.style.left = (Origen.parentNode.offsetLeft + Origen.offsetLeft)+"px";
TablaTH.style.display = TablaTV.style.display = TablaTE.style.display = 'table';
TablaTV.style.width = TablaTV.offsetWidth+"px";
TablaTE.style.width = TablaTV.offsetWidth+"px";
TablaTH.style.display = TablaTV.style.display = TablaTE.style.display = 'none';
}
function eSlideColRefres(){
}
var _SeVeTH, _SeVeTV, _SeVeTE,
_SeVeI, _SeVeL;
function AntesPrint(){
DGI("BROWSE").sBackground = S(document.body).css("backgroundColor");
DGI("BROWSE").sFilter = S(document.body).css("filter");
DGI("BROWSE").sWidth = S("#BROWSE").obj.style.width;
document.body.style.backgroundColor = '#FFFFFF';
document.body.style.filter = '';
if( DGI("BROWSE").sWidth.indexOf("%")>-1 ) S("#BROWSE").css("width:auto");
if( DGI("GRILL")!=null ){
if( window.name=='IWORK' ) top.DGI("LogoEDes").style.display = 'none';
DGI("GRILL").style.backgroundColor = '#FFFFFF';
if( DGI("GRILL").offsetWidth>790 ) DGI("GRILL").style.zoom = 780/DGI("GRILL").offsetWidth;
backgroundColor = '#FFFFFF';
if( window.ChartPrint!=undefined ) ChartPrint(true);
}
_PAGROTATE = false;
var _yHOJA = ((_PAGROTATE) ? 890:1285) - parseInt(document.body.style.marginTop) - parseInt(document.body.style.marginBottom);
var xTop = parseInt(DGI("BROWSE").rows[0].offsetHeight);
if( parseInt(S("#BROWSE.AltoTH"))==1 ) xTop += parseInt(DGI("BROWSE").rows[1].offsetHeight) + parseInt(DGI("BROWSE").cellSpacing) + parseInt(DGI("BROWSE").cellPadding);
var xTR = ( DGI("BROWSE").rows.length>(parseInt(S("#BROWSE.AltoTH"))+1) ) ? parseInt(DGI("BROWSE").rows[parseInt(S("#BROWSE.AltoTH"))+1].offsetHeight) + parseInt(DGI("BROWSE").cellSpacing) + parseInt(DGI("BROWSE").cellPadding) : 0,
y = parseInt(document.body.style.marginTop)*-1,
el = DGI("BROWSE").rows[0];
while( el!=null ){
y += el.offsetTop;
el = el.offsetParent;
}
var Ini = Math.floor( ( _yHOJA - y - xTop ) / xTR )-1,
Cada = Math.floor( ( _yHOJA - xTop ) / xTR )-1;
if( !_PAGROTATE ) Ini--;
if( !_MAXRECFULL ){
for( var i=Ini; i<DGI("BROWSE").rows.length; i+=Cada ){
var r = DGI("BROWSE").insertRow(i);
r.style.pageBreakBefore = 'always';
r.tmp = 1;
var o = S(DGI("BROWSE").rows[0]).nodeCopy(),
n = S(r).html(S(o.obj).html()).obj;
n.tmp = 1;
if( parseInt(S("#BROWSE.AltoTH"))==1 ){
var r = DGI("BROWSE").insertRow(i+1);
r.tmp = 1;
var o = S(DGI("BROWSE").rows[1]).nodeCopy(),
n = S(r).html(S(o.obj).html()).obj;
n.tmp = 1;
}
}
}
_SeVeTH = TablaTH.style.display;
_SeVeTV = TablaTV.style.display;
_SeVeTE = TablaTE.style.display;
if(DGI("UtilList")!=null) _SeVeL = DGI("UtilList").style.display;
if(DGI("UtilListICO")!=null) _SeVeI = DGI("UtilListICO").style.display;
if(DGI("UtilListICO")!=null) DGI("UtilListICO").style.display = 'none';
if(DGI("UtilList")!=null) DGI("UtilList").style.display = 'none';
TablaTH.style.display = TablaTV.style.display = TablaTE.style.display = 'none';
}
function ResetPrint(){
}
function DespuesPrint(){
if( !_MAXRECFULL ){
for(var i=DGI("BROWSE").rows.length-1; i>1; i--) if( DGI("BROWSE").rows[i].tmp==1 ) DGI("BROWSE").deleteRow(i);
}
TablaTH.style.display = _SeVeTH;
TablaTV.style.display = _SeVeTV;
TablaTE.style.display = _SeVeTE;
if(DGI("UtilList")!=null) DGI("UtilList").style.display = _SeVeL;
if(DGI("UtilListICO")!=null) DGI("UtilListICO").style.display = _SeVeI;
document.body.style.background = DGI("BROWSE").sBackground;
document.body.style.filter = DGI("BROWSE").sFilter;
S("#BROWSE").css("width:"+DGI("BROWSE").sWidth);
if( DGI('GRILL')!=null ){
if( window.name=='IWORK' ) top.DGI("LogoEDes").style.display = 'block';
DGI("GRILL").style.backgroundColor = 'transparent';
DGI("GRILL").style.zoom = 1;
if( window.ChartPrint!=undefined ) ChartPrint(false);
}
}
function _Imprimir(v){
top.eAlertHide();
if( v==-1 ) return;
if( _LogImprimir!=undefined && DGI("BROWSE")!=null ){
var Titulo = (DGI('GROUPTITLE')!=null) ? DGI('GROUPTITLE').outerHTML : '',
TituloTxt = (DGI('GROUPTITLE')!=null) ? DGI('GROUPTITLE').textContent : '';
S.call('edes.php?E:$logprint.php', {'_TITULO':Titulo, '_TITULOTXT':TituloTxt, '_TREG':DGI("BROWSE").rows.length-1-S("#BROWSE.AltoTH"), '_IMPRIMIR':DGI("BROWSE").outerHTML});
}
var _A4Width = top._FIELDS["_A4Width"]*1, o, ancho,
_A4Height = top._FIELDS["_A4Height"]*1,
body = S("body"),
cBody = body.css("background-color"),
textAlignBody = body.css("text-align"),
oPAGINA = S("#PAGINA"),
bak = oPAGINA.css("text-align,background-color"),
wCONTENEDOR = S("#CONTENEDOR").css("width"),
wPAGINA = S("#PAGINA").css("width");
body.css("background-color:#ffffff");
oPAGINA.css("text-align:left;background-color:#ffffff");
S("#CONTENEDOR").css("width:1");
S("#PAGINA").css("width:1;margin-left:2");
body.css("text-align:left");
ancho = oPAGINA.obj.offsetWidth;
if( (ancho+20)>_A4Width ) oPAGINA.css("zoom", _A4Width/(ancho+20));
o = S("<span style='position:absolute;left:0px;top:0px;display:block;height:"+_A4Height+"px;width:"+_A4Width+"px;border:1px solid transparent;'></span>").nodeStart("body");
window.focus();
window.print();
window.focus();
S("#CONTENEDOR").css("width",wCONTENEDOR);
oPAGINA.css("width:"+wPAGINA+"text-align:"+bak["text-align"]+";background-color:"+bak["background-color"]);
body.css("text-align",textAlignBody);
S(o).nodeRemove();
body.css("background-color:"+cBody);
oPAGINA.css("zoom", 1);
return;
}
function Imprimir(){
top.eAlert(S.lng(209), S.lng(218), 'A,C', 'P', _Imprimir);
}
function eDelHelp(){
if( null!=top.eDelHelp ) top.eDelHelp();
}
eDelHelp();
window.onblur = eDelHelp;
function WidthSubTitle(){
}
function CondicionesLeft(){
try{
if( window.name=='_SUBLISTADO' ){
_WOPENER.DGI('_Div_SUBLISTADO').style.display = 'none';
}else{
}
}catch(e){}
}
function PaginationBarCalc(withFilter=false){
function insertaTr(tabla, pos, val){
var oTR = tabla.insertRow(pos);
oTR.insertCell().innerText = val;
oTR.insertCell().innerText = val;
}
var oPB = S(".PaginationBar");
if( !oPB.length ){
return;
}
if( S(":oMAXREC").val()=="" ){
S(":oMAXREC").val(S("#oDESDE_TABLE").obj.rows.length);
}
var txt="", n,
DesdeList = DGI("DESDE").value,
pagActual = DesdeList,
PagMultiploDe = 5,
TotalFilas = DGI("HASTA").getAttribute("TREG")*1,
TPaginas = DGI("HASTA").getAttribute("TPAG")*1,
PrimerBoton = Math.ceil((pagActual/PagMultiploDe)-1)*PagMultiploDe+1,
UltimoBoton = PrimerBoton+PagMultiploDe-1,
TPaginas = Math.ceil(TotalFilas/(S(":oMAXREC").val()*1));
if( UltimoBoton>TPaginas ) UltimoBoton = TPaginas;
S(":HASTA").attr("TPAG", TPaginas);
if( TPaginas>0 ){
if( PrimerBoton>1 ){
n = PrimerBoton-1;
if( n<1 ) n=1;
txt += "<span class='ButtonIn ROUNDED2 NoRight' eGroup='"+n+"'>...</span>";
}
for(n=PrimerBoton; n<=UltimoBoton; n++){
txt += "<span class='ButtonIn ROUNDED2";
if( pagActual==n ) txt += " Activated";
if( PrimerBoton==n && n==1 ) txt += " NoRight";
else if( TPaginas==n ) txt += " NoLeft";
else txt += " NoCenter";
txt += "'>"+n+"</span>";
}
if( UltimoBoton<TPaginas ){
n = UltimoBoton+1;
if( n>TPaginas) n = TPaginas;
txt += "<span class='ButtonIn ROUNDED2 NoLeft' eGroup='"+n+"'>...</span>";
}
S("#PaginationBarBT").block().html(txt);
}else{
pagActual = 0;
TPaginas = 0;
S("#PaginationBarBT").none();
}
var tabla = S("#oDESDE_TABLE").obj,
tr = tabla.rows, ntr=tr.length, total=TPaginas, n,i, borrar, oTR, oTD;
if( ntr<total ){
for(n=ntr+1; n<=total; n++){
oTR = tabla.insertRow();
oTR.innerHTML = `<td>${n}</td><td>${n}</td>`;
}
}else if( ntr>total ){
borrar = ntr-total;
for(n=0; n<borrar; n++){
tabla.deleteRow(total);
}
}
withFilter = ( S("#filterTR").length && S("#filterTR").val()!="" );
S(".Button .ButtonIn[eSelectSpan]").css("color:"+(withFilter ? "red" : ""));
tabla = S("#oMAXREC_TABLE").obj;
tr = tabla.rows;
total = tr.length;
for(n=0; n<total; n++){
i = tr[n].cells[0].innerText*1;
if( n==0 && _VisibleRows<i ){
insertaTr(tabla, 0, _VisibleRows);
break;
}else if( _VisibleRows==i ){
break;
}else if( n>0 && _VisibleRows<i ){
insertaTr(tabla, n, _VisibleRows);
break;
}
}
S(".PaginationBar").obj.children[6].children[0].children[0].textContent = _VisibleRows;
if( pagActual<=1 )	S("#PaginationBarIZ").class("=ButtonInNO OFF ROUNDED2 NoRight MasMargin");
else 				S("#PaginationBarIZ").class("=ButtonIn ROUNDED2 NoRight MasMargin");
if( TPaginas==pagActual )	S("#PaginationBarDR").class("=ButtonInNO OFF ROUNDED2 NoLeft MasMargin");
else						S("#PaginationBarDR").class("=ButtonIn ROUNDED2 NoLeft MasMargin");
S(".Button SPAN[eSelectSpan='oDESDE'] SPAN").text(pagActual);
S(".Button[eSelectSpan='oMAXREC']").class("-OFF");
if( TPaginas==1 ){
for(n=0; n<5; n++) S(S(".PaginationBar").obj.children[n]).none();
}else if( TPaginas==0 ){
S(".Button[eSelectSpan='oMAXREC']").class("+OFF");
}else{
for(n=0; n<5; n++) S(S(".PaginationBar").obj.children[n]).display("inline-flex");
}
if( TPaginas>0 ){
if( _visibleRowsScreen==null ) _visibleRowsScreen = 0;
let  tmp = [5,10,25,50,100,500,1000, TotalFilas, _VisibleRows, _visibleRowsScreen].sort((a, b) => a - b), txt="", i
,dim = tmp.filter((item,index)=>{
return tmp.indexOf(item) === index;
});
for(i of dim){
if( i==0 ) continue;
if( i>TotalFilas ) break;
actual = _VisibleRows==i ? ' class="SELECTED"' : '';
if( actual=="" ){
actual = i>1000 && i==TotalFilas ? ' class="NoSelected"' : '';
}
txt += `<tr${actual}><td>${i}</td><td>${i}</td>`;
if( i==TotalFilas ) break;
}
S("#oMAXREC_TABLE").html(txt);
}
var d = S.screen(window);
if( d.h < d.y ){
S.scrollSet(document.body, 0);
}
if( !_MAXRECFULL ) return;
let oBar = S(".PaginationBar"),
eFixed = oBar.attr("e-fixed");
if( eFixed==null || eFixed!=_VisibleRows ){
if( eFixed!=null ){
oBar.css("position:inherit");
}
if( S.scrollStatus(window)[1]<=0 ){
let xy = oBar.xy();
oBar.css(`position:fixed; left:${xy.x}px; top:${xy.y}px`);
}
oBar.attr("e-fixed", _VisibleRows);
}
}
function _CalcPaginacion(){
if( window.name=="TLF" ) return;
var  nMaxRec = DGI('MAXREC')
,AltoTH = S("#BROWSE.AltoTH")*1, max, tr, trs, zocalo=0
,oPB = S(".PaginationBar");
if( DGI("DESDE")!=null && _MaxVisibleRows>0 && S(":DESDE").attr("NREG")==1 ){
if( !(nMaxRec!=null && nMaxRec.value!='') ){
_VisibleRows = DGI("BROWSE").rows.length+AltoTH;
if( _VisibleRows>=DGI("BROWSE").rows.length ){
_VisibleRows = DGI("BROWSE").rows.length-1;
}
tr = AltoTH+_MaxVisibleRows;
if( tr>_VisibleRows ) tr = _VisibleRows;
if( S(".MENUFOOTLIST").length ){
zocalo = S(".MENUFOOTLIST").obj.offsetHeight;
}
if( oPB.length ){
zocalo = oPB.obj.offsetHeight+oPB.css("margin-top")+oPB.css("margin-bottom")-5;
}
var xy = S.xy(S("#BROWSE").obj),
oCheck = S("#ToolsPaginate").obj,
xy2;
if( oCheck==null ){
oCheck = DGI("BROWSE");
}else{
xy2 = S.xy(oCheck);
if( xy2.t>xy.t ){
xy = xy2;
}else{
oCheck = DGI("BROWSE");
}
}
while( (S.screen(window).h-zocalo)<(xy.t+xy.h) && tr>0 ){
DGI("BROWSE").rows[tr].style.display = 'none';
if( _cDeslizante>0 && DGI("TablaTV").children.length>0 ){
DGI("TablaTV").children[0].rows[tr].style.display = 'none';
}
tr--;
xy = S.xy(oCheck);
}
trs = S("#BROWSE TR");
while( trs.dim[tr].offsetHeight==0 ) tr--;
_VisibleRows = tr-AltoTH;
if( _VisibleRows<=0 ){
_VisibleRows = 1;
if( trs.dim.length>(_VisibleRows+AltoTH) ){
trs.dim[_VisibleRows+AltoTH].style.display = "";
}
}
max = Math.ceil(_TotalRec/_VisibleRows);
if( DGI('_Pie2')!=null ) DGI('_Pie2').textContent = max;
DGI("HASTA").value = max;
DGI("HASTA").setAttribute("TPAG", max);
DGI('DESDE').value = 1;
DGI('DESDE').setAttribute("OldValue", 0);
DGI('DESDE')["OldValue"] = 0;
if( nMaxRec!=null && nMaxRec.value=='' ){
DGI('MAXREC').value = _VisibleRows;
}
DGI("BROWSE").setAttribute("vDesde", AltoTH+1);
DGI("BROWSE").setAttribute("vHasta", _VisibleRows+AltoTH);
if( _visibleRowsScreen==null ){
_visibleRowsScreen = _VisibleRows;
}
if( DGI('oHASTA')!=null ){
DGI("oHASTA").value = max;
DGI("oHASTA").setAttribute("TPAG", max);
DGI("oMAXREC").value = _VisibleRows;
}
try{ document.body.focus(); }catch(e){}
if( oPB.length ){
PaginationBarCalc();
if( _MAXRECFULL ){
if( !S.pagination("", "start", _VisibleRows) ){
return;
}
}
}
if( S(".CONTENEDORCARD").length ){
S(".CONTENEDORCARD .card").each(function(k,o){
if( k>=_VisibleRows ){
o.style.display = "none";
}
});
}
}
}else{
if( nMaxRec!=null && nMaxRec.value=='' ){
DGI('MAXREC').value = _VisibleRows;
if( DGI('oMAXREC')!=null ){
DGI("oMAXREC").value = _VisibleRows;
}
if( DGI('_Pie2')!=null ){
max = Math.ceil(_TotalRec/_VisibleRows);
DGI('_Pie2').textContent = DGI("HASTA").value = max;
DGI("HASTA").setAttribute("TPAG", max);
if( DGI('oHASTA')!=null ){
DGI("oHASTA").value = max;
DGI("oHASTA").setAttribute("TPAG", max);
}
}
}else{
if( DGI('MAXREC')!=null ){
_VisibleRows = DGI('MAXREC').value*1;
PaginationBarCalc();
}else{
_VisibleRows = DGI("BROWSE").rows.length-1;
}
}
}
CondicionesLeft();
}
var _iAncho = _iAlto = 0;
function _DocHeight(){
var d = document;
return Math.max(d.body.scrollHeight, d.documentElement.scrollHeight, d.body.offsetHeight, d.documentElement.offsetHeight, d.body.clientHeight, d.documentElement.clientHeight);
}
function _DocWidth(){
var d = document;
return Math.max(d.body.scrollWidth, d.documentElement.scrollWidth, d.body.offsetWidth, d.documentElement.offsetWidth, d.body.clientWidth, d.documentElement.clientWidth);
}
function _Recalcula(Tipo, FijarY, nView){
var n;
if(_NOTITLE) PAGINA.style.padding = '0px 0px 0px 0px';
if( S(window).windowIs() ){
try{ if( _WinCaption ) document.body.style.backgroundImage=""; }catch(e){}
if( S(window.frameElement).attr("eNORESIZE")!=undefined && S(window.frameElement).attr("eNORESIZE") ){
S(document.body).visible();
S.loading(window, false);
return;
}
if( _AutoSize[0]!=0 ){
S(window).windowResize(_AutoSize[0], _AutoSize[1], true);
if( _AutoSize[2] ) S("body").css("overflow:scroll");
if( _AutoSize[3]!="" ) S(window).windowCaption(_AutoSize[3]);
S(document.body).visible();
S.loading(window, false);
return;
}else if( window.frameElement.getAttribute("_WIDTH") ){
S(window).windowResize(window.frameElement.getAttribute("_WIDTH"), window.frameElement.getAttribute("_HEIGHT"), true);
S(document.body).visible();
S.loading(window, false);
return;
}
var obj = S("#PAGINA").obj,
wh = {width:obj.scrollWidth, height:obj.scrollHeight};
if( S(".PaginationBar").length ) wh["width"] = Math.max(wh["width"], S(".PaginationBar").obj.offsetWidth);
S(window).windowResize(wh["width"], wh["height"], true);
var s = S(document.body).scrollSet("#PAGINA"), ancho=0, alto=0, a;
if(s.sw) alto  = S.setup.scrollWidth;
if(s.sh) ancho = S.setup.scrollWidth;
if( (ancho+alto)==0 ){
S(document.body).visible();
S.loading(window, false);
return;
}
ancho += 3;
var d = S("#PAGINA").css({width:"", height:""}), HGoogle=0, WGoogle=0;
if( S(".CHART_STORE").exists() ){
HGoogle = S(".CHART_STORE").obj.offsetHeight+5;
if( S(".CHART_STORE").obj.offsetWidth > d.obj.offsetWidth ) WGoogle = S(".CHART_STORE").obj.offsetWidth+5;
}
S(window).windowResize(d.obj.offsetWidth+WGoogle+ancho, d.obj.offsetHeight+5+HGoogle+alto, true);
}else if( window.name=="_SUBLISTADO" && _SUBLISTADO_ && _INSUBWIN_ && _WOPENER.frameElement.name!="IWORK" ){
try{
_WOPENER.frameElement.contentWindow.document.body.getElementById("PAGINA").style.width = "100%";
_WOPENER.frameElement.contentWindow.document.body.getElementById("PAGINA").style.height = "100%";
}catch(e){}
S(S.toTag(_WOPENER.frameElement,"SPAN","*")).css({left:0, top:0});
S(_WOPENER).windowResize("100%", "100%", 0, 0, false, true);
}else if( _WideListing>0 && S("#BROWSE").length && S("#BROWSE").obj.offsetWidth<S.screen(window).w*_WideListing/100 ){
S("#BROWSE, #CONTENEDOR").css("width:100%");
S("#PAGINA").attr("eWith", _WideListing+"%");
S("#PAGINA").css("width:"+_WideListing+"%");
}
S(document.body).scrollSet("#PAGINA");
_CalcPaginacion();
if( top.eIsWindow(window) ){
var Alto = PAGINA.offsetHeight,
Ancho = DGI("BROWSE").offsetWidth;
if( S(".PaginationBar").length ) Ancho = Math.max(Ancho, S(".PaginationBar").obj.offsetWidth);
if( DGI('GRILL')!=null ) Ancho = Math.max(DGI('GRILL').offsetWidth, Ancho);
if( !_NOTITLE ) Ancho += parseInt(S(PAGINA).css("paddingLeft"))+parseInt(S(PAGINA).css("paddingRight"));
if( _AutoSize[3]!='' ) top.eSWSetCaption(window, _AutoSize[3]);
if( S(window.frameElement).attr("OX") ){
if( FijarY ){
top.eSWMove(window, window.frameElement.OX, window.frameElement.aY);
}else{
top.eSWMove(window, window.frameElement.OX, window.frameElement.OY);
}
}
top.eSWLoading(window, 0);
}else{
S(document.body).scrollSet("#PAGINA");
if( S(window.frameElement).attr("eNORESIZE")!=null ){
if( window.name=='_SUBLISTADO' ){
top.eLoading(0, window.parent);
}else if( window.name=="_ISUBLIST" ){
PAGINA.style.paddingLeft = PAGINA.style.paddingRight = "0px";
if( _WOPENER._CARD ){
var oBrowse = S(".BROWSE", S.iframeToWindow(window.frameElement));
S(window.frameElement).css("width:100%; height:"+(oBrowse.height()+9))
S.loading(window, false);
return true;
}
var nTab = S(window.frameElement).attr("nTAB"),
h = _WOPENER.DGI('TABNumber'+nTab).offsetHeight,
Est1 = _WOPENER.DGI('TABNumber1').style.display,
Est2 = _WOPENER.DGI('TABNumber'+nTab).style.display;
_WOPENER.DGI('TABNumber'+nTab).style.display = '';
if( window.frameElement.getAttribute("eFixWidth")!=null ){
window.frameElement.style.width = window.frameElement.getAttribute("eFixWidth");
}else if( _WISubList<0 ){
window.frameElement.style.width = px(DGI("BROWSE").offsetWidth);
if( document.body.scrollWidth>document.body.clientWidth ){
window.frameElement.style.width = px(DGI("BROWSE").offsetWidth+20);
}
}
if( DGI("ToolsPaginate")!=null ) _HISubList = DGI("PAGINA").offsetHeight;
if( /R/i.test(_HISubList) ){
_HISubList = _HISubList.replace(/R/i,"")*1;
var tr = DGI("BROWSE").rows;
if( tr.length>_HISubList ){
_HISubList = tr[_HISubList].offsetTop+DGI("BROWSE").offsetTop + tr[_HISubList].offsetHeight;
}else{
_HISubList = (tr[0].offsetHeight*_HISubList)+DGI("BROWSE").offsetTop+_HISubList+1;
}
}
if( _HISubList<0 ){
h = DGI("BROWSE").offsetHeight + DGI("BROWSE").offsetTop + top.eXY(BROWSE)[1] + 2;
if( DGI("ToolsPaginate") ) h += DGI("ToolsPaginate").offsetHeight;
if( window.frameElement.getAttribute("eFixHeight")==null ){
window.frameElement.style.height = px(h);
}else{
window.frameElement.style.height = window.frameElement.getAttribute("eFixHeight");
}
setTimeout(function(){
if( document.body.scrollWidth>document.body.clientWidth && window.frameElement.getAttribute("eFixWidth")==null ){
window.frameElement.style.width = px(DGI("BROWSE").offsetWidth+20);
}
}, 1);
}else if( _HISubList>0 ){
if( window.frameElement.getAttribute("eFixHeight")==null ){
window.frameElement.style.height = px(_HISubList);
var d = S("body").scrollSet(S("#BROWSE").obj);
if( d.sw ){
d = S.screen(window);
window.frameElement.style.height = (_HISubList+d.ch-d.oh)+"px";
}
}else{
window.frameElement.style.height = window.frameElement.getAttribute("eFixHeight");
}
setTimeout(function(){
if( document.body.scrollWidth>document.body.clientWidth && window.frameElement.getAttribute("eFixWidth")==null ){
window.frameElement.style.width = px(DGI("BROWSE").offsetWidth+20);
}
}, 1);
}
if( _WISubList<0 && _HISubList<0 ){
window.document.body.style.overflowX = 'hidden';
if( top.eIsWindow(_WOPENER) && _WOPENER.frameElement.getAttribute("_WIDTH") ) top.eSWIResize(_WOPENER,0);
}
if( DGI("BROWSE").offsetHeight<=document.body.clientHeight ){
window.document.body.style.overflowY = 'hidden';
}else if( DGI("BROWSE").offsetHeight>document.body.clientHeight ){
window.document.body.style.overflowY = 'scroll';
}
S("#TABContainer",_WOPENER).css({
position:"",
left:"",
top:"",
width:1,
height:1
});
if( Tipo==1 ) _WOPENER.Recalcula(1, FijarY);
_WOPENER.ISubListCargada(window);
_WOPENER.DGI('TABNumber1').style.display = Est1;
_WOPENER.DGI('TABNumber'+nTab).style.display = Est2;
if( _WOPENER.DGI('TABGroupInner')!=null ){
with( _WOPENER.DGI('TABGroupInner').style ){
height = "1px";
height = px(_WOPENER.DGI('TABBorder').offsetHeight-4);
}
}
S.loading(window, false);
}
window.focus();
}
}
if( typeof(_ColsWidthJs)!='undefined' && DGI('BROWSE').eCols<35 ){
var tmp = _ColsWidthJs.split(','), Max=0, nc, a;
for(n=0; n<tmp.length; n++) Max = Math.max( Max, DGI('BROWSE').children[0].children[eGCol(tmp[n])].offsetWidth );
var aAncho = parseInt(DGI('BROWSE').offsetWidth);
for(n=0; n<tmp.length; n++){
nc = eGCol(tmp[n]);
a = parseInt(DGI('BROWSE').children[0].children[nc].offsetWidth);
if( a>0 ){
aAncho += (Max-a);
DGI('BROWSE').children[0].children[nc].style.width = px(Max);
}
}
DGI('BROWSE').style.width = px(aAncho);
_RecalcSlideTH();
if( window.frameElement.MODAL!=undefined ){
_ColsWidthJs = undefined;
_Recalcula(Tipo);
S.loading(window, false);
return;
}
}
if( typeof(nView)!="undefined" && typeof(_VIEWCSS)!="undefined" ){
eViewCSS(_eViewCSS);
}
S(document.body).visible();
S(document.body).scrollSet("#PAGINA");
if( window.name=="_SUBLISTADO" && _SUBLISTADO_ && _INSUBWIN_ && _WOPENER.frameElement.name!="IWORK" ){
S(S.toTag(_WOPENER.frameElement, "SPAN", "*")).visible();
}
eLoading(0);
S.loading(window, false);
}
var _iniCalculator = false;
function Recalcula(n, FijarY){
if( !_iniCalculator ){
_iniCalculator = true;
S(document.body)
.on("keypress" , _Calculator)
.on("keydown"  , _Calculator)
.on("mouseover", _CalculatorMem);
}
if( _DefaultOffset!="" ){
S(window).rule("#BROWSE TH, #BROWSE TD { padding:"+_DefaultOffset+"px; }");
}
if( S("#BROWSE TBODY TR").length<2 ){
S(window).rule("-th[oncontextmenu], td[oncontextmenu]");
S("#BROWSE").obj.oncontextmenu = null;
S("#BROWSE THEAD TH").css("cursor:var(--cAuto)");
}
try{
_WOPENER.eHideBusy();
}catch(e){}
if( typeof(_VIEWCSS)!="undefined" ){
var n,max=0, p=-1;
for(n=0; n<_VIEWCSS.length; n++){
S("#BROWSE").class(_VIEWCSS[n]);
if( S("#BROWSE").obj.offsetWidth > max ){
max = S("#BROWSE").obj.offsetWidth;
p = n;
}
}
var k = _eViewCSS;
eViewCSS(p);
_eViewCSS = k;
}
if( FijarY==undefined ) FijarY = false;
setTimeout(function(){
_Recalcula(n, (FijarY ? 1:0), p);
var o = S(".MENUFOOTLIST");
if( o.length ){
var a = document.body.clientWidth;
if(a==1) a = window.frameElement.offsetWidth;
if( a<o.obj.offsetWidth ){
S("#MenuFootRight").block();
}
}
if( S(".ButtonMultiple").length ){
S(".ButtonMultiple").css({width: S("#BROWSE").obj.offsetWidth});
S(".ButtonMultiple SPAN").css({width: S("#BROWSE").obj.offsetWidth-(S(".ButtonMultiple").obj.rows[0].cells[0].offsetWidth*2)});
}
if( S("TABLE[class=BODYLIST").length ){
S('#ToolsPaginate').none();
S("I").each(function(k,o){
if( o.innerHTML=="(" ) S(S.toTag(o,"TR")).none();
});
document.body.onkeydown = null;
document.body.onmousewheel = null;
}
_3CXClear();
var d = S.screen(window);
if( d.h<d.y ) S.scrollSet(document.body, 0);
}, 1);
_GetNumCol();
}
var _EdEditList = false, _DimPapel = new Array(), _DimColor = new Array();
function ColorFilaTotales(){
var el = DGI("BROWSE");
var tRows = el.rows.length-1;
el.rows[tRows].className = 'PieLista';
}
function uMenuLTools(Obj){
var n;
if( S(window).windowIs() ){
for(n=0; n<_LToolsIcons.length; n++){
if( _LToolsIcons[n]!=null ){
if( _LToolsIcons[n][2]=="CARD" ) delete _LToolsIcons[n];
if( /^(E|A)$/.test(_LToolsIcons[n][1]) ) _LToolsIcons[n][1] = _INSUBWIN_ ? "E":"A";
}
}
}else{
for(n=0; n<_LToolsIcons.length; n++){
if( _LToolsIcons[n]!=null ){
if( /(>E<|>A<)/.test(_LToolsIcons[n][1]) ) _LToolsIcons[n][1] = _INSUBWIN_ ? "<i class='ICONOPTION'>E</i>":"<i class='ICONOPTION'>A</i>";
if( /^(E|A)$/.test(_LToolsIcons[n][1]) ) _LToolsIcons[n][1] = _INSUBWIN_ ? "E":"A";
}
}
}
S(Obj||S.event(window)).menu(_LToolsIcons, {hide:true, function:_uMenuLTools, oncontextmenu:__MenuLTools, out:S("#UtilListICO").attr("out")});
S("#UtilListICO").attr("out", false);
}
function eShowLTools(Modo, ini){
var op;
if( !top.eReadyState(window) ){
setTimeout(function(){
if( ini!=undefined ) eShowLTools(Modo, ini);
else if( Modo==undefined ) eShowLTools();
else eShowLTools(Modo, ini);
}, 250);
return( (window.event==null) ? '' : S.eventClear(window) );
}
if( DGI("BROWSE").rows.length-parseInt(S("#BROWSE.AltoTH"))-1 <= 0 ){
top.eInfo(window,eLng(100));
return S.eventClear(window);
}
if( Modo==undefined ){
if( window.name=="_ISUBLIST" && DGI('UtilList')!=null ){
DGI("UtilList").onmouseleave = function anonymous(){ this.style.display='none'; }
}
if( DGI('UtilListICO')!=null ){
op = _INSUBWIN_ ? "1":"0";
recorreDim(_LToolsIcons);
uMenuLTools(DGI('UtilListICO'));
}
}else if( DGI('SubVentana')!=null ){
_INSUBWIN_ = /^(2|W)$/i.test(Modo);
op = _INSUBWIN_ ? "1":"0";
recorreDim(_LToolsIcons);
setTimeout(function(){
if( S("tr[earg='ModoSub'] i").length ){
S("tr[earg='ModoSub'] i").text(_INSUBWIN_ ? "E":"A");
}
},1);
}
function recorreDim(dim){
for(var n=0; n<dim.length; n++){
if( typeof(dim[n])=="object" ){
recorreDim(dim[n]);
}else if( n==2 && /^(Mode0|Mode1)$/.test(dim[2]) ){
dim[5] = (dim[2]!="Mode"+op) ? "class=ICONOFF":"";
if( /^\<i /i.test(dim[1]) ){
dim[1] = S.replace(dim[1],  [[" ICONOFF",""]]);
if( dim[2]!="Mode"+op ){
dim[1] = S.replace(dim[1],  [["ICONOPTION","ICONOPTION ICONOFF"]]);
dim[1] = S.replace(dim[1],  [["ICONMENU"  ,"ICONMENU ICONOFF"]]);
}
}
}else if( n==1 && dim.length>2 && typeof(dim[2])=="object" ){
if( /^(E|A)$/.test(dim[1]) ){
dim[1] = _INSUBWIN_ ? "E":"A";
}else if( /(>E<|>A<)/.test(dim[1]) ){
dim[1] = _INSUBWIN_ ? "<i class='ICONOPTION'>E</i>":"<i class='ICONOPTION'>A</i>";
}
}
}
}
return( (window.event==null) ? '': S.eventClear(window) );
}
function ShowLTools(m){ return eShowLTools(m); }
function aBuscar(txt){
var n = S.eventCode(window.event);
if( n==13 || n==9 ){
_tSeek=-1;
Buscar(txt,0);
return eClearEvent();
}
if( DGI("BUSCAR").value.length>0 ){
if( n==38 || n==37 ) Buscar(DGI("BUSCAR").value, -1);
if( n==40 || n==39 ) Buscar(DGI("BUSCAR").value,  1);
}
switch( n ){
case 36:
if( !_PagIncremental ) Paginar('I');
break;
case 33:
if( !_PagIncremental ) Paginar('<');
break;
case 34:
if( !_PagIncremental ) Paginar('>');
break;
case 35:
if( !_PagIncremental ) Paginar('F');
break;
}
}
function eBuscarFoco(){
setTimeout('DGI("BUSCAR").focus();', 500);
}
function _VerLoBuscado(o, f, c, sTxt){
function marcarText(o, sTxt){
sTxt = o.innerHTML.match(sTxt)[0];
o.innerHTML = o.innerHTML.replace(sTxt,'<mark>'+sTxt+'</mark>');
setTimeout(function(){
o.innerHTML = o.innerHTML.replace(new RegExp("(<mark>|</mark>)", "gi"),'');
}, 500);
}
if( _MAXRECFULL && DGI('MAXREC')!=null ){
var MaxRec = DGI('MAXREC').value*1,
Desde = DGI('DESDE').value*1,
Ini = ((Desde-1)*MaxRec),
Fin = Ini+MaxRec;
if( f<Ini || f>Fin ){
DGI('DESDE').value = Math.ceil(f/MaxRec);
_PaginarFull('?');
}
}
o = DGI("BROWSE").rows[f].cells[c];
o.className = "SEEK";
marcarText(o, sTxt);
S("#BROWSE").obj["SeekFC"] = f+','+c;
S("#BROWSE").obj["SeekCursor"] = o;
if( _cDeslizante>0 && c<_cDeslizante ){
S("#BROWSE").obj["SeekCursor2"] = TablaTV.children[0].rows[f-parseInt(S("#BROWSE.AltoTH"))-1].cells[c];
S("#BROWSE").obj["SeekCursor2"].className = "SEEK";
marcarText(S("#BROWSE").obj["SeekCursor2"], sTxt);
}
var xy = eXY(o),
scroll = S.scrollGet(window),
sc = S.screen(window);
if( (scroll.scrollTop+DGI('TablaTH').offsetHeight)>xy[1] ){
S.scrollSet(document.body, {top:xy[1]-(sc.ch/2)});
}else if( !((xy[1]+xy[3])>scroll.scrollTop && (xy[1]+xy[3])<(scroll.scrollTop+sc.ch)) ){
S.scrollSet(document.body, {top:(xy[1]<sc.ch) ? 0 : xy[1]-(sc.ch/2)});
}else if( DGI('TablaTH').offsetHeight>0 ){
if( (DGI('TablaTH').offsetHeight+scroll.scrollTop)>xy[1] ) S.scrollSet(document.body, {top:-DGI('TablaTH').offsetHeight});
}
if( !((xy[0]+xy[2])>scroll.scrollLeft && (xy[0]+xy[2])<(scroll.scrollLeft+sc.cw)) ){
S.scrollSet(document.body, {left:(xy[0]<sc.cw) ? 0 : xy[0]-(sc.cw/2)});
}else if( DGI('TablaTV').offsetWidth>0 ){
if( (DGI('TablaTV').offsetWidth+scroll.scrollLeft)>(xy[0]+xy[2]) ) S.scrollSet(document.body, {left:xy[0] - DGI('TablaTV').offsetWidth});
}
return;
}
function Buscar(txt, n){
var sTxt=txt, i, Patron, vocales=["[aáâàä]", "[eéêèë]", "[iíîìï]", "[oóôòö]", "[uúûùü]"];
try{
S("#BROWSE").obj["SeekCursor"].className = "";
S("#BROWSE").obj["SeekCursor2"].className = "";
}catch(e){}
try{
if( window.event!=null && window.event.type=="contextmenu" ) txt = "^"+txt+"$";
eClearEvent();
for(i=0; i<vocales.length; i++){
txt = txt.replace(RegExp(vocales[i], 'gi'), vocales[i]);
}
Patron = new RegExp(txt, 'i');
}catch(e){
return eClearEvent();
}
var fi=parseInt(S("#BROWSE.AltoTH"))+1, ci=0, p=0, o;
if( n==-1 ){
fi=DGI("BROWSE").rows.length-1;
ci=DGI("BROWSE").rows[fi].cells.length-1;
}
if( S("#BROWSE").obj["SeekFC"]!=null && (n==1 || n==-1) ){
var tmp = S("#BROWSE").obj["SeekFC"].split(',');
fi = parseInt(tmp[0]);
ci = tmp[1];
p = 1;
}
var CheckCol = new Array(),c=0;
for(f=0; f<DGI("BROWSE").children[0].children.length; f++){
if( DGI("BROWSE").children[0].children[f].tagName=='COL' ){
CheckCol[c++] = (DGI("BROWSE").children[0].children[f].style.display!='none');
}
}
var c,f,sp=p,xy,cd=false;
if( n>=0 ){
for(f=fi; f<DGI("BROWSE").rows.length; f++){
if( DGI("BROWSE").rows[f].offsetHeight==0 ) continue;
for(c=ci; c<DGI("BROWSE").rows[f].cells.length; c++){
if( CheckCol[c] && Patron.test(DGI("BROWSE").rows[f].cells[c].textContent.replace(/\s+$/g,'')) && DGI("BROWSE").rows[f].offsetHeight>0 ){
if( p<1 ){
_VerLoBuscado(DGI("BROWSE").rows[f].cells[c], f, c, Patron);
return;
}
p--;
}
}
ci = 0;
}
}else{
for(f=fi; f>parseInt(S("#BROWSE.AltoTH")); f--){
if( DGI("BROWSE").rows[f].offsetHeight==0 ) continue;
for(c=ci; c>=0; c--){
if( CheckCol[c] && Patron.test(DGI("BROWSE").rows[f].cells[c].textContent.replace(/\s+$/g,'')) && DGI("BROWSE").rows[f].offsetHeight>0 ){
if( p<1 ){
_VerLoBuscado(DGI("BROWSE").rows[f].cells[c], f, c, Patron);
return;
}
p--;
}
}
ci = DGI("BROWSE").rows[f-1].cells.length-1;
}
}
S("#BROWSE").obj["SeekFC"] = null;
if( sp==0 ){
S("body").tip(eLng(102),3);
}else{
Buscar(sTxt, n);
}
}
function eClearThousands(txt){
return S.thousandsClear(txt);
}
function eShowThousands(Pts, Deci){
return S.thousands(Pts, Deci);
}
function eRound( num, dec, miles ){
var p = Math.pow(10,dec),
r = (Math.round(num*p)/p)+'',
t = r.split('.'), n;
if( dec>0 ){
if( t[1]==undefined ) t[1]='';
for(n=t[1].length; n<dec; n++) t[1] += '0';
if( miles!=undefined && miles ) return eShowThousands( t[0]+','+t[1], dec );
return t[0]+'.'+t[1];
}else{
return t[0]+'';
}
}
function _PDFConGRILL(){
if( DGI("GRILL").rows[0].cells.length==1 ){
var Obj = DGI("GRILL").rows[0].cells[0].children[0];
}else{
var Obj = DGI("GRILL").rows[0];
}
var oColor = S(Obj).css("backgroundColor");
DGI("GRILL").style.backgroundColor = '#FFFFFF';
setTimeout('_PDF_ConGRILL("'+oColor+'")',10);
}
function _PDF_ConGRILL( oColor ){
_Win = window;
if( DGI("GRILL").rows[0].cells.length==1 ){
var Obj = DGI("GRILL").rows[0].cells[0].children[0];
}else{
var Obj = DGI("GRILL").rows[0];
}
var oX = document.body.scrollLeft,
oY = document.body.scrollTop;
var Ancho = Obj.scrollWidth,
Alto = Obj.scrollHeight,
DimXY = top.eXY( Obj ),
ConAutoMenu = false;
if( document.body.clientWidth<Ancho ){
if( window.name=='IWORK' ){
if( top._MenuOnOff==2 ){
top.eAutoMenu();
ConAutoMenu = true;
}
}
}
if( window.name=='IWORK' ) top.DGI("LogoEDes").style.display = 'none';
if( Ancho>document.body.clientWidth ) Ancho = document.body.clientWidth;
if( Alto>document.body.clientHeight ) Alto = document.body.clientHeight;
document.body.scrollLeft = 0;
document.body.scrollTop = DimXY[1]-40;
var DimOFF = top.eXY(top.DGI(window.frameElement.id)),
sx = DimXY[0]+DimOFF[0]+1-document.body.scrollLeft,
sy = DimXY[1]+DimOFF[1]+2-document.body.scrollTop;
window.external.eCaptureScreen( sx+2, sy+1, Ancho-2, Alto-3, 'grill' );
DGI("GRILL").style.backgroundColor = oColor;
document.body.scrollLeft = px(oX);
document.body.scrollTop = px(oY);
if( ConAutoMenu ) top.eAutoMenu(0);
if( window.name=='IWORK' ) top.DGI("LogoEDes").style.display = 'block';
top.eFilePut( '{dir}tmp/grill.png', '/_tmp/php/'+_User+'.png' );
S(DGI("ExePDF")).eventFire("click");
}
function ePPF(txt, valor, ConChange){
return window.frameElement.WOPENER.ePF(txt, valor, ConChange);
}
function ePGO( field ){
return S(":"+field, _WOPENER).obj;
}
function ePGF( NomCampo ){
return window.frameElement.WOPENER.eGF( NomCampo );
}
function eViewDoc(nFile){
var o = S.event(window), down=(window.event.type=="contextmenu"), NomFile;
if( down ){
var url = "edes.php?D:"+_CONTEXT+"&_DOWN=1&_FILE="+nFile;
S.callSrv(url);
}else{
top.S.window("edes.php?E:$img.php&IMG="+nFile, null, window);
}
return eClearEvent();
}
function eVD(){
var  o = S.event(window)
,oTR = S.toTag(o, "TR", "*");
if( typeof(_ImgNoTools)!="undefined" && _ImgNoTools ){
S.eventClear(window);
S(oTR.cells).each(function(k, o){
if( o.children.length==0 ){
S(o).eventFire("click");
return null;
}
});
return false;
}
if( S.is("line-through", S(oTR).css("textDecoration")) ){
S.error("El registro ha sido borrado");
return eClearEvent();
}
var  [field] = S.toTag(o, "TABLE").getAttribute("seekCampos").split(":")
,nFile = eGF(field);
return eViewDoc(nFile);
}
function _ImgRefresh(o, txt){
setTimeout(function(){
o.innerHTML = txt;
}, 3000);
}
var _eBlink=false, __eBlink=null;
function eBlink( tf ){
clearTimeout(__eBlink);
if( tf==undefined ){
DGI("GROUPTITLE").style.visibility = (_eBlink) ? 'visible' : 'hidden';
_eBlink = !_eBlink;
__eBlink = setTimeout("eBlink()",(_eBlink)?250:750);
}else{
DGI("GROUPTITLE").style.visibility = (tf) ? 'visible' : 'hidden';
}
}
function _RecalcColsOp(){
var tabla = DGI("BROWSE"),
f = tabla.rows.length-1,
altoTH = parseInt(S("#BROWSE.AltoTH"))+1,
Obj = tabla.rows, c,
tmp = tabla.children[0].children,
registros = Obj.length-1,
tmp2, Total;
if( tabla.rows[f].className!='PieLista' && tabla.rows[f].className!='PieListaGraf' ) return;
for(c=0; c<tmp.length; c++){
tmp2 = tmp[c].getAttribute("eColsOp");
Total = 0;
if( tmp2==undefined || tmp2=='' ) continue;
for(f=altoTH; f<registros; f++){
if( Obj[f].offsetHeight==0 || S.is("line-through", S(Obj[f]).css("textDecoration")) ) continue;
switch( tmp2 ){
case '+':
Total += eClearThousands( Obj[f].cells[c].textContent )*1;
break;
case 'C': case 'c':
Total++;
break;
case '#':
if( eTrim( Obj[f].cells[c].textContent )!='' ) Total++;
break;
}
}
Obj[registros].cells[c].textContent = eShowThousands(Total, tabla.children[0].children[c].getAttribute("DCM"));
}
}
function eRecalcColsOp(){
_RecalcColsOp();
}
function _SetCaption( tag ){
if( top.eIsWindow(window) && S.event(window).tagName==tag ){
var txt = S.event(window).textContent;
if( event.ctrlKey || event.altKey ){
var Obj = top.DGI('swV_'+window.frameElement.id.substring(4)).rows[0].cells[0];
txt = Obj.children[0].innerHTML+' · '+txt;
}
top.eSWSetCaption( window, txt );
top.eSWFocus( window, true );
}
}
function _ChangeFilter2(Op, OpTextContent, Obj, OpObj, oTabla, NmCampo){
if( Op==null ) return;
FieldCondi[NmCampo].value = Op;
if( FieldCondi['_INPUT_'+NmCampo]!=undefined ) FieldCondi['_INPUT_'+NmCampo].value = Op;
FieldCondi.removeAttribute('target');
FieldCondi.removeAttribute('action');
if( !S.is("&_EMPTYLIST=1", FieldCondi.action) ) FieldCondi.action += "&_EMPTYLIST=1";
if( window.event && (window.event.ctrlKey || window.event.altKey) ){
var NewPag = S.window("-"),
dim = S(":FieldCondi").fields(),
txt="<html><head></head><body><form action='"+FieldCondi.action+"&_PSOURCE=WDESKTOP' method='POST'>", k;
for(k in dim){
txt += "<textarea name='"+dim[k].name+"'>"+dim[k].value+"</textarea>";
}
txt+="</form></body></html>";
NewPag.document.write(txt);
NewPag.document.getElementsByTagName("FORM")[0].submit();
}else{
if( top.eIsWindow(window) ) top.eSWLoading(window, 1);
else top.eLoading(1, window);
if( S("input[name='_ChangeFilter_']",FieldCondi).length==0 ) S("<input name='_ChangeFilter_' value=''>").nodeEnd(FieldCondi);
FieldCondi['_ChangeFilter_'].value = "";
if( Op=="" ){
FieldCondi['_ChangeFilter_'].value = NmCampo+"|"+_ChangeFilterLabel;
}
FieldCondi.action = S.url(window, "_CONTEXT", _CONTEXT);
FieldCondi.submit();
}
return eClearEvent();
}
var _ChangeFilterLabel = "";
function _ChangeFilter(Campo){
var o = S.event(window),x,oVal="";
_ChangeFilterLabel = "";
if( o.tagName=="I" ) o = o.parentNode;
x = S.replace(o.childNodes[0].textContent, [[">",":"],["<",":"],["=",":"]]);
_ChangeFilterLabel = x.split(":")[0];
oVal = x.split(":")[1];
S(o).menu(eval('_DIM_'+Campo), {function:_ChangeFilter2, off:oVal, "+x":20, "+y":-2}, Campo);
}
function eTipFormHide(Gen){ S.tip(); }
function eTipForm(txt){ S(oDes).tip(txt); }
var _OnDownload="";
function _SetDownload(){
_OnDownload = "&_DOWN=1";
setTimeout("_OnDownload=''",500);
S.eventFire(S.event(window), "click");
return S.eventClear(window);
}
function _HelpMenu(Op, i,o,p, tabla, VarUser){
if( Op!=null ) if( VarUser[0]==undefined ) VarUser = new Array(VarUser);
if( Op!='H' ) top.eInfo(window,S.lng(219),-1);
if( S.type(VarUser)=="string" ) VarUser = [VarUser];
if( /\(.*?\)/.test(VarUser[0]) ){
eval(VarUser[0]);
return;
}
VarUser[0] = S.replace(VarUser[0], ",TITLEICON","", "/","_", ",",".");
var ev = o ? S.windowObject(o).event : window.event, eCtrlKey=null;
if( ev ){
if( S('#ListHelpIcons').attr("eCtrlKey")!=null ) eCtrlKey = true;
else eCtrlKey = (ev.ctrlKey || ev.altKey);
}
switch( Op ){
case 'H':
var ayuda = S.replace(VarUser[0], "$", "\\$", "-", "\\-"), txt;
if( /\.mark$/.test(ayuda) ){
S.call('edes.php?A:'+escape(ayuda), null, {return:function(txt){
S.info();
S.info(txt);
S(".TIP").class("+HELP");
S(S.event(ev)).around(S(".TIP").obj);
}});
return;
}else{
txt = S("#HELP_"+ayuda).html();
}
if( !S.is(".", ayuda) && S("#HELP_"+ayuda).exists() ){
S.info();
S.info(txt);
S(".TIP").class("+HELP");
S(S.event(ev)).around(S(".TIP").obj);
return S.eventClear(ev);
}else{
top.gsHelp(VarUser[0], ev);
}
break;
case 'C':
var pk = VarUser[0]+'.chm';
if( top._M_!="" && null!=ev && eCtrlKey ){
try{
S.window("edes.php?Fa:$t/help.edf&_HELP="+escape(pk), {title:"Fichero de ayuda: "+pk});
}catch(e){}
return S.eventClear(ev);
}else{
top.eCallSrv(window, 'edes.php?D:/help/doc/'+VarUser[0]+'.chm::'+VarUser[1]+'.htm' );
}
break;
case 'P':
case 'V':
var pk = VarUser[0]+((Op=='P')?'.pdf':'.mp4');
if( top._M_!="" && null!=ev && eCtrlKey ){
try{
S.window("edes.php?Fa:$t/help.edf&_HELP="+escape(pk), {title:"Fichero de ayuda: "+pk});
}catch(e){}
return S.eventClear(ev);
}else{
top.eCallSrv(window, 'edes.php?D:/help/doc/'+pk+_OnDownload+'&FILE="AYUDA '+VarUser[0]+'"');
}
break;
}
top.eInfoHide();
if( S('#ListHelpIcons').exists() ) S('#ListHelpIcons').attr("eCtrlKey", null);
}
function gsHelp(url, icons, eve){
var menu = [["-Ayuda"]],
o = eve.target;
if( o.getAttribute("eObjClick")!=null ){
o = S(o).obj["eObjClick"];
o.removeAttribute("eObjClick");
}
if( S.is("H", icons) ) menu.push(['Ver ayuda', "g/help_htm.png", "H"]);
if( S.is("P", icons) ) menu.push(['Ayuda en formato PDF', "g/help_pdf.png", "P"]);
if( S.is("V", icons) ) menu.push(['Video tutorial', "g/help_avi.png", "V"]);
if( S.is("C", icons) ) menu.push(['Ayuda en formato CHM', "g/help_chm.png", "C"]);
S(o).menu(menu, {function:_HelpMenu, trigger:eve.target, oncontextmenu:_SetDownload}, url);
}
function eD2S(d,s){
if( d=='' ) return '';
if( s==undefined ) s='';
d = d.replace(/\//,'-');
var tmp = d.split('-');
if( tmp[1].length<2 ) tmp[1] = '0'+tmp[1];
return tmp[2]+s+tmp[1]+s+tmp[0];
}
function getCursorPos( campo ){
if( document.selection ){
campo.focus();
var oSel = document.selection.createRange();
oSel.moveStart('character',-campo.value.length);
campo.selectionEnd = oSel.text.length;
oSel.setEndPoint('EndToStart',document.selection.createRange());
campo.selectionStart = oSel.text.length;
}
return { start: campo.selectionStart, end: campo.selectionEnd };
}
function putCursorPos(Obj,pos){
if( typeof document.selection != 'undefined' && document.selection ){
var tex=Obj.value;
Obj.value='';
Obj.focus();
var str = document.selection.createRange();
Obj.value=tex;
str.move("character", pos);
str.moveEnd("character", 0);
str.select();
}else if( typeof Obj.selectionStart != 'undefined' ){
Obj.setSelectionRange(pos,pos);
Obj.focus();
}
}
function _MenuTH(oTH){
var  currentOrder = S(S.toTag(oTH, "TABLE")).attr("eOrder")
,nCol = S(oTH).css("nc")
,THSort = S(oTH).css("textDecorationLine")
,dim = [["-"+S.lng(315)]];
if( THSort=="none" ){
dim.push([S.lng(316), "!", "A"]);
dim.push([S.lng(317), "!", "A+"]);
dim.push(["-"]);
dim.push([S.lng(318), "¡", "D"]);
dim.push([S.lng(319), "¡", "D+"]);
}else if( THSort=="overline" ){
dim.push([S.lng(316), "!", "A"]);
dim.push([S.lng(317), "!", "A+"]);
}else{
dim.push([S.lng(318), "¡", "D"]);
dim.push([S.lng(319), "¡", "D+"]);
}
S(oTH).menu(dim, {
function(op, label, triger, oTR, arg){
if( op==null ) return;
switch(op){
case "F":
_FilterView(arg.arg);
break;
case "A":
case "D":
SeleccionaLinea(null, arg.arg, (op[0]=="A"));
break;
case "A+":
case "D+":
SeleccionaLinea(null, arg.arg, (op[0]=="A"), true);
break;
}
}}, oTH
);
return S.eventClear(window);
}
function _FilterSetScroll(oFilter){
var xy = eXY(oFilter),
s = S.scrollGet(document.body);
oFilter.xOffset = xy[0]-s["scrollLeft"]+2;
oFilter.yOffset = xy[1]-s["scrollTop"]+2;
}
function _FilterExe(txt, Buscar, Mark){
var n = S.eventCode(event);
if( n==8 ){
var Obj = S.event(window),
Dim = getCursorPos(Obj),
p = Dim['start'];
if( p==0 ) return eClearEvent();
Obj.value = Obj.value.substr(0,p-1)+Obj.value.substr(p);
putCursorPos( Obj, p-1 );
return true;
}else if( n==13 || n==121 ){
}else if( n==36 ){
putCursorPos( S.event(window), 0 );
return eClearEvent();
}else if( n==35 ){
var Obj = S.event(window);
putCursorPos( Obj, Obj.value.length );
return eClearEvent();
}else if( Buscar==undefined ) return true;
eClearEvent();
top.eInfo(window,'Filtrando...',-1);
setTimeout(function(){_FilterExe2(txt,Buscar,n,Mark);},100);
return true;
}
function _FilterClear(fi, FILA, cSlideCol, Desc, RowSlide){
var f, total=FILA.length;
for(f=fi; f<total; f++) if( FILA[f].className.indexOf('TRHidden')>-1 ){
FILA[f].className = FILA[f].className.replace(/\s*TRHidden/g,'');
if( cSlideCol ) RowSlide[f-Desc].className = RowSlide[f-Desc].className.replace(/\s*TRHidden/g,'');
}
if( DGI("BROWSE").getAttribute('FilterON')!=null ) DGI("BROWSE").removeAttribute('FilterON');
_RecalcSlideTH();
var ns, oSpan = S("SPAN#UtilFilter").dim, xy,Obj;
for(ns=0; ns<oSpan.length; ns++){
_FilterSetScroll(oSpan[ns]);
}
if( S("#BROWSE").attr("eGreenBar")!=null ){
S("#BROWSE").class("+GREENBAR");
}
setTimeout("MovTitulos();",100);
top.eInfoHide(window);
if( typeof _ChartDynamic!='undefined' && _ChartDynamic ){
S.chartRedraw(window);
}
return false;
}
function _FilterExeNewPag(){
if( S("SPAN#UtilFilter").length>0 && DGI("BROWSE").getAttribute('FilterON')==1 ){
top.eInfo(window,'Filtrando...',-1);
setTimeout(function(){
_FilterExe2("",1);
},100);
}
}
function _FilterExe2(txt, Buscar, n, Mark){
var fi = parseInt(S("#BROWSE.AltoTH"))+1, FILA=DGI("BROWSE").rows, f,
cSlideCol = (_cDeslizante>0 && DGI("TablaTV").children.length>0),
Desc = parseInt(S("#BROWSE.AltoTH"))+1, RowSlide;
if( cSlideCol ) RowSlide = DGI("TablaTV").children[0].rows;
if( n!=121 && Buscar==-1 ) return _FilterClear(fi, FILA, cSlideCol, Desc, RowSlide);
var DimCond = new Array(), ac=0, Obj, eRequired,
ns, oSpan = S("SPAN#UtilFilter").dim, xy;
if( Mark==undefined ) Mark = -1;
if( S("#BROWSE").attr("eGreenBar")!=null ){
S("#BROWSE").class("-GREENBAR");
}
for(ns=0; ns<oSpan.length; ns++){
Obj = oSpan[ns];
_FilterSetScroll(oSpan[ns]);
var nc = Obj.NC, op,ok,v, tcd=parseInt(Obj["TC"]),
TD = Obj.td, nCond,txt,Patron,sv,
oInput = Obj.getElementsByTagName('INPUT');
for(nCond=0; nCond<oInput.length; nCond++){
txt = eTrim(oInput[nCond].value);
eRequired = oInput[nCond].eRequired;
Patron = '';
try{
if( txt=='' ){
continue;
}else if( txt=='=' ){
txt = "^\s*$";
Patron = new RegExp( txt, 'i' );
op = '*';
}else if( txt=='>' || txt=='<' ){
txt = "[A-Z0-9\,\.\-@\(\)\{\}]+";
Patron = new RegExp( txt, 'i' );
op = '*';
}else if( txt.substr(0,1)=='>' || txt.substr(0,1)=='<' ){
op = txt.substr(0,1);
txt = txt.substr(1);
if( txt.substr(0,1)=='=' ){
op += txt.substr(0,1);
txt = txt.substr(1);
}
if( txt=='' && op=='<' ){
txt = "^\s*$";
Patron = new RegExp( txt, 'i' );
op = '*';
}
}else{
if( txt.substr(0,1)=='=' ) txt = txt.substr(1);
txt = ( txt.substr(0,1)!='*' ) ? "^"+txt : txt.substr(1);
txt = ( txt.substr(txt.length-1)!='*' ) ? txt+"$" : txt.substr(0,txt.length-1);
if( txt.indexOf('*')>-1 ) txt = txt.replace(/\*/g,'[A-Z0-9]*');
Patron = new RegExp( txt.toUpperCase(), 'i' );
op = '*';
}
}catch(e){ return; }
if( op!='*' ){
switch( TD ){
case '-,': case '+,': case '-': case '+':
txt = eClearThousands(txt);
break;
case 'F4':
if( txt.length==10 ) txt = eD2S(txt);
else TD='';
break;
case 'P4':
if( txt.length==7 ) txt = eD2S(txt);
else TD='';
break;
case 'CDI':
break;
default:
}
}
DimCond[ac++] = new Array(op,txt,Patron,nc,TD,eRequired);
}
}
DimCond.sort( function(a,b){ return((a[5])?-1:1); } );
if( ac==0 ) return _FilterClear( fi, FILA, cSlideCol, Desc, RowSlide );
DGI("BROWSE").setAttribute('FilterON',1);
var TotalTR = FILA.length - ((FILA[FILA.length-1].className=='PieLista')?1:0);
for(f=fi; f<TotalTR; f++){
ok = false;
if( FILA[f].className.indexOf('TRHidden')==-1 && Mark<0 ){
FILA[f].className += ' TRHidden';
if( cSlideCol ) RowSlide[f-Desc].className += ' TRHidden';
}
for(nCond=0; nCond<ac; nCond++){
op = DimCond[nCond][0];
txt = DimCond[nCond][1];
Patron = DimCond[nCond][2];
nc = DimCond[nCond][3];
TD = DimCond[nCond][4];
eRequired = DimCond[nCond][5];
sv = v = FILA[f].cells[nc].innerHTML.replace(/\s+$/g,'');
if( op=='*' ){
ok = Patron.test(v);
}else{
switch( TD ){
case '-,': case '+,': case '-': case '+':
v = eClearThousands(sv);
break;
case 'F4': case 'P4':
v = eD2S(sv);
break;
case 'CDI':
break;
default:
}
switch( op ){
case '>' : ok = v> txt; break;
case '>=': ok = v>=txt; break;
case '<' : ok = v< txt; break;
case '<=': ok = v<=txt; break;
default: ok = false;
}
}
if( Mark>-1 ){
if( ok ){
if( Mark==0 ){
FILA[f].setAttribute("SEL",1);
}else{
FILA[f].removeAttribute("SEL");
}
SeleccionaMarca( FILA[f] );
if( !eRequired ) break;
}else if( eRequired ){
if( FILA[f].getAttribute("SEL")!=null ) SeleccionaMarca( FILA[f] );
break;
}
}else if( ok ){
FILA[f].className = FILA[f].className.replace(/\s*TRHidden/g,'');
if( cSlideCol ) RowSlide[f-Desc].className = RowSlide[f-Desc].className.replace(/\s*TRHidden/g,'');
if( !eRequired ) break;
}else if( eRequired ){
if( FILA[f].className.indexOf('TRHidden')==-1 ){
FILA[f].className += ' TRHidden';
if( cSlideCol ) RowSlide[f-Desc].className += ' TRHidden';
}
break;
}
}
}
_RecalcSlideTH();
setTimeout("MovTitulos();",100);
top.eInfoHide(window);
if( typeof _ChartDynamic!='undefined' && _ChartDynamic ){
S.chartRedraw(window);
}
return true;
}
function _FilterKey(){
try{
event.keyCode = String.fromCharCode(S.eventCode(event)).toUpperCase().charCodeAt(0);
}catch(e){}
}
function _FilterView(Obj){
if( window.event && (window.event.ctrlKey || window.event.altKey) && top._D_!="" ) return true;
if( _ChangeFilterMemory ) return eClearEvent();
var tabla = S.toTag(Obj,'TABLE'),
oObj = Obj;
if( tabla.id!="BROWSE" ){
Obj = DGI("BROWSE").rows[Obj.parentNode.rowIndex].cells[Obj.cellIndex],
tabla = S.toTag(Obj,'TABLE');
}
if( tabla.children[2].rows.length==0 ) return;
var oFilter,
s = S.scrollGet(document.body);
if( !Obj["oFilter"] ){
oFilter = S('#oUtilFilter').nodeCopy().obj;
oFilter.id = 'UtilFilter';
with( oFilter.children[0].rows[1].cells[0] ){
textContent = Obj.innerText.replace("\n", " ");
title = Obj.title;
}
oFilter.oTD = Obj;
Obj.oFilter = oFilter;
if( document.body.vZIndex==undefined ) document.body.vZIndex = 1;
document.body.vZIndex = parseInt(document.body.vZIndex)+2;
oFilter.style.zIndex = document.body.vZIndex;
var n = parseInt(oFilter["TC"])+1, thScroll;
oFilter["TC"] = n;
with( oFilter.getElementsByTagName('INPUT')[0] ){
value = '';
id = 'ColFilter'+(n-1);
eRequired = false;
}
document.body.appendChild(oFilter);
Obj.BColor = S(Obj).css("backgroundColor");
Obj.CColor = S(Obj).css("color");
S(Obj).css({backgroundColor:'#cf4000',color:'#ffffff'});
var dim = [Obj];
if( DGI("TablaTH").children.length>0 ) dim[1] = DGI("TablaTH").children[0].rows[Obj.parentNode.rowIndex].cells[Obj.cellIndex];
if( DGI("TablaTE").children.length>0 ) dim[2] = DGI("TablaTE").children[0].rows[Obj.parentNode.rowIndex].cells[Obj.cellIndex];
S(dim).css({
backgroundColor:'#cf4000',
color:'#ffffff'
});
Obj.oFilter = oFilter;
S(oFilter).attr({
NC: S(Obj).attr("NC"),
td: S(Obj).attr("td")
});
}else{
oFilter = Obj.oFilter;
}
if( S("#BROWSE").attr("eGreenBar")==null && S.is("GREENBAR", S("#BROWSE").class().split(" ")) ){
S("#BROWSE").attr("eGreenBar",1);
}
S(oObj).around(oFilter, {type:"7,5,6,2,3,4,10,9,8,11,12,1,13,14"});
S(oFilter).css({
display: 'table',
zIndex: document.body.vZIndex
}).toScroll()
.move(null, S(".TITULO",oFilter));
oFilter.getElementsByTagName('INPUT')[0].focus();
eClearEvent();
}
function _FilterAdd(){
var Obj = S.toTag(S.event(window),'TR'),
oFilter = S.toTag(Obj,'SPAN'),
n = (S(oFilter).attr("TC")*1)+1;
var oTR = S(Obj).nodeCopy().obj;
with( oTR.getElementsByTagName('INPUT')[0] ){
value = '';
id = 'ColFilter'+n;
eRequired = false;
}
top.SwapImg(oTR.getElementsByTagName('IMG')[1],'_1','_0');
oTR.getElementsByTagName('IMG')[2].style.visibility = 'visible';
var newTR = Obj.parentNode.parentNode.insertRow(Obj.rowIndex+1);
newTR.outerHTML = oTR.outerHTML;
_FilterSetScroll(oFilter);
DGI('ColFilter'+n).focus();
S(oFilter).attr("TC",n);
}
function _FilterDel(){
var Obj = S.toTag(S.event(window),'TR'),
oFilter = S.toTag(Obj,'SPAN');
Obj = S.toTag(Obj,'TR');
var nextFocus = Obj.parentNode.parentNode.rows[Obj.rowIndex-1].cells[0].children[0];
S(Obj).nodeRemove();
_FilterSetScroll(oFilter);
nextFocus.focus();
}
function _FilterSet(){
var Obj = S.event(window),
oInput = S.toTag(Obj,'TR').cells[0].children[0];
if( Obj.src.indexOf('_1')>-1 ){
top.SwapImg(Obj,'_1','_0');
}else{
top.SwapImg(Obj,'_0','_1');
}
oInput.eRequired = (Obj.src.indexOf('_1')>-1);
}
function _FilterHelp(){
var oFilter = S.toTag(S.event(window),'SPAN');
_FilterSetScroll(oFilter);
top.eFileHelp("$filter_list");
return eClearEvent();
}
function _FilterTHColor(Obj){
var dim = [Obj];
if( DGI("TablaTH").children.length>0 ) dim[1] = DGI("TablaTH").children[0].rows[Obj.parentNode.rowIndex].cells[Obj.cellIndex];
if( DGI("TablaTE").children.length>0 ) dim[2] = DGI("TablaTE").children[0].rows[Obj.parentNode.rowIndex].cells[Obj.cellIndex];
S(dim).css({
backgroundColor: Obj.BColor,
color: Obj.CColor
});
Obj.removeAttribute('oFilter');
}
function _FilterClose(){
var Obj = S.toTag(S.event(window),'SPAN'),n;
if( Obj.id=="oUtilFilter" ){
S(Obj).nodeRemove();
return;
}
_FilterTHColor(Obj.oTD);
S(Obj.oTD).attr("oFilter","");
Obj.removeAttribute('oTD');
S(Obj).nodeRemove();
if( S("#UtilFilter").length>1 ) return;
top.eInfo(window,'Eliminando Filtro...',-1);
setTimeout(function(){_FilterExe2('',-1);},100);
}
function _FilterCloseAll(SoloClose){
var Obj = S("SPAN#UtilFilter").dim,
n, t=Obj.length;
for(n=t-1; n>=0; n--){
_FilterTHColor(Obj[n].oTD);
S(Obj[n].oTD).attr("oFilter","");
Obj[n].removeAttribute('oTD');
S(Obj[n]).nodeRemove();
}
if( SoloClose ) return;
top.eInfo(window,'Eliminando Filtro...',-1);
setTimeout(function(){_FilterExe2('',-1);},100);
eClearEvent();
}
function _FilterMini(){
var obj = S.toTag(S.event(window),'SPAN');
if( obj.id=="oUtilFilter" ){
S(obj).nodeRemove();
}else{
S(obj).none();
}
}
function _FilterSort2(){
var Dim=new Array(), ns, o,
oSpan = S("SPAN#UtilFilter").dim,
y = 0;
for(ns=0; ns<oSpan.length; ns++){
Dim[Dim.length] = new Array(parseInt(oSpan[ns].NC), oSpan[ns]);
}
Dim.sort( function(a,b){ return((a[0]>b[0])?1:-1); } );
for(ns=0; ns<Dim.length; ns++){
o = Dim[ns][1];
S(o).css({
left:0,
top:y,
display:'table'
});
o.xOffset = 0;
o.yOffset = y;
y += o.offsetHeight+5;
}
eClearEvent();
}
function _FilterSort(){
setTimeout('_FilterSort2();',100);
return eClearEvent();
}
function _FilterGroup(oImg){
var Obj = S.toTag(S.event(window),'SPAN'),
nc = Obj.NC, Dim = new Array(), oDim = new Array(),
fi = parseInt(S("#BROWSE.AltoTH"))+1, FILA=DGI("BROWSE").rows, f, v,
TotalTR = FILA.length - ((FILA[FILA.length-1].className=='PieLista')?1:0);
for(f=fi; f<TotalTR; f++){
v = FILA[f].cells[nc].innerHTML.replace(/\s+$/g,'');
if( Dim[v]==undefined ) Dim[v] = 1;
}
f=0;
for(v in Dim) oDim[f++] = v;
if( /^(\+|\-)$/.test(Obj.td[0]) ){
oDim.sort(function(a, b){
a = S.replace(a, [[",",""], [".",""]])*1;
b = S.replace(b, [[",",""], [".",""]])*1;
return((a>b) ? 1 : -1)
});
}else{
oDim.sort(function(a, b){
return((a.toUpperCase()>b.toUpperCase()) ? 1 : -1)
});
}
Dim = [['-Menú']];
for(f=0; f<Math.min(25, oDim.length); f++){
if( S.trim(oDim[f]) ){
Dim[f+1] = [oDim[f], "", oDim[f]];
}
}
if( oDim.length>25 ) Dim[25] = ['...', "", ""];
S(S.event(window)).menu(
Dim
,{
noMark: true
,number: /^(\+|\-)$/.test(Obj.td[0])
,function:function(Op, Txt){
if( Op==null || Txt=='...' ) return;
S.toTag(oImg,'TR').getElementsByTagName('INPUT')[0].value = Txt;
}
}
);
eClearEvent();
}
function eListMultiSelec(){
var sk = event.shiftKey,
oTD = S.event(window),
o = S.toTag(oTD, "TR"), c, td,
runFunc = S(":LISTMULTISELECT").attr("eUserFunction");
if( o==null || o.tagName!="TR" || o.getAttribute("disabled") ) return;
if( oTD.className=="JSOnClickRow" ){
_oTD = oTD;
_Celda = oTD;
_GetNumCol();
var o = S.event(window);
if( !/^(TD|IMG|I|TCXSPAN)$/.test(o.tagName) ) return;
SelecUsu(o);
return;
}
td = S(o.cells[o.cells.length-1]).obj;
if( td.tagName=="TD" ){
if( sk ){
var pk = S("#BROWSE").attr("SeekCampos").split(":"),
tr = S("TBODY",S("#BROWSE")).obj.rows,
t = tr.length,
c = tr[0].cells.length-1, txt="", i, pTR=-1,
uTR=td.parentNode.rowIndex-(S("#BROWSE").attr("AltoTH")*1)-1;
for(i=0; i<t; i++) if( tr[i].offsetHeight>0 ){
if( pTR==-1 && tr[i].cells[c].innerText=="j" ){
pTR = i;
}
tr[i].cells[c].innerText = "";
tr[i].className = "";
}
if( pTR==-1 ) pTR = 0;
if( uTR<pTR ){
i = uTR;
uTR = pTR;
pTR = i;
}
for(i=pTR; i<=uTR; i++) if( tr[i].offsetHeight>0 ){
if( runFunc!="" ){
if( !window[runFunc](tr[i], tr[i].cells[c], "I", "I") ) continue;
}
tr[i].cells[c].innerText = "j";
tr[i].className = "MarkedRow";
_OkChange = 1;
}
return eClearEvent();
}else{
if( runFunc!="" ){
if( !window[runFunc](td.parentNode, td, "I", "I") ) return eClearEvent();
}
c = S(o.cells[o.cells.length-1]).text();
S(o).class(c=="j"?"":"MarkedRow");
S(o.cells[o.cells.length-1]).text(c=="j"?"":"j");
}
_OkChange = 1;
}else if( td.tagName=="TH" ){
SeleccionaLinea();
}
}
function eListMultiSelectOk(){
var pk = S("#BROWSE").attr("SeekCampos").split(":"),
p = pk[1]*1,
tr = S("TBODY",S("#BROWSE")).obj.rows,
t = tr.length,
c = tr[0].cells.length-1, txt="", i,
conTR = (S(":LISTMULTISELECT").attr("eTR")=="ROW"),
conMiles = (/(\+|\-)/.test(S("#BROWSE TH[nc='"+p+"']").attr("td")));
if( isNaN(p) ){
S.error("El campo del [DBIndex] no encontrado");
return;
}
for(i=0; i<t; i++){
if( tr[i].cells[c].innerText=="j" ){
if( txt!="" ) txt += ",";
if( conTR ){
txt += i;
}else if( conMiles ){
txt += eClearThousands(tr[i].cells[p].innerText);
}else{
txt += tr[i].cells[p].innerText;
}
}
}
if(txt!="" ){
_OkChange = null;
i = S(":LISTMULTISELECT").attr("eJS");
if( i!=null && i!="" ){
window[i](txt.split(","));
}else{
S("BODY").hidden();
S(":_PK_MULTISELECT_").val(txt);
S(":LISTMULTISELECT").obj.submit();
}
}else S.info("No hay ninguna selección");
}
function eListMultiSelecMenu(){
var o = S.event(window);
S(o).menu([
["-Menú"],
["Marcar todo","","C"],
["Desmarcar todo","","U"],
["Invertir selección","","I"]
], {hide:true, function:function(k){
var pk = S("#BROWSE").attr("SeekCampos").split(":"),
tr = S("TBODY",S("#BROWSE")).obj.rows,
t = tr.length,
c = tr[0].cells.length-1, txt="", i,
uFunc = ( S(":LISTMULTISELECT").attr("eUserFunction")!="" );
for(i=0; i<t; i++) if( tr[i].offsetHeight>0 ){
if( tr[i].getAttribute("disabled") ) continue;
if( uFunc ){
if( !window[S(":LISTMULTISELECT").attr("eUserFunction")](tr[i], tr[i].cells[c], k, "M") ) continue;
}
if( k=="D" ){
tr[i].cells[c].innerText = "";
tr[i].className = "";
}else if( k=="C" ){
tr[i].cells[c].innerText = "j";
tr[i].className = "MarkedRow";
}else if( tr[i].cells[c].innerText=="j" ){
tr[i].className = "";
tr[i].cells[c].innerText = "";
}else{
tr[i].className = "MarkedRow";
tr[i].cells[c].innerText = "j";
}
}
}});
return S.eventClear(window);
}
var _eViewCSS = 0;
function eViewCSS(n){
var o = S(".VIEWCONTAINER");
S("I, .AddButton", o).class("+OFF");
S(S(".VIEWCONTAINER").obj.children[n]).class("-OFF");
S(".BROWSE TH[thcs]").none();
S("#BROWSE").class(_VIEWCSS[n]);
S("TH[nc]", S("#BROWSE")).none();
S("TH[nc]", S("#TablaTE")).none();
S("TH[nc]", S("#TablaTH")).none();
var tmp = _VIEWCSS[n].split(" "), t=tmp.length, n,i;
for(i=0; i<t; i++){
if( tmp[i].indexOf("col_")==0 && tmp[i].indexOf("n")==-1 ){
S("TH[nc='"+S.mid(tmp[i],4,-1)+"']").css("display:table-cell");
S("TH[thcs='"+S.mid(tmp[i],4,-1)+"']").css("display:table-cell");
}
}
if( DGI("SubTitle")!=null ) WidthSubTitle();
_eViewCSS = n;
}
function _RecalcOptionsInList(){
setTimeout(function(){
location.href = location.href+"";
}, 1);
return true;
}
var _DimVisited = [];
function eVisitedGet(){
var seek = S("#BROWSE").attr("SeekCampos"), dim;
if( seek && seek.split(",").length==1 ){
seek = seek.split(":")[1]*1;
S("#BROWSE TR.Visited").each(function(k,oTR){
_DimVisited[oTR.cells[seek].innerText] = 1;
});
}
}
function eVisitedPut(){
if( Object.keys(_DimVisited).length ){
var seek = S("#BROWSE").attr("SeekCampos").split(":")[1]*1;
S(S("#BROWSE").col(seek)).each(function(k,o){
if( _DimVisited[o.innerText] ){
S.toTag(o, "TR").className = "Visited";
}
});
}
}
function _toPublic(){
S("*[pp='1']").each(function(k,o){
if( o.onchange ) o.onchange = _Public(o.onchange);
if( o.onclick ) o.onclick = _Public(o.onclick);
if( o.oncontextmenu ) o.oncontextmenu = _Public(o.oncontextmenu);
});
}
function _Public(fn){
return function(){
if( event ){
_RowEdit = null;
var obj = S.event(event);
if( S.toTag(obj, "TABLE", "id=BROWSE") ) _RowEdit = S.toTag(obj,"TR").rowIndex;
}
if( _RowEdit==null ){
var ok = fn.apply(this, arguments);
return ok;
}
var cu,c,v,
oTR = BROWSE.rows[_RowEdit];
S("#BROWSE TH[nc]").each(function(k,o){
var cu = c = S(o).attr("campo"),
t = S(o).attr("td,te");
if( c[0]=="*" ) cu = S.left(c,1,0);
try{
if( t["te"]=='T' && '+,-,*,'.indexOf(t["td"])>-1 ){
v = S.thousandsClear(oTR.cells[k].textContent);
}else{
v = S.trim(oTR.cells[k].textContent);
}
}catch(e){
alert(cu+' / eGF', _Source, -1, eGF);
}
window["$"+cu] = v;
});
var ok = fn.apply(this, arguments);
if(event) S.eventClear(event);
return ok;
};
}
function ePublic(n){
var cu,c,v;
if( n==1 ){
window["_$_"]=[];
S("#BROWSE TH[nc]").each(function(k,o){
var cu = c = S(o).attr("campo,nc");
if( c["nc"]!=null ){
if( c["campo"][0]=="*" ) cu["campo"] = S.left(c["campo"],1,0);
v = eGF(cu["campo"]);
window["$"+cu["campo"]] = v;
window["_$_"][cu["campo"]] = v;
}
});
}else{
var Obj = _Celda;
if( Obj.tagName=='IMG' || Obj.tagName=='I' ) Obj = Obj.parentNode;
if( Obj.tagName=='TD' ) Obj = Obj.parentNode;
for(cu in window["_$_"]) if(window["_$_"][cu]!=window["$"+cu]){
ePF(cu, window["$"+cu]);
if( S(".BROWSE THEAD TH[nc='"+_NumCol[cu]+"']").attr("td")=="F4" ){
if( window["$"+cu]!='' ) window["$"+cu] = top.eDTS(window["$"+cu], "-");
}
if( _CmpAEditar!="" ) elUpdate(Obj.cells[_NumCol[cu]], window["$"+cu]);
}
}
};
function eLeft(txt,n){
return S.left(txt,n);
}
function eRight(txt,n){
return S.right(txt,n);
}
function eMid(txt,i,f){
return S.mid(txt,i,f);
}
function _LToolsView(ver){
var o = S(".MENULTOOLS");
o.attr("eHidden", null);
if( o.length==0 ) return;
if( ver!=undefined && ver==1 ){
clearTimeout(o.attr("eHide"));
return;
}
var h = o.obj.offsetHeight,
c = S.screen(window),
sh = c.h,
y = window.event.clientY,
ml = S(".MENUFOOTLIST");
if( window.event.offsetX>=(c.x+c.w-c.sb) ){
y -= h/2;
if( y<0 ) y = 0;
else{
if( c.oh!=c.ch ) y += c.sb;
if( ml.length==1 ) sh -= ml.obj.offsetHeight;
if( (y+h)>sh ){
y = sh-h;
if( c.oh!=c.ch ) y -= c.sb;
}
}
o.css("top",y).visible();
o.attr("eHide", setTimeout(function(){
o.attr("eHide", o.hidden());
},1000));
}
}
function _LToolsViewClick(ev){
var o = S.event(ev),
oTR = S.toTag(o, "TR"),
nTR = oTR.rowIndex;
if( typeof(_LToolsIcons[nTR+1][2])=="string" ){
_uMenuLTools(_LToolsIcons[nTR+1][2], _LToolsIcons[nTR+1][2], null, oTR);
}else if( _LToolsIcons[nTR+1][2]==undefined ){
if( !/^(I|IMG)$/.test(o.tagName) ){
S.eventClear(ev);
oTR.cells[0].children[0].onclick();
}
}else{
S(S.event(window)).menu(_LToolsIcons[nTR+1][2], {hide:true, function:_uMenuLTools, oncontextmenu:__MenuLTools, out:S("#UtilListICO").attr("out")});
}
S(".MENULTOOLS").hidden();
}
function _insertDinamyc(cmp, val, rowMod){
if( rowMod!=undefined ){
_Celda = _Fila.cells[0];
}else{
_Celda = _FilaLastInsert.cells[0];
}
ePF(cmp, val);
var q = S(".CONTENEDORCARD .card[ePK='-1']");
if( q.length ){
q.attr("ePK", val);
}
}
function eCardLoad(){
if( S("STYLE[type='NO']",top).length ){
S('<style title="styleCARD" name="styleCARD" type="NO">'+S("STYLE[type='NO']",top).obj.innerText+'</style>').nodeEnd();
}
}
function _CardClick(o){
var oCard = S.toTag(S.event(window), "div", "className=card"), eTR;
if( oCard==null ) return;
eTR = S(oCard).attr("eTR")*1+1;
S.eventClear(window);
S("#BROWSE TBODY TR:nth-child("+eTR+") TD:nth-child(1)").eventFire("click");
S("body").visible();
}
function eCard(on){
if( S(window).windowIs() ) return;
if( S(".VIEWCONTAINER").length ){
S(".VIEWCONTAINER").visibility(!on);
}
var oDimCard = S(".CONTENEDORCARD");
if( oDimCard.length ){
_ModeCard = on;
if(on){
S(".BROWSE").none();
var oAncho = S("#PAGINA").css("width"),
oToolBar = S(".ToolsBar");
S("#PAGINA").css("width:90%");
S("#PAGINA").attr("oAncho", oAncho);
var ancho = oToolBar.css("width")+oToolBar.css("padding-left")+oToolBar.css("padding-right");
oDimCard.css("width:"+ancho+"px;display:block");
if( oDimCard.attr("eIgual")==null ){
setTimeout(function(){
oDimCard.attr("eIgual", 1);
var maxAncho=0, w;
S(".card", oDimCard).each(function(k,o){
w = o.offsetWidth;
if( w==0 ){
o.style.display = "table";
maxAncho = Math.max(maxAncho, o.offsetWidth);
o.style.display = "none";
}else{
maxAncho = Math.max(maxAncho, o.offsetWidth);
}
});
S(".CONTENEDORCARD .card").css("width:"+maxAncho);
Recalcula();
}, 100);
}
}else{
oDimCard.none();
S("#PAGINA").css("width:"+S("#PAGINA").attr("oAncho"));
S("#PAGINA").css("display:inline-table");
S(".BROWSE").css("display:table");
}
Recalcula();
return;
}
var o = S("#BROWSE"),
eCard = o.attr("eCard");
if( on && (eCard==null || eCard==0) ){
if( eCard==null ){
S('<table id="COPYBROWSE" class="BROWSE" style="position:absolute;left:0px;top:0px;visibility:hidden"><tbody><tr><td>xxx</td></tr></tbody></table>').nodeEnd();
}
var oculta = S("#BROWSE").class().match(/col_[0-9]{1,2}n/g), borde="", newCss=[], nOculto=0;
S.each(oculta, function(k, txt){
var c = txt.match(/[0-9]{1,2}/g)[0]*1+1;
newCss.push("=#BROWSE td:nth-of-type("+c+"){display:none;}");
nOculto++;
});
var eWidth = S("#PAGINA").attr("eWith"), hTop = 0;
if( eWidth!=null ){
S("#PAGINA").attr("eWith", S("#PAGINA").obj.style.width);
}
var wContenido=0, wLabel=0, hContent=0;
S("#BROWSE TBODY TR:nth-of-type(1) TD").each(function(k,o){
wContenido = Math.max(wContenido, o.offsetWidth);
hTop = S(o).css("paddingTop");
hContent = Math.max(hContent, o.offsetHeight-(hTop*2));
});
hContent = S("#BROWSE TBODY TR:nth-of-type(1)").height();
var txt = S("#BROWSE TH[nc]").dim, n, wTest=S("#COPYBROWSE TR TD"), c;
for(n=0; n<txt.length; n++){
var oTH = S("#BROWSE TH[nc='"+n+"']").obj, img, text=" ";
if( oTH.children.length && oTH.children[0].tagName!="BR" ){
img = oTH.children[0];
if( /^(I|IMG|svg)$/.test(img.tagName) ){
c = 'content: "*";';
if( img.tagName=="IMG" ){
}else if( img.tagName=="I" ){
c = 'content: "'+img.innerText+'";font-family:eDes;top:0px;';
}else{
}
}else{
text = S.trim(img.innerHTML.replace(/<br>/gi, " "));
c = 'content: "'+text+'";';
c += top._FontText;
}
}else{
text = S.trim(oTH.innerHTML.replace(/<br>/gi, " "));
c = 'content: "'+text+'";';
c += top._FontText;
}
newCss.push('=#BROWSE td:nth-of-type('+(n+1)+'):before {'+c+'}');
if( oTH.offsetWidth>0 ){
wTest.html('<b>'+text+'</b>');
wLabel = Math.max(wLabel, wTest.obj.offsetWidth);
if( borde=="" ){
borde = '+#BROWSE tbody tr {border: 1px solid '+S.rgb2hex(S(oTH).css("backgroundColor"))+';}';
newCss.push(borde);
}
}
}
wLabel += 5;
newCss.push('=#BROWSE tbody tr {width:'+(wLabel+wContenido)+'px;}');
newCss.push('=#BROWSE td {padding-left:'+wLabel+'px; height:'+hContent+'px;}');
if( (text.length-nOculto)>1 ){
newCss.push('+#BROWSE td {border-bottom: 1px solid '+S.rgb2hex(S("#BROWSE").css("backgroundColor"))+';}');
}
newCss.push(borde);
newCss.push('=#BROWSE td:before {top: '+hTop+'px;}');
newCss.push('+#BROWSE TD {height:'+S(".BROWSE TBODY TR").height()+'px;}');
S(':styleCARD').obj.type = "text/css";
for(n=0; n<newCss.length; n++){
S(window).rule(newCss[n], "styleCARD");
}
S("#GROUPTITLE").css({marginLeft: S("#BROWSE TBODY TR:nth-child(1)").css("margin-left")});
if( eWidth!=null ) S("#PAGINA").css("width", "auto");
S("#BROWSE").class("+NO_SHADOW");
o.attr("eCard", 1);
Recalcula();
}else if( !on && eCard==1 ){
S("#BROWSE").class("-NO_SHADOW");
S("#GROUPTITLE").css({marginLeft: "auto"});
S("#PAGINA").css("width", S("#PAGINA").attr("eWith"));
o.attr("eCard", 0);
S(':styleCARD').obj.type = "NO";
}
}
function _CardEvent(Card){
var win = Card.win;
Card.on("mouseenter", function(ev){
clearTimeout(win._CardSobre);
var oCard = S.event(ev),
xy = S.xy(oCard),
el = S.xy(S("#MENUCARDFLOAT", win).obj);
if( S(oCard).attr("eDelete")!=null ) return;
S("#MENUCARDFLOAT", win).attr("eTR", oCard.getAttribute("eTR"));
S("#MENUCARDFLOAT", win).visible().css("left:"+(xy.x+xy.w-el.w-5)+";top:"+(xy.y+xy.h-el.h-5));
});
Card.on("mouseleave", function(ev){
win._CardSobre = setTimeout(function(){
S("#MENUCARDFLOAT", win).hidden();
}, 1);
});
}
function _CardEvents(){
setTimeout(function(){
if( !S("#MENUTRFLOAT").length ) return;
var menuCard = '<span id="MENUCARDFLOAT" class="MENUTROPACITY NOBREAK"></span>',
oMenu = S(menuCard).nodeEnd();
S(oMenu).html(S("#MENUTRFLOAT").html());
S("#MENUTRFLOAT *").each(function(k,o){
S("#MENUCARDFLOAT *").dim[k].onclick = o.onclick;
});
S(oMenu).css("position:absolute;visibility:hidden;");
S(oMenu).on("mouseenter", function(ev){
clearTimeout(_CardSobre);
var o = S.event(ev);
S(o).class("-MENUTROPACITY");
});
S(oMenu).on("mouseleave", function(ev){
var o = S.event(ev);
S(o).class("+MENUTROPACITY");
});
var _CardSobre=null;
S(".card").on("mouseenter", function(ev){
clearTimeout(_CardSobre);
var oCard = S.event(ev),
xy = S.xy(oCard),
el = S.xy(S("#MENUCARDFLOAT").obj);
if( S(oCard).attr("eDelete")!=null ) return;
S("#MENUCARDFLOAT").attr("eTR", oCard.getAttribute("eTR"));
S("#MENUCARDFLOAT").visible().css("left:"+(xy.x+xy.w-el.w-5)+";top:"+(xy.y+xy.h-el.h-5));
});
S(".card").on("mouseleave", function(ev){
_CardSobre = setTimeout(function(){
S("#MENUCARDFLOAT").hidden();
}, 1);
});
}, 1000);
}
function _ListSetup(obj){
var oTabla = S("#BROWSE"),
aClass =  oTabla.class(),
oClass = oTabla.attr("classBak"),
dim =  oTabla.class().match(/col_[0-9]{1,2}(l|c|r|n)/g),
th = S("TH[nc]", oTabla).dim, n, tmp, title, i=0, check,
oMenu = [["-"+S.lng(346)]], bak=[], cv,iz,dch, oTH;
for(n=0; n<th.length; n++){
oTH = S("TH[nc='"+n+"']", oTabla).obj;
tmp = oTabla.class().match(RegExp('col_'+n+'(l|c|r|n)'));
title = "";
if( S('#_TIP_H_'+n).length ) title = S('#_TIP_H_'+n).text();
if( S.trim(oTH.innerHTML)!="" ){
bak[i] = (tmp[1]!="n");
check = (tmp[1]!="n"? "c":"");
cv = S(oTH).attr("cv");
if( S(oTH).attr("e-dflt")=="-" ){
iz = "<b>";
dch = "</b>";
}else{
iz = "";
dch = "";
}
if( oTH.innerText!=oTH.getAttribute("campo") ){
var txt = oTH.innerHTML;
if( oTH.children.length>0 && S.right(txt,4)=="</i>" ){
txt = S.replace(txt, 'style="', 'style="font-size:'+S(oTH.children[0]).css("font-size")+'px;');
}
if( oTH.parentNode.rowIndex==1 ){
oMenu.push([iz+S.replace(txt+dch, "<br>", " "), `[][${check}][-]`, tmp[0], title, null, "color:#bbbbbb", "OFF"]);
}else{
oMenu.push([iz+S.replace(txt+dch, "<br>", " "), `[]${check}`, tmp[0], title]);
}
i++;
}
}
}
oMenu.push(["="+S.lng(213), "", "A", null, null, "margin:20px;padding:20px;"]);
S(obj).menu(oMenu, {noMark:true, scroll:true, type:"18,16,3,2,4,11,12,1,7,6,5,13,14", function:function(o, trigger){
var n, change=[], nc, cv=0, save="", oDesTH=null, oDesTE=null,
arg = S.xy(S.event(window).parentNode);
if( S("#TablaTH").obj.children.length ) oDesTH = S("#TablaTH").obj.children[0];
if( S("#TablaTE").obj.children.length ) oDesTE = S("#TablaTE").obj.children[0];
for(n=0; n<o.length; n++){
if( o[n][0] ) cv++;
if( o[n][0]!=bak[n] ) change.push([o[n][0], o[n][1]]);
}
if( cv==0 ){
S.error(347);
return;
}
for(n=0; n<change.length; n++){
nc = S.mid(change[n][1],4,-1);
if( change[n][0] ){
tmp =  oClass.match(RegExp('col_'+nc+'(l|c|r|n)'));
aClass = S.replace(aClass, change[n][1], tmp[0]);
S(".BROWSE TH[nc='"+nc+"']", oTabla).display("table-cell");
if( oDesTH!=null && S(".BROWSE TH[nc='"+nc+"']", oDesTH).length ) S(".BROWSE TH[nc='"+nc+"']", oDesTH).display("table-cell");
if( oDesTE!=null && S(".BROWSE TH[nc='"+nc+"']", oDesTE).length ) S(".BROWSE TH[nc='"+nc+"']", oDesTE).display("table-cell");
}else{
if( !oTabla.class("?bak"+change[n][1]) ) aClass += " bak"+change[n][1];
aClass = S.replace(aClass, change[n][1], S.left(change[n][1],0,-1)+"n");
S(".BROWSE TH[nc='"+nc+"']", oTabla).none();
if( oDesTH!=null && S(".BROWSE TH[nc='"+nc+"']", oDesTH).length ) S(".BROWSE TH[nc='"+nc+"']", oDesTH).none();
if( oDesTE!=null && S(".BROWSE TH[nc='"+nc+"']", oDesTE).length ) S(".BROWSE TH[nc='"+nc+"']", oDesTE).none();
}
}
if( change.length ){
oTabla.class(aClass);
for(n=0; n<o.length; n++){
nc = S.mid(o[n][1],4,-1);
save += S(".BROWSE TH[nc='"+nc+"']", oTabla).attr("oCampo")+"="+(o[n][0]? 1:0)+"|";
}
arg.y -= arg.h;
var oInfo = S(`<span e-kill-info=1 style='position:absolute; left:${arg.x}px; top:${arg.y}px; width:${arg.w}px; height:${arg.h}px;'></span>`).nodeEnd("body");
S.call("E:$listsetup.php", {source:_Source, data:save}, {infoInObj:oInfo.obj});
Recalcula();
if( oDesTH!=null || oDesTE!=null ) _MovTitulos();
}
}});
}
function _filterTR(obj){
if( _MAXRECFULL ){
if( !S.pagination(obj.value) ){
return;
}
return;
}
var val = S.lower(S.trim(obj.value)), n, visible=[],
lowerOn = S.setup.accent.lowerOn,
lowerOff = S.setup.accent.lowerOff,
com = "+.()|=";
for(n=0; n<com.length; n++) val = S.replace(val, com[n], "\\"+com[n]);
val = S.replace(val, "?", ".");
for(n=0; n<lowerOn.length; n++) val = S.replace(val, lowerOn[n], lowerOff[n]);
for(n=0; n<5; n++) val = S.replace(val, lowerOff[n], "("+lowerOff[n]+"|"+lowerOn[n]+"|"+lowerOn[n+5]+"|"+lowerOn[n+10]+"|"+lowerOn[n+15]+")");
val = S.replace(val, "*", ".*");
var exp = new RegExp(val, "i");
S("#BROWSE TH[nc]").each(function(k,o){
if( o.offsetWidth>0 ) visible.push(k);
});
var oTR = S("#BROWSE TBODY TR").dim,
t = oTR.length, txt, i, it=visible.length;
if( S(".PaginationBar").length ){
if( val=="" ){
_PaginarFullFilter = false;
S(".PaginationBar").block();
for(n=0; n<t; n++) oTR[n].style.display = "none";
var Desde = DGI('DESDE').value*1,
MaxRec = sMaxRec = DGI('MAXREC').value*1,
vDesde = (Desde-1)*MaxRec;
for(n=vDesde; n<t; n++){
oTR[n].style.display = '';
if( --MaxRec<1 ) break;
}
}else{
_PaginarFullFilter = true;
S(".PaginationBar").none();
for(n=0; n<t; n++){
txt = "";
for(i=0; i<it; i++) txt += "~"+oTR[n].cells[visible[i]].textContent;
oTR[n].style.display = exp.test(txt)? "" : "none";
}
}
setTimeout(function(){
var xy = S.screen(window);
document.body.style.overflow = xy.sh>xy.h ? "auto":"hidden";
}, 1);
}else{
for(n=0; n<t; n++){
txt = ""; for(i=0; i<it; i++) txt += "~"+oTR[n].cells[visible[i]].textContent;
oTR[n].style.display = exp.test(txt)? "" : "none";
}
}
}
function eFilterSelect(field, title, dim){
var win = window;
if( S(":"+field, ":FieldCondi", win).length==0 ){
S("<input name='"+field+"'>").nodeEnd(":FieldCondi", win);
}
var val = S(":"+field, ":FieldCondi", win).val(),
op = S.replace(val ,"'","", '"','', "(","", ")","").split(","), oMenu=[], n,
bak = op.sort().join(","), newFilter=[];
oMenu = [["-"+title]];
for(n=0; n<dim.length; n++){
oMenu.push([dim[n][1], "[]["+(S.is(dim[n][0], op)?"C":"")+"]", dim[n][0]]);
}
oMenu.push(["=Aceptar", "", "A", null, null, "margin:20px;padding:20px;"]);
S(S.event(window)).menu(oMenu, {noMark:true, scroll:true, type:"18,16,3,2,4,11,12,1,7,6,5,13,14", function:function(o,b,c){
for(n=0; n<o.length; n++) if( o[n][0] ) newFilter.push(o[n][1]);
newFilter = newFilter.sort().join(",");
if( newFilter!=bak ){
newFilter = S.replace(newFilter,",","','");
if( newFilter!="" && S.count(",", newFilter)>0 ){
newFilter = "('"+newFilter+"')";
}
S(":"+field, ":FieldCondi", win).val(newFilter);
o = S(":FieldCondi", win).obj;
if( o.action.indexOf("_EMPTYLIST")==-1 ) o.action += "&_EMPTYLIST=1";
var act = S.mid(o.action, "?", ":");
o.action = S.replace(o.action, "edes.php?"+act+":", "edes.php?L"+act[1]+"l:");
o.target = "";
o.submit();
}
}});
}
function eFilterOne(op, label, trigger, oTr, oTable, field){
if( op==null ) return;
var win = window;
if( S(":"+field, ":FieldCondi", win).length==0 ){
S("<input name='"+field+"'>").nodeEnd(":FieldCondi", win);
}
S(":"+field, ":FieldCondi", win).val(op);
o = S(":FieldCondi", win).obj;
if( o.action.indexOf("_EMPTYLIST")==-1 ) o.action += "&_EMPTYLIST=1";
var act = S.mid(o.action, "?", ":");
o.action = S.replace(o.action, "edes.php?"+act+":", "edes.php?L"+act[1]+"l:");
o.target = "";
o.submit();
}
function _NuevaPaginaIni(win, v){
var Origen = S("#BROWSE", win).obj,
Destino = S("#BROWSE").obj,
DesdeList = v["DesdeList"],
HastaList = v["HastaList"],
TotalReg = v["TotalReg"],
TotalReg_RowsOnPage = v["TotalReg_RowsOnPage"],
_CARDSHOW = v["_CARDSHOW"],
_CHARTCOL = v["_CHARTCOL"],
_ChartMax = v["_ChartMax"],
_ChartMin = v["_ChartMin"],
_FunctionLastPage = v["_FunctionLastPage"],
_FunctionNextPage = v["_FunctionNextPage"],
_ISLOPMenu = v["_ISLOPMenu"],
_ISUBLIST = v["_ISUBLIST"],
_ISUBLISTTOOLS = v["_ISUBLISTTOOLS"],
_LToolsType = v["_LToolsType"],
_OnClickEditList = v["_OnClickEditList"],
_PAGINCR = v["_PAGINCR"],
_RD = v["_RD"],
_REG_ = v["_REG_"],
_REG_RowsOnPage_1 = v["_REG_RowsOnPage_1"],
_RowsOnPage = v["_RowsOnPage"],
_TGrupos = v["_TGrupos"],
_TIPO_ = v["_TIPO_"],
_TIPTD = v["_TIPTD"],
_TOTALSROWS = v["_TOTALSROWS"],
_VIEW__VIEWFORMAT = v["_VIEW__VIEWFORMAT"],
_WINCAPTION = v["_WINCAPTION"],
box = v["box"],
floor_REG_RowsOnPage_1 = v["floor_REG_RowsOnPage_1"]
;
var oCard = S(".CONTENEDORCARD", win),
viewCard = oCard.length;
var	TRec = Destino.rows.length,
nl = parseInt(Destino.getAttribute("AltoTH"))+1,
oAnchoCOL, oAnchoTD, dAnchoCOL, dAnchoTD, n,
slt = S.scrollGet(S("BODY").obj);
Origen.className = Destino.className;
try{
if( top._M_!="" ){
var oTH = S("TH", Origen).dim,
dTH = S("TH", Destino).dim, bak;
bak = S(Destino).attr("classbak");
if( bak==null ){
S(Origen).obj.removeAttribute("classbak");
}else{
S(Origen).attr("classbak", (bak!=null )? bak:null);
}
S(Origen).obj.className = S(Destino).class();
for(n=0; n<oTH.length; n++){
bak = dTH[n].getAttribute("displayBak");
if( bak==null ){
oTH[n].removeAttribute("displayBak");
}else{
oTH[n].setAttribute("displayBak", bak);
}
oTH[n].style.display = dTH[n].style.display;
}
}
while( TRec>nl && Destino.rows[nl].cells[0].colSpan>1 ) nl++;
if( TRec>nl && _AnchoCols.length==0 ){
for(n=0; n<Destino.getAttribute("eCols"); n++){
_AnchoCols[n] = Destino.rows[nl].cells[n].offsetWidth*1;
}
}
}catch(e){}
function _RDPaginar(){
var xSpan = '<SPAN style="overflow-x:hidden; float:left; white-space:nowrap; text-overflow:ellipsis; width:100%;">',
oDIV = DGI('_RDColDIV'),
rh, r, c;
for(rh=0; rh<=parseInt(Origen.getAttribute("AltoTH")); rh++) for(c=0; c<Origen.rows[rh].cells.length; c++){
if( Origen.rows[rh].cells[c].NC!=undefined && oDIV.getAttribute('IniCol'+c)!=undefined ){
Origen.rows[rh].cells[c].innerHTML = Origen.rows[rh].cells[c].innerHTML;
for(r=parseInt(Origen.AltoTH)+1; r<Origen.rows.length; r++) Origen.rows[r].cells[c].innerHTML = xSpan+Origen.rows[r].cells[c].innerHTML+'</SPAN>';
}
}
}
if( _RD!='' ) _RDPaginar();
Origen.setAttribute('FilterON', Destino.getAttribute('FilterON'));
Origen.setAttribute('eOrder', Destino.getAttribute('eOrder'));
Origen.style.display = "inline-table";
if( _PAGINCR ){
var oRows = Origen.rows,
oTotal = oRows.length,
dTotal = Destino.rows.length;
for(n=Origen.getAttribute("AltoTH")+1; n<oTotal; n++) S(Destino.insertRow(dTotal++)).nodeSwap(oRows[n]);
}else{
var eMenu = Destino["eMenu"],
eFunc = Destino["func"];
S(Origen).css("width:100%");
Destino.outerHTML = Origen.outerHTML;
if( eMenu!=undefined ){
S(window).menuRow("#BROWSE", eMenu, eFunc);
S(eMenu).hidden();
S("*[op]", eMenu).css({visibility:""});
}
}
S.scrollSet(S("BODY").obj, {left:slt.scrollLeft, top:slt.scrollTop});
Destino = S("#BROWSE").obj;
Destino.style.width = "";
var TRec = Destino.rows.length;
nl = parseInt(Destino.getAttribute("AltoTH"))+1;
try{
while( TRec>nl && Destino.rows[nl].cells[0].colSpan>1 ) nl++;
if( TRec>nl ){
for(n=0; n<Destino.getAttribute("eCols"); n++){
if( _AnchoCols[n]>Destino.rows[nl].cells[n].offsetWidth && _VIEW__VIEWFORMAT ){
Destino.rows[nl].cells[n].style.width = _AnchoCols[n]+"px";
}else{
_AnchoCols[n] = Destino.rows[nl].cells[n].offsetWidth*1;
}
}
}
}catch(e){}
document.body.setAttribute('SePagino', 1);
if(DGI("_Pie")) DGI("_Pie").textContent = _REG_RowsOnPage_1;
if(DGI("_Pie2")) DGI("_Pie2").textContent = TotalReg_RowsOnPage;
DGI("DESDE").setAttribute("OldValue", DesdeList);
DGI("DESDE").value = DesdeList;
DGI("DESDE").setAttribute('NREG', _REG_+1);
DGI("DESDE").setAttribute('NPAG', floor_REG_RowsOnPage_1);
DGI("TIPO").value = _TIPO_;
DGI("HASTA").value = HastaList;
DGI("HASTA").setAttribute("TPAG", HastaList);
DGI("MAXREC").value = _RowsOnPage;
if( DGI("oMAXREC")!=null ) DGI("oMAXREC").value = _RowsOnPage;
if( DGI('islPageUp')!=null ){
if( _REG_==0 ){
S("#islPageUp").class("+OFF");
S("#islPageDown").class("-OFF");
}else if( HastaList==floor_REG_RowsOnPage_1 ){
S("#islPageUp").class("-OFF");
S("#islPageDown").class("+OFF");
}
}
if( _WINCAPTION ){
if( DGI("_Pie")!=null ){
top.eSWSetStatus(window, DGI("_Pie").parentNode.textContent);
}
}
if( DGI("DESDE").getAttribute('CS')==1 ){
DGI("DESDE").select();
DGI("DESDE").setAttribute("CS", 0);
}
if( _LToolsType=='E' || _LToolsType=='S' || _LToolsType=='b' || _ISUBLISTTOOLS=="E" ){
if( DGI("oDESDE") ){
DGI("oDESDE").setAttribute("OldValue", DesdeList);
if(DGI("oDESDE")) DGI("oDESDE").value = DesdeList;
DGI("oDESDE").setAttribute('NREG', _REG_+1);
DGI("oDESDE").setAttribute('NPAG', floor_REG_RowsOnPage_1);
DGI('oDESDE').value = DesdeList;
DGI("oHASTA").value = HastaList;
if(DGI("oHASTA")) DGI("oHASTA").setAttribute("TPAG", HastaList);
DGI("oMAXREC").value = _RowsOnPage;
if( DGI("oDESDE").getAttribute('CS')==1 ){
if( DGI("oDESDE").offsetWidth>0 ) DGI("oDESDE").select();
DGI("oDESDE").setAttribute("CS",0);
}
if( _LToolsType=='b' ){
if( DesdeList==1 ) S("#PaginationBarIZ").class("=ButtonInNO OFF ROUNDED2 NoRight MasMargin");
else S("#PaginationBarIZ").class("=ButtonIn ROUNDED2 NoRight MasMargin");
if( HastaList==DesdeList ) S("#PaginationBarDR").class("=ButtonInNO OFF ROUNDED2 NoLeft MasMargin");
else S("#PaginationBarDR").class("=ButtonIn ROUNDED2 NoLeft MasMargin");
var tabla = S("#oDESDE_TABLE").obj,
tr = tabla.rows, ntr=tr.length, total=HastaList, n, borrar, oTR, oTD;
if( ntr<total ){
for(n=ntr+1; n<=total; n++){
oTR = tabla.insertRow();
oTR.insertCell().innerText = n;
oTR.insertCell().innerText = n;
}
}else if( ntr>total ){
borrar = ntr-total;
for(n=0; n<borrar; n++){
tabla.deleteRow(total);
}
}
var oPaginationBar = S(".PaginationBar").obj;
for(n=0; n<=5; n++){
oPaginationBar.children[n].style.display = ((_RowsOnPage==TotalReg)? "none":"inline-flex");
}
S(".Button SPAN[eSelectSpan='oDESDE'] SPAN").text(DesdeList);
S("#PaginationBarBT").html(box);
}
}
}
if( _CARDSHOW && _ISUBLIST==false ){
_CardEvents();
}
if( viewCard ){
S(".CONTENEDORCARD").HTML(oCard.HTML());
if( _ModeCard ) eCard(1);
}
S('.SELECT').none();
eHideBusy();
MovTitulos();
TitulosON();
MovTitulos();
eHideBusy();
_RecalcSlideTH();
WidthSubTitle();
if( _ISUBLIST==true && _ISLOPMenu!='' ){
Destino.onclick = opISubList;
Destino.oncontextmenu = opISubList;
Destino.style.cursor = 'pointer';
}else{
}
if( _CHARTCOL>0 ) ChartWidth(_ChartMax, _ChartMin);
if( _TOTALSROWS && typeof(_REG_TotalReg_RowsOnPage)!="undefined" && _REG_TotalReg_RowsOnPage ) ColorFilaTotales();
if( _OnClickEditList ) Destino.onclick = elEdit;
if( _TIPTD>0 ){
_MasInfoEvent();
}
if( _FunctionNextPage!='' ) eval(_FunctionNextPage+';');
if( !_ISUBLIST ){
Recalcula(1, true);
eDelHelp();
}
if( !_PAGINCR ){
MovTitulos();
}
if( typeof(ChartReload)!="undefined" ) ChartReload();
if( _FunctionLastPage!='' && typeof(_REG_TotalReg_RowsOnPage)!="undefined" && _REG_TotalReg_RowsOnPage ) eval(_FunctionLastPage+";");
if( PAGINA.style.width=="" ) PAGINA.style.width = "";
try{
S.loading(window, 0);
}catch(e){}
_MovTitulos();
if( DGI('BUSCAR')!=null && DGI('BUSCAR').offsetWidth>0 ) eBuscarFoco();
eVisitedPut();
}
function _NuevaPaginaEnd(win, _TGrupos){
var slt = S.scrollGet(S("BODY").obj);
TitulosON();
S.scrollSet(S("BODY").obj, {left:slt.scrollLeft, top:slt.scrollTop});
if( _TGrupos==0 ) _FilterExeNewPag();
S.scrollSet(window, {left:0, top:0});
_toPublic();
_3CXClear();
top.eClearPag(win);
}
function _PaginarKey(winFrom){
var ev = winFrom || window.event,
o = S.event(ev);
if( o && (o.id=="search" || o.id=="filterTR") ) return true;
var win = S.windowFocus(),
k = S.eventCode(ev);
if( win.frameElement && win.frameElement.getAttribute("eCloseEsc")!=null ){
S.windowClose(win);
return true;
}
if( typeof(win._Obj)=="undefined" || win._Obj!="L" ) return true;
if( win.DGI('BUSCAR')!=null && S.event(ev).name=='BUSCAR' ) return true;
if( k==8 && !win._EdEditList ) return eClearEvent();
if( typeof(_ShortcutKey)!="undefined" && (ev.ctrlKey || ev.altKey) && _ShortcutKey[ev.code] ){
S(`I[op='${_ShortcutKey[ev.code]}']`).eventFire("click");
return;
}
var Mas = '';
if( ev.altKey ) Mas = 'a';
if( ev.ctrlKey ) Mas = 'c';
if( ev.shiftLeft ) Mas = 's';
if( k==17 ) return true;
if( ',114,116,122,a39,a37,a8,c53,c65,c69,c72,c79,c76,c73,c85,s121,'.indexOf(','+Mas+k+',')!=-1 ) return eClearEvent();
if( ',93,a36,a37,c81,'.indexOf(','+Mas+k+',')!=-1 ) return eClearEvent(1);
switch( k ){
case 36:
if( !win._PagIncremental ) win.Paginar('I');
break;
case 33:
if( !win._PagIncremental ) win.Paginar('<');
break;
case 34:
if( !win._PagIncremental ) win.Paginar('>');
break;
case 35:
if( !win._PagIncremental ) win.Paginar('F');
break;
case 38:
case 37:
if( win.DGI("BUSCAR")!=null && win.DGI("BUSCAR").value.length>0 ) win.Buscar(win.DGI("BUSCAR").value,-1);
break;
case 40:
case 39:
if( win.DGI("BUSCAR")!=null && win.DGI("BUSCAR").value.length>0 ) win.Buscar(win.DGI("BUSCAR").value, 1);
break;
case 80:
if( !win._ConImpresora && Mas=='c' ) eClearEvent();
break;
case 27:
var salir = false;
if( win._Obj ){
if( win._Obj=="L" ) salir = true;
else if( /^(F|G)$/.test(win._Obj) ){
if( /^(c|cR|b|bR)$/.test(win._Mode) ){
salir = true;
}else if( ev.ctrlKey ){
salir = true;
}
}
}
if( salir && (win.frameElement && win.frameElement.getAttribute("eCloseEsc"))!=null ){
S.windowClose(win);
return;
}
break;
case 112:
S.help(window, ev);
break;
default:
if( win._Obj=="L" && ((k>=49 && k<=57) || (k>=97 && k<=105)) && win.document.activeElement.tagName!="INPUT" ){
k -= (k>=97 && k<=105) ? 96 : 48;
if( win.DGI("HASTA")!=null && (win.DGI("HASTA").value*1)>=k ){
win.DGI("DESDE").value = (k==1)? 0:k;
win.Paginar("?");
}
}
}
}
var _oCalculator = null,
_CalculatorOFF = false;
function _CalculatorGet(){
var Obj = DGI('CALCULATOR');
if( Obj==null ){
Obj = S(S.resouce("CALCULATOR")).nodeEnd("body").obj;
}
return Obj;
}
function _CalculatorMem(){
if( document.activeElement && document.activeElement.id=="filterTR" ){
return true;
}
if( _CalculatorOFF ) return true;
_oCalculator = S.event(window);
}
function _Calculator(){
if( document.activeElement && document.activeElement.id=="filterTR" ){
return true;
}
if( window.event.type=="keydown" ){
_PaginarKey();
}
if( _CalculatorOFF ) return true;
if( !_oCalculator ) return true;
if( /^(?:IMG|I)$/i.test(_oCalculator.tagName) ) _oCalculator = _oCalculator.parentNode;
if( _oCalculator.tagName!="TD" ) return true;
var key = S.eventCode(window.event);
if( _oCalculator==null && window.event.type=='keydown' && key==13  ){
_oCalculator = S.event(window);
return;
}
if( _oCalculator==null ) return;
if( window.event.type=='keydown' && (key==13 || key==67) ) IniFin();
else if( window.event.type=='keypress' ){
var Op = String.fromCharCode(key);
if( '\+\-\/\*\%'.indexOf(Op)>-1 ){
var Obj = _CalculatorGet();
if( S(Obj).attr("Estado")==1 ){
Add();
if( '+,-,'.indexOf(Obj.td)>-1 && Obj.children[0].rows.length>2 && Op=='%' ){
Calcular(Obj, '%');
}else if( 'F4P4'.indexOf(Obj.td)>-1 && Obj.children[0].rows.length>2 ) Calcular(Obj);
}
}else if( Op.toUpperCase()=='C' || Op.toUpperCase()=='=' ){
IniFin();
}else if( Op.toUpperCase()=='M' || Op.toUpperCase()=='G' ){
_CalculatorClose();
var Obj = _CalculatorGet();
if( Op.toUpperCase()=='M' && Obj.oRes==undefined ) return;
if( Op.toUpperCase()=='G' && top._CalculatorRes==undefined ) return;
Show(Obj,1);
Obj.td = Obj.oTD;
var tr = Obj.children[0].insertRow();
tr.insertCell().textContent = ' ';
var o = tr.insertCell();
o.textContent = (Op.toUpperCase()=='M')? Obj.oRes : top._CalculatorRes;
o.style.textAlign = "right";
tr.insertCell().textContent = ' ';
}else if( Op.toUpperCase()=='S' ){
if( _oCalculator.colSpan>1 ) return;
_CalculatorClose();
var Obj = _CalculatorGet(), nc = _oCalculator.cellIndex;
S(Obj).attr("td", S(DGI('BROWSE').children[0].children[nc]).attr("td"));
var Res = 0, TR = DGI('BROWSE').rows,
tRow = TR.length,
d = S(DGI('BROWSE').children[0].children[nc]).attr("nd");
if( TR[tRow-1].className=='PieListaGraf' ) tRow-=2;
else if( TR[tRow-1].className=='PieLista' ) tRow--;
var aTH = DGI('BROWSE').getAttribute('AltoTH')*1+1;
if( '+,-,'.indexOf(Obj.td)>-1 ){
var sD = 0, tmp;
for( n=aTH; n<tRow; n++ ){
try{
if( TR[n].offsetHeight==0 ) continue;
v = eClearThousands(TR[n].cells[nc].textContent);
if( !isNaN(v) ){
Res += v;
tmp = TR[n].cells[nc].textContent.split(',');
if( tmp.length>1 ) sD = eTrim(tmp[1]).length;
}
}catch(e){}
}
if( isNaN(Res) ) return;
if(d==undefined) d=sD;
Res = eShowThousands(Res, d);
}else{
for(n=aTH; n<tRow; n++){
try{
if( TR[n].offsetHeight==0 ) continue;
if( eTrim(TR[n].cells[nc].innerHTML)!='' ) Res++;
}catch(e){}
}
Res = eShowThousands(Res);
}
Obj.oTD = Obj.td;
Obj.oRes = Res;
top._CalculatorRes = Res;
Show(Obj,0);
Add(Res);
S(Obj).attr("Estado", 1);
}
return true;
}
function Show(Obj, op){
S(Obj).attr("Estado", op);
Obj.style.display = "table";
S(Obj).move(false, Obj.children[0].rows[0].cells[1]);
S(Obj).css("position:fixed");
}
function Add(v){
if( v==undefined && eTrim(_oCalculator.textContent)=='' ) return false;
var Obj = _CalculatorGet(),
Op = String.fromCharCode(S.eventCode(event)).toUpperCase();
if( v==undefined ){
var td = S(DGI("BROWSE").children[0].children[_oCalculator.cellIndex]).attr("td");
if( '+,-,F4P4'.indexOf(td)==-1 ) return false;
if( S(Obj).attr("td")==undefined ) S(Obj).attr("td",td);
else if( '+,-,'.indexOf(td)>-1 && '+,-,'.indexOf(S(Obj).attr("td"))>-1 ){
}else if( td.substr(0,1)!=S(Obj).attr("td").substr(0,1) ) return false;
}
if( Op=="C" || Op=="=" ) Op = "";
if( 'F4P4'.indexOf(td)>-1 && Obj.children[0].rows.length==2 ) Op='-';
tr = S(Obj.children[0]).tr("i", null, [
"",
{text:((v==undefined)? _oCalculator.textContent : v), css:"text-align:right;"+top._FontNumber},
(Obj.children[0].rows.length>1 && v==undefined) ? Op : " "
]);
if( S(Obj).attr("Estado")==1 || (v==undefined && S(Obj).attr("Estado")==0) ){
_oCalculator.style.border = "1px solid #cf4000";
tr.Obj = _oCalculator;
_oCalculator.pInCalc = tr;
}
return true;
}
function Calcular(Obj, xOp){
if( Obj.children[0].rows.length<3 ){
_CalculatorClose();
return;
}
S(Obj).attr("Estado",0);
var Res = Obj.children[0].rows[1].cells[1].textContent, n,v,
tmp = eTrim(Obj.children[0].rows[1].cells[1].textContent).split(','), d=0,
td = S(Obj).attr("td");
if( tmp.length>1 ) d = tmp[1].length;
if( xOp=='%' ){
Res = eClearThousands(Res);
var por = eClearThousands(Obj.children[0].rows[2].cells[1].textContent);
Res = (por*100)/Res;
if( Res=='Infinity' ) _CalculatorClose();
else Res = eShowThousands(Res, 2);
}else if( td=='F4' ){
Res = eShowThousands(parseInt(top.eDaysInDates( Obj.children[0].rows[2].cells[1].textContent, Res)));
}else if( td=='P4' ){
Res = eShowThousands(top.ePeriodDiff(Res, Obj.children[0].rows[2].cells[1].textContent));
}else if( '+,-,'.indexOf(S(Obj).attr("td"))>-1 ){
Res = eClearThousands(Res);
for(n=2; n<Obj.children[0].rows.length; n++){
v = eClearThousands(Obj.children[0].rows[n].cells[1].textContent), n;
switch( eTrim(Obj.children[0].rows[n].cells[2].textContent) ){
case '+': Res += v; break;
case '-': Res -= v; break;
case '*': Res *= v; break;
case '/': Res /= v; break;
}
}
if( isNaN(Res) ) return;
Res = eShowThousands(Res, d);
Obj.oTD = td;
Obj.oRes = Res;
top._CalculatorRes = Res;
}
Obj.children[0].rows[Obj.children[0].rows.length-1].className = "Linea";
Add(Res);
}
function IniFin(){
var Obj = _CalculatorGet();
if( S(Obj).attr("Estado")==0 ){
S(Obj).attr("td",null);
while( Obj.children[0].rows.length>1 ){
if( Obj.children[0].rows[1].Obj!=undefined ) Obj.children[0].rows[1].Obj.style.border = '';
Obj.children[0].deleteRow(1);
}
if( Add() ) Show(Obj, 1);
else _CalculatorClose();
}else if( S(Obj).attr("Estado")==1 ){
Calcular(Obj);
}
S.eventClear();
}
}
function _CalculatorClose(){
var o = S.event(window.event);
if( o==null ) return;
if( o.tagName=="I" && o.innerText!="5" ){
S(o).help("$calculator", window.event);
return S.eventClear(window);
}
var Obj = _CalculatorGet();
if( Obj==null ) return;
S(Obj).attr({Estado:0, td:null});
while( Obj.children[0].rows.length>1 ){
if( Obj.children[0].rows[1].Obj!=undefined ) Obj.children[0].rows[1].Obj.style.border = '';
Obj.children[0].deleteRow(1);
}
S(Obj).none();
}
function addEvent(obj, eve, func, captura){
if( obj.attachEvent ){
obj.attachEvent('on'+eve, func);
}else if( obj.addEventListener ){
obj.addEventListener(eve, func, captura);
}else return false;
return true;
}
function _LToolsMenuUser(el){
var obj = S("TD[op^='o']", ".MENUFOOTLIST"), dim=[];
if( obj.length>1 ){
obj.each(function(k, oTD){
var  p = oTD
,o = p.children[0];
if( o.tagName=="IMG" ){
dim.push(Array(p.childNodes[1].textContent, o.src, k));
}else if( o.tagName=="I" ){
dim.push(Array(p.childNodes[1].textContent, S(o).text(), k));
}
});
S(el).menu(dim, {function:function(op, label){
window[S(S("TD[op^='o']", ".MENUFOOTLIST").dim[op]).attr("uFunc")]();
}});
}
}
function _LToolsTreeHidden(el){
S(".MENULTOOLS").attr("eHidden", 1);
setTimeout(function(){
if( S(".MENULTOOLS").attr("eHidden")==null ) return;
S(".MENULTOOLS").none();
}, 200);
}
function _LToolsTree(el, message){
if( S(".MENUFOOTLIST TD[op='u']").length && !S(".MENULTOOLS TR[eArg='LAST']").length ){
if( _TotalRec==0 ){
S(".MENULTOOLS TR").none();
}
var oTR = S(".MENULTOOLS").obj.insertRow();
_LToolsIcons[oTR.rowIndex+1] = [message, "&#222;", "LAST"];
oTR.outerHTML = `<tr eArg="LAST"><td><i class="ICONWINDOW">&#222;</i> </td><td>${message}</td></tr>`;
}
S(".MENULTOOLS td:nth-child(2)").block();
S(".MENULTOOLS").css("width:1px; display:table");
S(el).around(".MENULTOOLS", {maximize:true});
}
function _uMenuLTools(Op, label, func, tr, table){
var Ops = ((_ExportPassword)?'P':'')+((_ExportMail)?'M':'')+((_ExportRecipient)?'R':'')+'I'+((_DocExportOutside)?'E':'')+((_KeyDocuments)?'K':''),
User = _eUserName, n;
_ExportPassword = _ExportMail = false;
switch(Op){
case null: return;
case 'IMP':
Imprimir();
break;
case 'BAK': _Back(); break;
case 'CMP': gsExpor('C'); break;
case 'HELP':
if( window.event ){
if( window.event.ctrlKey || window.event.altKey ) S(DGI('ListHelpIcons')).attr("eCtrlKey",1);
S(DGI('ListHelpIcons')).attr("eObjClick", window.event.target);
}
S(DGI('ListHelpIcons')).eventClick();
break;
case 'SEEK':
var obj = S("#UtilSeek", window).block("table").move(false, ".TITULO"),
wTR = S.objWindow(tr);
if( wTR!=window ){
S(obj).css({right:0, top:0});
}else{
S(tr).around(obj, {hide:true, type:"2,4,10,8,13"});
S(obj).toScroll()
}
setTimeout(function(){ DGI('BUSCAR').focus(); },500);
break;
case 'ModoSub':
_INSUBWIN_ = S("I", tr).text()=="E";
S("I", tr).text(_INSUBWIN_ ? "A":"E");
S("TD:nth-child(2)", tr).text(S.lng(_INSUBWIN_ ? 104:106));
let txt = S.replace(S.lng(_INSUBWIN_ ? 104:106), " ", "&nbsp;");
S(tr).info(txt, 3);
break;
case 'PAG':
var obj = S("#UtilList",window).block("table").move(false,".TITULO"),
wTR = S.objWindow(tr);
if( wTR!=window ){
S(obj).css({right:0, top:0});
}else{
S(tr).around(obj, {hide:true, type:"2,4,10,8,13"} );
S(obj).toScroll();
}
setTimeout(function(){ DGI('DESDE').focus(); },500);
break;
case 'PDFc': __gsExpor('P'+(((window.event && (window.event.ctrlKey || window.event.altKey)) || label=="DOWN")?"&_DOWN=1":""),Ops,User); break;
case 'PDFb': __gsExpor('P&BW=1'+(((window.event && (window.event.ctrlKey || window.event.altKey)) || label=="DOWN")?"&_DOWN=1":""),Ops,User); break;
case 'XLSt': __gsExpor('X',Ops,User); break;
case 'XML': __gsExpor('M',Ops,User); break;
case 'TXT': __gsExpor('T',Ops,User); break;
case 'CSV': __gsExpor('V',Ops,User); break;
case 'Mode0':
case 'Mode1':
eShowLTools((S.right(Op,1)*1)+1);
break;
case 'CHART':
S.window("edes.php?Fa:$a/d/chart", {wopener:window, modal:true});
break;
case 'CHARTSYSTEM':
S.window("edes.php?Fa:$a/d/chart.edf&_SYSTEM=1", {wopener:window, modal:true});
break;
case 'UnKill':
elUnKill();
break;
case 'ExpPass':
case 'ExpMail':
var On = S(tr.cells[0].children[0]).class("?OFF");
S(tr.cells[0].children[0]).class("/OFF");
if( Op=='ExpPass' ) _ExportPassword = On;
else _ExportMail = On;
break;
case 'Resumen':
var dim = (S(tr).attr("e-var")==null || S(tr).attr("e-var")=="E") ? ["R", _lng107] : ["E", _lng80];
S(tr).attr("e-var", dim[0]);
tr.cells[1].innerText = dim[1];
S("TR[eDetail='1']").display("table-row");
var o = S("TR[eDetail='2']");
if( o.length ){
if( o.dim[0].offsetHeight>0 ){
o.none();
}else{
o.display("table-row");
}
}
break;
case 'CARD':
var o, ver=[];
if( S.type(label)=="string" ){
n = tr.cells[0].children[0].innerHTML;
}else if( S.type(label)=="html" ){
n = S("I", label).text();
}
ver = [n=="Y"? "&#361;":"Y", n=="Y"? _lng38 : _lng88];
if( n=="Y" ){
S("#CONTENEDOR").css("max-width:"+S("#CONTENEDOR").width()+"px;display:");
S("#BROWSE").css("display:inline-table");
}else{
S("#CONTENEDOR").css("max-width:;display:table");
}
o = S(".MENULTOOLS TR[eArg='CARD']");
if( o.length ){
o.obj.cells[0].children[0].innerHTML = ver[0];
o.obj.cells[1].innerHTML = ver[1];
}
o = S("#_ToolsCardList");
if( o.length ){
o.html('<span class="ButtonIn ROUNDED2"><i class="ICONWINDOW">'+ver[0]+'</i>' +ver[1]+'</span>');
}
eCard(n=="Y");
break;
case 'COLSVIEW':
_ListSetup(tr);
break;
case 'OFFSET':
S(tr).menu([[-350],[351,"","2"],[352,"","5"],[353,"","15"]], {point:true, function:function(op){
_DefaultOffset = op;
S.call("E:$offset.php", {source:_Source, px:op}, {info:true});
Recalcula();
}});
break;
case 'BORDERLEFT':
n = S(S(".BROWSE TH").dim[0]).css("border-left-width")>0 ? 0:1;
S(window).rule("+.BROWSE TH, .BROWSE TD { border-left: "+n+"px solid "+_cListGrid+"; }", "configCSS");
S.call("E:$borderleft.php", {source:_Source, px:n}, {info:true});
S("I").each(function(k,o){
if( S.code(o.innerHTML)==413 ) S(o).class((n==1?"+":"-")+"OFF");
});
break;
case 'LAST':
_ModeChange("u");
break;
default:
if( /\w\(/.test(Op) && /(\)|\);)$/.test(Op) ){
eval(Op);
}
}
}
function __MenuLTools(ev){
if( S.type(ev)=="mouseevent" ){
if( ev.target.parentNode.getAttribute("op")!=null ){
_uMenuLTools(ev.target.parentNode.getAttribute("op"), "DOWN");
}
}
return S.eventClear(window);
}
function Recalc_LToolsIcons(){
var n,i;
if( DGI('ListHelpIcons')!=null ){
_LToolsIcons.push(["-"]);
_LToolsIcons.push(["Ayuda", "@", "HELP"]);
}
if( typeof(top.google)=="undefined" ){
for(n=0; n<_LToolsIcons.length; n++){
if(_LToolsIcons[n][2]=="CHARTSYSTEM" || _LToolsIcons[n][2]=="CHART") delete _LToolsIcons[n];
}
}
for(n=1; n<_LToolsIcons.length; n++){
if( _LToolsIcons[n] && _LToolsIcons[n].length>=2 && (_LToolsIcons[n][1]=="A" || _LToolsIcons[n][1]=="E") ){
_LToolsIcons[n][1] = _INSUBWIN_ ? "E":"A";
for(i=1; i<_LToolsIcons[n][2].length; i++){
if( _LToolsIcons[n][2][i].length>=2 ){
if( _LToolsIcons[n][2][i][1]=="A" &&  _INSUBWIN_ ) _LToolsIcons[n][2][i][5] = "class=ICONOFF";
if( _LToolsIcons[n][2][i][1]=="E" && !_INSUBWIN_ ) _LToolsIcons[n][2][i][5] = "class=ICONOFF";
}
}
}
}
}
function Recalc_WinHeader(op){
if( !top.eIsWindow(window) ){
return;
}
if( S("#GROUPTITLE").length>0 ) S("#GROUPTITLE").none();
if( S("#UtilListICO").length>0 ) S("#UtilListICO").none();
if( DGI('ListHelpIcons')!=null && _TitleIconView ) DGI('ListHelpIcons').style.display = 'none';
top.eSWMenuDel(window);
if( op.SWMenuAdd ) top.eSWMenuAdd(window);
if( op.winCaption=="#" ){
return;
}
top.eSWSetCaption(window, op.winCaption);
if( S.isModal(window) ){
S(window).windowIcon("N", "m");
}
_WinCaption = true;
if( DGI("_Pie")!=null ){
top.eSWSetStatus(window, DGI("_Pie").parentNode.textContent);
}
if( op.Paginacion ){
if( DGI("Paginacion")!=null ){
DGI("Paginacion").style.display = "none";
top.eSWSetStatus(window, DGI("Paginacion").textContent);
}
}
}
function _TextArea(txt){
return txt.replace(/{#}ENTER{#}/g,"<br>").replace(/&amp;#39;/g,"\'").replace(/&amp;#34;/g,'"');
}
function MasInfoOff(){
if( S.event(window).tagName=='TD' ) DGI("MasInfo").style.display = 'none';
}
function _MasInfoEvent(){
DGI("BROWSE").onmouseover = MasInfoOn;
DGI("BROWSE").onmouseout = MasInfoOff;
}
function setPaginationEnd(){
if( DGI('DESDE')!=null && DGI('oDESDE')!=null && DGI("ToolsPaginate")!=null ){
DGI("ToolsPaginate").parentNode.style.display = 'block';
DGI("oDESDE").value = DGI("DESDE").value;
DGI("oHASTA").value = DGI("HASTA").value;
DGI("oDESDE").size = DGI("oHASTA").size = DGI("oDESDE").maxLength = DGI("oHASTA").maxLength = DGI("HASTA").value.length;
DGI("oMAXREC").value = DGI("MAXREC").value;
}
}
function page(op, pageSize){
if( typeof(op)=="number" ){
S.pagination(op);
}else{
S.pagination(S("#filterTR").val(), op, pageSize);
}
}
S["hash2value"] = function(attr, prefixDel, prefixAdd){
return S["hash2"](attr, prefixDel, prefixAdd);
}
S["hash2var"] = function(attr, prefixDel, prefixAdd){
return "var "+S["hash2"](attr, prefixDel, prefixAdd);
}
S["hash2"] = function(attr, prefixDel="", prefixAdd=""){
var dim=[], nameAttr, nameVar, value, valReal;
for(nameAttr in attr){
nameVar = nameAttr;
if( prefixDel!="" && nameAttr.substring(0, prefixDel.length)==prefixDel ){
nameAttr = nameAttr.substring(prefixDel.length);
}
nameAttr = S.replace(nameAttr, "-", "");
value = attr[nameVar];
if( value==null ){
value = "''";
}else if( !(value=="null" || (value*1)!==value) ){
value = "'" + S.replace(value, [["'", "\\\'"]]) + "'";
}else if( (value*1)!=value ){
value = "'"+value+"'";
}else{
valReal = value.replace(/'/g, "");
if( (valReal*1)==valReal ){
value = valReal;
}
}
dim.push(prefixAdd + nameAttr + "=" + value);
}
return dim.join(",")+";";
}
S["pagination"] = function(toFilter="", op="", pageSize=null){
var  pageToView = 1
,recalPagination = false
,visibleRowsDefault = _VisibleRows
,pattern
,oBROWSE = S("#CONTENEDOR .BROWSE")
,attr = oBROWSE.attr("e-pageCurrent,e-filterPages,e-totalRows,e-filterRows,e-visibleRows,e-minWidth,e-slideCol");
eval( S.hash2var(attr, "e-") );
filter = attr["e-filter"];
if( totalRows=="" ){
recalPagination = true;
visibleRows = visibleRowsDefault;
totalRows = S("#CONTENEDOR .BROWSE TBODY TR").length;
slideCol = _cDeslizante;
totalRows += S("#CONTENEDOR .BROWSE TFOOT TR").length;
oBROWSE.attr({
"e-totalRows"	: totalRows
,"e-slideCol"	: slideCol
,"e-visibleRows": visibleRows
,"e-pageCurrent": 1
,"e-filterPages": Math.ceil(totalRows/visibleRows)
,"e-filterRows" : totalRows
,"e-filter"		: toFilter
});
attr = oBROWSE.attr("e-pageCurrent,e-filterPages,e-filterRows,e-filter");
eval( S.hash2value(attr, "e-") );
}
if( totalRows>30000 && S.returnForTime(S["pagination"], 100) ){
return false;
}
if( op=="pageSize" ){
if( visibleRows==pageSize ) return;
oBROWSE.attr({"e-visibleRows": pageSize});
visibleRows = pageSize;
recalPagination = true;
}
if( op=="refresh" ){
pageToView = pageCurrent;
}else if( (filter!=toFilter && S.type(toFilter)!="number") || recalPagination ){
if( toFilter=="" ){
if(true) [filterPages, filterRows] = [clearFilter(visibleRows, slideCol), totalRows];
oBROWSE.obj["e-pattern"] = "";
}else{
if( typeof(toFilter)!="number" && toFilter!="" ){
eClearEvent();
pattern = toFilter;
try{
let op={
flags: "im"
,prefix: ""
,suffix: ""
};
if( pattern[0]=="^" ){
pattern = pattern.substring(1);
op["prefix"] = "^";
}
if( S.right(pattern,1)=="$" ){
pattern = S.left(pattern, pattern.length-1);
op["suffix"] = '$';
}
if( pattern[0]=="=" ){
pattern = pattern.substring(1);
op["prefix"] = "^";
op["suffix"] = '$';
}
pattern = S.patternExp(pattern, op);
oBROWSE.obj["e-pattern"] = pattern;
}catch(e){
console.error(`Error when creating a pattern with the string[${toFilter}]`);
return false;
}
}
if(true) [filterPages, filterRows] = recalcFilter(pattern, toFilter, colsVisibles(), visibleRows, slideCol);
}
if( filterRows==0 ){
pageToView = -1;
}
oBROWSE.attr({
"e-pageCurrent": pageToView
,"e-filterPages": filterPages
,"e-filterRows" : filterRows
,"e-filter"		: toFilter
});
}else if( filterPages<=0 ){
S.info("No hay datos");
return false;
}else{
pattern = oBROWSE.obj["e-pattern"];
if( typeof(toFilter)=="number" ){
pageToView = toFilter;
if(		 pageCurrent==pageToView				) return false;
else if( pageToView<1 || pageToView>filterPages ) return false;
}else{
if( pageCurrent==1			 && (op=="previous" || op=="start") ) return false;
if( pageCurrent==filterPages && (op=="next"		|| op=="end"  ) ) return false;
if(		 op=="next"		) pageToView = pageCurrent+1;
else if( op=="previous"	) pageToView = pageCurrent-1;
else if( op=="start"	) pageToView = 1;
else if( op=="end"		) pageToView = filterPages;
else if( op=="refresh"	) pageToView = pageCurrent;
}
oBROWSE.attr("e-pageCurrent", pageToView);
}
S(".BROWSE TBODY TR:not([style*='none'])").each(function(k,o){
o.innerHTML = o.innerHTML.replace(/(\<mark\>|\<\/mark\>)/g, "");
o.style.display = "none";
});
if( pageToView>0 ){
pattern = oBROWSE.obj["e-pattern"];
S(`.BROWSE TBODY TR[e-f='${pageToView}']`).each(function(k,o){
let oTD=o.cells, t=oTD.length, i, txt;
for(i=0; i<t; i++){
txt = oTD[i].innerHTML.match(pattern);
if( txt==null ) continue;
oTD[i].innerHTML = oTD[i].innerHTML.replace(pattern, '<mark>'+txt[0]+'</mark>');
}
o.style.display = "table-row";
});
if( pageToView==filterPages ){
S("#CONTENEDOR .BROWSE TFOOT TR").css("display:table-row");
}else{
S("#CONTENEDOR .BROWSE TFOOT TR").none();
}
}
setTimeout(function(){
var widthCurrent = oBROWSE.obj.offsetWidth;
if( minWidth==="" ||  minWidth < widthCurrent ){
oBROWSE.css("min-width:"+widthCurrent+"px");
oBROWSE.attr("e-minWidth", widthCurrent);
}
});
if( op!="refresh" ){
viewStatus();
}
function recalcFilter(pattern, toFilter, checkCol, visibleRows, slideCol){
var  rows=S("#CONTENEDOR .BROWSE TBODY TR").dim, oRow, col
,filterRows=0, nPag=0, rowsOnPag=0, txt, result
,checkRow = !(toFilter[0]=="=" || toFilter[0]=="^" || S.right(toFilter,1)=="$");
if( slideCol==1 ){
var  slideRow = S("#TablaTV .BROWSE TBODY TR").dim
,discountRow = S("#CONTENEDOR .BROWSE THEAD TR").length;
}
for(oRow of rows){
oRow.setAttribute("e-f", 0);
try{
if( checkRow && !pattern.test(oRow.textContent) ){
continue;
}
for(col of checkCol){
txt = oRow.cells[col].textContent.replace(/\s+$/,"");
if( !pattern.test(txt) ){
continue;
}
result = pattern.exec(txt);
if( result[0].length==1 ){
if( oRow.cells[col].children.length ){
continue;
}
}
if( nPag==0 ) nPag = 1;
oRow.setAttribute("e-f", nPag);
if( slideCol ){
slideRow[oRow.rowIndex-discountRow].setAttribute("e-f", nPag);
}
filterRows++;
if( ++rowsOnPag>=visibleRows ){
rowsOnPag = 0;
nPag++;
}
break;
}
}catch(e){
console.error(`Error in rowIndex[${oRow.rowIndex}]`);
}
}
if( rowsOnPag==0 ) nPag--;
if( filterRows==0 ){
S("#filterTR").info(100, 1);
}else{
S("#filterTR").info(S.lng(349, S.thousands(filterRows)), 1);
}
return [nPag, filterRows];
}
function clearFilter(visibleRows, slideCol){
var rows=S("#CONTENEDOR .BROWSE TBODY TR").dim, oRow, nPag=0, rowsOnPag=0;
if( slideCol==1 ){
var  slideRow = S("#TablaTV .BROWSE TBODY TR").dim, rowSlide
,discountRow = S("#CONTENEDOR .BROWSE THEAD TR").length;
}
for(oRow of rows){
if( nPag==0 ) nPag = 1;
oRow.removeAttribute("_");
oRow.setAttribute("e-f", nPag);
if( slideCol ){
rowSlide = oRow.rowIndex-discountRow;
slideRow[rowSlide].removeAttribute("_");
slideRow[rowSlide].setAttribute("e-f", nPag);
}
if( ++rowsOnPag>=visibleRows ){
rowsOnPag = 0;
nPag++;
}
}
if( rowsOnPag==0 ) nPag--;
S("#filterTR").info(S.lng(349, S.thousands(rows.length)), 1);
return nPag;
}
function colsVisibles(){
var  dim = S("#CONTENEDOR .BROWSE THEAD TH[nc]:not([style*='display:none'])").dim
,checkCol=[], i;
for(i=0; i<dim.length; i++){
if( /^(C|CHAR|IMG)$/.test(dim[i].getAttribute("te")) ){
continue;
}
checkCol.push(dim[i].getAttribute("nc"));
}
return checkCol;
}
function viewStatus(){
var attr = S("#CONTENEDOR .BROWSE").attr("e-pageCurrent,e-filterPages,e-totalRows,e-filterRows,e-visibleRows,e-filter");
if( DGI("DESDE")!=null ){
DGI("DESDE").value = attr["e-pageCurrent"];
DGI("HASTA").value = attr["e-filterRows"];
DGI("HASTA").setAttribute("TREG", attr["e-filterRows"]);
DGI("HASTA").setAttribute("TPAG", attr["e-filterPages"]);
}
PaginationBarCalc(S("#filterTR").val()!="");
if( S("#filterTR").val()!=attr["e-filter"] ){
S("#filterTR").val(attr["e-filter"], false);
}
}
return true;
}