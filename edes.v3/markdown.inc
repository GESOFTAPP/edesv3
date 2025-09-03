<?PHP
function eMarkdown($txt){
$txt = trim($txt);
$respuesta = "";
$esLU = false;
$nivelLU = 0;
$dimLU = array(0,0,0,0,0,0,0,0,0,0);
$esLO = false;
$nivelLO = 0;
$dimLO = array(0,0,0,0,0,0,0,0,0,0);
$oNivelLU = 0;
$oNivelLO = 0;
$negritaYCursiva = false;
$negrita = false;
$cursiva = false;
$codigo = false;
$codigoLinea = false;
$br = false;
$esTabla = false;
$tablaAlign = array();
$tablaAlignOk = false;
$dim = explode("\n", $txt);
for($n=0; $n<count($dim); $n++){
$linea = rtrim($dim[$n]);
$lineaNSP = trim($linea);
$br = true;
$esLU = false;
$esLO = false;
if( preg_match('/^(\*\*\*|---|___|\* \* \*|- - -|_ _ _)$/u', $lineaNSP) ){
$linea = "<hr>";
$lineaNSP = $linea;
$br = false;
}
while( true ){
$ini = mb_strpos($linea, "***");
if( $ini===false ) $ini = mb_strpos($linea, "___");
if( $ini!==false ){
if( !$negritaYCursiva ){
$negritaYCursiva = true;
$linea = mb_substr($linea,0,$ini)."<b><i>".mb_substr($linea,$ini+3,mb_strlen($linea));
$lineaNSP = trim($linea);
}
}
$ini = mb_strpos($linea, "***");
if( $ini===false ) $ini = mb_strpos($linea, "___");
if( $ini!==false ){
if( $negritaYCursiva ){
$negritaYCursiva = false;
$linea = mb_substr($linea,0,$ini)."</i></b>".mb_substr($linea,$ini+3,mb_strlen($linea));
$lineaNSP = trim($linea);
}
}else{
break;
}
}
while( true ){
$ini = mb_strpos($linea, "**");
if( $ini!==false ){
if( !$negrita ){
$negrita = true;
$linea = mb_substr($linea,0,$ini)."<b>".mb_substr($linea,$ini+2,mb_strlen($linea));
$lineaNSP = trim($linea);
}
$ini = mb_strpos($linea, "**");
if( $ini!==false ){
if( $negrita ){
$negrita = false;
$linea = mb_substr($linea,0,$ini)."</b>".mb_substr($linea,$ini+2,mb_strlen($linea));
$lineaNSP = trim($linea);
}
}
}else{
break;
}
}
while( true ){
$ini = mb_strpos($linea, "*");
if( $ini!==false ){
if( !$cursiva ){
$cursiva = true;
$linea = mb_substr($linea,0,$ini)."<i>".mb_substr($linea,$ini+1,mb_strlen($linea));
$lineaNSP = trim($linea);
}
$ini = mb_strpos($linea, "*");
if( $ini!==false ){
if( $cursiva ){
$cursiva = false;
$linea = mb_substr($linea,0,$ini)."</i>".mb_substr($linea,$ini+1,mb_strlen($linea));
$lineaNSP = trim($linea);
}
}
}else{
break;
}
}
$ini = mb_strpos($linea, "~~~");
if( $ini!==false ){
if( !$codigo ){
$br = false;
$codigo = true;
$linea = mb_substr($linea,0,$ini)."<code>".mb_substr($linea,$ini+3,mb_strlen($linea));
$lineaNSP = trim($linea);
}
}
$ini = mb_strpos($linea, "~~~");
if( $ini!==false ){
if( $codigo ){
$br = false;
$codigo = false;
$linea = mb_substr($linea,0,$ini)."</code>".mb_substr($linea,$ini+3,mb_strlen($linea));
$lineaNSP = trim($linea);
}
}
$ini = mb_strpos($linea, "`");
if( $ini!==false ){
if( !$codigoLinea ){
$br = false;
$codigoLinea = true;
$linea = mb_substr($linea,0,$ini)."<code>".mb_substr($linea,$ini+1,mb_strlen($linea));
$lineaNSP = trim($linea);
}
}
$ini = mb_strpos($linea, "`");
if( $ini!==false ){
if( $codigoLinea ){
$br = true;
$codigoLinea = false;
$linea = mb_substr($linea,0,$ini)."</code>".mb_substr($linea,$ini+1,mb_strlen($linea));
$lineaNSP = trim($linea);
}
}
if( $lineaNSP[0]=="-" || $lineaNSP[0]=="*" || $lineaNSP[0]=="+" ){
$br = false;
$esLU = true;
$nivelLU = mb_strlen($linea)-mb_strlen($lineaNSP);
$linea = "<li>".mb_substr($linea,1+$nivelLU,mb_strlen($linea))."</li>";
if( $nivelLU>0 ) $nivelLU = $nivelLU/4;
for($i=$nivelLU+1; $i<=$oNivelLU; $i++){
$dimLU[$i] = 0;
$linea = "</ul>".$linea;
}
if( $dimLU[$nivelLU]==0 ){
$linea = "<ul>".$linea;
$dimLU[$nivelLU] = 1;
}
$oNivelLU = $nivelLU;
}else{
for($i=0; $i<10; $i++){
if( $dimLU[$i]==1 ){
$dimLU[$i] = 0;
$linea .= "</ul>";
$br = false;
}
}
}
if( mb_substr($lineaNSP,1,1)=="." && is_numeric($lineaNSP[0]) ){
$br = false;
$esLO = true;
$nivelLO = mb_strlen($linea)-mb_strlen($lineaNSP);
$linea = "<li>".mb_substr($linea,2+$nivelLO,mb_strlen($linea))."</li>";
if( $nivelLO>0 ) $nivelLO = $nivelLO/4;
for($i=$nivelLO+1; $i<=$oNivelLO; $i++){
$dimLO[$i] = 0;
$linea = "</ol>".$linea;
}
if( $dimLO[$nivelLO]==0 ){
$linea = "<ol>".$linea;
$dimLO[$nivelLO] = 1;
}
$oNivelLO = $nivelLO;
}else{
for($i=0; $i<10; $i++){
if( $dimLO[$i]==1 ){
$dimLO[$i] = 0;
$linea .= "</ol>";
$br = false;
}
}
}
for($i=6; $i>0; $i--){
if( mb_substr($linea,0,$i)==str_repeat("#",$i) ){
$linea = "<h{$i}>".mb_substr($linea,$i,mb_strlen($linea))."</h{$i}>";
$br = false;
}
}
if( $lineaNSP[0]=="|" && mb_substr($lineaNSP,-1)=="|" ){
$br = false;
$tmp = explode("|", $lineaNSP);
$bak = "";
if( !$esTabla ) $bak = "<table>";
$okTR = 0;
for($i=1; $i<count($tmp)-1; $i++){
$tmp[$i] = trim($tmp[$i]);
if( $tmp[$i][0]=="-" || mb_substr($tmp[$i],1,1)=="-" ) $okTR++;
if( !$tablaAlignOk ){
switch( $tmp[$i][0].mb_substr($tmp[$i],-1) ){
case '::':
$tablaAlign[$i] = " style='text-align:center'";
break;
case '-:':
$tablaAlign[$i] = " style='text-align:right'";
break;
case ':-':
$tablaAlign[$i] = " style='text-align:left'";
break;
default:
$tablaAlign[$i] = "";
}
}
}
if( $okTR<>(count($tmp)-2) ){
$bak .= "<tr>";
for($i=1; $i<count($tmp)-1; $i++){
if( !$esTabla ){
$bak .= "<th>".$tmp[$i]."</th>";
}else{
$bak .= "<td".$tablaAlign[$i].">".$tmp[$i]."</td>";
}
}
$bak .= "</tr>";
}else{
$tablaAlignOk = true;
}
$linea = $bak;
$esTabla = true;
}else if( $esTabla ){
$linea = "</table>".$linea;
$esTabla = false;
$tablaAlignOk = false;
}
$ini = mb_strpos($linea, "![") && mb_strpos($linea, "](");
if( $ini!==false ){
$desde = mb_strpos($linea, "[", $ini);
$fin = mb_strpos($linea, "]", $ini);
$alt = mb_substr($linea, $desde+1, $fin-$desde-1);
if( $alt<>"" ) $alt = " alt='".str_replace("'", "&#39;", $alt)."'";
$desde = mb_strpos($linea, "(", $ini);
$fin = mb_strpos($linea, ")", $ini);
$img = mb_substr($linea, $desde+1, $fin-$desde-1);
$linea = mb_substr($linea,0,$ini)."<img src='{$img}'{$alt}>".mb_substr($linea, $fin+1, mb_strlen($linea)+1);
$lineaNSP = trim($linea);
}
$ini = mb_strpos($linea, "[") && mb_strpos($linea, "](");
if( $ini!==false ){
$desde = mb_strpos($linea, "[", $ini);
$fin = mb_strpos($linea, "]", $ini);
$alt = mb_substr($linea, $desde+1, $fin-$desde-1);
$desde = mb_strpos($linea, "(", $ini);
$fin = mb_strpos($linea, ")", $ini);
$href = mb_substr($linea, $desde+1, $fin-$desde-1);
$linea = mb_substr($linea,0,$ini)."<a href='{$href}'>{$alt}</a>".mb_substr($linea, $fin+1, mb_strlen($linea)+1);
$lineaNSP = trim($linea);
}
$respuesta .= $linea;
if( $br ) $respuesta .= "<br>";
}
return $respuesta;
}
?>