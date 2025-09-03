<?PHP
set_time_limit(0);
$_NumCambios = 0;
eTrace('Aplicación: Transforma "edes. gs" a "edes.php"');
eTrace( 'INI: '.date('H:i:s') );
ArregloTAG( '..' );
eTrace( 'Nº de cambios: '.$_NumCambios );
eTrace( 'FIN: '.date('H:i:s') );
function ArregloTAG( $dorg ){
if( !is_readable($dorg) ) die( "<br>Error al abrir el directorio de origen '$dorg'" );
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
if( $ext=='php' || $ext=='inc' || $ext=='gs' || $ext=='inc' || $ext=='ini' || $ext=='class' || $ext=='edf' || $ext=='gdf' || $ext=='sdf' || $ext=='fdf' || $ext=='ldf' || $ext=='idf' || $ext=='zdf' || $ext=='js' || $ext=='sel' || $ext=='htm' || $ext=='html' ){
$txt = file_get_contents("{$dorg}/{$file}");
$v = eSubstrCount($txt,'edes'.'.gs?');
if( $v > 0 ){
$txt = str_replace('edes'.'.gs?','edes.php?',$txt);
file_put_contents( "{$dorg}/{$file}", $txt );
$_NumCambios++;
}
$txt = '';
}
}
}
}
closedir( $di );
}
?>