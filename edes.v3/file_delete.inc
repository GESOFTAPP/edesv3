<?PHP
if( S::$_User==-1 || $_gsID!=getmypid() ) exit;
define("DIREDES", __DIR__."/");
list($Script, $Campo, $Tabla) = explode('|', $_GET["DATOS"]);
$ConRastro = false;
$tmp = explode(':',$_Accion);
$tmp[1] = eScript($tmp[1]);
$File = $tmp[1];
if( eSubstrCount($File, '/edes.v3/')>0 ) exit;
if( eSubstrCount($File, '.')>0 ){
$Ext = mb_substr($File, mb_strrpos($File,'.')+1);
if( eSubstrCount(',gs,inc,js,php,php4,php5,css,edf,gdf,ldf,fdf,zdf,sdf,', ",{$Ext}," )>0 ){
exit;
}
$FileBak = mb_substr( $File, 0, mb_strrpos($File,'.') ) .'.bak';
if( $ConRastro ) eTron( $FileBak);
@unlink( $FileBak );
}
if( $ConRastro ) eTron( $File);
@unlink( $File );
$Buscar = '';
$Datos = explode( '|',$_GET["DATOS"] );
for( $n=3; $n<count($Datos)-1; $n++ ){
if( $n>3 ) $Buscar .= ' and ';
$tmp = explode( '=',$Datos[$n] );
$Buscar .= "{$tmp[0]}='{$tmp[1]}'";
}
$Sql = "select * from {$Tabla} where {$Buscar}";
qQuery( $Sql );
$row = qArray();
$DimUPLOADFILE = array();
$DimDBSERIAL = '';
$Dim = file( eScript( $Script ) );
for( $n=0; $n<count($Dim); $n++ ){
$Dim[$n] = trim($Dim[$n]);
if( eSubstrCount(mb_strtoupper($Dim[$n]),'[UPLOADFILE]')>0 || eSubstrCount(mb_strtoupper($Dim[$n]),'[DBSERIAL]')>0 ){
$buffer = $Dim[$n];
$i = mb_strpos($buffer,']');
$Etiqueta = mb_strtoupper( mb_substr( $buffer, 1, $i-1 ) );
$tmp = explode( '|', mb_substr( $buffer, $i+1 ) );
for( $i=0; $i<count($tmp); $i++ ) $tmp[$i] = trim($tmp[$i]);
if( eSubstrCount(mb_strtoupper($Dim[$n]),'[UPLOADFILE]')>0 ){
if( $tmp[0]==$Campo ) $DimUPLOADFILE = $tmp;
}else if( eSubstrCount(mb_strtoupper($Dim[$n]),'[DBSERIAL]')>0 ){
$DimDBSERIAL = $tmp[0];
}
}
}
if( count( $DimUPLOADFILE ) == 0 ) exit;
$_UPLOADFILE = array();
$_UPLOADFILE['oDIR'] = $DimUPLOADFILE[1];
$DimUPLOADFILE[1] = eScript( $DimUPLOADFILE[1] );
$_UPLOADFILE['DIR'] = $DimUPLOADFILE[1];
$_UPLOADFILE['NOMBRE'] = $DimUPLOADFILE[2];
$_UPLOADFILE['BYTS'] = $DimUPLOADFILE[3];
$_UPLOADFILE['TITLE'] = (($DimUPLOADFILE[4]=='') ? 'Ver fichero' : $DimUPLOADFILE[4] );
if( $DimUPLOADFILE[5] != '' ) $_UPLOADFILE['EXT'] = str_replace(' ','',$DimUPLOADFILE[5]);
$_UPLOADFILE['PREFIJO'] = $DimUPLOADFILE[6];
$_UPLOADFILE['TAMAÑOS'] = $DimUPLOADFILE[7];
$_UPLOADFILE['PREFIJOS'] = $DimUPLOADFILE[8];
if( $DimUPLOADFILE[9]!='' ){
if( mb_substr($DimUPLOADFILE[9],-1)=='/' ) $DimUPLOADFILE[9] = mb_substr($DimUPLOADFILE[9],0,-1);
$_UPLOADFILE['COPY'] = eScript($DimUPLOADFILE[9]);
}
$xNomFile = $row[$Campo];
$NomExt = mb_substr( $xNomFile, mb_strrpos($xNomFile,'.') );
if( mb_substr($_UPLOADFILE['NOMBRE'],-1)==')' && mb_strpos($_UPLOADFILE['NOMBRE'],'(') > 0 ){
$xNomFile = eval('return '.$_UPLOADFILE['NOMBRE'].';');
}else if( $DimDBSERIAL == $_UPLOADFILE['NOMBRE'] ){
$xNomFile = $row[$DimDBSERIAL].$NomExt;
}else{
if( $_Fichero[$nf] == $_UPLOADFILE['NOMBRE'] ){
$xNomFile = mb_strtolower($_FILES['name']);
$NomExt = mb_substr($xNomFile,mb_strrpos($xNomFile,'.'));
$SoloNomFile = mb_substr($xNomFile,0,mb_strrpos($xNomFile,'.'));
}else{
$xNomFile = ${$_UPLOADFILE['NOMBRE']}.$NomExt;
$xNomFile = mb_strtolower($xNomFile);
}
}
$xxNomFile= $xNomFile;
$xNomFile = _NmFileConPrefijo( $xNomFile, $_UPLOADFILE['PREFIJO'] );
if( $ConRastro ) eTron( $_UPLOADFILE['DIR'].'/'.$xNomFile );
@unlink( $_UPLOADFILE['DIR'].'/'.$xNomFile );
if( $_UPLOADFILE['COPY']!='' ){
if( $ConRastro ) eTron( $_UPLOADFILE['COPY'].'/'.$xNomFile );
@unlink( $_UPLOADFILE['COPY'].'/'.$xNomFile );
}
if( $_UPLOADFILE['TAMAÑOS']!='' ){
$iTamayo   = explode( ',', $_UPLOADFILE['TAMAÑOS'] );
$iPrefijos = explode( ',', $_UPLOADFILE['PREFIJOS'] );
for( $i=0; $i<count($iTamayo); $i++ ){
$iTamayo[$i] = trim($iTamayo[$i]);
$iPrefijos[$i] = trim($iPrefijos[$i]);
if( $iPrefijos[$i]=='' ) $iPrefijos[$i] =  $_UPLOADFILE['PREFIJO'];
}
$xPre=0;
for( $i=0; $i<count($iTamayo); $i+=2 ){
$NuevaImg = $_UPLOADFILE['DIR'].'/'._NmFileConPrefijo( $xxNomFile, $iPrefijos[$xPre] );
if( $ConRastro ) eTron( $NuevaImg );
@unlink( $NuevaImg );
if( $_UPLOADFILE['COPY']!='' ){
if( $ConRastro ) eTron( $_UPLOADFILE['COPY'].'/'._NmFileConPrefijo( $xxNomFile, $iPrefijos[$xPre] ) );
@unlink( $_UPLOADFILE['COPY'].'/'._NmFileConPrefijo( $xxNomFile, $iPrefijos[$xPre] ) );
}
$xPre++;
}
}
$Sql = "update {$Tabla} set {$Campo}='' where {$Buscar}";
qQuery( $Sql );
$Sql = "select * from {$Tabla} where {$Buscar}";
qQuery( $Sql );
$r = qArray();
$sRLOCK = '';
foreach( $r as $key => $val ) if( !is_numeric($key) && eSubstrCount( $_DBRLOCKNOFIELD, ",{$key}," ) == 0 ) $sRLOCK .= $key.$val;
eLngLoad(DIREDES.'lng/tab','',1);
?>
<SCRIPT type="text/javascript">
var _WOPENER = window.frameElement.WOPENER;
var Obj = _WOPENER.DGI('<?=$Campo?>');
Obj.eFILENAME = '';
Obj.OldValue = '';
var i = Obj.sourceIndex+1, n;
_WOPENER.document.children[Obj.sourceIndex-1].value = '';
try{
_WOPENER.DGI("_MD5").value = '<?= md5($sRLOCK) ?>';
}catch(e){}
var n = 1;
while( _WOPENER.document.children[Obj.sourceIndex+n].tagName == 'IMG' ){
if(
_WOPENER.document.children[Obj.sourceIndex+n].src.indexOf('g/t_op_view.gif') > -1 ||
_WOPENER.document.children[Obj.sourceIndex+n].src.indexOf('g/t_op_delete.gif') > -1 ||
_WOPENER.document.children[Obj.sourceIndex+n].src.indexOf('g/t_op_update.gif') > -1 ||
_WOPENER.document.children[Obj.sourceIndex+n].src.indexOf('g/t_print.gif') > -1
){
_WOPENER.document.children[Obj.sourceIndex+n].style.display = 'none';
}
n++;
}
top.eAlert( S.lng(209), 'Fichero "<?= $FileUsu ?>" borrado', 'A', 'I' );
</SCRIPT>
<?PHP
exit;
?>