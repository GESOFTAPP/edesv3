<?PHP
if( S::$_User==-1 || $_gsID != getmypid() ) exit;
if( $_SERVER['REQUEST_METHOD']=='GET' ){
$File = stripcslashes($_GET['DELETE']);
$File = str_replace( '\\', '/', $File );
$tmp = explode( '/', $File );
$File = '../_datos/usr/'.$tmp[count($tmp)-1];
eTrace( 'Delete: '.$File );
@unlink( $File );
eEnd();
}
$txt = stripcslashes($_POST['HTML']);
$Tabla = stripcslashes($_POST['TABLA']);
$Action = '';
$Sufijo = stripcslashes($_POST['SUFIJO']);
$DelDir = stripcslashes($_POST['DELDIR']);
$Tabla = str_replace( $DelDir, '', $Tabla );
if( $Action!='' ){
$n = mb_strrpos($txt,'</BODY></HTML>');
$txt = mb_substr($txt,0,$n).'<script type="text/javascript">var _Action="'.$Action.'"</SCRIPT></BODY></HTML>';
}
file_put_contents( '../_datos/usr/'.$_User.$Sufijo.'.lf', $Tabla );
if( $txt!='' ){
$txt = str_replace('{&#92#&}','\\',$txt);
if( $_POST['SubListENVIAR']!='' ){
$p = mb_strripos( $txt, '</BODY>' );
if( $p===false ){
}else{
$txt = mb_substr($txt,0,$p).'<script type="text/javascript">'.$_POST['SubListENVIAR'].'</script>'.mb_substr($txt,$p);
}
}
file_put_contents( '../_datos/usr/'.$_POST['ID'].'.htm', $txt );
}
eTrace('Ok');
?>
<SCRIPT type="text/javascript">
setTimeout('top.eInfoHide();',500);
</SCRIPT>
<?PHP
eEnd();
?>