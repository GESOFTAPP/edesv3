<?PHP
$sys = function(){
$sys = [];
$key = ["task", "cpu", "memory", "swap"];
$dim = explode("\n", shell_exec('top -b -n1'));
for($p=1; $p<=4; $p++){
$line = str_replace(
[". ", "%" , ",", "Mem :", "cached Mem", "avail Mem", "Tasks:" , "buff/cache"]
,[" " , "% ", " ", "Mem:" , "cachedMem" , "availMem" , "Tasks :", "buffCache"]
,trim($dim[$p])
);
while( mb_strpos($line, "  ")!==false ){
$line = str_replace("  ", " ", $line);
}
$tmp = explode(" ", $line);
for($i=2; $i<count($tmp); $i+=2){
$sys[$key[$p-1]][$tmp[$i+1]] = (float)$tmp[$i];
}
}
return $sys;
}
?>