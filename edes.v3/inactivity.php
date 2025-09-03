<?PHP
if( $_SERVER['REQUEST_METHOD']==='POST' ){
$login = $_POST["login"];
$pass  = $_POST["pass"];
$sql   = "select login from gs_user where ((login='{$login}')) and ((pass='{$pass}'))";
qQuery($sql);
$r = qRow();
if( trim($r[0])==$login ){
eJS("top.S('#ALERT').nodeRemove();");
}else{
eJS("top.document.write(top.S.lng(267));");
}
eEnd();
}
eHTML();
echo "<script>";
echo file_get_contents(DIREDES."_e.js");
?>
var tapa = top.S.alert({
title: 343
,icon:  "[&#103;]"
,button:"A,C"
,form: [
[top.S.lng(344)+'| login |# |T |50 |  | U |   | #']
,[top.S.lng(345)+'| pass  |# |P |50 |  | U |   | #']
]
,noDelete: true
,attribute: "e-inactivity"
,function:function(op, fields, parametro){
if( op==-1 ){
top.document.write(top.S.lng(267));
return;
}
top.S.call("edes.php?E:$inactivity.php", {
login: fields.login
,pass:  _e_(fields.login+_e_(fields.pass))
});
}
});
</script>
</HEAD>
<BODY></BODY>
</HTML>