// Selección de elementos del DOM
const selectedSeatsDisplay = document.querySelector('.butacas__seats--display');
const finalizeButton = document.querySelector('.pago__purchase--button');

// Recuperar los asientos seleccionados del localStorage
const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')) || [];

// Mostrar los asientos seleccionados
if (selectedSeats.length > 0) {
    selectedSeatsDisplay.textContent = selectedSeats.join(', ');
} else {
    selectedSeatsDisplay.textContent = 'No has seleccionado ningún asiento.';
}

// Función para finalizar la compra y enviar la solicitud PUT
const finalizarCompra = async (event) => {
    event.preventDefault(); // Prevenir la acción predeterminada del botón (redirección, etc.)

    if (selectedSeats.length === 0) {
        alert('No hay asientos seleccionados para finalizar la compra.');
        return;
    }

    const sesionId = 1; // ID de la sesión. Cambiar según corresponda.
    try {
        for (const seat of selectedSeats) {
            const endpoint = `https://localhost:7057/MinimalCinema/Sala/1/asientos/${seat}`; // Endpoint con el número del asiento

            const response = await fetch(endpoint, {
                method: 'PUT', // Método PUT para actualizar el estado
                headers: {
                    'Content-Type': 'application/json', // Indicamos que estamos enviando JSON
                },
                body: JSON.stringify(true), 
            });

            // Verificamos si la respuesta fue exitosa
            if (!response.ok) {
                console.error(`Error al actualizar el asiento ${seat}:`, response.statusText);
                alert(`Error al actualizar el asiento ${seat}.`);
                continue; // Si hubo un error con este asiento, pasamos al siguiente
            }
        }

        // Si todos los asientos fueron actualizados correctamente
        alert('Compra finalizada con éxito. ¡Gracias por tu compra!');
        localStorage.removeItem('selectedSeats'); // Limpiar los asientos seleccionados del localStorage
        window.location.href = './home.html'; // Redirigir a la página principal

    } catch (error) {
        // Manejo de errores en la solicitud
        console.error('Error al finalizar la compra:', error);
        alert('Hubo un problema al procesar tu compra. Inténtalo de nuevo más tarde.');
    }
};

// Asociar la función al evento de clic del botón "Finalizar Compra"
finalizeButton.addEventListener('click', finalizarCompra);
