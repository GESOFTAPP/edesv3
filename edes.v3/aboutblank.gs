<?PHP
header("Content-Type: text/html; charset=UTF-8");
eHTML();
?>
</HEAD>
<BODY>
<?PHP  if( isset($_GET['FUNCTION']) ){ ?>
<SCRIPT type="text/javascript">
top.<?=$_GET['FUNCTION']?>(window);
</SCRIPT>
<?PHP  } ?>
</BODY>
</HTML>
<?PHP
$_ENV[SYS]['checkSession'] = false;
eEnd();
?>