<?PHP
$removeRem = function($txt, $isEDF=false){
$matches = [];
preg_match_all('/\/\*(.*?)\*\//msu', $txt, $matches, PREG_OFFSET_CAPTURE);
for($i=count($matches[0])-1; $i>=0; $i--){
$pos = $matches[0][$i][1];
$leng  = mb_strlen($matches[0][$i][0]);
$txt = mb_substr($txt,0,$pos).mb_substr($txt,$pos+$leng);
}
$pIni = mb_strrpos($txt, "<!"."--");
$pEnd = mb_strrpos($txt, "--".">", $pIni);
while($pIni!==false & $pEnd!==false){
$txt = mb_substr($txt,0,$pIni).mb_substr($txt,$pEnd+3);
$pIni = mb_strrpos($txt, "<!"."--");
$pEnd = mb_strrpos($txt, "--".">", $pIni);
}
$dim = explode("\n", $txt);
$newDim = [];
for($i=0; $i<count($dim); $i++){
$txt = trim($dim[$i]);
if( mb_substr($txt,0, mb_strlen(REM))==REM ){
continue;
}
$newDim[] = $dim[$i];
}
$txt = implode("\n", $newDim);
if( !$isEDF ){
return $txt;
}
$matches = [];
preg_match_all('/\n(\[Note\]|\[Exit\])/miu', $txt, $matches, PREG_OFFSET_CAPTURE);
if( count($matches[0]) ){
$txt = mb_substr($txt, 0, $matches[0][0][1]);
}
return $txt;
}
?>