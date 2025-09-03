<?php
for($n=0; $n<count($_RANDOM); $n++){
echo "S(':{$_RANDOM[$n][0]}').attr('eRandom',1);";
if( $_RANDOM[$n][3]!="" ){
$tmp = preg_split('/(<>|<=|>=|!=|<|>|===|==|=)/u', $_RANDOM[$n][3], null, PREG_SPLIT_DELIM_CAPTURE);
$tmp[2] = trim($tmp[2]);
if( !(is_numeric($tmp[2]) || $tmp[2][0]=="'" || $tmp[2][0]=='"') ){
echo "S(':{$_RANDOM[$n][0]}').attr('eRandomWhere','{$tmp[2]}');";
}
}
}
?>