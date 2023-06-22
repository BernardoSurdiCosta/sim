var modal = document.getElementById('loginModal');
var btnOpenModal = document.getElementById('openModal');
var btnCloseModal = document.getElementById('cancelar');

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

document.querySelector("#confirmar").addEventListener("click", (e) => {
  e.preventDefault()

  login()
})

async function login() {
  const email = document.getElementById("email").value
  const senha = document.getElementById("senha").value
  
  try {
    let req = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,  
        senha,
      }),
    })

    if (req.ok) {
      modal.style.display = 'none';
      alert("Logado com sucesso!")
      
    } else {
      alert("Não foi possível fazer o login. Verifique suas credenciais.")
    }
  } catch (err) {
    console.log(err)
  }
}



async function renderUser() {
  try {
    let req = await fetch("http://localhost:3000/api/produto");
    let data = await req.json();

    let containerProdutos = document.getElementById("container-produtos");
    containerProdutos.innerHTML = ""; 

    data.produtos.forEach((item, index) => {
      let cardSizeClass = '';

      if (index < 2) {
          cardSizeClass = 'large';
      } else if (index < 6) {
          cardSizeClass = 'small';
      } else {
          cardSizeClass = 'medium';
      }

      let itemProduto = document.createElement("div");
      itemProduto.setAttribute("data-key", index);
      itemProduto.innerHTML = `
        <div class="card ${cardSizeClass}" style="width: 18rem;">
          <img src="/assets/${item.nome}.jpg" class="card-img-top" alt="${item.nome}">
          <div class="card-body">
            <h5 class="card-title">${item.nome}</h5>  
            <div class="botoes">
              <button><img src="/assets/like.svg" alt="">0</button>
              <button><img src="/assets/deslike.svg" alt="">0</button>
              <button><img src="/assets/favorite.svg" alt=""></button>
            </div>
          </div>
        </div>
      `;
      
      containerProdutos.appendChild(itemProduto);
    });
  } catch (error) {
    console.log("Ocorreu um erro ao renderizar os produtos:", error);
  }
}

renderUser();



