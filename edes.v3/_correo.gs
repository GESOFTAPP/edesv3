<?PHP
$g=new getMail('faranda','[...clave...]','mail.e-gesoft.com','imap','143');
$g->connect();
$TMail = $g->getTotalMails();
echo 'mails total: '.$TMail.'<br>';
echo '<pre>';
print_r( $g->getHeaders($TMail) );
echo '<br>';
print_r( $g->getHeaders($TMail-1) );
echo '</pre>';
echo '<hr>';
$g->close_mailbox();
class getMail {
protected $server = '';
protected $username = '';
protected $password = '';
public $mbox = '';
public $headers='';
function getMail($username, $password, $mailserver='localhost', $servertype='pop', $port='110'){
if( $servertype=='imap' ){
if($port == '') $port='143';
$strConnect = '{'.$mailserver.':'.$port. '/novalidate-cert}INBOX';
}else{
$strConnect = '{'.$mailserver.':'.$port. '/pop3/novalidate-cert}INBOX';
}
$this->server = $strConnect;
$this->username = $username;
$this->password = $password;
}
public function connect() //Connect To the Mail Box
{
$this->mbox = imap_open($this->server,$this->username,$this->password);
if($this->mbox==false ) {
return true;
}
return false;
}
public function getHeaders($mid) // Get Header info
{
$mail_details=array( 'date'=>'', 'from'=>'', 'subject'=>'' );
$mail_header = imap_header($this->mbox,$mid);
if (isset($mail_header->from[0])) $sender = $mail_header->from[0];
if($sender)
{
if (isset($mail_header->date)) $mail_details['date'] = $mail_header->date;
if (isset($sender->mailbox) && isset($sender->host)) $mail_details['from'] = mb_strtolower($sender->mailbox).'@'.$sender->host;
if (isset($mail_header->subject)) $mail_details['subject'] = iconv_mime_decode($mail_header->subject,0,'UTF-8');
}
return $mail_details;
}
public function getTotalMails() //Get Total Number off Unread Email In Mailbox
{
$this->headers = imap_headers($this->mbox);
return count($this->headers);
}
public function getBody($mid) //Get  body
{
$body['text'] = $body['charset'] = '';
$s = imap_fetchstructure($this->mbox,$mid);
if (!isset($s->parts) || !$s->parts)
$body['text'] .= $this->getPart($this->mbox,$mid,$s,0,$body);  // no part-number, so pass 0
else
foreach ($s->parts as $partno0=>$p0)
$body['text'] .= $this->getPart($this->mbox,$mid,$p0,$partno0+1,$body);
return $body;
}
private function getPart($mbox,$mid,$p,$partno,&$body) //Get parts body
{
$data = ($partno)?
imap_fetchbody($mbox,$mid,$partno):  // multipart
imap_body($mbox,$mid);  // not multipart
if ($p->encoding == ENCQUOTEDPRINTABLE)
$data = quoted_printable_decode($data);
elseif ($p->encoding == ENCBASE64)
$data = base64_decode($data);
$params = array();
if ($p->ifparameters)
foreach ($p->parameters as $x)
$params[ mb_strtolower( $x->attribute ) ] = $x->value;
if ($p->ifdparameters)
foreach ($p->dparameters as $x)
$params[ mb_strtolower( $x->attribute ) ] = $x->value;
if (($p->type == TYPETEXT or $p->type == TYPEMULTIPART)  && $data && $p->encoding != ENCBINARY && $p->encoding != ENCOTHER)
{
if (isset($params['charset']) && $params['charset'] != '') $body['charset'] = $params['charset'];
elseif (isset ($params['charset']) && $params['charset'] == '' && $body['charset'] == '') $body['charset'] = 'UTF-8';
if (isset($data)) $body['text'] .= trim($data)."\n";
}
if (isset($p->parts))
foreach ($p->parts as $partno0=>$p2)
$this->getPart($mbox,$mid,$p2,$partno.'.'.($partno0+1),$body);  // 1.2, 1.2.1, etc.
}
public function deleteMails($mid) // Delete That Mail
{
imap_delete($this->mbox,$mid);
}
public function close_mailbox() //Close Mail Box
{
imap_close($this->mbox,CL_EXPUNGE);
}
public function getError() //Get  error
{
return imap_last_error();
}
}
?>