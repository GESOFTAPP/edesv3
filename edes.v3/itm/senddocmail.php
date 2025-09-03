<?PHP
function eSendDocByMail( $File, $OriFichero, $_TReg, $_SubModo, $_TITLETOEXTRACT ){
$File = str_replace('\\','/',eScript($File));
$tmpN = explode('/',$File);
$NomFile = $tmpN[count($tmpN)-1];
$Dir = mb_substr($File,0,mb_strlen($File)-mb_strlen($NomFile));
$tmpE = explode('.',$NomFile);
$Ext = $tmpE[count($tmpE)-1];
$NewFile = 'Doc·'.date('H·i·s').'.'.$Ext;
$nNewFile = str_replace( $NomFile, $NewFile, $File );
rename( eScript($File), eScript($nNewFile) );
if( mb_substr($Dir,0,2)=='..' ) $Dir = mb_substr($Dir,2);
SESS::$tmp['_PassToMail'] = $_POST['_doc_password_'];
$EMailTo = '';
if( $_POST['_doc_to_int_']>0 ) $EMailTo = '&_email_user='.$_POST['_doc_to_int_'];
if( $_POST['_email_to_ext_']!='' ) $EMailTo = '&mail_to='.$_POST['_email_to_ext_'];
$url = 'edes.php?Fa:$a/d/email.edf&_FileToMail='."{$NewFile}&_PathToMail={$Dir}{$EMailTo}";
eContextUrl($url);
eInit();
?>
<script type="text/javascript">
try{window.frameElement.WOPENER.eHideBusy();}catch(e){};
top.eSWOpen(window, '<?=$url?>');
</script>
<?PHP
eEnd();
}
?>