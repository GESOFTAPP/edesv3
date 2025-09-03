<?PHP
eInclude("message");
$ApplicationName = eFileGetVar('System.ApplicationName');
$EMailSystem = SETUP::$System['EMailSystem'];
if( $EMailSystem=="" ){
eMessage('ERROR: Falta definir el email del sistema en "group.var->System->EMailSystem"', "HSE");
}
$txt = "Empresa: ".$ApplicationName;
$email = SESS::$_UserEMail;
if( eMail($email, 'PRUEBA ENVIO DE EMAIL', $txt, $EMailSystem) ){
eMessage("Prueba de EMail a ".SESS::$_UserEMail, "HS");
}else{
eMessage("ERROR: En prueba de EMail", "HSE");
}
?>