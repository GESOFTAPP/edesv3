<?php
$url = str_replace("/", "\\*", $_POST["url"]);
$url = "/^".$url."/u";
$width = $_POST["width"];
$viewFile = "";
$imgs = "<br>";                             // eTron("Buscar: ".$url.' - '.$width);
$dir = "g/screenshot";
$uDir = opendir($dir);
while( $uFile=readdir($uDir) ){
if( ($uFile=='.') || ($uFile=='..') || (is_dir($dir.'/'.$uFile)) ) continue;
if( preg_match($url, $uFile) && preg_match("/_[1-9]{1,2}_[0-9]{1,4}.png$/u", $uFile) ){                      // eExplodeLast($uFile, "_", $izq, $dch);
define("ORDER", 1);
define("WIDTH", 2);
$img = preg_split('/(_[1-9])(_[0-9]{1,4}).png$/u', $uFile, -1, PREG_SPLIT_DELIM_CAPTURE);
$img[WIDTH] = substr($img[WIDTH],1);
$viewFile = $uFile;                                                                                 // eTron("> ".$uFile);
$imgs .= "<img src=\'{$dir}/{$viewFile}\' style=\'max-width:{$img[WIDTH]}px\'>";
}
}
closedir($uDir);
echo "top.S('.screenshotView').html('{$imgs}');";
?>