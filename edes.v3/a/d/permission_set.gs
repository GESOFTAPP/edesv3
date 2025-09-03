<?PHP
eCheckUser();
eInclude( $_Sql );
if( $_GET['O']==$_ENV['ON'] ){
qQuery("insert into {$_ENV['eDesDictionary']}gs_permission (cd_gs_user,cd_gs_tpermission) values (".$_GET['U'].','.$_GET['P'].')' );
}else{
qQuery("delete from {$_ENV['eDesDictionary']}gs_permission where cd_gs_user=".$_GET['U'].' and cd_gs_tpermission='.$_GET['P'] );
}
?>