<?PHP
error_log(date('Y-m-d H:i:s:').mb_substr(explode(" ",microtime())[0],2,8).': '.$_SERVER["QUERY_STRING"]."\n", 3, "../_tmp/log/trace.".S::$_User.".txt");
?>