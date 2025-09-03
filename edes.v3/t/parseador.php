<?php
function Parsear($script, $code){
while( eSubstrCount($code, '/'.'*')>0 && eSubstrCount($code, '*'.'/')>0 ){
$i = mb_strpos($code, '/'.'*');
$f = mb_strpos($code, '*'.'/', $i);
$izq = mb_substr($code, 0, $i);
$dch = mb_substr($code, $f+2, mb_strlen($code));
$code = $izq.$dch;
}
$tmp = explode("\n", $code);
$dim = [];
$linea = '';
for($n=0; $n<count($tmp); $n++){
$txt = trim($tmp[$n]);
if( $txt=='' ) continue;
if( $txt[0]=='/' && mb_substr($txt,0,2)==REM ) continue;
$i = 0;
while( ($p = mb_strpos($txt, REM, $i))!==false ){
if( preg_match('/^(:|\\\)$/u', mb_substr($txt, $p-1,1)) ){
$i = $p+1;
continue;
}
$txt = trim(mb_substr($txt, 0, $p));
}
if( mb_substr($txt,-1)=='_' && (mb_substr($txt,-2,1)==' ' || mb_substr($txt,-2,1)==mb_chr(9) || mb_substr($txt,-2,1)=='|') ){
$linea .= trim(mb_substr($txt,0,-1));
continue;
}
$linea .= $txt;
$linea = "";
}
}
Parsear($script, $code);
?>