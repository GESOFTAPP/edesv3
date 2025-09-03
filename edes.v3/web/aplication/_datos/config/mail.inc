<?PHP 
	
	/* EJEMPLO DE USO
		include(eScript('/_datos/config/mail.inc'));
		$Para = '[email]';
		$Asunto = "Prueba de ...";
		$Texto = "<h1>ESTO NO VALE PA NA</h1>";
		$De = '[email]';		//$Remite = '[email]';
		$nm_DeFrom = 'PRUEBAS IU';
		//$cc='';
		//$bcc='';
		$ArrayFiles = array(eScript('//index.html'),eScript('//gs_user_doc/4.pdf'),eScript('/_documentacion_/cuaderno-19-aeb.pdf'));
		echo eMailSmtp($Para, $Asunto, $Texto, $De,$nm_DeFrom ,$cc, $bcc, $ArrayFiles );
	*/

	//require_once('../../lib/gesco/phpmailer_v51/class.phpmailer.php');


		use PHPMailer\PHPMailer\PHPMailer;
		use PHPMailer\PHPMailer\SMTP;
		use PHPMailer\PHPMailer\Exception;

		require_once '../../lib/phpmailer6/src/PHPMailer.php';
		require_once '../../lib/phpmailer6/src/SMTP.php';
		require_once '../../lib/phpmailer6/src/Exception.php';


	function eMailSmtp($_to, $_asunto, $_texto_html="", $_from, $_nm_from="", $cc="", $bcc="", $adjuntos=false){
		global $_SystemUser;
		
		//qQuery("select * from gesco_cnfg_emisor where cnfg_default='{$_ENV['ON']}'", $resultado);	// SQL en estructura/conecta.php
		qQuery("select * from gesco_cnfg_emisor where server='smtp4.gesoft.es'", $resultado);	// SQL en estructura/conecta.php
		$row = qArray($resultado);
		$_HOST = $row['server']; 
		$_USERNAME = $row['user'];
		$_PASSWORD = $row['pass'];
		$_PORT = trim($row['port']);
		//eTron("acceso: HOST={$_HOST}, USERNAME={$_USERNAME}, PASSWORD={$_PASSWORD}, PORT={$_PORT}");

		//list( $_HOST, $_USERNAME,$_PASSWORD ) = qRecord( "select server, user,pass from gesco_cnfg_emisor where cnfg_default='{$_ENV['ON']}'" ); 
		/*
			if($_from=='' || $_HOST=='' || $_USERNAME=='' || $_PASSWORD=='' ){
				$error= "ERROR -1: ERROR EN LA CONFIGURACION DEL ENVÍO ($_from |$_HOST|$_USERNAME| $_PASSWORD)";
				error_log( date("Y:m:d H:i:s").'    '.$error."\n",3, '../_tmp/mail.inc.log');
				return -1;
			}	 
			$_nm_from='qqqq';
			//Si falta alguno de estos datos el envío no se puede enviar
			if($_from =='' ||  $_nm_from =='' || $_HOST=='' || $_PORT=='' ) echo  "-1 | ERROR CONFIG: ERROR EN LA CONFIGURACION DEL ENVÍO ({$_from} |{$_nm_from}|{$_HOST})";
			if( $_USERNAME=='' || $_PASSWORD=='' || $_PORT=='' ) echo  "-2 | ERROR CONFIG: ERROR EN LA VALIDACIÓN DEL ENVÍO ({$_USERNAME} | {$_PASSWORD} | {$_PORT}) ";
		*/
		
		$err_general=0;
		//if(SESS::$_Development) $_to='...@...com';

		$mail = new PHPMailer(true);

		/*
			$mail->IsSMTP();
			$mail->SMTPAuth   = true;
			$mail->Host       = $_HOST;
			$mail->Username   = $_USERNAME;
			$mail->Password   = $_PASSWORD;
			$mail->Port   	  = $_PORT; 
			$mail->isHTML();
			
		*/
		
		include('../d/gescomu/phpmailer_cnfg_server.php');
		
		/*
			if($PHPMailer_envio=='sendmail'){ 
				$mail->IsSendmail();
			}else{
				if($_HOST=='' || $_PORT=='' ) die("Error de configuración SMTP: HOST: {$_HOST} | PORT: {$_PORT}");
				$mail->IsSMTP();//telling the class to use SMTP 
				$mail->Host       = $_HOST;
				$mail->Port   	  = $_PORT; 
				if( isset($_ANONIMO) && $_ANONIMO==$_ENV['ON']){
					$mail->SMTPAuth   = false; 
				}else{
					if($_USERNAME=='' || $_PASSWORD=='' ) die("Error de utenticación SMTP: USERNAME: {$_USERNAME}");
					$mail->SMTPAuth   = true; 
					$mail->Username   = $_USERNAME;  
					$mail->Password   = $_PASSWORD;
				}
				$mail->SMTPSecure = "tls";
				$mail->SMTPOptions = array(
					'ssl' => array(
						'verify_peer' => false,
						'verify_peer_name' => false,
						'allow_self_signed' => true
					)
				);
				$mail->SMTPKeepAlive = true;  //SMTP connection will not close after each email sent
				$mail->SMTPDebug  = 0;       // 1 enables SMTP debug information client, 2 enables SMTP debug information server
			}

			$mail->Timeout = "5"; 
			$mail->isHTML();
			//$mail->Sender = "ojkare@gmail.com";
			$mail->Sender = "noreply@izquierdaunida.org";
			//echo "SMTP: HOST: {$mail->Host} | PORT: {$mail->Port} | USERNAME: {$mail->Username} | PASSWORD: {$mail->Password }";exit;		
		*/
		

		if($_to!='')$mail->AddAddress(trim($_to));
		if($cc!='')$mail->AddCC(trim($cc));	
		if($bcc!='')$mail->AddBCC(trim($bcc));
		$mail->SetFrom($_from, $_nm_from);
		$mail->Subject = trim($_asunto);
		$mail->MsgHTML(limpiaCadena($_texto_html));

		if($_SystemUser==$_ENV['ON']){
			//$mail->SMTPDebug  = 2; // enables SMTP debug information (for testing)
			//SMTP::DEBUG_OFF (0): Disable debugging (you can also leave this out completely, 0 is the default).
			//SMTP::DEBUG_CLIENT (1): Output messages sent by the client.
			//SMTP::DEBUG_SERVER (2): as 1, plus responses received from the server (this is the most useful setting).
			//SMTP::DEBUG_CONNECTION (3): as 2, plus more information about the initial connection - this level can help diagnose STARTTLS failures.
			//SMTP::DEBUG_LOWLEVEL (4): as 3, plus even lower-level information, very verbose, don't use for debugging SMTP, only low-level problems.
		}	
		
		
		
		if( !is_bool($ConFiles) ){
			foreach($adjuntos as $clave=>$fichero){
			   if(file_exists($fichero)) $mail->AddAttachment($fichero,mb_substr(mb_strrchr($fichero, "/"), 1));
			}
		}
		
		//ePrintR($mail);
		
		if( !$mail->Send() ){
		    $error = 'Mail error: '.$mail->ErrorInfo;
			error_log( date("Y:m:d H:i:s").':::'."ERROR -2:{$error}\n",3, '../_tmp/mail.inc.log');	
			return -2;
		}else{
			return 1;
		}
	}

		
	function limpiaCadena($cad){		//Función que limpia caracteres
		$cad= str_replace("&nbsp;"," ", $cad);
		$cad= str_replace("&#160;"," ", $cad);
		$cad= str_replace("&#xA0;"," ", $cad);
		$cad= str_replace("&sup2;","²", $cad);
		$cad= str_replace("&#178;","²", $cad);
		$cad= str_replace("&#xB2;","²", $cad);
		$cad= str_replace("&sup3;","³", $cad);
		$cad= str_replace("&#179;","³", $cad);
		$cad= str_replace("&#xB3;","³", $cad);
		$cad= str_replace("&raquo;","»", $cad);
		$cad= str_replace("&#187;","»", $cad);
		$cad= str_replace("&#xBB;","»", $cad);
		$cad= str_replace("&Aacute;","Á", $cad);
		$cad= str_replace("&#193;","Á", $cad);
		$cad= str_replace("&#xC1;","Á", $cad);
		$cad= str_replace("&Eacute;","É", $cad);
		$cad= str_replace("&#201;","É", $cad);
		$cad= str_replace("&#xC9;","É", $cad);
		$cad= str_replace("&Iacute;","Í", $cad);
		$cad= str_replace("&#205;","Í", $cad);
		$cad= str_replace("&#xCD;","Í", $cad);
		$cad= str_replace("&Ntilde;","Ñ", $cad);
		$cad= str_replace("&#209;","Ñ", $cad);
		$cad= str_replace("&#xD1;","Ñ", $cad);
		$cad= str_replace("&Oacute;","Ó", $cad);
		$cad= str_replace("&#211;","Ó", $cad);
		$cad= str_replace("&#xD3;","Ó", $cad);
		$cad= str_replace("&Uacute;","Ú", $cad);
		$cad= str_replace("&#218;","Ú", $cad);
		$cad= str_replace("&#xDA;","Ú", $cad);
		$cad= str_replace("&Uuml;","Ü", $cad);
		$cad= str_replace("&#220;","Ü", $cad);
		$cad= str_replace("&#xDC;","Ü", $cad);
		$cad= str_replace("&aacute;","á", $cad);
		$cad= str_replace("&#225;","á", $cad);
		$cad= str_replace("&#xE1;","á", $cad);
		$cad= str_replace("&ccedil;","ç", $cad);
		$cad= str_replace("&#231;","ç", $cad);
		$cad= str_replace("&#xE7;","ç", $cad);
		$cad= str_replace("&eacute;","é", $cad);
		$cad= str_replace("&#233;","é", $cad);
		$cad= str_replace("&#xE9;","é", $cad);
		$cad= str_replace("&iacute;","í", $cad);
		$cad= str_replace("&#237;","í", $cad);
		$cad= str_replace("&#xED;","í", $cad);
		$cad= str_replace("&ntilde;","ñ", $cad);
		$cad= str_replace("&#241;","ñ", $cad);
		$cad= str_replace("&#xF1;","ñ", $cad);
		$cad= str_replace("&oacute;","ó", $cad);
		$cad= str_replace("&#243;","ó", $cad);
		$cad= str_replace("&#xF3;","ó", $cad);
		$cad= str_replace("&uacute;","ú", $cad);
		$cad= str_replace("&#250;","ú", $cad);
		$cad= str_replace("&#xFA;","ú", $cad);
		$cad= str_replace("&uuml;","ü", $cad);
		$cad= str_replace("&#252;","ü", $cad);
		$cad= str_replace("&#xFC;","ü", $cad);
		$cad= str_replace("%u2010","-", $cad);
		$cad= str_replace("%u2019","´", $cad);
		$cad= str_replace("%u20AC","&euro;", $cad);
		$cad= str_replace("&#39;",'"', 	$cad);
		return $cad;
	}	

?>
