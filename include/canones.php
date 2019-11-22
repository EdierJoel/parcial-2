<?php 
	$db = "nueva"; //Está será el nombre de mi base de datos
	$usuario = "root"; //Está será el nombre de mi usuario
	$password = ""; //Está será la contraseña de mi usuario
	$server = "localhost"; //Está será la URL de mi servidor

	$conectar = mysqli_connect($server, $usuario, $password, $db);
	if(!$conectar) {
		echo "error de depuración: " . mysqli_connect_error() . PHP_EOL;
		exit;
	}
	$nombre_usr = $_POST['nombre_usr'];
	$matricula_usr = $_POST['matricula_usr'];
	$telefono_usr = $_POST['telefono_usr'];
	$email_usr = $_POST['email_usr'];
	$password_usr = $_POST['password_usr'];




	$consulta ="INSERT INTO usuarios VALUES('', '$nombre_usr', '$matricula_usr', '$telefono_usr','$email_usr', $password_usr)";
	mysqli_query($conectar, $consulta);
	//header("location:../index.php")


 ?>