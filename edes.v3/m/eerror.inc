<?PHP
$buffer = ob_get_contents();
ob_end_clean();
ob_start();
debug_print_backtrace();
$trace = "\t".str_replace(CHR10, CHR10."\t", trim(ob_get_contents()));
ob_end_clean();
ob_start();
$request = "";
if( !empty($_SERVER["REQUEST_URI"]) ){
$request = $_SERVER["REQUEST_URI"];
}
$tab = "\t";
$codErr = mb_chr(rand(65,90)).mb_chr(rand(65,90)).mb_chr(rand(65,90)).mb_chr(rand(65,90));
$LogTxt = date('Y-m-d H:i:s')."\n".
$tab.'User......: '.(S::$_User ?? "")."\n".
$tab."Error.....: [{$codErr}] {$Error}.\n".
$tab.'RequestURI: '.explode("edes.php?", $request."edes.php?")[1]."\n".
$trace."\n";
eErrorToFile($LogTxt);
eInit();
if( !isset($GLOBALS["_Development"]) || !$GLOBALS["_Development"] ){
die("Error[{$codErr}]");
}
$LogTxt = "<pre>{$LogTxt}</pre>";
die(str_replace("\n", "<br>", $LogTxt));
?>