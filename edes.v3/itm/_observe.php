<?php
global $_DEBUG_OBSERVE;
?>
function _observe(inputBox){
inputBox.addEventListener("input", function(){
console.log("UI: %s = '%s'", (this.name||this.id), this.value);
});
observeElement(inputBox, "value", function(oldValue, newValue){
if( oldValue==newValue ) return;
console.log("API: %s = '%s' -> '%s'", (this.name||this.id), oldValue, newValue);
debugger;
});
function observeElement(element, property, callback, delay=0){
let elementPrototype = Object.getPrototypeOf(element);
if( elementPrototype.hasOwnProperty(property) ){
let descriptor = Object.getOwnPropertyDescriptor(elementPrototype, property);
Object.defineProperty(element, property, {
get: function(){
return descriptor.get.apply(this, arguments);
},
set: function (){
let oldValue = this[property];
descriptor.set.apply(this, arguments);
let newValue = this[property];
if( typeof callback=="function" ){
setTimeout(callback.bind(this, oldValue, newValue), delay);
}
return newValue;
}
});
}
}
}
var observer = new MutationObserver(function(mutations) {
mutations.forEach(function(data) {
console.log((data.target.name || data.target.id)+": "+ data.type+"."+data.attributeName+' = '+data.oldValue);
debugger;
});
});
<?PHP
for($n=0; $n<count($_DEBUG_OBSERVE); $n++){
if( empty($_DEBUG_OBSERVE[$n][1]) ){
?>
_observe(S('<?=$_DEBUG_OBSERVE[$n][0]?>').obj);
<?PHP
}else{
?>
observer.observe(S('<?=$_DEBUG_OBSERVE[$n][0]?>').obj, {
attributes : true,
childList: false,
attributeOldValue: true,
characterData : true,
characterDataOldValue : true,
attributeFilter : ['<?=str_replace(",", "','", $_DEBUG_OBSERVE[$n][1])?>']
});
<?PHP
}
}
?>