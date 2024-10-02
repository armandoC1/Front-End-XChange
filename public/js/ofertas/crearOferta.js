// crearOferta.js

window.onload = function() {
    const categoriaSelect = document.getElementById("categoria");
    const usuarioSelect = document.getElementById("usuario");

    // Llenar la lista de categorías
    fetch('http://localhost:8080/categorias/all')
        .then(response => response.json())
        .then(categorias => {
            categorias.forEach(categoria => {
                const option = document.createElement("option");
                option.value = categoria.idCategoria;
                option.textContent = categoria.nombre;
                categoriaSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error al obtener las categorías:', error);
        });

    // Llenar la lista de usuarios
    fetch('http://localhost:8080/usuarios/all')
        .then(response => response.json())
        .then(usuarios => {
            usuarios.forEach(usuario => {
                const option = document.createElement("option");
                option.value = usuario.idUsuario;
                option.textContent = usuario.nombre;
                usuarioSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error al obtener los usuarios:', error);
        });

    // Manejar el envío del formulario
    const form = document.getElementById("crearOfertaForm");
    form.onsubmit = function(event) {
        event.preventDefault();

        const formData = new FormData(form);

        fetch('http://localhost:8080/ofertas/create', {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (response.ok) {
                alert('Oferta creada con éxito');
                form.reset();
            } else {
                alert('Error al crear la oferta');
            }
        })
        .catch(error => {
            console.error('Error al crear la oferta:', error);
        });
    };
};
