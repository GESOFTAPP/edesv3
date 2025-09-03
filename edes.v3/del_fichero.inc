<?PHP
function BorraFicheros($dir, $nDias, $Ext='', $VerDatos=false, $LosMenores=true){
if( mb_strlen((string)$nDias)!=19 ){
$nSg = $nDias*24*60*60;
$ayer = date('YmdHis', time()-$nSg);
}else{
$ayer = str_replace('-', '', $nDias);
$ayer = str_replace('/', '', $ayer);
$ayer = str_replace(':', '', $ayer);
$ayer = str_replace(' ', '', $ayer);
}
if( $VerDatos ){
eTron("");
eTron(formatCDI($ayer).' DIR:'.$dir.' - Borrar menores de '.$nDias.' dias');
}
$uDir = opendir($dir);
while( $uFile=readdir($uDir) ){
if( ($uFile=='.') || ($uFile=='..') || is_dir($dir.'/'.$uFile) ) continue;
if( $Ext!='' ){
if( mb_substr($uFile, mb_strrpos($uFile,'.')+1)!=$Ext ) continue;
}
$file = date("YmdHis", filemtime($dir.'/'.$uFile));
if( $VerDatos ) eTron(formatCDI($file).' '.$uFile);
if( $LosMenores ){
if( $file<$ayer ){
if( $VerDatos ) eTron('        ** Delete');
@unlink($dir.'/'.$uFile);
}
}else{
if( $file>$ayer ){
if( $VerDatos ) eTron('        ** Delete');
@unlink($dir.'/'.$uFile);
}
}
}
closedir($uDir);
}
function formatCDI($txt){
$dim = str_split($txt, 2);
return $dim[0].$dim[1]."-".$dim[2]."-".$dim[3]." ".$dim[4].":".$dim[5].":".$dim[6];
}
?>