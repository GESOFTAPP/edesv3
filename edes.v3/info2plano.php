<!DOCTYPE HTML><HTML><HEAD><META HTTP-EQUIV='Content-Type' CONTENT='text/html; charset=UTF-8'>
<STYLE type='text/css'></STYLE>
<SCRIPT type='text/javascript' charset='UTF-8'>
top.S.init(window);
</SCRIPT>
</HEAD><BODY>
<?PHP
SESS::$var["streamer"] = '$run2plano.php';
?>
<button onclick="streamerClient(window,'close')">Stop info background</button>
<SCRIPT type='text/javascript' charset='UTF-8'>
S.loadJS(window, "$js/streamerClient", function(){
streamerClient(window, functionMessage, []);
S("body").visible();
});
console.clear();
function functionMessage(data){
S.infoBackground(0, data["total"]);
if( data["sound"] ){
S.sound();
}
console.log(data);
}
function functionWarnnig(data){
}
function functionError(data){
}
</SCRIPT>
</BODY></HTML>