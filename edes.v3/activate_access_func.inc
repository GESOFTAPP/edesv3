<?PHP
function eVerificationEncryptUrl($key, $messageMD5, $sg){
$key .= "c2b31f49d58";
$sg *= 60;
$messageMD5 = eStringEncode($messageMD5);
$time     = dechex(rand(0,15)).str_pad(time()+$sg, 10, "0", STR_PAD_LEFT);
$timeMD5  = md5($time);
$checkMD5 = md5($time.$messageMD5);
$txt	  = $checkMD5.$messageMD5.$timeMD5;
$basuraLeng = 200-mb_strlen($txt);
$basura = "";
for($n=0; $n<$basuraLeng; $n++){
$basura .= dechex(rand(0,15));
}
$txt .= $basura;
for($n=0; $n<11; $n++){
$i = hexdec($key[$n])+((11-$n)*16);
$txt = mb_substr($txt,0,$i).$time[$n].mb_substr($txt,$i);
}
return $txt;
}
function eVerificationDecryptUrl($key, $txt, &$messageMD5){
$key .= "c2b31f49d58";
$newTime = "";
for($n=10; $n>=0; $n--){
$i = hexdec($key[$n])+((11-$n)*16);
$newTime .= mb_substr($txt,$i,1);
$txt = mb_substr($txt,0,$i).mb_substr($txt,$i+1);
}
$newTime    = strrev($newTime);
$timeExpire = mb_substr($newTime, 1);
$timeNow    = time();
$checkMD5   = mb_substr($txt, 0, 32);
$md5Verificacion = mb_substr($txt, 32, 32);
$timeMD5 = mb_substr($txt, 64, 32);
$res = ($timeMD5==md5($newTime) && $timeExpire>$timeNow);
$messageMD5 = eStringEncode($md5Verificacion, false);
eTrace("messageMD5: ".$txt);
eTrace("timeExpire: ".$timeExpire);
eTrace("timeNow...: ".$timeNow);
eTrace("timeChar..: ".$newTime[0]);
eTrace("checkMD5..: ".$checkMD5);
eTrace("md5Verific: ".$md5Verificacion);
eTrace("timeMD5...: ".$timeMD5);
eTrace("timeMD5...: ".md5($newTime));
eTrace("ok........: ".md5($newTime.$md5Verificacion));
eTrace("messageMD5: ".$messageMD5);
eTrace(($res ? "OK":"KO")." - ".$timeMD5."==".md5($newTime)." && ".$timeExpire.">".$timeNow);
return $res;
}
function eStringHexa($leng){
$leng++;
$hex = "";
for($i=0; $i<$leng; $i++){
$hex .= "0123456789abcdef";
}
return $hex;
}
function eEncriptMD5($messageMD5){
$hex = eStringHexa(mb_strlen($messageMD5));
$messageNew = "";
for($i=0; $i<mb_strlen($messageMD5); $i++){
$c = mb_substr($messageMD5, $i, 1);
$p = mb_strpos($hex, $c);
$newChar = mb_substr($hex, $p+$i+1, 1);
$messageNew .= $newChar;
}
return $messageNew;
}
function eDecryptMD5($messageNew){
$hex = eStringHexa(mb_strlen($messageNew));
$messageOld = "";
for($i=0; $i<mb_strlen($messageNew); $i++){
$c = mb_substr($messageNew, $i, 1);
$p = mb_strpos($hex, $c);
$newChar = mb_substr($hex, $p-$i-1, 1);
$messageOld .= $newChar;
}
return $messageOld;
}
function eStringEncode($txt, $encrypt=true){
$dim = [[48,57], [65,90], [97,122]];
$stringON = "";
for($g=0; $g<3; $g++){
for($i=$dim[$g][0]; $i<=$dim[$g][1]; $i++){
$stringON .= mb_chr($i);
}
}
$stringOFF = strrev($stringON);
if( !$encrypt ){
$bak = $stringON;
$stringON = $stringOFF;
$stringOFF = $bak;
}
$newTxt = "";
for($i=0; $i<mb_strlen($txt); $i++){
$c = mb_substr($txt, $i, 1);
$p = mb_strpos($stringON, $c);
$newChar = mb_substr($stringOFF, $p, 1);
$newTxt .= $newChar;
}
return $newTxt;
}
?>