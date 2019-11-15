<?php 

 if (isset($_POST['enviar'])) {
 	if(!empty($_POST['nombre']) && !empty($_POST['email']) && !empty($_POST['telefono']) && !empty($_POST['comentario'])){
 		$nombre = $_POST ['nombre'];
 		$email = $_POST ['email'];
 		$telefono = $_POST ['telefono'];
 		$comentario = $_POST ['comentario'];
 		$header	= "From: noreply@example.com" . "\r\n";
 		$header = "reply-to: noreply@example.com". "\r\n";
 		$header = "X-Mailer: PHP/". phpversion();
 		$mail = @mail($email,$nombre,$comentario);
 		if ($mai) {
 			echo "<h4> mail enviado exitosamente!!!</h4>";
 			# code...
 		}

 	}
 }


 ?>