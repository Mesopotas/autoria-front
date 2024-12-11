document.addEventListener("DOMContentLoaded", () => {
    const tbody = document.getElementById("datos-tbody");
  
    fetch('https://localhost:7057/MinimalCinema/Opiniones')
        .then(response => response.json())
        .then(data => {
            data.forEach(opinion => {
                const row = document.createElement("tr");
  
                // Usar las propiedades correctas de cada objeto en la respuesta
                row.innerHTML = `
                    <td>${opinion.id}</td>
                    <td>${opinion.nombre}</td>
                    <td>${opinion.comentario}</td>
                    <td>${opinion.fecha}</td>
                    <td>${opinion.puntuacion}</td>
                `;
  
                tbody.appendChild(row);
            });
        })
        .catch(error => {
            console.error("Error al cargar los datos de la API", error);
        });
});
