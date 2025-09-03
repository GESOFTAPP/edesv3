<?PHP //[_PROTECCION_]
function GenCondiciones(){
global $_Form, $_Condi, $Opcion, $DimTipoForm, $_ASSIGN, $_JSCHECK, $_JPCHECK, $_JSDIM, $_DimPaste, $_DefaultPaste, $_Mode, $_DimRecalc;
global $_WINFORM, $_WINTITLE, $_STOP, $_LOCALSELECT, $_ONLOAD, $_MSGSUBMIT, $_CHR, $xHojaV, $_ReorderForm, $_EDITMIRRORMEM, $_Field;
global $_Etiqueta, $_EXTFORM, $_SAVEFORM, $__Enter, $_DEBUG, $_AltoSelect, $_OnLineOP, $_DBLOGTXT, $_DBLOGTABLE, $_SELECTMULTIPLE, $_CARDSHOW, $_xMarkFieldRequired;
_genContext();
echo '<script type="text/javascript">';
echo '_MsgSubmit = "'.eQuote(str_replace('\n', '<br>', $_MSGSUBMIT[0])).'";';
echo '_MsgSubmitCondi = "'.eQuote($_MSGSUBMIT[1]).'";';
if( $_MSGSUBMIT[2]>0 ) echo "_MsgSubmitWidth = {$_MSGSUBMIT[2]};";
if( $_MSGSUBMIT[3]!='' ) echo "_MsgSubmitAlign = '{$_MSGSUBMIT[3]}';";
echo 'var _ConImpresora = '.((eSubstrCount(SESS::$_notools_,'P')==0)? 'true':'false').';';
if( count($_LOCALSELECT)>0 ){
$Dim = "Array(";
foreach($_LOCALSELECT as $clave=>$valor) $Dim .= "'{$clave}={$valor}',";
$Dim = mb_substr($Dim, 0, mb_strlen($Dim)-1).")";
echo "CopySelect({$Dim});";
}
echo "\nfunction eJSCheck(){";
if( $_GET["_PSOURCE"]<>"WDESKTOP" && $_GET["_PSOURCE"]<>"WWORK" ) echo "S.ppublic(window,1);";
?>
_ErrForm=0;
if(DGI("OpExe")!=null && OpExe.getAttribute("NoJsCheck")!=null) return true;
if( typeof(FUNCTION_plugin)=="function" ) FUNCTION_plugin();
function _eJSCheck(){
<?PHP
echo $__Enter;
if( $_JSCHECK!='' ){
_IncludeJsHtml($_JSCHECK, "JSCheck", false);
if( isset($_EDITMIRRORMEM) && count($_EDITMIRRORMEM)>0 ){
for($i=0; $i<count($_EDITMIRRORMEM); $i++){
$tmp = explode(',',$_EDITMIRRORMEM[$i]);
for($n=0; $n<count($tmp); $n++){
if( $tmp[$n]!='' && $_Field[$tmp[$n]] ){
echo 'try{';
echo 'DGI("'.$tmp[$n].'").value = DGI("_'.$tmp[$n].'").value;';
echo '}catch(e){}';
}
}
}
}
}
if( $_JPCHECK!='' ){
echo $_JPCHECK;
}
?>
}
S.public(1);
var ok = _eJSCheck();
S.public();
<?PHP if( $_GET["_PSOURCE"]<>"WDESKTOP" && $_GET["_PSOURCE"]<>"WWORK" ) echo "S.ppublic(window);"; ?>
if(_ErrMensaje!=""){eShowError();return false;}
if( ok===false ) return false;
return ok || true;
}
<?PHP
$Que = (eSubstrCount('bcmqs',$Opcion)>0);
echo 'var _ConBusqueda = '.eBoolean($Que).";\n";
if( $xHojaV>0 ){
for( $l=0; $l<count($_Form); $l++ ){
if( count($_Form[$l]) > 10 && mb_substr( $_Form[$l][1],0,2 )=='__' ){
$sCampo = mb_substr( $_Form[$l][1], 2 );
for( $f=$l-1; $f>=0; $f-- ){
if( $sCampo == $_Form[$f][1] ){
$bak = $_Form[$l];
for( $i=$l; $i>$f; $i-- ) $_Form[$i] = $_Form[$i-1];
$_Form[$f] = $bak;
$f = -1;
}
}
}
}
}
if( isset($_EDITMIRRORMEM) && count($_EDITMIRRORMEM)>0 ){
for( $i=0; $i<count($_EDITMIRRORMEM); $i++ ){
$tmp = explode(',',$_EDITMIRRORMEM[$i]);
for( $n=0; $n<count($tmp); $n++ ){
if( $tmp[$n]!='' && $_Field[$tmp[$n]] ){
echo 'try{';
echo 'if(DGI("_'.$tmp[$n].'")!=null){';
echo 'ePF("_'.$tmp[$n].'",eGF("'.$tmp[$n].'"),0);';
echo 'DGI("_'.$tmp[$n].'").value = DGI("'.$tmp[$n].'").value;';
echo '}';
echo '}catch(e){}';
}
}
}
}
$FormCondiSeek = false;
$MemLabel = false;
$n = 0;
if( !empty($_SAVEFORM) ) $SaveFormIni = mb_strlen(ob_get_contents());
$DimFcRequired = '';
foreach($GLOBALS["_LoadJS"] as $k=>$v){
echo "S.loadJS(window, '{$k}');";
}
echo 'UnZipCmp(Array(';
for($l=0; $l<count($_Form); $l++){
if( $_Form[$l][0][0]=='{' )continue;
if( $_Form[$l][1][0]=='[' )continue;
if( !empty($_Form[$l][1]) && $_Form[$l][0][0]!='-' && $_Form[$l][3][0]!='f' && $_Form[$l][3]!='G' ){
if( $n>0 ) echo ",";
$n++;
if( eSubstrCount($_Form[$l][1], ':')>0 ){
$NomCampo = mb_substr($_Form[$l][1], 0, mb_strpos($_Form[$l][1], ':'));
}else if( eSubstrCount($_Form[$l][1], '{')>0 ){
$NomCampo = trim(mb_substr($_Form[$l][1], 0, mb_strpos($_Form[$l][1], '{')));
}else{
$NomCampo = $_Form[$l][1];
}
if( $_Form[$l][_STATUS]=='E' && ($_Form[$l][8]=='#' || $_Form[$l][8]=='=' || ($_Form[$l][8]!='' && $_Form[$l][8]!='%')) ) $DimFcRequired .= ','.$NomCampo;
echo '"';
echo $NomCampo.'|';
echo $_Form[$l][2].'|';
if( $Opcion=='a' || $_ASSIGN ){
echo $_Form[$l][7].'|';
}else{
echo '|';
}
if( $Que ){
if( $_Form[$l][8]!='' ){
$FormCondiSeek = true;
echo str_replace('"',"\\\"",$_Form[$l][8]).'|';
echo $_Form[$l][9].'|';
$MemLabel = (mb_strlen($_Form[$l][8])>0 || mb_substr($_Form[$l][1],0,4)=='dct_' );
}else{
echo '||';
$MemLabel = false;
}
}else{
echo str_replace('"',"\\\"",$_Form[$l][8]).'|';
echo $_Form[$l][9].'|';
$MemLabel = (mb_strlen($_Form[$l][8])>0 || mb_substr($_Form[$l][1],0,4)=='dct_' );
}
echo $_Form[$l][10].'|';
if( $_Form[$l][0][0]=='+' ){
$Label = mb_substr($_Form[$l][0], mb_strpos($_Form[$l][0],' '));
}elseif( ($_Form[$l][0][0]==',' || $_Form[$l][0][0]=='=') && trim(mb_substr($_Form[$l][0],1))!='' ){
$Label = mb_substr($_Form[$l][0], 1);
}elseif( (mb_strlen($_Form[$l][0])>0 && eSubstrCount('123456789', $_Form[$l][0][0])>0) && trim(mb_substr($_Form[$l][0],1))!='' ){
$Label = mb_substr($_Form[$l][0], mb_strpos($_Form[$l][0],' '));
}elseif(trim(mb_substr($_Form[$l][0],1))=='' && mb_substr($_Form[$l][9],0,2)=='L:' ){
$Label = mb_substr($_Form[$l][9],2);
}else{
$Label = $_Form[$l][0];
}
if( $_Etiqueta[$NomCampo]!='' ) $Label = $_Etiqueta[$NomCampo];
if( eSubstrCount('|T|DNI|NIF|CIF|F4|P4|DC|NSS|@|F|f|CCC|NAF|CP|-,|+,|', '|'.trim($_Form[$l][2]).'|')>0 ) $MemLabel = true;
echo str_replace('"',"\\\"",mb_strtoupper(trim($Label)));
echo '"';
if( $_Form[$l][16]!='' ){
if( $_Form[$l][_STATUS]=='E' && ($_Form[$l][8]=='#' || $_Form[$l][8]=='=' || ($_Form[$l][8]!='' && $_Form[$l][8]!='%')) ) $DimFcRequired .= ',_INPUT_'.$NomCampo;
if( $_SELECTMULTIPLE[$NomCampo]=='' ){
if( $_Form[$l][_STATUS]!='I' ) echo ',"_INPUT_'.$NomCampo.'|0||||'.$_Form[$l][10].'|"';
}else if( $_SELECTMULTIPLE[$NomCampo]>0 ) echo ',"_INPUT__'.$NomCampo.'|0||||'.$_Form[$l][10].'|"';
$n++;
}
if( $_OnLineOP[$_Form[$l][1]]!='' ){
echo ',"'.$_OnLineOP[$_Form[$l][1]].'|0||||'.$_Form[$l][10].'|"';
$n++;
}
}
}
if( !empty($_SAVEFORM) ){
$fd = fopen($_SAVEFORM,'r');
$tmp = fread( $fd, filesize($_SAVEFORM) ).$__Enter;
fclose( $fd );
$fp = fopen( $_SAVEFORM, 'w' );
fwrite( $fp, $tmp.'<script type="text/javascript">'.mb_substr(ob_get_contents(), $SaveFormIni ).'));</script>' );
fclose( $fp );
}
echo '));';
echo "\n";
if( $FormCondiSeek ) echo '_SearchConditions=true;';
$sOpcion = mb_strtoupper($Opcion);
$i = 0;
if( !$Que ){
echo '_cGlobal = Array(';
for( $l=0; $l<count($_Condi); $l++ ){
$_Condi[$l][0] = mb_strtoupper( $_Condi[$l][0] );
if( ( eSubstrCount( $_Condi[$l][0], $sOpcion[0] ) > 0 || $_Condi[$l][0]=='*' ) && !empty($_Condi[$l][1]) ){
if( $i > 0 ) echo ', ';
echo 'new CondGlobal(';
echo '"'.$_Condi[$l][1].'",';
echo '"'.$_Condi[$l][2].'",';
echo '"'.$_Condi[$l][3].'",';
echo '"'.$_Condi[$l][4].'"' ;
echo ')';
$i++;
}
}
echo ');';
echo "\n";
}
echo "\n";
if( count($_JSDIM)>0 ){
for($i=0; $i<count($_JSDIM); $i++){
$n = 0;
if( eSubstrCount($_JSDIM[$i][1], '{')>0 ){
$DimNomVar = array_keys($_POST);
$DimValor  = array_values($_POST);
for($ii=0; $ii<count($_POST); $ii++){
${$DimNomVar[$ii]} = $DimValor[$ii];
}
$_JSDIM[$i][1] = @eval('return ("'.$_JSDIM[$i][1].'");');
}
$hash = preg_match('/HASH/iu', $_JSDIM[$i][2]);
qQuery($_JSDIM[$i][1]);
echo "\nvar ".$_JSDIM[$i][0].'='.(($hash)? "{":"new Array(");
if( sql_TotalCampos()==1 ){
while( $row = qRow() ) {
if( $n > 0 ) echo ',';
$row[0] = trim($row[0]);
echo "'{$row[0]}'";
$n++;
}
}else{
while( $row=qRow() ){
if( $n>0 ) echo ',';
if( $hash ){
echo "'{$row[0]}':";
if( count($row)==2 ){
echo "'{$row[1]}'";
}else{
echo "[";
for($p=1; $p<count($row); $p++){
if( $p>1 ) echo ',';
$row[$p] = trim($row[$p]);
echo "'{$row[$p]}'";
}
echo "]";
}
}else{
echo 'Array(';
for($p=0; $p<count($row); $p++){
if( $p>0 ) echo ',';
$row[$p] = trim($row[$p]);
echo "'{$row[$p]}'";
}
echo ')';
}
$n++;
}
}
echo (($hash)? "};" : ");");
qFree();
}
echo "\n";
}
if( count($_DimPaste)>0 ){
for($i=0; $i<count($_DimPaste); $i++){
echo 'top.SetMemoriza("'.mb_substr($_DimPaste[$i],1). '",window);';
}
}
if( count($_DefaultPaste)>0 && eSubstrCount('abcmsql', $Opcion)>0 ){
for($i=0; $i<count($_DefaultPaste); $i++){
echo '_eDefault("'.$_DefaultPaste[$i].'");';
}
}
$n = 0;
foreach($_AltoSelect as $k=>$v){
echo "_SelSetHeight(DGI('{$k}_TABLE'), {$v});";
$n++;
}
if( preg_match('/^(a|mR)$/u', $Opcion) && ($_xMarkFieldRequired || (SETUP::$Tab['MarkFieldRequired']!=null && ((getType(SETUP::$Tab['MarkFieldRequired'])=="boolean" && SETUP::$Tab['MarkFieldRequired']) || (getType(SETUP::$Tab['MarkFieldRequired'])=="string" && SETUP::$Tab['MarkFieldRequired']!="")))) ){
$txt = $_xMarkFieldRequired;
if( getType(SETUP::$Tab['MarkFieldRequired'])=="boolean" && SETUP::$Tab['MarkFieldRequired'] && $DimFcRequired!='' ) $txt .= ",{$DimFcRequired}";
if( getType(SETUP::$Tab['MarkFieldRequired'])=="string" && SETUP::$Tab['MarkFieldRequired']!="" ) $txt .= ",".SETUP::$Tab['MarkFieldRequired'];
if( $txt!="" ) echo "eMarkFieldRequired('{$txt}',".((SETUP::$Tab['MarkLabelRequired']==true)? "true":"false").",".((SETUP::$Tab['MarkFieldRequired']==true)? "true":"false").");";
}
echo '</SCRIPT>';
}
if( isset($_Objeto) ) eContextPut("E:$dexcel.php");
$HaySubMenus = false;
for($lin=0; $lin<count($_Form); $lin++){
if( isset($_Objeto[$_Form[$lin][1]]) && count($_Objeto[$_Form[$lin][1]])>0 && $_Objeto[$_Form[$lin][1]]['SLMENU'] != '' ){
list( $OpActiva, $Menu, $Script, $Indice, $FormStatic ) = explode( '|', $_Objeto[$_Form[$lin][1]]['SLMENU'] );
$FormStatic = ((mb_strtoupper(trim($FormStatic))=='FORMSTATIC') ? 'true':'false');
$OpActiva = ','.trim($OpActiva).',';
if( eSubstrCount($OpActiva, ",{$Opcion},")>0 || $OpActiva==",*," || (mb_substr($Opcion,1)=='R' && eSubstrCount($OpActiva, ",?R,")>0) ){
$HaySubMenus = true;
$Indice = str_replace(' ','',$Indice);
$Script = trim($Script);
if( eSubstrCount($Script, '.')==0 ) $Script = $Script.'.edf';
if( eSubstrCount($Script, ',')>0 ) $Script = '';
$sOp = explode(',', $Menu);
$Dim = array('i'=>'a', 'u'=>'mR', 'd'=>'bR', 'v'=>'cR');
echo "<TABLE id='m{$_Form[$lin][1]}' Indice='{$Indice}' gsEXE='{$Script}' FS={$FormStatic} class=SubMenuSL style='display:none;position:absolute' cols=1 onMouseOver='mOver()' onMouseOut='mOut()' onClick='gsClickSMenu(this)'>";
for($i=0; $i<count($sOp);$i++){
$tmpSL = explode(':', $sOp[$i] );
if( $Script != '' ){
echo '<TR><TD gsOP=F'.$Dim[trim($tmpSL[1])].'>'.trim($tmpSL[0]);
}else{
if( $tmpSL[1][0]=='-' ){
$c = '___op_'.mb_substr($_Form[$lin][1], 1, -1);
echo "<script type='text/javascript'>var o=DGI('{$c}'); o.src='g/op_insert_off.gif'; o.OpInsert=-1; o.parentNode.disabled=true;</script>";
}else{
echo '<TR><TD gsOP='.mb_strtoupper($tmpSL[1]).'>'.trim($tmpSL[0]);
}
}
}
echo '</TABLE>';
}
}
}
if( $_ConED ){
function edIMG($img){
return("data:image/gif;base64,".base64_encode(file_get_contents(DIREDES."a/h/{$img}.gif")).'" exe="'.$img);
return("edes.php?R:".'$'."a/h/{$img}.gif");
return('http://localhost/edes.v3/a/h/'."{$img}.gif");
return('http://localhost/i_iu/http/h/'."{$img}.gif");
return(DIREDES.'a/h/'."{$img}.gif");
return('edes.php?R:$a/h/'."{$img}.gif");
return("../../iconos_mini_editor/{$img}.gif");
return("../../t/".$GLOBALS['_DirG']."/{$img}.gif");
}
?>
<TABLE id="edMENUS" border=0px cellspacing=0px cellpadding=0px style="position:absolute;display:none;z-index:9"><TR>
<TD id="edBOLD"><img title="<?=$__Lng[98]?>" src="<?=edIMG('bold')?>" onClick="ed()"></TD>
<TD id="edITALIC"><img title="<?=$__Lng[99]?>" src="<?=edIMG('italic')?>" onClick="ed()"></TD>
<TD id="edUNDERLINE"><img title="<?=$__Lng[100]?>" src="<?=edIMG('underline')?>" onClick="ed()"></TD>
<TD id="edREMOVEFORMAT"><img title="<?=$__Lng[101]?>" src="<?=edIMG('removeformat')?>" onClick="ed()"></TD>
<TD id="edSPACE1"><img src="<?=edIMG('space')?>"></TD>
<TD id="edCOLOR"><img title="<?=$__Lng[102]?>" src="<?=edIMG('color')?>" onClick="edColor(0)"></TD>
<TD id="edBACKGROUND"><img title="<?=$__Lng[103]?>" src="<?=edIMG('background')?>" onClick="edColor(1)"></TD>
<TD id="edSPACE2"><img src="<?=edIMG('space')?>"></TD>
<TD id="edFONTSIZE3"><img title="<?=$__Lng[104]?>" src="<?=edIMG('fontsize_5')?>" onClick="ed()"></TD>
<TD id="edFONTSIZE2"><img title="<?=$__Lng[105]?>" src="<?=edIMG('fontsize_4')?>" onClick="ed()"></TD>
<TD id="edFONTSIZE1"><img title="<?=$__Lng[106]?>" src="<?=edIMG('fontsize_3')?>" onClick="ed()"></TD>
<TD id="edSPACE3"><img src="<?=edIMG('space')?>"></TD>
<TD id="edJUSTIFYLEFT"><img title="<?=$__Lng[107]?>" src="<?=edIMG('justifyleft')?>" onClick="ed()"></TD>
<TD id="edJUSTIFYCENTER"><img title="<?=$__Lng[108]?>" src="<?=edIMG('justifycenter')?>" onClick="ed()"></TD>
<TD id="edJUSTIFYFULL"><img title="<?=$__Lng[109]?>" src="<?=edIMG('justifyfull')?>" onClick="ed()"></TD>
<TD id="edOUTDENT"><img title="<?=$__Lng[110]?>" src="<?=edIMG('outdent')?>" onClick="ed()"></TD>
<TD id="edINDENT"><img title="<?=$__Lng[111]?>" src="<?=edIMG('indent')?>" onClick="ed()"></TD>
<TD id="edINSERTORDEREDLIST"><img title="<?=$__Lng[112]?>" src="<?=edIMG('insertorderedlist')?>" onClick="ed()"></TD>
<TD id="edINSERTUNORDEREDLIST"><img title="<?=$__Lng[113]?>" src="<?=edIMG('insertunorderedlist')?>" onClick="ed()"></TD>
<TD _id="edIMAGE" style="display:none" op=2><img title="<?=$__Lng[114]?>" src="<?=edIMG('img')?>" onClick="edImg()" id=_edIMG></TD>
<?PHP if( $_EDCHECKBOX ){ ?>
<TD id="edCHECKBOX"><img title="<?=$__Lng[121]?>" src="<?=edIMG('checkbox')?>" onClick="edPut('<input type=checkbox name=_NO_ style=&quot;border:0px&quot;>')" oncontextmenu="edCheckbox()"></TD>
<?PHP } ?>
<TD id="edSPACE4"><img src="<?=edIMG('space')?>"></TD>
<?PHP if( isset($_EDICON) ){
if( is_array($_EDICON[0]) ){
for( $n=0; $n<count($_EDICON); $n++ ){
if( eSubstrCount($_EDICON[$n][1],'(')==0 ) $_EDICON[$n][1] .= '()';
echo "<TD><img title='{$_EDICON[$n][2]}' src='{$_EDICON[$n][0]}' onClick='{$_EDICON[$n][1]}'></TD>";
}
}else{
if( eSubstrCount($_EDICON[1],'(')==0 ) $_EDICON[1] .= '()';
echo "<TD><img title='{$_EDICON[2]}' src='{$_EDICON[0]}' onClick='{$_EDICON[1]}'></TD>";
}
echo '<TD><img src="'.edIMG('space').'"></TD>';
} ?>
<TD><img title="<?=$__Lng[116]?>" src="<?=edIMG('close')?>" onclick="edClose()"></TD>
<TD><img title="<?=$__Lng[117]?>" src="<?=edIMG('save')?>" onclick="edSave()"></TD>
</TR></TABLE>
<TABLE id="edCOLORES" onmouseleave='this.style.display="none";this.Obj.title=this.eTitle;' onclick='edColor()' style='position:absolute;display:none;z-index:9'>
<TR><TD style="background:rgb(100,  0,  0)"></TD><TD style="background:rgb(143,114,  0)"></TD><TD style="background:rgb(100,100,  0)"></TD><td style="background:rgb(  0,100,  0)"></td><TD style="background:rgb(  0,  0,100)"></TD><TD style="background:rgb(  0,100,100)"></TD><TD style="background:rgb(100,  0,100)"></TD><TD style="background:rgb( 75, 56, 37)"></TD><TD style="background:rgb(  0,  0,  0)"></TD></TR>
<TR><TD style="background:rgb(150,  0,  0)"></TD><TD style="background:rgb(180,144,  0)"></TD><TD style="background:rgb(150,150,  0)"></TD><td style="background:rgb(  0,150,  0)"></td><TD style="background:rgb(  0,  0,150)"></TD><TD style="background:rgb(  0,150,150)"></TD><TD style="background:rgb(150,  0,150)"></TD><TD style="background:rgb( 95, 70, 48)"></TD><TD style="background:rgb(100,100,100)"></TD></TR>
<TR><TD style="background:rgb(200,  0,  0)"></TD><TD style="background:rgb(217,174,  0)"></TD><TD style="background:rgb(200,200,  0)"></TD><td style="background:rgb(  0,200,  0)"></td><TD style="background:rgb(  0,  0,200)"></TD><TD style="background:rgb(  0,200,200)"></TD><TD style="background:rgb(200,  0,200)"></TD><TD style="background:rgb(115, 85, 59)"></TD><TD style="background:rgb(140,140,140)"></TD></TR>
<TR><TD style="background:rgb(255,  0,  0)"></TD><TD style="background:rgb(255,204,  0)"></TD><TD style="background:rgb(255,255,  0)"></TD><td style="background:rgb(  0,255,  0)"></td><TD style="background:rgb(  0,  0,255)"></TD><TD style="background:rgb(  0,255,255)"></TD><TD style="background:rgb(255,  0,255)"></TD><TD style="background:rgb(135,100, 70)"></TD><TD style="background:rgb(190,190,190)"></TD></TR>
<TR><TD style="background:rgb(255,100,100)"></TD><TD style="background:rgb(255,217, 69)"></TD><TD style="background:rgb(255,255, 66)"></TD><td style="background:rgb(100,255,100)"></td><TD style="background:rgb(100,100,255)"></TD><TD style="background:rgb(100,255,255)"></TD><TD style="background:rgb(255,100,255)"></TD><TD style="background:rgb(167,142,120)"></TD><TD style="background:rgb(230,230,230)"></TD></TR>
<TR><TD style="background:rgb(255,150,150)"></TD><TD style="background:rgb(255,230,140)"></TD><TD style="background:rgb(255,255,130)"></TD><td style="background:rgb(150,255,150)"></td><TD style="background:rgb(150,150,255)"></TD><TD style="background:rgb(150,255,255)"></TD><TD style="background:rgb(255,150,255)"></TD><TD style="background:rgb(199,184,170)"></TD><TD style="background:rgb(255,255,255)"></TD></TR>
<TR><TD style="background:rgb(255,200,200)"></TD><TD style="background:rgb(255,245,207)"></TD><TD style="background:rgb(255,255,200)"></TD><td style="background:rgb(200,255,200)"></td><TD style="background:rgb(200,200,255)"></TD><TD style="background:rgb(200,255,255)"></TD><TD style="background:rgb(255,200,255)"></TD><TD style="background:rgb(232,226,219)"></TD><TD style="background:rgb(250,250,250);border:1px solid #6c7b82;" align=center valign=middle title='<?=$__Lng[118]?>'></TD></TR>
</TABLE>
<?PHP
}
if( $_DEBUG==99 ) echo '<script type="text/javascript">top.eTron("GenCondiciones On");</script>';
GenCondiciones();
if( $_DEBUG==99 ) echo '<script type="text/javascript">top.eTron("GenCondiciones Off");</script>';
if( $_ConFicheros ) echo '<SPAN id="_SPANFILE" style="display:none"></span>';
echo '<DIV ID="NewTLF" style="display:none"></DIV>';
echo '<script type="text/javascript">';
$n=0;
if( count($_DELOPTION)>0 ){
for($i=0; $i<count($_DELOPTION); $i++){
$tmp = explode(',',$_DELOPTION[$i][1]);
for($n=0; $n<count($tmp); $n++){
$tmp[$n] = trim($tmp[$n]);
if( $tmp[$n][0]=='$' ) $tmp[$n] = $GLOBALS[mb_substr($tmp[$n],1)];
echo "eDelOption('".$_DELOPTION[$i][0]."', '".$tmp[$n]."');";
}
}
}
if( $_DEFAULTALL ){
echo "top.Fields('P',window,".(($_DEFAULTBYMODE)?'true':'false')."{$_ADDTOOLSCP});";
}else if( SESS::$_D_<>"" ){
echo "if( top.S('i[eFunc=eDefaults]').exists() ) top.Fields('P',window,false);";
}
if( isset($_FchXPg_) && $_FchXPg_!='' ){
echo 'if( DGI("OpButtonsTR")!=null ) DGI("OpButtonsTR").parentNode.style.display = "none";';
if( isset($_FchXPg_) && $_FchXPg_!='m' && $_FchXPg_!='b' ){
echo 'if( DGI("OpExe")!=null ) DGI("OpExe").style.display = "none";';
echo 'ConF10 = false;';
}else{
echo '_WType = 2;';
}
}else if( isset($_CLOSE_) ){
echo '_WType = 2;';
}
if( isset($__INSERTTOSEEK) ){
$txt = mb_strtoupper($__INSERTTOSEEK[1]);
$filtrar = ($txt=="TRUE" || $txt=="1")?"true":"false";
?>
_Filtrar = <?=$filtrar?>;
<?PHP
}
if( isset($_LINK) && eSubstrCount(',a,mR,', ",{$_Mode},")>0 ){
for($n=0; $n<count($_LINK); $n++){
eExplodeOne($_LINK[$n], ",", $c);
echo 'S.linkField(S(":'.$c.'").obj);';
}
}
echo '</SCRIPT>';
echo '<script type="text/javascript">'.$__Enter;
if($_GET["_TRANSPARENT"]) echo 'document.body.style.backgroundColor="transparent";';
if( $_DefaultPathFile!='' ) echo "var _DefaultPathFile = '{$_DefaultPathFile}';";
if( isset($_WINCAPTION) || count($_TITLEICON)>0 ){
global $_TITLE;
if( ($_WINCAPTION=='' || $_WINCAPTION=='#') && $_TITLE!='' ){
$_WINCAPTION = $_TITLE;
$_LOGREQUEST["title"] = $_TITLE;
}
}
?>
S(window).winNoTitle({
wintitle:		'<?=$_WINTITLE?>'
,wincaption:	'<?=str_replace("'", "\\'", $_WINCAPTION)?>'
,wintools: 		'<?=$_WINTOOLS?>'
,iconInWindow: 	 <?=(isset($_WINCAPTION) || count($_TITLEICON)>0) ? "true":"false"?>
,eSWMenuAdd: 	 <?=(count($_TITLEICON)>1 || !SETUP::$System['TitleIcoNone']) ? "true":"false"?>
,titleIconCount: <?=count($_TITLEICON)?>
,title:			'<?=$_TITLE?>'
,titleicon:		"<?=str_replace(array('"', "ICONHEADER"), array('\"', ""), $_TITLEICON[0])?>"
});
<?PHP
if( isset($_WINCAPTION) || count($_TITLEICON)>0 ){
global $_TITLE;
if( ($_WINCAPTION=='' || $_WINCAPTION=='#') && $_TITLE!='' ){
$_WINCAPTION = $_TITLE;
$_LOGREQUEST["title"] = $_TITLE;
}
}
echo '</SCRIPT>';
if( $_JSEND!='' ){
_IncludeJsHtml($_JSEND, 'JSEnd');
}
if( !empty($_PHPEND) ){
$tmpFile = GrabaTmp('fg_phpend', $_PHPEND, $LenDoc, $_FILE_PHPEND);
include($tmpFile);
_ShowError($php_errormsg, $tmpFile, $LenDoc);
unset($_PHPEND);
}
foreach($_TIPFORM as $k=>$v){
if( $v['#']!='' ){
echo "<span id='HELP_{$k}' style='display:none'><span class='HELP'>{$v['#']}</span></span>";
}
}
echo '<SCRIPT type="text/javascript">';
echo '_toPublic();';
$old = "";
for($n=0; $n<count($_EXEONCHANGE); $n++){
if( $_EXEONCHANGE[$n][1][0]!='_' && mb_substr($_EXEONCHANGE[$n][1],0,5)!='top._' && mb_strpos($_EXEONCHANGE[$n][1], '(')>0 ){
if( eSubstrCount($_EXEONCHANGE[$n][1], 'ResetSelect')==0 ){
if( mb_substr($_EXEONCHANGE[$n][1],-1)!=';' ) $_EXEONCHANGE[$n][1] .= ';';
$txt = str_replace('this', 'DGI("'.$_EXEONCHANGE[$n][0].'")', $_EXEONCHANGE[$n][1]).$__Enter;
if( $old<>$txt ) echo "S.public(1);".trim($txt)."S.public();\n";
$old = $txt;
}
}
}
echo 'var _DBINDEX = "'.$_DBINDEX.'",';
echo '_DBTABLE = "'.$_DBTABLE.'",';
echo '_DBSERIAL = "'.$_DBSERIAL[1].'",';
echo '_DBINDEX2 = "'.$_DBINDEX2.'",';
echo '_DBLOG = "'.$_DBLOGTXT.'",';
echo '_DBLOGTABLE = "'.(($_DBLOGTABLE!='')?$_DBLOGTABLE:$_DBTABLE).'",';
echo '_DB = "'.$_DB.'",';
if( !empty($_CLEARTOCOUNT) ){
echo '_CLEARTOCOUNT = "'.str_replace(" ", "", $_CLEARTOCOUNT).'",';
}
echo '_SUBTAB = "'.$_SUBTAB.'",';
echo '_SUBTABFORM = "'.$_SUBTABFORM.'";';
if( $_LogUser!="" ) echo 'var _LogUser = "'.$_LogUser.'";';
echo '_ISubListTotal = '.$GLOBALS['_ISubListTotal'].';';
if( $_DEBUG==98 ) echo 'top.eLoading(0,window);';
if( $_CARDSHOW ){
}else{
echo 'function __EqualWidths(){';
if( isset($_WIDTHGROUP) ){
for($n=0; $n<count($_WIDTHGROUP); $n++){
if( eSubstrCount($_WIDTHGROUP[$n][1],',')>0 || $_WIDTHGROUP[$n][1]=="*" ){
echo "_EqualWidths('{$_WIDTHGROUP[$n][0]}', '{$_WIDTHGROUP[$n][1]}', '{$_WIDTHGROUP[$n][2]}', '{$_WIDTHGROUP[$n][3]}');";
}
}
}
echo '}';
for($n=0; $n<count($_DimRecalc); $n++){
echo '_DimRecalc.push("'.addslashes($_DimRecalc[$n]).';");';
}
echo '_DimRecalc.push("_AjustaCampos()");';
if( isset($_JSRECALC) ){
echo $_JSRECALC;
}
if( $_gsObjeto=='F' ) echo '_DimRecalc.push("__EqualWidths()");';
echo '_DimRecalc.push("_AjustaCampos()");';
if( $_gsObjeto=='F' ){
echo '_DimRecalc.push("__EqualWidths()");';
}
if( $_gsObjeto=='G' ){
echo '_DimRecalc.push("CalculoForma()");';
}
if( $_gsObjeto=='F' && $_SUBTAB>1 ) echo "_DimRecalc.push('CalculoTAB(\"{$_SUBTABFORM}\")');";
}
echo '_DimRecalc.push("VerFicha()");';
echo "_DimRecalc.push(\"SeCargo('','{$_Campo1}')\");";
echo "_FieldFocus = '{$_Campo1}';";
if( $_ONLOAD!='' ){
if( eSubstrCount($_ONLOAD, '"')==0 ){
echo '_DimRecalc.push("'.str_replace('"', '\\"', $_ONLOAD).'");';
}else{
echo "_DimRecalc.push('".str_replace("'", "\\'", $_ONLOAD)."');";
}
}
if( isset($_JSONLOAD) ) echo '_DimRecalc.push("_JsOnLoad()");';
if( $_gsObjeto=='F' ){
echo "_DimRecalc.push(\"S('#PAGINA').css({width:'100%', height:'100%'})\");";
if( $_WithNewIFrame ) echo 'S("#Papel").css("display:table-cell");';
}
echo $__Enter;
if( isset($_ChildrenData) && count($_ChildrenData)>0 ){
foreach($_ASSIGNFIELD as $k=>$v){
echo "_DimRecalc.push(\"ePF('{$k}','".$_pField[$k][7]."')\");";
}
}
echo $_JSSYSTEM;
if( $GLOBALS["_RunToEnd"]!="" ) echo "_DimRecalc.push(\"{$GLOBALS["_RunToEnd"]}\");";
foreach($_PREVIEW as $key=>$value){
if( !isset($_pF[$key]) ){
continue;
}
$data = $_PREVIEW[$key];
echo "_DimRecalc.push(\"viewImgIn(\{x:'{$data[0]}', y:'{$data[1]}', x2:'{$data[2]}', y2:'{$data[3]}', color:'{$data[4]}', file:'{$key}'\});\");";
}
for($i=0; $i<count($_DimJSEnd); $i++){
echo "_DimRecalc.push(\"".$_DimJSEnd[$i]."\");";
}
if( $GLOBALS['_ISubListTotal']==0 ){
?>
setTimeout(function(){
_ExeRecalc();
}, 1);
<?PHP
}
if( isset($__INSERTTOSEEK) ){
echo "function _SubmitToSeek_FUNCTION(){_SubmitToSeek='".$__INSERTTOSEEK[0]."'; _ConCtrlKey=2; _ChangeOp();};";
}
foreach($_TIPFORM as $k=>$v){
if( $v['#']!='' ){
echo "S('#{$k}').on('mouseenter', function(){S(this).tip('#HELP_{$k}',-1)});";
}
}
echo "</SCRIPT>\n";
if( isset($_FchXPg_) && $_FchXPg_ ){
?>
<TABLE onmousewheel="top.window.Pag.SiguienteFila(((event.wheelDelta>0)?-1:1))" style="background:transparent;z-index:70;position:absolute;left:0px;top:3px;width:1px;height:1px"><TR>
<TD><IMG SRC="g/ts_pg_pr.gif" onclick="top.window.Pag.SiguienteFila(-1)" title='Anterior'>
<?PHP
if( SESS::$_Desktop>=1 ){
?><TD><IMG SRC="g/ts_list.gif" onclick="top.DGI('WinWork').className='FormaPag1';top.DGI('zFichaAux').style.display='none'" title='Regresar al listado'><?PHP
}else if( SESS::$_Desktop==0 ){
?><TD><IMG SRC="g/ts_list.gif" onclick="top.DGI('zFichaAux').style.display='none'" title='Regresar al listado'><?PHP
}else{
}
?>
<TD><IMG SRC="g/ts_pg_nx.gif" onclick="top.window.Pag.SiguienteFila(1)" title='Siguiente'>
<TD id='IMPRIMIR'><IMG SRC="g/ts_print.gif" onclick='top.UtilPrint(top.window.FichaAux)' title='Imprimir'></TD>
</TABLE>
<?PHP
}
echo '<SCRIPT type="text/javascript">';
if( isset($_SUBLISTDF) && count($_SUBLISTDF)>0 ){
echo 'DGI("_PARENT_SUBLIST").value = _WOPENER._Mode;';
}
if( isset($_DEFAULT) && count($_DEFAULT)>0 && eSubstrCount('acbm', $Opcion)>0 ){
for($n=0; $n<count($_DEFAULT); $n++) echo "if(top.{$_DEFAULT[$n]}!=undefined) ePF('".mb_substr($_DEFAULT[$n],8)."',top.{$_DEFAULT[$n]});";
}
if( $_gsObjeto=='F' && isset($_ChildrenData) ){
echo 'if( DGI("MenuTabPieICON")!=null ) DGI("MenuTabPieICON").style.display = "none";';
if( isset($_IconsSubmit) ){
echo 'var _IconsSubmit = new Array();';
if( $_IconsSubmit['I'][1]!='' ) echo '_IconsSubmit["I"] = "'.$_IconsSubmit['I'][1].'";';
if( $_IconsSubmit['U'][1]!='' ) echo '_IconsSubmit["U"] = "'.$_IconsSubmit['U'][1].'";';
if( $_IconsSubmit['D'][1]!='' ) echo '_IconsSubmit["D"] = "'.$_IconsSubmit['D'][1].'";';
}
echo '_FormularioCopy();';
echo '_FormularioModifica();';
}
if( eSubstrCount(',c,b,m,', ",{$Opcion},")==0 ){
for($i=0; $i<count($_DimChildrenData); $i++){
echo '_eSLConfig("'.mb_substr($_DimChildrenData[$i][0],1,-1).'");'."\n";
if( $_Objeto[$_DimChildrenData[$i][0]]['SLJSCHECK']!='' ){
if( $_Objeto[$_DimChildrenData[$i][0]]['FORMSTATIC']==0 ){
echo "function JSCheck".mb_substr($_DimChildrenData[$i][0],1,-1)."(slID, slMODE, slROW, slROWS, slCol){\n";
$txt = "";
$tmp = explode(",", $_DimChildrenData[$i][1]);
for($n=0; $n<count($tmp); $n++){
list(,$campo) = explode("=", $tmp[$n]);
if( $campo!="IMG" ){
$campo = str_replace("*", "_INPUT_", $campo);
if( $txt<>"" ) $txt .= ",";
$txt .= $campo;
}
}
echo "_ErrForm = 0;\n";
echo "\nfunction _JSCheck(){\n";
echo $_Objeto[$_DimChildrenData[$i][0]]['SLJSCHECK'];
echo "}\n";
echo "var ok = _JSCheck();";
echo 'if(_ErrMensaje!=""){eShowError();return false;}';
echo 'if( ok===false ) return false;';
echo "\nreturn ok || true;\n}\n";
}
}
}
foreach($_Objeto as $k=>$v){
if( $_Objeto[$k]['FORMSTATIC']==1 ){
echo "function JSCheck".mb_substr($k,1,-1)."(slID, slMODE, slROW, slROWS, slWin, slCol){\n";
$txt = $_Objeto[$k]['FieldSubList'];
echo "_ErrForm = 0;\n";
echo "\nfunction _JSCheck".mb_substr($k,1,-1)."(){\n";
echo  $v['SLJSCHECK'];
echo "}\n";
echo "var ok = _JSCheck".mb_substr($k,1,-1)."();";
echo 'if(slWin._ErrMensaje!=""){slWin.eShowError();return false;}';
echo 'if( ok===false ) return false;';
echo "\nreturn ok || true;\n}\n";
}
}
}
if( isset($GLOBALS["_DEBUG_OBSERVE"]) ){
include(DIREDES."itm/_observe.php");
}
if( isset($_RANDOM) && SESS::$_D_!="" ){
include(DIREDES."itm/_random.php");
}
echo "</SCRIPT>";
if( !$_gsCreate_ ){
echo '<script type="text/javascript">';
gsAvisos($_OtroDiccionario);
echo '</SCRIPT>';
}
if( isset($_GET['_IMPORT']) ) include(DIREDES.'import_mng.inc');
if( $_OpcionBak=='o' ){
echo '<script type="text/javascript">';
?>
_FORMBUTTONS = 'Idvu';
document.FRM1.target = _CreaListado();
if( _Action.indexOf('&_SUBLISTADO_=1')==-1 ) _Action = _Action+'&_SUBLISTADO_=1&_LISTEMPTY=1';
_ConCtrlKey = 0;
eOkTab(0);
<?PHP
echo '</script>';
}
foreach($_HELPHTML as $k=>$v){
echo "<span id='HELP_{$k}' style='display:none'><span class='HELP'>";
echo $v;
echo "</span></span>";
}
$ok = false;
foreach($_HELPMARK as $k=>$v){
if( !$ok ) include_once(DIREDES."markdown.inc");
$ok = true;
echo "<span id='HELP_{$k}' style='display:none'><span class='HELP'>";
echo eMarkdown($v);
echo "</span></span>";
}
if( isset($_BR) ) include(DIREDES.'br.inc');
echo '</BODY></HTML>';
eEnd();
exit;
?>