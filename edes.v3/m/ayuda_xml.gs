<?PHP
if( S::$_User==-1 || $_gsID!=getmypid() ) exit;
$DimOk = array();
$DimAyuda = array( DIREDES.'h/i/label.ind' );
$pnt = fopen( DIREDES.'t/dll/sintaxis.edes.xml', "w" );
$txt = file_get_contents(DIREDES.'t/dll/_h_sintaxis.edes.xml');
fputs( $pnt, $txt."\n" );
for( $nFile=0; $nFile<count($DimAyuda); $nFile++ ){
$Dim = file($DimAyuda[$nFile]);
$Dim[] = '';
for( $n=0; $n<count($Dim)-1; $n++ ){
$nTab = mb_strlen($Dim[$n])-mb_strlen(ltrim($Dim[$n]));
if( $nTab >= mb_strlen($Dim[$n+1])-mb_strlen(ltrim($Dim[$n+1])) ){
$txt = trim($Dim[$n]);
if( $txt<>'' && $txt[0]<>"." && eSubstrCount($txt,' ')==0 ){
if( eSubstrCount($txt,'+') > 0 ){
list( $iz, $dch ) = explode('+',$txt);
$txt = $dch.$iz;
}else if( eSubstrCount($txt,'{') > 0 ){
list( $iz, $dch ) = explode('{',$txt);
$txt = mb_substr($dch,0,-1);
}else{
}
$txt = mb_strtolower($txt).'.htm';
if( !file_exists( DIREDES.'h/'.$txt ) ){
eTrace( '--- NO FILE ---> '.$txt );
}else{
$txt = trim($txt);
if( eSubstrCount( $txt, ' ' )==0 ){
Desmenuza( DIREDES.'h/'.$txt, $pnt );
}else{
eTrace( '--- NO ---> '.$txt );
}
}
}
}
}
}
fputs( $pnt, "</manual>\n" );
fputs( $pnt, "</edesSyntax>\n" );
fclose($pnt);
echo '<script type="text/javascript">top.S.edes(window); top.eLoading(0);</script>';
echo '<br>';
eTrace( '=== XML GENERADO ===' );
eEnd();
function Desmenuza( $File, $pnt ){
global $DimOk;
$txt = file_get_contents($File);
$Comando = Trozo( $txt, ' id=Etiqueta>' );
if( $Comando=='' ){
eTrace( '--- NO ---> '.$File );
return '';
}
if( $Comando=='fields' ) continue;
if( isset($DimOk[$Comando]) ){
eTrace( '------> DOBLE ------> '.$Comando );
return;
}else{
$DimOk[$Comando] = 1;
}
$Sintaxis = Trozo( $txt, ' id=Sintaxis>' );
$Descripcion = Trozo( $txt, ' id=Descripcion>' );
$sParametros = Trozo( $txt, ' id=Parametro>', '<TD id=tEjemplo>', '<TR>' );
$Parametros = '';
$Dim = Opciones( $sParametros, ' id=Opciones' );
for( $n=0; $n<count($Dim); $n+=2 ){
$Dim[$n] = trim(str_replace('&nbsp;',' ',$Dim[$n]));
$Parametros .= '<'.$Dim[$n].'><![CDATA['.$Dim[$n+1].']]></'.$Dim[$n].'>';
}
$Grabar = '<tag name="'.mb_strtolower($Comando).'">'."\n".
"\t".'<tpl>general</tpl>'."\n".
"\t".'<tpl_body>general_body</tpl_body>'."\n".
"\t".'<tagName>'.$Comando.'</tagName>'."\n".
"\t".'<istag>1</istag>'."\n".
"\t".'<syntax>'.$Sintaxis.'</syntax>'."\n".
"\t".'<desc><![CDATA['.$Descripcion.']]></desc>'."\n".
"\t".'<paramSeparator>|</paramSeparator>'."\n".
"\t".'<multiline>0</multiline>'."\n".
"\t".'<lang></lang>'."\n".
"\t".'<params>'."\n".$Parametros."\n".
"\t".'</params>'."\n".
'</tag>'."\n\n";
fputs( $pnt, $Grabar );
}
function Trozo( $txt, $Buscar, $Hasta='<', $Hasta2='' ){
$i = mb_strpos( $txt, $Buscar );
if( getType($i)<>'integer' ) return '';
$i += mb_strlen($Buscar);
$f = mb_strpos( $txt, $Hasta, $i );
$Encontrado = trim(mb_substr( $txt, $i, $f-$i ));
$Encontrado = str_replace( '&nbsp;',' ',$Encontrado);
if( $Hasta2!='' ){
$f = mb_strrpos( $Encontrado, $Hasta2 );
$Encontrado = trim(mb_substr( $Encontrado, 0, $f ));
}
return trim( $Encontrado );
}
function Opciones( $txt, $Buscar, $Hasta='</TABLE', $Hasta2='' ){
$i = mb_strpos( $txt, $Buscar );
if( getType($i)<>'integer' ) return array();
$i += mb_strlen($Buscar);
$f = mb_strpos( $txt, $Hasta, $i );
$Encontrado = trim(mb_substr( $txt, $i, $f-$i ));
$Encontrado = str_replace( '&nbsp;',' ',$Encontrado);
$Dim = array();
$i = 0;
while( true ){
$i = mb_strpos( mb_strtoupper($Encontrado), '<TD', $i );
if( getType($i)<>'integer' ) break;
$i = mb_strpos( mb_strtoupper($Encontrado), '>', $i ) + 1;
$f = mb_strpos( $Encontrado, '</', $i );
$sEncontrado = trim(mb_substr( $Encontrado, $i, $f-$i ));
$Dim[] = strip_tags( $sEncontrado );
}
return $Dim;
}
?>