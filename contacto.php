<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recoge y limpia los datos del formulario
    $nombre    = isset($_POST["nombre"]) ? trim($_POST["nombre"]) : "";
    $email     = isset($_POST["email"]) ? trim($_POST["email"]) : "";
    $telefono  = isset($_POST["telefono"]) ? trim($_POST["telefono"]) : "";
    $asunto    = isset($_POST["asunto"]) ? trim($_POST["asunto"]) : "";
    $mensaje   = isset($_POST["mensaje"]) ? trim($_POST["mensaje"]) : "";
    
    // Dirección de correo a la que se enviará el mensaje
    $destinatario = "info@sudamericano.edu.ec";
    // Asunto del email
    $subject = "Nuevo mensaje de contacto: $asunto";
    
    // Cuerpo del mensaje
    $contenido = "Nombre: $nombre\n";
    $contenido .= "Email: $email\n";
    $contenido .= "Teléfono: $telefono\n";
    $contenido .= "Asunto: $asunto\n";
    $contenido .= "Mensaje:\n$mensaje\n";
    
    // Configura las cabeceras:
    // Se usa una dirección del propio dominio en "From"
    // y se añade "Reply-To" con el correo del usuario para responderle
    $headers = "From: info@sudamericano.edu.ec\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    // Envía el correo
    if (mail($destinatario, $subject, $contenido, $headers)) {
         echo "success";
    } else {
         echo "error";
    }
} else {
    echo "error";
}
?>

