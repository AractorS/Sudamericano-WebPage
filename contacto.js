document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("form-contacto").addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData(this);

        fetch("contacto.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            if (data.trim() === "success") {
                alert("¡Mensaje enviado con éxito!");
                document.getElementById("form-contacto").reset();
            } else {
                alert("Error al enviar el mensaje. Inténtalo de nuevo.");
            }
        })
        .catch(error => console.error("Error:", error));
    });
});
