<?PHP
set_time_limit(0);
$_NumCambios = 0;
eTrace('Aplicación: Transforma "<'.'?" a "<'.'?PHP" o "<'.'?="');
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
if( $ext=='php' || $ext=='gs' || $ext=='inc' || $ext=='ini' || $ext=='class' || $ext=='edf' || $ext=='gdf' || $ext=='sdf' || $ext=='fdf' || $ext=='ldf' || $ext=='idf' || $ext=='zdf' || $ext=='sel' ){
$txt = '';
$SeCambio = false;
$Dim = file("{$dorg}/{$file}");
for( $n=0; $n<count($Dim); $n++ ){
$v = eSubstrCount($Dim[$n],'<'.'?');
if( $v>0 ){
$p=0;
for( $i=0; $i<$v; $i++ ){
$p = mb_strpos( $Dim[$n], '<'.'?', $p );
$cadena = mb_strtoupper(mb_substr($Dim[$n],$p,3));
if( $cadena!='<'.'?P' && $cadena!='<'.'?=' ){
$SeCambio = true;
if( mb_strtoupper(mb_substr($Dim[$n],$p,5))=='<'.'?XML' ){
}else if( mb_substr($Dim[$n],$p,4)=='<'.'? $' ){
$pf = mb_strpos( $Dim[$n], '?'.'>', $p )+2;
if( eSubstrCount( mb_substr($Dim[$n],$p+2,$pf-$p-4), '=' ) > 0 ){
$Dim[$n] = mb_substr($Dim[$n],0,$p).'<'.'?PHP $'.mb_substr($Dim[$n],$p+4);
}else{
$Dim[$n] = mb_substr($Dim[$n],0,$p).'<'.'?= $'.mb_substr($Dim[$n],$p+4);
}
}else if( mb_substr($Dim[$n],$p,3)=='<'.'?$' ){
$Dim[$n] = mb_substr($Dim[$n],0,$p).'<'.'?=$'.mb_substr($Dim[$n],$p+3);
}else if( mb_substr($Dim[$n],$p,7)=='<'.'?echo ' ){
$Dim[$n] = mb_substr($Dim[$n],0,$p).'<'.'?= '.mb_substr($Dim[$n],$p+7);
}else if( mb_substr($Dim[$n],$p,8)=='<'.'? echo ' ){
$Dim[$n] = mb_substr($Dim[$n],0,$p).'<'.'?= '.mb_substr($Dim[$n],$p+8);
}else{
if( mb_substr(trim(mb_substr($Dim[$n],$p+2)),0,5)=='eLng(' ){
$Dim[$n] = mb_substr($Dim[$n],0,$p).'<'.'?= '.mb_substr($Dim[$n],$p+2);
}else if( mb_substr(trim(mb_substr($Dim[$n],$p+2)),0,6)=='$_Lng[' ){
$Dim[$n] = mb_substr($Dim[$n],0,$p).'<'.'?= '.mb_substr($Dim[$n],$p+2);
}else{
$Dim[$n] = mb_substr($Dim[$n],0,$p).'<'.'?PHP '.mb_substr($Dim[$n],$p+2);
}
}
}
$p += 1;
}
}
$txt .= $Dim[$n];
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