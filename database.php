<?php include __DIR__.'/vendor/autoload.php';
 use Medoo\Medoo;
  
 // Initialize
 try {
     $db = new Medoo([
     'database_type' => 'mysql',
     'database_name' => 'proyecto-desarrollo',
     'server' => 'smoothoperators.com.mx',
     'username' => 'remote',
     'password' => 'D7AC3D58A7318',
     ]);
 }catch (Exception $e){
     $db = null;
     echo 'ERROR: ',  $e->getMessage();
 }
 
 
 ?> 