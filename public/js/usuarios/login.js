document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();

  // Tomamos los valores del formulario
  const correo = document.getElementById('correo').value;
  const contrasena = document.getElementById('contrasena').value;

  // Creamos el objeto JSON correctamente
  const data = {
    correo: correo,
    contrasena: contrasena
  };
  console.log(data)
  // Hacemos la petición a la API
  fetch('http://localhost:8080/usuarios/login', {  // Cambia al endpoint correcto
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) // Aquí convertimos el objeto en un JSON válido
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }
    return response.text();  // Si solo devuelve el token como texto
  })
  .then(token => {
    if (token) {
      localStorage.setItem('authToken', token);
      showMessage('Inicio de sesión exitoso', 'success');
      setTimeout(() => {
        window.location.href = '/index';  // Redirigir a la página de inicio
      }, 2000);

    } else {
      showMessage('Error al recibir el token. Por favor, intente de nuevo.', 'error');
    }
  })
  .catch(error => {
    console.error('Error al iniciar sesión:', error);
    showMessage('Hubo un problema al iniciar sesión. Verifique su conexión o sus credenciales.', 'error');
  });
});

// Función para mostrar mensajes de error o éxito
function showMessage(message, type) {
  const messageBox = document.getElementById('messageBox');
  messageBox.textContent = message;
  if (type === 'success') {
    messageBox.className = 'alert alert-success';
  } else if (type === 'error') {
    messageBox.className = 'alert alert-error';
  }
  messageBox.classList.remove('hidden');
}
