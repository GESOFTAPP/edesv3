<?PHP
$_ENV[SYS]['checkSession'] = false;
$appCode = '';
if( SESS::$_APPCODE!="" ) $appCode = "_".SESS::$_APPCODE;
$file = '../_datos/usr/'.S::$_User.$appCode.'.dft';
if( file_exists($file) && $_POST["DATOS"]=="LOAD" ){
$txt = file_get_contents($file);
?>
<script type="text/javascript">
var comilla = String.fromCharCode(39),
nl = String.fromCharCode(10),
enter = String.fromCharCode(13),
dim = '<?=$txt?>'.split("~"),
t = dim.length,
n, x;
for(n=1; n<t; n++) if( dim[n]!="" ){
x = top.S.split("=", dim[n]);
top._FIELDS[x[0]] = x[1]
.replace(/&#39;/g, "'")
.replace(/&#34;/g, '"')
.replace(/&#96;/g, "`")
.replace(/&#10;/g, nl)
.replace(/&#13;/g, enter)
.replace(/&#60;/g, "<")
.replace(/&#62;/g, ">")
.replace(/&#92;/g, "\\")
;
}
</script>
<?PHP
}else if( isset($_POST["DATOS"]) ){
if( $_POST["DATOS"]=="~" || $_POST["DATOS"]=="" || $_POST["DATOS"]=="~="){
@unlink($file);
}else{
file_put_contents($file, $_POST["DATOS"]);
}
}
?>