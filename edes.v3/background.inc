<?PHP
if( !defined('SYS')   ) define('SYS'  , '!' );
if( !defined('SETUP') ) define('SETUP', '.' );
if( !defined('DF') 	  ) define('DF'   , '_' );
if( S::$_User==-1 || $GLOBALS['_gsID'] != getmypid() ) exit;
if( eSubstrCount( $_SERVER['QUERY_STRING'], 'B:$extraer.gs&' ) == 1 ){
$NomFile = '../_tmp/ext/bkg_post.'.$_User;
@unlink($NomFile);
foreach($_POST as $k=>$v){
$v = trim($v);
if( $v!='' ) error_log( $k.'|'.$v."\n", 3, $NomFile );
}
}else if( eSubstrCount( $_SERVER['QUERY_STRING'], 'B:$report.gs&' ) == 1 ){
$NomFile = '../_tmp/ext/bkg_var.'.$_User;
@unlink( $NomFile );
foreach( $_GET as $k=>$v ){
$v = trim($v);
if( $v!='' && eSubstrCount(',B:$report_gs,_PSCRIPT,_FORMBUTTONS,_PSOURCE,',",$k,")==0 ) error_log( $k.'|'.$v."\n", 3, $NomFile );
}
error_log( 'SCRIPT_FILENAME|'.$_SERVER['SCRIPT_FILENAME']."\n", 3, $NomFile );
foreach( $_POST as $k=>$v ){
$v = trim($v);
if( $v!='' ) error_log( $k.'|'.$v."\n", 3, $NomFile );
}
}
error_log( '_PathCSS|'.SESS::$_PathCSS."\n", 3, $NomFile );
error_log( '_iSql|'.SESS::$sql['driver']."\n", 3, $NomFile );
if( $_GET['_DB']!='' ){
$DB = $_GET['_DB'];
$txt = trim( @file_get_contents( '../_datos/config/'.$_GET['_DB'].'.ini' ) );
}else{
$DB = '';
$txt = trim( @file_get_contents( '../_datos/config/sql.ini' ) );
}
if( mb_substr($txt,0,2)!='<'.'?' ){
eval( gzuncompress($txt) );
}else{
eval( mb_substr( $txt, ( ( mb_strtoupper(mb_substr($txt,0,5))=='<'.'?PHP' ) ? 5 : 2 ), -4 ) );
}
unset( $txt );
include_once( $Dir_.$_Sql.'.inc' );
switch( SESS::$sql['driver'] ){
case 'mysql':
eInclude('mysql.class');
$db = new eMySql();
break;
case 'mysqli':
eInclude('mysqli.class');
$db = new eMySqli();
break;
case 'informix':
eInclude('informix.class');
$db = new eInformix();
break;
case 'oracle':
eInclude('oracle.class');
$db = new eOracle();
break;
case 'pdo':
eInclude('pdo.class');
$db = new ePdo();
break;
}
$db->qConnect('sql');
$_SERVER["QUERY_STRING"] = urldecode($_SERVER["QUERY_STRING"]);
$_BKGUNIQUE = '';
foreach( $_GET as $k=>$v ){
if( mb_strtoupper($k)=='UNIQUE' ) $_BKGUNIQUE = 'S';
}
if( isset( $_VerFilePhpInfo ) ){
$Respuesta = '<script type="text/javascript">top.Pag.location.href = top.S.urlAdd("edes.php?E:$a/u/tools.gs?2V");top.eLoading(false,window);</script>';
}else{
$Respuesta  = '<script type="text/javascript">top.S("body").tip("Proceso ejecutandose en segundo plano",2);top.eLoading(false,window);';
$Respuesta .= 'if( top.eIsWindow(window) ) setTimeout("top.eSWClose(window);",250);';
$Respuesta .= '</script>';
}
$Todo = @file_get_contents( '../_datos/config/empty_page.htm' );
$i = mb_strrpos( mb_strtoupper($Todo), '</BODY>' );
if( $i > 0 ){
$Respuesta = mb_substr( $Todo, 0, $i ).$Respuesta.mb_substr( $Todo, $i );
}
$CDI = date('Hi').str_pad( sprintf( "%2.6f", (date('s')+mb_substr(microtime(),0,8)) ), 9 ,'0',STR_PAD_LEFT );
$_SERVER["QUERY_STRING"] = str_replace('&UNIQUE','',$_SERVER["QUERY_STRING"]);
$Comando = urldecode($_SERVER["QUERY_STRING"]);
$Comando = str_replace('&_DB='.$_GET['_DB'],'',$Comando);
list( $Comando ) = explode( '&_PSCRIPT=', mb_substr($Comando,2) );
list( $Comando ) = explode( '&_FORMBUTTONS=', $Comando );
list( $Comando ) = explode( '&_PSOURCE=', str_replace('&',' ',str_replace('?',' ',$Comando)) );
$oBKGEXE = eFileGetVar('Background.php');
if( $oBKGEXE!='' ) $_BKGEXE = $oBKGEXE;
if( !isset($_BKGEXE) ){
if( WINDOW_OS ){
$_BKGEXE = 'php.exe';
}else{
$_BKGEXE = 'php';
}
}
$_BKGEXE = str_replace('\\','/',$_BKGEXE);
if( WINDOW_OS ){
$Sufijo = '';
}else{
$Sufijo = '&';
}
$EXE = $Comando;
$Parametros = '';
$p = mb_strpos( mb_strtoupper($Comando), ' ' );
if( $p > 0 ){
$EXE = mb_substr( $Comando, 0, $p );
$Parametros = mb_substr( $Comando, $p+1 );
}
$Parametros = str_replace('"','\"',str_replace("'","\'",$Parametros));
$EXE = str_replace('"','\"',str_replace("'","\'",$EXE));
if( $_BKGUNIQUE=='S' && $db->qCount("{$_ENV['eDesDictionary']}gs_bkg", "command='{$EXE}' and bkg_status='P'")>0 ){
include_once($Dir_.'message.inc');
eMessage('EL PROCESO SE ESTA EJECUTANDO', 'HS');
}
$db->qQuery( "insert into {$_ENV['eDesDictionary']}gs_bkg ( cd_gs_user, bkg_status, bkg_unique, command, parameters, y2s_start ) values ( {$_User}, 'P', '{$_BKGUNIQUE}', '{$EXE}', '{$Parametros}', '".date('Y-m-d H:i:s')."' )" );
$ID = $db->qId();
$Comando = trim($Comando);
if( !isset($_BackgroundShow) ){
$Comando = str_replace('$','{36}',$Comando);
if( WINDOW_OS ){
pclose(popen("start /B ". "{$_BKGEXE} {$Dir_}background.gs {$ID} {$_User} {$Comando} {$DB} > ../_tmp/err/{$ID}.bkg {$Sufijo}", "r"));
}else{
$Retorno = exec("{$_BKGEXE} {$Dir_}background.gs {$ID} {$_User} {$Comando} {$DB} > ../_tmp/err/{$ID}.bkg {$Sufijo}", $Dim, $Var);
}
}else{
if( WINDOW_OS ){
eTrace("start /B ". "{$_BKGEXE} {$Dir_}background.gs {$ID} {$_User} {$Comando} {$DB} > ../_tmp/err/{$ID}.bkg {$Sufijo}");
}else{
eTrace( "{$_BKGEXE} {$Dir_}background.gs {$ID} {$_User} {$Comando} {$DB} > ../_tmp/err/{$ID}.bkg {$Sufijo}" );
}
$_DEBUG = 1;
$_BKG = $ID;
$_File = $Comando;
include( $Dir_.'background.gs' );
}
echo $Respuesta;
$db->qEnd();
eEnd();
?>