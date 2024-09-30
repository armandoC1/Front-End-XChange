// Seleccionamos los elementos del DOM
const menuIcon = document.getElementById('menu-icon');
const navLinks = document.querySelector('.nav-links');

// Agregamos un evento de clic para mostrar/ocultar el menú en dispositivos móviles
menuIcon.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});
