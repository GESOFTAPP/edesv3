<?php
function ver_asegura_passwmb_ord(){
qQuery("select cd_gs_user,login,pass from {$_ENV['eDesDictionary']}gs_user", $p1);
while($r=qArray($p1)){
$user = $r["cd_gs_user"];
$pass = mb_strtoupper(md5(trim($r["login"]).$r["pass"]));
$sql = "update {$_ENV['eDesDictionary']}gs_user set pass='{$pass}' where cd_gs_user='{$user}'";
qQuery($sql);
}
}
ver_asegura_passwmb_ord();
?>