<?php
$mermaid = array();
$_POST["mermaid"] = str_replace(
array("&#60;", "&#62;")
,array("<"    , ">")
,$_POST["mermaid"]
);
$cadena = '<pre class="mermaid">';
$dim = explode("|", $_POST["mermaid"]);
for($n=0; $n<count($dim); $n++){
$linea = trim($dim[$n]);
if( $linea==";" ){
$cadena .= '</pre><pre class="mermaid">';
continue;
}
$cadena .= $linea."\n";
}
$cadena .= "</pre>";
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<script type="module">
import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
mermaid.initialize({ startOnLoad: true });
</script>
</head>
<body>
<?= $cadena ?>
<script>
mermaid.initialize({ startOnLoad: true });
</script>
</body>
</html>