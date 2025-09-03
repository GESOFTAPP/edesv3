<?PHP
$_Sufijo = "_".$_Sufijo;
function grabarFichero($file, $txt){
if( file_put_contents($file, $txt)==false ){
die("error");
}
}
function copyToDir($pattern, $dir){
foreach(glob($pattern) as $file){
if( !is_dir($file) && is_readable($file) ){
$dest = $dir.basename($file);
copy($file, $dest);
}
}
}
function cambiaVar($txt){
global $cssVar;
list(,$pk) = explode('{$',$txt);
list($pk) = explode('}',$pk);
$pk = trim($pk);
$opk = $pk;
$tmp = "";
if( eSubstrCount($pk, "+")>0 ){
$tmp = explode("+",$pk);
if( $cssVar[$tmp[0]] ){
$tmp[0] = $cssVar[$tmp[0]];
}
if( $tmp[0][0]=="#" ){
$pk = colorTone( $tmp[0], $tmp[1] );
}else{
$x = str_replace("(",",",$pk);
$x = str_replace(")",",",$x);
$pk = colorTone( array($x[1],$x[2],$x[3]), $tmp[1] );
}
}else if( eSubstrCount($pk, "-")>0 ){
$tmp = explode("-",$pk);
$tmp[0] = trim($tmp[0]);
$tmp[1] = trim($tmp[1]);
if( $cssVar[$tmp[0]]!="" ){
$tmp[0] = $cssVar[$tmp[0]];
}
if( $tmp[0][0]=="#" ){
$pk = colorTone( $tmp[0], "-".$tmp[1] );
}else{
$x = str_replace("(",",",$pk);
$x = str_replace(")",",",$x);
$pk = colorTone( array($x[1],$x[2],$x[3]), "-".$tmp[1] );
}
}else if( eSubstrCount($pk, ":")>0 ){
$tmp = explode(":", $pk);
$tmp[0] = trim($tmp[0]);
$tmp[1] = trim($tmp[1]);
if( $tmp[1]=="hex" ){
$x =  str_replace( "(", ",", $cssVar[$tmp[0]] );
$x =  str_replace( ")", ",", $x );
$tmp = explode(",", $x);
$tmp = rgb2hex( array($tmp[1],$tmp[2],$tmp[3]) );
$txt = trim(str_replace('{$'.$pk.'}', $tmp, $txt));
if( eSubstrCount($txt, '{')>0 ){
$txt = cambiaVar( $txt );
}
return $txt;
}
}
if( $pk[0]=="#" ){
$txt = trim(str_replace('{$'.$opk.'}', $pk, $txt));
}else{
$txt = trim(str_replace('{$'.$opk.'}', $cssVar[$pk], $txt));
}
if( eSubstrCount($txt, '{$')>0 ){
$txt = cambiaVar( $txt );
}
return $txt;
}
function cambiaZoom($txt, $zoom, $tipo){
while( mb_strpos($txt,'{%')!==false ){
$i = mb_strpos($txt,'{%');
$f = mb_strpos($txt,'}',$i)+1;
$buscar = mb_substr($txt, $i, $f-$i);
$num = mb_substr($buscar, 2, -1);
if( $zoom==1 || ($tipo=="b" && $num<3) ){
$txt = str_replace($buscar, $num, $txt);
}else{
$valor = number_format($num*$zoom, 0);
if( mb_substr($valor,-3)==".00" ) list($valor) = explode(".", $valor);
$txt = str_replace($buscar, $valor, $txt);
}
}
return $txt;
}
function colorTone($r, $t){
$g = "";
$b = "";
if( gettype($r)=="array" ){
return( [ Op($r[0],$t), Op($r[1],$t), Op($r[2],$t) ] );
}else if( mb_substr($r,0,4)=="rgb(" ){
$r = str_replace("(",",",$r);
$r = str_replace(")",",",$r);
$r = explode(",",$r);
return( [ Op($r[1],$t), Op($r[2],$t), Op($r[3],$t) ] );
}
$t = str_replace("%","",$t)*1;
$r = str_replace("#","",$r);
if( mb_strlen($r)==3 ) $r = $r[0]+$r[0]+$r[1]+$r[1]+$r[2]+$r[2];
$g = hexdec($r[2].$r[3]);
$b = hexdec($r[4].$r[5]);
$r = hexdec($r[0].$r[1]);
return( "#".Op($r,$t).Op($g,$t).Op($b,$t) );
}
function Op($c, $t){
$inc = $t>0 ? floor(((256-$c)*$t)/100) : -floor(($c*($t*-1))/100);
$c = dechex($c+$inc);
return (mb_strlen($c)<2 ? "0":"").$c;
}
function rgb2hex($c){
return "#". str_pad( dechex($c[0]*1), 2, "0", STR_PAD_LEFT). str_pad( dechex($c[1]*1), 2, "0", STR_PAD_LEFT). str_pad( dechex($c[2]*1), 2, "0", STR_PAD_LEFT);
}
if( !is_dir("css_ca") ){
mkdir("css_ca");
chmod("css_ca", 0666);
chmod("css_ca", 0777);
}
if( !is_dir("css_nc") ){
mkdir("css_nc");
chmod("css_nc", 0666);
chmod("css_nc", 0777);
}
$cdi = date("U");
@copy("../_datos/config/core.css"   , "../_bak_/_daily/core.css."   .$cdi);
@copy("../_datos/config/core_ca.css", "../_bak_/_daily/core_ca.css.".$cdi);
@copy("../_datos/config/core_nc.css", "../_bak_/_daily/core_nc.css.".$cdi);
if( !empty($_GET["_ConfirmCSS"]) && $_GET["_ConfirmCSS"]=="DEFAULT" ){
copy("../_datos/config/core.css", "../_datos/config/core_ca.css");
echo 'CSS Default.<br>Cierra la ventana y vuelve a entrar';
eEnd();
}
generaCoreCSS();
generaCSSTemporal("_ca");
generaCSSTemporal("_nc");
if( empty($_GET["_ConfirmCSS"]) ){
echo "Grabado";
}else{
copy("../_datos/config/core{$_GET['_ConfirmCSS']}.css", "../_datos/config/core.css");
if( $_GET['_ConfirmCSS']=="_nc" ){
copy("../_datos/config/core{$_GET['_ConfirmCSS']}.css", "../_datos/config/core_ca.css");
}
$color = $_GET["_ConfirmCSS"]=="_ca" ? "Color Actual" : "Nuevo Color";
echo 'CSS Establecido con el "'.$color.'".<br><br>Ejecute la opción de "<b>CSS Create Var</b>"';
}
eEnd();
function generaCSSTemporal($_Sufijo){
$FileCore = "../_datos/config/core{$_Sufijo}.css";
$dim = file($FileCore);
$cssTemplatePath = DIREDES.'web/edesweb/css_template/';
$FileGen = array(
"desktop.css",
"login_web.css",
"all.css",
"tab.css",
"list.css",
"message.css"
);
$rem = false;
$grupo = false;
$txtgrupo = "";
$nmgroup = "";
$nmvar = "";
$css = "";
$valor = "";
$cssVar = array();
global $cssVar;
$cssVar["iconSelectPNG"] = "data:image/png;base64,".base64_encode(file_get_contents(DIREDES."a/g/sel.png"));
$cssVar["HeightTitleIcon"] = SETUP::$Desktop['HeightTitleIcon'];
$cssVar["HeightTitleIconWin"] = SETUP::$Desktop['HeightTitleIconWin'];
$cssVar["fBase"] = 14;
$cssVar["fBaseBIG"] = 18;
$cssVar["fBaseTLF"] = 50;
$cssVar["fBaseSmall"] = 10;
$cssVar["fIconTab"] = 10;
$cssVar["fIconTabBIG"] = 12;
$cssVar["fIconTabSmall"] = 8;
for($n=0; $n<count($dim); $n++){
$dim[$n] = trim($dim[$n]);
if( mb_substr($dim[$n],0,7)=='$fBase:' ){
list(,$fBase) = explode(":",$dim[$n]);
list($cssVar["fBase"]) = explode("px",$fBase);
}else if( mb_substr($dim[$n],0,10)=='$fBaseBIG:' ){
list(,$fBaseBIG) = explode(":",$dim[$n]);
list($cssVar["fBaseBIG"]) = explode("px",$fBaseBIG);
}else if( mb_substr($dim[$n],0,12)=='$fBaseSmall:' ){
list(,$fBaseSmall) = explode(":",$dim[$n]);
list($fBaseSmall) = explode("px",$fBaseSmall);
}else if( mb_substr($dim[$n],0,10)=='$fIconTab:' ){
list(,$fIconTab) = explode(":",$dim[$n]);
list($cssVar["fIconTab"]) = explode("px",$fIconTab);
}else if( mb_substr($dim[$n],0,13)=='$fIconTabBIG:' ){
list(,$fIconTabBIG) = explode(":",$dim[$n]);
list($cssVar["fIconTabBIG"]) = explode("px",$fIconTabBIG);
}else if( mb_substr($dim[$n],0,15)=='$fIconTabSmall:' ){
list(,$fIconTabSmall) = explode(":",$dim[$n]);
list($cssVar["fIconTabSmall"]) = explode("px",$fIconTabSmall);
}else if( mb_substr($dim[$n],0,10)=='$fBaseTLF:' ){
list(,$fBaseTLF) = explode(":",$dim[$n]);
list($cssVar["fBaseTLF"]) = explode("px",$fBaseTLF);
}else if( mb_substr($dim[$n],0,15)=='$inputPaddingV:' ){
list(,$inputPaddingV) = explode(":",$dim[$n]);
$inputPaddingV = trim($inputPaddingV);
}
}
$cssVar["numbers"] = SETUP::$CSSDynamic['FontNumbers'];
$cssVar["fBase"] = trim($cssVar["fBase"]);
$cssVar["fBaseBIG"] = trim($cssVar["fBaseBIG"]);
$cssVar["fBaseTLF"] = trim($cssVar["fBaseTLF"]);
$cssVar["fBaseSmall"] = trim($cssVar["fBaseSmall"]);
$cssVar["fIconTab"] = trim($cssVar["fIconTab"]);
$cssVar["fIconTabBIG"] = trim($cssVar["fIconTabBIG"]);
$cssVar["fIconTabSmall"] = trim($cssVar["fIconTabSmall"]);
for($n=0; $n<count($dim); $n++){
$txt = trim($dim[$n]);
if( $txt=="" ) continue;
if( mb_substr($txt,0,2)=="/"."*" ){
$rem = true;
continue;
}else if( mb_substr($txt,0,2)=="*"."/" ){
$rem = false;
continue;
}else if( $rem ){
continue;
}
if( $txt[0]=="/" ) continue;
list($txt) = explode(REM,$txt);
$txt = trim($txt);
if( $txt[0]=="$" ){
if( mb_substr($txt,-1)=="{" ){
$grupo = true;
list(,$nmgroup) = explode("$",$txt);
list($nmgroup) = explode("{",$nmgroup);
$nmgroup = trim($nmgroup);
$txtgrupo = "";
continue;
}else{
eExplodeOne($txt,":",$tmp[0],$tmp[1]);
$nmvar = trim(mb_substr($tmp[0],1));
$valor = trim($tmp[1]);
if( eSubstrCount($valor, '{$')>0 ) $valor = cambiaVar( $valor );
$cssVar[$nmvar] = $valor;
}
}else if( $txt=="}" && $grupo ){
$grupo = false;
$cssVar[$nmgroup] = $txtgrupo;
}else if( eSubstrCount($txt, '{$')>0 ){
$txt = cambiaVar( $txt );
}else if( $txt[0]=="[" ){
$nmvar = trim(mb_substr(str_replace('$','',$txt),1));
$valor = "";
if( $nmvar=="CSSADD" ){
$valor .= "/"."* CSSADD:INI *"."/\n";
}
for($i=$n+1; $i<count($dim); $i++){
$txt = trim($dim[$i]);
if( $txt=="]" ){
if( $nmvar=="CSSADD" ){
$valor .= "/"."* CSSADD:END *"."/\n";
}
if( $nmvar=="FUENTES" || $nmvar=="FUENTES-eDes" ){
$cssVar[$nmvar.".."] = str_replace("../fonts/", "fonts/", $valor);
}
$cssVar[$nmvar] = $valor;
$n = $i;
break;
}else{
$valor .= $txt."\n";
}
}
}
if( $grupo ){
$txtgrupo .= ($txtgrupo!="" ? "\n":"").$txt;
}
}
$cssVar["fBase"]		= trim($cssVar["fBase"]);
$cssVar["fBaseBIG"]		= trim($cssVar["fBaseBIG"]);
$cssVar["fBaseTLF"]		= trim($cssVar["fBaseTLF"]);
$cssVar["fBaseSmall"]	= trim($cssVar["fBaseSmall"]);
eFilePutVar('/_datos/config/group.var', array(
array("cListGrid", $cssVar["cListGrid"])
));
$FontFamilyNumber = SETUP::$CSSDynamic['FontNumbers'];
$zoomBIG   = (int)$cssVar["fBaseBIG"]   / (int)$cssVar["fBase"];
$zoomTLF   = (int)$cssVar["fBaseTLF"]   / (int)$cssVar["fBase"];
$zoomSmall = (int)$cssVar["fBaseSmall"] / (int)$cssVar["fBase"];
$cssVar["imgZoom"] = "100%";
for($i=0; $i<count($FileGen); $i++){
$txt = file_get_contents($cssTemplatePath.$FileGen[$i]);
$newTxt = "";
$rem = false;
$txt = str_replace('{$CSSADD}', $cssVar["CSSADD"], $txt);
if( $FileGen[$i]=="login_web.css" ){
$txt = str_replace('{$FUENTES}', $cssVar["FUENTES.."], $txt);
}
foreach($cssVar as $k=>$v){
$txt = str_replace('{$'.$k.'}', $v, $txt);
}
$dim = explode("\n",$txt);
for($n=0; $n<count($dim); $n++){
$txt = trim($dim[$n]);
if( $txt=="" ) continue;
if( mb_substr($txt, -1)=="{" ) $txt = trim(mb_substr($txt, 0, -1))."{";
if( eSubstrCount($txt, ":")==1 ){
list($iz, $dch) = explode(":", $txt);
$txt = trim($iz).':'.trim($dch);
}
if( mb_substr($txt, 0, 10)=="/"."* CSSADD:" ){
$newTxt .= $txt."\n";
continue;
}else if( $txt=="/"."*" ){
$rem = true;
continue;
}else if( $txt=="*"."/" ){
$rem = false;
continue;
}else if( $rem ){
continue;
}
list($txt) = explode("/"."*", $txt);
$txt = trim($txt);
if( $txt=="" ) continue;
if( eSubstrCount($txt, ":")>0 ){
eExplodeOne($txt, ":", $iz, $dch);
$txt = trim($iz).":".trim($dch);
}
$newTxt .= $txt."\n";
}
if( $FileGen[$i]=="all.css" ){
$op = array("n","display:none", "c","text-align:center", "l","text-align:left", "r","text-align:right");
for($s=0; $s<60; $s++){
for($n=0; $n<8; $n+=2){
$newTxt .= ".col_".$s.$op[$n]." th:nth-child(".($s+1)."), .col_".$s.$op[$n]." td:nth-child(".($s+1)."){".$op[$n+1].";}"."\n";
}
}
for($s=0; $s<60; $s++){
$newTxt .= ".col_".$s."ff td:nth-child(".($s+1)."){font-family:".$FontFamilyNumber.";}"."\n";
}
}
$newTxt = str_replace('{ ','{',$newTxt);
$newTxt = str_replace(' }','}',$newTxt);
$newTxt = str_replace(';;',';',$newTxt);
$newTxt = trim($newTxt);
$txt = cambiaZoom($newTxt, 1, "n");
$txt = str_replace(array('{$FUENTES}','{$CSSADD}'), array('',''), $txt);
grabarFichero("css{$_Sufijo}/".$FileGen[$i], $txt);
}
$cssVar["fBase"]	= $cssVar["fBaseBIG"];
$cssVar["fIconTab"] = $cssVar["fIconTabBIG"];
$cssVar["imgZoom"]	= number_format($zoomBIG*100, 0)."%";
for($i=0; $i<count($FileGen); $i++){
$txt = file_get_contents($cssTemplatePath.$FileGen[$i]);
$newTxt = "";
$rem = false;
if( $FileGen[$i]=="login_web.css" ){
$txt = str_replace('{$FUENTES}', $cssVar["FUENTES.."], $txt);
}
foreach($cssVar as $k=>$v){
$txt = str_replace('{$'.$k.'}', $v, $txt);
}
$dim = explode("\n",$txt);
for($n=0; $n<count($dim); $n++){
$txt = trim($dim[$n]);
if( $txt=="" ) continue;
if( $txt=="/"."*" ){
$rem = true;
continue;
}else if( $txt=="*"."/" ){
$rem = false;
continue;
}else if( $rem ){
continue;
}
list($txt) = explode("/"."*", $txt);
$txt = trim($txt);
if( $txt=="" ) continue;
if( eSubstrCount($txt,":")>0 ){
eExplodeOne($txt,":",$tmp[0],$tmp[1]);
$txt = trim($tmp[0]).":".trim($tmp[1]);
}
$newTxt .= $txt."\n";
}
if( $FileGen[$i]=="all.css" ){
$op = array("n","display:none", "c","text-align:center", "l","text-align:left", "r","text-align:right");
for($s=0; $s<60; $s++){
for($n=0; $n<8; $n+=2){
$newTxt .= ".col_".$s.$op[$n]." th:nth-child(".($s+1)."), .col_".$s.$op[$n]." td:nth-child(".($s+1)."){".$op[$n+1].";}"."\n";
}
}
for($s=0; $s<60; $s++){
$newTxt .= ".col_".$s."ff td:nth-child(".($s+1)."){font-family:".$FontFamilyNumber.";}"."\n";
}
$newTxt .= '.SELECTINPUT INPUT {background-size:'.number_format($zoomBIG*8, 2).'px;}';
}
$newTxt = str_replace('{ ','{',$newTxt);
$newTxt = str_replace(' }','}',$newTxt);
$newTxt = str_replace(';;',';',$newTxt);
$newTxt = trim($newTxt);
$txt = cambiaZoom($newTxt, $zoomBIG, "b");
$txt = str_replace(array('{$FUENTES}','{$CSSADD}'), array('',''), $txt);
grabarFichero("css{$_Sufijo}/".str_replace(".css", "_big.css", $FileGen[$i]), $txt);
}
$cssVar["fBase"]	= $cssVar["fBaseTLF"];
$cssVar["imgZoom"]  = number_format($zoomTLF*100, 0)."%";
for($i=0; $i<count($FileGen); $i++){
$txt = file_get_contents($cssTemplatePath.$FileGen[$i]);
$newTxt = "";
$rem = false;
if( $FileGen[$i]=="login_web.css" ){
$txt = str_replace('{$FUENTES}', $cssVar["FUENTES.."], $txt);
}
foreach($cssVar as $k=>$v){
$txt = str_replace('{$'.$k.'}', $v, $txt);
}
$dim = explode("\n",$txt);
for($n=0; $n<count($dim); $n++){
$txt = trim($dim[$n]);
if( $txt=="" ) continue;
if( $txt=="/"."*" ){
$rem = true;
continue;
}else if( $txt=="*"."/" ){
$rem = false;
continue;
}else if( $rem ){
continue;
}
list($txt) = explode("/"."*", $txt);
$txt = trim($txt);
if( $txt=="" ) continue;
if( eSubstrCount($txt,":")>0 ){
eExplodeOne($txt,":",$tmp[0],$tmp[1]);
$txt = trim($tmp[0]).":".trim($tmp[1]);
}
$newTxt .= $txt."\n";
}
if( $FileGen[$i]=="all.css" ){
$op = array("n","display:none", "c","text-align:center", "l","text-align:left", "r","text-align:right");
for($s=0; $s<60; $s++){
for($n=0; $n<8; $n+=2){
$newTxt .= ".col_".$s.$op[$n]." th:nth-child(".($s+1)."), .col_".$s.$op[$n]." td:nth-child(".($s+1)."){".$op[$n+1].";}"."\n";
}
}
for($s=0; $s<60; $s++){
$newTxt .= ".col_".$s."ff td:nth-child(".($s+1)."){font-family:".$FontFamilyNumber.";}"."\n";
}
$newTxt .= '.SELECTINPUT INPUT {background-size:'.number_format($zoomTLF*8, 2).'px;}';
}
$newTxt = str_replace('{ ','{',$newTxt);
$newTxt = str_replace(' }','}',$newTxt);
$newTxt = str_replace(';;',';',$newTxt);
$newTxt = trim($newTxt);
$txt = cambiaZoom($newTxt, $zoomTLF, "t");
$txt = str_replace(array('{$FUENTES}','{$CSSADD}'), array('',''), $txt);
grabarFichero("css{$_Sufijo}/".str_replace(".css", "_tlf.css", $FileGen[$i]), $txt);
}
$cssVar["fBase"]	= $cssVar["fBaseSmall"];
$cssVar["fIconTab"] = $cssVar["fIconTabSmall"];
$cssVar["imgZoom"]	= number_format($zoomSmall*100, 0)."%";
for($i=0; $i<count($FileGen); $i++){
$txt = file_get_contents($cssTemplatePath.$FileGen[$i]);
$newTxt = "";
$rem = false;
if( $FileGen[$i]=="login_web.css" ){
$txt = str_replace('{$FUENTES}', $cssVar["FUENTES.."], $txt);
}
foreach($cssVar as $k=>$v){
$txt = str_replace('{$'.$k.'}', $v, $txt);
}
$dim = explode("\n",$txt);
for($n=0; $n<count($dim); $n++){
$txt = trim($dim[$n]);
if( $txt=="" ) continue;
if( $txt=="/"."*" ){
$rem = true;
continue;
}else if( $txt=="*"."/" ){
$rem = false;
continue;
}else if( $rem ){
continue;
}
list($txt) = explode("/"."*", $txt);
$txt = trim($txt);
if( $txt=="" ) continue;
if( eSubstrCount($txt,":")>0 ){
eExplodeOne($txt,":",$tmp[0],$tmp[1]);
$txt = trim($tmp[0]).":".trim($tmp[1]);
}
$newTxt .= $txt."\n";
}
if( $FileGen[$i]=="all.css" ){
$op = array("n","display:none", "c","text-align:center", "l","text-align:left", "r","text-align:right");
for($s=0; $s<60; $s++){
for($n=0; $n<8; $n+=2){
$newTxt .= ".col_".$s.$op[$n]." th:nth-child(".($s+1)."), .col_".$s.$op[$n]." td:nth-child(".($s+1)."){".$op[$n+1].";}"."\n";
}
}
for($s=0; $s<60; $s++){
$newTxt .= ".col_".$s."ff td:nth-child(".($s+1)."){font-family:".$FontFamilyNumber.";}"."\n";
}
$newTxt .= '.SELECTINPUT INPUT {background-size:'.number_format($zoomSmall*8, 2).'px;}';
}
$newTxt = str_replace('{ ','{',$newTxt);
$newTxt = str_replace(' }','}',$newTxt);
$newTxt = str_replace(';;',';',$newTxt);
$newTxt = trim($newTxt);
$txt = cambiaZoom($newTxt, $zoomSmall, "b");
$txt = str_replace(array('{$FUENTES}','{$CSSADD}'), array('',''), $txt);
grabarFichero("css{$_Sufijo}/".str_replace(".css", "_small.css", $FileGen[$i]), $txt);
}
$fileCompactar = array(
"list_card.css"
);
}
function compactarCss($file){
$source = file_get_contents($file);
$rem = array(
array("/"."*"  , "*"."/" ),
array("<!"."--", "--".">")
);
for($n=0; $n<count($rem); $n++){
$ini = mb_strpos($source, $rem[$n][0]);
$end = mb_strpos($source, $rem[$n][1], $ini);
while( $ini!==false && $end!==false && $end>$ini ){
$source = mb_substr($source,0,$ini).mb_substr($source,$end+mb_strlen($rem[$n][1]));
$ini = mb_strpos($source, $rem[$n][0]);
$end = mb_strpos($source, $rem[$n][1], $ini);
}
}
$dim = explode("\n", $source);
$newDim = array();
for($n=0; $n<count($dim); $n++){
$txt = trim($dim[$n]);
if( $txt=="" || $txt[0]=="/" ) continue;
list($txt) = explode(REM,$txt);
array_push($newDim, trim($txt));
}
return implode("\n", $newDim);
}
function generaCoreCSS(){
$file = "../_datos/config/core.css";
$_dimColor   = explode(",", str_replace(" ", "", '$cTitle,$cEditable,$pEditable,$cEditableFocus,$pEditableFocus,$cReadOnly,$pReadOnly,$cError,$pError,$cErrorFocus,$pErrorFocus,$cSelected,$pSelected,$bInput,$bRequired,$pItemBox,$cItemBox,$bItemBox,$pItemBoxRead,$cItemBoxRead,$bItemBoxRead,$cCheckboxTrue,$cCheckboxFalse,$cCursor,$pCursor,$cText,$cTab,$cRadioCheck,$pText,$cCaption,$pCaption,$cSubWin,$pSubWin,$cGreenBar,$pGreenBar,$cListTotals,$pListTotals,$pInfo,$cInfo,$pInfoOk,$cInfoOk,$pInfoWarning,$cInfoWarning,$pInfoError,$cInfoError,$cIcon,$cIconHeader,$pBody,$cIconInsert,$cIconDelete,$cIconHelp,$cIconView,$cIconTitle,$cIconWin,$cIconUpdate,$cIconSeek,$cIconCount,$cIconClose,$cIconOption,$cIconLoading,$bIconLoading,$cIconDevelopment,$pWin,$cWin,$pSubWinCaption,$cSubWinCaption,$cLine,$cButton,$pButtonIni,$pButtonMid,$pButtonEnd,$cGC1,$cGC2,$cGC3,$cGC4,$cGR1,$cGR2,$cGR3,$cGR4,$pGC1,$pGC2,$pGC3,$pGC4,$pGR1,$pGR2,$pGR3,$pGR4,$xGCDegradado,$xGRDegradado,   $cDesktop, $iDesktop, $cFavorite, $cTree, $cTreeCursor, $cTreeFather, $iTree, $iTreeCursor, $iTreeFather, $mTree, $mTreeCursor, $pDesktop, $pTree, $pTree2, $pTreeCursor, $pTreeFather, $boxBreadcrumb,$pBreadcrumb,$cBreadcrumb,$opBreadcrumb'));
$_dimNumeric = explode(",", str_replace(" ", "", '$inputPaddingH,$inputPaddingV,$inputRadius'));
if( !file_exists("css_tmp") ){
mkdir("css_tmp");
chmod("css_tmp", 0666);
chmod("css_tmp", 0777);
}
$css1 = "";
$css2 = "";
$dim = file($file);
for($n=0; $n<count($dim); $n++){
$txt = trim($dim[$n]);
$regla = $dim[$n];
list($propiedad) = explode(":",$txt);
$propiedad = trim($propiedad);
$_POST[$color]	   = mb_strtoupper($_POST[$color]);
$_POST["_".$color] = mb_strtoupper("_".$_POST[$color]);
if( mb_substr($txt,0,6)=='$color' ){
list($num) = explode(":",mb_substr($txt,6,3));
if( is_numeric($num) ){
$txt = str_replace(REM, ":", $txt);
list($color, $valor) = explode(":",$txt);
$color = mb_substr($color,1,50);
$valor = trim($valor);
$regla   = str_replace($valor, $_POST[$color]    , $dim[$n]);
$dim[$n] = str_replace($valor, $_POST["_".$color], $dim[$n]);
}
}else if( in_array($propiedad, $_dimColor) ){
$txt = str_replace(REM, ":", $txt);
list($color, $valor) = explode(":",$txt);
$color = mb_substr($color,1,50);
list($valor) = explode(";",$valor);
$valor = trim($valor);
$regla = str_replace($valor, $_POST[$color], $dim[$n]);
$dim[$n] = str_replace($valor, $_POST["_".$color], $dim[$n]);
}else if( in_array($propiedad, $_dimNumeric) ){
$propiedad = mb_substr($propiedad,1);
$txt = str_replace(REM, ":", $txt);
list(,$valor) = explode(":",$txt);
list($valor)  = explode(";",$valor);
$regla   = str_replace($valor, $_POST[$propiedad]    , $dim[$n]);
$dim[$n] = str_replace($valor, $_POST["_".$propiedad], $dim[$n]);
}
$css1 .= $regla;
$css2 .= $dim[$n];
}
$css1 = str_replace("../fonts/", "fonts/", $css1);
$css2 = str_replace("../fonts/", "fonts/", $css2);
file_put_contents("../_datos/config/core_ca.css", $css1);
file_put_contents("../_datos/config/core_nc.css", $css2);
file_put_contents("../_datos/config/core_tmp.css", $css2);
return;
}
?>