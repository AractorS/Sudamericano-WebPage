<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = htmlspecialchars($_POST["nombre"]);
    $email = htmlspecialchars($_POST["email"]);
    $telefono = htmlspecialchars($_POST["telefono"]);
    $asunto = htmlspecialchars($_POST["asunto"]);
    $mensaje = htmlspecialchars($_POST["mensaje"]);

    // Dirección donde se enviará el correo
    $destino = "nosabemosquehacemosaqui@gmail.com"; // Cambia esto por tu correo real
    $asuntoCorreo = "Nuevo mensaje de contacto - $asunto";
    
    $contenido = "Nombre: $nombre\n";
    $contenido .= "Email: $email\n";
    $contenido .= "Teléfono: $telefono\n";
    $contenido .= "Asunto: $asunto\n";
    $contenido .= "Mensaje:\n$mensaje\n";

    // Encabezados del correo
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Enviar correo
    if (mail($destino, $asuntoCorreo, $contenido, $headers)) {
        echo "success";
    } else {
        echo "error";
    }
} else {
    echo "Acceso no autorizado.";
}
?>
