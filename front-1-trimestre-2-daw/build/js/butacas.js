const seatContainer = document.getElementById('seatContainer');
const selectedSeatsDisplay = document.querySelector('.butacas__seats--display');
const purchaseButton = document.querySelector('.butacas__purchase--button'); // Botón de compra

let selectedSeats = []; // Lista de asientos seleccionados

const fetchAsientos = async () => {
    try {
        const response = await fetch('https://localhost:7057/MinimalCinema/Sesion/pelicula/1/salas-horarios');
        if (!response.ok) {
            throw new Error('Error al obtener los datos del endpoint');
        }

        const data = await response.json();

        // Limpiar el contenedor de asientos
        seatContainer.innerHTML = '';

        // Iterar por cada sala del resultado
        data.forEach((session) => {
            const { sala, horario } = session;

            // Crear un contenedor para la sala y los asientos
            const salaContainer = document.createElement('div');
            salaContainer.className = 'sala-container';

            // Crear un título para la sala
            const salaTitle = document.createElement('h2');
            salaTitle.textContent = `${sala.nombre} - Horario: ${horario.horario}`;
            salaContainer.appendChild(salaTitle);

            // Crear una cuadrícula para los asientos
            const grid = document.createElement('div');
            grid.className = 'butacas__seats--grid';

            sala.asientos.forEach((asiento) => {
                const seat = document.createElement('button');
                seat.className = `seat ${asiento.estaReservado ? 'ocupado' : 'libre'}`;
                seat.textContent = asiento.numero;

                // Desactivar botones ocupados
                if (asiento.estaReservado) {
                    seat.disabled = true;
                }

                // Agregar evento click para seleccionar/deseleccionar asiento
                seat.addEventListener('click', () => {
                    if (selectedSeats.includes(asiento.numero)) {
                        // Deseleccionar asiento
                        selectedSeats = selectedSeats.filter((num) => num !== asiento.numero);
                        seat.classList.remove('selected');
                    } else {
                        // Seleccionar asiento
                        selectedSeats.push(asiento.numero);
                        seat.classList.add('selected');
                    }

                    // Actualizar la visualización de asientos seleccionados
                    actualizarAsientosSeleccionados();
                });

                grid.appendChild(seat);
            });

            salaContainer.appendChild(grid);
            seatContainer.appendChild(salaContainer);
        });
    } catch (error) {
        console.error('Error al cargar los asientos:', error);
        seatContainer.innerHTML = '<p>Error al cargar los datos de los asientos.</p>';
    }
};

const actualizarAsientosSeleccionados = () => {
    // Mostrar los números de los asientos seleccionados separados por coma
    selectedSeatsDisplay.textContent = selectedSeats.length > 0 ? selectedSeats.join(', ') : 'No has seleccionado ningún asiento.';
};

// Guardar los asientos seleccionados en localStorage antes de redirigir a la página de pago
if (purchaseButton) {
    purchaseButton.addEventListener('click', () => {
        if (selectedSeats.length > 0) {
            localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
            window.location.href = 'pago.html'; // Redirigir a la página de pago
        } else {
            alert('Por favor, selecciona al menos un asiento antes de continuar.');
        }
    });
}

// Llamar a la función para cargar los asientos
fetchAsientos();



document.getElementById('boton-eliminar-js').addEventListener('click', async () => {
    const asiento = prompt('Que butaca deseas dejar libre');

    const endpoint = `https://localhost:7057/MinimalCinema/Sala/1/asientos/${asiento}`;

    const response = await fetch(endpoint, {
        method: 'PUT', // Método PUT para actualizar el estado
        headers: {
            'Content-Type': 'application/json', // Indicamos que estamos enviando JSON
        },
        body: JSON.stringify(false), 
    });


    await fetch(`https://localhost:7040/UsersAuditoria/Usuarios/${asiento}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newName),
    });
});