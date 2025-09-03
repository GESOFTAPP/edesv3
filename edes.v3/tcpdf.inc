<?php
require_once('../../lib/tcpdf/config/lang/eng.php');
require_once('../../lib/tcpdf/tcpdf.php');
function specialChars($tbl){
$b=array('ş','Ş',
'Ŕ','Á','Â','Ă','Ä','Ĺ','Ć','Ç','Č','É','Ę','Ë','Ě','Í','Î','Ď','Đ','Ń','Ň','Ó','Ô','Ő','Ö','Ř','Ů','Ú','Ű','Ü','Ý','Ţ','ß','ŕ','á','â','ă','ä','ĺ','ć','ç','č','é','ę','ë','ě','í','î','ď','đ','ń','ň','ó','ô','ő','ö','ř','ů','ú','ű','ü','ý','ţ','˙',"'",'´','','','','','','','','','','','ż','Ť','ť','Ą','ˇ','¨','Ľ','Ł','Ź','§');
$r=array('&ordm;','&ordf;','&Agrave;','&Aacute;','&Acirc;','&Atilde;','&Auml;','&Aring;','&AElig;','&Ccedil;','&Egrave;','&Eacute;','&Ecirc;','&Euml;','&Igrave;','&Iacute;','&Icirc;','&Iuml;','&ETH;','&Ntilde;','&Ograve;','&Oacute;','&Ocirc;','&Otilde;','&Ouml;','&Oslash;','&Ugrave;','&Uacute;','&Ucirc;','&Uuml;','&Yacute;','&THORN;','&szlig;','&agrave;','&aacute;','&acirc;','&atilde;','&auml;','&aring;','&aelig;','&ccedil;','&egrave;','&eacute;','&ecirc;','&euml;','&igrave;','&iacute;','&icirc;','&iuml;','&eth;','&ntilde;','&ograve;','&oacute;','&ocirc;','&otilde;','&ouml;','&oslash;','&ugrave;','&uacute;','&ucirc;','&uuml;','&yacute;','&thorn;','&yuml;','&apos;','&acute;','&euro;','&#8230;','&#8220;','&#8221;','&#8222;','&#8224;','&#8240;','&#8482;','&#8216;','&#8217;','&iquest;','&laquo;' ,'&raquo;','&iexcl;' ,'&middot;','&uml;','&yen;','&pound;','&not;','&sect;');
return str_replace($b,$r,$tbl);
}
?>