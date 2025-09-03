<?PHP
eCheckUser();
$di = opendir( 'css/' );
while( $file = readdir( $di ) ){
if( ($file != '.') && ($file != '..') ){
if( !is_dir($file) && mb_substr($file,-3)=='css' && mb_substr($file,-8)!='_off.css' ){
Color2Gray( 'css/'.$file );
}
}
}
closedir( $di );
function Color2Gray( $File ){
eTrace( $File );
$Dim = file($File);
$txt = '';
for( $l=0; $l<count($Dim); $l++ ){
$Linea = $Dim[$l];
$i = 0;
while( eSubstrCount(mb_substr($Linea,$i),'#')>0 ){
$p = mb_strpos($Linea,'#',$i);
if( $p===false ){
}else{
$iz = mb_substr($Linea,0,$p);
$ok=true;
$xColor = mb_strtolower(mb_substr($Linea,$p+1,6));
for( $n=0; $n<6; $n++ ){
if( eSubstrCount('0123456789abcdef',mb_substr($xColor,$n,1))==0 ){
$ok=false;
}
$i++;
}
if( $ok ){
$de = mb_substr($Linea,$p+7);
$Linea = $iz.eColorTone(mb_substr($Linea,$p,7),'','',2).$de;
}
}
$i++;
}
$txt .= $Linea;
}
$txt .= 'IMG { FILTER: gray(enabled=1); }';
file_put_contents( str_replace( '.css', '_off.css', $File ),$txt);
}
function ColorGris(	$Color ){
$r = hexdec('#'.mb_substr($Color,1,2));
$g = hexdec('#'.mb_substr($Color,3,2));
$b = hexdec('#'.mb_substr($Color,5,2));
$t = ($r+$g+$b)/3;
return '#'.dechex($t).dechex($t).dechex($t);
}
function GrayScale( $color ){
$coloresWeb = array("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f");
$color=mb_strtolower(str_replace("#","",$color));
if( mb_strlen($color)==3 ) $color =$color[0].$color[0].$color[1].$color[1].$color[2].$color[2];
$posiciones = array(
array_search($color[0],$coloresWeb,true),
array_search($color[1],$coloresWeb,true),
array_search($color[2],$coloresWeb,true),
array_search($color[3],$coloresWeb,true),
array_search($color[4],$coloresWeb,true),
array_search($color[5],$coloresWeb,true)
);
$total = 0;
foreach( $posiciones as $posicion ) $total+=$posicion;
$promedio = 0;
if( $total ) $promedio=$coloresWeb[round($total/6)];
return '#'.$promedio.$promedio.$promedio.$promedio.$promedio.$promedio;
}
function eColorTone( $r,$g="",$b="", $t ){
if( $r=='' ) return '#000000';
if( $b=='' ){
if( mb_substr($r,0,1)=='#' ) $r = mb_substr($r,1,6);
if( mb_strlen($r)==3 ) $r = mb_substr($r,0,1)+mb_substr($r,0,1).mb_substr($r,1,1).mb_substr($r,1,1).mb_substr($r,2,1).mb_substr($r,2,1);
else if( mb_strlen($r)!=6 ) return '#'.$r;
$g = hexdec(mb_substr($r,2,2));
$b = hexdec(mb_substr($r,4,2));
$r = hexdec(mb_substr($r,0,2));
}else{
$r = hexdec($r);
$g = hexdec($g);
$b = hexdec($b);
}
return( '#'.Op($r,$t).Op($g,$t).Op($b,$t) );
}
function Op( $c, $t ){
if( $t==0 ){
}else if( $t>=100 ){
$c = 0;
}else if( $t<=-100 ){
$c = 255;
}else if( $t > 0 ){
$c -= floor(($t*$c)/100);
}else{
$c += floor(($t*-(255-$c))/100);
}
$c = dechex($c); if( mb_strlen($c)!=2 ) $c = '0'.$c;
return mb_strtoupper($c);
}
?>