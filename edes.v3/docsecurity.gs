<?PHP
if( S::$_User==-1 || $_gsID != getmypid() ) exit;
eLngLoad(DIREDES.'lng/varios');
if( eSqlType('oracle', 'pdo.informix') ){
$Hoy = date('d-m-Y');
}else{
$Hoy = date('Y-m-d');
}
if( $_SERVER["REQUEST_METHOD"]=="POST" ){
if( ($_POST["acepto"]==$_ENV['ON'] || $_POST["acepto"]=='on') && $_DF=='$docsecurity.gs' ){
if( $_User>0 ){
sql_Modifica("{$_ENV['eDesDictionary']}gs_user", "confidential='{$_ENV['ON']}', dt_confidential='{$Hoy}'", "cd_gs_user={$_User}");
?>
<script type="text/javascript">
top.S.alert({
title: 209
,text: '<?=eLng('CONFIRMACION GRABADA CORRECTAMENTE')?>'
,button: 'A'
,icon: 'I'
,function: function(yn){
if(yn!=2) return;
top.S.windowDestroy(window);
}
});
</script>
<?PHP
}
}
eEnd();
}
eInclude( $_Sql, 'message' );
if( eSqlType('informix') ){
$NPersonas = qCount("{$_ENV['eDesDictionary']}gs_user", "tf_confidential='{$_ENV['ON']}' and permission='S' and dt_add<=current and (dt_del>current or dt_del is null)" );
}else{
$NPersonas = qCount("{$_ENV['eDesDictionary']}gs_user", "tf_confidential='{$_ENV['ON']}' and permission='S' and dt_add<=now()   and (dt_del>now()   or dt_del is null or dt_del='0000-00-00')" );
}
$File = '';
if( file_exists( '../_datos/config/docsecurity_'.SESS::$_LANGUAGE_.'.pdf' ) ){
$File = '../_datos/config/docsecurity_'.SESS::$_LANGUAGE_.'.pdf';
}else if( file_exists( '../_datos/config/docsecurity.pdf' ) ){
$File = '../_datos/config/docsecurity.pdf';
}
if( $File=='' ){
if( $_GET['TEST']!=1 && $NPersonas==0 ){
eInclude('message');
eMessage(eLng('FALTA DEFINIR EL RESPONSABLE DE SEGURIDAD'), 'HES', 10000, 'S.exit()');
eEnd();
}
}
$NmResponsable = '';
if( eSqlType('informix') ){
qQuery( "select user_name,user_surname,cd_gs_user,dt_del,cd_gs_position from {$_ENV['eDesDictionary']}gs_user where tf_confidential='{$_ENV['ON']}' and permission='S' and dt_add<=current and (dt_del>current or dt_del is null) order by dt_add desc" );
}else{
qQuery( "select user_name,user_surname,cd_gs_user,dt_del,cd_gs_position from {$_ENV['eDesDictionary']}gs_user where tf_confidential='{$_ENV['ON']}' and permission='S' and dt_add<=now()   and (dt_del>now()   or dt_del is null or dt_del='0000-00-00') order by dt_add desc" );
}
while( $row=qArray() ){
if( !isZero($row['dt_del']) && $row['dt_del']<date('Y-m-d') ){
}else{
$NmResponsable = trim($row['user_name']).' '.trim($row['user_surname']);
break;
}
}
if( $File=='' ){
if( $_GET['TEST']<>1 && trim($NmResponsable)=='' ){
eInclude('message');
eMessage(eLng('FALTA DEFINIR EL RESPONSABLE DE SEGURIDAD'), 'HES', 10000, 'S.exit()');
exit;
}
}
qQuery("select nm_gs_position from {$_ENV['eDesDictionary']}gs_position where cd_gs_position='{$row['cd_gs_position']}'");
$row2 = qArray();
$NmDepartamento = trim($row2['nm_gs_position']);
qFree();
$FileSignature = $row['cd_gs_user'];
$FileSignature = 'signature_'.$FileSignature;
$TiteCdUsuUar  = '';
$fileOk = "";
foreach(glob("../_datos/config/{$FileSignature}.*") as $nameFile){
if( preg_match('/(png|jpg|jpeg|gif)$/u', $nameFile) ){
$FileSignature = $nameFile;
$fileOk = $nameFile;
break;
}
}
if( empty($fileOk) ){
$FileSignature = '../_datos/config/signature_empty.gif';
$TiteCdUsuUar = "/_datos/config/signature_[cd_gs_user]\n\t.gif / .png / .jpg";
}
?>
<!doctype html>
<HTML><HEAD>
<TITLE> Documento de Seguridad </TITLE>
<META HTTP-EQUIV='imagetoolbar' CONTENT='no'>
<?= eLink('docsecurity') ?>
<SCRIPT type="text/javascript">
top.S.init(window, "desktop");
</SCRIPT>
</HEAD>
<BODY onhelp="return false" oncontextmenu="return false" onselectstart='return false' ondragstart='return false'>
<TABLE border=0px width=100% height=100% cellspacing=0px cellpadding=0px>
<TR height=100%>
<TD colspan=2 align=center id="DOCHTML">
<?PHP
if( $File!='' ){
?>
<style>
BODY {
margin:0px;
padding:0px;
scroll:no;
overflow:no;
}
</style>
<?PHP
if( mb_substr($File,0,2)==".." ) $File = mb_substr($File,2);
?>
<object id="VisorPDF" type="application/pdf" data="edes.php?R:<?=$File?>" width="100%" height="100%">
<param name="view" value="FitH" />
<param name="src" value="edes.php?R:<?=$File?>" />
<p style="text-align:center; width:100%;">
Adobe Reader no se encuentra o la versión no es compatible.<br>
<a href="http://get.adobe.com/es/reader/" onclick="this.target='_blank'">Descargar Adobe Reader</a>
</p>
</p>
</object>
<?PHP
}else{
if( !file_exists( '../_datos/config/docsecurity_'.SESS::$_LANGUAGE_.'.htm' ) ){
copy( '../_datos/config/docsecurity_es.htm', '../_datos/config/docsecurity_'.SESS::$_LANGUAGE_.'.htm' );
}
$txt = file_get_contents( '../_datos/config/docsecurity_'.SESS::$_LANGUAGE_.'.htm' );
$txt = mb_substr( $txt, mb_strpos(mb_strtoupper($txt),'<BODY') );
$txt = mb_substr( $txt, mb_strpos($txt,'>')+1 );
$txt = mb_substr( $txt, 0, mb_strpos(mb_strtoupper($txt),'</BODY>') );
$txt = str_replace('{DigitalSignature}', '<IMG src="'.eImg64('/_datos/config/docsecurity.png').'">', $txt);
$fileOk = "";
foreach(glob("g/logo.*") as $nameFile){
if( preg_match('/(png|jpg|jpeg|gif)$/u', $nameFile) ){
$fileOk = $nameFile;
break;
}
}
$txt = str_replace('{LOGO}', $fileOk, $txt);
echo $txt;
echo '<BR><BR><BR>';
}
?>
</TD></TR>
<TR height="1px" id="BOTONES">
<TD rowspan=2 width=100% align="center">
<FORM accept-charset="utf-8" METHOD="POST">
<span onclick="AceptaOnOff()" style="cursor:var(--cPointer)"><?=eLng('LEIDO Y ACEPTADO')?></span> <INPUT TYPE="checkbox" NAME="acepto" ID="acepto" style="cursor:point">
<BR><BR>
<button title='<?=eLng('Aceptar las cláusulas')?>' onclick='<?= (($_GET['TEST']==1)?'':'Acepto()') ?>'><?=eLng('ACEPTAR')?></button>
<?PHP if( $File=="" ){ ?>
<button title='<?=eLng('Imprimir documento')?>' onclick='<?= (($_GET['TEST']==1)?'':'Imprimir()') ?>' style='margin-left:15px'><?=eLng('IMPRIMIR')?></button>
<?PHP } ?>
</FORM>
</TD>
<TD align="center" style="padding-right:10px">
<?PHP
if( $File=='' ){
echo "<IMG SRC='".eImg64($FileSignature)."' title='{$TiteCdUsuUar}' style='height:100px'>";
}
?>
</TD>
</TR>
<TR>
<TD align="right" nowrap style="padding-right:10px">
<?PHP if( $File=='' ){ ?>
<?=eLng('Fdo')?>.: <?= $NmResponsable ?><BR><?=eLng('Responsable')?>: <?= $NmDepartamento ?>
<?PHP } ?>
</TD>
</TR>
</TABLE>
<SCRIPT type="text/javascript">
<?PHP if( $File<>"" ){ ?>
top.eSWTools(window, "H", "print");
<?PHP } ?>
S("body").css("overflow:auto");
function AceptaOnOff(){
S("#acepto").obj.checked = !S("#acepto").obj.checked;
}
function Acepto(){
if( !S("#acepto").obj.checked ){
S.alert( {
title: S.lng(209),
text: '<?=eLng('No se puede entrar sin aceptar el documento')?>',
button: 'A',
icon: 'I'
});
return S.eventClear();
}
S("#acepto").val(S.setup.checkOn);
document.forms[0].submit();
return true;
}
function Imprimir(){
window.print();
}
</SCRIPT>
</BODY>
</HTML>