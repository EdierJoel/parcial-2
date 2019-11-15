<!DOCTYPE html>
<html>
<head>
	<title>mail</title>
</head>
<body>
	<form method="POST">
 <input type="text" name="name">
 <input type="text" name="email">
 <input type="text" name="asunto">
 <input type="text" name="msg">
 <input type="submit" name="enviar">

 <textarea placeholder="mensaje" name="msg"></textarea>
</form>
<?php 
include ("correo.php"); ?>
</body>
</html>