document.addEventListener('DOMContentLoaded', async () => {
  const ofertasContainer = document.querySelector('.ofertas-container');
  const paginationControls = document.querySelector('.pagination-controls');
  let currentPage = 0; // Página inicial
  const pageSize = 9; // Número de ofertas por página

  // Función para cargar una página de ofertas
  async function cargarOfertas(page) {
    try {
      const response = await fetch(`http://localhost:8080/ofertas?page=${page}&size=${pageSize}`);
      const paginatedData = await response.json();
      const ofertas = paginatedData.content; // Asumiendo que 'content' tiene las ofertas

      console.log('Ofertas obtenidas:', ofertas); // Verificar si las ofertas llegan correctamente
      ofertasContainer.innerHTML = ''; // Limpiar las ofertas anteriores

      if (ofertas && ofertas.length > 0) {
        ofertas.forEach((oferta, index) => {
          const ofertaElement = document.createElement('div');
          ofertaElement.classList.add('oferta');

          // Establecer un contenedor para el carrusel de imágenes
          const imagenesContainer = document.createElement('div');
          imagenesContainer.classList.add('imagenes-container');
          let imagenIndex = 0; // Índice para la imagen actual
          let intervalId = null; // Guardará el ID del intervalo para detenerlo

          const imagen = document.createElement('img');
          imagen.style.height = '200px'; // Aseguramos un tamaño fijo para las imágenes
          imagen.style.width = '100%';   // Que todas las imágenes ocupen el mismo ancho

          // Si la oferta tiene imágenes, mostrar la primera imagen
          if (oferta.imagenes && oferta.imagenes.length > 0) {
            imagen.src = `data:image/jpeg;base64,${oferta.imagenes[0]}`;
            imagen.alt = 'Imagen de la oferta';
            imagenesContainer.appendChild(imagen);

            // Cambiar la imagen automáticamente cuando el mouse pasa por la oferta
            ofertaElement.addEventListener('mouseenter', () => {
              intervalId = setInterval(() => {
                imagenIndex = (imagenIndex + 1) % oferta.imagenes.length; // Cambiar a la siguiente imagen
                imagen.src = `data:image/jpeg;base64,${oferta.imagenes[imagenIndex]}`;
              }, 1500); // Cambiar cada 1.5 segundos
            });

            // Detener el cambio cuando el mouse sale de la oferta
            ofertaElement.addEventListener('mouseleave', () => {
              clearInterval(intervalId);
              imagenIndex = 0; // Restablecer a la primera imagen
              imagen.src = `data:image/jpeg;base64,${oferta.imagenes[0]}`;
            });
          } else {
            // Imagen por defecto
            imagen.src = '/images/default.png';
            imagen.alt = 'Imagen de la oferta';
            imagenesContainer.appendChild(imagen);
          }

          // Crear el HTML de la oferta
          ofertaElement.innerHTML = `
          <h3>${oferta.titulo}</h3>
          <p>${oferta.descripcion}</p>
          <a href="/ofertas/detalles?id=${oferta.idOferta}">Ver más detalles</a>
        `;        

          ofertaElement.insertBefore(imagenesContainer, ofertaElement.firstChild); // Insertar las imágenes primero

          ofertasContainer.appendChild(ofertaElement);
        });

        // Manejar la paginación (mostrar botones si hay más páginas)
        manejarPaginacion(paginatedData);
      } else {
        console.log('No hay ofertas disponibles');
        ofertasContainer.innerHTML = '<p>No hay ofertas disponibles en este momento.</p>';
      }
    } catch (error) {
      console.error('Error al cargar las ofertas:', error);
      ofertasContainer.innerHTML = '<p>Error al cargar las ofertas. Inténtalo de nuevo más tarde.</p>';
    }
  }

  // Función para manejar los controles de paginación
  function manejarPaginacion(paginatedData) {
    paginationControls.innerHTML = ''; // Limpiar controles previos
    const totalPages = paginatedData.totalPages;

    if (currentPage > 0) {
      const prevButton = document.createElement('button');
      prevButton.textContent = 'Anterior';
      prevButton.addEventListener('click', () => {
        currentPage--;
        cargarOfertas(currentPage); // Cargar página anterior
      });
      paginationControls.appendChild(prevButton);
    }

    if (currentPage < totalPages - 1) {
      const nextButton = document.createElement('button');
      nextButton.textContent = 'Siguiente';
      nextButton.addEventListener('click', () => {
        currentPage++;
        cargarOfertas(currentPage); // Cargar página siguiente
      });
      paginationControls.appendChild(nextButton);
    }
  }

  // Cargar la primera página al cargar la página
  cargarOfertas(currentPage);
});
