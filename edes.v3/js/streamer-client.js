function streamerClient(win, functionMessage, channel){
if( typeof(win["_streamerClient"])=="undefined" ){
win["_streamerClient"] = null;
}
if( functionMessage=="close" ){
if( !win._streamerClient ) return;
win._streamerClient.close();
console.log("Connection closed by user");
win["_streamerClientIsOpen"] = false;
delete(win._streamerClient);
return;
}
if( !!window.EventSource ){
win._streamerClient = new EventSource(S.urlAdd('E:$eventsource.php&_INSTANCE='+S.date("u")+'&_SOURCE='+S.mid(win.location.search, ":", "&")));
}else{
console.log("service not supported");
return;
}
win._streamerClient.addEventListener('message', function(e){
if( e.origin!=location.origin ){
console.log("unknown origin "+e.origin);
return;
}
if( e.data=="close" ){
console.log("Connection closed by server");
win._streamerClient.close();
return;
}
if( e.data=="ok" ){
console.log("ok");
return;
}
var data = (e.data[0]=="{") ? JSON.parse(e.data) : e.data;
win.functionMessage(data);
}, false);
for(let i in channel){
win._streamerClient.addEventListener(channel[i].channel, function(e){
if( e.origin!=location.origin ){
console.log("unknown origin "+e.origin);
return;
}
if( e.data=="close" ){
console.log("Connection closed by server");
win._streamerClient.close();
return;
}
var data = (e.data[0]=="{") ? JSON.parse(e.data) : e.data;
win.channel[i].function(data);
}, false);
}
win._streamerClient.addEventListener('open', function(e){
win["_streamerClientIsOpen"] = true;
console.log("Reconnect");
}, false);
win._streamerClient.addEventListener('error', function(e){
if( !win["_streamerClientIsOpen"] && win._streamerClient.readyState==EventSource.CONNECTING ){
console.log('Server down');
}else if(win._streamerClient.readyState==EventSource.CLOSED ){
console.log('Server error');                                        // console.log("Connection closed");
}
win["_streamerClientIsOpen"] = false;
}, false);
}