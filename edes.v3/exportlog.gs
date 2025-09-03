<?PHP
if( !function_exists('zip_open') ){
?>
<script type="text/javascript">
top.eInfoError( window.frameElement.WOPENER, 'Falta instalar la librería ZIP', 5 );
</script>
<?PHP
eEnd();
}
if( !function_exists('qQuery') ){
eval(qSetup());
include_once(DIREDES.$_Sql.'.inc');
}
qQuery( "select * from {$_ENV['eDesDictionary']}gs_acceso where num_acceso={$_GET['FILE']}" );
$r=qArray();
if( $r['cdi']=='' || SETUP::$LogDownload['LogFileDownload']=='' ){
eTrace('ERROR');
exit;
}
$CodFile = $r['num_acceso'];
$sFile = SETUP::$LogDownload['LogFileDownload'].$CodFile.'.zip';
if( !file_exists($sFile) ){
?>
<script type="text/javascript">
top.eInfoError(window.frameElement.WOPENER, 'Fichero no encontrado', 5 );
</script>
<?PHP
eEnd();
}
$Dir = '../_tmp/zip/';
if( LINUX_OS ){
$ExeZip = "unzip -d {$Dir} ".$sFile;
}else{
$ExeZip = eScript('$win/unzip.exe')." -d {$Dir} ".$sFile;
}
$Dim = array();
$zip = zip_open($sFile);
if( !is_resource($zip) ){
exit;
}else{
$NomFile = '';
while( $entry = zip_read($zip) ){
$entries = zip_entry_name($entry);
if( mb_substr($entries,-4)!='.def' && eSubstrCount( $entries,'_info.')==0 ){
$NomFile = $entries;
break;
}
}
$sFile = '/_tmp/zip/'.$entries;
}
zip_close($zip);
exec( $ExeZip.' -l '.$NomFile, $Dim  );
$NewFile = $CodFile.mb_substr($NomFile,-4);
if( file_exists($Dir.$NewFile) ) @unlink($Dir.$NewFile);
rename( $Dir.$NomFile, $Dir.$NewFile );
if( mb_substr($NomFile,-4)=='.mdb' || mb_substr($NomFile,-4)=='.unl' ){
?>
<script type="text/javascript">
window.external.eExportToMDB( '/_tmp/zip/<?=$NewFile?>', '<?=$CodFile?>' );
top.eInfoHide();
</script>
<?PHP
}else{
$nameDoc = "Doc ".date( 'Y-m-d H:i:s', mktime( date('H'), date('i'), date('s'), date('m'), date('d'))).substr($NewFile, -4);
eJS("top.S.infoHide(top); top.S.callSrv('edes.php?D:/_tmp/zip/{$NewFile}&FILE={$nameDoc}', window);");
exit;
?>
<script type="text/javascript">
top.eFileGet( '/_tmp/zip/<?=$NewFile?>', '{dir}tmp/<?=$NewFile?>' );
top.eRun( '{dir}tmp/<?=$NewFile?>' );
top.eInfoHide();
</script>
<?PHP
}
?>
eEnd();