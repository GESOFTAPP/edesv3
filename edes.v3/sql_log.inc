<?PHP
function qUpdateWithLog($data){
global $_User;
$tableMain  = $data["table"];
$set	= $data["set"];
$where  = trim($data["where"]);
$pk		= eNsp($data["pk"]);
$requests  = $data["requests"];
if( $requests=="" ) $requests = 1;
$requesLog = "";
$pkDim = explode(",", $pk);
$pkDimOriginal = $pkDim;
$pkTotal = count($pkDim);
for($n=0; $n<$pkTotal; $n++){
if( preg_match("/\./u", $pkDim[$n]) ){
list(,$pkDim[$n]) = explode(".", $pkDim[$n]);
}
}
if( $where!="" ) $where = "where {$where}";
$totalRec = 0;
list($table) = explode(" ", $tableMain);
qQuery("select * from {$tableMain} {$where}", $p1);
while( $old=qArray($p1) ){
$claveLog = "";
$whereOne = [];
$whereOneOriginal = [];
for($n=0; $n<$pkTotal; $n++){
$whereOne[] = $pkDim[$n].'="'.$old[$pkDim[$n]].'"';
$whereOneOriginal[] = $pkDimOriginal[$n].'="'.$old[$pkDim[$n]].'"';
$claveLog .= $old[$pkDim[$n]];
}
$whereOne = implode(" and ", $whereOne);
$whereOneOriginal = implode(" and ", $whereOneOriginal);
$sqlUpdate = "update {$tableMain} set {$set} where {$whereOneOriginal}";
qQuery($sqlUpdate, $p2);
$sqlNew = "select * from {$table} where {$whereOne}";
qQuery($sqlNew, $p2);
$new = qArray($p2);
$dif = [];
foreach($new as $k=>$v){
if( $old[$k]!=$v ){
if( $v=="NULL" || $v=="" ){
$dif[] = "{$k}=NULL";
}else if( is_numeric($v) ){
$dif[] = "{$k}={$v}";
}else{
$v = str_replace('"','&#34;',trim($v));
$dif[] = $k.'="'.$v.'"';
}
}
}
$dif = implode(",", $dif);
if( $dif=="" ) continue;
$totalRec++;
if( $requests==1 ){
$sql = 'insert into '.$_ENV['eDesDictionary'].'gs_log (cdi, operacion, cd_gs_user, tabla, clave, sqlexe) values ("'.date('Y-m-d H:i:s').'", "M", "'.$_User.'", "'.$table.'", "'.$claveLog.'", "'.str_replace('"','&#34;',$dif).'")';
qQuery($sql, $p2);
}else{
if( $totalRec%$requests==1 ){
$requesLog = 'insert into '.$_ENV['eDesDictionary'].'gs_log (cdi, operacion, cd_gs_user, tabla, clave, sqlexe) values ("'.date('Y-m-d H:i:s').'", "M", "'.$_User.'", "'.$table.'", "'.$claveLog.'", "'.str_replace('"','&#34;',$dif).'")';
}else{
$requesLog .= ',("'.date('Y-m-d H:i:s').'", "M", "'.$_User.'", "'.$table.'", "'.$claveLog.'", "'.str_replace('"','&#34;',$dif).'")';
}
if( $totalRec%$requests==0 ){
qQuery($requesLog, $p2);
$requesLog = "";
}
}
}
if( $requesLog!='' ){
qQuery($requesLog, $p2);
}
return $totalRec;
}
function qDeleteToWithLog($data){
global $_User;
$table = $data["table"];
$where = $data["where"];
$pk = eNsp($data["pk"]);
$requests  = $data["requests"];
if( $requests=="" ) $requests = 1;
$requesLog = "";
$totalRec = 0;
$pk = eNsp($pk);
$dimPk = explode(",", $pk);
$totalPk = count($dimPk);
if( $where!="" ) $where = "where {$where}";
$sql = "select * from {$table} {$where}";
qQuery($sql, $p1);
while( $r=qArray($p1) ){
$totalRec++;
$dim = [];
$dimValores = [];
foreach($r as $k=>$v){
if( $v=="NULL" || $v=="" ){
$dim[] = "{$k}=NULL";
$dimValores[] = "NULL";
}else if( is_numeric($v) ){
$dim[] = "{$k}={$v}";
$dimValores[] = $v;
}else{
$v = str_replace('"','&#34;',trim($v));
$dim[] = $k.'="'.$v.'"';
$dimValores[] = '"'.$v.'"';
}
}
$sqlLog = implode(",", $dim);
$dClave = "";
$dWhere = [];
for($n=0; $n<$totalPk; $n++){
$dClave .= $r[$dimPk[$n]];
$dWhere[] = $dimPk[$n].'="'.$r[$dimPk[$n]].'"';
}
$dWhere = implode(" and ", $dWhere);
if( $requests==1 ){
$sql = 'insert into '.$_ENV['eDesDictionary'].'gs_log (cdi, operacion, cd_gs_user, tabla, clave, sqlexe) values ("'.date('Y-m-d H:i:s').'", "B", "'.$_User.'", "'.$table.'", "'.$dClave.'", "'.str_replace('"','&#34;',$sqlLog).'")';
qQuery($sql, $p2);
}else{
if( $totalRec%$requests==1 ){
$requesLog = 'insert into '.$_ENV['eDesDictionary'].'gs_log (cdi, operacion, cd_gs_user, tabla, clave, sqlexe) values ("'.date('Y-m-d H:i:s').'", "B", "'.$_User.'", "'.$table.'", "'.$dClave.'", "'.str_replace('"','&#34;',$sqlLog).'")';
}else{
$requesLog .= ',("'.date('Y-m-d H:i:s').'", "B", "'.$_User.'", "'.$table.'", "'.$dClave.'", "'.str_replace('"','&#34;',$sqlLog).'")';
}
if( $totalRec%$requests==0 ){
qQuery($requesLog, $p2);
$requesLog = "";
}
}
$sqlDelete = "delete from {$table} where {$dWhere}";
qQuery($sqlDelete, $p2);
}
if( $requesLog!='' ){
qQuery($requesLog, $p2);
}
return $totalRec;
}
function qUpdateToWithLog($data){
global $_User;
$oTabla  = $data["origin"]["table"];
$oCampos = $data["origin"]["fields"];
$oWhere  = $data["origin"]["where"];
$dTabla  = $data["target"]["table"];
$dPk	 = eNsp($data["target"]["pk"]);
$dCampos = eNsp($data["target"]["fields"]);
$dimPk = explode(",", $dPk);
$totalPk = count($dimPk);
$dCampoDim = explode(",", $dCampos);
$totalRec = 0;
if( $oWhere!="" ) $oWhere = "where ".$oWhere;
$oSql = "select {$oCampos} from {$oTabla} {$oWhere}";
qQuery($oSql, $p1);
while( $oRec=qArray($p1) ){
$claveLog = "";
$claveDestinoDim = [];
for($n=0; $n<$totalPk; $n++){
$claveLog .= $oRec[$dimPk[$n]];
$claveDestinoDim[] = $dimPk[$n]."='".$oRec[$dimPk[$n]]."'";
}
$claveDestino = implode(" and ", $claveDestinoDim);
$dSql = "select {$dCampos} from {$dTabla} where {$claveDestino}";
qQuery($dSql, $p2);
$dRec = qArray($p2);
$dExist = true;
for($n=0; $n<$totalPk; $n++){
if( $dRec[$dimPk[$n]]!=$oRec[$dimPk[$n]] ){
$dExist = false;
break;
}
}
if( !$dExist ){
continue;
}
$dim = [];
$cambios = 0;
$i = -1;
foreach($oRec as $k=>$v){
$i++;
$k = $dCampoDim[$i];
if( $dRec[$k]!=$v ){
$cambios++;
if( $v=="NULL" || $v=="" ){
$dim[] = "{$k}=NULL";
}else if( is_numeric($v) ){
$dim[] = "{$k}={$v}";
}else{
$v = str_replace('"','&#34;',trim($v));
$dim[] = $k.'="'.$v.'"';
}
}
}
if( $cambios==0 ){
continue;
}
$sqlLog = implode(",", $dim);
$totalRec++;
$sql = 'insert into '.$_ENV['eDesDictionary'].'gs_log (cdi, operacion, cd_gs_user, tabla, clave, sqlexe) values ("'.date('Y-m-d H:i:s').'", "M", "'.$_User.'", "'.$dTabla.'", "'.$claveLog.'", "'.str_replace('"','&#34;',$sqlLog).'")';
qQuery($sql, $p2);
$sqlUpdate = "update {$dTabla} set {$sqlLog} where {$claveDestino}";
qQuery($sqlUpdate);
}
return $totalRec;
}
function qInsertToWithLog($data){
global $_User;
$oTabla  = $data["origin"]["table"];
$oCampos = $data["origin"]["fields"];
$oWhere  = $data["origin"]["where"];
$dTabla  = $data["target"]["table"];
$dPk	 = eNsp($data["target"]["pk"]);
$dCampos = $data["target"]["fields"];
$requests  = $data["requests"];
$dimPk = explode(",", $dPk);
$totalPk = count($dimPk);
if( $requests=="" ) $requests = 1;
$requesLog = "";
$requesTable = "";
$totalRec = 0;
if( $oWhere!="" ) $oWhere = "where ".$oWhere;
$oSql = "select {$oCampos} from {$oTabla} {$oWhere}";
qQuery($oSql, $p1);
while( $r=qArray($p1) ){
$totalRec++;
$dim = [];
$dimValores = [];
foreach($r as $k=>$v){
if( $v=="NULL" || $v=="" ){
$dim[] = "{$k}=NULL";
$dimValores[] = "NULL";
}else if( is_numeric($v) ){
$dim[] = "{$k}={$v}";
$dimValores[] = $v;
}else{
$v = str_replace('"','&#34;',trim($v));
$dim[] = $k.'="'.$v.'"';
$dimValores[] = '"'.$v.'"';
}
}
$sqlLog = implode(",", $dim);
$dClave = "";
for($n=0; $n<$totalPk; $n++){
$dClave .= $r[$dimPk[$n]];
}
if( $requests==1 ){
$sql = 'insert into '.$_ENV['eDesDictionary'].'gs_log (cdi, operacion, cd_gs_user, tabla, clave, sqlexe) values ("'.date('Y-m-d H:i:s').'", "A", "'.$_User.'", "'.$dTabla.'", "'.$dClave.'", "'.str_replace('"','&#34;',$sqlLog).'")';
qQuery($sql, $p2);
$sqlInsert = "insert into {$dTabla} ({$dCampos}) values (".implode(",",$dimValores).")";
qQuery($sqlInsert, $p2);
}else{
if( $totalRec%$requests==1 ){
$requesLog = 'insert into '.$_ENV['eDesDictionary'].'gs_log (cdi, operacion, cd_gs_user, tabla, clave, sqlexe) values ("'.date('Y-m-d H:i:s').'", "A", "'.$_User.'", "'.$dTabla.'", "'.$dClave.'", "'.str_replace('"','&#34;',$sqlLog).'")';
$requesTable = "insert into {$dTabla} ({$dCampos}) values (".implode(',',$dimValores).')';
}else{
$requesLog	 .= ',("'.date('Y-m-d H:i:s').'", "A", "'.$_User.'", "'.$dTabla.'", "'.$dClave.'", "'.str_replace('"','&#34;',$sqlLog).'")';
$requesTable .= ',('.implode(",",$dimValores).')';
}
if( $totalRec%$requests==0 ){
qQuery($requesLog, $p2);
qQuery($requesTable, $p2);
$requesLog = "";
$requesTable = "";
}
}
}
if( $requesLog!='' ){
qQuery($requesLog, $p2);
qQuery($requesTable, $p2);
}
return $totalRec;
}
?>