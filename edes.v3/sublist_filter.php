<?PHP
if( S::$_User==-1 || $_gsID!=getmypid() ) exit;
eHTML("E:{$NomScript}", "");
echo '</head><body>';
if( isset($_GET["_FILTERSUBLIST"]) ){
$_ENV["indexUsuCursor"] = -1;
$data = json_decode(html_entity_decode($_GET["_FILTERSUBLIST"]));
$ReloadSubList = $_SUBLIST;
foreach($data as $key=>$value){
$$key = $value;
}
}
include_once($NomScript);
_ShowError($php_errormsg, $tmpFile, $LenDoc);
if( isset($_GET["_FILTERSUBLIST"]) ){
$total = 0;
echo "<script>";
echo "var  _WOPENER = window.frameElement.WOPENER";
echo ",id = '{$ReloadSubList}', i,t";
echo ",data = [";
while( $r=eGetRow() ){
if( $total>0 ) echo ",";
for($n=0; $n<count($r); $n++){
$r[$n] = addslashes($r[$n]);
}
echo '["'.implode('","', $r).'"]';
$total++;
}
echo "];";
?>
t = data.length;
for(i=0; i<t; i++){
_WOPENER.eSubListInsert(id, data[i]);
}
<?PHP
echo "</script>";
}
echo '</body></html>';
eEnd();
function eGetRow(){
global $usuCursor;
if( isset($usuCursor) ){
$_ENV["indexUsuCursor"]++;
return $usuCursor[$_ENV["indexUsuCursor"]];
}else{
return qRow();
}
}
?>