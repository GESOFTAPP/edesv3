<?PHP
function gsIMG( $img ){
return eImg64('$t/g/e/'.$img.'.gif');
}
function gsJS( $script ){
switch( $GLOBALS['_Almacen·JS'] ){
case 'M': return( 'edes.php?R:$t/js/'.$script.'.js' );
case 'C': return( "c:/"."/edes.v3/t/js/{$script}.js" );
case 'F': return( "t/99.gs?J:{$script}" );
}
}
function gsCSS( $script ){
switch( $GLOBALS['_Almacen·CSS'] ){
case 'M': return( 'edes.php?R:$t/css/'.$GLOBALS['_gsPrefijo'].$script.'.css' );
case 'C': return( "c:/"."/edes.v3/t/css/{$script}.css" );
case 'F': return( "t/99.gs?C:{$script}" );
}
}
?>