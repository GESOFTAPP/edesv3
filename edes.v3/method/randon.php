<?PHP
$randon = function($length){             // $CodError = mb_chr(rand(65,90)).mb_chr(rand(65,90)).mb_chr(rand(65,90));
if( !function_exists("_randonGetFrom") ){
function _randonGetFrom($fromCode){ //new
$createCharset = "";
if( gettype($fromCode)=="string" && $fromCode[0]=="/" && substr($fromCode,-1)=="/" ){ // si es una expresión regular
for($n=32; $n<256; $n++){
$chr = chr($n);
if( preg_match($fromCode, $chr) ){
$createCharset .= $chr;
}
} // echo "charset[{$createCharset}]<hr>";
return $createCharset;
}
return $fromCode;
}
}
if( gettype($length)=="string" ){                            //new - retorna si la cadena con crc es un crc bueno
$txt = strrev(mb_substr(md5(mb_substr($length,0,-3)), -6, -3));
return mb_substr($length,-3)==mb_substr($txt,-3);
}
$txt = "";
for($pArg=0; $pArg<func_num_args(); $pArg+=3){
$leng = func_get_arg($pArg);
if( gettype($leng)=="string" ){             // añade una constante
if( $leng=="crc" ){
$txt .= strrev(mb_substr(md5($txt), -6, -3));
break;
}
$txt .= $leng;
$pArg-=2;
continue;
}else if( gettype($leng)=="array" ){        // longitud aleatoria entre mínimo y máximo
$leng = rand($leng[0], $leng[1]);
}
$from = _randonGetFrom(func_get_arg($pArg+1));
if( gettype($from)=="string" ){             // el string está definido
$to = mb_strlen($from)-1;
if( $to==0 ){                           // el string es desde un chr a otro chr
$iChr = mb_ord($from);
$eChr = mb_ord(func_get_arg($pArg+2));
$from = "";
for($i=$iChr; $i<=$eChr; $i++){
$from .= mb_chr($i);
}
$to = mb_strlen($from)-1;
$pArg++;
}
for($i=0; $i<$leng; $i++){
$txt .= mb_substr($from, rand(0,$to), 1);
}
$pArg--;
continue;
}
$to = func_get_arg($pArg+2);
for($i=0; $i<$leng; $i++){                  // string de $fromCode al $toCode
$txt .= mb_chr(rand($from, $to));
}
}
return $txt;
}
?>