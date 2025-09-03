<?php
$text = $_POST["textos"];
echo $_POST["textos"];
?>
<i id='_{$oCampo}' class='ICONINPUT' style='color:#bd454b'  onclick='getText()' title='{$__Lng[52]}'>P</i>
<hr><br>
<script type="text/javascript">
top.S.init(window,"all");
S.windowView(window);
function getText(){
debugger;
S.clipboardPut("pepe");
}
</script>
<div id="google_translate_element"></div>
<script type="text/javascript">
function googleTranslateElementInit(){
new google.translate.TranslateElement({pageLanguage: 'es', includedLanguages: 'es,ca,en,fr', layout: google.translate.TranslateElement.InlineLayout.SIMPLE, gaTrack: true}, 'google_translate_element');
}
</script>
<script type="text/javascript" src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>