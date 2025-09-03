<?PHP
$imgClear = function($file, $newFile){
$typeFile = _imgTypeToFunction($file);
if( $typeFile===false ){
return false;                   // die("error type not allowed");
}
if( file_exists($newFile) ){
unlink($newFile);
clearstatcache();
}
$src = call_user_func("imageCreateFrom{$typeFile}", $file);
call_user_func("image{$typeFile}", $src, $newFile);
imageDestroy($src);
clearstatcache();
if( !file_exists($newFile) ){
return false;                   // die("error file not created");
}
return true;
}
?>