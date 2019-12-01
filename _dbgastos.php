<?php include __DIR__.'/vendor/autoload.php';
use Medoo\Medoo;

// Initialize
try {
    $dbms = new Medoo([
    'database_type' => 'mysql',
    'database_name' => 'money-safe',
    'server' => 'smoothoperators.com.mx',
    'username' => 'remote',
    'password' => 'D7AC3D58A7318',
    ]);
}catch (Exception $e){
    $dbms = null;
    echo 'ERROR: ',  $e->getMessage();
}


?>