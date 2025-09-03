<?PHP
$imageToBlur = function($fileOrigin, $fileTarget, $nivelBlur=10){
if( !file_exists($fileOrigin) ){
die("The file [{$fileOrigin}] not exists");
}
$typeFile = mb_strtolower(eFileType($fileOrigin));
if( $typeFile=="jpg" ){
$typeFile = "jpeg";
}
if( !preg_match('/^(png|jpeg|gif|bmp)$/u', $typeFile) ){
die("Image type not allowed [{$typeFile}]");
}
$im = call_user_func_array("imageCreateFrom{$typeFile}", [$fileOrigin]);
for($i=1; $i<=$nivelBlur; $i++){
imageFilter($im, IMG_FILTER_GAUSSIAN_BLUR, 999);
}
imageFilter($im, IMG_FILTER_SMOOTH	  , 99);
imageFilter($im, IMG_FILTER_BRIGHTNESS, 10);
if( $fileOrigin==$fileTarget ){
@unlink($fileTarget);
}
call_user_func_array("image{$typeFile}", [$im, $fileTarget]);
imageDestroy($im);
};
?>