<?PHP
$setup = explode(",", "uar_v5,:gs_*se*,grp_mas,grp_mov,type_table");
$setup = explode(",", ",grp_mas,grp_mov,type_table");
$schema = $setup[0];
if( empty($schema) ) $schema = $_SqlDiccionario;
$file = "../_d_/usr/ddbb.".S::$_User;
if( !empty($_GET["_NewSchema"]) ){
$schema = $_GET["_NewSchema"];
if( $_SqlDiccionario==$schema ){
@unlink($file);
}else{
file_put_contents($file, $schema);
}
}else if( file_exists($file) ){
$schema = file_get_contents($file);
}
$schemaSetup = parse_ini_file("../_d_/cfg/schema.setup", true);
?>
<!DOCTYPE html>
<html>
<head>
<META http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>DDBB</title>
<style>
.BOLD {
font-weight: bold;
}
BODY::-webkit-scrollbar {
-webkit-appearance: none;
width: 12px;
height:12px;
}
BODY::-webkit-scrollbar-thumb {
border-radius: 4px;
background-color: #7f7f7f;
}
.contenedor-arbol li .current {
font-weight:bold;
}
.contenedor-arbol li[type='G'] {
color:black;
cursor:pointer;
}
.contenedor-arbol li[type='S'] {
color:blue;
cursor:pointer;
}
.contenedor-arbol li[type='T'] {
color:green;
cursor:pointer;
}
.contenedor-arbol li[type='V'] {
color:purple;
cursor:pointer;
}
.contenedor-arbol, .contenedor-arbol ul, .contenedor-arbol li {
position: relative;
}
.contenedor-arbol ul {
list-style: none;
}
.contenedor-arbol li::before, .contenedor-arbol li::after {
content: "";
position: absolute;
left: -12px;
}
.contenedor-arbol li::before {
border-top: 2px solid #cccccc;
top: 9px;
width: 8px;
height: 0;
}
.contenedor-arbol li::after {
border-left: 1px solid #cccccc;
height: 100%;
width: 0px;
top: 2px;
}
.contenedor-arbol ul > li:last-child::after {
height: 8px;
}
.contenedor-arbol li span {
padding-top: 3px;
display: inline-block;
color:#a5282e;
}
.contenedor-arbol input {
margin-right: 5px;
}
.contenedor-arbol i {
margin-right: 5px;
}
.contenedor-arbol input[type='text'] {
width: 115px;
}
.TABLE-SETUP {
border: 1px solid #aaaaaa;
display: none;
z-index: 2;
position: absolute;
left: 300px;
top: 400px;
background-color: #dddddd;
padding-right: 10px
padding-bottom: 12px;
}
.TABLE-SETUP>SPAN {
font-weight: bold;
border-bottom: 1px solid #aaaaaa;
display: table-caption;
text-align: center;
background-color: #c3c3c3;
padding-left: 10px;
padding-right: 10px;
}
.TABLE-SETUP UL {
padding-left: 23px;
}
.TABLE-SETUP UL LI {
list-style-type: disclosure-open;
white-space: nowrap;
}
.TABLE-SETUP UL LI UL {
padding-left: 0px;
}
.TABLE-SETUP UL LI UL LI {
list-style: none;
}
</style>
<script>
document.title = "Data Dictionary";
top.S.init(window, "all,list");
var  xSetup = '<?= str_replace("&#34;", '"', file_get_contents("../_d_/usr/schema.".S::$_User)) ?>'
,_SetupTable = xSetup=="" ? {} : JSON.parse(xSetup);
delete(xSetup);
function execute(ev){
var  o = top.S.event(window)
,type = o.getAttribute("type");
if( o.tagName=="SPAN" && o.parentNode.tagName=="LABEL" ){
o = o.parentNode;
}
if( /(LABEL|INPUT)/.test(o.tagName) ){
return true;
}
if( type==null ) return S.eventClear(ev);
if( /(T|V)/.test(type) ){
var schema = S(".contenedor-arbol li[type='S'].current").text(),
table = o.innerText;
if( ev.type=="click" ){
S.window("edes.php?Ll:$a/d/table.edf&_schema="+schema+"&_table="+table, {title:"Table: <b>"+table+"</b>"});
}else if( ev.type=="contextmenu" ){
S.window("edes.php?Ll:"+table+".tbl&_DBLimit='100,-100'&_WINCLOSEESC=1");
}
}else if( type=="S" ){
S(".contenedor-arbol li[type='S'].current").class("-current");
S(o).class("+current");
location.href = S.urlAdd("edes.php?E:$a/d/dictionary.php&_NewSchema="+S(o).text());
}
return S.eventClear(ev);
}
function saveSetup(){
var dim = [S(".contenedor-arbol li[type='S'].current").text()];
S(".contenedor-arbol input").each(function(k,o){
if( o.type=="checkbox" ){
if( o.checked ){
dim.push(o.name);
}
}else if( S(o).val()!="" ){
dim.push(":"+o.value);
}
});
S.call("edes.php?E:$t/ed.gs", {type:"DDBB", data:dim.join(",")});
}
function filterTable(){
var filterName = S(":filter_name").val();
filterName = new RegExp("^"+S.replace(filterName, "*", "[a-zA-Z0-9\_]{0,50}"), "i");
S("li[type='TV'] li").each(function(k,o){
if( filterName!="" ){
S(o).display(filterName.test(o.innerText));
}
});
}
function init(){
var data = "<?= implode(",", $setup) ?>".split(","), n,
filterName = "";
for(n=1; n<data.length; n++){
if( data[n][0]==":" ){
filterName = S.mid(data[n], 1, 0);
S(":filter_name").val(filterName);
filterName = new RegExp("^"+S.replace(filterName, "*", "[a-zA-Z0-9\_]{0,50}"), "i");
}else{
S(":"+data[n]).val(S.setup.checkOn);
}
}
S("li[type='TV'] li").each(function(k,o){
if( filterName!="" ){
if( !filterName.test(o.innerText) ){
S(o).none();
}
}
});
S("#MenuTables LI").on("mouseover", function(ev){
var schema = S(".contenedor-arbol li[type='S'].current").text();
if( S(".SUBMENU").length ){
S(".SUBMENU").nodeRemove();
}
S(ev.currentTarget).menu([
["-Menú"]
,["Browser"  , "", "B"]
,["Setup"	 , "", "S"]
,["Structure", "", "T"]
], {zIndex:99, index:99, function:function(cod, lab, padre, oTR, oTable, oLI){
var xTable = oLI.innerText;
S(".BOLD").class("-BOLD");
S(oLI).class("+BOLD");
if( cod=="T" ){
S.window("edes.php?Ll:$a/d/table.edf&_schema="+schema+"&_table="+xTable, {title:"Table: <b>"+xTable+"</b>"});
}else if( cod=="S" ){
var oSetup = S(".TABLE-SETUP");
if( S("LI.SETUP", oSetup).length==0 ){
var txt = "";
S(".contenedor-arbol LI.SETUP").each(function(k, o){
txt += o.outerHTML;
});
S("UL", oSetup).html(txt);
oSetup.on("click", function(ev){
return true;
});
}
S(S("SPAN", oSetup).obj).text(xTable);
S(".TABLE-SETUP input:checked").each(function(k,o){
o.checked = false;
});
if( _SetupTable[xTable]!=undefined ){
for(attr in _SetupTable[xTable]){
S(":"+_SetupTable[xTable][attr], oSetup).val(S.setup.checkOn);
}
}
oSetup.block("inline-table");
oSetup.attr("table", xTable);
oSetup.obj["oLI"] = oLI;
for(var i=0; i<2; i++){
oSetup.center();
var coor = oSetup.xy(),
scr = S.screen(window);
oSetup.fixed(scr.x-coor.x, scr.y-coor.y);
}
}else if( cod=="B" ){
S.window("edes.php?Ll:"+xTable+".tbl&_DBLimit='100,-100'&_WINCLOSEESC=1");
}
}}, ev.currentTarget);
});
}
function setupTableSave(){
var xTable = S(".TABLE-SETUP").attr("table"),
oLI = S(".TABLE-SETUP").obj["oLI"],
dim = [];
S(".TABLE-SETUP input:checked").each(function(k,o){
dim.push(o.name);
});
if( _SetupTable[xTable]!=undefined && _SetupTable[xTable].join("")!=dim.join("") ){
_SetupTable[xTable] = dim;
S.call("E:$t/ed.gs&_SetupTable=save", {data:JSON.stringify(_SetupTable)}, {info:true});
}
S(".TABLE-SETUP").none();
S(".MODAL").nodeRemove();
}
</script>
</head>
<body onload="S.windowView(window)">
<div class="TABLE-SETUP">
<span>tabla</span>
<ul></ul>
<center>
<div class="AddButton" onclick="setupTableSave()" border="0px" cellspacing="0px" cellpadding="1px" style="display:table;margin-left:0px;">Grabar</div>
</center>
</div>
<div class="contenedor-arbol" onclick="execute(event)" oncontextmenu="execute(event)">
<ul>
<li type='G'><i class="ICONINPUT ICONSEEK">&#170;</i>Schema
<ul>
<?PHP // list schemes
qQuery("select table_schema from information_schema.tables group by table_schema order by table_schema");
while($r=qArray()){
$classCurrent = ($schema==$r['table_schema'] ? " class='current'" : "");
echo "<li type='S'{$classCurrent}>{$r['table_schema']}</li>";
}
?>
</ul>
</li>
<li><i class="ICONINPUT ICONSEEK">&#260;</i>Groups / Filter
<ul>
<li>Table Name
<ul>
<li><input type="text" name="filter_name" onchange="filterTable()"></li>
</ul>
</li>
<li class="SETUP">Class
<ul>
<?PHP
foreach($schemaSetup["group"] as $k=>$v){
echo "<li><label><input type='radio' name='grp_{$k}'><span>{$v}</span></label></li>";
}
?>
<li><label><input type="radio" name="grp_undefined" value="undefined"><span>Undefined</span></label></li>
</ul>
</li>
<li class="SETUP">Type
<ul>
<?PHP
foreach($schemaSetup["type"] as $k=>$v){
echo "<li><label><input type='radio' name='type_{$k}'><span>{$v}</span></label></li>";
}
?>
</ul>
</li>
<li class="SETUP">Entity / Group
<ul>
<?PHP
foreach($schemaSetup["entity"] as $k=>$v){
echo "<li><label><input type='checkbox' name='ent_{$k}'><span>{$v}</span></label></li>";
}
?>
</ul>
</li>
</ul>
</li>
<li type='TV'>Tables
<ul id="MenuTables">
<?PHP // list tables
qQuery("SELECT table_name, 'T' tableView FROM information_schema.tables where table_schema='{$schema}' union select table_name, 'V' tableView from information_schema.views  where table_schema='{$schema}' ORDER BY table_name");
while($r=qArray()){
echo "<li type='{$r['tableView']}' setup=''>{$r['table_name']}</li>";
}
?>
</ul>
</li>
<li>Script / Rules
<ul>
<li>Constraints</li>
<li>Procedures</li>
<li>Triggers</li>
</ul>
</li>
</ul>
</div>
<script>
init();
</script>
</body>
</html>
<?PHP
$table = 'tma002';
echo "<b><u>INDEX</u></b><br>";
qQuery("select table_name, index_name, seq_in_index, column_name, non_unique, index_type, comment from information_schema.statistics where table_schema = '{$schema}' and table_name = '{$table}' order by 1,2,3,4,5,6");
$n=0;
while($r=qArray()){
if( $r["seq_in_index"]==1 ){
if( $n>0 ) echo ")<br>";
echo $r["index_name"].' ( ';
}
echo $r["column_name"]. ($r["non_unique"]==1 ? " UNIQUE":"").', '; //echo $r["index_name"].' - '. $r["seq_in_index"].' - '. $r["column_name"].' - '. ($r["non_unique"]==1 ? " UNIQUE":"").'<br>';
$n++;
}
echo ")";
?>