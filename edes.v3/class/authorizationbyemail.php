<?PHP
class AuthorizationByEmail {
static function session($input){
$sess = "";
$sha1 = "";
for($i=0; $i<80; $i+=2){
$sess .= $input[$i];
$sha1 .= $input[$i+1];
}
$sha1 = strrev($sha1);
if( $sha1!=sha1($sess) ){
return "ERROR";
}
$data = substr($input, 80);
$sessDecrypt = "";
for($i=0; $i<strlen($data); $i+=2){
$sessDecrypt .= chr(hexdec($data[$i].$data[$i+1]));
}
return strrev(base64_decode($sessDecrypt));
}
static function encrypt($sess){
$sess = str_replace("=", "", base64_encode(strrev($sess)));
$sessEncript = "";
for($i=0; $i<strlen($sess); $i++){
$sessEncript .= str_pad(dechex(ord($sess[$i])), 2, "0", STR_PAD_LEFT);
}
return AuthorizationByEmail::seed().$sessEncript;
}
static function seed(){
$keyCode = sha1("seed".(microtime(true)*2));
$sha1 = strrev(sha1($keyCode));
$keyCodeCheck = "";
for($i=0; $i<40; $i++){
$keyCodeCheck .= $keyCode[$i] . $sha1[$i];
}
return $keyCodeCheck;
}
}
?>