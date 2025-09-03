<?PHP
set_time_limit(0);
$_NumCambios = 0;
eTrace( 'Aplicación: session...' );
eTrace( 'INI: '.date('H:i:s') );
ArregloTAG( '..' );
eTrace( 'FIN: '.date('H:i:s') );
eTrace( 'Nº de cambios: '.$_NumCambios );
function ArregloTAG( $dorg ){
if( !is_readable($dorg) ) die( "<br>Error al abrir el directorio de origen '{$dorg}'" );
if( eSubstrCount($dorg,'/edes.v3/tcpdf/')>0 || eSubstrCount($dorg,'/edes.v3/_vb/')>0 || eSubstrCount($dorg,'/_tmp/')>0 || eSubstrCount($dorg,'/_bak_/')>0 || eSubstrCount($dorg,'/_vb/')>0 ) return;
global $_NumCambios;
$di = opendir( $dorg );
while( $file = readdir( $di ) ){
if( $file!='.' && $file!='..' ){
if( file_exists($dorg.'/'.$file) != 1 ) die("<BR> >>>>>>>>>>>> No existe el fichero [".$file."]");
if( is_dir($dorg.'/'.$file) ){
if( $file!='tcpdf' ) ArregloTAG( "$dorg/$file" );
}else{
$ext = explode('.',$file);
$ext = $ext[count($ext)-1];
if( $ext=='php' || $ext=='gs' || $ext=='inc' || $ext=='ini' || $ext=='class' || $ext=='edf' || $ext=='gdf' || $ext=='sdf' || $ext=='fdf' || $ext=='ldf' || $ext=='idf' || $ext=='zdf' || $ext=='sel' ){
$txt = '';
$SeCambio = false;
$Dim = file("{$dorg}/{$file}");
for( $n=0; $n<count($Dim); $n++ ){
if( eSubstrCount($Dim[$n],'session_register') > 0 ){
list( ,$v ) = explode('(',$Dim[$n]);
list( $v, $dch ) = explode(')',$v);
if( trim($dch)=='' ){
closedir( $di );
die( "Editar el fichero: {$dorg}/{$file}" );
}
if( trim($v)=='' ) break;
$v = str_replace("'",'',$v);
$v = str_replace('"','',$v);
$v = str_replace("\t",'',$v);
$v = str_replace(' ','',$v);
$DimVar = explode(',',$v);
for( $i=0; $i<count($DimVar); $i++ ){
$txt .= 'SESS::$'.$DimVar[$i].' = $'.$DimVar[$i].";\n";
}
$SeCambio = true;
}else{
$txt .= $Dim[$n];
}
}
if( $SeCambio ){
file_put_contents( "{$dorg}/{$file}", $txt );
$_NumCambios++;
}
$txt = '';
$Dim = array();
}
}
}
}
closedir( $di );
}
?>