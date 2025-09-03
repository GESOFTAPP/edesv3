<?PHP
$txt = ltrim(file_get_contents("php://input"));
$dim = explode("\r\n", $txt);
$i = 0;
for($n=1; $n<count($dim); $n+=4){
if( empty($dim[$n]) ){
continue;
}
list(,$field) = explode('"', $dim[$n]);
$field = trim($field);
if( !isset($dim[$n+2]) ){
continue;
}
$value = trim($dim[$n+2]);
if( empty($field) ) continue;
$_POST[$field] = $value;
$i++;
}
$_GET['_SESS_'] = $_POST['_SESS_'];
?>