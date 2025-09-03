<?PHP
ckWebShell = function($file, $view=false){
$found1 = array();
$found2 = array();
$found3 = array();
$open  = 0;
$close = 0;
$ret = exec("grep -isb '<".'?PHP'."' {$file}", $found1,  $retval);
if( $ret===false ) die('Error SYS::$checkWebShell');
$open += count($found1);
$ret = exec("grep -sb '<".'?='	 ."' {$file}", $found2,  $retval);
if( $ret===false ) die('Error SYS::$checkWebShell');
$open += count($found2);
if( $open==0 ){
return true;
}
$ret = exec("grep -sb '?".'>'	 ."' {$file}", $found3,  $retval);
if( $ret===false ) die('Error SYS::$checkWebShell');
$close += count($found3);
$found = array_merge($found1, $found2, $found3);
$dim = array();
for($n=0; $n<count($found); $n++){
list($pos) = explode(":", $found[$n]);
$found[$n] = str_pad($pos, 10, "0", STR_PAD_LEFT).substr($found[$n],strlen($pos));
$dim[$found[$n]] = 1;
}
unset($found);
ksort($dim);
if( $view ){
$size = number_format(filesize($file), 0, '', '.');
echo "<b>{$file}</b> {$size} bytes <span title='open/close'>({$open}/{$close})</span><br>\n";
foreach($dim as $k=>$v){
echo highlight_string($k, true)."<br>\n";
}
}
return false;
}
?>