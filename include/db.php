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
	?>