const btnDesloguear = document.querySelector('#btnDesloguear');

if (btnDesloguear) {
  btnDesloguear.addEventListener('click', () => {
    window.location = '/auth/logout';
  })
}
