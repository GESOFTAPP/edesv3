<?PHP //[_PROTECCION_]
include_once( $Dir_.$_Sql.'.inc' );
if( qCount("{$_ENV['eDesDictionary']}gs_conexion", "id='{$_GET['_SESS_']}'")==0 ){
$Recargar = false;
}else{
$Recargar = true;
qSelect("{$_ENV['eDesDictionary']}gs_conexion", '*', "id='{$_GET['_SESS_']}'");
$row = qArray();
$cdi = str_replace(':','-',str_replace(' ','-',$row['cdi']));
list( $an,$me,$di, $ho,$mi,$se ) = explode('-',$cdi);
$HastaCDI = date( 'Y-m-d H:i:s', mktime( $ho, $mi, $se,  $me, $di+1, $an ) );
$OK = ( $HastaCDI > $row['cdi'] );
if( !$OK && $_SERVER['QUERY_STRING']!='E:$estadistica.gs&F=1' ){
$Recargar = false;
}else{
$_User = SESS::$_User;
$_Node = SESS::$_Node;
$_Connection_ = SESS::$_Connection_;
$_Tree = SESS::$_Tree;
if( qCount("{$_ENV['eDesDictionary']}gs_user", "cd_gs_user='{$_User}'" ) == 0 ) $Recargar = false;
}
}
if( !$Recargar ){
if( $_Accion[0]!='U' ){
echo '<SCRIPT type="text/javascript">';
if( $_SERVER['HTTP_REFERER']!='' ){
echo 'top.eLoading(false,window);';
if( $_SERVER['QUERY_STRING']!='U' ){
if( $_SERVER['QUERY_STRING']=='E:$estadistica.gs&F=1' ){
echo 'top.Terminar();';
}else{
?>
top.S.info("¡¡¡ &nbsp; LA PAGINA HA CADUCADO &nbsp; !!!<br><br>&nbsp; &nbsp; LA APLICACION SE CERRARA", 5);
setTimeout(function(){
top.document.body.style.padding = "20px";
top.document.body.innerHTML = "Aplicación cerrada<br><br><a c=2 href='"+top.location.href+"'>login</a>";
}, 5000);
<?PHP
}
}else{
?>
try{
top.S.info("¡¡¡ &nbsp; ERRORES DE SESION &nbsp; !!!<br><br>&nbsp; &nbsp; LA APLICACION SE CERRARA", 5);
setTimeout(function(){
top.document.body.style.padding = "20px";
top.document.body.innerHTML = "Aplicación cerrada<br><br><a c=3 href='"+top.location.href+"'>login</a>";
}, 5000);
}catch(e){}
try{
top.document.body.style.padding = "20px";
top.document.write("Aplicación cerrada<br><br><a c=4 href='"+top.location.href+"'>login</a>");
}catch(e){}
try{
window.opener=null;
window.close();
}catch(e){}
<?PHP
}
}else{
?>
try{
top.S.info("¡¡¡ &nbsp; LA PAGINA HA CADUCADO &nbsp; !!!<br><br>&nbsp; &nbsp; LA APLICACION SE CERRARA", 5);
setTimeout(function(){
top.document.body.style.padding = "20px";
top.document.body.innerHTML = "Aplicación cerrada<br><br><a c=5 href='"+top.location.href+"'>login</a>";
}, 5000);
}catch(e){}
try{
top.document.body.style.padding = "20px";
top.document.write("Aplicación cerrada<br><br><a c=6 href='"+top.location.href+"'>login</a>");
}catch(e){}
try{
window.opener=null;
window.close();
}catch(e){}
<?PHP
}
echo '</SCRIPT>';
eEnd();
}
}
?>