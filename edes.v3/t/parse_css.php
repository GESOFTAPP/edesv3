<?php
function _parseFileCSS($file, $op="r"){
$txt  = _parseStringCSS(file_get_contents($file), $op);
$ext  = eFileType($file);
$file = mb_substr($file, 0, -mb_strlen($ext))."css";
file_put_contents($file, $txt);
return $file;
}
function _parseStringCSS($txt, $op="r"){
$nmRule = "";
$txt = str_replace(
array(  "{"  ,   "}"  ),
array("\n{\n", "\n}\n"),
$txt
);
$line = explode("\n", $txt);
$tLines = count($line);
switch(mb_strtolower($op[0])){
case "a";       // "attributes": case "zip":
$cssMultiLine = "\n";
$ruleByLine = "\n";
break;
case "r":       // "rules":
$cssMultiLine = "\n";
$ruleByLine = "";
break;
case "z":       // "zip" / comprimido
case "c":       // "css"
case "m":       // "monoline":
default:
$cssMultiLine = "";
$ruleByLine = "";
}
$nivel = 0;
$nivelRule = array("");
$isRule[$nivel] = true;
$css = array();
$newLine = array();
for($n=0; $n<$tLines; $n++){
$txt = str_replace("\t", " ", trim($line[$n]));
$txt = trim($line[$n]);
if( empty($txt) ) continue;
if( mb_substr($txt,0,2)==REMINI ){
$pos = mb_strpos($txt, REMEND);
if( $pos===false ){
for($i=$n; $i<$tLines; $i++){
$txt = trim($line[$i]);
$line[$i] = "";
if( mb_substr($txt,-2)==REMEND ){
$n = $i;
break;
}
}
continue;
}
}
$pos = mb_strpos($txt, REMINI);
if( $pos!==false ){
$txt = trim(mb_substr($txt, 0, $pos));
if( empty($txt) ) continue;
}
$pos = mb_strpos($txt, REM);
if( $pos!==false ){
$txt = trim(mb_substr($txt, 0, $pos));
if( empty($txt) ) continue;
}
array_push($newLine, $txt);
}
$nivel = 0;
$isRule[$nivel] = true;
$line = $newLine;
$tLines = count($line);
for($n=0; $n<$tLines; $n++){
$txt = $line[$n];
if( $txt=="{" ){
$nmRule = "";
$tagParent  = explode(",", $nivelRule[$nivel-1]);
$tagCurrent = explode(",", $nivelRule[$nivel]);
for($p=0; $p<count($tagParent); $p++){
$elementParent = trim($tagParent[$p]);
if( $p>0 ) $nmRule .= ", ";
for($c=0; $c<count($tagCurrent); $c++){
if( $c>0 ) $nmRule .= ", ";
$elementCurrent = trim($tagCurrent[$c]);
$separator = ((preg_match('/^(\[|\:)$/u', $elementCurrent[0])) ? "":" ");    // Los siguientes chr los concatena juntos:  [ :
if( $elementCurrent[0]=="&" ){                                              // separador definido despues del "&"
$elementCurrent = mb_substr($elementCurrent, 1);
$separator = "";
}
if( mb_substr($elementCurrent, -1)=="&" ){                                     // el padre se coloca a la derecha en lugar de en la izquierda
$separator = " ";
$elementCurrent = rtrim(mb_substr($elementCurrent, 0, -1));
if( mb_substr($elementCurrent, -1)=="&" ){                                 // el padre del padre se coloca a la derecha en lugar de en la izquierda
$elementCurrent = rtrim(mb_substr($elementCurrent, 0, -1));
$elementParent = $nivelRule[$nivel-2];
}
$nmRule .= $elementCurrent .$separator. $elementParent;
}else{
$nmRule .= $elementParent .$separator. $elementCurrent;
}
}
}
$nmRule =  trim($nmRule);
$css[$nmRule] = array();
$nivelRule[$nivel] = $nmRule;
$nivel++;
$isRule[$nivel] = false;    // el resto anterior
}else if( $txt=="}" ){
$nivel--;
$nmRule = $nivelRule[$nivel-1];
$nivelRule[$nivel] = "";
}else if( mb_strpos($txt, ":")!==false && mb_substr($txt, -1)==";" ){ // attribute
$css[$nmRule][] = $txt;
}else if( mb_strpos($txt, ":")!==false && mb_substr($txt, -1)!==";" && mb_strpos($txt, ": ")!==false ){ // attribute
$css[$nmRule][] = $txt.";";
}else{
if( mb_strpos($txt, ":")!==false ){ // eTron(" [".$txt."]");
$attrSinFinal = false;
for($i=$n+1; $i<$tLines; $i++){ // eTron("   > ".$i.': '.$line[$i]."]");
if( mb_substr($line[$i], -1)=="," ){
break;
}
if( mb_substr($line[$i], -1)==";" ){
$attrSinFinal = true;
break;
}
if( $line[$i]=="}" ){
$attrSinFinal = true;
break;
}
if( $line[$i]=="{" ){
$attrSinFinal = false;
break;
}
$attrSinFinal = true;
break;
}
if( $attrSinFinal ){
$nRules = count($css[$nmRule]);
$css[$nmRule][$nRules] = $txt.";";
continue;
}
}
$nivelRule[$nivel] .= $txt." ";
}
}
$cssOk = array();
foreach($css as $k=>$v){
if( count($v)>0 ){
$k = preg_replace('/\s\s+/', ' ', trim($k)); //$k = preg_replace('/\s{2,}/', ' ', trim($k));
sort($v);
$cssOk[$k] = $v;
}
}
$txt = "";
foreach($cssOk as $k=>$v){
$txt .= "{$k}{{$ruleByLine}";
foreach($v as $attr=>$value){
eExplodeOne($value, ":", $iz, $dch); // para quitar los espacios enblanco alrededor del ":"
$iz = trim($iz);
$dch = trim($dch);
$txt .= "{$iz}:{$dch}{$ruleByLine}"; //echo "{$value}\n";
}
$txt .= "}{$cssMultiLine}";
}
return $txt; // retorna el css
}
?>