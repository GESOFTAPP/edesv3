<?PHP
eTron(":1::::::resultado:::::::");
$total = 0;
foreach($_GET as $k=>$v){
$total++;
}
if( $total!=1 ) exit;
$dim = explode(":", $_SERVER["QUERY_STRING"]);
$semilla = mb_substr($dim[1], 0, -2);
$op = $dim[2];
if( $dim[0]!="aa" || mb_substr($dim[1], -2)!="op" || !preg_match('/^(a|e)$/u', $op) ) exit;
eTron(":2::::::resultado:::::::");
include(__DIR__."/activate_access_func.inc");
eTron(":3::::::resultado:::::::");
$verificationMD5 = "";
$ok = eVerificationDecryptUrl(SETUP::$Login['VerificationKey'], $semilla, $verificationMD5);
eTron(":4::::::resultado:::::::".(($ok)?"OK":"KO"));
if( !$ok ){
eEnd();
}
eTron(":5::::::actionInPc::::::".$op);
$file = "../_tmp/php/{$verificationMD5}.acc";
file_put_contents($file, $op);
eTron(":6::::::actionInPc::::::".$op);
eLngLoad('/_datos/config/various.lng', '', 1);
eTron(":6::::::actionInPc::::::".$op);
echo $__Lng["VerificationEMailAnswer_{$op}"];
eEnd();
?>