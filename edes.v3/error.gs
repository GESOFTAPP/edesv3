<?PHP //[_PROTECCION_]
if( S::$_User==-1 ) exit;
$cdi = date('Y-m-d H:i:s');
if( isset($_POST["pk"]) && isset($_POST["post"]) ){
foreach($_POST as $k=>$v){
$v = eEntityDecode($v, false);
$_POST[$k] = $v;
}
$dim = explode("\n",$_POST["html"]);
$txtError = $dim[0]."\n";
for($n=1; $n<count($dim); $n++) $txtError .= "\t\t ".$dim[$n]."\n";
if( $_POST["url"][0]=='/' ) $_POST["url"] = mb_substr($_POST["url"], 1);
$_POST["post"] = str_replace(
array("\t\t"),
array("\t\t "),
trim($_POST["post"])
);
$_POST["error"] = str_replace(
array(CHR10, "&#13;&#10;"),
array(CHR13.CHR10, CHR13.CHR10),
trim($_POST["error"])
);
$_POST["trace"] = str_replace(
array(CHR10, "&#13;&#10;"),
array(CHR13.CHR10, CHR13.CHR10),
trim($_POST["trace"])
);
if( $_POST["trace"]=='/' ) $_POST["trace"] = mb_substr($_POST["trace"],1);
$linea   = $_POST["line"];
$columna = $_POST["col"];
$LogTxt = $cdi."\r\n".
"\tUSER...: ".S::$_User."\r\n".
"\tURL....: ".$_POST["url"]." ({$linea},{$columna})\r\n".
"\tERROR..: ".$_POST["error"]."\r\n".
"\tTRACE..: ".$_POST["trace"];
$tmp = array();
$dim = explode("\n", var_export(debug_backtrace(), true));
for($n=0; $n<count($dim); $n++){
if( trim($dim[$n])=="array (" || trim($dim[$n])==")" || trim($dim[$n])==")," ) continue;
if( mb_substr($dim[$n],-1)=="," ) $dim[$n] = mb_substr($dim[$n], 0, -1);
$dim[$n] = str_replace("'", "", $dim[$n]);
array_push($tmp, str_replace("  ", "\t", $dim[$n]));
}
$LogTxt .= "\r\n".implode("\n", $tmp);
$txtError = str_replace(
array(CHR10, "&#13;&#10;"),
array(CHR13.CHR10, CHR13.CHR10),
trim($txtError)
);
$MasInfo = $cdi."\r\n".
"\tUSER...: ".S::$_User."\r\n".
"\tPK.....: ".$_POST["pk"]."\r\n".
"\tERROR..: ".$_POST["error"]."\r\n".
"\tTRACE..: ".$_POST["trace"]."\r\n".
"\tURL....: ".$_POST["url"]." ({$linea},{$columna})\r\n".
"\tPOST...: ".$_POST["post"]."\r\n".
"\tHTML...: ".$txtError."\r\n";
$_POST["error"] = str_replace(
array(  '"'  ,   "'"  ,   "`"  ),
array('&#34;', '&#39;', "&#96;"),
$_POST["error"]
);
$_POST["trace"] = str_replace(
array(  '"'  ,   "'"  ,   "`"  ),
array('&#34;', '&#39;', "&#96;"),
$_POST["trace"]
);
eErrorToFile($LogTxt, $MasInfo);
}
include_once($Dir_.$_Sql.'.inc');
if( isset($_GET['ERROR']) ){
list($Old, $New) = explode(',', $_GET['ERROR']);
@rename("../_tmp/err/{$Old}.png", "../_tmp/err/{$New}.png");
qQuery("update {$_ENV['eDesDictionary']}gs_error set img='{$_ENV['ON']}' where codigo='{$New}'");
if( file_exists("../_tmp/err/{$Old}_before.png") ){
@rename("../_tmp/err/{$Old}_before.png", "../_tmp/err/{$New}_before.png");
}
eEnd();
}
if( $LogTxt!='' ){
$cd = "";
if( $_ErrReportToDev!='' && (in_array('u'.$_User, $_ErrReportUserNode) || in_array('n'.$_Node, $_ErrReportUserNode)) ){
$Cabeceras  = "MIME-Version: 1.0\r\n";
$Cabeceras .= "Content-type: text/html; charset=UTF-8\r\n";
$Cabeceras .= "From: ".$_ErrReportFrom."\r\n";
mail($_ErrReportToDev, "Seguimiento de error: Node:{$_Node}, User:{$_User} ".$cd, stripslashes(str_replace("\n",'<br>',$LogTxt)), $Cabeceras);
}else if( $_ErrReportTo!='' ){
global $_ErrReportMessage, $_ErrReportFrom, $_ErrReportCc, $_ErrReportBCc;
$Cabeceras  = "MIME-Version: 1.0\r\n";
$Cabeceras .= "Content-type: text/html; charset=UTF-8\r\n";
$Cabeceras .= "From: ".$_ErrReportFrom."\r\n";
if( $_ErrReportFrom!='' ) $Cabeceras .= "Reply-To: ".$_ErrReportFrom."\r\n";
if( $_ErrReportCc  !='' ) $Cabeceras .= "Cc: ".$_ErrReportCc."\r\n";
if( $_ErrReportBCc !='' ) $Cabeceras .= "Bcc: ".$_ErrReportBCc."\r\n";
$Cabeceras .= "X-Mailer: PHP/" . phpversion();
mail($_ErrReportTo, $_ErrReportMessage.' '.$cd, stripslashes(str_replace("\n",'<br>',$LogTxt)), $Cabeceras);
}
}
if( isset($DELETE) ){
qSelect("{$_ENV['eDesDictionary']}gs_error", '*', "codigo={$DELETE} and is_solved is null");
$row = qArray();
$xtipo = trim($row['tipo']);
$xfichero = trim($row['fichero']);
$xlinea = trim($row['linea']);
$xtexto = trim($row['texto']);
if( $xfichero=='' && $xlinea=='' ){
$sql = "tipo='{$xtipo}' and texto='{$xtexto}'";
}else{
$sql = "tipo='{$xtipo}' and fichero='{$xfichero}' and linea='{$xlinea}' and texto='{$xtexto}'";
if( eSubstrCount($sql," and linea='' and ")==1 ) $sql = str_replace(" and linea='' and "," and (linea='' or linea is null) and ",$sql);
if( eSubstrCount($sql,"' and texto=''"    )==1 ) $sql = str_replace("' and texto=''"    ,"' and (texto='' or texto is null)"    ,$sql);
}
qSelect("{$_ENV['eDesDictionary']}gs_error", 'codigo', $sql);
$TotalReg = 0;
$Borrar = '';
while($ABorrar=qRow()){
@unlink('../_tmp/err/'.$ABorrar[0].'.png');
$Borrar .= ','.$ABorrar[0];
$TotalReg++;
}
qQuery("update {$_ENV['eDesDictionary']}gs_error set is_solved='{$_ENV['ON']}' where {$sql}");
echo '<HTML><HEAD></HEAD><BODY><SCRIPT type="text/javascript">';
if( $TotalReg==0 ){
sql_Borra("{$_ENV['eDesDictionary']}gs_error", "codigo={$DELETE}");
$Borrar .= ','.$DELETE;
$TotalReg++;
}
$Borrar = str_replace(' ','',$Borrar);
?>
var Obj = window.frameElement.WOPENER;
if( Obj.DGI("BROWSE") != null ){
var Col = Obj.eGCol('codigo'),
tmp = '<?= $Borrar; ?>'.split(',');
for(var n=1; n<tmp.length; n++){
for(var i=1; i<Obj.DGI("BROWSE").rows.length; i++){
if( Obj.DGI("BROWSE").rows[i].cells[Col].textContent.replace(/\s/g,'') == tmp[n] ){
Obj.DGI("BROWSE").rows[i].style.display = 'none';
}
}
}
Obj.Recalcula();
Obj.MovTitulos();
}
<?PHP
if( $TotalReg==1 ){
echo "top.eAlert(S.lng(209), '1 Registro borrado', 'A', 'I');";
}else{
echo "top.eAlert(S.lng(209), '{$TotalReg} Registros borrados', 'A', 'I');";
}
echo '</SCRIPT></BODY></HTML>';
eEnd();
}
$orden = str_replace(
array(  "'"  ,  '"'  ,"\\'",'\\"','º','á'),
array('&#39;','&#34;',  "'",  '"','º','á'),
$_POST['error']
);
$Trace = str_replace(
array("\t\t\t", "\t\t"),
array("\t"    , ""    ),
$_POST["trace"]
);
$Texto = $_POST["error"];
$NomFile = $_POST["url"];
$Linea = $linea;
$Col = $columna;
$dim = explode(CHR10, trim($Trace));
$Desde = trim($dim[count($dim)-1]);
if( mb_substr($Desde,0,3)=="at " ) $Desde = mb_substr($Desde,3);
list($Desde) = explode("&", $Desde);
list($xNomFile) = explode("&", $NomFile);
if( trim($xNomFile)==trim($Desde) ) $Desde = "";
if( eSubstrCount($NomFile,'&')>0 ){
$Para = '&'.mb_substr($NomFile,mb_strpos($NomFile,'&')+1).'&';
while( eSubstrCount($Para, '&_FORMBUTTONS')>0 ){
$i = mb_strpos( $Para,'&_FORMBUTTONS' );
$f = mb_strpos( $Para,'&',$i+1 );
$f2 = mb_strpos( $Para, CHR10, $i+1 );
if( $f2>1 && $f2<$f ) $f = $f2;
$Para = mb_substr( $Para, 0, $i ) . mb_substr( $Para, $f );
}
while( eSubstrCount($Para, '&_PSOURCE')>0 ){
$i = mb_strpos( $Para,'&_PSOURCE' );
$f = mb_strpos( $Para,'&',$i+1 );
$f2 = mb_strpos( $Para, CHR10, $i+1 );
if( $f2>1 && $f2<$f ) $f = $f2;
$Para = mb_substr( $Para, 0, $i ) . mb_substr( $Para, $f );
}
if( mb_substr($Para,-1)=='&' ) $Para = mb_substr( $Para, 0, -1 );
if( $Para[0]=='&' ) $Para = mb_substr( $Para, 1 );
$Para = '';
$NomFile = mb_substr($NomFile,0,mb_strpos($NomFile,'&'));
}else{
$Para = '';
}
if( eSubstrCount($NomFile, 'edes.php?')>0 ) list(,$NomFile) = explode('edes.php?', $NomFile);
$Trace = trim($Trace).'&';
while( eSubstrCount( $Trace, '&_FORMBUTTONS' ) > 0 ){
$i = mb_strpos( $Trace,'&_FORMBUTTONS' );
$f = mb_strpos( $Trace,'&',$i+1 );
$f2 = mb_strpos( $Trace, CHR10, $i+1 );
if( $f2>1 && $f2<$f ) $f = $f2;
$Trace = mb_substr( $Trace, 0, $i ) . mb_substr( $Trace, $f );
}
while( eSubstrCount( $Trace, '&_PSOURCE' ) > 0 ){
$i = mb_strpos( $Trace,'&_PSOURCE' );
$f = mb_strpos( $Trace,'&',$i+1 );
$f2 = mb_strpos( $Trace, CHR10, $i+1 );
if( $f2>1 && $f2<$f ) $f = $f2;
$Trace = mb_substr( $Trace, 0, $i ) . mb_substr( $Trace, $f );
}
$Trace = mb_substr($Trace,0,-1);
$Dim = explode("\n",$Trace);
$Trace = '';
for( $n=0; $n<count($Dim); $n++ ){
if( $n>0 ) $Trace .= "\n";
list( $iz, $dch ) = explode('edes.php?',$Dim[$n]);
if( $dch=='' ){
$Trace .= str_replace("\t",'· ',$iz);
}else{
if( trim($dch)=='U' ){
$Trace = mb_substr($Trace,0,-1);
}else{
$Trace .= $dch;
}
}
}
$Trace = str_replace(CHR13.CHR10.CHR13.CHR10.CHR13.CHR10, "\n\n", $Trace);
$Desde = trim($Desde);
$NomFile = trim($NomFile);
$Linea = trim($Linea)*1;
$Texto = trim($Texto);
$Img = (($ID!='') ? $_ENV['ON']:$_ENV['OFF']);
$_User *= 1;
$Texto = str_replace(array('"',"'"), array("&#34;","&#39;"), $Texto);
$Trace = str_replace(array('"',"'"), array("&#34;","&#39;"), $Trace);
if( eSqlType('pdo.informix') ){
sql_Memo("{$_ENV['eDesDictionary']}gs_error", $Trace);
sql_Inserta("{$_ENV['eDesDictionary']}gs_error", 'cdi,cd_gs_user,tipo,desde,fichero,img,linea,texto,trace',			"'{$cdi}', '{$_User}', 'J', '{$Desde}', '{$NomFile}', '{$Img}', {$Linea}, '{$Texto}', ?");
}else if( eSqlType('informix') ){
$DimText[] = ifx_create_blob(1, 0, $Trace);
$sql = "insert into {$_ENV['eDesDictionary']}gs_error (cdi,cd_gs_user,tipo,desde,fichero,img,linea,texto,trace) values ('{$cdi}', '{$_User}', 'J', '{$Desde}', '{$NomFile}', '{$Img}', {$Linea}, '{$Texto}', ?)";
ifx_query($sql, $GLOBALS['_HndDB'], $DimText);
}else{
sql_Inserta("{$_ENV['eDesDictionary']}gs_error", 'cdi,cd_gs_user,tipo,desde,fichero,img,linea,texto,trace',			"'{$cdi}', '{$_User}', 'J', '{$Desde}', '{$NomFile}', '{$Img}', {$Linea}, '{$Texto}', '{$Trace}'");
}
if( $ID!='' ){
$pk = qId();
@rename("../_tmp/err/{$ID}.png", "../_tmp/err/{$pk}.png");
if( file_exists("../_tmp/err/{$ID}_before.png") ){
@rename("../_tmp/err/{$ID}_before.png", "../_tmp/err/{$pk}_before.png");
}
}
qEnd();
eEnd();
echo "<script type='text/javascript'>alert('{$ID}');</SCRIPT>";
?>
<!DOCTYPE HTML>
<HTML><HEAD></HEAD><BODY>
<SCRIPT type="text/javascript">
top.eCaptureWin(12345678);
</SCRIPT>
</BODY></HTML>