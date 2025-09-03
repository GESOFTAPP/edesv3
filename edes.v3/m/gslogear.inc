<?PHP
global $_L_, $_User;
if( eSubstrCount($File, '/_tmp/__tron.')==1 ){
$Modo = mb_strtolower($Modo);
}
if( eSubstrCount($File, '/edes.v3/')==1 ){
list(,$File) = explode('/edes.v3/', $File);
$File = '$'.$File;
}else if( eSubstrCount($File, '/d/')==1 ){
list(,$File) = explode('/d/', $File);
}else if( mb_substr($File,0,3)=='../' ){
$File = mb_substr($File,2);
}
$zp = gzopen("../_d_/log/activity.{$_User}", "a9");
gzwrite($zp, date('Y-m-d H:i:s')." {$Apli} {$Modo} {$File}\n");
gzclose($zp);
?>