
const peliculaApiUrl = 'https://localhost:7057/MinimalCinema/Pelicula';

const caratulaElement = document.querySelector('.pelicula__movie-poster img');
const movieTitle = document.querySelector('.pelicula__movie-title');
const directorElement = document.querySelector('.director');
const actoresElement = document.querySelector('.actores');
const sinopsisElement = document.querySelector('.sinopsis');
const duracionElement = document.querySelector('.duracion');
const categoriaElement = document.querySelector('.categoria');

const cargarDetallesPelicula = async (idPelicula) => {
  try {
    if (!idPelicula) {
      throw new Error('No se ha proporcionado un ID de película válido.');
    }

    const response = await fetch(`${peliculaApiUrl}/${idPelicula}`);
    
    if (!response.ok) {
      throw new Error(`Error al cargar los detalles de la película. Código de error: ${response.status}`);
    }

    const pelicula = await response.json();

    if (!pelicula || !pelicula.nombre || !pelicula.caratula) {
      throw new Error('Datos incompletos de la película.');
    }

    movieTitle.textContent = pelicula.nombre;
    directorElement.textContent = pelicula.directores;
    actoresElement.textContent = pelicula.actores;
    sinopsisElement.textContent = pelicula.descripcion;
    duracionElement.textContent = `${pelicula.duracion}h`;
    categoriaElement.textContent = pelicula.nombre_Categoria;

    if (pelicula.caratula) {
      caratulaElement.src = pelicula.caratula;
      caratulaElement.alt = `Carátula de ${pelicula.nombre}`;
    }

  } catch (error) {
    console.error('Error al cargar los detalles de la película:', error);
    movieTitle.textContent = 'Error al cargar los detalles de la película';
    directorElement.textContent = '';
    actoresElement.textContent = '';
    sinopsisElement.textContent = 'No se pudo cargar la sinopsis.';
    duracionElement.textContent = '';
    categoriaElement.textContent = '';
    caratulaElement.src = '';
  }
};

const params = new URLSearchParams(window.location.search);
const idPelicula = params.get('id'); 

console.log('ID de la película:', idPelicula);

if (idPelicula) {
  cargarDetallesPelicula(idPelicula);
} else {
  console.error('No se ha proporcionado un ID de película válido.');
  movieTitle.textContent = 'ID de película no válido';
  directorElement.textContent = '';
  actoresElement.textContent = '';
  sinopsisElement.textContent = 'No se pudo cargar la sinopsis.';
  duracionElement.textContent = '';
  categoriaElement.textContent = '';
  caratulaElement.src = ''; 
}
