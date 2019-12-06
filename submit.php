<?php
 $destino="ejcab@proyectparadox.com";
 $nombre=$_POST["nombre"];
 $email=$_POST["email"];
 $telefono=$_POST["telefono"];
 $comentario=$_POST["comentario"];
 $contenido="Nombre: ".$nombre."\nCorreo: ".$email."\nTelefono: ".$telefono."\nComentario: ".$comentario;
 mail($destino,"Contacto", $contenido);
 header("Location: index.php");

?>