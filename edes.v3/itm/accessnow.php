<?php
function accessNow($schedule){
$trace = false;
$user = S::$_User;
$node = SESS::$_Node;
$webMaster  = ((empty(SESS::$_WebMaster) || SESS::$_WebMaster==$_ENV['OFF'] ) ? "" : "w");
$systemUser = ((empty(SESS::$_D_)) ? "" : "s");
list($year, $month, $day, $hour, $minute, $nWeekday) = explode(",", date("Y,m,d,H,i,w"));
$date	 = "{$year}-{$month}-{$day}";
$dayName = ["su", "mo", "tu", "we", "th", "fr", "sa"];
$weekday = $dayName[$nWeekday];
include("../_datos/config/workinghours.ini");
for($i=0; $i<count($schedule); $i++){
$youCanEnter = true;
foreach($schedule[$i] as $k=>$v){
$k = mb_strtolower($k);
if( $k!="noaccess" && $k!="access" && $k!="group" ){
if($trace) eTrace($k.' = '.$v);
}else{
if($trace) eTrace($k.' =');
}
if( gettype($v)=="string" ){
$v = trim($v);
if( empty($v) ){
continue;
}
if( $k!="noaccess" && $k!="access" && $k!="message" ){
$v = str_replace(" ", "", $v);
}
if( !empty($_ENV['eDesDictionary']) ){
$v = str_replace(" gs_user ", " {$_ENV['eDesDictionary']}gs_user ", $v);
}
}
switch( $k ){
case "usertype":
$dim = explode(",", $v);
if( !empty($webMaster) && in_array($webMaster, $dim) ){
break;
}
if( !empty($systemUser) && in_array($systemUser, $dim) ){
break;
}
if($trace) eTrace("ERROR: {$k}");
$youCanEnter = false;
break 2;
case "weekday":
if( !in_array($weekday, explode(",", mb_strtolower($v))) ){
if($trace) eTrace("ERROR: {$k}");
$youCanEnter = false;
break 2;
}
break;
case "time":
list($hFrom, $hTo) = explode("-", $v);
if( "{$hour}:{$minute}">=$hFrom && "{$hour}:{$minute}"<=$hTo ){
break;
}
if($trace) eTrace("ERROR: {$k}");
$youCanEnter = false;
break 2;
case "date":
list($dFrom, $dTo) = explode("-", $v);
if( "{$month}/{$day}">=$dFrom && "{$month}/{$day}"<=$dTo ){
break;
}
if($trace) eTrace("ERROR: {$k}");
$youCanEnter = false;
break 2;
case "recuest":
if( $v==0 ){
if($trace) eTrace("ERROR: {$k}");
return false;
}
if( $v!=-1 ){
list($maxAccess, $perMinutes) = explode(",", $v);
$cdi = date(
"Y-m-d H:i:s"
, mktime(
date("H"), date("i")-$perMinutes, date("s")
,date("m"), date("d"), date("Y")
)
);
qQuery("select count(*) from {$_ENV['eDesDictionary']}gs_acceso where cdi>'{$cdi}'", $pnt);
if( qRow($pnt)[0]>=$maxAccess ){
if($trace) eTrace("ERROR: {$k}");
return false;
}
}
break;
case "noaccess":
case "access":
if( gettype($v)=="string" ){
$v = [$v];
}
for($n=0; $n<count($v); $n++){
$v[$n] = trim($v[$n]);
if($trace) eTrace(" : ".$v[$n]);
qQuery($v[$n], $pnt);
$total = qRow($pnt)[0];
if( $k=="noaccess" && $total>0 ){
if($trace) eTrace("ERROR: {$k}");
return false;
}
if( $k=="access" && $total==0 ){
if($trace) eTrace("ERROR: {$k}");
$youCanEnter = false;
break 2;
}
}
break;
case "ip":
if( !empty($_SERVER['HTTP_CLIENT_IP']) ){
$ip = $_SERVER['HTTP_CLIENT_IP'];
}elseif( !empty($_SERVER['HTTP_X_FORWARDED_FOR']) ){
$ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
}else{
$ip = $_SERVER['REMOTE_ADDR'];
}
$dim = explode(",", $v);
for($n=0; $n<count($dim); $n++){
$v = $dim[$n];
if( $v==mb_substr($ip, 0, mb_strlen($v)) ){
if($trace) eTrace("ip {$v} dentro del rango {$ip}");
break 2;
}
}
break;
case "group":
$youCanEnter = false;
if($trace) eTrace("::::nuevo grupo");
$schedule = $v;
$i = -1;
break 2;
case "message":
$message = $v;
break;
default:
if($trace) eTrace("ERROR en schedule.php: {$k} = {$v}");
eMessage("ERROR en schedule.php: {$k} = {$v}", "HSE");
}
}
if( $youCanEnter ){
if($trace) eTrace(">>> ENTRAR");
return true;
}
if($trace) echo "<hr>";
}
if($trace) eTrace(">>> NO ENTRAR");
return false;
}
?>