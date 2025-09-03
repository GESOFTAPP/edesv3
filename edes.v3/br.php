<?PHP
if( isset($_POST["_SOURCE_"]) && $_POST["_SOURCE_"]=='<check>' ){
?>
<script type="text/javascript">
var o = window.frameElement.WOPENER.DGI('JSCheckSubmit');
o['text'] = 'function eJSCheckSubmit(){'+
"alert('Prueba:3');"+
"return false;"+
"}";
</script>
<?PHP
eEnd();
}
$DirFile = eScript($_POST["_SOURCE_"].'.br');
$File = file($DirFile);
$HayReg = false;
$Clave='';
for( $n=0; $n<count($File); $n++ ){
$File[$n] = trim($File[$n]);
if( $File[$n]=='' ) continue;
if( $File[$n][0]=='[' ){
list( $Clave ) = explode(']',$File[$n]);
$Clave = trim(ucfirst(mb_substr($Clave,1)));
if( $Clave=='' ) die('Error:1');
${$Clave} = '['.$Clave."]\n";
continue;
}
${$Clave} .= $File[$n]."\n";
}
if( isset($_POST["_ROULES_"]) ) $Submit = "[Submit]\n".$_POST["_ROULES_"];
if( isset($_POST["_FIELDS_"]) ) $Fields = "[Fields]\n".$_POST["_FIELDS_"];
$txt =	$Submit."\n".
$Fields;
file_put_contents( $DirFile, $txt );
die('Grabado');
define('T_NEW_LINE', -1);
function token_get_all_nl($source){
$new_tokens = array();
$tokens = token_get_all($source);
foreach ($tokens as $token){
$token_name = is_array($token) ? $token[0] : null;
$token_data = is_array($token) ? $token[1] : $token;
if ($token_name == T_CONSTANT_ENCAPSED_STRING || mb_substr($token_data, 0, 2) == '/'.'*'){
$new_tokens[] = array($token_name, $token_data);
continue;
}
$split_data = preg_split('/#(\r\n|\n)#/u', $token_data, -1, PREG_SPLIT_DELIM_CAPTURE | PREG_SPLIT_NO_EMPTY);
foreach ($split_data as $data){
if ($data == "\r\n" || $data == "\n"){
$new_tokens[] = array(T_NEW_LINE, $data);
}else{
$new_tokens[] = is_array($token) ? array($token_name, $data) : $data;
}
}
}
return $new_tokens;
}
function token_name_nl($token){
if ($token === T_NEW_LINE){
return 'T_NEW_LINE';
}
return token_name($token);
}
echo highlight_string( ' auto.length[0,1]>=1 ' , true);
$tokens = token_get_all_nl('<'.'?PHP'."\n".' :NM ?'.'>' );
foreach( $tokens as $token ){
if( is_array($token) ){
echo (token_name_nl($token[0]) . ': "' . $token[1] . '"<br />');
}else{
echo ('"' . $token . '"<br />');
}
}
?>