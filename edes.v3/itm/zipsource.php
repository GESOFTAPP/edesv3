<?PHP
function _zipSource($file, $ElPuntoEsRem=false){
$buffer = file_get_contents($file);
$EnFields = false;
$Dim = explode(CHR10, $buffer);
$txt = '';
for($n=0; $n<count($Dim); $n++){
$Dim[$n] = trim($Dim[$n]);
if( $Dim[$n][0]=='.' && $ElPuntoEsRem ){
}else if( $Dim[$n][0]=='/' && $Dim[$n][1]=='/' ){
}else if( $Dim[$n][0]=='/' && $Dim[$n][1]=='*' ){
for($i=$n+1; $i<count($Dim);$i++){
$Dim[$i] = trim($Dim[$i]);
if( $Dim[$i][0]=='*' && $Dim[$i][1]=='/' ){
$n=$i;
break;
}
}
}else if( $Dim[$n]=='' ){
}else if( eSubstrCount($Dim[$n], '<<<eof')>0 ){
$txt .= $Dim[$n].CHR13.CHR10;
for($i=$n+1; $i<count($Dim); $i++){
$txt .= $Dim[$i];
if( mb_substr($Dim[$i],0,4)=='eof;' ) break;
}
$n = $i;
}else if( $Dim[$n][0]=='[' ){
$EnFields = false;
$i = mb_strpos($Dim[$n],']');
$Etiqueta = mb_strtoupper(mb_substr($Dim[$n], 1, $i-1));
$ElPuntoEsRem = ($Etiqueta<>'CSSADD');
$Iz = mb_substr($Dim[$n],0,$i+1);
$De = mb_substr($Dim[$n],$i+1);
$tmp = explode('|',$De);
$nDe = '';
for($i=0; $i<count($tmp); $i++){
if( $i>0 ) $nDe .= '|';
$nDe .= trim($tmp[$i]);
}
$Dim[$n] = $Iz.$nDe;
if( $Etiqueta=='NOTE' ){
break;
}else if( $Etiqueta=='EXIT' ){
$txt .= $Dim[$n];
break;
}else if( eSubstrCount(',LOADSEL,LOADINI,DEBUG,GPFIELDS,LOCKFILE,SAVEFORM,TEMPLATE,', ",{$Etiqueta},")==1 ){
}else{
$txt .= $Dim[$n].CHR13.CHR10;
if( $Etiqueta == 'FIELDS' ) $EnFields = true;
}
}else{
if( $EnFields ){
$tmp = explode('|',$Dim[$n]);
$nDe = '';
for( $i=0; $i<count($tmp); $i++ ){
if( $i>0 ) $nDe .= '|';
$nDe .= trim($tmp[$i]);
}
$Dim[$n] = $nDe;
}
if( eSubstrCount($Dim[$n],REM)>0 ){
list($Dim[$n]) = explode(REM, $Dim[$n]);
}
if( eSubstrCount($Dim[$n],'/'.'*')>0 && eSubstrCount($Dim[$n],'*'.'/')>0 ){
$ini = mb_strpos($Dim[$n],'/'.'*')+1;
$fin = mb_strpos($Dim[$n],'*'.'/',$ini);
$Dim[$n] = mb_substr($Dim[$n], $ini, $fin-$ini);
}
$txt .= $Dim[$n].CHR13.CHR10;
}
}
return $txt;
}
?>