document.getElementById('registroForm').addEventListener('submit', async function (event) {
    event.preventDefault();
  
    const formData = new FormData();
  
    // Obtener los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const ubicacion = document.getElementById('ubicacion').value;
    const telefono = document.getElementById('telefono').value;
    const contrasena = document.getElementById('contrasena').value;
    const fotoPerfil = document.getElementById('fotoPerfil').files[0];
    const rol = document.getElementById('rol').value; // Valor del rol seleccionado (1 = Usuario, 2 = Admin)
  
    // Agregar los campos al FormData
    formData.append('usuario', new Blob([JSON.stringify({
      nombre,
      correo,
      ubicacion,
      numeroTelefono: telefono,
      contrasena,
      idRol: rol // El valor del rol que se seleccionó
    })], { type: 'application/json' }));
  
    if (fotoPerfil) {
      formData.append('fotoPerfil', fotoPerfil);
    }
  
    try {
      const response = await fetch('http://localhost:8080/usuarios/registro', {
        method: 'POST',
        body: formData
      });
  
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }
  
      const token = await response.text();  // El API devuelve solo el token como texto
      console.log('Token recibido:', token);
  
      // Guardar el token en localStorage directamente
      localStorage.setItem('authToken', token);
  
      // Mostrar mensaje de éxito
      showMessage('Registro exitoso. Redirigiendo a la página de inicio...', 'success');
  
      // Redirigir a la página de inicio después de un breve retraso
      setTimeout(() => {
        window.location.href = '/index';
      }, 2000);
  
    } catch (error) {
      console.error('Error al registrar:', error);
      showMessage('Hubo un problema al registrarse. Inténtalo de nuevo.', 'error');
    }
  });
  
  // Función para mostrar mensajes
  function showMessage(message, type) {
    const messageBox = document.getElementById('messageBox');
    messageBox.textContent = message;
    messageBox.className = type === 'success' ? 'success' : 'error';
    messageBox.style.display = 'block';
  }
  