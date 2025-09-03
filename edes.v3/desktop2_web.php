<?PHP
if( !file_exists("g/logo.png") ){
eErrorExit(str_replace("#", "g/logo.png", $__Lng[155]));
}
if( !is_dir('../_tmp/sess') ){
eErrorExit(str_replace("#", "/_tmp/sess", $__Lng[156]));
}
if( !is_dir('../_tmp/lcl') ){
eErrorExit(str_replace("#", "/_tmp/lcl", $__Lng[156]));
}
if( $_ENV[SETUP]['_DevelopmentSrv'] ){
if( !file_exists("g/logo_development.ico") ){
$logoTemp = '<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22256%22 height=%22256%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2220%22 fill=%22%236b84a4%22></rect><path fill=%22%23fff%22 d=%22M65.44 49.37L65.44 49.37Q65.44 43.61 63.68 39.52Q61.92 35.42 58.91 32.81Q55.89 30.20 51.89 28.98Q47.88 27.77 43.30 27.77L43.30 27.77Q40.41 27.77 38.30 27.95Q36.19 28.13 34.38 28.49L34.38 28.49L34.38 71.33Q36.55 71.87 39.02 72.05Q41.50 72.23 44.11 72.23L44.11 72.23Q54.73 72.23 60.08 66.47Q65.44 60.71 65.44 49.37ZM72.91 49.37L72.91 49.37Q72.91 56.75 70.88 62.20Q68.85 67.64 65.12 71.24Q61.38 74.84 56.08 76.59Q50.77 78.35 44.20 78.35L44.20 78.35Q41.31 78.35 37.72 78.13Q34.12 77.90 30.88 76.91L30.88 76.91Q27.09 75.74 27.09 72.77L27.09 72.77L27.09 26.51Q27.09 25.07 27.82 24.30Q28.54 23.54 30.07 23.09L30.07 23.09Q32.86 22.19 36.37 21.92Q39.88 21.65 43.39 21.65L43.39 21.65Q49.95 21.65 55.40 23.41Q60.84 25.16 64.72 28.63Q68.59 32.09 70.75 37.27Q72.91 42.44 72.91 49.37Z%22></path></svg>" />';
}
}else{
if( !file_exists("g/logo.ico") ){
$logoTemp = '<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22256%22 height=%22256%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2220%22 fill=%22%23d34758%22></rect><path fill=%22%23fff%22 d=%22M47.21 58.10L38.12 58.10L38.12 77.45Q37.58 77.63 36.68 77.85Q35.78 78.08 34.70 78.08L34.70 78.08Q30.74 78.08 30.74 74.75L30.74 74.75L30.74 26.87Q30.74 25.43 31.46 24.66Q32.18 23.90 33.71 23.45L33.71 23.45Q36.32 22.64 40.05 22.28Q43.79 21.92 47.30 21.92L47.30 21.92Q58.73 21.92 63.99 26.73Q69.26 31.55 69.26 39.74L69.26 39.74Q69.26 48.11 63.86 53.10Q58.46 58.10 47.21 58.10L47.21 58.10ZM38.03 51.98L46.76 51.98Q53.96 51.98 57.92 49.01Q61.88 46.04 61.88 39.83L61.88 39.83Q61.88 33.71 58.05 30.88Q54.23 28.04 47.12 28.04L47.12 28.04Q44.69 28.04 42.30 28.27Q39.92 28.49 38.03 28.85L38.03 28.85L38.03 51.98Z%22></path></svg>" />';
}
}
eHTML('$desktop2_web.php', '', SETUP::$System['TabTitle']);
echo "<script>var _StartLoading = new Date().getTime(), _SecondLoading=-1;</script>";
$EntrasPorLaVPN = true;
$logo = "";
if( SETUP::$_DevelopmentSrv ){
if( file_exists("g/logo_development.ico") ) $logo = "logo_development";
}else{
if( file_exists("g/logo.ico")			  ) $logo = "logo";
}
if( $logo!="" ){
echo "<link id='FAVICON' rel='icon' href='g/{$logo}.ico' type='image/x-icon'>";
}else{
echo $logoTemp;
}
$_ScreenShot = SETUP::$System['ScreenShot'];
$screenshot = array();
if( $_ScreenShot ){
$dir = "g/screenshot";
$uDir = opendir($dir);
while( $uFile=readdir($uDir) ){
if( ($uFile=='.') || ($uFile=='..') || (is_dir($dir.'/'.$uFile)) ) continue;
if( preg_match("/_[1-9]{1,2}_[0-9]{1,4}.png$/", $uFile) ){
$img = preg_split('/(_[1-9])(_[0-9]{1,4}).png$/u', $uFile, -1, PREG_SPLIT_DELIM_CAPTURE);
$uFile = $img[0];
$screenshot[str_replace("*", "/", $uFile)] = 1;
}
}
closedir($uDir);
}
?>
<style type="text/css">
<?PHP if( SESS::$OS=="MAC" ){ ?>
:root {
--cText	  : text;
--cAuto   : cell;
--cPointer: default;
--cContext: context-menu;
}
<?PHP }else{ ?>
:root {
--cText	  : text;
--cAuto   : crosshair;
--cPointer: default;
--cContext: copy;
}
<?PHP } ?>
@media print {
.HEADER {
display: none;
}
}
</style>
<?PHP
if( SESS::$OS=="MAC" && file_exists("../_datos/config/cursor_mac.css") ){
echo '<style type="text/css" id="_rootCursor_">';
include("../_datos/config/cursor_mac.css");
echo '</style>';
}else if(  SESS::$OS=="WIN" && file_exists("../_datos/config/cursor_win.css") ){
echo '<style type="text/css" id="_rootCursor_">';
include("../_datos/config/cursor_win.css");
echo '</style>';
}
?>
<style title="styleCARD" name="styleCARD" type="NO" type="text/css">
<?PHP include(SESS::$_PathCSS."/list_card.css"); ?>
</style>
<style type="text/css">
<?PHP
echo ".TREEMAIN svg, .TREEMIN svg, .SUBTREE svg {";
if( SETUP::$Desktop['SVGWidth'] !="" ) echo "width:" .(SETUP::$Desktop['SVGWidth']*1)."px !important;";
if( SETUP::$Desktop['SVGHeight']!="" ) echo "height:".(SETUP::$Desktop['SVGHeight']*1)."px !important;";
echo "}";
echo ".TREEMAIN IMG, .TREEMIN IMG, .SUBTREE IMG {";
if( SETUP::$Desktop['IMGWidth'] !="" ) echo "max-width:" .(SETUP::$Desktop['IMGWidth']*1)."px !important;";
if( SETUP::$Desktop['IMGHeight']!="" ) echo "max-height:".(SETUP::$Desktop['IMGHeight']*1)."px !important;";
echo "}";
echo ".TREEMAIN .UnPX SPAN:nth-child(1), .TREEMIN SPAN, .SUBTREE .UnPX SPAN:nth-child(1), .TREEMAIN .ICONHIDDEN, .SUBTREE .ICONHIDDEN {";
if( SETUP::$Desktop['BOXWidth'] !="" ) echo "width:" .(SETUP::$Desktop['BOXWidth']*1)."px !important;";
if( SETUP::$Desktop['BOXHeight']!="" ) echo "height:".(SETUP::$Desktop['BOXHeight']*1)."px !important;";
echo "}";
$mh = max(SETUP::$Desktop['SVGHeight']*1, SETUP::$Desktop['IMGHeight']*1);
if( $mh==0 ) $mh = 25;
$ma = max(SETUP::$Desktop['SVGWidth']*1, SETUP::$Desktop['IMGWidth']*1);
if( $ma==0 ) $ma = 25;
?>
.TREEMAIN TR, .TREEMAIN SPAN, .TREEMAIN .ICONHIDDEN { height:<?=$mh?>px; }
.TREEMIN TR { height:<?=$mh?>px; }
.SUBTREE TR, .SUBTREE SPAN, .SUBTREE .ICONHIDDEN { height:<?=$mh?>px; }
#STATELINE.STATELINE {
padding: 5px 15px 5px 15px;
margin-top: 0;
margin-bottom: 0;
}
</style>
<?PHP
if(SETUP::$Desktop['JsdWidget']){
echo "<script data-jsd-embedded data-key='982bf560-5228-487a-8996-6c70a7b4d58f' data-base-url='https://jsd-widget.atlassian.com' src='https://jsd-widget.atlassian.com/assets/embed.js'></script>";
}
?>
<script type="text/javascript" src="<?=$_SERVER['REQUEST_SCHEME']?>://www.gstatic.com/charts/loader.js" charset="ISO-8859-1"></script>
<script type='text/javascript' charset="ISO-8859-1">
if(typeof(google)!="undefined") google.charts.load('current', {packages: ['corechart']});
</script>
<?=_FileNoCache('core.js',' Comment="Motor Javascript" id="eDesCore"')?>
<?PHP if( SETUP::$Channel['Status'] || SETUP::$ChannelDevelopment['Status'] ){ ?>
<script src="js/socket.io.js"></script>
<?PHP } ?>
<?PHP
$verServer  = file_get_contents(DIREDES."data/version");
if( SESS::$versionLocal<$verServer ){
echo "<script>";
$sentencia = file(DIREDES."data/version.js");
for($n=0; $n<count($sentencia); $n++){
$coman = trim($sentencia[$n]);
if( $coman=="" ) continue;
list($ver, $coman) = explode("|", $coman);
if( $ver>SESS::$versionLocal ){
echo "console.log(\"{$coman}\");";
echo $coman;
}
}
echo "localStorage.setItem('e-eDes', '{$verServer}');";
echo "</script>";
}
?>
<script type="text/javascript" charset="ISO-8859-1" Comment="Carga Motor Javascript">
if( !/(Chrome|Google|Opera|Vivaldi|Safari)/i.test(navigator.userAgent) ){
location.href = "edes.php?r:$nocompatible.htm&'"+escape(document.title)+"'";
}
if( window.frameElement!=null || top.location!=self.location ){
top.location.href = self.location.href;
}
try{
history.replaceState({foo:"bar"}, "-*-", '<?=SETUP::$System['UrlStatus']?>' || "edes.php");
}catch(e){}
top.S.init(window, 'all');
S.setup.system = '<?=SESS::$OS?>';
S.sheetCopyOne(window, "desktop");
<?PHP
if( $_Util['print']!=$_ENV['ON'] ){
echo 'S.sheetCopyOne(window, "print");';
}
?>
window.name = 'Main';
<?PHP if( SETUP::$System['Notification'] ){ ?>
if( S.session.notification && S.session.notification.permission!=="granted" ){
S.session.notification.requestPermission();
location.href = "edes.php?r:$nonotification.htm&'"+escape(document.title)+"'";
}
<?PHP }else{ ?>
S.session.notification = false;
<?PHP } ?>
<?PHP
include(DIREDES."js/favorite.js");
if( $_AlertCheck>0 ){
echo "S.alertCheck({$_AlertCheck});";
}
$SinNovedad = "true";
if( SETUP::$System['ReportsNews'] ){
if( empty($_novedades_) ) $_novedades_ = "0000-00-00 00:00:00";
if( qCount("{$_ENV['eDesDictionary']}gs_novedad", "cdi>='{$_novedades_}'")>0 ){
$SinNovedad = "false";
}else{
$SinNovedad = "true";
}
}
echo "var _WEB_=true,".
"_Master=".(($_gsMaster=='~')?'true,':'false,').
"_WebMaster=".((SESS::$_WebMaster==$_ENV['ON'])?'true,':'false,').
"_M_='{$_gsMaster}',".
"_ScrollWidth = S.ruleGet(top, '.SCROLLBAR::-webkit-scrollbar:horizontal').match(/[0-9]{1,3}/)[0],".
"_FontNumber='font-family:".SETUP::$CSSDynamic['FontNumbers']."',".
"_FontText='font-family:',".
"_MenuAutoHidden=".((SETUP::$Desktop['MenuAutoHidden'])?"true":"false").",".
"_NumberLevels=".(SETUP::$Desktop['NumberLevels']-1).",";
?>
_BYPHONE = <?= ((SESS::$_BYPHONE) ? 'true' : 'false') ?>,
_factorZoom = <?= SESS::$factorZoom ?>,
_CdiNovedad = '<?= $_novedades_ ?>', _SinNovedad = <?= $SinNovedad ?>,
_User = <?= $_User ?>,
_Node = <?= $_Node ?>,
_Tree = <?= $_Tree ?>,
_Avisos = <?= ($_Avisos*60000); ?>,
_pAvisos = null,
_ymd = _D2S = '<?= date('Ymd'); ?>',
_ToDay = '<?= date('Y-m-d'); ?>',
_dmy = '<?= date('d-m-Y'); ?>',
_cdi = _Y2S = '<?= date('Y-m-d H:i:s'); ?>',
_CONTEXT = '<?=SESS::$context?>'*1,
_Source="",
_WebOFF="", _WebUser="",
_NotificationWarning = null,
_ENTER = String.fromCharCode(10),
_SYSTEM = '<?=strtoupper(substr(SESS::$_Platform_,0,3))?>';
S.session.pk = '<?=$_POST["_SESS_"]?>';
S.setup.language = "_<?=SESS::$_LANGUAGE_?>";
S.setup.exitType = "<?= (SETUP::$Desktop['ExitToLogin'])? "login":"" ?>";
S.setup.selectFocusOpen = <?= ((SETUP::$Tab['SelectFocusOpen']) ? 'true' : 'false') ?>;
<?PHP
if( SESS::$SessionMaxLife!=-1 ){
echo "S.exitMaxLife(".(SESS::$SessionMaxLife-date("U")-(10*60)).", S.lng(303));";
}
if( !empty(SETUP::$System['InactivityMaxLife']) ){
echo "S.session.lockInactivity=".((int)SETUP::$System['InactivityMaxLife']*60*1000).";";
echo "S.inactivity();";
}
?>
S.marksSetup({
thousands:"<?=SETUP::$System['FormatNumber'][0]?>",
decimal:"<?=SETUP::$System['FormatNumber'][1]?>",
month:"<?=SETUP::$System['FormatMonth']?>",
date:"<?=SETUP::$System['FormatDate']?>",
datetime:"<?=SETUP::$System['FormatDateTime']?>",
delimiter:"<?=SETUP::$System['FormatDelimiter']?>",
phone:"<?=SETUP::$System["_FormatT"]?>",
formatP4:["<?=substr(SETUP::$System["_FormatP4EXP"],1,-1)?>", "<?=SETUP::$System["_FormatP4TKNdb"]?>", "<?=substr(SETUP::$System["_FormatP4EXPdb"],1,-1)?>", "<?=SETUP::$System["_FormatP4TKNuser"]?>"],
formatF4:["<?=substr(SETUP::$System["_FormatF4EXP"],1,-1)?>", "<?=SETUP::$System["_FormatF4TKNdb"]?>", "<?=substr(SETUP::$System["_FormatF4EXPdb"],1,-1)?>", "<?=SETUP::$System["_FormatF4TKNuser"]?>"],
formatCDI:["<?=substr(SETUP::$System["_FormatCDIEXP"],1,-1)?>", "<?=SETUP::$System["_FormatCDITKNdb"]?>", "<?=substr(SETUP::$System["_FormatCDIEXPdb"],1,-1)?>", "<?=SETUP::$System["_FormatCDITKNuser"]?>"],
formatT:["<?=substr(SETUP::$System["_FormatTEXP"],1,-1)?>", "<?=SETUP::$System["_FormatTTKNdb"]?>", "<?=substr(SETUP::$System["_FormatTEXPdb"],1,-1)?>", "<?=SETUP::$System["_FormatTTKNuser"]?>"],
weekday:<?=SETUP::$System['FirstWeekDay']?>,
checkbox:"<?=SETUP::$System['CheckboxValues']?>"
});
<?PHP
if( SETUP::$System['Call3CX_ON'] ){
echo "S.setup.phonePrefix = '".SETUP::$System['Call3CXPrefix']."';";
echo "S.setup.phoneFeatures = '".SETUP::$System['Call3CXFeatures']."';";
}
?>
var _secondsKeyLast = S.date("u")*1;
function _PaginarWheel(){
var obj = S.event(window);
if( S.toTag(obj, "#TREEMAIN2_SYS")!=null || S.toTag(obj, ".TREEMAIN")!=null  ){
return S.eventClear(win);
}
var win = (frames["IWORK"].document.body.offsetWidth>0 ? frames["IWORK"] : frames["IWORK2"]);
if( !win._MAXRECFULL && (S.date("u")*1)<(_secondsKeyLast+250) ){
return S.eventClear(win);
}
_secondsKeyLast = S.date("u")*1;
if( S(":HASTA", win).length ){
win.Paginar((window.event.wheelDelta<0)?'>':'<');
return S.eventClear(win);
}
}
function _PaginarKey(){
var win = (frames["IWORK"].document.body.offsetWidth>0 ? frames["IWORK"] : frames["IWORK2"]),
nChar = S.eventCode(window.event);
if( win._Obj ){
if( S.captureChar(win, nChar) ){
return false;
}else if( win._Obj=="L" && win._PaginarKey!=undefined ){
win._PaginarKey(window.event);
}else if( S.is(nChar, [34,33]) ){
if( S.is(win._Obj, ["F","G"]) ){
win._TabNext(null, pk==34 ? 1:-1);
return S.eventClear(win, evt);
}
}
}
}
</script>
<script type="text/javascript" charset="ISO-8859-1">
function listWindow(o){
if( _M_=="" ) return S.eventClear(window);
var dim = [
["-Menú"]
], index=null, label;
for(index in _gsEditStack){
if( /^[0-9]$/.test(index) || index=="" || window.name==index) continue;
label = S.replace(index, ".", "#46#");
dim.push([index, "", label]);
}
S(o).menu(dim, {function:function(op, label){
if( op==null ) return;
op = S.replace(op, "#46#", ".");
window.open("", op);
}, noMark:true});
return S.eventClear(window);
}
function screenshotDelete(){
var obj = S(".screenshotView");
if( obj.length==0 ) return;
obj.obj["s-oTR"].onwheel = null;
obj.nodeRemove();
}
function screenshotView(oTR, url){
var tmp = url.split(":"),
xyOp = S(oTR).xy(),
xyHeader = S(".HEADER").xy(),
xyScreen = S.screen(top),
x = xyOp.x+xyOp.w,
y = xyHeader.h,
height = xyScreen.h-xyHeader.h,
width = xyScreen.w-xyOp.x-xyOp.w,
newDiv;
screenshotDelete();
S.session.index++;
oTR.onwheel = function(){
var n = window.event.deltaY,
pTop = S.scrollGet(S(".screenshotView").obj).scrollTop;
pTop += n;
if( pTop<0 ) pTop = 0;
S.scrollSet(S(".screenshotView").obj, {left:0, top:pTop});
return S.eventClear(window);
};
tag = `<DIV class='screenshotView'
style= 'z-index:${S.session.index};
left:${x}px;
top:${y}px;
width:${width}px;
height:${height}px;
background-color:${S.ruleGet(top, "BODY", "backgroundColor")};'
>Loading...</div>`;
newDiv = S(tag).nodeEnd();
newDiv.obj["s-oTR"] = oTR;
S.call("E:$screenshot.php", {url:tmp[1], width:width});
}
var _treeOpen, _treeClose,
_IconFolderOpen, _IconFolderClose;
function treeMain(oSPAN, oTR, where=null){
var oTR = oTR ?? S.event(window), y;
if( oTR.tagName!="TR" ){
oTR = S.toTag(oTR, "TR");
if( oTR==null ) return;
}
if( (oTR.className && /^(SECTIONLINE|LINEATR)$/.test(oTR.className)) || S(oTR).attr("nivel")==null ){
return S.eventClear(window);
}
var i = oTR.rowIndex+1,
oTable = oTR.parentNode.parentNode,
oID = oTR.cells[0].id,
sID = "tab_"+((S.mid(oID,4,0)*1)+1),
carpeta = oTR.getAttribute("open"),
_FILAS = oSPAN.children[0].rows,
_tFILAS = _FILAS.length,
nivel = S(oTR).attr("nivel")*1, n,p,
y = S.xy(oTR)["ot"], y2,
calcLevel = (oSPAN==null)? false: S(oSPAN).attr("oneLevel")!=null,
onlyScreenshot = oTable.getAttribute("s-only-screenshot")
idSubMenu = -1;
if( onlyScreenshot==null ){
onlyScreenshot = "0";
}
if( calcLevel ){
if( !S(oSPAN).obj["niveles"] ){
S(oSPAN).obj["niveles"] = [];
if( nivel==1 ) S(oSPAN).obj["niveles"][0] = null;
}
}
if( carpeta!=null && (i==1 && oTable.getAttribute("s-mainmenu")==null) ){
return S.eventClear(window);
}
if( onlyScreenshot==1 ){
if( carpeta=="+" || carpeta=="-" ){
return;
}
where = "S";
}
if( carpeta==null ){
if( oTR.className=="OFF" ){
return S.eventClear(window);
}
screenshotDelete();
var migas=["<span class='endBreadcrumb'>"+oTR.cells[0].children[1].innerHTML+"</span>"],
url = oTR.getAttribute("op"), oldMigas=null, pOp="";
if( S("#STATELINE .endBreadcrumb"),length ){
S("#STATELINE .endBreadcrumb").html(oTR.cells[0].children[1].innerHTML);
oldMigas = S("#STATELINE").html();
}
sID = ((S.mid(oID,4,0)*1)-1);
i -= 2;
while( i>=0 ){
if( _FILAS[i].getAttribute("open")!=null && _FILAS[i].getAttribute("nivel")==sID ){
if( S.right(url,1)==":" && _FILAS[i].getAttribute("op") && _FILAS[i].getAttribute("op")[0]==":" ){
url = url+S.mid(_FILAS[i].getAttribute("op"), 1, 0);
}
migas.push(_FILAS[i].cells[0].children[1].innerHTML);
idSubMenu = _FILAS[i].getAttribute("e-SubMenu") || -1;
sID--;
}
if( sID<0 ) break;
i--;
}
if( S.right(url,1)==":" && oTR.parentNode.parentNode.className=='SUBTREE' ){
pOp = oTR.parentNode.parentNode.getAttribute("op");
url += S.mid(pOp,1,0);
}
if( S.isReady() ){
if( (where=="S" || window.event.shiftKey) && S(oTR.cells[0]).class("?SCREENSHOT") ){
screenshotView(oTR, url);
}else{
S(".TREEMAIN .CURRENT, .SUBTREE .CURRENT").class("-CURRENT");
S(oTR).class("+CURRENT");
S.execute(window, url+"&_CONTEXT="+_CONTEXT, oTR, migas.reverse(), ["e-SubMenu", idSubMenu], where);
if( S(oSPAN).attr("eAutoHidden")==1 && localStorage.getItem('e-config-tree-fixed')!="FT" ){
eAutoMenu(1);
}
if( S.toTag(oTR, "TABLE").id=="SubMenuStateLine" && oldMigas!=null ){
S("#STATELINE").html(oldMigas);
}
}
let newSubMenu = [], xpOp="";
i = oTR.rowIndex-1;
sID = (S.mid(oID,4,0)*1);
while( i>=0 ){
if( _FILAS[i].getAttribute("nivel")!=sID ){
if( oTR.parentNode.parentNode.className!='SUBTREE' ){
xpOp = _FILAS[i].getAttribute("op");
}
break;
}
i--;
}
i++;
while( i<_tFILAS ){
n = _FILAS[i].getAttribute("nivel");
if( n==sID ){
if( _FILAS[i].getAttribute("open")==null ){
newSubMenu.push(_FILAS[i].outerHTML);
}
}else if( n<sID ){
break;
}
i++;
}
if( S("#SubMenuStateLine").length ){
if( oTR.parentNode.parentNode.className=='SUBTREE' ){
xpOp = S("#SubMenuStateLine").attr("op");
}
S("#SubMenuStateLine").nodeRemove();
}
if( newSubMenu.length>1 ){
let  txt = "<table class='SUBTREE' id='SubMenuStateLine' op='"+xpOp+"' s-link onclick='treeMain(this)' oncontextmenu='treeOption()' -oncontextmenu='Favorite.add()' style='display:none;border-spacing:0px;'>"+newSubMenu.join("")+"</table>"
,oSubMenu = S(txt).nodeEnd();
S("TD", oSubMenu).css("padding:5px;");
S("#STATELINE").obj.removeAttribute("s-start");
}
}else{
top.eInfo(window, S.lng(220));
}
if( S(oSPAN).attr("eWithFilter")!=null ){
_TreeDefault();
var bakTR = oTR,
dimPadre = _OptionViewParent(oTR);
for(n=dimPadre.length-1; n>0; n--){
oTR = dimPadre[n];
if( oTR!=null ){
oTR.setAttribute("open", "+");
i = oTR.rowIndex+1;
oID = oTR.cells[0].id;
sID = "tab_"+((S.mid(oID,4,0)*1)+1);
S(oTR.cells[1].children[0]).html(_treeClose);
iconOpen(oTR);
while( i<_tFILAS && oID<_FILAS[i].cells[0].id ){
if( sID==_FILAS[i].cells[0].id ){
if( _FILAS[i].getAttribute("eNoShow")==null ){
_FILAS[i].style.display = '';
}
iconClose(_FILAS[i]);
}
i++;
}
}
}
if( S("#search").length ) S("#search").val("");
S(".TREEMAIN").attr("eWithFilter",null);
S(oSPAN).block();
y2 = S.xy(bakTR)["ot"];
S.scrollSet(oSPAN, {left:0, top:Math.abs(y2-y)});
S(oSPAN).none();
}
}else if( carpeta=="+" ){
oTR.setAttribute("open", "-");
S(oTR.cells[1].children[0]).html(_treeOpen);
iconClose(oTR);
while( i<_tFILAS && oID<_FILAS[i].cells[0].id ){
if( _FILAS[i].getAttribute("eNoShow")==null ){
_FILAS[i].style.display = 'none';
}
if( _FILAS[i].getAttribute("open")!=null ){
_FILAS[i].setAttribute("open", "-");
S(_FILAS[i].cells[1].children[0]).html(_treeOpen);
iconOpen(_FILAS[i]);
}
i++;
}
}else if( carpeta=="-" ){
if( calcLevel ){
if( S(oSPAN).obj["niveles"][nivel]!=null ){
var xTR = S(oSPAN).obj["niveles"][nivel],
xI = xTR.rowIndex+1;
xID = xTR.cells[0].id;
xTR.setAttribute("open", "-");
S(xTR.cells[1].children[0]).html(_treeOpen);
iconClose(xTR);
while( xI<_tFILAS && xID<_FILAS[xI].cells[0].id ){
if( _FILAS[xI].getAttribute("eNoShow")==null ){
_FILAS[xI].style.display = 'none';
}
if( _FILAS[xI].getAttribute("open")!=null ){
_FILAS[xI].setAttribute("open", "-");
S(_FILAS[xI].cells[1].children[0]).html(_treeOpen);
iconClose(_FILAS[xI]);
}
xI++;
}
}
S(oSPAN).obj["niveles"][nivel] = oTR;
}
oTR.setAttribute("open", "+");
S(oTR.cells[1].children[0]).html(_treeClose);
iconOpen(oTR);
while( i<_tFILAS && oID<_FILAS[i].cells[0].id ){
if( sID==_FILAS[i].cells[0].id ){
if( _FILAS[i].getAttribute("eNoShow")==null ){
_FILAS[i].style.display = '';
}
iconClose(_FILAS[i]);
}
i++;
}
if( S(oSPAN).class("?SUBTREE") ){
var sc = S.screen(window),
xy = S.xy(oSPAN);
if( (xy.y+xy.h)>sc.h ){
S(oSPAN).css({height:sc.h-xy.y});
}
}
}
S.eventClear(window);
function iconClose(oTR){
if( /^(SECTIONLINE|LINEATR)$/.test(oTR.className) ){
return;
}
var icon = oTR.cells[0].children[0].children;
if( icon.length==0 ) return;
icon = icon[0];
if( icon.tagName=="IMG" ){
icon.src = icon.src.replace('_0.', '_1.');
}else if( icon.tagName=="I" && icon.innerHTML==_IconFolderOpen ){
icon.innerHTML = _IconFolderClose;
}
}
function iconOpen(oTR){
if( /^(SECTIONLINE|LINEATR)$/.test(oTR.className) ){
return;
}
var icon = oTR.cells[0].children[0].children;
if( icon.length==0 ) return;
icon = icon[0];
if( icon.tagName=="IMG" ){
icon.src = icon.src.replace('_1.', '_0.');
}else if( icon.tagName=="I" && icon.innerHTML==_IconFolderClose ){
icon.innerHTML = _IconFolderOpen;
}
}
}
function viewStateLine(op, ev){
var  win = ev.view
,o = S.event(win);
if( o.getAttribute("s-link")==null ){
o = S.toTag(o, "!s-link");
}
if( op==2 ){
S(o["s-parent"]).attr("eHidden", null);
}else if( op==1 ){
if( o.getAttribute("s-start")==null ){
let menu = S(o.getAttribute("s-menu")).obj;
if( menu==null ){
return;
}
o.setAttribute("s-start", 1);
o.onmouseleave = function(){ viewStateLine(0, ev); }
o["s-parent"] = o;
o["s-menu"] = menu;
o["s-delay"] *= 1;
menu.onmouseleave = function(){ viewStateLine(0, ev); }
menu.onmouseover  = function(){ viewStateLine(2, ev); }
menu["s-parent"] = o;
menu["s-menu"] = menu;
}
S(o["s-parent"]).attr("eHidden", null);
S(o["s-menu"]).block();
win[o.getAttribute("s-function")]();
}else if( op==0 ){
S(o["s-parent"]).attr("eHidden", 1);
setTimeout(function(){
if( S(o["s-parent"]).attr("eHidden")==null ) return;
S(o["s-menu"]).none();
}, o["s-delay"]);
}
}
function subMenuStateLine(){
if( S("#SubMenuStateLine").length==0 ) return;
S(".endBreadcrumb").around(S("#SubMenuStateLine"), {type:"78,5,6,7", padding:-5});
}
function TreeMainNone(){
if( localStorage.getItem('e-config-tree-fixed')=="FT" ){
return;
}
S(".TREEMAIN").none();
S("#_TREEBUTTON").visible();
screenshotDelete();
}
function viewSubTree(o, on){
var oPadre = S(".TREEMIN"), tree;
screenshotDelete();
if( on==2 ){
S(oPadre).obj["eView"] = "1";
S(".TREEMIN TD[eTree='"+S.mid(o.id,7,0)+"']").css(S.ruleGet(top,".TREEMIN .HEADERSTATIC"));
S(".TREEMIN TD[eTree='"+S.mid(o.id,7,0)+"'] svg").css(S.ruleGet(top,".TREEMIN .HEADERSTATIC svg"));
}else if( on==3 ){
S(o).none();
S(oPadre).obj["eView"] = "";
S(".TREEMIN TD[eTree='"+S.mid(o.id,7,0)+"']").css("background-color:;color:");
S(".TREEMIN TD[eTree='"+S.mid(o.id,7,0)+"'] svg").css("fill:");
}else{
tree = o.getAttribute("eTree");
if( on ){
var type = S(o).around("#SUBTREE"+tree, {type:"2,3,4,17"});
if( type.x==0 ){
S("#SUBTREE"+tree).css({height:S.screen(window).h});
S(o).around("#SUBTREE"+tree, {type:"2,3,4,17"});
}
oPadre.obj["eView"] = "";
}else{
setTimeout(function(){
if( oPadre.obj["eView"]=="" ){
S("#SUBTREE"+tree).none();
}
}, 10);
}
}
}
function setupDesktop(){
var  typeTree   = localStorage.getItem('e-config-tree')
,fixedTree  = localStorage.getItem('e-config-tree-fixed')
,typeBanner = localStorage.getItem('e-config-banner')
,statusLine = localStorage.getItem('e-config-line')
,typeLine	= localStorage.getItem('e-config-line-type')
,menu = [
['-<?=$__Lng[130]?>']
,(typeTree  !="CT")? ['<?=$__Lng[131]?>','','CT'] : ['<?=$__Lng[132]?>','','ET']
,(fixedTree !="FT")? ['<?=$__Lng[133]?>','','FT'] : ['<?=$__Lng[134]?>','','LT']
,['-']
,(typeBanner!="CB")? ['<?=$__Lng[135]?>','','CB'] : ['<?=$__Lng[136]?>','','EB']
,['-']
,(statusLine!="LF")? ['<?=$__Lng[165]?>','','LF'] : ['<?=$__Lng[164]?>','','LO']
];
if( statusLine!="LF" ){
menu.push((typeLine!="LM")? ['<?=$__Lng[167]?>','','LM'] : ['<?=$__Lng[166]?>','','Lm']);
}
if( S(".TREEMAIN TABLE TBODY .SCREENSHOT").length > 0 ){
menu.push(['-']);
menu.push([S.lng(375), "", "S"]);
}
S(S.event(window)).menu(menu, {function:function(op){
setSetupDesktop(op);
}});
return S.eventClear(window);
}
function setSetupDesktop(op){
switch(op){
case "CT":
S(".TREEMAIN").none();
S("#_TREEBUTTON").hidden();
S(".TREEMIN").block();
localStorage.setItem('e-config-tree', op);
liberarMenu();
break;
case "ET":
S(".TREEMIN").none();
S(".TREEMAIN").block();
S("#_TREEBUTTON").visible();
localStorage.setItem('e-config-tree', op);
liberarMenu();
break;
case "FT":
S(".TREEMIN").none();
S(".TREEMAIN").block();
S("#_TREEBUTTON").hidden();
let width = S(".TREEMAIN").width();
S("#BOXWORK").css("paddingLeft:"+width);
S("#STATELINE").css("margin-left:"+width);
localStorage.setItem('e-config-tree-fixed', op);
localStorage.setItem('e-config-tree', 'ET');
break;
case "LT":
S(".TREEMAIN").none();
S("#_TREEBUTTON").visible();
liberarMenu();
break;
case "CB":
case "EB":
HeaderHeight(op);
break;
case "LO":
S("#STATELINE").block("inline-block");
localStorage.setItem('e-config-line', 'LO');
break;
case "LF"	:
S("#STATELINE").none();
localStorage.setItem('e-config-line', 'LF');
break;
case "LM":
S("#STATELINE").class("+STATELINE");
localStorage.setItem('e-config-line-type', 'LM');
break;
case "Lm":
S("#STATELINE").class("-STATELINE");
localStorage.setItem('e-config-line-type', 'Lm');
break;
case "S":
viewAllScreenShot();
break;
}
function liberarMenu(){
S("#BOXWORK").css("padding-left:0");
S("#STATELINE").css("margin-left:0");
localStorage.setItem('e-config-tree-fixed', "LT");
}
}
function HeaderHeight(op){
localStorage.setItem('e-config-banner', op);
var  head = S(".DESKTOP .HEADER")
,minimizado = head.attr("Minimizado")
,alto = head.css("height")
,tr = S(".USERDEFINITION TR").dim
,tmp = S(".TREEMAIN").css("top,height"), h;
minimizado = (op=="EB") ? 1: null;
if( minimizado==null ){
head.attr("Minimizado", 1);
h = head.obj.offsetHeight;
head.attr({"topBak":tmp["top"], "heightBak":tmp["height"]});
S([tr[0], tr[1]]).none();
setTimeout(function(){
h = h-head.obj.offsetHeight;
head.attr("heightHEADER", h-head.obj.offsetHeight);
S(".TREEMAIN").css("top:"+(tmp["top"]-h-1)+"; height:"+(tmp["height"]+h+1));
}, 1);
S("TD", head).css("height:30");
S(".iconSearch", head).css("top:10");
localStorage.setItem('e-config-banner', 'CB');
}else{
head.attr("Minimizado", null);
S([tr[0], tr[1]]).block();
S("TD", head).css("height:100");
S(".iconSearch", head).css("top:41");
S(".TREEMAIN").css("top:"+head.attr("topBak")+"; height:"+head.attr("heightBak"));
localStorage.setItem('e-config-banner', 'EB');
}
return S.eventClear(window);
}
function treeStateLine(o){
var obj = S.event(window);
if( event && (event.ctrlKey || event.altKey) ) S.session.runInWindow = S.date('u');
if( o['eTR'] ){
if( obj.id=="STATELINE" ){
var oMenu = S("#SUBTREE"+S(o).attr("e-SubMenu"));
if( oMenu.length>0 ){
S(o).around(oMenu);
return;
}
}
S(o['eTR']).eventFire('click');
}
}
function _ReajustaDesktop(){
if( _MenuAutoHidden ){
var oTree = S(".TREEMAIN").obj,
ocultar = (oTree.offsetWidth==0);
if( ocultar ) S(oTree).block();
var xy = S.xy(".TREEMAIN"),
h = (S(".HEADER").obj.offsetHeight/2) - (S("#_TREEBUTTON").obj.offsetHeight/2);
S(".TREEMAIN").css({
position:"absolute",
left: xy.x,
top:xy.y,
width:xy.w,
height:S.xy("#DESKTOPHEIGHT").h
});
if( ocultar ) S(oTree).none();
}
var xy = S.xy(".TREEMAIN"),
h = (S(".HEADER").obj.offsetHeight/2) - (S("#_TREEBUTTON").obj.offsetHeight/2);
S(window).rule("+#_TREEBUTTON {	top:calc(50% + "+h+"px) !important; }");
}
function _OptionViewParent(tr){
var nivel = tr.getAttribute("nivel")*1,
itr = tr.rowIndex, pNivel = nivel-1, padre = [];
while( nivel>=0 && itr>=0 ){
if( tr.getAttribute("nivel")==nivel ){
padre.push(tr);
if( tr.getAttribute("eNoShow")==null ) tr.style.display = "";
nivel = (tr.getAttribute("nivel")*1)-1;
}
itr--;
tr = tr.previousSibling;
}
return padre;
}
function _OptionSeek(obj){
var k = S.eventCode(event);
if( k==undefined || k==27 ){
S(obj).val("");
}
setSetupDesktop("ET");
_OptionSeek2(obj);
}
function _OptionSeek2(obj){
var val = S.lower(S.trim(obj.value)), nivelView=0, n;
if( val=="" ){
val = "-";
}
if( /^[0-9]{1}$/.test(val) ){
obj.value = "";
_TreeDefault((val>0)? val*1-1 : 0)
return;
}
if( /^(\-|\+)$/.test(val) ){
obj.value = "";
if( S(".TREEMAIN").obj.offsetWidth==0 ){
S("#_TREEBUTTON").hidden();
S(".TREEMAIN").block();
}
var aTR = S(".TREEMAIN TR").dim,
efopen = S(".TREEMAIN").attr("efopen"),
fClose = S(".TREEMAIN").attr("efclose");
if( val=="-" ){
S(aTR).none();
for(n=0; n<=nivelView; n++){
S(".TREEMAIN TR[nivel='"+n+"']").css("display", "");
}
S(".TREEMAIN TR[open]").each(function(k,o){
if( aTR[o.rowIndex+1].offsetWidth>0 ){
o.setAttribute("open", "+");
o.cells[1].children[0].innerText = fClose;
}else{
o.setAttribute("open", "-");
o.cells[1].children[0].innerText = efopen;
}
});
}else{
S(aTR).css("display", "");
S(".TREEMAIN TR[open]").each(function(k,o){
o.setAttribute("open", "+");
o.cells[1].children[0].innerText = fClose;
});
}
return S.eventClear(window);
}
var lowerOn = S.setup.accent.lowerOn,
lowerOff = S.setup.accent.lowerOff,
com = "+.()|=";
for(n=0; n<com.length; n++) val = S.replace(val, com[n], "\\"+com[n]);
val = S.replace(val, "?", ".");
for(n=0; n<lowerOn.length; n++) val = S.replace(val, lowerOn[n], lowerOff[n]);
for(n=0; n<5; n++){
val = S.replace(val, lowerOff[n], "("+lowerOff[n]+"|"+lowerOn[n]+"|"+lowerOn[n+5]+"|"+lowerOn[n+10]+"|"+lowerOn[n+15]+")");
}
val = S.replace(val, "*", ".*");
var exp = new RegExp(val, "i");
if( !exp.test(S(".TREEMAIN").text()) ){
S(obj).info(304, 2);
return;
}
if( S(".TREEMAIN").obj.offsetWidth==0 ){
S("#_TREEBUTTON").hidden();
S(".TREEMAIN").block();
}
S(".TREEMAIN").attr("eWithFilter",1);
var oTD = S(".TREEMAIN TABLE TBODY TR td:nth-child(1)").dim,
t = oTD.length, i,nivel,tr,itr;
for(n=0; n<t; n++){
tr = oTD[n].parentElement;
if( val=="*" || exp.test(oTD[n].textContent) ){
_OptionViewParent(tr);
}else{
if( tr.getAttribute("eNoShow")==null ) tr.style.display = "none";
}
}
S.eventClear(window);
}
function viewAllScreenShot(){
var  alto = S(".DESKTOP .HEADER").css("height")
,ancho = S(".TREEMAIN").css("width");
setSetupDesktop("ET");
setSetupDesktop("FT");
S("<span id='ScreenShotMAIN'>"+S.lng(376)+"</span>")
.nodeEnd("body")
.css(`width:${ancho}px; height:${alto};`)
.on("click", function(ev){
var obj = S.event(ev);
S(".TREEMAIN TABLE").attr("s-only-screenshot", null);
S("#search").visible();
S(".favorite").visible();
S(obj).nodeRemove();
S("#search").val("1");
_OptionSeek2(S("#search").obj);
});
S("#STATELINE").hidden();
S("#search").hidden();
S(".favorite").hidden();
S(".TREEMAIN TABLE").attr("s-only-screenshot", 1);
S(".TREEMAIN TABLE TBODY TR").none();
S(".TREEMAIN TABLE TBODY .SCREENSHOT").each(function(k, o){
S(o.parentNode).block();
_OptionViewParent(o.parentNode);
});
}
function _TreeDefault(userNivel){
var showNivel = _NumberLevels,
_FILAS = S(".TREEMAIN TR").dim,
_tFILAS = _FILAS.length, i=0;
if( typeof(userNivel)!="undefined" ){
showNivel = userNivel;
}
while( i<_tFILAS ){
if( _FILAS[i].getAttribute("eNoShow")==null ){
if( _FILAS[i].getAttribute("nivel")>=showNivel ){
if( _FILAS[i].getAttribute("nivel")>showNivel ){
_FILAS[i].style.display = 'none';
}else{
_FILAS[i].style.display = '';
}
if( _FILAS[i].getAttribute("open")!=null ){
_FILAS[i].setAttribute("open", "-");
S(_FILAS[i].cells[1].children[0]).html(_treeOpen);
if( !/^(SECTIONLINE|LINEATR)$/.test(_FILAS[i].className) && _FILAS[i].cells[0].children[0].tagName=="IMG" ){
_FILAS[i].cells[0].children[0].src = _FILAS[i].cells[0].children[0].src.replace('_1.','_0.');
}
}
}else if( _FILAS[i].getAttribute("open")!=null ){
_FILAS[i].setAttribute("open", "+");
S(_FILAS[i].cells[1].children[0]).html(_treeClose);
if( !/^(SECTIONLINE|LINEATR)$/.test(_FILAS[i].className) && _FILAS[i].cells[0].children[0].tagName=="IMG" ){
_FILAS[i].cells[0].children[0].src = _FILAS[i].cells[0].children[0].src.replace('_1.','_0.');
}
}
}
i++;
}
}
function eAutoMenuLeft(op){
if( localStorage.getItem("e-config-tree-fixed")=="FT" ){
return S.eventClear(window);
}
if( op==undefined ){
var o = S.event(window);
if( o.tagName!="BODY" && o.id!="_TREEBUTTON" ){
return S.eventClear(window);
}
}
if( S(".TREEMIN").length && S(".TREEMIN").obj.offsetWidth>0 ){
}else if( event.type=="mouseover" || event.clientX==0 ){
if( S(".TREEMAIN").css("display")=="none" ){
S(".TREEMAIN").block();
S("#_TREEBUTTON").hidden();
}else{
S(".TREEMAIN").none();
S("#_TREEBUTTON").visible();
}
}
return S.eventClear(window);
}
function treeOption(){
var oTD = S.toTag(S.event(window), "TD")
oTR = S.toTag(oTD, "TR");
if( oTR.getAttribute("open")!=null ) return S.eventClear(window);
let menu = [
["-"+S.lng(308)]
,[S.lng(309), "A", "M"]
,[S.lng(310), "E", "W"]
,[S.lng(311), "&#222;", "C"]
], addHR=false;
if( S(".favorite").length ){
menu.push(["-"]);
if( S.toTag(oTR, "#SUBTREE-Favorite") ){
menu.push([S.lng(313, "Off"), "Z", "F"]);
}else{
if( S("SVG", oTD).attr("setFavorite")=="1" ){
menu.push([S.lng(313, "Off"), "Z", "F"]);
}else{
menu.push([S.lng(313, "On"), "Z", "F"]);
}
}
}
if( oTR.cells[0].classList.contains("SCREENSHOT") ){
menu.push(["-"]);
menu.push([S.lng(312), "{", "S"]);
}
if( top.gsEdit ){
menu.push(["-"]);
menu.push([S.lng(314), "F", "E"]);
}
S(oTD).menu(menu
,{
function:function(op, label, fTrigger, oTr, oTable, para){
if(op==null) return;
var  oTD = para.arg, href
,oSPAN = S.toTag(oTD, ".TREEMAIN") ?? S.toTag(oTD, ".SUBTREE");
switch(op){
case "M":
case "W":
case "S":
case "C":
treeMain(oSPAN, oTR, op);
break;
case "F":
Favorite.add(oTR);
break;
case "E":
href = oTR.getAttribute("op");
if( S.right(href, 1)==":" ){
let el = oTR;
while(el.getAttribute("open")==null){
el = el.previousSibling;
}
href += S.mid(el.getAttribute("op"), 1, 0);
}
href = S.mid(S.getUrl(href).url+"&", ":", "&");
top.gsEdit(window, href, 10);
break;
}
}
,drop:true
,out:true
,point:1
,"+x":-10
,"+y":-10
}
,{arg:oTD}
);
return S.eventClear(window);
}
S.Extend({
opEnable: function(a, tf){
var dim = S.nsp(a).split(","), n,o;
if( tf ){
for(n=0; n<dim.length; n++){
S("TR[eAlias='"+dim[n]+"']").attr({"eAliasBAK": dim[n], "eAlias": null, "eNoShow": null});
}
var ef = S(".TREEMAIN").attr("efOpen,efClose");
S([".TREEMAIN TR[nivel]", ".TREEMIN TR[nivel]", ".SUBTREE TR[nivel]"]).each(function(k,o){
n = o.getAttribute("nivel");
if( o.getAttribute("open")!=null ){
o.setAttribute("open", "-");
S(o.cells[1].children[0]).html(ef["efClose"]);
}
if( n>0 ) S(o).none();
});
}else{
for(n=0; n<dim.length; n++){
S("TR[eAliasBAK='"+dim[n]+"']").attr({"eAlias": dim[n], "eAliasBAK": null, "eNoShow": 1}).none();
}
}
}
,downloadCenter: function(){
var obj = S.event(window);
if( S(obj).class("?OFF") ) return;
S.window('edes.php?Lml:$a/d/download_center', {
title:'Download center',
minimize:true,
maximize:false,
close:true,
print:false,
fullscreen:true
});
}
});
</script>
</head>
<body style="margin:0px;padding:0px;vertical-align:top;visibility:hidden;padding-left:1px;"
onresize="_ReajustaDesktop()"
onmouseover="eAutoMenuLeft()"
onmousemove="S.inactivity()"
ontouchstart="S.inactivity()"
onkeydown="_PaginarKey()"
onwheel="_PaginarWheel()"
>
<span class='MODAL' id='TAPAINIT' onselectstart='return S.eventClear(window)' style='position:absolute;z-index:9999999;width:100%;height:100%;'>
<div class='loader' style='position:relative; top:50%; left:50%;'></div>
</span>
<?PHP if( SETUP::$Desktop['MenuAutoHidden']==1 || SETUP::$Desktop['MenuAutoHiddenOptional']==1 ){ ?>
<i class="ICONDESKTOP" id="_TREEBUTTON" onmouseover='eAutoMenuLeft()' title="Mostrar menú" style="position:fixed;z-index:9000;top:50%;left:0px;visibility:hidden">></i>
<?PHP } ?>
<table class="DESKTOP" border="0px" style="width:100%;height:100%;border:0px;border-collapse:collapse;padding:0px;margin:0px;" cellspacing="0px" cellpadding="0px">
<tr><td style="height:1px;width:100%;padding:0px; -border-bottom:2px solid rgb(0 0 0 / 0.1);">
<table class="HEADER SHADOW" style="width:100%;border:0px;border-collapse:collapse;<?=(SETUP::$_DevelopmentSrv && SETUP::$System['DevelopmentBackgroundColor']!="" ? "background-color:".SETUP::$System['DevelopmentBackgroundColor']:"")?>" cellspacing=0px cellpadding=0px>
<tr>
<td style="white-space:nowrap;">
<?PHP
if( file_exists("../_datos/config/desktop_user_web.ini") ){
$sPHPIni = $_PHPINI;
$_PHPINI = file_get_contents("../_datos/config/desktop_user_web.ini");
_genContext();
file_put_contents("../_datos/config/desktop_user_web.tmp", $_PHPINI);
$_PHPINI = $sPHPIni;
unset($sPHPIni);
}
if( file_exists("../_datos/config/desktop_user_web.tmp") ){
$sPHPIni = $_PHPINI;
$_PHPINI = file_get_contents("../_datos/config/desktop_user_web.tmp");
_genContext();
$_PHPINI = $sPHPIni;
unset($sPHPIni);
include("../_datos/config/desktop_user_web.tmp");
}
?>
</td>
</tr>
</table>
</td></tr>
<tr><td id="DESKTOPHEIGHT" style="height:100%;padding:0px;">
<table style="width:100%;height:100%;border:0px;border-collapse:collapse;" cellspacing="0px" cellpadding="0px">
<tr>
<td width=1px style="padding:0px;vertical-align:top">
<?PHP
include(DIREDES.'arbol.inc');
$_OptionsFilter = "";
CalculaArbolDeOpciones($_User, $_TypeTree, $_Tree, $_TreeNom, $_DesktopIconType, true);
PintaMenu($_DimTree, true);
?>
</td>
<td width=100% style="padding:0px">
<table style="width:100%;height:100%;border:0px;border-collapse:collapse;" cellspacing=0px cellpadding=0px>
<tr><td style="padding-left:3px;height:1px;font-size:100%;" class="STATELINE-BOX">
<span id="STATELINE" s-link s-menu="#SubMenuStateLine" s-function="subMenuStateLine" s-delay=200 onmouseenter="viewStateLine(1, event)" onclick="treeStateLine(this)" style="visibility:hidden">&nbsp;</span>
</td></tr>
<tr><td height=100% id="BOXWORK">
<iframe frameborder=0px name="IWORK2" eNORESIZE=true src="" eAccess="1" style="width:100%;height:100%;display:none;"></iframe>
<iframe frameborder=0px name="IWORK" eNORESIZE=true src="<?=((SETUP::$System['StartURL']!="")? SETUP::$System['StartURL']:"")?>" eAccess="2" style="width:100%;height:100%;"></iframe>
<table class='WINDOWLOADING' onclick='S(this).hidden();S.eventClear(window);' style='position:absolute'>
<tr><td align='center' valign='middle'>
<div class='loader'></div>
</td></tr>
</table>
</td></tr>
</table>
</td>
</tr>
</table>
</td></tr>
</table>
<div id="PROGRESS" style="display:none">
<table border=0px cellSpacing=0px cellPadding=0px style="width:100%;">
<tr><th class="progress-title"></th></tr>
<tr><td>
<div class="progress-wrap">
<div class="progress-value" style='background-image:url(<?=$_PathIMG?>/progress.png)'></div>
<div class="progress-text" style='background-image:url(<?=$_PathIMG?>/progress.png)'></div>
</div>
</td></tr>
<tr><td class="Detail"></td></tr>
</table>
</div>
<TABLE id=ContenedorHelp class='MODAL' style='background-color:transparent;z-index:99999999;position:absolute;left:0;top:0;width:100%;height:100%;cursor:var(--cAuto);display:none;'>
<TR><TD align=center valign=middle></TD></TR>
</TABLE>
<div class="PROGRESSUPLOAD" title="Enviando ficheros...">
<div id="PROGRESSVALUE">&nbsp;</div>
<div id="PROGRESSNUMBER">&nbsp;</div>
<div id="PROGRESFILE"></div>
</div>
<span id="PROGRESSCIRCLE">
<div id="PROGRESSCIRCLEVALUE"></div>
</span>
<audio id="SOUNDNOTIFICATION"></audio>
<audio id="SOUNDWARNING"></audio>
<?PHP
if( SETUP::$Channel['Status'] || SETUP::$ChannelDevelopment['Status'] ){
include(DIREDES."a/chat/rooms.php");
}
PintaMenu($_DimTree, false);
unset($_DimTree);
PintaMenuFavorite();
?>
<iframe frameborder="0px" src="" id="IEVENTSORCE" name="IEVENTSORCE" eNORESIZE=true eAccess="3" style="z-index:10000;display:none;position:absolute;left:0px;top:0px;width:100%;height:200px;border-width:1px 1px 1px 0px;border-color:#9900cc;border-style:solid;"></iframe>
<?PHP
for($i=0; $i<2; $i++){
echo eIcon("==".$IconFolder[$i], "id='IconFolder".($i==0 ? "Close":"Open")."' style='display:none'");
}
if( SETUP::$System['Call3CX_ON'] ) echo '<a href="tel:" id="_Call3CX" style="display:none"></a>';
?>
<script type="text/javascript" charset="ISO-8859-1">
S(frames["IWORK"].frameElement).attr("WOPENER", window);
function gsWidget(tipo, start){
if( tipo=="jsd" ){
if( start!=undefined ){
if( S("iframe[id='jsd\-widget']").length==0 ){
setTimeout(function(){
gsWidget(tipo, true);
}, 10);
}else{
S("iframe[id='jsd\-widget']").hidden();
}
}else{
S("iframe[id='jsd\-widget']").css("visibility:visible;top:0");
S.modal({function:function(body, fondo){
S("iframe[id='jsd\-widget']").hidden();
S(fondo).nodeRemove();
}});
}
}
}
var _oIWORK, _pIWORK;
function eInitIWork(){
if( document && document.body && S(":IWORK").obj!=null ){
_oIWORK = S(":IWORK").nodeCopy();
_pIWORK = S(":IWORK").obj.parentNode;
_IconFolderOpen = S("#IconFolderOpen").html();
_IconFolderClose = S("#IconFolderClose").html();
S.scrollSetWidth();
<?PHP if( SETUP::$System['Call3CX_ON']!="" ){ ?>
setTimeout(function(){
S.setup.phoneURL = (S("#_Call3CX").attr("tcxhref") || "<?=SETUP::$System['Call3CXUrl']?>");
}, 3000);
<?PHP } ?>
<?PHP if( SETUP::$Channel['Status'] || SETUP::$ChannelDevelopment['Status'] ){ ?>
setTimeout(function(){
S.session.index += 2;
S(".CHAT_SYSTEM").css("z-index:"+S.session.index);
S("#ICON_CHATROOM").visible();
if( S("#ICON_ROOMNOREAD").text()*1>0 ) S("#ICON_ROOMNOREAD").visible();
}, 3000);
<?PHP } ?>
<?PHP if( SETUP::$Desktop['JsdWidget'] ){ ?>
gsWidget('jsd', true);
<?PHP } ?>
<?PHP if( S::qCount("{$_ENV['eDesDictionary']}gs_download", "cd_gs_user=".S::$_User) ){ ?>
<?PHP
$total = S::qCount("{$_ENV['eDesDictionary']}gs_download", "status='P' && cd_gs_user=".S::$_User);
if( $total>0 ){
echo "S.infoBackground({$total});";
echo 'setTimeout(function(){top.frames["IEVENTSORCE"].location.href = top.S.urlAdd("edes.php?E:$info2plano.php&time='.time().'");},1);';
}
?>
S("#_DOWNLOADCENTER").class("-OFF");
<?PHP } ?>
document.body.style.visibility = "visible";
top._FontText += S.filterChar(S.ruleGet(top, "*", "font-family"), '\\"');
<?PHP if( SESS::$_SystemUser==$_ENV["ON"] && file_exists("../_tmp/err/slow.sql") ){ ?>
S.alert({"title":'Warning', "text":'Slow sql statements found.<br>/_tmp/err/slow.sql', "button":'A', "icon":'W'});
<?PHP } ?>
}else{
setTimeout(function(){
eInitIWork();
}, 500);
}
}
function eSeguridad(){
S.window('edes.php?E:$docsecurity.gs', {
title:"<?=$__Lng[162]?>",
minimize:false,
maximize:false,
close:false,
noDestroy:true,
fullscreen:true
});
}
function eCambiarClave(){
S.window('edes.php?FmR:$a/d/usu_clave_who.edf&_SEEK&cd_gs_user=<?=S::$_User?>&_CADUCADO=1', {
title:"<?=$__Lng[161]?>",
minimize:false,
maximize:false,
close:false,
noDestroy:true,
modal:true
});
}
function eNovedades(){
S.window('edes.php?E:$a/d/gs_novedades.gs&_HA=1', {
title:'ÚLTIMAS NOVEDADES',
modal:true
});
}
<?PHP if( $_Util['system_user']==$_ENV['ON'] ){ ?>
function eDevelopment(){
if( S.is("eDesPassword=", document.cookie) ){
S.call("edes.php?E:CallSrv=$a/d/development.edf&LoginPC=34");
}else{
S.window('edes.php?Fa:$a/d/development', {
title:'LOGIN DEVELOPMENT',
minimize:false,
maximize:false,
print:false,
modal:true
});
}
}
<?PHP } ?>
function eUltimoAcceso(){
<?PHP
list($Y, $m, $d, $H, $i, $s) = explode(" ",date('Y m d H i s'));
$cdi = date('Y-m-d H:i:s', mktime($H, $i, $s, $m-6, $d, $Y));
if( qCount("{$_ENV['eDesDictionary']}gs_conexion", "cd_gs_user={$_User} and cdi>'{$cdi}'")>1 ){
qQuery("select cdi, cdi_fin from {$_ENV['eDesDictionary']}gs_conexion where cd_gs_user={$_User} and cdi>'{$cdi}' order by cdi desc");
qRow();
$r=qRow();
list($a,$m,$d) = explode("-", str_replace(" ","-",$r[0]));
$diaIni = $__Lng[date("w", mktime(0,0,0,$m,$d,$a))+7];
$diaFin = "";
if( $r[1]!="" ){
list($a,$m,$d) = explode("-",str_replace(" ","-",$r[1]));
$diaFin = $__Lng[date("w", mktime(0,0,0,$m,$d,$a))+7];
}
$titulo = eAsciiToCode($__Lng[137]);
$diaIni = eAsciiToCode($diaIni);
$diaFin = eAsciiToCode($diaFin);
$entrada= $__Lng[138];
$salida = $__Lng[139];
?>
setTimeout(function(){
S.info("<table><caption><b><?=$titulo?></b></caption><tr><td align=right><?=$entrada?>: </td><td style='font-family:numeric'><?=$r[0].' '.$diaIni?></td></tr><tr><td align=right><?=$salida?>:  </td><td style='font-family:numeric'><?=$r[1].' '.$diaFin?></td></tr></table>", 10);
}, 2000);
<?PHP
}
?>
}
<?PHP if( !$EntrasPorLaVPN ){ ?>
S.alert({
title	: 151,
icon	: '<img src="g/sys_exit.gif">',
button	: "A",
text	: 295,
function: function(){
top.document.write(S.lng(295));
}
});
<?PHP } ?>
<?PHP
$dimFunciones = array();
if( $_ViewInfoNovedad && $SinNovedad=="false" ) $dimFunciones[] = 'eNovedades();';
if( $_ViewPassChange==1 ) $dimFunciones[] = 'eCambiarClave();';
if( $_ViewDocSecurity ) $dimFunciones[] = 'eSeguridad();';
if( SETUP::$Desktop['SeeLastAccess'] ) $dimFunciones[] = 'eUltimoAcceso();';
if( $_Util['system_user']==$_ENV['ON'] ) $dimFunciones[] = 'eDevelopment();';
eContextPut('E:$docsecurity.gs');
eContextPut('FmR:$a/d/usu_clave_who.edf&_SEEK&cd_gs_user='.S::$_User);
eContextPut('E:$a/d/gs_novedades.gs');
eContextPut('Ll:$a/d/gs_novedad.edf');
eContextPut('E:$default.php');
eContextPut('E:$a/u/tools.gs&X');
if( SETUP::$System['StartURL']!='' ) eContextPut(SETUP::$System['StartURL']);
echo '</script>';
function PintaMenu($op, $principal){
global $_ScreenShot, $screenshot, $IconDoc, $IconFolder;
$MenuIcons = array();
$cls = "";
if( $principal ){
?>
<span
class="TREEMAIN SCROLLBAR"
<?=((SETUP::$Desktop['DefaultTreeOneLevel'])?" oneLevel":"")?>
eAutoHiddenOptional="<?=SETUP::$Desktop['MenuAutoHiddenOptional']?>"
eAutoHidden="<?=SETUP::$Desktop['MenuAutoHidden']?>"
<?=((SETUP::$Desktop['MenuAutoHidden'])?' onmouseleave=\'TreeMainNone()\'':"")?>
eFClose="<?=SETUP::$Desktop['DefaultTreeFolder'][0]?>"
eFOpen="<?=SETUP::$Desktop['DefaultTreeFolder'][1]?>"
onclick="treeMain(this)"
on-contextmenu="Favorite.add()"
oncontextmenu="treeOption()"
on-wheel="return eClearEvent(window)"
style="z-index:2;visibility:hidden;position:relative;top:0px;display:block;height:100%;overflow-x:hidden;overflow-y:auto;"
onselectstart="return false"
edesclick="1"
>
<table border='0px' cellspacing='0px' cellpadding='0px' s-mainmenu><tbody>
<?PHP
}
eContextPut('E:$estadistica.gs&F=1');
$left = 0;
$newTree = false;
$DimUrl = array();
$indent = 0;
for($n=0; $n<count($op); $n++){
$r = $op[$n];
if( !$principal ){
if( $r["indent"]==0 ){
if( $newTree ){
echo "</table></span>";
}
echo '<span class="SUBTREE SCROLLBAR" id="SUBTREE'.$n.'"'.((SETUP::$Desktop['DefaultTreeOneLevel'])?" oneLevel":"").' eFClose="'.SETUP::$Desktop['DefaultTreeFolder'][0].'" eFOpen="'.SETUP::$Desktop['DefaultTreeFolder'][1].'" onclick="treeMain(this)" oncontextmenu="treeOption()" -oncontextmenu="Favorite.add()" onmouseenter="viewSubTree(this,2)" onmouseleave="viewSubTree(this,3)" on-wheel="return eClearEvent(window)" style="visibility:hidden;position:absolute;top:0px;left:'.$left.'px;display:block;overflow-x:hidden;overflow-y:auto;" onselectstart="return false" edesclick="1">';
echo "<table id='tab0' border='0px' cellspacing='0px' cellpadding='0px'><tbody>";
$newTree = true;
$r['icon'] = "";
$indent = $r["indent"];
}
}
if( $r["type"]=="D" ) continue;
$url = $r["script_url"];
$sType = $r["type"];
$opOcultas = false;
if( $sType=="F" && preg_match('/^(L|=){1}(g|c|m|b){1}l:$/', substr($url,0,4)) ){
$sType = "O";
$opOcultas = true;
}
$script = $url;
if( !empty($script) && $script[0]=="¿"){
list($macro, $script) = explode("?", substr($script,1));
$script = trim($script);
$macro = str_replace(array("&#34;","&#39;"), array('"',"'"), $macro);
if( $GLOBALS['_DEBUG']==14 ) eTron("eval: return {$macro};");
if( !eval("return {$macro};") ) continue;
}
if( eSubstrCount($url,'ShowBrowserUI')>0 || eSubstrCount($url,'>/_datos/config/install.php')>0 ) continue;
$_NivelesVisibles = 1;
if( $r["indent"]>($_NivelesVisibles-2) ){
$xop = "+";
$cls = " class=MINI";
$rotate = SETUP::$Desktop['DefaultTreeFolder'][0];
}else{
$xop = "-";
$cls = "";
$rotate = SETUP::$Desktop['DefaultTreeFolder'][1];
}
if( !$principal ){
$cls = "";
if( $r["indent"]>0 ) $cls = " class=MINI";
}
$url = str_replace(array("#user#", "#node#"), array(S::$_User, SESS::$_Node), $url);
if( eSubstrCount($url, '{$')>0 ) $url = _InVar( $url );
if( $r['icon']!="" ){
if( eFileType($r['icon'])=="svg" ){
$r['icon'] = file_get_contents(str_replace('$', 'edes.php?R:$a/g/', $r['icon']));
}else if( $r['icon'][0]=="$" ){
$r['icon'] = '$a/g/'.substr($r['icon'],1);
$r['icon'] = "<img src='edes.php?R:{$r['icon']}'>";
}else if( eSubstrCount($r['icon'],".")==0 ){
$r['icon'] = eIcon($r['icon'], "", "ICONMENU");
}else{
$r['icon'] = "<img src='{$r['icon']}'>";
}
}else{
$r['icon'] = "<span class='ICONHIDDEN'></span>";
}
$tIndex = $r["indent"];
$eNoShow = ($r["show_type"]!="H") ? "" : " eNoShow=1";
if( $r["alias"]!="" ) $eNoShow .= " eAlias='{$r['alias']}'";
if( $sType=="F" ){
if( SETUP::$Desktop['DefaultTreeIcon'] && (!SETUP::$Desktop['DefaultTreeNoIcon'] || $r['icon']=="") ){
$r['icon'] = eIcon("==".$IconFolder[0], "eIcon='{$IconFolder}'", "ICONWINDOW");
}
$DimUrl[$r["indent"]] = $url;
echo "<tr op='{$url}' open='{$xop}' nivel='{$r['indent']}'{$eNoShow}";
if( $r['indent']==0 ){
echo " e-SubMenu='{$n}' style='position:sticky; left:0; top:0'";
}
echo "><td class='UnPX' id='tab_{$tIndex}' nowrap><span>{$r['icon']}</span><span>".$r["caption"]."</span></td>";
echo "<td class='UnPX'><i class='ICONWINDOW'>{$rotate}</i></td></tr>";
if( $r["indent"]==0 ) $MenuIcons[] = array($r['icon'], $n);
}else if( $sType=="L" ){
if( $r["caption"]=="" ){
echo "<tr class='LINEATR' nivel='{$r['indent']}'{$eNoShow}><td colspan='2' class='LINEA'></td></tr>";
}else if( $r["indent"]==0 ){
echo "<tr class='SECTIONLINE' nivel='{$r['indent']}'{$eNoShow}><td colspan='2' id='tab_{$tIndex}' nowrap><span>".substr($r["caption"],1)."</span></td></tr>";
}else if( trim(substr($r["caption"],1))=="" ){
echo "<tr class='LINEATR' nivel='{$r['indent']}'{$eNoShow}><td colspan='2' class='LINEA' id='tab_{$tIndex}' nowrap>".substr($r["caption"],1)."</td></tr>";
}else{
echo "<tr nivel='{$r['indent']}'{$eNoShow}><td colspan='2' class='LINEA' id='tab_{$tIndex}' nowrap><span>".substr($r["caption"],1)."</span></td></tr>";
}
}else{
if( SETUP::$Desktop['DefaultTreeIcon'] ){
$r['icon'] = eIcon("==".$IconDoc, "", "ICONWINDOW");
}
if( substr($url,-1)!=")" ){
$script = $url;
if(substr($url,-1)==":") $script = $script.substr($DimUrl[$r["indent"]-1],1);
if($script[0]=="#")  $script = "F".substr($script,1);
else if($script[0]=="@")  $script = "G".substr($script,1);
if( eSubstrCount(substr($script,0,4),":")==1 ){
if( eSubstrCount($script,".")==0 ){
eExplodeOne( $script, "&", $script, $masParametros );
if($script[0]=="G")  $script .= ".gdf";
else $script .= ".edf";
if($masParametros!='') $masParametros = "&".$masParametros;
$script .= $masParametros;
}
}
if(mb_strtoupper($script[0])=="W") $script = trim(substr($script,1));
if($script[0]=="2" || $script[0]=="3") $script = trim(substr($script,1));
if($script[0]=="?"){
$script = trim(substr($script,1));
if($script[0]=="2" || $script[0]=="3") $script = trim(substr($script,1));
}
if(mb_strtoupper($script[0])=="M") $script = trim(substr($script,1));
if(mb_strtoupper($script[0])==">") $script = "E:".substr($script,1);
if(substr($script,0,9)=="edes.php?") $script = trim(substr($script,9));
else if(substr($script,0,8)=="edes.gs?") $script = trim(substr($script,8));
eContextPut($script);
}
if( $r["show_type"]=="H" ){
echo "<tr op='{$url}' nivel='{$r['indent']}' style='display:none'{$eNoShow}>";
}else{
echo "<tr op='{$url}' nivel='{$r['indent']}'>";
}
$addData = "";
if( $_ScreenShot && $r["show_type"]!="H" && !empty($url) && strpos($url, ":")!==false ){
list(,$screenshotFile) = explode(":", $url);
if( empty($screenshotFile) ){
for($i=$n-1; $i>=0; $i--){
if( !empty($op[$i]["script_url"]) && $op[$i]["script_url"][0]==":" ){
$screenshotFile = substr($op[$i]["script_url"], 1);
break;
}
}
}
if( !empty($screenshot[$screenshotFile]) ){
$addData = " SCREENSHOT";
}
}
echo "<td class='UnPX{$addData}' id='tab_{$tIndex}' nowrap><span>{$r['icon']}</span><span>".$r["caption"].'</span></td><td class="UnPX"></td></tr>';
if( $opOcultas ){
for($i=$n+1; $i<count($op); $i++){
if( $op[$i]["show_type"]!="H" ){
$n = $i-1;
break;
}
}
}
}
$indent = $r["indent"];
}
echo '</tbody></table>';
echo '</span>';
if( $principal ){
$actionMenu = ((SETUP::$Desktop['MenuIconOverClick']=="C")? 'onclick="viewSubTree(this,1)"' : 'onmouseenter="viewSubTree(this,1)"');
echo '<span class="TREEMIN" style="position:relative;top:0px;display:none;height:100%;overflow:hidden" on-wheel="return eClearEvent(window)">';
echo "<table height=100% style='padding:0px;margin:0px;' cellspacing='0px' cellpadding='0px'><tbody>";
for($n=0; $n<count($MenuIcons); $n++){
echo "<tr><td eTree='".$MenuIcons[$n][1]."' {$actionMenu} onmouseleave='viewSubTree(this,0)' nivel=0><span>".$MenuIcons[$n][0]."</span></td></tr>";
}
echo "<tr class='SECTIONLINE'><td height=100%></td></tr>";
echo '</tbody></table>';
echo '</span>';
}
}
function PintaMenuFavorite(){
echo '<span class="SUBTREE SCROLLBAR" id="SUBTREE-Favorite" onclick="treeMain(this)" on-wheel="return eClearEvent(window)" oncontextmenu="treeOption()" -oncontextmenu="Favorite.add()" onmouseleave="Favorite.hidden(this)" style="visibility:hidden;position:absolute;top:0px;left:0px;height:90%;overflow-x:hidden;overflow-y:auto;z-index:1" onselectstart="return false" edesclick="1">';
echo "<table border='0px' cellspacing='0px' cellpadding='0px'><tbody>";
echo "</tbody></table>";
echo "</span>";
}
$Hoy = date('Y-m-d');
$txt = '';
if( eFileGetVar('Login.HostGet') ) $txt = ", host='".$REMOTE_ADDR."'";
qQuery("update {$_ENV['eDesDictionary']}gs_user set dt_access_last='{$Hoy}'{$txt} where cd_gs_user={$_User}");
?>
<script type="text/javascript" charset="ISO-8859-1">
document.body.onload = function(){
document.body.onkeydown = function(e){
if( (e.ctrlKey || e.altKey) && e.keyCode==80 ){
return S.eventClear(window, event);
}
_PaginarKey();
}
eInitIWork();
<?php
$file = "../_datos/usr/{$_User}.favorites";
if( file_exists($file) ){
$dim = file($file);
for($n=0; $n<count($dim); $n++) $dim[$n] = trim($dim[$n]);
echo 'var ops = ["'.implode('","', $dim).'"];';
}else{
echo 'var ops = [];';
}
?>
Favorite.init(S(".favorite").obj, ops);
S(".TREEMAIN").css({
width: S(".TREEMAIN").css("width")+10
});
S(".TREEMAIN").obj.children[0].style.width = "100%";
S(".SUBTREE>TABLE:first-child>TBODY>TR:first-child>TD:last-child>I").none();
S(".SUBTREE>TABLE:first-child>TBODY>TR:first-child>TD:first-child>SVB").none();
S(".SUBTREE>TABLE:first-child>TBODY>TR:first-child>TD:first-child>I").none();
S(".SUBTREE>TABLE:first-child>TBODY>TR:first-child>TD:first-child>IMG").none();
_treeOpen  = S(".TREEMAIN").attr("eFOpen");
_treeClose = S(".TREEMAIN").attr("eFClose");
var showNivel = "tab_<?=(SETUP::$Desktop['NumberLevels'])?>", i=0;
var _FILAS = S(".SUBTREE TR").dim,
_tFILAS = _FILAS.length;
while( i<_tFILAS ){
if( _FILAS[i].cells[0].id>=showNivel ){
if( _FILAS[i].cells[0].id>showNivel ) _FILAS[i].style.display = 'none';
if( _FILAS[i].getAttribute("open")!=null ){
_FILAS[i].setAttribute("open", "-");
S(_FILAS[i].cells[1].children[0]).html(_treeOpen);
if( !/^(SECTIONLINE|LINEATR)$/.test(_FILAS[i].className) && _FILAS[i].cells[0].children[0].tagName=="IMG" ){
_FILAS[i].cells[0].children[0].src = _FILAS[i].cells[0].children[0].src.replace('_1.','_0.');
}
}
}else{
if( _FILAS[i].getAttribute("open")!=null ){
_FILAS[i].setAttribute("open", "+");
S(_FILAS[i].cells[1].children[0]).html(_treeClose);
if( !/^(SECTIONLINE|LINEATR)$/.test(_FILAS[i].className) && _FILAS[i].cells[0].children[0].tagName=="IMG" ){
_FILAS[i].cells[0].children[0].src = _FILAS[i].cells[0].children[0].src.replace('_1.','_0.');
}
}
}
i++;
}
S(".SUBTREE").visible();
S(".SUBTREE .MINI").none();
S(".SUBTREE").none();
<?PHP if( SETUP::$Desktop['DefaultTreeIcon'] ){ ?>
<?PHP } ?>
_TreeDefault();
S(".TREEMAIN").visibility();
<?PHP if( SETUP::$Desktop['MenuAutoHidden']==1 || SETUP::$Desktop['MenuAutoHiddenOptional']==1 ){ ?>
_ReajustaDesktop();
<?PHP } ?>
<?PHP
for($n=0; $n<count($dimFunciones); $n++){
echo $dimFunciones[$n];
}
echo "var eConfigTree = '"  .((isset(SETUP::$Desktop["MenuDefaultType"]		  ) && SETUP::$Desktop["MenuDefaultType"]=="I"  )? "CT":"")."';";
echo "var eConfigBanner = '".((isset(SETUP::$Desktop["DesktopBannerMinimized"]) && SETUP::$Desktop["DesktopBannerMinimized"])? "CB":"")."';";
?>
if( eConfigTree!="" && localStorage.getItem("e-config-tree")=="" ){
localStorage.setItem("e-config-tree", eConfigTree);
}
if( eConfigBanner!="" && localStorage.getItem("e-config-banner")=="" ){
localStorage.setItem("e-config-banner", eConfigBanner);
}
let treeFiexed = localStorage.getItem("e-config-tree-fixed");
setSetupDesktop(localStorage.getItem("e-config-tree"));
setSetupDesktop(localStorage.getItem("e-config-banner"));
setSetupDesktop(localStorage.getItem("e-config-line"));
setSetupDesktop(localStorage.getItem("e-config-line-type"));
setSetupDesktop(treeFiexed);
<?PHP
if( $_ENV[SETUP]['_DevelopmentSrv'] ){
$dim = [];
if( !file_exists("g/logo_development.ico") ){
$dim[] = "g/logo_development.ico";
}
if( !file_exists("g/logo.ico") ){
$dim[] = "g/logo.ico";
}
if( count($dim)>0 ){
?>
S.alert({
title	: "<?=$__Lng[153]?>",
icon	: '<img src="g/sys_warning.gif">',
button	: "A",
text	: "<?=implode("<br>", $dim)?>",
});
<?PHP
}
}
?>
<?PHP
if( file_exists('../_d_/cfg/url.'.S::$_User) ){
echo 'frames["IWORK"].location.href="'.trim(file_get_contents('../_d_/cfg/url.'.S::$_User)).'";';
}
RestauraValoresPorDefecto();
?>
window["_infoExitSend"] = false;
window["_infoExitCancel"] = false;
<?PHP
if( SETUP::$Desktop['OnLoad']!="" ) echo SETUP::$Desktop['OnLoad'];
?>
setTimeout(function(){ S("#TAPAINIT").nodeRemove(); }, 2000);
_SecondLoading = new Date().getTime() - _StartLoading;
}
</script>
<?PHP
if( SETUP::$Desktop['JSEnd']!="" ){
echo "<SCRIPT name='JSEND'>";
echo file_get_contents(eScript(SETUP::$Desktop['JSEnd']));
echo "</SCRIPT>";
}
if( SETUP::$Desktop['PHPEnd']!="" ){
include(eScript(SETUP::$Desktop['PHPEnd']));
}
echo '</body></html>';
eEnd();
function RestauraValoresPorDefecto(){
$appCode = "";
if( SESS::$_APPCODE!="" ) $appCode = "_".SESS::$_APPCODE;
$file = '../_datos/usr/'.S::$_User.$appCode.'.dft';
if( file_exists($file) ){
echo 'top.eCallSrvPost("edes.php?E:$default.php", {DATOS:"LOAD"}, window);';
}
}
?>