<?php 
	require_once("db.php");

	$id_usr = $_POST['id_usr'];
	$nombre_usr = $_POST['nombre_usr'];
	$matricula_usr = $_POST['matricula_usr'];
	$telefono_usr = $_POST['telefono_usr'];
	$email_usr = $_POST['email_usr'];




	$consulta ="INSERT INTO usuarios VALUES('','$id_usr', '$nombre_usr', '$matricula_usr', 'telefono_usr','email_usr')";
	mysqli_query($conectar, $consulta);
	header("Location: ../index.php")


 ?>