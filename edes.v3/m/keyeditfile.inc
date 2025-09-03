<?PHP
global $Opcion, $OriFichero, $FicheroD;
if( SESS::$_D_=='' ) return;
echo "<META NAME=eDes gsScript='F:".((SESS::$_D_=="")?"":$fch)."' gsOp='{$Opcion}'>";
if( eSubstrCount($fch, "../_tmp/php/")==1 ){
$FicheroD = "";
if( mb_substr($_SERVER["QUERY_STRING"],0,9)==":CallSrv=" ){
list($FicheroD) = explode("&", mb_substr($_SERVER["QUERY_STRING"],9));
}
}else{
if( eSubstrCount($fch, "../_tmp/lcl/")==1 ){
$fch = mb_substr($fch, 2);
}else if( mb_substr($fch,0,2)==".." ){
$fch = mb_substr($fch,2);
}
if( eSubstrCount($FicheroD, "/../edes.v3/")==1 ){
$FicheroD = '$'.mb_substr($FicheroD, 14);
}else if( mb_substr($FicheroD,0,2)==".." ){
$FicheroD = mb_substr($FicheroD, 2);
}
}
if( eSubstrCount($_SERVER["QUERY_STRING"], ":CallSrv=")==1 || eSubstrCount($_SERVER["QUERY_STRING"], "&_CALL=1&")==1 ){
$verIFrame = true;
}
$txt = str_replace("\\","/",ob_get_contents());
$buscar = $fch." on line ";
$linea = "";
if( eSubstrCount($txt, $buscar)>0 ){
$p = mb_strpos($txt, $buscar)+mb_strlen($buscar);
$num = "";
for($n=$p; $n<mb_strlen($txt); $n++){
$c = mb_substr($txt, $n, 1);
if( is_numeric($c) ){
$num.=$c;
}else{
break;
}
}
if( $num!="" ) $linea = ",".($num-1);
}
eExplodeLast($FicheroD, "/", $no, $uDF);
?>
<SCRIPT type="text/javascript" name=eDes>
document.title = "ERROR";
top.S.init(window,"all");
</SCRIPT>
<SCRIPT type="text/javascript">
S(window).rule("*{font-family:monospace;}","all");
S(window).rule("+BODY{background-color:#ffd7d7;margin:0px;}","all");
<?PHP if( $verIFrame ){ ?>
if( window.frameElement.name=="TLF" ){
window.frameElement.parentElement.style.display = "block";
window.frameElement.parentElement.style.visibility = "visible";
window.document.write("callSrv");
if( window.frameElement.WOPENER ) window.frameElement.WOPENER.document.body.style.visibility = "visible";
}
<?PHP } ?>
function eClearEvent(){
return top.S.eventClear(window);
}
function EditTmp(tmp){
if( top.gsEdit ) top.gsEdit(window, tmp);
return eClearEvent();
}
function VerIco(){
if( (event.ctrlKey || event.altKey) && top.gsEdit ){
<?PHP if( "/d/{$OriFichero}"==$FicheroD ){ ?>
top.gsEdit(window);
<?PHP }else if( trim($OriFichero)=="" ){ ?>
top.gsEdit(window,'<?=$FicheroD?>');
<?PHP }else{ ?>
if( _WOPENER.document.title[0]==">" ){
top.S(document.body).menu([
["-MENU"],
["<?=$OriFichero?>"	, "", "top.opener.gsEdit(window,'<?=$fch?>'<?=$linea?>)"],
["<?=$uDF?>"		, "", "top.opener.gsEdit(window,'<?=$FicheroD?>')"]
], {trigger:false});
}else{
top.S(document.body).menu([
["-MENU"],
["<?=$OriFichero?>"	, "", "top.gsEdit(window,'<?=$fch?>'<?=$linea?>)"],
["<?=$uDF?>"		, "", "top.gsEdit(window,'<?=$FicheroD?>')"]
], {trigger:false});
}
<?PHP } ?>
return eClearEvent();
}
<?PHP
global $_gsCreate_;
if( SESS::$_D_!='' && SESS::$_D_!='D' && !$_gsCreate_ ){
echo 'return true;';
}else{
echo 'return eClearEvent();';
}
?>
}
<?PHP
if( eSubstrCount($_SERVER["QUERY_STRING"], '&_ISUBLIST&')>0 ){
?>
if( window.frameElement.offsetWidth<500 ) window.frameElement.style.width = "500px";
if( window.frameElement.offsetHeight<150 ) window.frameElement.style.height = "150px";
top.S("body", window.frameElement.WOPENER).visible();
<?PHP
}
?>
document.oncontextmenu = VerIco;
document.ondblclick = function anonymous(){ location.href = location.href; }
top.eLoading(false, window);
if(top.eIsWindow(window)) top.eSWView(window);
</SCRIPT>
<?PHP
?>