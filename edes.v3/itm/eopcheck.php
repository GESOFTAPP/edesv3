<?PHP
function eOpCheck_( $NOp ){
if( SETUP::$Desktop['DesktopTreeType']!='O' ) return false;
if( !function_exists('qQuery') ) include_once( $GLOBALS['Dir_'].$GLOBALS['_Sql'].'.inc' );
qQuery( "select cd_type_tree,cd_gs_rol,like_user from {$_ENV['eDesDictionary']}gs_user where cd_gs_user=".S::$_User, $p );
list( $_TypeTree, $Rol, $LikeUser ) = qRow($p);
if( $_TypeTree=='P' ){
$_UserTree = S::$_User;
}
$OpNo = "'U'";
if( $GLOBALS['_Development'] ) $OpNo .= "";
else if( $GLOBALS['_Test'] ) $OpNo .= ",'D'";
else $OpNo .= ",'D','T'";
$TypeUR = ( ($_TypeTree=='P') ? 'user' : 'rol' );
$OpcionesAEliminar = '';
if( eSqlType('mysql,mysqli') ){
qQuery( "select count(*)
from {$_ENV['eDesDictionary']}gs_op o left join {$_ENV['eDesDictionary']}gs_tree_op t on o.cd_gs_op = t.cd_gs_op
where
o.cd_gs_op={$NOp} and
(
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
)
)
)" );
}else{
qQuery( "select count(*)
from {$_ENV['eDesDictionary']}gs_op o left join {$_ENV['eDesDictionary']}gs_tree_op t on o.cd_gs_op = t.cd_gs_op
where
o.cd_gs_op={$NOp} and
(
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
)
)
)" );
}
list( $TReg ) = qRow();
return( $TReg>0 );
}
?>