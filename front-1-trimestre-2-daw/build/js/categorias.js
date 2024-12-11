
//Parte de Destacadas

fetch('https://localhost:7057/MinimalCinema/Pelicula')
    .then(response => response.json())
    .then(peliculas => {
        const peliculasFiltradas = peliculas.filter(pelicula => pelicula.id_Categoria === 1);
        const peliculasTrending = document.querySelector('.categorias__poster-row');

        if (peliculasFiltradas.length > 0) {
            peliculasFiltradas.forEach(pelicula => {
                const peliculaElement = `
                    <a href="pelicula.html?id=${pelicula.id_Pelicula}">
                        <img src="${pelicula.caratula}" alt="${pelicula.nombre}">
                        <p class="categorias__poster-title">${pelicula.nombre}</p>
                    </a>
                `;
                peliculasTrending.innerHTML += peliculaElement;
            });
        }
    })
    .catch(error => {
        console.error('Error al obtener los datos de las películas:', error);
    });



const apiUrl = 'https://localhost:7057/MinimalCinema/Pelicula';

const botonesCategoria = document.querySelectorAll('.categorias__category-buttons button');
const contenedorPeliculas = document.querySelector('.categorias__movie-posters');

async function obtenerPeliculas() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Error al obtener películas: ${response.statusText}`);
        }
        const peliculas = await response.json();
        return peliculas;
    } catch (error) {
        console.error('Error al obtener películas:', error);
        return [];
    }
}

async function mostrarPeliculas(categoriaSeleccionada) {
    const peliculas = await obtenerPeliculas();

    const peliculasFiltradas = peliculas.filter(
        pelicula => pelicula.nombre_Categoria.toLowerCase() === categoriaSeleccionada.toLowerCase()
    );

    contenedorPeliculas.innerHTML = '';

    if (peliculasFiltradas.length > 0) {
        peliculasFiltradas.forEach(pelicula => {
            const peliculaElement = `
                <a href="pelicula.html?id=${pelicula.id_Pelicula}">
                    <img src="${pelicula.caratula}" alt="${pelicula.nombre}">
                    <p class="categorias__poster-title">${pelicula.nombre}</p>
                </a>
            `;
            contenedorPeliculas.innerHTML += peliculaElement;
        });
    } else {
        contenedorPeliculas.innerHTML = '<p>No hay películas en esta categoría.</p>';
    }
}

botonesCategoria.forEach(boton => {
    boton.addEventListener('click', () => {
        const categoriaSeleccionada = boton.textContent.trim(); 
        mostrarPeliculas(categoriaSeleccionada);
    });
});
