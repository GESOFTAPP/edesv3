<?PHP
if( S::$_User==-1 || $_gsID!=getmypid() ) exit;
function CalculaArbolDeOpciones($user, $typeTree, $treeCode, $treeName, $_DesktopIconType, $generaFiles=true){
global $sMenu, $_DimTree, $_UserTree, $_MainMenuViewLevel, $_OptionsFilter;
$optionsFilter = (empty($_OptionsFilter)) ? "" : " and {$_OptionsFilter}";
$_UserTree = $user;
$n = $tOp = 0;
$TipoId = 'OpOn_0';
$nivel = -1;
$tmp = '';
$_MenuTools  = -1;
$_DimTree = array();
$sShowType = array();
$sAlias = array();
$sIcons = array();
$_Icons = '';
$_TreeOptions = array();
$MemorizaCursorMenu = false;
if( file_exists("../tree/usr_{$user}.txt") ){
if( is_readable("../tree/usr_{$user}.txt")!=1 ) die('No se puede leer');
$sMenu = file("../tree/usr_{$user}.txt");
$Dim = array();
$NoTab = 99;
$seq = 0;
for($n=0; $n<count($sMenu); $n++){
$macro = trim($sMenu[$n]);
if($macro=='' || $macro=='|~' || $macro[0]=='.') continue;
$tab = mb_strlen($sMenu[$n]) - mb_strlen(ltrim($sMenu[$n]));
if( $tab>$NoTab ){
continue;
}
if( $macro[0]=='¿' ){
list( $macro ) = explode('?',$macro);
$macro = trim(mb_substr( $macro, 1 ));
if( !( @eval( 'return ('.$macro.');' ) ) ){
$NoTab = $tab;
continue;
}
}
$indent = $tab;
$icon = "";
list($txt, $tip) = explode("~",$macro);
list($caption, $url) = explode("|",$txt);
$caption = trim($caption);
if( $caption[0]=='{' ){
list($icon, $caption) = explode("}",mb_substr($caption,1));
}else if( $caption[0]=='[' ){
list($icon, $caption) = explode("]",mb_substr($caption,1));
}
$caption = trim($caption);
$url = trim($url);
$type = (( $url=="" || $url[0]==":") ? "F":"O");
if( $caption[0]=="-" ) $type = "L";
$Dim[] = array(
"seq"=>($seq++),
"indent"=>$indent,
"type"=>$type,
"caption"=>$caption,
"script_url"=>trim($url),
"cd_gs_op"=>0,
"tip"=>trim($tip),
"icon"=>$icon,
"show_type"=>"",
"alias"=>"",
"icons"=>"",
"mode"=>""
);
}
$TOpciones = count($Dim);
unset($tmp);
$r = $Dim[0];
$sIndent = $r['indent'];
for($n=0; $n<$TOpciones; $n++){
$r = $Dim[$n];
$r['script_url'] = trim($r['script_url']);
$r['script_url'] = str_replace(
[ '#user#', '#node#' ],
[ $user, $_Node ],
$r['script_url']
);
$sIndent = $r['indent'];
$Tip = '~'.trim($r['tip']);
$Icon = trim($r['icon']);
if( $Icon!='' ) $Icon = '['.$Icon.']';
if( $r['type']=='L' ) $r['caption'] = '-'.$r['caption'];
$_DimTree[] = $r;
$sIcons[] = trim($r['icons']);
$sMenu[]  = str_repeat("\t",$r['indent']).$Icon.$r['caption'].'|'.$r['script_url'].'~'.$r['cd_gs_op'].$Tip.'~'.trim($r['type']);
$sShowType[] = trim($r['show_type']);
$sAlias[]    = ( (trim($r['alias'])!='' ) ? '.'.trim($r['alias']) : '' );
$sMode[$r['cd_gs_op']] = trim($r['mode']);
if( $r['script_url']!='' ){
if( $r['script_url'][0]==':' ){
$UrlPadre = mb_substr($r['script_url'],1);
}else if( mb_substr($r['script_url'],-1)==':' ){
}else{
}
}
}
unset($Dim);
if( file_exists('../_tmp/php/tree.'.$user) ){
$txt = '';
for($n=0; $n<count($sMenu); $n++) $txt .= $sMenu[$n]."\n";
if( $generaFiles ) file_put_contents('../_tmp/php/tree.'.$user, $txt);
$txt = '';
}
}else if( SETUP::$Desktop['DesktopTreeType']=='' ){
$NomFile = "../tree/{$treeCode}.txt";
if( file_exists($NomFile)!=1 ) $NomFile = "../tree/{$treeName}";
$sNomFile = "../tree/{$treeCode}.".SESS::$_LANGUAGE_.".txt";
if( file_exists($sNomFile)!=1 ){
}else{
if( is_readable($sNomFile)!=1 ){
}else{
$NomFile = $sNomFile;
}
}
if( file_exists($NomFile)!=1 ) die("No existe el fichero [{$NomFile}]");
if( is_readable($NomFile)!=1 ) die('No se puede leer');
$sMenu = file($NomFile);
$Dim = array();
$NoTab = 99;
$seq = 0;
for($n=0; $n<count($sMenu); $n++){
$macro = trim($sMenu[$n]);
if( $macro=='' or $macro=='|~') continue;
$tab = mb_strlen($sMenu[$n]) - mb_strlen(ltrim($sMenu[$n]));
if( $tab>$NoTab ){
continue;
}
if( $macro[0]=='¿' ){
list( $macro ) = explode('?', $macro);
$macro = trim(mb_substr( $macro, 1 ));
if( !( @eval( 'return ('.$macro.');' ) ) ){
$NoTab = $tab;
continue;
}
}
$icon = "";														https://www.youtube.com/watch?v=b6HkufChjlo
list($txt, $tip) = explode("~", $macro);
list($caption, $url) = explode("|", $txt);
$caption = trim($caption);
if( $caption=="" ){
continue;
}else if( $caption[0]=='{' ){
list($icon, $caption) = explode("}", mb_substr($caption,1));
}else if( $caption[0]=='[' ){
list($icon, $caption) = explode("]", mb_substr($caption,1));
}
$indent = $tab;
$caption = trim($caption);
$url = trim($url);
$type = (($url=="" || $url[0]==":") ? "F":"O");
if( $caption[0]=="-" ) $type = "L";
$Dim[] = array(
"seq"=>($seq++),
"indent"=>$indent,
"type"=>$type,
"caption"=>$caption,
"script_url"=>trim($url),
"cd_gs_op"=>0,
"tip"=>trim($tip),
"icon"=>$icon,
"show_type"=>"",
"alias"=>"",
"icons"=>"",
"mode"=>""
);
}
if( function_exists('eAlterMenu') ) eAlterMenu($sMenu);
$TOpciones = count($Dim);
unset($tmp);
$sMenu = array();
$r = $Dim[0];
$sIndent = $r['indent'];
for($n=0; $n<$TOpciones; $n++){
$r = $Dim[$n];
$r['script_url'] = trim($r['script_url']);
$r['script_url'] = str_replace(
[ '#user#', '#node#' ],
[ $user, $_Node ],
$r['script_url']
);
$sIndent = $r['indent'];
$Tip = '~'.trim($r['tip']);
$Icon = trim($r['icon']);
if( $Icon!='' ) $Icon = '['.$Icon.']';
if( $r['type']=='L' && $r['caption']=="" ) $r['caption'] = '-';
$_DimTree[] = $r;
$sIcons[] = trim($r['icons']);
if( $r['caption']=="-" ){
$sMenu[] = str_repeat("\t",$r['indent']).'-';
}else{
$sMenu[] = str_repeat("\t",$r['indent']).$Icon.$r['caption'].'|'.$r['script_url'].'~'.$r['cd_gs_op'].$Tip.'~'.trim($r['type']);
}
$sShowType[] = trim($r['show_type']);
$sAlias[]    = ( (trim($r['alias'])!='' ) ? '.'.trim($r['alias']) : '' );
$sMode[$r['cd_gs_op']] = trim($r['mode']);
if( $r['script_url']!='' ){
if( $r['script_url'][0]==':' ){
$UrlPadre = mb_substr($r['script_url'],1);
}else if( mb_substr($r['script_url'],-1)==':' ){
}else{
}
}
}
unset($Dim);
if( file_exists('../_tmp/php/tree.'.$user) ){
$txt = '';
for($n=0; $n<count($sMenu); $n++) $txt .= $sMenu[$n]."\n";
if( $generaFiles ) file_put_contents('../_tmp/php/tree.'.$user, $txt);
$txt = '';
}
}else if( SETUP::$Desktop['DesktopTreeType']=='A' ){
if( is_array($_TreeArray) ){
$sMenu = $_TreeArray;
unset($_TreeArray);
}
if( function_exists('eAlterMenu') ) eAlterMenu($sMenu);
}else if( SETUP::$Desktop['DesktopTreeType']=='T' ){
$MemorizaCursorMenu = true;
$sMenu = array();
qQuery("select seq, indent, type, caption, script_url, cd_gs_op, tip, icon, show_type, alias, icons, mode
from {$_ENV['eDesDictionary']}gs_op
where cd_gs_op in (select cd_gs_op from {$_ENV['eDesDictionary']}gs_tree_op where cd_gs_tree={$treeCode})
order by seq"
);
}else if( SETUP::$Desktop['DesktopTreeType']=='O' ){
$MemorizaCursorMenu = true;
$OpNo = "'U'";
if( SESS::$_Development ) $OpNo .= "";
else if( $_Test ) $OpNo .= ",'D'";
else $OpNo .= ",'D','T'";
$TypeUR = (($typeTree=='P')? 'user' : 'rol');
$sMenu = array();
$OpcionesAEliminar = '';
if( eSqlType('mysql,mysqli') ){
qQuery("select distinct seq, indent, type, caption, script_url, o.cd_gs_op, tip, icon, show_type, alias, icons, mode
from {$_ENV['eDesDictionary']}gs_op o left join {$_ENV['eDesDictionary']}gs_tree_op t on o.cd_gs_op = t.cd_gs_op
where
( type<>'O' or type is null )
or
(
show_type not in ({$OpNo})
and
(
(
instr(         (select mode     from {$_ENV['eDesDictionary']}gs_{$TypeUR}_tree where cd_gs_{$TypeUR}={$_UserTree} and cd_gs_tree=t.cd_gs_tree), o.mode ) > 0
or
o.cd_gs_op  in (select cd_gs_op from {$_ENV['eDesDictionary']}gs_{$TypeUR}_op   where cd_gs_{$TypeUR}={$_UserTree} and cd_gs_tree=t.cd_gs_tree and action='I')
)
and
o.cd_gs_op not in (select cd_gs_op from {$_ENV['eDesDictionary']}gs_{$TypeUR}_op   where cd_gs_{$TypeUR}={$_UserTree} and cd_gs_op=o.cd_gs_op and action='D')
{$OpcionesAEliminar}
and
t.cd_gs_tree in (select cd_gs_tree from {$_ENV['eDesDictionary']}gs_tree where cd_gs_tree=t.cd_gs_tree and permission='{$_ENV['ON']}')
{$optionsFilter}
)
)
order by seq");
}else{
qQuery("select distinct seq, indent, type, caption, script_url, o.cd_gs_op, tip, icon, show_type, alias, icons, mode
from {$_ENV['eDesDictionary']}gs_op o left join {$_ENV['eDesDictionary']}gs_tree_op t on o.cd_gs_op = t.cd_gs_op
where
( type<>'O' or type is null )
or
(
show_type not in ({$OpNo})
and
(
(
instr(         (select mode     from {$_ENV['eDesDictionary']}gs_{$TypeUR}_tree where cd_gs_{$TypeUR}={$_UserTree} and cd_gs_tree=t.cd_gs_tree), o.mode ) > 0
or
o.cd_gs_op  in (select cd_gs_op from {$_ENV['eDesDictionary']}gs_{$TypeUR}_op   where cd_gs_{$TypeUR}={$_UserTree} and cd_gs_tree=t.cd_gs_tree and action='I')
)
and
o.cd_gs_op not in (select cd_gs_op from {$_ENV['eDesDictionary']}gs_{$TypeUR}_op   where cd_gs_{$TypeUR}={$_UserTree} and cd_gs_op=o.cd_gs_op and action='D')
{$OpcionesAEliminar}
and
t.cd_gs_tree in (select cd_gs_tree from {$_ENV['eDesDictionary']}gs_tree where cd_gs_tree=t.cd_gs_tree and permission='{$_ENV['ON']}')
{$optionsFilter}
)
)
order by seq");
}
unset($TypeUR);
}else{
eInit();
eMessage('ERROR: DesktopTreeType = "'.SETUP::$Desktop['DesktopTreeType'].'" Desconocido', 'HELS', 10);
}
if( $MemorizaCursorMenu ){
$tmp = array();
while( $r=qArray() ){
if( trim($r['caption'])!='' || $r['type']=='L' ){
$r['type'] = trim($r['type']);
$tmp[] = $r;
}
}
if( function_exists('eModifyTree') ) eModifyTree($tmp);
if( SESS::$_Desktop==6 && !isset($_MainMenuViewLevel) ) $_MainMenuViewLevel = -1;
while( count($tmp)>0 && $tmp[count($tmp)-1]['type']!='O' && $tmp[count($tmp)-1]['indent']>=$_MainMenuViewLevel ){
unset($tmp[count($tmp)-1]);
}
$TOpciones = count($tmp);
for($ii=0; $ii<2; $ii++){
if( $ii==1 ) $tmp = $Dim;
$aOp = $TOpciones-1;
for($n=$TOpciones-2; $n>=0; $n--){
if( $tmp[$n]['type']=='D' ) continue;
if( $tmp[$aOp]['type']=='F' ){
if( $tmp[$n]['type']=='F' ){
if( $tmp[$aOp]['indent'] <= $tmp[$n]['indent']   ) $tmp[$n]['type'] = '';
else $aOp = $n;
}else{
if( $tmp[$aOp]['indent'] >  $tmp[$n]['indent']   ) $tmp[$n]['type'] = '';
else $aOp = $n;
}
}else{
if( $tmp[$n]['type']=='F' ){
if( $tmp[$aOp]['indent']!=$tmp[$n]['indent']+1 ) $tmp[$n]['type'] = '';
else $aOp = $n;
}else{
if( $tmp[$aOp]['indent'] >  $tmp[$n]['indent']   ) $tmp[$n]['type'] = '';
else $aOp = $n;
}
}
if( $tmp[$n]['indent']!='' && $tmp[$n]['indent']<$_MainMenuViewLevel && $tmp[$n]['type']=='' ){
$tmp[$n]['type']='D';
$tmp[$n]['script_url']='';
}
}
for($n=$TOpciones-1; $n>0; $n--){
if( $tmp[$n]['type']=='D' ) continue;
if( $tmp[$n]['type']=='L' ){
if( $tmp[$n]['caption']=='' ){
for( $i=$n-1; $i>=0; $i-- ){
if( $tmp[$i]['type']!='' && $tmp[$i]['type']!='D' ){
if( $tmp[$i]['type']!='O' ){
$tmp[$n]['type'] = '';
}
break;
}
}
}
if( $tmp[$n]['type']!='' && $tmp[$n]['type']!='D' ){
for( $i=$n+1; $i<$TOpciones-1; $i++ ){
if( $tmp[$i]['type']!='' && $tmp[$i]['type']!='D' ){
if( $tmp[$i]['type']=='F' && $tmp[$n]['indent']==$tmp[$i]['indent'] ) break;
if( $tmp[$i]['type']!='O' ){
$tmp[$n]['type'] = '';
}
break;
}
}
}
if( $tmp[$n]['indent']!='' && $tmp[$n]['indent']<$_MainMenuViewLevel && $tmp[$n]['type']=='' ){
$tmp[$n]['type']='D';
$tmp[$n]['script_url']='';
}
}else if( $tmp[$n]['type']=='F' ){
for($i=$n-1; $i>0; $i--){
if( $tmp[$i]['type']=='D' ) continue;
if( $tmp[$i]['type']!='' && $tmp[$i]['type']!='D' ){
if( $tmp[$i]['type']!='O' ){
if( $tmp[$n]['indent']<$tmp[$i]['indent'] ){
$tmp[$i]['type'] = '';
}else if( $tmp[$n]['indent']==$tmp[$i]['indent'] ){
if( $tmp[$i]['type']=='F' ){
$tmp[$i]['type'] = '';
}
}
}else break;
}else if( $tmp[$n]['indent']==$tmp[$i]['indent'] ){
if( $tmp[$i]['type']=='F' ){
$tmp[$i]['type'] = '';
}
}
if( $tmp[$i]['indent']!='' && $tmp[$i]['indent']<$_MainMenuViewLevel && $tmp[$i]['type']=='' ){
$tmp[$i]['type']='D';
$tmp[$i]['script_url']='';
}
}
}
}
$Dim = array();
for($n=0; $n<$TOpciones; $n++) if( $tmp[$n]['type']!='' ) $Dim[] = $tmp[$n];
}
if( SESS::$_LanguageDefault!=SESS::$_LANGUAGE_ ){
}
if( function_exists('eAlterMenu') ) eAlterMenu($Dim);
if( SESS::$_LanguageDefault<>SESS::$_LANGUAGE_ ){
$DimLng = array();
qQuery( "select cd_gs_op,caption_tip,caption from {$_ENV['eDesDictionary']}gs_op_lng where cd_gs_language='".SESS::$_LANGUAGE_."' order by cd_gs_op" );
while( $r=qArray() ) $DimLng[$r['cd_gs_op'].$r['caption_tip']] = trim($r['caption']);
for( $n=0; $n<count($Dim); $n++ ){
if( $Dim[$n]['caption']!='' && $DimLng[$tmp[$n]['cd_gs_op'].'C'] ) $Dim[$n]['caption'] = $DimLng[$tmp[$n]['cd_gs_op'].'C'];
if( $Dim[$n]['tip']!='' && $DimLng[$tmp[$n]['cd_gs_op'].'T'] ) $Dim[$n]['tip'] = $DimLng[$tmp[$n]['cd_gs_op'].'T'];
}
}
$TOpciones = count($Dim);
unset($tmp);
$r = $Dim[0];
$sIndent = $r['indent'];
for($n=0; $n<$TOpciones; $n++){
$r = $Dim[$n];
$r['script_url'] = trim($r['script_url']);
$r['script_url'] = str_replace(
[ '#user#', '#node#' ],
[ $user, $_Node ],
$r['script_url']
);
$sIndent = $r['indent'];
$Tip = '~'.trim($r['tip']);
$Icon = trim($r['icon']);
if( $Icon!='' ) $Icon = '['.$Icon.']';
if( $r['type']=='L' ) $r['caption'] = '-'.$r['caption'];
$_DimTree[] = $r;
$sIcons[] = trim($r['icons']);
$sMenu[]  = str_repeat("\t",$r['indent']).$Icon.$r['caption'].'|'.$r['script_url'].'~'.$r['cd_gs_op'].$Tip.'~'.trim($r['type']);
$sShowType[] = trim($r['show_type']);
$sAlias[]    = ( (trim($r['alias'])!='' ) ? '.'.trim($r['alias']) : '' );
$sMode[$r['cd_gs_op']] = trim($r['mode']);
if( $r['script_url']!='' ){
if( $r['script_url'][0]==':' ){
$UrlPadre = mb_substr($r['script_url'],1);
}else if( mb_substr($r['script_url'],-1)==':' ){
}else{
}
}
}
unset($Dim);
if( file_exists('../_tmp/php/tree.'.$user) ){
$txt = '';
for($n=0; $n<count($sMenu); $n++) $txt .= $sMenu[$n]."\n";
if( $generaFiles ) file_put_contents('../_tmp/php/tree.'.$user, $txt);
$txt = '';
}
}
if( $_DesktopIconType=='A' ){
for($n=0; $n<count($sIcons); $n++) if( $sIcons[$n]!='' ) $_Icons .= $sIcons[$n].',';
}
if( !empty($_TreeFromOp) && $_TreeFromOp>0 ){
$nInicio = -1;
$nFinal = count($sMenu)-1;
for( $n=0; $n<count($sMenu); $n++ ){
$tmp = explode( '~', $sMenu[$n] );
if( trim($tmp[1])==$_TreeFromOp ){
$nInicio = $n+1;
$nTab = mb_strlen($sMenu[$n]) - mb_strlen(ltrim($sMenu[$n]));
for( $f=$nInicio; $f<count($sMenu); $f++ ){
if( $nTab >= mb_strlen($sMenu[$f]) - mb_strlen(ltrim($sMenu[$f])) ){
$nFinal = $f-1;
break;
}
}
break;
}
}
if( $nInicio>-1 ){
if( $_DesktopIconType=='H' ){
$nTab2 = mb_strlen($sMenu[$nInicio]) - mb_strlen(ltrim($sMenu[$nInicio]));
for( $n=$nInicio; $n>=0; $n-- ){
if( $nTab2 == mb_strlen($sMenu[$n])-mb_strlen(ltrim($sMenu[$n])) ){
if( $sIcons[$n]!='' ) $_Icons .= $sIcons[$n].',';
$nTab2--;
}
}
}
$ssMenu     = $sMenu    ; $sMenu     = array();
$ssShowType = $sShowType; $sShowType = array();
$ssAlias    = $sAlias   ; $sAlias    = array();
$ssIcons	= $sIcons	; $sIcons	 = array();
for($n=$nInicio; $n<=$nFinal; $n++){
$sMenu[]     = mb_substr( $ssMenu[$n], $nTab+1 );
$sShowType[] = $ssShowType[$n];
$sAlias[]    = $ssAlias[$n];
$sIcons[]	 = $ssIcons[$n];
}
}else{
eInit();
eMessage('ERROR: EL DESKTOP NO TIENE NINGUNA OPCIÓN EN ESTE RANGO', 'HELS', -1);
}
}
if( $_DesktopIconType!='A' ){
for($n=0; $n<count($sIcons); $n++) if( $sIcons[$n]!='' ) $_Icons .= $sIcons[$n].',';
}
if( $_Icons!='' ) $_Icons = mb_substr($_Icons,0,-1);
$NoTab = 99;
$Menu = array();
$ShowType = array();
$Alias = array();
for($n=0; $n<count($sMenu); $n++){
$macro = trim($sMenu[$n]);
if( $macro=='' or $macro=='|~') continue;
$tab = mb_strlen($sMenu[$n]) - mb_strlen(ltrim($sMenu[$n]));
if( $tab > $NoTab ){
continue;
}
if( $macro[0]=='¿' ){
list( $macro ) = explode('?',$macro);
$macro = trim(mb_substr( $macro, 1 ));
if( !( @eval( 'return ('.$macro.');' ) ) ){
$NoTab = $tab;
continue;
}
$sMenu[$n] = mb_substr($sMenu[$n],0,mb_strpos($sMenu[$n],'¿')).trim(mb_substr($sMenu[$n],mb_strpos($sMenu[$n],'?')+1));
}
$Menu[]     = chop($sMenu[$n]);
$ShowType[] = $sShowType[$n];
$Alias[]    = $sAlias[$n];
$Icons[]	= '';
$NoTab = 99;
}
$TotalOpcionesUser = count($Menu);
$uTotalOpcionesUser = $uTotalOpcionesUser;
if( SETUP::$Desktop['DesktopTreeType']!='O' ){
if( eSubstrCount('~AMP', $_gsMaster)==1 ){
if( SESS::$_Development ){
if( $_SERVER['HTTP_HOST']=='localhost' ){
$Menu[]  = '{$edes_l.gif}';
}else{
$Menu[]  = '{$edes.gif}';
}
}else{
$Menu[]  = '{$edes_p.gif}';
}
$ShowType[] = '';
$Alias[]    = '';
$VerURL = false;
if( $_gsMaster=='~' ){
$VerURL = true;
RecuperaArbol($Dir_.'t/__edes.arb', $Menu, $ShowType, $Alias, $VerURL);
}
if( eSubstrCount('~A',$_gsMaster)==1 ) RecuperaArbol($Dir_.'t/__analista.arb', $Menu, $ShowType, $Alias, $VerURL);
if( eSubstrCount('~AM',$_gsMaster)==1 ){
if( eSubstrCount('~A',$_gsMaster)==1 ){
$Menu[] = "\t-";
$ShowType[] = '';
$Alias[] = '';
}
RecuperaArbol($Dir_.'t/__master.arb', $Menu, $ShowType, $Alias, $VerURL);
}
if( eSubstrCount('~AMP',$_gsMaster)==1 ) RecuperaArbol($Dir_.'t/__programador.arb', $Menu, $ShowType, $Alias, $VerURL);
if( eSubstrCount('~AMP',$_gsMaster)==1 ) RecuperaArbol('../tree/__personal.'.str_replace(' ','',mb_strtolower($GLOBALS['_gsNomUser'])), $Menu, $ShowType, $Alias, $VerURL);
}
}
$uTotalOpcionesUser = count($Menu);
if( $uTotalOpcionesUser==0 ){
eInit();
eMessage('ERROR: EL DESKTOP NO TIENE NINGUNA OPCIÓN', 'HELS', -1);
}
$nMenu = 0;
$uNivel = 0;
$xMenu = '0';
$DimNivel = array(0);
$DimSubMenu = array();
$DimOpcion = array();
$DimShowType = array();
$DimAlias = array();
$TMenus = 0;
$uOpcion = -1;
$DimMenu = array();
$DimNivelMenu = array();
$paso = false;
$MenuEDes = 0;
$padre = array();
$SaveOps = "";
for($n=0; $n<count($Menu); $n++){
if( trim($Menu[$n])=='' ) continue;
$Nivel = mb_strpos( $Menu[$n], ltrim($Menu[$n]) );
$tmp2 = explode('~',$Menu[$n]);
$sHelp = trim($tmp2[1]);
$pk = trim($tmp2[1]);
$xHelp = trim($tmp2[2]);
$xType = trim($tmp2[3]);
$tmp = explode('|',$tmp2[0]);
$tmp[1] = str_replace("'",'"',trim($tmp[1]));
$tmp[2] = str_replace("'",'"',trim($tmp[2]));
$Caption = trim($tmp[0]);
$Url = trim($tmp[1]);
$Icon = '';
if( $Caption[0]=='{' ){
eExplodeOne( mb_substr($Caption,1), '}', $Icon, $Caption );
$Caption = trim($Caption);
}else if( $Caption[0]=='[' ){
eExplodeOne( mb_substr($Caption,1), ']', $Icon, $Caption );
$Caption = trim($Caption);
}
if( $Caption=='{icon}' ){
if( SESS::$_Desktop==2 ){
$Caption = '';
$tmp[0] = trim(str_replace('{icon}','',$tmp[0]));
}
}
$_TreeOptions[] = array($Nivel, $Icon, $Caption, $Url, $pk, $xHelp, $xType, $Alias[$n]);
if( $Url!="" ){
if( $Url[0]==":" ){
$padre[$Nivel] = mb_substr($Url,1);
}else if( preg_match('/^(L|=){1}(g|c|m|b){1}l:$/', mb_substr($Url,0,4)) ){
$padre[$Nivel] = mb_substr($Url,4);
}else{
if( mb_substr($Url,-1)==":" ){
$sUrl = $Url.$padre[$Nivel-1];
}else{
$sUrl = $Url;
}
$sUrl = trim($sUrl);
if( mb_substr($sUrl,-1)!=")" && mb_substr($sUrl,-2)!=");" && $sUrl!="edes.php?u" ){
$bak = $sUrl;
if( $sUrl[0]=="¿" ){
list(,$sUrl) = explode("?", $sUrl);
$sUrl = trim($sUrl);
}
if( mb_substr($sUrl,0,9)=="edes.php?" ) $sUrl = mb_substr($sUrl,9);
if( mb_substr($sUrl,0,8)=="edes.gs?" ) $sUrl = mb_substr($sUrl,8);
list($sUrl) = explode(".", $sUrl);
list($sUrl) = explode("&", $sUrl);
if( $sUrl[0]=="?" ) $sUrl = mb_substr($sUrl,1);
if( $sUrl[0]=="2" ) $sUrl = mb_substr($sUrl,1);
if( $sUrl[0]=="3" ) $sUrl = mb_substr($sUrl,1);
if( $sUrl[0]=="w" ) $sUrl = mb_substr($sUrl,1);
if( $sUrl[0]=="W" ) $sUrl = mb_substr($sUrl,1);
if( $sUrl[0]=="#" ) $sUrl = "F".mb_substr($sUrl,1);
if( $sUrl[0]=="@" ) $sUrl = "G".mb_substr($sUrl,1);
if( $sUrl[0]=="=" ) $sUrl = "L".mb_substr($sUrl,1);
if( $sUrl[0]==">" ) $sUrl = "E:".mb_substr($sUrl,1);
if( $sUrl[0]!="^" && !empty($sUrl) ){
$SaveOps .= $sUrl."|".$Icon.CHR10;
}
}
}
}
$DimOpcion[$n] = array($n,0,0,'');
if( $uNivel < $Nivel ){
$DimNivel[$Nivel] = ++$TMenus;
if( $uOpcion!=-1 ){
$t = count($DimMenu[$uOpcion]);
$DimSubMenu[$uOpcion][$t-1] = $TMenus;
$DimOpcion[$n-1][2] = $TMenus;
}
}
$uOpcion = $DimNivel[$Nivel];
$tmp[0] = trim($tmp[0]);
$DimHelp[$uOpcion][] = $sHelp;
$DimOpcion[$n][1] = $uOpcion;
$DimOpcion[$n][3] = $tmp[0];
$DimMenu[$uOpcion][] = $tmp[0];
$DimShowType[$uOpcion][] = $ShowType[$n];
$DimAlias[$uOpcion][] = $Alias[$n];
$HRMenu[$uOpcion][] = $tmp[1];
$HelpMenu[$uOpcion][] = trim($tmp[2]);
$DimNivelMenu[$uOpcion] = $Nivel;
if( $n>$TotalOpcionesUser && !$paso ){
if( $Nivel==1 ){
$MenuEDes = $DimOpcion[$n][1];
$paso = true;
}
}
$uNivel = $Nivel;
}
if( SETUP::$System['ContextActivate'] ){
$dim = explode(CHR10, $SaveOps);
for($n=0; $n<count($dim); $n++){
list($url) = explode("|", $dim[$n]);
$url = trim($url);
if( empty($url) ) continue;
if( mb_strpos($url, ".")===false ){
$obj = $url[0];
if(		  $obj=="F" || $obj=="#" ){
$url .= ".edf";
}else if( $obj=="L" || $obj=="=" ){
$url .= ".edf";
}else if( $obj=="G" || $obj=="@" ){
$url .= ".gdf";
}else if( $obj=="E" || $obj==">" ){
$url .= ".php";
}
}
eContextPut($url);
}
}
if( $generaFiles ){
file_put_contents('../_tmp/php/'.SESS::$_G_.'menu.'.$user, $SaveOps);
}
unset($SaveOps);
$TOpMain = count($DimMenu[0]);
if( !$paso ) $MenuEDes = $TMenus+1;
$PMenu = array();
for($n=count($DimOpcion)-1; $n>0; $n--){
for($i=$n; $i>=0; $i--){
if( $DimOpcion[$n][1]==$DimOpcion[$i][2] ){
if( $PMenu[$DimOpcion[$n][1]]=='' ) $PMenu[$DimOpcion[$n][1]] = $DimOpcion[$i][1];
}
}
}
}
function RecuperaArbol($NomFile, &$Menu, &$ShowType, &$Alias, $VerURL=false){
global $_User, $_Node, $_aUser, $_TreeOptions, $_DimTree;
if( file_exists($NomFile)!=1 && is_readable($NomFile)!=1 ) return;
$DimIdioma = array();
qQuery( "select * from {$_ENV['eDesDictionary']}gs_language where tf_translation='{$_ENV['ON']}' order by nm_gs_language" );
while( $r=qArray() ) $DimIdioma[] = array( trim($r['cd_gs_language']), eUcFirst(trim($r['nm_gs_language'])) );
$fd = fopen( $NomFile, 'r' );
$Todo = fread($fd,filesize($NomFile));
fclose($fd);
$tmp = explode( CHR10, gzuncompress( $Todo ) );
for( $n=1; $n<count($tmp); $n++ ){
$xLine = $tmp[$n];
if( trim($xLine)=="" ) continue;
list($macro1,$macro) = explode('|',$tmp[$n]);
$sMacro1 = $macro1;
$macro1 = trim($macro1);
$macro  = trim($macro);
if( $macro1[0]=='.' ) continue;
if( $macro==':eEditConfidential' || $macro==':eEditKeyHelp' ){
if( SETUP::$System['DocSecurity'] || $macro==':eEditKeyHelp' ){
$i = $n+1;
if( count($DimIdioma) > 0 ){
for($p=0; $p<count($DimIdioma); $p++){
array_splice($tmp, $i, 0, str_repeat(mb_chr(9),mb_strlen($tmp[$n])-mb_strlen(ltrim($tmp[$n]))+1).$DimIdioma[$p][1]."|".mb_substr($macro,1)."('".$DimIdioma[$p][0]."')");
$i++;
}
$macro = '';
}else{
$macro = mb_substr($macro,1).'("_es")';
}
}else{
continue;
}
}
if( mb_substr($macro,0,6)=='@LNGS@' ){
$i = $n+1;
$sMacro = mb_substr($macro,6);
if( count($DimIdioma) > 0 ){
for( $p=0; $p<count($DimIdioma); $p++ ){
array_splice( $tmp, $i, 0, str_repeat(mb_chr(9),mb_strlen($tmp[$n])-mb_strlen(ltrim($tmp[$n]))+1).$DimIdioma[$p][1]."|". $sMacro[0].str_replace('#',$DimIdioma[$p][0],mb_substr($sMacro,1)) );
$i++;
}
$tmp[$n] = str_replace( $macro, '', $tmp[$n] );
$macro = '';
}else{
$macro = $sMacro[0].str_replace('#','es',mb_substr($sMacro,1));
$tmp[$n] = $sMacro1.'|'.$macro;
}
}
if( $macro1!='' ){
if( $macro1[0]=='-' && eSubstrCount($macro1,'¿') > 0 ){
list( ,$macro1 ) = explode('¿',$macro1);
$macro1 = trim(mb_substr( $macro1,0,-1 ));
if( !( @eval( 'return ('.$macro1.');' ) ) ) continue;
$tmp[$n] = '-';
}
}
if( $macro!='' ){
if( $macro[0]=='¿' ){
list( $macro ) = explode('?',$macro);
$macro = trim(mb_substr( $macro, 1 ));
if( !( @eval( 'return ('.$macro.');' ) ) ) continue;
$tmp[$n] = mb_substr($tmp[$n],0,mb_strpos($tmp[$n],'¿')).trim(mb_substr($tmp[$n],mb_strpos($tmp[$n],'?')+1));
$xLine = mb_substr($xLine,0,mb_strpos($xLine,'¿')).trim(mb_substr($xLine,mb_strpos($xLine,'?')+1));
}
}
if( eSubstrCount($tmp[$n],'~') > 1 ){
$xTmp = explode('~',$tmp[$n]);
$tmp[$n] = $xTmp[0].'~'.$xTmp[1];
$xAlias = trim($xTmp[2]); if( $xAlias!='' ) $xAlias = '.'.$xAlias;
$xShow = trim($xTmp[3]);
}else{
$xAlias = '';
$xShow = '';
}
$Menu[] = chop("\t".$tmp[$n]);
$ShowType[] = $xShow;
$Alias[] = $xAlias;
$tmp2 = explode('~',$xLine);
$item = explode('|',$tmp2[0]);
$indent = mb_strlen($item[0])-mb_strlen(ltrim($item[0]));
$icon = "";
$item[0] = trim($item[0]);
$item[1] = trim($item[1]);
if( $item[0][0]=="[" || $item[0][0]=="{" ){
if( $item[0][0]=="[" ){
list($icon, $item[0]) = explode(']',mb_substr($item[0],1));
}else{
list($icon, $item[0]) = explode('}',mb_substr($item[0],1));
}
$icon = trim($icon);
}
$item[0] = trim($item[0]);
if( $item[0][0]=="-" ){
$tipoOp = "L";
}else if( $item[1]=="" || $item[1][0]==":" ){
$tipoOp = "F";
if( $item[1]=="" && $n+1<count($tmp) ){
$xLine = $tmp[$n+1];
if( trim($xLine)=="" && $n+2<count($tmp) ) $xLine = $tmp[$n+2];
if( trim($xLine)!="" ){
$indent2 = mb_strlen($xLine)-mb_strlen(ltrim($xLine));
if( $indent2<=$indent ){
$tipoOp = "O";
}
}
}
}else{
$tipoOp = "O";
}
$_DimTree[] = array(
"seq"=>0,
"indent"=>$indent,
"type"=>$tipoOp,
"caption"=>$item[0],
"script_url"=>$item[1],
"cd_gs_op"=>0,
"tip"=>"",
"icon"=>$icon,
"show_type"=>"",
"alias"=>"",
"icons"=>"",
"mode"=>""
);
}
}
function RecuperaArbol2($NomFile, &$tmp){
global $_User, $_Node, $_aUser, $_TreeOptions, $_DimTree;
if( file_exists($NomFile)!=1 && is_readable($NomFile)!=1 ) return;
$DimIdioma = array();
qQuery( "select * from {$_ENV['eDesDictionary']}gs_language where tf_translation='{$_ENV['ON']}' order by nm_gs_language" );
while( $r=qArray() ) $DimIdioma[] = array( trim($r['cd_gs_language']), eUcFirst(trim($r['nm_gs_language'])) );
$fd = fopen($NomFile, 'r');
$Todo = fread($fd, filesize($NomFile));
fclose($fd);
$dim = explode(CHR10, gzuncompress($Todo));
for($n=1; $n<count($dim); $n++){
$xLine = $dim[$n];
if( trim($xLine)=="" ) continue;
list($macro1,$macro) = explode('|', $dim[$n]);
$sMacro1 = $macro1;
$macro1 = trim($macro1);
$macro  = trim($macro);
if( $macro1[0]=='.' ) continue;
if( $macro==':eEditConfidential' || $macro==':eEditKeyHelp' ){
if( SETUP::$System['DocSecurity'] || $macro==':eEditKeyHelp' ){
$i = $n+1;
if( count($DimIdioma) > 0 ){
for( $p=0; $p<count($DimIdioma); $p++ ){
array_splice( $dim, $i, 0, str_repeat(mb_chr(9),mb_strlen($dim[$n])-mb_strlen(ltrim($dim[$n]))+1).$DimIdioma[$p][1]."|".mb_substr($macro,1)."('".$DimIdioma[$p][0]."')" );
$i++;
}
$macro = '';
}else{
$macro = mb_substr($macro,1).'("_es")';
}
}else{
continue;
}
}
if( mb_substr($macro,0,6)=='@LNGS@' ){
$i = $n+1;
$sMacro = mb_substr($macro,6);
if( count($DimIdioma)>0 ){
for($p=0; $p<count($DimIdioma); $p++){
array_splice( $dim, $i, 0, str_repeat(mb_chr(9),mb_strlen($dim[$n])-mb_strlen(ltrim($dim[$n]))+1).$DimIdioma[$p][1]."|". $sMacro[0].str_replace('#',$DimIdioma[$p][0],mb_substr($sMacro,1)) );
$i++;
}
$dim[$n] = str_replace( $macro, '', $dim[$n] );
$macro = '';
}else{
$macro = $sMacro[0].str_replace('#','es',mb_substr($sMacro,1));
$dim[$n] = $sMacro1.'|'.$macro;
}
}
if( $macro1!='' ){
if( $macro1[0]=='-' && eSubstrCount($macro1,'¿') > 0 ){
list( ,$macro1 ) = explode('¿',$macro1);
$macro1 = trim(mb_substr( $macro1,0,-1 ));
if( !( @eval( 'return ('.$macro1.');' ) ) ) continue;
$dim[$n] = '-';
}
}
if( $macro!='' ){
if( $macro[0]=='¿' ){
list($macro) = explode('?', $macro);
$macro = trim(mb_substr($macro, 1));
if( !(@eval('return ('.$macro.');')) ) continue;
$dim[$n] = mb_substr($dim[$n],0,mb_strpos($dim[$n],'¿')).trim(mb_substr($dim[$n],mb_strpos($dim[$n],'?')+1));
$xLine = mb_substr($xLine,0,mb_strpos($xLine,'¿')).trim(mb_substr($xLine,mb_strpos($xLine,'?')+1));
}
}
if( eSubstrCount($dim[$n],'~') > 1 ){
$xTmp = explode('~',$dim[$n]);
$dim[$n] = $xTmp[0].'~'.$xTmp[1];
$xAlias = trim($xTmp[2]); if( $xAlias!='' ) $xAlias = '.'.$xAlias;
$xShow = trim($xTmp[3]);
}else{
$xAlias = '';
$xShow = '';
}
$Menu[] = chop("\t".$dim[$n]);
$ShowType[] = $xShow;
$Alias[] = $xAlias;
$dim2 = explode('~',$xLine);
$item = explode('|',$dim2[0]);
$indent = mb_strlen($item[0])-mb_strlen(ltrim($item[0]));
$icon = "";
$item[0] = trim($item[0]);
$item[1] = trim($item[1]);
if( $item[0][0]=="[" || $item[0][0]=="{" ){
if( $item[0][0]=="[" ){
list($icon, $item[0]) = explode(']',mb_substr($item[0],1));
}else{
list($icon, $item[0]) = explode('}',mb_substr($item[0],1));
}
$icon = trim($icon);
}
$item[0] = trim($item[0]);
if( $item[0][0]=="-" ){
$tipoOp = "L";
}else if( $item[1]=="" || $item[1][0]==":" ){
$tipoOp = "F";
if( $item[1]=="" && $n+1<count($dim) ){
$xLine = $dim[$n+1];
if( trim($xLine)=="" && $n+2<count($dim) ) $xLine = $dim[$n+2];
if( trim($xLine)!="" ){
$indent2 = mb_strlen($xLine)-mb_strlen(ltrim($xLine));
if( $indent2<=$indent ){
$tipoOp = "O";
}
}
}
}else{
$tipoOp = "O";
}
$tmp[] =  array(
"seq"=>0,
"indent"=>$indent,
"type"=>$tipoOp,
"caption"=>$item[0],
"script_url"=>$item[1],
"cd_gs_op"=>0,
"tip"=>"",
"icon"=>$icon,
"show_type"=>"",
"alias"=>"",
"icons"=>"",
"mode"=>""
);
}
}
function RecuperaArboles(&$tmp){
global $_gsMaster, $Dir_;
if( eSubstrCount('~AMP',$_gsMaster)==1 ){
if( SESS::$_Development ){
if( $_SERVER['HTTP_HOST']=='localhost' ){
$Menu[]  = '{$edes_l.gif}';
}else{
$Menu[]  = '{$edes.gif}';
}
}else{
$Menu[]  = '{$edes_p.gif}';
}
$ShowType[] = '';
$Alias[]    = '';
$VerURL = false;
if( $_gsMaster == '~' ){
$VerURL = true;
RecuperaArbol2( $Dir_.'t/__edes.arb', $tmp );
}
if( eSubstrCount('~A',$_gsMaster)==1 ) RecuperaArbol2( $Dir_.'t/__analista.arb', $tmp );
if( eSubstrCount('~AM',$_gsMaster)==1 ){
if( eSubstrCount('~A',$_gsMaster)==1 ){
$Menu[] = "\t-";
$ShowType[] = '';
$Alias[] = '';
}
RecuperaArbol2( $Dir_.'t/__master.arb', $tmp );
}
if( eSubstrCount('~AMP',$_gsMaster)==1 ) RecuperaArbol2( $Dir_.'t/__programador.arb', $tmp );
if( eSubstrCount('~AMP',$_gsMaster)==1 ) RecuperaArbol2( '../tree/__personal.'.str_replace(' ','',mb_strtolower($GLOBALS['_gsNomUser'])), $tmp );
}
}
function eIconsShow($Estilo=''){
if( SESS::$_Desktop!=2 && $SESS::$_Desktop!=3 ) return;
global $_Icons, $_Test;
$OpNo = "'U'";
if( SESS::$_Development ) $OpNo .= "";
else if( $_Test ) $OpNo .= ",'D'";
else $OpNo .= ",'D','T'";
if( $Estilo!='' ) $Estilo = ' '.$Estilo;
if( $_Icons!='' ) $_Icons = " or cd_gs_op_ico in ({$_Icons})";
echo "<table class=ICONS id=_TABLEICONS border=0 cellspacing=0 cellspadding=0{$Estilo}><tr>";
qQuery( "select * from {$_ENV['eDesDictionary']}gs_op_ico where activo='{$_ENV['ON']}' and ( global='{$_ENV['ON']}' {$_Icons} ) and show_type not in ({$OpNo}) order by position", $i );
$Dim = array();
while( $r=qArray($i) ) $Dim[] = $r;
for( $i=0; $i<count($Dim); $i++ ){
$r = $Dim[$i];
$iShow		= ( ($r['show_type']=='H') ? " style='display:none'" : '' );
$iDisabled	= ( ($r['show_type']=='O') ? ' disabled' : '' );
$iAlias		= ( (trim($r['alias'])!='') ? " id='.".trim($r['alias'])."'" : '' );
$nMode		= ( ($r['mode']!='') ? ' t='.$r['mode'] : '' );
if( $r['classname']!='' ){
$Class = ' class="'.$r['classname'];
if( $i==0 || ($i>0 && $Dim[$i-1]['classname']!=$r['classname']) )																					$Class .= ' '.$r['classname'].'L';
if( $i>0 && $Dim[$i-1]['classname']==$r['classname'] && (($i+1)<count($Dim) && $Dim[$i+1]['classname']==$r['classname'] ) )	$Class .= ' '.$r['classname'].'C';
if( $i+1==count($Dim) || (($i+1)<count($Dim) && $Dim[$i+1]['classname']!=$r['classname'] ) )												$Class .= ' '.$r['classname'].'R';
$Class .= '"';
}else $Class = '';
if( $r['title']!='-' ){
echo '<td'.$iShow.$iAlias.$iDisabled.$Class.' a="i'.$r['cd_gs_op_ico'].'"'.$nMode.'>';
if( trim($r['icon'])!='' ){
if( $iDisabled!='' ) $iDisabled .= ' class="OFF"';
$r['title'] = str_replace( '&#92;n', CHR10, $r['title'] );
echo '<img'.$iDisabled.' src="'.$r['icon'].'" '.str_replace('&quot;','"',str_replace('&#39;',"'",$r['add_html'])).' title="'.str_replace('"','&quot;',$r['title']).'">';
}else{
$r['add_html'] = trim($r['add_html']);
if( mb_substr($r['add_html'],-1)==')' and eSubstrCount($r['add_html'],'(')==1 and eSubstrCount($r['add_html'],')')==1 ){
@eval( 'return '.str_replace('&quot;','"',$r['add_html']).';' );
}else{
echo str_replace('&lt;','<',str_replace('&gt;','>',str_replace('&quot;','"',str_replace('&#39;',"'",$r['add_html']))));
}
}
echo '</td>';
if( $r['separator_group']==$_ENV['ON'] ){
if( $r['classname']=='' ){
echo '<td class=Separator></td>';
}else{
if( $i+1==count($Dim) || ($i+1<count($Dim) && $Dim[$i+1]['classname']!=$r['classname']) ) echo '<td class=Separator></td>';
}
}
}else{
echo '<td class=Separator></td>';
}
}
echo '</tr></table>';
?>
<SCRIPT type="text/javascript">
function _iOnClick(){
var Obj = S.event(window);
if( Obj.eDesOnClick!=undefined ){
if( _WebOFF!='' && _DesktopTreeType=='O' && Obj.parentNode.t!=undefined ){
if( Obj.parentNode.t!='V' && _WebUser.search(','+_User+',') == -1 ){
eAlert( S.lng(209), _WebOFF, 'A', 'W' );
return eClearEvent()
}
}
eval( Obj.eDesOnClick.replace(/this\./g,'S.event(window).') );
}
}
function _CpOnClick(){
var Obj = DGI('_TABLEICONS');
if( Obj==null ) return;
for( var n=0; n<Obj.all.length; n++ ){
if( Obj.children[n].onclick!=undefined ){
var txt = Obj.children[n].onclick+'';
if( txt.indexOf('{') > -1 ){
txt = txt.substring(txt.indexOf('{')+1,txt.length-1);
Obj.children[n].eDesOnClick = txt;
Obj.children[n].onclick = _iOnClick;
}
}
}
}
_CpOnClick();
</SCRIPT>
<?PHP
}
?>