<?php include __DIR__.'/vendor/autoload.php';
use Medoo\Medoo;

// Initialize
try {
    $dbcupones = new Medoo([
    'database_type' => 'mysql',
    'database_name' => 'Cupones',
    'server' => 'smoothoperators.com.mx',
    'username' => 'remote',
    'password' => 'D7AC3D58A7318',
    ]);
}catch (Exception $e){
    $dbcupones = null;
    echo 'ERROR: ',  $e->getMessage();
}


?>