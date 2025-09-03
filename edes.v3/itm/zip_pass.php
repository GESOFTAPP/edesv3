<?PHP
function eZipWithPasswmb_ord($File, $OriFichero, $_TReg, $_SubModo, $_TITLETOEXTRACT){
$File = eScript($File);
$sFile = $File;
$File = str_replace('\\','/',$File);
$tmpN = explode('/',$File);
$NomFile = $tmpN[count($tmpN)-1];
$Dir = mb_substr($File,0,mb_strlen($File)-mb_strlen($NomFile));
$tmpE = explode('.',$NomFile);
$Ext = $tmpE[count($tmpE)-1];
$NomFile = mb_substr($NomFile,0,-mb_strlen($Ext)-1);
$AddFile = '';
if( $Ext=='txt' || $Ext=='csv' ) $AddFile = "{$Dir}{$NomFile}.def";
qQuery("select user_name,user_surname from {$_ENV['eDesDictionary']}gs_user where cd_gs_user=".S::$_User, $p1 );
list( $nom, $ape ) = qRow($p1);
$_UsuarioDelPDF = trim($nom).' '.trim($ape);
$_UsuarioToPDF = $_UsuarioDelPDF;
if( isset($_POST['_doc_to_']) && $_POST['_doc_to_']!='' ){
$_UsuarioToPDF = $_POST['_doc_to_'];
}
$txt  = "Usuario.....: ".$_UsuarioDelPDF."\n";
$txt .= "Destinatario: ".$_UsuarioToPDF."\n";
$txt .= "Script......: "._CodigoScript();
if( LINUX_OS ){
$ExeZip = "zip";
}else{
$ExeZip = eScript('$win/zip.exe');
}
$ExeZip .= " -P ".$_POST['_doc_password_']." -9 -j -b {$Dir} {$Dir}{$NomFile} {$Dir}{$NomFile}.{$Ext} {$AddFile}";
$NomFile = "{$Dir}{$NomFile}.zip";
@unlink( $NomFile );
$Dim = array();
exec( $ExeZip, $Dim );
@unlink( "{$Dir}{$NomFile}.{$Ext}" );
@unlink( $AddFile );
$fp = fopen($NomFile,"a+");
fputs($fp, "\n\n".base64_encode($txt));
fclose($fp);
@unlink( $sFile );
if( mb_substr($NomFile,0,2)=='..' ) $NomFile = mb_substr($NomFile,2);
if( $_POST['_SendDocByMail']==1 ){
include(DIREDES.'itm/senddocmail.php');
eSendDocByMail( $NomFile );
eEnd();
}
$url = $NomFile."&_Source={$OriFichero}&_TReg={$_TReg}&_SubMode={$_SubModo}&_Doc='{$_TITLETOEXTRACT}'";
eMessage('~'.mb_strtoupper($Ext), 'HS', '', 'try{_WOPENER.eHideBusy();}catch(e){};location.href = "edes.php?D:'.$url.'";');
eEnd();
}
?>