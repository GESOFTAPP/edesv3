<?PHP
$archivo = eScript($file);
$ext = eFileType($file);
eExplodeLast($nom, ".", $nom);
$nom = eClearAccent(str_replace("&#769;","",$nom), false);
header("Content-Type: application/force-download");
header("Content-Disposition: attachment; filename=".'"'."{$nom}.{$ext}".'"');
header("Content-Transfer-Encoding: binary");
header("Content-Length: ".filesize($archivo));
readfile($archivo);
eEnd();
?>