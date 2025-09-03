<?PHP
eTrace("Unload: gs_icon.unl : "._ExportGsStorage("gs_icon"));
eTrace("Unload: gs_storage.unl : "._ExportGsStorage("gs_storage"));
function _ExportGsStorage($tabla){
qQuery("select * from {$tabla}", $pnt);
$fd = fopen(DIREDES."web/edesweb/{$tabla}.unl", 'w');
$TReg = 0;
$Pipa = false;
while( $linea=qRow($pnt) ){
$txt = '';
if( $Pipa ) $txt .= "\n";
$Pipa = false;
foreach($linea as $valor){
if( $Pipa ){
$txt .= '|';
}else{
$Pipa = true;
}
$valor = str_replace(CHR10, '{&#10;}', $valor);
$valor = str_replace(CHR13, '{&#13;}', $valor);
$valor = str_replace('"', '&quot;', $valor);
$valor = str_replace('|', '{&#124;}', $valor);
$txt .= trim((string)$valor);
}
fputs($fd, $txt);
$TReg++;
}
fclose($fd);
return $TReg;
}
?>