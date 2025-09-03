<?PHP
if( $_SERVER["REDIRECT_STATUS"]==404 && $_SERVER["REQUEST_METHOD"]=="GET" ){
include("../../edes.v3/login.php");
}
?>