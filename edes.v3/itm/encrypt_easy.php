<?php
class encryptHex {
static function off($str, $key){
$key = explode(",", $key);
$dim = self::str2Number($str);
for($i=0; $i<count($dim); $i++){
$dim[$i] -= $key[$i]*1;
if( $dim[$i]<0 ){
$dim[$i] -= floor($dim[$i]/16)*16;
}
}
$pass = self::number2Str($dim);
return $pass;
}
static function key($leng=32){
$key = [];
for($i=0; $i<$leng; $i++){
array_push($key, rand(1, 15));
}                                                   //eTrace(implode(",", $keyPublic)); echo "<hr>";
return implode(",", $key);
}
static function str2Number($s){
$a=[];
for($i=0; $i<mb_strlen($s); $i++){
$a[$i] = hexdec($s[$i]);
}
return $a;
}
static function number2Str($a){
$s='';
for($i=0; $i<count($a); $i++){
$s .= dechex($a[$i]);
}
return $s;
}
static function javascriptOn(){         // genera la funcionn para encriptar
?>
function encryptHex(str, key){
function str2Number(s){
var a=[], i;
for(i in s) a.push(parseInt(s[i], 16));
return a;
}
var dim = str2Number(str), newStr = "", i;
key = key.split(",");
for(i=0; i<dim.length; i++){
dim[i] += key[i]*1;
dim[i]  = dim[i].toString(16);
newStr += dim[i].substr(dim[i].length-1);
}
return newStr;
}
<?php
}
}
?>