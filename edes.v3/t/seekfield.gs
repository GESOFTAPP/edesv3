<?PHP
set_time_limit(0);
eHTML('','','SeekField');
echo '<SCRIPT type="text/javascript">';
echo '</SCRIPT></HEAD><BODY style="margin: 0px 0px 0px 5px" onload="document.body.scrollTop=\''.($TOP*1).'px\';';
echo '">';
?>
<div id="CONTENIDO" style="overflow:scroll">
<table eSeek="SEEK<?=$_GET["tab"]?>" id="SCRIPT<?=$_GET["tab"]?>" border="0px" cellspacing="0px" cellpadding="0px" style="border-spacing:0px; width:100%; height:100%; display:table;">
<tbody>
<tr class="SCRIPT" style="height:1px">
<td style="width:1px; padding:5px 10px 5px 10px;width:1px;border-right:1px solid #ffffff"><?=$_GET["tab"]+1?></td>
<td style="width:100%; padding-left:10px;">Result seek field: <?=$_GET["SeekField"]?></td>
<td style="width:1px" align="center" valign="middle" onclick="cerrarScript()"><i class="ICONWINDOW" style="color:#ffffff">5</i></td>
</td>
</tr><tr style="height:100%">
<td colspan=3 style="width:100%;margin:0px;padding:0px; o-verflow:auto; f-loat:left; padding:0px; display:table-cell;">
<form accept-charset="utf-8" name="FRM<?=$_GET["tab"]?>" target="TLF" method="post" action="" style="overflow:auto; float:left; width:100%;height:100%;d-isplay:flex;">
<input type="hidden" name="script" value="">
<input type="hidden" name="md5" value="">
<input type="hidden" name="update" value="">
<input type="hidden" name="status" value="0,0,8,12|">
<div id=fuente onclick=editarFuente(this) oncontextmenu=marcaBusqueda(this) style="width:100%">
<?PHP
$buscar = $_GET["SeekField"];
if( $buscar[0]=="=" ){
$buscar = mb_substr($buscar,1);
$sensible = "";
}else{
$sensible = "i";
}
$_xBuscar = '/('.str_replace(
array( "[", "]", "(", ")", "<", ">", "{", "}", ".", ",", ":", "-", "!", "+", "*", "^",   " ", '$'),
array("\[","\]","\(","\)","\<","\>","\{","\}","\.","\,","\:","\-","\!","\+","\*","\^", "\\s",'\$'),
$buscar
).')/'.$sensible;
$_ToatlFicheros = 0;
$_TotalDeOcurrecias = 0;
$_TotalMarcas = 1;
$_DirectoriesToSkip = eFileGetVar('/_d_/cfg/edes.ini->$_DirectoriesToSkip');
if( isset($_DirectoriesToSkip) && gettype($_DirectoriesToSkip)=="array" ){
for($n=0; $n<count($_DirectoriesToSkip); $n++){
if( mb_substr($_DirectoriesToSkip[$n],-1)!="/" ) $_DirectoriesToSkip[$n] .= "/";
$_DirectoriesToSkip[$n] = "..".$_DirectoriesToSkip[$n];
}
}
SeekField("..", "|".mb_strtoupper($_GET["SeekField"])."|");
?>
</div>
</form>
</td>
</tr>
</table>
</div>
<?PHP
?>
<script type="text/javascript">
var WOPENER = window.frameElement.WOPENER;
WOPENER.S.init(window, "list");
S("TR[eTAB]", WOPENER).none();
var tr = S(".TABS", WOPENER).tr("I", null, [{css:"padding:0px;vertical-align:top;", text:document.getElementById("CONTENIDO").innerHTML}], {eTab:<?=$_GET["tab"]?>});
S('#SCRIPT<?=$_GET["tab"]?>').HTML("");
tr.cells[0].style.borderTop = "1px solid blue";
WOPENER.DimScript[<?=$_GET["tab"]?>] = ["RESULT:Seek Field","",""];
WOPENER._ScriptActual = <?=$_GET["tab"]?>;
var obj = S("#TABCONTENEDOR", WOPENER).obj.children[0];
S("<div class='TABSCRIPT'>Seek Field</div>").nodeEnd(obj);
var ancho = S(".MENU",top).css("width");
var o = S("#SCRIPT<?=$_GET["tab"]?>", WOPENER).obj.rows[0].cells[1];
S(o).text(S(o).text()+" (<?=$_ToatlFicheros."/".$_TotalDeOcurrecias?>)");
setTimeout(function(){
WOPENER.document.body.focus();
WOPENER.MarcarScript(<?=$_GET["tab"]?>);
S("TR[etab='<?=$_GET["tab"]?>']", WOPENER).css({width:ancho, display:"table"});
WOPENER.ajustaAlto(<?=$_GET["tab"]?>);
WOPENER.S.info();
WOPENER.S.info("Fin de la búsqueda<br><br><u>Opciones de teclado:</u><br>Cntr+Shift+N: Next<br>Cntr+Shift+P: Previous", 7);
WOPENER._LastPosition = null;
},200);
</script>
<?PHP
echo '</BODY></HTML>';
function SeekField($DirBase, $buscar){
global $_xBuscar, $_ToatlFicheros, $_TotalDeOcurrecias, $_TotalMarcas, $_DirectoriesToSkip;
$buscar2 = mb_substr($buscar,0,-1).":";
$buscar3 = mb_substr($buscar,0,-1)."{";
if( $DirBase=='../http' || eSubstrCount($DirBase, "/http/")>0 ) return;
if( mb_substr_count($DirBase, "/d/_check")==0 && (eSubstrCount($DirBase, "/_")>0 && eSubstrCount($DirBase, "/_datos")==0 )  ){
return;
}
if( isset($_DirectoriesToSkip) && gettype($_DirectoriesToSkip)=="array" && in_array("{$DirBase}/", $_DirectoriesToSkip) ){
return;
}
if( mb_substr($DirBase, -3)==".NO" ) return;
$di = opendir($DirBase);
while( $file=readdir($di) ){
if( $file!='.' && $file!='..' ){
if( is_dir("{$DirBase}/{$file}") ){
SeekField("{$DirBase}/{$file}", $buscar);
}else{
$NomFile = mb_substr($DirBase.'/'.$file, 2);
if( mb_substr($file,-2)=="df" ){
$verFile = true;
$dim = file("{$DirBase}/{$file}");
if( !preg_match($_xBuscar, implode("",$dim)) ) continue;
$conto = false;
for($n=0; $n<count($dim); $n++){
$tmp = trim($dim[$n]);
if( eSubstrCount($tmp, REM)>0 ) list($tmp) = explode(REM, $tmp);
$tmp = mb_strtoupper(str_replace(" ","",$dim[$n]));
if( $tmp[0]=="." || $tmp[0]=="/" ) continue;
if( $tmp[0]=="[" && (mb_substr($tmp,0,6)=="[NOTE]" || mb_substr($tmp,0,6)=="[EXIT]")  ) break;
if( eSubstrCount($tmp, "|")>=9 and (eSubstrCount($tmp, $buscar)>0 || eSubstrCount($tmp, $buscar2)>0 || eSubstrCount($tmp, $buscar3)>0) ){
if( !$conto ){
$conto = true;
$_ToatlFicheros++;
}
if( $verFile ){
$verFile = false;
echo "<div id=FILE>{$DirBase}/{$file}</div>";
}
preg_match_all($_xBuscar, $dim[$n], $matches, PREG_OFFSET_CAPTURE);
$tmp = trim(str_replace("\t"," ",$dim[$n]));
$tmp = str_replace(
array(  '<'  ,   '>'  ),
array('&#60;', '&#62;'),
$tmp
);
$i = 0;
$token = $matches[0][$i][0];
$col = $matches[0][$i][1];
if( mb_strpos($dim[$n], "|")>$col ) $col = $matches[0][1][1];
$tmp = str_replace($_GET["SeekField"], "<span id=MARCA posicion={$_TotalMarcas} col={$col}>{$token}</span>", $tmp);
$_TotalMarcas++;
echo "<div id=LINEA{$rem}>".($n+1).": ".$tmp.'</div>';
$_TotalDeOcurrecias++;
}
}
}
}
}
}
closedir( $di );
}
?>