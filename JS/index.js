var modal = document.getElementById('loginModal');
var btnOpenModal = document.getElementById('openModal');
var btnCloseModal = document.getElementById('cancelar');
var loginForm = document.getElementById('confirmar');

btnOpenModal.onclick = function() {
  modal.style.display = 'block';
};

btnCloseModal.onclick = function() {
  modal.style.display = 'none';
};

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};


loginForm.onsubmit = function(event) {
  event.preventDefault();
 
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  console.log('Email:', email);
  console.log('Senha:', password);

  document.getElementById('email').value = '';
  document.getElementById('password').value = '';

  modal.style.display = 'none';
};
