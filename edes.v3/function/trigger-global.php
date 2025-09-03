<?PHP
function eTriggerGlobal(){
$shm_id = shmop_open(0xff3, "c", 0644, 20);
if( !$shm_id ){
return false;
}
shmop_write($shm_id, str_pad(microtime(true), 20), 0);
return true;
}