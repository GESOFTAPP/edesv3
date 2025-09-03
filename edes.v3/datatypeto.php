<?PHP
if( preg_match('/^(b|c|m)$/u', $_Mode) ){
$dataVisible = false;
$xMenu = "";
for($n=2; $n<count($_DATATYPETO); $n++){
$_DATATYPETO[$n] = explode(",", eNsp($_DATATYPETO[$n]));
$lastField = eLast($_DATATYPETO[$n]);
$_ADDCODE[$lastField]["E"] .= eIcon("&#230;", ' pp=1 onclick="_selFormato(this)"', "", "");
$label = $_DATATYPETO[$n][0];
if( $label[0]!="*" ){
$_ENV["noneTR"][$_DATATYPETO[$n][1]] = true;
}else{
$label = trim(mb_substr($label,1));
$dataVisible = true;
}
$xMenu .= ",['{$label}', '', '{$_DATATYPETO[$n][1]}']";
$tmp[1] = $_DATATYPETO[0];
if( count($_DATATYPETO[$n])==3 ){
$tmp[2] = $_DATATYPETO[$n][1];
$tmp[3] = $_DATATYPETO[$n][2];
}else{
$tmp[2] = $_DATATYPETO[$n][1];
$tmp[3] = $_DATATYPETO[$n][3];
}
$_DBRANGE[] = $tmp[2];
$_DBRANGE[] = $tmp[3];
$_DBRANGEADD[$tmp[1]] = 1;
$_DBRANGEDUO[$tmp[2]] = $tmp[3];
$_DBRANGEDUO[$tmp[3]] = $tmp[2];
$_ADDCODE[$tmp[2]]['I'] = ' noConditions';
$_ADDCODE[$tmp[3]]['I'] = ' noConditions';
if( count($_DATATYPETO[$n])==5 ){
$tmp[2] = $_DATATYPETO[$n][2];
$tmp[3] = $_DATATYPETO[$n][4];
$_ADDCODE[$tmp[2]]['I'] = ' noConditions';
$_ADDCODE[$tmp[3]]['I'] = ' noConditions';
}
}
if( !$dataVisible ){
unset($_ENV["noneTR"][$_DATATYPETO[2][1]]);
}
?>
<script>
function _selFormato(o){
S(o).menu(
[["-"+S.lng(294)]<?=$xMenu?>]
,{function: function(op, label, triger, oTR, arg){
if( op==null ) return;
let i, tr;
for(i=1; i<this.DimMenu.length; i++){
tr = S.toTag(":"+this.DimMenu[i][2], "TR");
S("INPUT", tr).val("");
S(tr).none();
}
S(S.toTag(":"+op, "TR")).block("table-row");
}}
);
}
</script>
<?PHP
}
if( mb_strlen($_Mode)==2 ){
for($n=2; $n<count($_DATATYPETO); $n++){
$_DATATYPETO[$n] = explode(",", eNsp($_DATATYPETO[$n]));
$tmp = [
""
,$_DATATYPETO[0]
,$_DATATYPETO[$n][1]
,$_DATATYPETO[$n][count($_DATATYPETO[$n])==3 ? 2:3]
,""
,""
,""
];
$DimDBRange[] = array($tmp[1], $_POST[$tmp[2]], $_POST[$tmp[3]], $tmp[4], $tmp[2], $tmp[3]);
if( !empty($tmp[6]) ){
$n = count($DimDBRange)-1;
array_push($DimDBRange[$n], $tmp[6]);
if( !empty($_POST[$tmp[6]]) ){
array_push($DimDBRange[$n], $_POST[$tmp[6]]);
}
}
$_DBRANGEADD[$tmp[1]] = 1;
}
$lengType = ["CDI"=>19, "F4"=>10, "P4"=>7, "Y"=>4][mb_strtoupper($_DATATYPETO[1])];
$dataBaseIni = mb_substr(date('Y-01-01 00:00:00'), 0, $lengType);
$dataBaseEnd = mb_substr(date('Y-m-d H:i:s'), 0, $lengType);
for($n=0; $n<count($DimDBRange); $n++){
if( $DimDBRange[$n][0]!=$_DATATYPETO[0] ) continue;
if( !empty($DimDBRange[$n][1]) ){
$DimDBRange[$n][1] .= mb_substr($dataBaseIni, mb_strlen($DimDBRange[$n][1]));
unset($_POST[$DimDBRange[$n][4]]);
}
if( !empty($DimDBRange[$n][2]) ){
$DimDBRange[$n][2] .= mb_substr($dataBaseEnd, mb_strlen($DimDBRange[$n][2]));
unset($_POST[$DimDBRange[$n][5]]);
}
if( empty($DimDBRange[$n][1]) && empty($DimDBRange[$n][2]) ){
$DimDBRange[$n][0] = "";
}
}
}
?>