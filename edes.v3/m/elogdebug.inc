<?php
if( mb_substr($txt,0,7)=='ERROR:[' ){
$bak = ob_get_contents();
ob_end_clean();
ob_start();
debug_print_backtrace();
$bakDebug = ob_get_contents();
ob_end_clean();
ob_start();
echo $bak;
$dim = explode("\n",$bakDebug);
$res = [];
$nomLabel = '';
$i = 0;
for($n=2; $n<count($dim); $n++){
if( trim($dim[$n])!='' && eSubstrCount($dim[$n], '/edes.v3/')==0 ){
$res[] = str_repeat(' ', 22)."#".($i++).' '.mb_substr($dim[$n],4);
if( $i==1 && eSubstrCount($dim[$n], '/_tmp/lcl/'.S::$_User.'_')>0 ){
$file = '../_tmp/lcl/'.S::$_User.'_'.eMid($dim[$n], '/_tmp/lcl/'.S::$_User.'_', ":");
if( file_exists($file) ){
$file = file($file);
$file = trim(explode(REM, $file[0])[1]);
$nomLabel = trim(ucfirst($file));
if( $nomLabel!='' ){
$nomLabel = " Label[".str_replace("_",":",$nomLabel)."]";
$numLinea = explode(':', mb_substr($dim[$n],0,-1));
$numLinea = trim($numLinea[count($numLinea)-1]);
if( $numLinea!='' ){
$nomLabel .= ' Line['.$numLinea.']';
}
}else{
$nomLabel = '';
}
}
}
}
}
$bakDebug = implode("\n", $res);
$txt = $txt.$nomLabel."\n".$bakDebug;
}
error_log(
str_pad(number_format(eGetMicroTime()-$GLOBALS['_eLogMicroTime'] ,2,',',''), 6, ' ', STR_PAD_LEFT).
str_pad(number_format(eGetMicroTime()-$GLOBALS['_eLogEMicroTime'],4,',',''), 8, ' ', STR_PAD_LEFT).
" {$txt}\n", 3, '../_tmp/log/sql.'.S::$_User
);
$GLOBALS['_eLogEMicroTime'] = eGetMicroTime();
?>