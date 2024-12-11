const apiUrl = 'https://localhost:7057/MinimalCinema/Pelicula';
const peliculasTrending = document.querySelector('.peliculas-trending');
const categoriaId = 6; 

fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al cargar las películas: ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    peliculasTrending.innerHTML = '';

    const peliculasFiltradas = data.filter(pelicula => pelicula.id_Categoria === categoriaId);

    if (peliculasFiltradas.length > 0) {
      peliculasFiltradas.forEach(pelicula => {
        const peliculaElement = `
          <div class="peliculas-display" data-id="${pelicula.id_Pelicula}">
            <img src="${pelicula.caratula}" class="peliculas-display"/>
            <br>
            <p class="center">${pelicula.nombre}</p>
          </div>
        `;
        peliculasTrending.innerHTML += peliculaElement; 
      });

      document.querySelectorAll('.peliculas-display').forEach(peliculaDiv => {
        peliculaDiv.addEventListener('click', (event) => {
          const idPelicula = event.currentTarget.getAttribute('data-id');
          console.log('ID de la película clickeada:', idPelicula);
          window.location.href = `pelicula.html?id=${idPelicula}`;
        });
      });
    } else {
      peliculasTrending.innerHTML = `<p>No se encontraron películas para la categoría ID ${categoriaId}.</p>`;
    }
  })
  .catch(error => {
    console.error('Error en la operación de fetch:', error);
    peliculasTrending.innerHTML = '<p>Error al cargar las películas. Por favor, inténtelo más tarde.</p>';
  });
