top.S["tabToClipboar"] = function(win){
var  dim=[], leng=0, item, clipboard=[], value, label, nameField
,lastField="#", oLastFiel=null, lastLabel="";
S(".READONLY, .EDITABLE, INPUT[multiplevalues], INPUT[type='radio'], INPUT[type='range']", win).each(function(k, o){
if( !/^(?:INPUT|TEXTAREA)$/i.test(o.tagName) || (o.type=="hidden" && o.getAttribute("multiplevalues")==null) ){
return;
}
nameField = o.name;
if( o.form.name=="GETCONDITION" ){
return;
}
if( o.getAttribute("smultiple")=="1" ) return;
if( lastLabel!="" && oLastFiel.type=="radio" && lastField!=nameField && S.last(dim)[0]!=lastLabel ){
dim.push([lastLabel, ""]);
}
oLastFiel = o;
lastField = nameField;
value = S.trim(o.value);
label = S.fieldLabel(o);
if( S.left(nameField,7)=="_INPUT_" ){
let nameReal = S.mid(nameField, 7, 0);
if( lastField==nameReal ){
return;
}
label = S.fieldLabel(S(":"+nameReal, win).obj);
if( value.indexOf("||")>0 ){
value = valueMultiple(S(":"+nameReal, win).obj, value);
}
}
label = S.replace(S.clearTags(label), "&nbsp;", "");    // console.log(o.tagName+" - "+label+" - "+ S.trim(o.value));
if( S(":_INPUT_"+o.name, win).length ){
value = S.replace(S(":_INPUT_"+o.name, win).val(), " + ", ", ");
}
if( o.type=="radio" ){
lastLabel = label;
if( !o.checked ){
return;
}
value = S.clearTags(S.radioLabel(o));
}else if( o.type=="checkbox" ){
if( S.left(value,2)=="<>" ){
value = "<>"+S.lng(214);
}else{
value = S.lng(S.setup.checkOn==value ? 214 : 215);
}
}else if( o.getAttribute("multiplevalues")!=null ){
value = valueMultiple(o, value);
}
dim.push([label, value]);
lastLabel = "";
});
for(item of dim){
leng = Math.max(item[0].length, leng);
}
for(item of dim){
label = S.padR(item[0], leng, ".")+": "+item[1];
clipboard.push(label);
}
S.clipboardPut(clipboard.join("\n"));
S.info(366, 3);
function valueMultiple(o, value){
let dimVal = S.replace(value, "||", ",").split(","), dimLabel=[], ret, val;
for(val of dimVal){
if( val=="" ) continue;
ret = S.selectValue(o, val);
if( ret.length>=2 )	dimLabel.push(ret[1]);
}
return dimLabel.join(", ");
}
}