<?php 
function select($tabla){
	global $conectar;
	$consulta = "SELECT * FROM $tabla";
	$resultado = mysqli_query($conectar, $consulta);
	return($resultado);
}
function selectid($registro_basura){
	global $conectar;
	$consulta = "SELECT * FROM registro_basura";
	$resultado = mysqli_query($conectar, $consulta);
	return($resultado);
}
function selectWhere($tabla, $campo, $valor){
	global $conectar;
	$consulta = "SELECT * FROM $tabla WHERE $campo = $valor";
	$resultado = mysqli_query($conectar, $consulta);
	return($resultado);
}
function insertUsuario($nombre, $correo, $telefono, $nivel,$password, $status){
	global $conectar;
	$consulta = "INSERT INTO usuario VALUES('','$nombre','$correo','$telefono', $nivel,'$password',$status)";
	mysqli_query($conectar, $consulta);
}
function insertRegistro($id_usuario, $fecha_multa, $saldo){
	global $conectar;
	$consulta = "INSERT INTO reporte VALUES('','$id_usuario','$fecha_multa','$saldo')";
	mysqli_query($conectar, $consulta);
}
function updateUsuario($nombre, $correo, $telefono, $password,$nivel, $status, $id){
	global $conectar;
	$consulta = "UPDATE usuario SET nombre = '$nombre', 
	correo= '$correo', telefono = '$telefono', nivel = $nivel, 	password = '$password', status = $status 	WHERE id = $id";
	mysqli_query($conectar, $consulta);
}
function eliminar($tabla, $campo, $valor){
	global $conectar;
	$consulta = "DELETE FROM $tabla WHERE $campo = $valor";
	mysqli_query($conectar, $consulta);
}
function validarusuario($tabla, $nombre, $password){
	global $conectar;
	$consultar = "SELECT * FROM $tabla WHERE nombre = '$nombre' AND password = '$password'";
	$resultado = mysqli_query($conectar, $consultar);
	
	$filas = mysqli_num_rows($resultado);
	return($filas);
}
///NIVELES///
function updateNiveles($nombre, $id){
	global $conectar;
	$consulta = "UPDATE nivel SET nombre = '$nombre' WHERE id = $id";
	mysqli_query($conectar, $consulta);
}
function insertNivel($nombre){
	global $conectar;
	$consulta = "INSERT INTO nivel VALUES('','$nombre')";
	mysqli_query($conectar, $consulta);
}
?>






