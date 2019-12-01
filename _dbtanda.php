<?php include __DIR__.'/vendor/autoload.php';
use Medoo\Medoo;

// Initialize
try {
    $dbt = new Medoo([
    'database_type' => 'mysql',
    'database_name' => 'damda',
    'server' => 'smoothoperators.com.mx',
    'username' => 'remote',
    'password' => 'D7AC3D58A7318',
    ]);
}catch (Exception $e){
    $dbt = null;
    echo 'ERROR: ',  $e->getMessage();
}


?>