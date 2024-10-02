window.onload = function() {
  const titulo = document.getElementById("titulo");
  const descripcion = document.getElementById("descripcion");
  const condicion = document.getElementById("condicion");
  const estado = document.getElementById("estado");
  const fechaCreacion = document.getElementById("fechaCreacion");
  const ubicacion = document.getElementById("ubicacion");
  const categoria = document.getElementById("categoria");
  const usuario = document.getElementById("usuario");

  const imagenOferta = document.getElementById("imagenOferta");
  const contadorImagenes = document.getElementById("contadorImagenes");
  const botonAnterior = document.getElementById("anterior");
  const botonSiguiente = document.getElementById("siguiente");

  let indiceImagenActual = 0;

  // Obtener el id de la oferta desde la URL
  const urlParams = new URLSearchParams(window.location.search);
  const idOferta = urlParams.get('id');
  
  // Fetch oferta y validaciones de la respuesta
  fetch(`http://localhost:8080/ofertas/findById/${idOferta}`)
    .then(response => {
      // Validar que el content-type sea JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("La respuesta no es JSON");
      }
      return response.json();
    })
    .then(oferta => {
      // Rellenar datos de la oferta si la respuesta es válida
      titulo.textContent = oferta.titulo || "Título no disponible";
      descripcion.textContent = oferta.descripcion || "Descripción no disponible";
      condicion.textContent = oferta.condicion || "Condición no disponible";
      estado.textContent = oferta.estado || "Estado no disponible";
      fechaCreacion.textContent = new Date(oferta.fechaCreacion).toLocaleString() || "Fecha no disponible";
      ubicacion.textContent = oferta.ubicacion || "Ubicación no disponible";

      // Validar imágenes
      if (Array.isArray(oferta.imagenes) && oferta.imagenes.length > 0) {
        const imagenes = oferta.imagenes.map(imagen => `data:image/png;base64,${imagen}`);
        imagenOferta.src = imagenes[indiceImagenActual];
        contadorImagenes.textContent = `${indiceImagenActual + 1}/${imagenes.length}`;

        // Eventos para cambiar las imágenes
        botonAnterior.onclick = function() {
          if (indiceImagenActual > 0) {
            indiceImagenActual--;
            imagenOferta.src = imagenes[indiceImagenActual];
            contadorImagenes.textContent = `${indiceImagenActual + 1}/${imagenes.length}`;
          }
        };

        botonSiguiente.onclick = function() {
          if (indiceImagenActual < imagenes.length - 1) {
            indiceImagenActual++;
            imagenOferta.src = imagenes[indiceImagenActual];
            contadorImagenes.textContent = `${indiceImagenActual + 1}/${imagenes.length}`;
          }
        };
      } else {
        imagenOferta.src = "https://via.placeholder.com/150"; // Mostrar un placeholder si no hay imágenes
      }

      // Buscar el nombre de la categoría usando el idCategoria
      if (oferta.idCategoria) {
        obtenerNombreCategoria(oferta.idCategoria);
      } else {
        categoria.textContent = "Categoría no disponible";
      }

      // Buscar el nombre del usuario usando el idUsuario
      if (oferta.idUsuario) {
        obtenerNombreUsuario(oferta.idUsuario);
      } else {
        usuario.textContent = "Usuario no disponible";
      }
    })
    .catch(error => {
      console.error("Error al obtener la oferta:", error);
      titulo.textContent = "Error al cargar la oferta";
      // Otras acciones que quieras realizar en caso de error
    });

  // Función para obtener el nombre de la categoría
  function obtenerNombreCategoria(idCategoria) {
    fetch(`http://localhost:8080/categorias/find/${idCategoria}`)
      .then(response => response.json())
      .then(categoriaData => {
        categoria.textContent = categoriaData.nombre || "Categoría no disponible";
      })
      .catch(error => {
        console.error("Error al obtener la categoría:", error);
        categoria.textContent = "Categoría no disponible";
      });
  }

  // Función para obtener el nombre del usuario
  function obtenerNombreUsuario(idUsuario) {
    fetch(`http://localhost:8080/usuarios/find/${idUsuario}`)
        .then(response => response.text()) // Obtenemos el texto sin intentar parsear el JSON aún
        .then(text => {
            console.log("Respuesta sin procesar:", text);  // Imprimir el texto para ver cómo es la respuesta
            try {
                // Intentar parsear el texto a JSON
                const usuarioData = JSON.parse(text);
                console.log("JSON procesado:", usuarioData);

                // Verificar si el JSON contiene el campo 'nombre'
                if (usuarioData && usuarioData.nombre) {
                    document.getElementById('usuario').textContent = usuarioData.nombre;
                } else {
                    document.getElementById('usuario').textContent = 'Usuario no disponible';
                }
            } catch (error) {
                // Si el JSON no es válido, manejar el error
                console.error("Error al parsear el JSON:", error);
                document.getElementById('usuario').textContent = 'Error al obtener el usuario';
            }
        })
        .catch(error => {
            // Si hay algún error en la petición, manejarlo
            console.error("Error al obtener el usuario:", error);
            document.getElementById('usuario').textContent = 'Usuario no disponible';
        });
}


};
