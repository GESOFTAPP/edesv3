var queue = {
data: []
,count: 0
,priority: false
,push: function(item){
this.data.push(item);
this.count++;
}
,pop: function(){
if( this.count==0 ) return null;
for(let i=0; i<this.count; i++){
this.shift();
}
return this.shift();
}
,shift: function(){
if( this.count==0 ) return null;
this.count--;
if( !queue.priority ){
return this.data.shift();
}
var  priority = this.data[0].priority
,dataIndex = 0;
this.data.forEach(function(item, index){
if( item.priority < priority ){
priority = item.priority;
dataIndex = index;
}
});
return this.data.splice(dataIndex, 1)[0];
}
,empty: function(){
this.count = 0;
return this.data = [];
}
,size: function(){
return this.count;
}
,print: function(){
if( this.count==0 ){
console.log("queue is empty");
return;
}
this.data.map(function(item){
if( queue.priority ){
for(let i in item){
console.log(i+" = "+item[i]);
}
}else{
console.log(item);
}
});
}
}