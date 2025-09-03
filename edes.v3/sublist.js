var _SubSubListPk = 0,
_pCol=[];
function eInsertRow(tabla){
var oTR = document.createElement("TR");
S("TBODY", tabla).obj.appendChild(oTR);
return oTR;
}
function eRowsFree(tabla, mensa){
if( S(tabla.parentNode).attr("eMaxRow")!=-1 && S("TR[libre]", tabla).dim.length==0 && S("TBODY", tabla).obj.rows.length>=S(tabla.parentNode).attr("eMaxRow")*1 ){
if( mensa==undefined || mensa ) top.eInfoError(window, 'No se admiten mas datos');
return false;
}
return true;
}
function slObj(Obj){
if( S.type(Obj)=="string" ){
if( Obj[0]!="[" ) Obj = "["+Obj+"]";
Obj = DGI(Obj);
}
return Obj;
}
function _GetPCol(Obj){
Obj = slObj(Obj);
_pCol=[];
S("TH[campo]",Obj).each(function(k,o){
var c = S.splitLast(" ", " "+S(o).attr("campo").replace("."," "))[1];
_pCol[c] = S(o).attr("nc")*1-1;
});
}
function eSLGet(id, exp, visible){
var tabla = slObj(id),
oTR = S("TR", S("TBODY", tabla)).dim,
oTH = S("TH[nc]", tabla).dim,
tCells = oTH.length, tipo=[], block=[],
txt=S(".TABHeaderTitle").obj.innerText+"~", xTH="", xTR, f,c,v, dim=[], dimRow=[], tr;
exp = (exp || false);
if(visible==undefined) visible = false;
_GetPCol(tabla);
tr = S(tabla).toTag("tr");
var tr2 = S(tr).toTag("tr"),
table2 = S(tr).toTag("table");
txt += S.trim(S(table2.rows[tr2.rowIndex-1]).text());
txt += "~";
for(c=0; c<tCells; c++){
tipo[c] = S(oTH[c]).attr("TD");
block[c] = ((oTH[c].offsetWidth>0 && oTH[c].getAttribute("campo")!="''") || visible);
if( block[c] ){
txt += "|"+tipo[c];
xTH += "|"+oTH[c].textContent;
}
}
txt += "~"+xTH;
for(f=0; f<oTR.length; f++){
if( oTR[f].getAttribute("LIBRE")==1 ) continue;
txt += "~";
xTR = "";
dimRow = [];
for(c=1; c<tCells; c++){
if( !exp || block[c] ){
v = oTR[f].cells[c].textContent;
switch( tipo[c] ){
case '+': case '-': case '+,': case '-,':
v = eClearThousands(v)*1;
break;
case 'C':
v = (v=="j") ? S.setup.checkOn : S.setup.checkOff;
break;
}
xTR += "|"+v;
dimRow.push(v);
}
}
if(!exp) dim.push(dimRow);
txt += xTR;
}
if(!exp) return dim;
return txt;
}
function eISLCount(script){
var n=0;
S(".ISubList").each(function(ik, io){
if( io.src.indexOf(script)>-1 ){
S("TBODY TR", S("#BROWSE", io.contentWindow).obj).each(function(pk, o){
if( o.id!="PieLista" && o.getAttribute("LIBRE")!=1 && o.cells[0].tagName=="TD" ) n++;
});
return null;
}
});
return n;
}
function eSLCount(Obj){
Obj = slObj(Obj);
var n=0;
S("TBODY TR",Obj).each(function(pk, o){
if( o.id!="PieLista" && o.getAttribute("LIBRE")!=1 && o.cells[0].tagName=="TD" ) n++;
});
return n;
}
function eSLInsertRow(Obj){
Obj = slObj(Obj);
Obj.setAttribute("ENVIAR", 1);
var n;
for(n=1; n<Obj.rows.length-S(Obj).attr("COLSOP"); n++){
if( S(Obj.rows[n]).attr("LIBRE")!=undefined ){
Obj.rows[n].removeAttribute('LIBRE');
Obj.parentNode.scrollTop = Obj.offsetHeight;
return Obj.rows[n];
}
}
var tc = Obj.rows[1].cells.length,
oTR = eInsertRow(Obj);
oTR.style.fontStyle = "italic";
oTR.setAttribute("isNew", 1);
for(n=0; n<tc; n++) oTR.insertCell();
Obj.parentNode.scrollTop = Obj.offsetHeight;
eSLReorder(Obj)
return oTR;
}
function eSLRecalcColsOp(Obj){
Obj = slObj(Obj);
var s_ShowZero=_ShowZero, t, c, Total, f,
AltoTH = S(Obj).attr("AltoTH")*1;
_ShowZero = 1;
for(c=0; c<Obj.rows[AltoTH].cells.length; c++){
t = S(Obj.rows[AltoTH].cells[c]).attr("ColOp");
if( t!=undefined ){
Total = 0;
for(f=1; f<Obj.rows.length; f++){
if( S(Obj.rows[f]).attr('LIBRE')==undefined && Obj.rows[f].id!='PieLista' ){
switch( t ){
case '+':
Total += eClearThousands(Obj.rows[f].cells[c].textContent)*1;
break;
case 'C': case 'c':
Total++;
break;
case '#':
if( eTrim(Obj.rows[f].cells[c].textContent)!='' ) Total++;
break;
}
}
}
Obj.rows[Obj.rows.length-1].cells[c].textContent = eShowThousands( Total, Obj.rows[AltoTH].cells[c].getAttribute("DCM") );
}
}
_ShowZero = s_ShowZero;
}
function eSLReset(Obj){
var id = Obj;
Obj = slObj(Obj);
var op = S(Obj).attr("colsop"),
nf = S(Obj.parentNode).attr("nf"), n,c;
S(`TABLE[id='[${id}]'] TH[nc]`).each(function(k,o){
o.style.minWidth = (o.offsetWidth-2)+"px";
});
for(n=0; n<Obj.rows.length-nf; n++){
Obj.deleteRow(1);
}
for(n=1; n<Obj.rows.length; n++){
if( Obj.rows[n].id!="PieLista" && S(Obj.rows[n]).attr("libre")!=1 ){
S(Obj.rows[n]).attr("libre", 1);
for(c=0; c<Obj.rows[n].cells.length; c++) Obj.rows[n].cells[c].innerHTML = "&nbsp;";
}
}
if(op==1) eSLRecalcColsOp(Obj);
}
function _FormularioLimpioPara(Obj, Op){
if( !_CARD ){
var tabla = S.toTag(Obj,'SPAN'),
tr = S.toTag(Obj,'TR');
tabla = S.toTag(tr,'TABLE');
eShowGroup(tabla.rows[tr.rowIndex-2], false, true);
}
_FormularioPaste(Obj.slFORM.elements, Obj.slDESDE, Obj.slHASTA+1, Op);
var Dim = new Array(), Tit = new Array(), xDim = new Array();
Dim['I']='insert'; Dim['U']='update'; Dim['D']='delete'; Dim['V']='view';
Tit['I']=eLng(84); Tit['U']=eLng(85); Tit['D']=eLng(86); Tit['V']=eLng(87);
xDim['I']=top.eLng(226); xDim['U']=top.eLng(227); xDim['D']=top.eLng(228); xDim['V']='view';
Obj.slTITLE.style.whiteSpace = 'nowrap';
if( !_CARD ) S(S.toTag(Obj.slTITLE, "TABLE")).visible();
if( Obj.slOP.tagName=="IMG" ){
if( Op=='I' && Obj.slOP.OpInsert!=undefined ){
Obj.slOP.src = 'g/op_insert_off.gif';
Obj.slOP.parentNode.disabled = true;
}else{
if( Dim[Op]=='view' ){
Obj.slOP.style.visibility = 'hidden';
}else{
Obj.slOP.src = 'g/op_'+Dim[Op]+'_0.gif';
}
Obj.slOP.parentNode.disabled = false;
}
}else{
if( Op=='I' && Obj.slOP.OpInsert!=undefined ){
S.toTag(Obj.slOP, "A").disabled = true;
}else{
S.toTag(Obj.slOP, "SPAN").style.visibility = (Dim[Op]=='view') ? 'hidden' : 'visible';
S.toTag(Obj.slOP, "A").disabled = false;
}
Obj.slOP.innerText = Op;
Obj.slOP.parentNode.childNodes[1].textContent = xDim[Op];
}
Obj.MODO = Op;
if( Op=='I' || Op=='U' ){
if( Obj.slPRIMERO.className=='READONLY' ){
for( var n=Obj.slDESDE; n<=Obj.slHASTA-1; n++ ){
if( Obj.slFORM.elements[n].className!='READONLY' ){
eFocus(Obj.slFORM.elements[n]);
break;
}
}
}else eFocus(Obj.slPRIMERO);
}
if( top.eIsWindow(window) ) Recalcula(1);
}
function _eSLRelation(Obj){
var SL = DGI('['+Obj.getAttribute("RELATION")+']'),
AltoTH = S(SL).attr("AltoTH")*1,
r = 1+AltoTH,
ur = r-1,
dCol = Obj.RELATIONCOL,
Valor = eGF(Obj.FIELDPARENT),
ok, Alto, c;
for(c=1+AltoTH; c<SL.rows.length; c++){
ok = (eTrim(SL.rows[c].cells[dCol].textContent)==Valor);
SL.rows[c].style.display = ((ok)?'table-row':'none');
if( ok ){
r++;
if( r==SL.parentNode.getAttribute("NF") ) Alto = SL.rows[c].offsetTop+parseInt(SL.rows[c].offsetHeight)+2;
ur = c;
}
}
if( r<SL.parentNode.getAttribute("NF") ){
for( c=ur+1; c<SL.rows.length; c++ ) if( SL.rows[c].getAttribute("LIBRE")==1 ){
SL.rows[c].style.display = 'table-row';
r++;
if( r>=SL.parentNode.getAttribute("NF") ){
Alto = SL.rows[c].offsetTop+parseInt(SL.rows[c].offsetHeight)+2;
break;
}
}
if( r<SL.parentNode.getAttribute("NF") ){
var n,c,fi,ce;
for(n=r; n<SL.parentNode.getAttribute("NF"); n++){
fi = eInsertRow(SL);
S(fi).attr("LIBRE", 1);
for(c=0; c<SL.children[0].all.length; c++){
fi.insertCell().innerHTML = "&nbsp;";
}
}
Alto = fi.offsetTop+parseInt(fi.offsetHeight)+2;
}
}
DGI('c'+SL.id).style.height = Alto+"px";
setTimeout(function(){
DGI('c'+SL.id).style.height = Alto+"px";
top.eScrollTH(DGI('c'+SL.id));
},350);
_FormularioLimpioPara(SL, ((Obj.MODO=='U')?'I':'V'));
setTimeout(function(){ THScroll(SL.id,0); }, 250);
if( top.eIsWindow(window) ){
top.eSWIResize(window);
}
}
function eSubList(Op){
eSLAction(null, Op);
}
function eSLAction(xObj, Op, SM, oEvent){
S.public(1);
_SLAction(xObj, Op, SM, oEvent);
S.public(0);
}
function _SLAction(xObj, Op, SM, oEvent){
if( Op==undefined ){
Op = xObj;
xObj = null;
}
if( xObj==null ){
var o = oEvent || S.event(window);
if( o.disabled ){
return eClearEvent();
}
xObj = top.eSubStr(S.toTag(o,'TABLE').id, 1, -1);
}
Op = Op.toUpperCase();
var Obj = DGI('['+xObj+']'),
AltoTH = S(Obj).attr("AltoTH")*1, n, c;
if( Obj.disabled && /(I|U|E|D|DA)/.test(Op) ){
return S.eventClear(window);
}
if( Op=='I' ){
if( !eRowsFree(Obj) ) return;
if( Obj.SUBLISTPADRE!=undefined ){
var el = DGI(Obj.SUBLISTPADRE);
if( eGF(el.FIELDPARENT)=='' ){
top.eInfo(window, eLng(197, DGI(Obj.SUBLISTPADRE).slOLDTITLE));
return;
}else if( el.MODO=='I' ){
top.eInfo(window, eLng(198, DGI(Obj.SUBLISTPADRE).slOLDTITLE));
return;
}
}
}
if( Op=='F' || Op=='E' ){
var NumFieldNom = -1, p;
for(p=0; p<_SaveList.length; p++){
var Dim = _SaveList[p].split('|');
if( Dim[0]==Obj.id ){
for(c=0; c<Obj.rows[AltoTH].cells.length; c++){
var tmp = S(Obj.rows[AltoTH].cells[c]).attr("CAMPO").split('.');
if( tmp[tmp.length-1]==Dim[4] || S(Obj.rows[AltoTH].cells[c]).attr("CAMPO")==Dim[4] ){
NumFieldNom = c;
break;
}
}
if( NumFieldNom!=-1 ) break;
}
}
if( NumFieldNom==-1 ){
alert('Definición erronea');
return;
}
var o = S.toTag(oEvent || S.event(window),'TR'), c, CAMPO, tmp;
for(c=0; c<Obj.rows[AltoTH].cells.length; c++){
CAMPO = S(Obj.rows[AltoTH].cells[c]).attr("CAMPO");
tmp = CAMPO.split('.');
if( CAMPO==S(Obj).attr("FIELDFILE") || tmp[tmp.length-1]==S(Obj).attr("FIELDFILE") ){
var nFile = eTrim(o.cells[c].textContent);
if( nFile=='' ){
top.eInfo(window,eLng(169));
return eClearEvent();
}
if( o.cells[c].getAttribute("NumFile")!=null ){
S.preview(o.cells[c].getAttribute("numFile"), window);
}else if( o.cells[c].getAttribute("NewValue")!=null && o.cells[c].getAttribute("NewValue")!="" ){
VerFile('>'+o.cells[c].getAttribute("NewValue"));
}else{
var down = (event && event.type=="contextmenu")?"1":"0";
if( S(Obj).attr("oDIR")=="" ){
for(var p=0; p<_SaveList.length; p++){
var Dim = _SaveList[p].split('|');
if( Dim[0]==Obj.id ){
var xNomSrv = S(S.toTag(o,'TABLE')).attr("FILECONTENT")+'|'+Dim[1]+'|'+Dim[4]+'|'+o.cells[NumFieldNom].textContent+'|'+nFile+((_DB=='')?'':'&_DB='+_DB);
top.eCallSrv(window, 'edes.php?D:*'+xNomSrv+"&_DOWN="+down);
return eClearEvent();
}
}
}
var Dim = nFile.split('.'),
NomSrv = S(Obj).attr("SUBDIR")+'/'+S(Obj).attr("ePrefix")+eTrim(o.cells[NumFieldNom].textContent)+'.'+Dim[Dim.length-1];
if( Op=='E' ){
return eClearEvent();
}else if( Op=='F' ){
top.eCallSrv(window, 'edes.php?D:'+NomSrv+'&FILE='+nFile+'&SUBLIST=1'+"&_DOWN="+down);
}
return eClearEvent();
}
}
}
return;
}else if( Op=='DA' ){
var oTR;
for(n=Obj.rows.length-1; n>AltoTH; n--){
oTR = Obj.rows[n];
if( oTR.id!='PieLista' ) S(oTR).attr("LIBRE",1);
for(c=0; c<oTR.cells.length; c++) oTR.cells[c].innerHTML = "&nbsp;";
}
return;
}
var pCol = S(Obj).colFields();
if( Obj.getAttribute("formstatic")==1 && Obj.getAttribute('RELATION')!=null ){
eSubListRefreshChild(Obj, S.event(window));
}
for(n=0; n<_SaveOnLine.length; n++){
var tmp = _SaveOnLine[n].split('|');
if( xObj==tmp[0] ){
var Obj = DGI('['+xObj+']');
if( Obj.slTABLE==undefined ){
_eSLConfig(xObj);
}
Obj.MODO = Op;
var o = oEvent || S.event(window);
while( o.tagName!='TABLE' ){
if( o.tagName=='TR' ) break;
o = o.parentNode;
}
if( o.tagName!='TR' ) return eClearEvent();
if( SM==undefined ){
try{
var w = eval('FUNCTION_'+Obj.id.substring(1,Obj.id.length-1))('L', 'S', Obj.MODO, o.rowIndex, (Obj.MODO=='I')?null:o, window, pCol);
if( typeof(w)=='boolean' && !w ) return;
}catch(e){}
}
_FormularioLimpioPara(Obj, Op);
if( Op!='I' ){
if( SM==undefined ){
Obj.FILA = o.rowIndex;
Obj.setAttribute("FILA", o.rowIndex);
}
_FormularioModificaIncr(Obj);
}
if( SM==undefined ){
try{
eval('FUNCTION_'+Obj.id.substring(1,Obj.id.length-1))('L', 'E', Obj.MODO, o.rowIndex, (Obj.MODO=='I')?null:o, window, pCol);
}catch(e){}
}
if( Obj.getAttribute('RELATION')!=null ){
_eSLRelation(Obj);
}
return eClearEvent();
}
}
var Obj = DGI('m['+xObj+']');
if( Obj==null ){
top.eAlert(S.lng(212), eLng(141,xObj,Op), 'A','E');
return;
}
var o = oEvent || S.event(window);
while(o.tagName!='TABLE'){
if( o.tagName=='TR' ) break;
o = o.parentNode;
}
if( o.tagName!='TR' ) return eClearEvent();
o.parentNode.parentNode.FILA = o.rowIndex;
var Dim = new Array(); Dim['I']='a'; Dim['U']='mR'; Dim['D']='bR'; Dim['V']='cR';
gsClickSMenu(Obj, 'F'+Dim[Op]);
eClearEvent();
}
function eSubListMark(){
var oTR = S.toTag(S.event(window), "TR");
eSubListRefreshChild(S.toTag(oTR, "TABLE"), oTR);
}
function eSubListRefreshChild(oTableParent, oTrParent){
if( oTableParent.getAttribute('RELATIONFIELD')==null ){
return;
}
oTrParent = S.toTag(oTrParent, "TR");
S("TR[eMark]", oTableParent).attr("eMark", null);
S(oTrParent).attr("eMark", "1");
var  pCol = S(oTableParent).colFields()
,fieldParent, fieldChild;
[fieldParent, fieldChild] = oTableParent.getAttribute('RELATIONFIELD').split("=");
var  valParent = oTrParent.cells[pCol[fieldParent]].textContent
,oTableChild = DGI("["+oTableParent.getAttribute('RELATION')+"]")
,pColChild = S(oTableChild).colFields()
,colChild = pColChild[fieldChild]
,trVisibles = 0;
S("TBODY>TR", oTableChild).each(function(k, oTR){
let valChild = oTR.cells[colChild].innerText;
if( valParent==valChild ){
oTR.style.display = "";
trVisibles++;
}else{
oTR.style.display = "none";
}
})
S("TBODY>TR[libre]", oTableChild).each(function(k, oTR){
if( trVisibles>=(S(oTableChild).attr("TRVISIBLES")*1) ){
return null;
}
oTR.style.display = "";
trVisibles++;
});
if( S(oTableParent).attr("SUBSUBLISTFUNC")!=null ){
window[S(oTableParent).attr("SUBSUBLISTFUNC")]({
"tableParent": oTableParent
,"tableChild" : oTableChild
,"trParent"   : oTrParent
,"fieldParent": fieldParent
,"fieldChild" : fieldChild
});
}
}
function _FormularioReadOnly(t, Desde, Hasta, Op){
if( t==undefined ){
t = document.FRM1.elements;
Desde = 0;
Hasta = t.length;
if( DGI("zTitulo")!=null ) DGI("zTitulo").TITULO = DGI("zTitulo").textContent;
}
for(var n=Desde; n<Hasta; n++){
if( t[n].tagName=='FIELDSET' || t[n].type=='button' ) continue;
t[n].readOnly = true;
t[n].className = 'READONLY';
if( t[n].type=="checkbox" ){
_eCheck( t[n].name, t[n].eReadOnly );
}else if( t[n].type=="radio" ){
_eRadio( t[n].name, t[n].eReadOnly );
}else if( DGI('_INPUT_'+t[n].name)!=null ){
DGI('_INPUT_'+t[n].name).readOnly = t[n].eReadOnly;
}else{
if( S(t[n]).attr("eFileName")!=null ){
S(eIndex(t[n].sourceIndex+1)).visibility(Op=='a' ||Op=='m' || Op=='A' ||Op=='M' || Op=='I' || Op=='U');
}
}
}
}
function _FormularioCopy(t, Desde, Hasta){
if( t==undefined ){
t = document.FRM1.elements;
Desde = 0;
Hasta = t.length;
if( DGI("zTitulo")!=undefined ){
DGI("zTitulo").TITULO = DGI("zTitulo").textContent;
}
}
var c, Obj, n, oIMG=null;
for(c=Desde; c<Hasta; c++){
if( t[c].tagName=='FIELDSET' || t[c].type=='button' ) continue;
if( /^(?:CHECKBOX|RADIO)$/i.test(t[c].type) ){
t[c].BAK = t[c].checked;
}else{
t[c].BAK = t[c].value;
}
if( t[c].getAttribute("eUpload")!=null ){
t[c].setAttribute("eBakUpload", t[c].getAttribute("eUpload"));
}
t[c].eReadOnly = t[c].readOnly;
t[c].eDisabled = t[c].disabled;
t[c].eClass = t[c].className;
}
}
function _FormularioPaste(t, Desde, Hasta, Op){
if( t==undefined ){
if(Op==null) Op = '';
t = document.FRM1.elements;
Desde = 0;
Hasta = t.length;
try{
_CampoFoco.focus();
}catch(e){}
}
var n, Ini, Fin;
for(n=Desde; n<Hasta; n++){
if( t[n].tagName=='FIELDSET' || t[n].type=='button' ) continue;
if( t[n].className=='error' ) t[n].className = 'EDITABLE';
if( t[n].name.substring(0,7)=='_INPUT_' ){
if( t[n].value!='' && t[n].BAK=='' ){
try{
if( t[n].IND!=-1 ) DGI(t[n].name.substr(7)+'_TABLE').rows[t[n].IND].cells[1].id = '';
}catch(e){}
try{
if( t[n].onchange!=null ){
if( (t[n].onchange+'').indexOf('S.selectReset(')>-1 ){
Ini = (t[n].onchange+'').split('S.selectReset(');
Fin = Ini[1].split(')');
eval('S.selectReset('+Fin[0]+');');
}
}
}catch(e){}
}
}
try{
if( t[n].type!="file" ) t[n].value = t[n].BAK;
}catch(e){
}
if( /^(?:CHECKBOX|RADIO)$/i.test(t[n].type) ){
t[n].checked = t[n].BAK;
}else{
if( t[n].getAttribute("NumFile") ) t[n].removeAttribute("NumFile");
if( t[n].eBakUpload!=undefined ){
t[n].setAttribute("eUpload", t[n].getAttribute("eBakUpload"));
}
if( t[n].BAK==undefined ) t[n].BAK = '';
if( t[n].type!="file" ) t[n].value = t[n].BAK;
if( t[n].eHTML!=undefined ) eGO(t[n].name+'_').textContent = '';
}
if( t[n].getAttribute("SubMode")=="A" ){
if( Op!='I' ){
t[n].readOnly = true;
t[n].className = 'READONLY';
}else{
t[n].readOnly = t[n].eReadOnly;
t[n].className = 'EDITABLE';
}
t[n].disabled = t[n].readOnly;
}else{
t[n].readOnly = t[n].eReadOnly;
t[n].disabled = t[n].readOnly;
t[n].className = (t[n].eReadOnly || Op=='D' || Op=='V') ? 'READONLY' : 'EDITABLE';
if( t[n].className=='READONLY' ) t[n].readOnly = true;
if( S(t[n]).attr("eFileName")!=null ){
t[n].disabled = false;
S(eIndex(t[n].sourceIndex+1)).visibility(Op=='a' || Op=='m' || Op=='A' || Op=='M' || Op=='I' || Op=='U');
}
}
if( DGI('_INPUT_'+t[n].name)!=null ){
DGI('_INPUT_'+t[n].name).readOnly = t[n].eReadOnly;
DGI('_INPUT_'+t[n].name).disabled = t[n].eReadOnly;
}
}
}
function _FormularioModifica(){
var DimMode = {'a':'I','A':'I','m':'U','b':'D','c':'V'}, CAMPO,
DCampo = _ChildrenData[3].split(','),
OCampo = _ChildrenData[4].split(','),
Obj = _WOPENER.DGI(_ChildrenData[0]),
OpExe = S("#OpExe").obj, o;
if( Obj==null ){
top.eAlert(S.lng(212), eLng(88,_ChildrenData[0]), 'A', 'E');
return;
}
var oTR = Obj.rows[Obj.FILA];
_Mode = Obj.MODO;
pCol=[];
S("TH[campo]",Obj).each(function(k,o){
var c = S.splitLast(" ", " "+S(o).attr("campo").replace("."," "))[1];
pCol[c] = S(o).attr("nc")*1-1;
});
try{
var w = _WOPENER.eval('FUNCTION_'+Obj.id.substring(1,Obj.id.length-1))('L', 'S', DimMode[Obj.MODO], (Obj.MODO=='a')?-1:Obj.FILA, (Obj.MODO=='a')?null:oTR, window, pCol);
if( typeof(w)=='boolean' && !w ) return;
}catch(e){}
if( Obj.MODO!='a' ){
if( Obj.MODO=="m" ){
_FormularioPaste(null, null, null, Obj.MODO);
}else{
_FormularioReadOnly(null, null, null, Obj.MODO);
}
var AltoTH = S(Obj).attr("AltoTH")*1, n,d, oTD;
for(n=0; n<Obj.rows[AltoTH].cells.length; n++){
oTD = oTR.cells[n];
for(d=0; d<DCampo.length; d++){
CAMPO = S(Obj.rows[AltoTH].cells[n]).attr("CAMPO");
if( CAMPO==DCampo[d] || (CAMPO.indexOf('.')==1 && CAMPO.substring(2)==DCampo[d]) ){
if( OCampo[d]!='IMG' && OCampo[d].substring(0,1)!='*' ){
if( eGO(OCampo[d]).type=="checkbox" ){
ePF(OCampo[d], ((oTD.innerText=="j") ? _CheckBoxSave[0] : _CheckBoxSave[1]));
}else if( eGO(OCampo[d]).type=="radio" ){
ePF(OCampo[d], oTD.textContent);
}else{
if( Obj.rows[AltoTH].cells[n].getAttribute("MILES") ){
ePF(OCampo[d], eClearThousands(oTD.textContent));
}else{
if( eGO(OCampo[d]).tagName=='TEXTAREA' ){
if( S(":"+OCampo[d]).attr("eHTML")!=null ){
ePF(OCampo[d], eTrim(oTD.innerHTML));
}else{
ePF(OCampo[d], S.replace(eTrim(oTD.innerHTML), "<br>", S.char(10)));
}
}else{
if( S(':_INPUT_'+OCampo[d]).length==0 ){
S(":"+OCampo[d]).obj.value = eTrim(oTD.textContent);
}else{
if( DGI('_INPUT_'+OCampo[d]).getAttribute('SS')!=null ){
_DimRelationFields[_DimRelationFields.length] = 'ePutRelationFields("'+OCampo[d]+'", "'+eTrim(oTD.textContent)+'",1);';
}else{
ePF(OCampo[d], eTrim(oTD.textContent));
}
}
}
if( S(oTD).attr("NUMFILE") && S(":_FILE_"+OCampo[d]).exists() ){
S(":"+OCampo[d]).attr("NUMFILE", S(oTD).attr("NUMFILE"));
}
}
}
if( Obj.MODO=='b' || Obj.MODO=='c' ){
var e = eGO(OCampo[d]);
if( eGO(OCampo[d]).type=="checkbox" ){
_eCheck(OCampo[d], false);
}else if( eGO(OCampo[d]).type=="radio" ){
_eRadio(OCampo[d], false);
}else{
e.readOnly = true;
if( DGI('_INPUT_'+OCampo[d])!=null ) DGI('_INPUT_'+OCampo[d]).readOnly = true;
}
}
}else if( OCampo[d].substring(0,1)=='*' ){
ePF('_INPUT_'+OCampo[d].substring(1), eTrim(oTD.textContent), false);
}
break;
}
}
}
_ExeDimRelationFields();
}
OpExe.style.visibility = 'visible';
OpExe.title = '';
_ModeSubList = Obj.MODO;
switch( Obj.MODO ){
case "a":
_FormularioPaste(null, null, null, Obj.MODO);
S("I",OpExe).text("I");
OpExe.childNodes[1].textContent = eLng(136);
if( _FieldFocus!="" ) setTimeout('eFocus("'+_FieldFocus+'");',100);
break;
case "m":
S("I",OpExe).text("U");
OpExe.childNodes[1].textContent = eLng(137);
if( _FieldFocus!="" ) setTimeout('eFocus("'+_FieldFocus+'");',100);
break;
case "b":
S("I",OpExe).text("D");
OpExe.childNodes[1].textContent = eLng(138);
break;
case "c":
OpExe.style.visibility = 'hidden';
break;
}
try{
var w = _WOPENER.eval('FUNCTION_'+Obj.id.substring(1,Obj.id.length-1))('L', 'E', DimMode[Obj.MODO], (Obj.MODO=='a')?-1:Obj.FILA, (Obj.MODO=='a')?null:oTR, window, pCol);
if( typeof(w)=='boolean' && !w ) return;
}catch(e){}
}
function _DuplicaCampoFile(oTabla, oTD, oFile, dbIndex){
var win = S.objWindow(oTabla);
oTabla.setAttribute("oDIR", S(oFile).attr("oDIR"));
oTabla.setAttribute("DBINDEX", dbIndex);
oTD.textContent = oFile.value;
oTD.setAttribute("eUpload", oFile.getAttribute("eUpload"));
oTD.setAttribute("NewValue", oFile.getAttribute("NewValue"));
oTabla.setAttribute("ePrefix", oFile.getAttribute("ePrefix"));
if( oTD.getAttribute("NewValue")!=null && oTD.getAttribute("NewValue")!="" ){
var slNumFile = S(oFile).attr("NUMFILE");
if( slNumFile ){
S(":_FILE_"+slNumFile, win).nodeRemove();
}else{
win._slNumFile++;
slNumFile = win._slNumFile;
}
var o = S(":_FILE_"+oFile.name).obj,
cont = o.parentNode,
name = o.name,
id = o.id,
vBak = o.getAttribute("BAK"),
oFORM = oFile.form,
hFORM = oFile.form,
bak = S("<input name='_TMP_' type='file' class='EDITABLE' style='display:none'>").obj; // bak = S(o).nodeCopy(); ***nuevo***
S(oTD).attr("NUMFILE", slNumFile);
oFile.removeAttribute("NUMFILE");
S(o).attr("NUMFILE", slNumFile);
o.name = "_FILE_"+slNumFile;
o.id = "_FILE_"+slNumFile;
o.setAttribute("eSizeFile", oFile.getAttribute("eSizeFile"));
o.setAttribute("eFileUpdate", oFile.getAttribute("eFileUpdate"));
if( oTabla.getAttribute("formstatic")==1 ){
var ot = S.toTag(oTabla, 'TABLE', 1);
if( S.left(ot.id,9)=="TABNumber" ){
oFORM = S(":FRM"+S.mid(ot.id,9,0), win).obj;
}
}
oFORM.appendChild(o);
bak.name = name;
bak.id = id;
bak.setAttribute("BAK", vBak);
S(bak).nodeEnd(hFORM);
}
}
var _oSubLista;
function _FormularioASubLista(){
var DimMode = {'a':'I','A':'I','m':'U','b':'D','c':'V'},
DCampo = _ChildrenData[3].split(','), n, d, ModeCheck = '',
OCampo = _ChildrenData[4].split(','),
Obj = _WOPENER.DGI(_ChildrenData[0]),
CAMPO;
pCol=[];
S("TH[campo]",Obj).each(function(k,o){
var c = S.splitLast(" ", " "+S(o).attr("campo").replace("."," "))[1];
pCol[c] = S(o).attr("nc")*1-1;
});
try{
var w = _WOPENER.eval('FUNCTION_'+Obj.id.substring(1,Obj.id.length-1))('F', 'S', DimMode[Obj.MODO], (Obj.MODO.toUpperCase()=='A')?-1:Obj.rows[Obj.FILA].rowIndex, (Obj.MODO.toUpperCase()=='A')?null:Obj.rows[Obj.FILA], window, pCol);
if( typeof(w)=='boolean' && !w ) return;
}catch(e){}
if( Obj.getAttribute('SLUNIQUE')!=null && (Obj.MODO=='m' || Obj.MODO=='a' || Obj.MODO=='A') ){
var n,i,d,igual;
for(n=0; n<_DimChildrenData.length; n++){
if( _DimChildrenData[n][0]==Obj.id ){
for(i=0; i<_DimChildrenData[n].length; i++) _ChildrenData[i] = _DimChildrenData[n][i];
break;
}
}
var UCampo = Obj.getAttribute("SLUNIQUE").split('|'),
xUCampo = (UCampo.length==2) ? eTrim(UCampo[1]) : 'Registro duplicado',
AltoTH = S(Obj).attr("AltoTH")*1;
UFCampo = UNCampo = '';
UCampo = S.nsp(UCampo[0]).split(',');
for(d=0; d<UCampo.length; d++){
UCampo[d] = eTrim(UCampo[d]);
for(n=0; n<OCampo.length; n++){
DCampo[n] = eTrim(DCampo[n]);
if( DCampo[n]==UCampo[d] ){
if( UFCampo!='' ){
UFCampo += ',';
UNCampo += ',';
}
if( OCampo[n][0]=="*" ){
UFCampo += "_INPUT_"+S.mid(OCampo[n],1,0);
}else{
UFCampo += OCampo[n];
}
UNCampo += ''+n;
}
}
}
if( UNCampo=='' ){
alert('ERROR:\n{slUnique} mal definido');
return;
}
UFCampo = UFCampo.split(',');
UNCampo = UNCampo.split(',');
for(n=1+parseInt(AltoTH); n<Obj.rows.length-S(Obj).attr("COLSOP"); n++){
if( Obj.rows[n].getAttribute('LIBRE')==undefined ){
igual = UFCampo.length;
for(d=0; d<UFCampo.length; d++){
if( ((Obj.MODO=='m' && Obj.getAttribute("FILA")!=n) || Obj.MODO=='a') ){
if( DGI(UFCampo[d]).type=="checkbox" ){
if( (eTrim(Obj.rows[n].cells[UNCampo[d]].textContent)=="j" && DGI(UFCampo[d]).value==S.setup.checkOn) || (eTrim(Obj.rows[n].cells[UNCampo[d]].textContent)!="j" && DGI(UFCampo[d]).value==S.setup.checkOff) ){
igual--;
}
}else if( eTrim(Obj.rows[n].cells[UNCampo[d]].textContent)==DGI(UFCampo[d]).value ){
igual--;
}
}
}
if( igual==0 ){
_SLRegDupicado = Obj.rows[n].cells;
for(d=0; d<Obj.rows[n].cells.length; d++) Obj.rows[n].cells[d].style.backgroundColor = 'red';
Obj.parentNode.scrollTop = Obj.rows[n].offsetTop - Obj.rows[AltoTH].offsetHeight;
top.eAlert(S.lng(212), xUCampo.replace(/\#/g, n), 'A', 'E', window.SLRegDuplicado);
return false;
}
}
}
}
var NomFunc='', Nom = _ChildrenData[0].substring(1,_ChildrenData[0].length-1);
try{ NomFunc = typeof(_WOPENER.eval('JSCheck'+Nom)); }catch(e){}
if( NomFunc=='function' || NomFunc=='object' ){
if( !_WOPENER.eval('JSCheck'+Nom)(Obj.id, ModeCheck, ((ModeCheck=='I')? -1 : Obj.FILA), Obj.rows, window, pCol) ) return false;
}
switch( Obj.MODO ){
case "A":
case "a":
ModeCheck = 'I';
Obj.MODO = 'a';
d = 0;
for(n=1; n<Obj.rows.length-S(Obj).attr("COLSOP"); n++){
if( S(Obj.rows[n]).attr("LIBRE")!=undefined ){
Obj.rows[n].removeAttribute('LIBRE');
d = n;
Obj.MODO = 'A';
var oTR = Obj.rows[n];
break;
}
}
if( d>0 ) break;
var oTR = eInsertRow(Obj);
Obj.FILA = oTR.rowIndex;
Obj.setAttribute("FILA", oTR.rowIndex);
oTR.style.fontStyle = "italic";
break;
case "m":
ModeCheck = 'U';
var oTR = Obj.rows[Obj.FILA];
oTR.style.fontStyle = "italic";
break;
case "b":
ModeCheck = 'D';
S("TD",Obj.rows[Obj.FILA]).each(function(pk, o){
if( S(o).attr("NUMFILE") ){
S(":_FILE_"+S(o).attr("NUMFILE"), _WOPENER).nodeRemove();
}
});
Obj.deleteRow(Obj.FILA);
break;
case "c":
return eClearEvent();
}
var AltoTH = S(Obj).attr("AltoTH")*1;
if( Obj.MODO=='a' || Obj.MODO=='A' || Obj.MODO=='m' ){
for(n=0; n<Obj.rows[AltoTH].cells.length; n++){
var oTD = (Obj.MODO=='a') ? oTR.insertCell() : oTR.cells[n];
for(d=0; d<DCampo.length; d++){
if( DCampo[d]=='' ) continue;
CAMPO = S(Obj.rows[AltoTH].cells[n]).attr("CAMPO");
if( CAMPO==DCampo[d] || (CAMPO.indexOf('.')==1 && CAMPO.substring(2)==DCampo[d]) ){
if( OCampo[d]=='IMG' ){
if( Obj.MODO=='a' || Obj.MODO=='A' ) oTD.innerHTML = _ChildrenData[8].replace("<br>","\n");
}else if( OCampo[d].substring(0,1)=='*' ){
oTD.textContent = S(":"+OCampo[d].substring(1)).option();
}else{
if( Obj.rows[AltoTH].cells[n].getAttribute("MILES") ){
oTD.textContent = S(":"+OCampo[d]).obj.value;
}else{
if( S(eGO(OCampo[d])).attr("oDIR")!=undefined ){
if( eGF(OCampo[d])!='' ){
_DuplicaCampoFile(Obj, oTD, eGO(OCampo[d]), _DBINDEX);
if( S("TD[newvalue]", oTR).length==1 && S(".ICON-DESCARGAR", oTR).length==1 ){
S.visibility(S(".ICON-DESCARGAR", oTR), /^(png|jpg|jpeg|gif|bmp|tif|tiff|pdf|csv|txt|mp4)$/i.test(S.fileType(S(oTD).text())));
}
}
}else{
if( eGO(OCampo[d]).type=="checkbox" ){
oTD.innerHTML = '<i class="ICONINPUT">'+((eGF(OCampo[d])==_CheckBoxSave[0])?'j':'i')+'</i>';
}else if( eGO(OCampo[d]).type=="radio" ){
oTD.textContent = eGF(OCampo[d]);
}else if( eGO(OCampo[d]).tagName=='TEXTAREA' ){
if( S(":"+OCampo[d]).attr("eHTML")!=null ){
oTD.innerHTML = S(":"+OCampo[d]).val();
}else{
oTD.innerHTML = S.replace(S(":"+OCampo[d]).val(), S.char(10), "<br>");
}
}else{
oTD.textContent = S(":"+OCampo[d]).obj.value;
}
}
}
}
break;
}
}
}
}
if( Obj.MODO=='a' || Obj.MODO=='A' ){
Obj.parentNode.scrollTop = Obj.offsetHeight;
}
Obj.setAttribute("ENVIAR", 1);
if( S(Obj).attr("COLSOP") ){
var s_ShowZero=_ShowZero, c, t, Total, f;
_ShowZero = 1;
for(c=0; c<Obj.rows[AltoTH].cells.length; c++){
t = S(Obj.rows[AltoTH].cells[c]).attr("ColOp");
if( t!=undefined ){
Total = 0;
for(f=1; f<Obj.rows.length; f++){
if( S(Obj.rows[f]).attr('LIBRE')==undefined && Obj.rows[f].id!='PieLista'  ){
switch( t ){
case '+':
Total += eClearThousands( Obj.rows[f].cells[c].textContent )*1;
break;
case 'C': case 'c':
Total++;
break;
case '#':
if( eTrim( Obj.rows[f].cells[c].textContent )!='' ) Total++;
break;
}
}
}
Obj.rows[Obj.rows.length-1].cells[c].textContent = eShowThousands( Total, Obj.rows[AltoTH].cells[c].getAttribute("DCM") );
}
}
_ShowZero = s_ShowZero;
}
if(_ChildrenData[6]!=''){
var s_ShowZero=_ShowZero; _ShowZero=1, Total, f,
tmp = _ChildrenData[6].split(',');
for(n=0; n<tmp.length; n++){
tmp[n] = eTrim(tmp[n]);
if( tmp[n]!='' ){
Total = 0;
for(f=1+parseInt(AltoTH); f<Obj.rows.length; f++){
if( S(Obj.rows[f]).attr('LIBRE')==undefined && Obj.rows[f].id!='PieLista'  ){
switch( tmp[n] ){
case '+':
Total += eClearThousands( Obj.rows[f].cells[n].textContent )*1;
break;
case 'C': case 'c':
Total++;
break;
case '#':
if( eTrim( Obj.rows[f].cells[n].textContent )!='' ) Total++;
break;
}
}
}
Obj.rows[Obj.rows.length-1].cells[n].textContent = eShowThousands( Total, Obj.rows[AltoTH].cells[n].getAttribute("DCM") );
}
}
_ShowZero = s_ShowZero;
}
if( _ChildrenData[7]!='' ){
if( Obj.MODO=='b' ) oTR = null;
eval(_ChildrenData[7])(oTR);
}
if( Obj.MODO=='b' ){
oTR = null;
if( Obj.rows.length<S(Obj).attr("TRVISIBLES") ){
oTR = eInsertRow(Obj);
S(oTR).attr("LIBRE",1);
for(n=0; n<Obj.rows[AltoTH].cells.length; n++) oTR.insertCell().innerHTML = "&nbsp;";
}
}
eSLReorder(Obj);
_FormularioPaste(null, null, null, Obj.MODO);
_FormStaticConect = false;
_oSubLista = Obj;
try{
var w = _WOPENER.eval('FUNCTION_'+Obj.id.substring(1,Obj.id.length-1))('F', 'E', DimMode[Obj.MODO], (Obj.MODO=='b')?-1:oTR.rowIndex, (Obj.MODO=='b')?null:oTR, window, pCol);
if( typeof(w)=='boolean' && !w ) return eClearEvent();
}catch(e){}
setTimeout(function(){
S(_oSubLista.parentNode).eventFire("scroll");
if( Obj.MODO=='m' || Obj.MODO=='b' ){
S.window(window);
}
}, 250);
return eClearEvent();
}
function _slOption( el ){
var k = S.eventCode(window.event),
Char = String.fromCharCode(k).toUpperCase();
if( k==13 ){
var sl = el.children[0].name.substring(6);
if( window.event.shiftLeft ){
eFocus(DGI('['+sl+']').slULTIMO);
}else{
eFocus(DGI('['+sl+']').slPRIMERO);
}
}
if( Char==' ' || k==119 || k==121 ){
S(el).eventFire("click");
}
return eClearEvent();
}
function _eSLConfig(txt){
if( _Mode=='A' ) return;
if( !_CARD ){
var TCampos = 0,
Primero = Ultimo = null, MaxFile=0, n,i;
for(n=0; n<_DimChildrenData.length; n++){
if( _DimChildrenData[n][0]=='['+txt+']' ){
var oNomObj = _DimChildrenData[n][3].split(','),
NomObj = _DimChildrenData[n][4].split(',');
for(i=0; i<NomObj.length; i++){
if( oNomObj[i]==_DBINDEX ){
alert('ERROR: El campo "'+oNomObj[i]+'" no puede estar dentro de [EditList]');
return;
}
oNomObj[i] = oNomObj[i].replace(/&#44;/g,',');
if( oNomObj[i].indexOf(')')>-1 ){
var tmp = oNomObj[i].split(')');
oNomObj[i] = eTrim(tmp[tmp.length-1]);
}
if( NomObj[i]=='IMG' ) continue;
if( NomObj[i].substring(0,1)=='*' ) NomObj[i] = NomObj[i].substring(1);
_InFormOnLine[NomObj[i]] = 1;
if( NomObj[i].substring(0,1)!="'" && NomObj[i].substring(0,1)!='"' ){
var Obj = DGI(NomObj[i]);
if( Obj==null && (_Mode=='cR' || _Mode=='bR') ) continue;
TCampos++;
Obj.setAttribute("F10", 1);
if( Obj.TYPEFILE!=undefined ) DGI('['+txt+']').FIELDFILE = oNomObj[i];
if( DGI('_INPUT_'+Obj.name)!=null ){
DGI('_INPUT_'+Obj.name).setAttribute("F10",1);
}else if( Obj.eDefault!=undefined ) Obj.value = Obj.eDefault;
if( Primero==null ) Primero = Obj.sourceIndex;
Ultimo = Obj.sourceIndex;
}
}
}
}
if( TCampos==0 ) return;
var Restar = 0;
var pTR = uTR = Titulo = null, oTable, p, t;
for(p=Primero-1; p>0; p--){
e = S(eIndex(p)).toTag("TR");
oTable = S(e).toTag("TABLE");
if( oTable.className=="TABMiddle" || oTable.className=="TABStyle" ){
i = e.rowIndex;
for(n=i; n>=0; n--){
if( oTable.rows[n].getAttribute("ttr")=="-" ){
e = oTable.rows[n];
pTR = e;
if(	S(".TABMenuOn", e).length ){
Titulo = S(".TABMenuOn", e).obj;
break;
}else if( S(".HR_txt", e).length ){
Titulo = S(".HR_txt", e).obj;
break;
}else if( S(".Separator", e).length ){
Titulo = S(".Separator", e).obj;
break;
}
}
}
break;
}else if( oTable.className=="Columns" ){
e = oTable.rows[e.rowIndex];
pTR = e;
Titulo = S("legend", S(e).toTag("TR",1)).obj;
break;
}
}
n = Ultimo-1;
e = eIndex(n);
while( e.tagName!='TR' && e.id!=']' && n>0 ) e = eIndex(--n);
uTR = e;
var Obj = DGI('['+txt+']');
t = eIndex();
for(n=Ultimo+1; n<t; n++){
e = eIndex(n);
if( e.type=='checkbox' && e.className=='slBUTTON' ){
for(p=n+1; p<t; p++){
Obj.slOP = eIndex(p);
if( Obj.slOP.tagName=="I" ) break;
}
break;
}
if( 'TEXTAREA,HR'.indexOf(e.tagName)>-1 ) break;
if( e.tagName=='DIV' && e.id=='OpExe' ) break;
}
if( Obj.slOP==undefined ){
var el = DGI('c['+txt+']');
for(n=el.sourceIndex-1; n>0; n--){
e = eIndex(n);
if( ',INPUT,TEXTAREA,'.indexOf(','+e.tagName+',')>-1 ){
Obj.slOP = e;
if( e.type=='checkbox' && e.className=='slBUTTON' ) Obj.slOP = eIndex(n+2);
break;
}
}
if( Obj.slOP==undefined ){
alert('Objeto ['+txt+'] {slMenu} no encontrado');
return;
}
}
if( pTR==null || uTR==null || Titulo==null ){
Obj = 'Error en Objeto ['+txt+'] ';
if( pTR==null ) alert(Obj+'primer campo no encontrado');
if( uTR==null ) alert(Obj+'último campo no encontrado');
if( Titulo==null ) alert(Obj+'título no encontrado');
return;
}
var TB = S.toTag(pTR,'TABLE'), r;
Obj.slOLDTITLE = eTrim(Titulo.textContent);
Obj.slTITLE = Titulo;
Obj.slTITLE.style.whiteSpace = 'nowrap';
Obj.slOP.title = Obj.slTITLE.textContent;
Obj.slTABLE = TB.rows;
Obj.slPRIMERO = eIndex(Primero);
Obj.slULTIMO = eIndex(Ultimo-Restar);
Obj.slPTR = pTR.rowIndex;
Obj.slUTR = uTR.rowIndex;
Obj.slFORM = Obj.slPRIMERO.form;
Obj.MODO = 'I';
Obj.slDESDE = null;
Obj.slHASTA = null;
Obj.slCheckDESDE = null;
Obj.slCheckHASTA = null;
var el = Obj.slFORM.elements;
for(n=0; n<el.length; n++){
if( Obj.slHASTA==null ){
if( el[n].name==Obj.slULTIMO.name || el[n].name=='_INPUT_'+Obj.slULTIMO.name ) Obj.slHASTA = n+1;
}
if( Obj.slDESDE==null ){
if( el[n].name==Obj.slPRIMERO.name || el[n].name=='_INPUT_'+Obj.slPRIMERO.name ) Obj.slDESDE = n;
}
}
for(n=0; n<_cForm.length; n++){
if( Obj.slCheckHASTA==null ){
if( _cForm[n].Nombre==Obj.slULTIMO.name || _cForm[n].Nombre=='_INPUT_'+Obj.slULTIMO.name ) Obj.slCheckHASTA = n+1;
}
if( Obj.slCheckDESDE==null ){
if( _cForm[n].Nombre==Obj.slPRIMERO.name || _cForm[n].Nombre=='_INPUT_'+Obj.slPRIMERO.name ) Obj.slCheckDESDE = n;
}
}
}else{
var iSubList = S("SPAN[id='c["+txt+"]']").obj.sourceIndex,
Obj = DGI('['+txt+']'), siTitleSubList=null;
S("SPAN[id='c["+txt+"]']").css("display:block");
Obj.slOP = S(":___op_"+txt).obj;
Obj.MODO = 'I';
Obj.slTABLE = 1;
S(".card-header, .card-title").each(function(k,o){
if( o.sourceIndex<iSubList ) siTitleSubList = o.sourceIndex;
});
S(".card-header, .card-title").each(function(k,o){
if( o.sourceIndex<iSubList && o.sourceIndex<siTitleSubList ){
pTR = o;
Titulo = o;
Obj.slTITLE = o;
Obj.slOP.title = o.textContent;
Obj.slOLDTITLE = o.textContent;
}
});
S("FORM").each(function(k,o){
if( o.sourceIndex<iSubList ) Obj.slFORM = o;
});
var el = Obj.slFORM.elements;
Obj.slDESDE = null;
for(n=0; n<el.length; n++){
if( el[n].sourceIndex>Titulo.sourceIndex && el[n].sourceIndex<siTitleSubList ){
if( Obj.slDESDE==null ){
Obj.slPRIMERO = el[n];
Obj.slDESDE = n;
}
if( !/^_INPUT_/.test(el[n].name) ){
Obj.slULTIMO = el[n];
Obj.slHASTA = n;
}
}
}
for(n=0; n<_cForm.length; n++){
if( Obj.slCheckHASTA==null ){
if( _cForm[n].Nombre==Obj.slULTIMO.name || _cForm[n].Nombre=='_INPUT_'+Obj.slULTIMO.name ) Obj.slCheckHASTA = n+1;
}
if( Obj.slCheckDESDE==null ){
if( _cForm[n].Nombre==Obj.slPRIMERO.name || _cForm[n].Nombre=='_INPUT_'+Obj.slPRIMERO.name ) Obj.slCheckDESDE = n;
}
}
Obj.slTITLE.style.whiteSpace = 'nowrap';
}
for(r=Obj.slDESDE; r<=Obj.slHASTA; r++){
_InFormOnLine[Obj.slFORM.elements[r].name] = 1;
}
_FormularioCopy(Obj.slFORM.elements, Obj.slDESDE, Obj.slHASTA);
for(r=0; r<MaxFile; r++){
n = r+1;
var el = DGI(Obj.FILE),
oClone = S(el).nodeCopy();
DGI('_SPANFILE').appendChild(oClone);
S(el).nodeSwap(oClone);
Obj.rows[n].NUMFILE = n;
el.name = Obj.FILE+'_'+n;
el.id = Obj.FILE+'_'+n;
el.NUMFILE = Obj.FILE+'_'+n;
_WOPENER._slNumFile++;
}
var Obj2 = DGI('m['+txt+']');
if( Obj2!=null ){
TCampos = 0;
Obj2 = Obj2.getElementsByTagName("TD");
for(n=0; n<Obj2.length; n++) if( Obj2[n].getAttribute('gsOP')=='I' ) TCampos = 1;
if( TCampos==0 ){
Obj.IniInsert = 0;
_FormularioLimpioPara(Obj, 'V');
_FormularioReadOnly(Obj.slFORM.elements, Obj.slDESDE, Obj.slHASTA, Obj.MODO);
}
}
if( Obj.getAttribute('SUBLISTPADRE')!=null ){
_FormularioLimpioPara(Obj, 'V');
}
if( Obj.getAttribute('RELATION')!=null ){
var SL = DGI('['+Obj.getAttribute("RELATION")+']'), c,n,tmp, tmp2,
dCampo = Obj.getAttribute("RELATIONFIELD"), oCampo = hCampo = '', dCol = -1,
dCampoPadre, dCampoHijo;
[dCampoPadre, dCampoHijo] = (dCampo+"="+dCampo).split("=");
for(c=0; c<SL.rows[0].cells.length; c++){
if( S(SL.rows[0].cells[c]).attr("CAMPO")==dCampoHijo ){
dCol = c;
break;
}
}
for(n=0; n<_DimChildrenData.length; n++){
if( _DimChildrenData[n][0]==Obj.id ){
tmp = _DimChildrenData[n][1].split(',');
for(c=0; c<tmp.length; c++){
tmp2 = tmp[c].split('=');
var tmp3 = tmp2[0].split('.'); if( tmp3.length==2 ) tmp2[0] = tmp3[1];
if( tmp2[0]==dCampoPadre ){
oCampo = tmp2[1];
break;
}
}
}else if( _DimChildrenData[n][0]=='['+Obj.getAttribute("RELATION")+']' ){
tmp = _DimChildrenData[n][1].split(',');
for(c=0; c<tmp.length; c++){
tmp2 = tmp[c].split('=');
var tmp3 = tmp2[0].split('.'); if( tmp3.length==2 ) tmp2[0] = tmp3[1];
if( tmp2[0]==dCampoHijo ){
hCampo = tmp2[1];
break;
}
}
}
}
if( dCol>-1 && oCampo!='' ){
SL.SUBLISTPADRE = Obj.id;
Obj.RELATIONCOL = dCol;
Obj.FIELDPARENT = oCampo;
Obj.FIELDCHILD  = hCampo;
}
}
}
function _slDelChildren(Obj){
var TABLA = DGI('['+Obj.getAttribute("RELATION")+']'), n,
Valor = eGF(Obj.FIELDPARENT),
TR = TABLA.rows;
TABLA.setAttribute("ENVIAR", 1);
for(n=TR.length-1; n>0; n--){
if( TR[n].id!='PieLista' && TR[n].cells[Obj.RELATIONCOL].textContent==Valor ) TABLA.deleteRow(n);
}
}
var _SLRegDupicado;
function SLRegDuplicado(){
for(var d=0; d<_SLRegDupicado.length; d++) _SLRegDupicado[d].style.backgroundColor = '';
}
function _slClick(Obj){
if( Obj.disabled ) return eClearEvent();
S(Obj.children[0]).hidden();
if( !top.eReadyState(window) ){
setTimeout(function(){
_slClick(Obj);
}, 1000);
return false;
}
var FilaTocada=null, sMODO="", n,i,d;
try{
if( !top.eReadyState(top.TLF) && top._UltimaURL.indexOf('edes.php?D:')==-1 && top._UltimaURL.indexOf('&DOWNLOAD=')==-1 && top._UltimaURL.indexOf('&_gs_formato_=')==-1 ){
setTimeout(function(){
_slClick(Obj);
}, 1000);
return false;
}
}catch(e){
return false;
}
S.public(1);
S(Obj.children[0]).visible();
__slClick(Obj);
S.public(0);
}
function __slClick(Obj){
var FilaTocada=null, sMODO="", n,i,d;
if( DGI('edMENUS')!=null && edMENUS.style.display=='block' ) edSave();
var Nom = S("I", Obj).attr("name").substring(6),
Obj = DGI('['+Nom+']');
if( Obj.MODO=='D' && Obj.getAttribute('FIELDPARENT')!=null ){
_slDelChildren(Obj);
}
if( Obj.MODO=='I' ){
if( !eRowsFree(Obj) ) return;
if( Obj.getAttribute('RELATIONFIELD')!=null ){
var el = DGI(Obj.getAttribute("RELATIONFIELD"));
if( eGF(Obj.FIELDPARENT)==0 ){
_SubSubListPk--;
ePF(Obj.FIELDPARENT, _SubSubListPk);
}
}else if( Obj.getAttribute('SUBSUBLIST')!=null ){
var el = DGI(Obj.SUBLISTPADRE);
if( eGF(el.FIELDPARENT)!=0 ){
ePF(el.FIELDCHILD, eGF(el.FIELDPARENT));
}
}
}else{
FilaTocada = Obj.rows[Obj.FILA];
}
pCol=[];
S("TH[campo]",Obj).each(function(k,o){
var c = S.splitLast(" ", " "+S(o).attr("campo").replace("."," "))[1];
pCol[c] = S(o).attr("nc")*1-1;
});
try{
var w = eval('FUNCTION_'+Obj.id.substring(1,Obj.id.length-1))('F', 'S', Obj.MODO, -1, (Obj.MODO=='I')?null:FilaTocada, window, pCol);
if( typeof(w)=='boolean' && !w ) return;
}catch(e){}
var AltoTH = S(Obj).attr("AltoTH")*1,
okForm = Ok_Formulario(Obj.slFORM, Obj.slCheckDESDE, Obj.slCheckHASTA, Obj.MODO);
if( Obj.MODO=='D' || okForm ){
var NomFunc = '';
try{ NomFunc = typeof(eval('JSCheck'+Nom)); }catch(e){}
if( NomFunc=='function' || NomFunc=='object' ){
_ErrMensaje = _ErrCampo = '', _ErrForm = -1;
if( !eval('JSCheck'+Nom)(Obj.id, Obj.MODO, ((Obj.MODO=='I')? -1 : Obj.FILA), Obj.rows, window, pCol) ) return false;
if( _ErrForm==-1 ){
top.eAlert(S.lng(212), 'Error no definido: '+_ErrMensaje, 'A', 'E');
return false;
}else if( _ErrMensaje.length>0 ){
_ConError = true;
var tmp = _ErrCampo.split(',');
for(i=0; i<tmp.length; i++){
if( eGO(tmp[i]).className!="READONLY" ){
eGO(tmp[i]).className = 'error';
if( DGI('_INPUT_'+tmp[i])!=null ) DGI('_INPUT_'+tmp[i]).className = 'error';
}
}
_ErrCampo = tmp[0];
Obj = eGetFocus( eGO(_ErrCampo) );
top.eAlert('ERRORES ENCONTRADOS', _ErrMensaje, 'A', 'W', Obj);
return false;
}
}
if( Obj.getAttribute('SLUNIQUE')!=null && (Obj.MODO=='U' || Obj.MODO=='I') ){
for(n=0; n<_DimChildrenData.length; n++){
if( _DimChildrenData[n][0]==Obj.id ){
for(i=0; i<_DimChildrenData[n].length; i++) _ChildrenData[i] = _DimChildrenData[n][i];
break;
}
}
var DCampo = _ChildrenData[3].split(','), n, d;
OCampo = _ChildrenData[4].split(','),
UCampo = Obj.getAttribute("SLUNIQUE").split('|'),
xUCampo = (UCampo.length==2) ? eTrim(UCampo[1]) : 'Registro duplicado';
UCampo = S.nsp(UCampo[0]).split(',');
var UFCampo = UNCampo = '';
for(d=0; d<UCampo.length; d++){
UCampo[d] = eTrim(UCampo[d]);
for(n=0; n<OCampo.length; n++){
DCampo[n] = eTrim(DCampo[n]);
if( DCampo[n]==UCampo[d] ){
if( UFCampo!='' ){
UFCampo += ',';
UNCampo += ',';
}
if( OCampo[n][0]=="*" ){
UFCampo += "_INPUT_"+S.mid(OCampo[n],1,0);
}else{
UFCampo += OCampo[n];
}
UNCampo += ''+n;
}
}
}
if( UNCampo=='' ){
alert('ERROR:\n{slUnique} mal definido');
return;
}
UFCampo = UFCampo.split(',');
UNCampo = UNCampo.split(',');
for(n=1+parseInt(AltoTH); n<Obj.rows.length-S(Obj).attr("COLSOP"); n++){
if( Obj.rows[n].getAttribute('LIBRE')==undefined ){
var igual = UFCampo.length;
for(d=0; d<UFCampo.length; d++){
if( ((Obj.MODO=='U' && Obj.getAttribute("FILA")!=n) || Obj.MODO=='I') ){
if( DGI(UFCampo[d]).type=="checkbox" ){
if( (eTrim(Obj.rows[n].cells[UNCampo[d]].textContent)=="j" && DGI(UFCampo[d]).value==S.setup.checkOn) || (eTrim(Obj.rows[n].cells[UNCampo[d]].textContent)!="j" && DGI(UFCampo[d]).value==S.setup.checkOff) ){
igual--;
}
}else if( eTrim(Obj.rows[n].cells[UNCampo[d]].textContent)==DGI(UFCampo[d]).value ){
igual--;
}
}
}
if( igual==0 ){
_SLRegDupicado = Obj.rows[n].cells;
for(d=0; d<Obj.rows[n].cells.length; d++) Obj.rows[n].cells[d].style.backgroundColor = 'red';
Obj.parentNode.scrollTop = Obj.rows[n].offsetTop - Obj.rows[AltoTH].offsetHeight;
top.eAlert(S.lng(212), xUCampo.replace(/\#/g,n), 'A', 'E', window.SLRegDuplicado);
return false;
}
}
}
}
sMODO = Obj.MODO;
FilaTocada = _FormularioASubListaIncr(Obj);
eSLReorder(Obj);
}
if( okForm ){
try{
eval('FUNCTION_'+Obj.id.substring(1,Obj.id.length-1))('F', 'E', sMODO, Obj.FILA, FilaTocada, window, pCol);
if( sMODO=='I' ) Obj.parentNode.scrollTop = FilaTocada.offsetTop-FilaTocada.offsetHeight-3;
}catch(e){}
}
if( Obj.MODO=='I' && Obj.getAttribute('SUBSUBLIST')!=null ){
DGI('c'+Obj.id).style.height = AltoNFilas(Obj.id,Obj.parentNode.NF)+"px";
setTimeout(function(){ THScroll(Obj.id,0) }, 250);
}
}
function _AnchoTab(Obj){
var AnchoSpan = Obj.parentNode.offsetWidth, t;
while( t=S.toTag(Obj,'TABLE') ){
if( i.id=='PAGINA' ) break;
if( t.id.substring(0,9)=='TABNumber' ){
AnchoSpan = t.offsetWidth;
break;
}
}
return Array(t, AnchoSpan);
}
function _FormularioASubListaIncr(Obj){
var FilaTocada=null, n,i;
if( Obj==undefined ){
Obj = _WOPENER.DGI(_ChildrenData[0]);
}else{
for(n=0; n<_DimChildrenData.length; n++){
if( _DimChildrenData[n][0]==Obj.id ){
for(i=0; i<_DimChildrenData[n].length; i++) _ChildrenData[i] = _DimChildrenData[n][i];
break;
}
}
}
var DCampo = _ChildrenData[3].split(','), n, d, oTR,
OCampo = _ChildrenData[4].split(','),
Reutilizar = false;
switch( Obj.MODO ){
case "I":
d = 0;
for(n=1; n<Obj.rows.length-S(Obj).attr("COLSOP"); n++){
if( S(Obj.rows[n]).attr("LIBRE")!=undefined ){
Obj.rows[n].removeAttribute('LIBRE');
d = n;
Reutilizar = true;
oTR = Obj.rows[n];
oTR.style.fontStyle = "italic";
oTR.style.display = '';
oTR.setAttribute('isNew',1);
break;
}
}
if( d>0 ) break;
oTR = eInsertRow(Obj);
Obj.FILA = oTR.rowIndex;
Obj.setAttribute("FILA", oTR.rowIndex);
oTR.style.fontStyle = "italic";
oTR.setAttribute("isNew", 1);
break;
case "U":
oTR = Obj.rows[Obj.FILA];
oTR.style.fontStyle = "italic";
break;
case "D":
S("TD",Obj.rows[Obj.FILA]).each(function(pk, o){
if( S(o).attr("NUMFILE") ){
S(":_FILE_"+S(o).attr("NUMFILE"),_WOPENER).nodeRemove();
}
});
Obj.deleteRow(Obj.FILA);
break;
case "V":
eClearEvent();
return null;
}
var AltoTH = S(Obj).attr("AltoTH")*1, oTD, tmp, NomCol, txt;
if( Obj.MODO=='I' || Obj.MODO=='U' ){
for(n=0; n<Obj.rows[AltoTH].cells.length; n++){
oTD = ( Obj.MODO=='I' && !Reutilizar ) ? oTR.insertCell() : oTR.cells[n];
for(d=0; d<DCampo.length; d++){
DCampo[d] = eTrim(DCampo[d]).replace(/&#44;/g,',');
if( DCampo[d].indexOf(')')>-1 ){
tmp = DCampo[d].split(')');
DCampo[d] = eTrim(tmp[tmp.length-1]);
}else if( DCampo[d].indexOf(' ')>-1 ){
tmp = DCampo[d].split(' ');
DCampo[d] = eTrim(tmp[tmp.length-1]);
}
NomCol = S(Obj.rows[AltoTH].cells[n]).attr("CAMPO");
if( NomCol.indexOf(')')>-1 ){
tmp = NomCol.split(')');
NomCol = eTrim(tmp[tmp.length-1]);
}else if( NomCol.indexOf(' ')>-1 ){
tmp = NomCol.split(' ');
NomCol = eTrim(tmp[tmp.length-1]);
}
if( NomCol==DCampo[d] ){
if( OCampo[d]=='IMG' ){
if( Obj.MODO=='I' ) oTD.innerHTML = _ChildrenData[8].replace("<br>","\n");
}else if( OCampo[d][0]=="*" ){
oTD.textContent = S(":"+OCampo[d].substring(1)).option();
}else{
if( /^(\+|\+\,|\-|\-\,|P4|F4|CDI|T)$/.test(S(":"+OCampo[d]).attr("tc")) ){
oTD.textContent = S(":"+OCampo[d]).obj.value;
}else{
if( eGO(OCampo[d]).type=="checkbox" ){
oTD.innerHTML = '<i class="ICONINPUT'+((eGF(OCampo[d])==_CheckBoxSave[0])?'">j':' OFF">i')+'</i>';
}else if( eGO(OCampo[d]).type=="radio" ){
oTD.textContent = "";
S(":"+OCampo[d]).each(function(pk, obj){
if( obj.checked ){
oTD.textContent = obj.getAttribute("eValue");
}
});
}else{
if( eGO(OCampo[d]).tagName=='TEXTAREA' ){
if( S(":"+OCampo[d]).attr("eHTML")!=null ){
oTD.innerHTML = S(":"+OCampo[d]).val();
}else{
txt = S(":"+OCampo[d]).val();
txt = S.replace(txt, [["<","&lt;"], [">","&gt;"], [S.char(10), "<br>"]]);
oTD.innerHTML = txt;
}
}else{
oTD.textContent = eGF(OCampo[d]);
}
if( eGO(OCampo[d]).getAttribute("eUpload")!=null ){
_DuplicaCampoFile(Obj, oTD, eGO(OCampo[d]), _DBINDEX);
if( S("TD[newvalue]", oTR).length==1 && S(".ICON-DESCARGAR", oTR).length==1 ){
S.visibility(S(".ICON-DESCARGAR", oTR), /^(png|jpg|jpeg|gif|bmp|tif|tiff|pdf|csv|txt|mp4)$/i.test(S.fileType(S(oTD).text())));
}
}
}
}
}
break;
}
}
}
FilaTocada = oTR;
}
if( Obj.MODO=='I' ){
}else if( Obj.MODO=='U' || Obj.MODO=='D' ){
if( _FormularioASubListaIncr.arguments.length==0 ){
S.windowHidden(window);
}else{
}
}
Obj.setAttribute("ENVIAR", 1);
if( _ChildrenData[9]!='' ){
var s_ShowZero=_ShowZero, _ShowZero=1,
tmp=_ChildrenData[9].split(','),
c, f, Total;
for(c=0; c<tmp.length; c++){
if( tmp[c]!='' ){
Total = 0;
for(f=1; f<Obj.rows.length; f++){
if( S(Obj.rows[f]).attr('LIBRE')==null && Obj.rows[f].id!='PieLista'  ){
switch( tmp[c] ){
case '+':
Total += eClearThousands( Obj.rows[f].cells[c].textContent )*1;
break;
case 'C': case 'c':
Total++;
break;
case '#':
if( eTrim( Obj.rows[f].cells[c].textContent )!='' ) Total++;
break;
}
}
}
Obj.rows[Obj.rows.length-1].cells[c].textContent = eShowThousands( Total, Obj.rows[AltoTH].cells[c].getAttribute("DCM") );
}
}
_ShowZero = s_ShowZero;
}
if( _ChildrenData[7]!='' ){
if( Obj.MODO=='D' ) oTR = null;
eval(_ChildrenData[7])(oTR);
}
if( Obj.MODO=='D' ){
oTR = null;
var TRVisibles = Obj.rows.length;
if( Obj.SUBSUBLIST!=undefined ){
TRVisibles = 0;
var SL = DGI('['+DGI(Obj.SUBLISTPADRE).RELATION+']'),c,ok,
dCol = DGI(Obj.SUBLISTPADRE).RELATIONCOL,
Valor = eGF(DGI(Obj.SUBLISTPADRE).FIELDPARENT);
for(c=1+parseInt(S(SL).attr("AltoTH")); c<SL.rows.length; c++){
ok = (eTrim(SL.rows[c].cells[dCol].textContent)==Valor);
if( ok || SL.rows[c].LIBRE==1 ) TRVisibles++;
}
}
if( TRVisibles<S(Obj).attr("TRVISIBLES") ){
var oTR = eInsertRow(Obj);
S(oTR).attr("LIBRE",1);
for(n=0; n<Obj.rows[AltoTH].cells.length; n++) oTR.insertCell().innerHTML = "&nbsp;";
}
}
eSLReorder(Obj);
_FormStaticConect = false;
_oSubLista = Obj;
if( _FormularioASubListaIncr.arguments.length>0 && Obj.MODO=='I' ){
SiguienteCampo(Obj.slFORM.elements[ Obj.slDESDE ].name);
}
if( Obj.MODO=='I' ) Obj.parentNode.scrollTop = Obj.offsetHeight;
if( Obj.getAttribute('IniInsert')==0 ){
_FormularioLimpioPara( Obj, 'V' );
_FormularioReadOnly(Obj.slFORM.elements, Obj.slDESDE, Obj.slHASTA, Obj.MODO);
}else{
_FormularioLimpioPara(Obj, 'I');
}
setTimeout(function(){
S(_oSubLista.parentNode).eventFire("scroll");
}, 250 );
eClearEvent();
if( Obj.offsetHeight>Obj.parentNode.offsetHeight ) _AjustaCampos();
return FilaTocada;
}
function eSubListUnique(tabla, reg){
var tmp2 = (tabla.getAttribute("SLUNIQUE") || "").split('|'),
campo = S.nsp(tmp2[0]).split(","),
dim = eSLGet(tabla),
pos=[], dupli=[], indice,n,f,
restar = (S("TH[nc='0']", tabla).attr("campo")=="''")? 1:0;
if( tmp2[0]=="" ) return true;
for(n=0; n<campo.length; n++) pos[campo[n]] = S(S("TH[campo='"+campo[n]+"']", tabla)).attr("nc")*1-restar;
for(f=0; f<dim.length; f++){
indice = "";
for(n=0; n<campo.length; n++) indice += ","+dim[f][pos[campo[n]]];
if( !dupli[indice] ) dupli[indice]=0;
dupli[indice]++;
if( dupli[indice]>1 ){
top.eInfoError(window, tmp2[1]);
return false;
}
}
indice = "";
for(n=0; n<campo.length; n++) indice += ","+reg[pos[campo[n]]+restar];
if( !dupli[indice] ) dupli[indice]=0;
dupli[indice]++;
if( dupli[indice]>1 ){
top.eInfoError(window, tmp2[1]);
return false;
}
return true;
}
function eSubListInsert(id, Dim){
var Tabla = DGI('['+id+']'),
AltoTH = S(Tabla).attr("AltoTH")*1,
op = S(Tabla).attr("COLSOP")==null ? 0:1,
def = [],
Reutilizar = false, d=-1, oTR, oTD, n, x, xIcon,xClick,xTitle,xTmp;
Obj = S("TBODY", Tabla).obj;
if( !eSubListUnique(Tabla, Dim) ) return false;
S("TH[nc]", Tabla).each(function(k,o){
def[k] = S(o).attr("nc, td, dcm, miles");
});
for(n=0; n<Obj.rows.length; n++){
if( S(Obj.rows[n]).attr("LIBRE")!=undefined ){
Obj.rows[n].removeAttribute('LIBRE');
d = n;
Reutilizar = true;
oTR = Obj.rows[n];
break;
}
}
if( d==-1 ){
oTR = eInsertRow(Tabla);
}
oTR.style.fontStyle = "italic";
for(n=0; n<Tabla.rows[0].cells.length; n++){
oTD = Reutilizar ? oTR.cells[n] : oTR.insertCell();
if( n==0 && Dim[n][0]=="[" ){
oTD.innerHTML = "";
while(Dim[n][0]=="[" ){
x = xIcon = S.mid(Dim[n],"[","]");
xClick = xTitle = "";
if( S.is(",", x) ){
xTmp = (x+",,").split(",");
xIcon = xTmp[0];
xTitle = xTmp[1];
xClick = xTmp[2];
}
switch(xIcon.toUpperCase()){
case 'U':
oTD.innerHTML += '<i class="ICONINPUT ICONUPDATE" onmouseenter=S(this).tip("'+(xTitle||"Modificar")+'",-1) onclick=eSubList("u")>U</i>';
break;
case 'D':
oTD.innerHTML += '<i class="ICONINPUT ICONDELETE" onmouseenter=S(this).tip("'+(xTitle||"Borrar")+'",-1) onclick=eSubList("d")>D</i>';
break;
case 'V':
oTD.innerHTML += '<i class="ICONINPUT ICONVIEW" onmouseenter=S(this).tip("'+(xTitle||"Consultar")+'",-1) onclick=eSubList("v")>V</i>';
break;
case 'F':
if( xClick=="" ) xClick = '",-1) onclick=eSubList("f")';
else xClick = '",-1) onclick='+xClick;
oTD.innerHTML += '<i class="ICONINPUT ICONVIEW" onmouseenter=S(this).tip("'+(xTitle||"Descargar fichero")+xClick+'>F</i>';
break;
default:
}
Dim[n] = S.trim(S.replace(Dim[n], "["+x+"]", ""));
}
}else{
switch(def[n]["td"]){
case '+': case '-':
Dim[n] = S.thousands(Dim[n], 0);
break;
case '+,': case '-,':
Dim[n] = S.thousands(Dim[n], def[n]["dcm"]);
break;
case 'C':
Dim[n] = (Dim[n]==$_ENV['ON']) ? '<i class="ICONINPUT CHECKON">j</i>' : '<i class="ICONINPUT CHECKOFF OFF">i</i>';
break;
}
oTD.innerHTML = Dim[n];
}
}
Tabla.setAttribute("ENVIAR", 1);
Tabla.parentNode.scrollTop = Tabla.offsetHeight;
S(Tabla.parentNode).eventFire("scroll");
if( op==1 ) eSLRecalcColsOp(Tabla);
eSLReorder(Tabla);
_UpdateForm = true;
eClearEvent();
return true;
}
function eSubListRefresh(callSrv, idSubList, condition){
eSLReset(idSubList);
if( S.right(callSrv,4)==".php" ){
top.eCallSrv(window, "edes.php?E:"+callSrv+"&_SUBLIST="+idSubList+"&_FILTERSUBLIST="+JSON.stringify(condition));
}else{
top.eCallSrv(window, callSrv+"="+idSubList+"&_FILTERSUBLIST="+JSON.stringify(condition));
}
}
function eSubListDelete(id, nTR){
var TABLA = DGI('['+id+']'), oDIV = TABLA.parentNode, n;
if( typeof(nTR)=="undefined" ){
S("TR",TABLA).each(function(k,o){
if( o.cells[0].tagName!="TH" && o.id!="PieLista" ) deleteRow(o);
});
}else{
deleteRow(TABLA.rows[nTR]);
}
TABLA.setAttribute("ENVIAR", 1);
oDIV.scrollTop = oDIV.scrollLeft = 0;
S(oDIV).eventFire("scroll");
if( S(TABLA).attr("COLSOP")==1 ) eSLRecalcColsOp(TABLA);
eSLReorder(TABLA);
eClearEvent();
function deleteRow(o){
S(o).attr("LIBRE", 1);
for(var n=0; n<o.cells.length; n++) o.cells[n].innerHTML = "&nbsp;";
}
}
function _FormularioModificaIncr(Obj){
var n,i;
if( Obj==undefined ){
Obj = _WOPENER.DGI(_ChildrenData[0]);
}else{
for(n=0; n<_DimChildrenData.length; n++){
if( _DimChildrenData[n][0]==Obj.id ){
_ChildrenData = new Array();
for(i=0; i<_DimChildrenData[n].length; i++) _ChildrenData[i] = _DimChildrenData[n][i];
break;
}
}
}
var DCampo = _ChildrenData[3].split(','),
OCampo = _ChildrenData[4].split(','),
oTR = Obj.rows[Obj.FILA],
AltoTH = S(Obj).attr("AltoTH")*1,
oTD, d, tmp, NomCol, e, tc, txt;
if( Obj.MODO!='I' ){
for(n=0; n<Obj.rows[AltoTH].cells.length; n++){
oTD = oTR.cells[n];
for(d=0; d<DCampo.length; d++){
OCampo[d] = eTrim(OCampo[d]);
DCampo[d] = eTrim(DCampo[d]);
DCampo[d] = DCampo[d].replace(/&#44;/g,',');
if( DCampo[d].indexOf(')')>-1 ){
tmp = DCampo[d].split(')');
DCampo[d] = eTrim(tmp[tmp.length-1]);
}else if( DCampo[d].indexOf(' ')>-1 ){
tmp = DCampo[d].split(' ');
DCampo[d] = eTrim(tmp[tmp.length-1]);
}
NomCol = S(Obj.rows[AltoTH].cells[n]).attr("CAMPO");
if( NomCol.indexOf(')')>-1 ){
tmp = NomCol.split(')');
NomCol = eTrim(tmp[tmp.length-1]);
}else if( NomCol.indexOf(' ')>-1 ){
tmp = NomCol.split(' ');
NomCol = eTrim(tmp[tmp.length-1]);
}
if( NomCol==DCampo[d] ){
if( OCampo[d]!='IMG' && OCampo[d].substring(0,1)!='*' ){
if( eGO(OCampo[d]).type=="checkbox" ){
ePF(OCampo[d], ((oTD.innerText=="j") ? _CheckBoxSave[0] : _CheckBoxSave[1]));
}else if( eGO(OCampo[d]).type=="radio" ){
ePF(OCampo[d], eTrim(oTD.textContent));
}else{
tc = S(":"+OCampo[d]).attr("tc");
if( /^(\+|\+\,|\-|\-\,|P4|F4|CDI|T)$/.test(tc) ){
S(":"+OCampo[d]).value(oTD.textContent);
}else{
if( eGO(OCampo[d]).tagName=='TEXTAREA' ){
if( S(":"+OCampo[d]).attr("eHTML")!=null ){
ePF(OCampo[d], eTrim(oTD.innerHTML));
}else{
txt = S.replace(eTrim(oTD.innerHTML), "<br>", S.char(10))
txt = S.replace(txt, [["&lt;", "<"], ["&gt;", ">"]]);
ePF(OCampo[d], txt);
}
}else{
var tdValue = eTrim(oTD.textContent);
if( S(':_INPUT_'+OCampo[d]).length==0 ){
ePF(OCampo[d], tdValue);
}else{
if( DGI('_INPUT_'+OCampo[d]).getAttribute('SS')!=null || DGI('_INPUT_'+OCampo[d]).getAttribute('i_SS')!=null ){
_DimRelationFields[_DimRelationFields.length] = 'ePutRelationFields("'+OCampo[d]+'", "'+tdValue+'",1);';
}else{
ePF(OCampo[d], tdValue);
}
}
}
if( S(oTD).attr("NUMFILE") && S(":_FILE_"+OCampo[d]).exists() ){
S(":"+OCampo[d]).attr("NUMFILE", S(oTD).attr("NUMFILE"));
}
}
}
if( Obj.MODO=='D' || Obj.MODO=='V' ){
e = eGO(OCampo[d]);
if( e.type=="checkbox" ){
_eCheck(e.name, 0);
}else if( e.type=="radio" ){
_eRadio(e.name, 0);
}else{
e.readOnly = true;
if( DGI('_INPUT_'+OCampo[d])!=null ) DGI('_INPUT_'+OCampo[d]).readOnly = true;
}
}
}else if( OCampo[d].substring(0,1)=='*' ){
ePF('_INPUT_'+OCampo[d].substring(1), eTrim(oTD.textContent), false);
}
break;
}
}
}
_ExeDimRelationFields();
}
}
function _SortSubList(el, AD){
return;
var Obj = (el==undefined)?S.event(window):el;
if( Obj.tagName!='TH' ) return;
var SubLista = Obj.parentNode.parentNode.parentNode,
oTD = Obj,
col = oTD.cellIndex,
co = oTD.NC*1,
nTH = oTD.parentNode.rowIndex,
tCol = oTD.td,
Obj = SubLista.rows,
aTH = 0,
tRow = Obj.length,
ori,mov,r,p,f,val='';
if( Obj[tRow-1].className=='PieLista' || Obj[tRow-1].cells[col].className ) tRow--;
for(f=0; f<=aTH; f++){
for(r=0; r<Obj[f].cells.length; r++) Obj[f].cells[r].style.textDecoration = '';
}
for(r=aTH+1; r<tRow; r++){
if( Obj[r].getAttribute("LIBRE")!=null ) break;
val = Obj[r].cells[co].textContent;
switch( tCol ){
case '0':
break;
case '+': case '-': case '*':
case '+,': case '-,':
val = S.thousandsClear(val);
break;
case 'P4':
case 'F4':
case 'CDI':
case 'T':
val = S.dataFormat(val, tCol, "d");
break;
default:
val = val.toUpperCase();
}
Obj[r].vSort = val;
}
if( (Obj[nTH].cells[col].getAttribute('ord')==null && AD==undefined) || AD=='A' ){
Obj[nTH].cells[col].style.textDecoration = 'underline';
Obj[nTH].cells[col].ord = 1;
for(r=(aTH+1); r<tRow-1; r++){
if( Obj[r].getAttribute("LIBRE")!=null || Obj[r].id=='PieLista' ) break;
mov = 0;
ori = Obj[r].vSort;
for(p=r+1; p<tRow; p++){
if( Obj(p).getAttribute("LIBRE")!=null || Obj(p).id=='PieLista' ) break;
if( ori>Obj(p).vSort ){
mov = p;
ori = Obj(p).vSort;
}
}
if( mov>0 ) S(Obj[r]).nodeSwap(Obj(mov));
}
}else{
Obj[nTH].cells[col].style.textDecoration = 'overline';
Obj[nTH].cells[col].ord = null;
for(r=tRow-1; r>(aTH+1); r--){
if( Obj[r].getAttribute("LIBRE")!=null || Obj[r].id=='PieLista' ) continue;
mov = 0;
ori = Obj[r].vSort;
for(p=r-1; p>aTH; p--){
if( Obj(p).getAttribute("LIBRE")!=null || Obj(p).id=='PieLista' ) continue;
if( ori>Obj(p).vSort ){
mov = p;
ori = Obj(p).vSort;
}
}
if( mov>0 ) S(Obj[r]).nodeSwap(Obj(mov));
}
}
SubLista.SortCol = co;
}
function eFocusTag(o, oDIV){
if( o.length==undefined ) o = eXY(o);
var CW = document.body.clientWidth,
CH = document.body.clientHeight,
DIV, i, c = new Array(0			, 0				, CW		, o[1]+2	,0			, o[1]+o[3]+4	, CW		, CH-o[3]-4	,0			, o[1]+2		, o[0]+2	, o[3]+2	,o[0]+o[2]+2	, o[1]+2		, CW-o[2]-2	, o[3]+2	);
for(i=0; i<16; i+=4){
DIV = document.createElement('DIV');
DIV.id = '_SubList_'+i;
DIV.className = "OFF";
S(DIV).css({background:"#000000", position:"absolute", zIndex:100, left:px(c[i]), top:px(c[i+1]), width:px(c[i+2]), height:px(c[i+3])});
document.body.appendChild(DIV);
}
}
function eFocusTagRemove(){
for(var i=0; i<16; i+=4) S("#_SubList_"+i).nodeRemove();
}
var _SLSortCapture = null;
function eSLSortCapture(){
var o = S.event(window);
if( /^(I|IMG)$/.test(o.tagName) ) o = o.parentNode;
if( o.tagName!='TD' ) return eClearEvent();
var oTR = S.toTag(o,'TR'), n;
if( oTR.id=="PieLista" || S(oTR).attr("LIBRE")==1 ) return;
if( _SLSortCapture==null ){
_SLSortCapture = oTR;
S(oTR).class("OFF");
}else if( S(oTR).class()=="OFF" ){
S(oTR).class("-OFF");
_SLSortCapture = null;
}else{
var oTABLE = S.toTag(oTR,"TABLE"), Dim=[],
i = _SLSortCapture.rowIndex, d=i, p,
h = oTR.rowIndex;
S(_SLSortCapture).class("-OFF");
S.toTag(oTR,"TABLE").setAttribute("ENVIAR", 1);
S("TR", oTABLE).each(function(k,o){
Dim[o.rowIndex] = o.cloneNode(true);
if( o.cells[0].tagName!="TH" && o.cells[0].children.length ){
for(p=0; p<o.cells[0].children.length; p++){
Dim[o.rowIndex].cells[0].children[p]["eClickBAK"] = o.cells[0].children[p]["eClickBAK"];
}
}
});
if( oTR.rowIndex>_SLSortCapture.rowIndex ){
for(n=d+1; n<=h; n++){
oTABLE.rows[n-1].parentNode.replaceChild(Dim[n], oTABLE.rows[n-1]);
}
}else{
for(n=d-1; n>=h; n--){
oTABLE.rows[n+1].parentNode.replaceChild(Dim[n], oTABLE.rows[n+1]);
}
}
oTABLE.rows[h].parentNode.replaceChild(Dim[i], oTABLE.rows[h]);
_SLSortCapture = null;
S(oTABLE).scroll();
eSLReorder(oTABLE);
}
S.eventClear(window);
}
function eSLReorder(oTABLE){
var i = oTABLE.getAttribute("SortCol"), n=0, td,
manual = oTABLE.getAttribute("SortManual");
if( i==null ) return;
if( manual==null ){
td = S("TH[nc='"+i+"']", oTABLE).attr("td");
if( td==null ) td = "";
else if( td=="F4" ) td = "D";
else if( td=="P4" ) td = "P";
else if( td[0]=="+" || td[0]=="-" || td[0]=="*" ) td = "N";
S(oTABLE).sort(i, td);
}else{
oTABLE.setAttribute("ENVIAR", 1);
S("TBODY TR", oTABLE).each(function(k,o){
if( o.cells[i].tagName=="TD" && o.id!="PieLista" && o.getAttribute("LIBRE")==null ){
o.cells[i].innerText = ++n;
}
});
}
if( oTABLE.eSort==1 ){
S("IMG,I", oTABLE.parentElement).each(function(k,o){
if( !(o.tagName=="I" && o.innerText=="|") ){
o.disabled = true;
S(o).class("+OFF");
}
});
}
}
function eSLSort(oTABLE, SortCol, pDIV){
var o = S.event(window),
oTABLE = S.toTag(o,'TABLE'),
oDIV = oTABLE.parentNode;
if( pDIV!=undefined ){
oDIV = pDIV;
oTABLE = oDIV.children(0);
}
if( S(oTABLE).attr("SortCol")==null || _Mode!='mR' ){
top.eInfoError(window,'La SubLista no tiene ordenación manual');
return false;
}
if( o.Activo==undefined || o.Activo==0 ){
o.Activo = 1;
oTABLE.eSort = 1;
o.className = '';
top.eInfo(window,'Activada la ordenación manual',1);
o.onmouseenter = function(){ S(this).tip("Desactivar la ordenación manual",-2) };
S('TD>i[onclick], TD>img[onclick]', oTABLE).each(function(k,o){
o["eClickBAK"] = o.onclick;
o.onclick = null;
});
}else{
o.Activo = 0;
oTABLE.eSort = 0;
o.className = 'OFF';
oDIV.onmousedown = null;
top.eInfo(window,'Desactivada la ordenación manual',1);
o.onmouseenter = function(){
S(this).tip("Activar la ordenación manual",-2);
};
if( _SLSortCapture!=null ){
S(_SLSortCapture).class("-OFF");
_SLSortCapture = null;
}
if( DGI('SubListSort')==null ){
S("IMG,I", oDIV).each(function(k,o){
if( !(o.tagName=="I" && o.innerText=="|") ){
o.disabled = false;
S(o).class("-OFF");
}
});
oTABLE.oncontextmenu = oTABLE.bakMenu;
oTABLE.rows[0].onclick = oTABLE.rows[0].BakClick;
eFocusTagRemove();
}
S('TD>i[onclick], TD>img[onclick]', oTABLE).each(function(k,o){
o.onclick = o["eClickBAK"];
});
return;
}
var CW = document.body.clientWidth,
CH = document.body.clientHeight,
oxy = eXY(oDIV);
S("IMG,I", oDIV).each(function(k,o){
if( !(o.tagName=="I" && o.innerText=="|") ){
o.disabled = true;
S(o).class("+OFF");
}
});
oTABLE.bakMenu = oTABLE.oncontextmenu;
oTABLE.rows[0].BakClick = oTABLE.rows[0].onclick;
oTABLE.oncontextmenu = oTABLE.rows[0].onclick = function(){return false};
eFocusTag(oxy, oDIV);
oDIV.onmousedown = eSLSortCapture;
oDIV.onselectstart = function(){return false;};
}
function gsSubMenu(txt){
var  o = S.event(window)
,tr = o.parentNode
,tabla = S.toTag(o,"TABLE")
,ops = S(tabla).attr("opSubMenu"), n, menu=[["-"+S.lng(294)]]
,opSubLabel = S(tabla).attr("opSubLabel").split(","), label=[]
;
for(n=0; n<ops.length; n++){
label[ops[n]] = opSubLabel[n];
}
if( S(tabla).class("?col_0n") || o.tagName!="TD" || tr.id=='PieLista' ) return;
if( S.is("I", ops) ) menu.push([label["I"] || S.lng(226), "I", "I"]);
if( S(tr).attr("LIBRE")!=1 ){
if( S.is("U", ops) ) menu.push([label["U"] || S.lng(227), "U", "U"]);
if( S.is("D", ops) ) menu.push([label["D"] || S.lng(228), "D", "D"]);
if( S.is("V", ops) ) menu.push([label["V"] || S.lng(292), "V", "V"]);
if( S.is("V", ops) ) menu.push(["-"]);
if( S.is("V", ops) ) menu.push([S.lng(293), "v", "XLS"]);
}
if( menu.length>1 ){
S(o).menu(menu, {
function:function(op, xtd, trigger, tr, table, arg){
if( op=="XLS" ){
top.eInfo(window, top.eLng(225), 3);
setTimeout(function(){
top.eCallSrvPost("edes.php?E:$dexcel.php", {DATOS:eSLGet(S.mid(arg[1],1,0), 1)});
},1);
S.eventClear(window);
}else{
eSLAction(S.mid(arg[1],"[","]"), S.lower(op), null, arg[0]);
}
},
point: 1
}, [o, txt]);
}
return S.eventClear(window);
}
var _gsMenuON,
_gsSMWin = null;
function gsClickSMenu(Obj, Op){
if( Op==undefined ){
var Op = S.event(window).gsOP;
}
if( S(Obj).attr("gsEXE")=="" ){
Obj.style.display = 'none';
eSLAction(Obj.id.substring(2,Obj.id.length-1), Op, 1);
return;
}
Obj.PADRE = Obj.getAttribute("PADRE");
if( Obj.PADRE==undefined ){
Obj.Indice = Obj.getAttribute("Indice");
if( Obj.Indice ){
Obj.Indice = S.nsp(Obj.Indice);
var o = DGI(Obj.id.substring(1));
if( o.SaltaTR!=undefined ){
o = o.parentNode.parentNode.rows[1];
}
o = o.rows[o.FILA];
var dato = Obj.Indice.split(',');
var tmp  = dato[0].split('=');
Obj.PADRE = S.trim(tmp[0]+'='+o.cells[tmp[1]].textContent);
var tmp = dato[1].split('=');
Obj.SEEK  = S.trim(tmp[0]+'='+o.cells[tmp[1]].textContent);
}
}
var sPadre = Obj.PADRE,
Titulo = S(DGI(Obj.id.substring(1))).attr("WTITLE");
if( S.trim(Titulo)=='' ){
Titulo = '...';
}
if( Op=='Fa' && S(Obj).attr("FS")=="false" ){
if( _Accion=='A' ){
sPadre = 'conexion='+_Connection_;
}else{
var txt = Obj.id.replace('m[','['),
tmp = sPadre.split('=');
sPadre = tmp[0]+'='+DGI(txt).PADRE;
}
}
Obj.style.display = 'none';
var x = y = undefined,
oSL = DGI(Obj.id.substring(1));
if( !isNaN(S(oSL).attr("CX")) ) x = S(oSL).attr("CX")*1;
if( !isNaN(S(oSL).attr("CY")) ) y = S(oSL).attr("CY")*1;
if( S(Obj).attr("FS")=="true" ){
var Orden = 'edes.php?Fa:'+ S(Obj).attr("gsEXE")+"&_ModeCurrent="+S.mid(Op,1,0),
sOp = Op;
if( sOp.substring(0,1)=='F' ){
sOp = sOp.substring(1,2);
}
DGI(Obj.id.substring(1)).MODO = sOp;
_gsSMWin = top.eSWSetIcon(DGI(Obj.id.substring(1)), window, Orden, Titulo, true, undefined, undefined, x,y);
}else{
var Orden = 'edes.php?'+ Op+':'+ S(Obj).attr("gsEXE") + '&_ASSIGN=a&'+sPadre + '&_SEEK&'+escape(Obj.SEEK);
_gsSMWin = top.eSWOpen(window, Orden, Titulo, undefined, undefined, undefined, x,y);
}
Obj.WINDOW = _gsSMWin;
}
function gsResetLista(xObj){
xObj = '['+xObj+']';
var p = DGI('c'+xObj).scrollTop,
sTit = DGI(xObj).WTITLE;
DGI(xObj).outerHTML = _gsSMWin.DGI('_Copia').innerHTML;
DGI(xObj).WTITLE = sTit;
DGI('c'+xObj).scrollTop = p;
THScroll(xObj);
}
function _SubListPrecalculo(nmFile, alto, ancho, conTitle){
if( conTitle ){
setTimeout(function(){
DGI(nmFile).rows[0].cells[0].style.display = 'table-block';
}, 1);
}
if( alto!="" ){
setTimeout(function(){
var o = DGI("c"+nmFile);
o.style.height = AltoNFilas(o.id.slice(1), o.getAttribute("nf"))+"px";
}, 100);
}
if( ancho!="" ){
DGI("c"+nmFile).style.width = "10000px";
DGI(nmFile).style.width = DGI(nmFile).offsetWidth+"px";
DGI("c"+nmFile).style.overflowX = "auto";
DGI("c"+nmFile).style.width = px(ancho);
}
}