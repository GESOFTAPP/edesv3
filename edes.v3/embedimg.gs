<?PHP
if( $_gsID != getmypid() ) exit;
if( S::$_User==-1 ){
include('index.htm');
exit;
}
$DimDelete = array();
$Patron = $_User.'_id_';
$PatronLeng = mb_strlen($Patron);
$Doc = '';
$Dim = array();
$NomDir = '../_tmp/imp/';
$di = opendir( $NomDir );
while( $file = readdir( $di ) ){
if( $file!='.' && $file!='..' && mb_substr($file,0,$PatronLeng)==$Patron ){
if( mb_substr($file,-5)=='.html' ){
$Doc = file_get_contents( $NomDir.$file );
$DimDelete[] = $NomDir.$file;
}else{
array_push( $Dim, mb_substr($file,$PatronLeng) );
}
}
}
closedir($di);
$ImgInterna = $_GET['ImgInterna'];
$sq = (int)eGetMicrotime();
if( $Doc!='' ){
$_GET['EXT'] = mb_strtoupper($_GET['EXT']);
if( $_GET['EXT']=='DOC' || $_GET['EXT']=='DOCX' || $_GET['EXT']=='RTF' ){
for( $n=0; $n<count($Dim); $n++ ){
$Ext = mb_substr( $Dim[$n], mb_strpos($Dim[$n],'.')+1 );
if( $ImgInterna ){
$Imagen = 'data:image/'.$Ext.';base64,'.base64_encode( file_get_contents( $NomDir.$Patron.$Dim[$n] ) );
$DimDelete[] = $NomDir.$Patron.$Dim[$n];
$Doc = str_replace( 'src="'.$_GET['DIR'].'/'.$Dim[$n], ' src="'.$Imagen, $Doc );
}else{
$NewFile = 'img/'.$_User.'_'.$sq.'.'.$Ext;
rename( $NomDir.$Patron.$Dim[$n], $NewFile );
$Doc = str_replace( 'src="'.$_GET['DIR'].'/'.$Dim[$n], ' src="'.$NewFile, $Doc );
$sq++;
}
}
}else{
for( $n=0; $n<count($Dim); $n++ ){
$Ext = mb_substr( $Dim[$n], mb_strpos($Dim[$n],'.')+1 );
if( $ImgInterna ){
$Imagen = 'data:image/'.$Ext.';base64,'.base64_encode( file_get_contents( $NomDir.$Patron.$Dim[$n] ) );
$DimDelete[] = $NomDir.$Patron.$Dim[$n];
}
$tv = eSubstrCount( $Doc, $_GET['DIR'].'/'.$Dim[$n] );
if( $ImgInterna ){
$Doc = str_replace( 'src="'.$_GET['DIR'].'/'.$Dim[$n], ' src="'.$Imagen, $Doc );
}else{
$NewFile = 'img/'.$_User.'_'.$sq.'.'.$Ext;
rename( $NomDir.$Patron.$Dim[$n], $NewFile );
$Doc = str_replace( 'src="'.$_GET['DIR'].'/'.$Dim[$n], ' src="'.$NewFile, $Doc );
$sq++;
}
for( $nv=0; $nv<$tv; $nv++ ){
$i = mb_strpos( $Doc, $_GET['DIR'].'/'.$Dim[$n], $i+1 );
for( $p=$i; $p>0; $p-- ){
if( mb_substr( $Doc, $p, 1 ) == '<' ){
if( mb_substr( $Doc, $p, 5 ) == '<img ' ){
$ParteIzq = mb_substr( $Doc, 0, $i );
$ParteDch = mb_substr( $Doc, $i+mb_strlen($_GET['DIR'].'/'.$Dim[$n]) );
$e = mb_strrpos( $ParteIzq, '<![if !vml]>' );
if( $e===false ){
}else{
$ParteIzq = mb_substr( $ParteIzq, 0, $e ) . mb_substr( $ParteIzq, $e+12 );
$e = mb_strpos( $ParteDch, '<![endif]>' );
if( $e===false ){
}else{
$ParteDch = mb_substr( $ParteDch, 0, $e ) . mb_substr( $ParteDch, $e+10 );
}
}
break;
}else if( mb_substr( $Doc, $p, 13 ) == '<v:imagedata ' ){
$ParteIzq = mb_substr( $Doc, 0, $i );
$ParteDch = mb_substr( $Doc, $i+mb_strlen($_GET['DIR'].'/'.$Dim[$n]) );
$Ini = mb_strrpos( $ParteIzq, '<!'.'--' );
if( $Ini===false ){
}else{
$ParteIzq = mb_substr( $ParteIzq, 0, $Ini );
$Fin = mb_strpos( $Doc, '--'.'>', $Ini );
if( $Fin===false ){
}else{
$Doc = mb_substr( $Doc, 0, $Ini ) . mb_substr( $Doc, $Fin+3 );
}
}
break;
}
}
}
}
}
}
if( $_GET['CopyTo']!='' ) file_put_contents( eScript($_GET['CopyTo']), $Doc );
$Doc = str_replace( '"', '&quot;', $Doc );
$Doc = str_replace( CHR10, '\\n', $Doc );
$Doc = str_replace( CHR13, '\\r', $Doc );
?>
<script type="text/javascript">
if( window.frameElement.WOPENER.eWordToHtmlPut ) window.frameElement.WOPENER.eWordToHtmlPut( "<?= $Doc ?>".replace(/&quot;/g,'"') );
</script>
<?PHP
if( $_GET['CopyImgTo']!='' ){
if( mb_substr($_GET['CopyImgTo'],-1)!='/' ) $_GET['CopyImgTo'] .= '/';
for( $n=0; $n<count($DimDelete); $n++ ){
$tmp = explode('/',$DimDelete[$n]);
copy( $DimDelete[$n], $_GET['CopyImgTo'].$tmp[count($tmp)-1] );
}
}
if( $_GET['DelSource'] ) for( $n=0; $n<count($DimDelete); $n++ ) @unlink($DimDelete[$n]);
}
eEnd();
?>