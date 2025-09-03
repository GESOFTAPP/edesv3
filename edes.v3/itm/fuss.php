<?PHP
function eFuss( $oClave, $On=true ){
$Dim = array( 33,62, 65,93, 97,125 );
$cBasura = ''; for( $i=0; $i<count($Dim); $i+=2 ) for( $n=$Dim[$i]; $n<=$Dim[$i+1]; $n++ ) $cBasura .= mb_chr($n);
$cLongBasura = mb_strlen($cBasura);
$cBasura = str_repeat($cBasura,3);
$BasuraFin = ''; for( $n=0; $n<5; $n++ ) $BasuraFin .= $cBasura[rand(0,mb_strlen($cBasura)-1)];
$BasuraIni = ''; for( $n=0; $n<rand(10,30); $n++ ) $BasuraIni .= $cBasura[rand(0,mb_strlen($cBasura)-1)];
if( $On ){
$nClave = base64_encode(gzcompress($oClave));
$ClaveOfuscada = '';
$i=0;
for( $n=0; $n<mb_strlen($nClave); $n++ ){
$pb = 0;
$pc = 0;
if( eSubstrCount($cBasura,$BasuraFin[$i])>0 ){
$pb = mb_strpos($cBasura,$BasuraFin[$i]);
if( eSubstrCount($cBasura,$nClave[$n])>0 ){
$pc = mb_strpos($cBasura,$nClave[$n]);
}
}
$ClaveOfuscada .= mb_substr( str_repeat($cBasura,3), $pb+$pc, 1 );
if( ++$i>4 ) $i = 0;
}
$Long = str_pad( dechex(mb_strlen($ClaveOfuscada)), 2, "0", STR_PAD_LEFT );
$LongOfuscada = '';
$i=0;
for( $n=0; $n<mb_strlen($Long); $n++ ){
$pb = 0;
$pc = 0;
if( eSubstrCount($cBasura,$BasuraFin[$i])>0 ){
$pb = mb_strpos($cBasura,$BasuraFin[$i]);
if( eSubstrCount($cBasura,$Long[$n])>0 ){
$pc = mb_strpos($cBasura,$Long[$n]);
}
}
if( $pb>0 && $pc>0 ){
$LongOfuscada .= mb_substr( str_repeat($cBasura,3), $pb+$pc, 1 );
}else{
$LongOfuscada .= $Long[$n];
}
if( ++$i>4 ) $i = 0;
}
$Resultado = $BasuraIni.$ClaveOfuscada.$LongOfuscada.$BasuraFin;
return $Resultado;
}else{
$Resultado = $oClave;
$BasuraFin = mb_substr($Resultado,-5);
$LongOfuscada = mb_substr($Resultado,-7,2);
$LongLibre = '';
$i=0;
for( $n=0; $n<mb_strlen($LongOfuscada); $n++ ){
$pb = 0;
$pc = 0;
if( eSubstrCount($cBasura,$BasuraFin[$i])>0 ){
$pb = mb_strpos($cBasura,$BasuraFin[$i]);
if( eSubstrCount($cBasura,$LongOfuscada[$n])>0 ){
$pc = mb_strpos($cBasura,$LongOfuscada[$n]);
}
}
$p = $cLongBasura+($pc-$pb);
$LongLibre .= $cBasura[$p];
if( ++$i>4 ) $i = 0;
}
$LongLibre = hexdec($LongLibre);
$oClave = mb_substr($Resultado,-$LongLibre-7,-5-2);
$nClave = '';
$i=0;
for( $n=0; $n<mb_strlen($oClave); $n++ ){
$pb = 0;
$pc = 0;
if( eSubstrCount($cBasura,$BasuraFin[$i])>0 ){
$pb = mb_strpos($cBasura,$BasuraFin[$i]);
if( eSubstrCount($cBasura,$oClave[$n])>0 ){
$pc = mb_strpos($cBasura,$oClave[$n]);
}
}
$p = $cLongBasura+($pc-$pb);
$nClave .= $cBasura[$p];
if( ++$i>4 ) $i = 0;
}
$oClave = gzuncompress(base64_decode($nClave));
return $oClave;
}
}
?>