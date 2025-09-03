<?PHP
$getLabel = function($file, $label, $arrayPipa=false){
$txt = file_get_contents(eScript($file));
$txt = SYS::removeRem($txt, true);
if( gettype($label)=="string" ){
if( mb_strpos($label, ",")!==false ){
$label = explode(",", str_replace(" ", "", $label));
}else{
$label = [$label];
}
}
$result = [];
$nameLabel = [];
for($i=0; $i<count($label); $i++){
$result[$label[$i]] = [];
$nameLabel[mb_strtoupper($label[$i])] = $label[$i];
}
$pregLabel = "\\[".implode("\\]|\\[", $label)."\\]";
preg_match_all('/\n?.*('.$pregLabel.').*\n*/miu', $txt, $matches, PREG_OFFSET_CAPTURE);
for($i=0; $i<count($matches[0]); $i++){
$xLine = trim($matches[0][$i][0]);
$xLabel = $matches[1][$i][0];
$leng  = mb_strlen($xLabel);                   // eTrace($i.' - '.$xLine);
if( $xLine[0]=="." ){		                // rem monolinea eDes
continue;
}
$posPipa = mb_strrpos($xLine, "|");
$posREM  = mb_strrpos($xLine, REM);
if( $posPipa!==false && $posREM!==false && $posPipa<$posREM ){
}
$xLabel = mb_substr($xLabel, 1, -1);
$xLine = trim(mb_substr($xLine, $leng));       // eTrace("       >>>    ".$xLabel.' - '.$xLine);
if( mb_substr($xLine,-1)=="_" ){
$posDesde = $matches[0][$i][1];
while( mb_substr($xLine,-1)=="_" ){
if( count(explode("|", $xLine))==7 ){   // [UploadFile] file | _check/ficheros | pk | 5000 | Seleccionar... | gif,jpg,png | pre_
break;
}
$xLine = mb_substr($xLine, 0, -1);
$posDesde =  mb_strpos($txt, "\n", $posDesde+1);
$posHasta =  mb_strpos($txt, "\n", $posDesde+1);
$addTxt = trim(mb_substr($txt, $posDesde, $posHasta-$posDesde));
$xLine .= $addTxt;
}
}
if( $arrayPipa && mb_strpos($xLine, "|")!==false ){            //toDo: S.trimArray();
$xLine = explode("|", $xLine);
$total = count($xLine);
for($n=0; $n<$total; $n++){
$xLine[$n] = trim($xLine[$n]);
}
$xLine[$total-1] = explode(REM, $xLine[$total-1].REM)[0];
$xLine[$total-1] = trim($xLine[$total-1]);
}
$result[$nameLabel[mb_strtoupper($xLabel)]][] = $xLine;
}
return $result;
}
?>