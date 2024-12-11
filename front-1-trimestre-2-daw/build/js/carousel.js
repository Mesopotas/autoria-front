const linkAPI = 'https://localhost:7057/MinimalCinema/Pelicula';
const swiperWrapper = document.querySelector('.swiper-wrapper');


fetch(linkAPI)
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al cargar las películas: ' + response.statusText);
    }
    return response.json(); 
  })
  .then(data => {
    swiperWrapper.innerHTML = '';

    const peliculasLimitadas = data.slice(0, 5);  

    peliculasLimitadas.forEach(pelicula => {
      const swiperSlide = document.createElement('div');
      swiperSlide.classList.add('swiper-slide');

      swiperSlide.innerHTML = `
        <a href="pelicula.html?id=${pelicula.id_Pelicula}">
          <img src="${pelicula.caratula}" alt="Carátula de ${pelicula.nombre}" />
        </a>
      `;

      swiperWrapper.appendChild(swiperSlide);
    });

    const swiper = new Swiper('.swiper-container', {
      slidesPerView: 3,
      spaceBetween: 30,
      centeredSlides: true,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
    });
  })
  .catch(error => {
    console.error('Error en la operación de fetch:', error);
    swiperWrapper.innerHTML = '<p>Error al cargar las películas. Por favor, inténtelo más tarde.</p>';
  });
