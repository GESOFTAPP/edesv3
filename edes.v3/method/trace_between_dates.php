<?PHP
$traceBetweenDates = function($formatShow, $ini, $end){
$calcFillCDI = function($cdi){
if( mb_strlen($cdi)==10 ){
$cdi .= " ";
}
$falta = round((20-mb_strlen($cdi))/3);
$addFill = str_repeat(":00", $falta);
if( $falta==3 ){
$addFill = mb_substr($addFill,1);
}
return $cdi.$addFill;
};
$lengCDI = mb_strlen(date($formatShow));
$result  = [];          // eTrace("Desde: ".$ini); eTrace("Hasta: ".$end); eTrace("");
$iniCDI  = $calcFillCDI($ini);
$endCDI  = $calcFillCDI($end);
$dimIni  = str_replace(array(" ",":"), "-", $ini);
$dimIni  = explode("-", $dimIni);
$dimEnd  = str_replace(array(" ",":"), "-", $end);
$dimEnd  = explode("-", $dimEnd);
$yearEnd = $dimEnd[0];
list($yearIni, $monthIni, $dayIni, $hourIni, $minuteIni, $secondIni) = $dimIni;
$tmp = str_replace(array(" ",":"), "-", $formatShow);
$dim = explode("-", $tmp);
$withYear    = in_array("Y", $dim) || in_array("y", $dim);      // Y-m-d H:i:s (y)
$withMonth   = in_array("m", $dim);
$withDay     = in_array("d", $dim);
$withHour    = in_array("H", $dim);
$withMinute  = in_array("i", $dim);
$withSeconds = in_array("s", $dim);
for($year=$yearIni; $year<=$yearEnd; $year++){
if( !$withYear ) $year = null;
for($month=$monthIni; $month<=12; $month++){
$dayEnd = S::lastDay("{$year}-{$month}-01");       // último dia del mes
if( !$withMonth ) $month = 1;
for($day=$dayIni; $day<=$dayEnd; $day++){
if( !$withDay ) $day = 1;
for($hour=$hourIni; $hour<=23; $hour++){
if( !$withHour ) $hour = 0;
for($minute=$minuteIni; $minute<=59; $minute++){
if( !$withMinute ) $minute = 0;
for($second=$secondIni; $second<=59; $second++){
if( !$withSeconds ) $second = 0;
$time = mktime(
$hour  , $minute, $second
,$month , $day   , $year
);
$actualCDI = date("Y-m-d H:i:s", $time);
if( $actualCDI>$endCDI ){
break 6;
}
$timeShow = date($formatShow, $time);
$result[] = [mb_substr($actualCDI, 0, $lengCDI), $timeShow];
if( !$withSeconds ) break;
}
$secondIni = 0;
if( !$withMinute ) break;
}
$minuteIni = 0;
if( !$withHour ) break;
}
$hourIni = 0;
if( !$withDay ) break;
}
$dayIni = 1;
if( !$withMonth ) break;
}
$monthIni = 1;
if( !$withYear ) break;
}
return $result;
}
?>