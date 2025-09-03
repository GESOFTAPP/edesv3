<?PHP
$cdi = date('Y-m-d H:i:s');
$dim = file(DIREDES.'lng/sess_not_found.lng');
$dimLng = eNsp($dim[0]);
$dimLng = explode("," , substr($dimLng, strpos($dimLng, "]")+1 ));
$lng = array();
for($n=1; $n<count($dim); $n++){
if( empty($dim[$n]) ) continue;
$item = explode("|", $dim[$n]);
for($i=1; $i<count($item); $i++){                                                               //$lng[$dimLng[$i]."_".$item[0]] = $item[$i];  // "{"1":"foo","2":"bar","3":"baz","4":"blong"}"
array_push($lng, '"'.$dimLng[$i-1]."_".$item[0].'":"'.trim($item[$i]).'"');
}
}
@unlink($_ENV[SYS]['fileSession']);
@unlink($_ENV[SYS]['fileSession'].".seed");
eJS("
var  lng = localStorage.getItem('e-language') || 'es'
,text = JSON.parse('{".implode(",", $lng)."}')
,cdi = top.S.left(top.S.session.exitTo, 16);
text[lng+'_1'] = text[lng+'_1'].replace('#', cdi);
top.S.error('<center>'+text[lng+'_1']+'</center>');
");
exit;
?>