var modal = document.getElementById('loginModal');
var btnOpenModal = document.getElementById('openModal');
var btnCloseModal = document.getElementById('cancelar');
const log = document.getElementById("logout")

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
  e.preventDefault();

  login();
});

async function login() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

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
    });

    if (req.ok) {
      modal.style.display = 'none';
      alert("Logado com sucesso!");
      const responseJson = await req.json();
        btnOpenModal.style.display = 'none'
        log.style.display = 'block'
        log.onclick = logout;
    
      console.log(responseJson);
      localStorage.setItem("userID", responseJson.usuario.id_usuario);
      console.log("ID: " + responseJson.usuario.id_usuario);

    } else {
      alert("Não foi possível fazer o login. Verifique suas credenciais.");
    }
  } catch (err) {
    console.log(err);
  }
}

function logout() {
  localStorage.clear();
  log.style.display = 'none'
  btnOpenModal.style.display = 'block'
}

function verify() {
  const userID = localStorage.getItem("userID");

  if (userID) {
    window.location = "/favoritos/favoritos.html";
    return true;
  } else {
    alert("Acesse a opção de menu Login");
    return false;
  }
}

async function Like(index) {
  const id_usuario = localStorage.getItem("userID");
  const likeKey = `like-${index}`;
  const id_produto = index;
  
  if (id_usuario && !localStorage.getItem(likeKey)) {
    try {
      const response = await fetch(`http://localhost:3000/api/likes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_usuario,
          id_produto,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const likeCount = data.likeCount;
        const likeButton = document.querySelector(`#like-button-${index}`);
        likeButton.innerHTML = `<img src="/assets/like.svg" alt="">${likeCount}`;
        likeButton.disabled = true;
        localStorage.setItem(likeKey, "true");
      } else {
        alert("Não foi possível curtir o item.");
      }
    } catch (error) {
      console.log("Ocorreu um erro ao curtir o item:", error);
    }
  }
}

async function Dislike(index) {
  const id_usuario = localStorage.getItem("userID");
  const dislikeKey = `dislike-${index}`;
  const id_produto = index;

  if (id_usuario && !localStorage.getItem(dislikeKey)) {
    try {
      const response = await fetch(`http://localhost:3000/api/dislikes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_usuario,
          id_produto,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const dislikeCount = data.dislikeCount;
        const dislikeButton = document.querySelector(`#dislike-button-${index}`);
        dislikeButton.innerHTML = `<img src="/assets/dislike.svg" alt="">${dislikeCount}`;
        dislikeButton.disabled = true;
        localStorage.setItem(dislikeKey, "true");
      } else {
        alert("Não foi possível descurtir o item.");
      }
    } catch (error) {
      console.log("Ocorreu um erro ao descurtir o item:", error);
    }
  }
}

async function adicionarAosFavoritos(index) {
  const item = document.getElementById(index).innerHTML;
  console.log(item);

  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  if (favoritos.includes(item)) {
    console.log('Item já está nos favoritos.');
    return;
  } else {
    favoritos.push(item);
    console.log('Item adicionado aos favoritos:', item);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }
  console.log(favoritos);
}

async function renderUser() {
  try {
    let req = await fetch("http://localhost:3000/api/produto");
    let data = await req.json();
    const mainPage = document.querySelector('main');
    console.log(data)

    data.produtos.forEach((item, index) => {
      let cardSizeClass = '';

      if (index < 2) {
        cardSizeClass = 'large';
      } else if (index < 6) {
        cardSizeClass = 'small';
      } else {
        cardSizeClass = 'medium';
      }

      let itemProduto = `
        <div class="card ${cardSizeClass}"">
          <img src="/assets/${item.nome}.jpg" class="card-img-top" alt="${item.nome}">
          <div class="card-body">
            <h5 class="card-title" id="${index}">${item.nome}</h5>  
            <div class="botoes">
              <button class="like-button" onclick="Like(${index})" id="like-button-${index}"><img src="/assets/like.svg" alt="">0</button>
              <button class="dislike-button" onclick="Dislike(${index})" id="dislike-button-${index}"><img src="/assets/deslike.svg" alt="">0</button>
              <button onclick="adicionarAosFavoritos(${index})"><img src="/assets/favorite.svg" alt=""></button>
            </div>
          </div>
        </div>
      `;

      mainPage.innerHTML += itemProduto;

      const likeKey = `like-${index}`;
      const dislikeKey = `dislike-${index}`;

      if (localStorage.getItem(likeKey)) {
        const likeButton = document.querySelector(`#like-button-${index}`);
        likeButton.disabled = true;
      }

      if (localStorage.getItem(dislikeKey)) {
        const dislikeButton = document.querySelector(`#dislike-button-${index}`);
        dislikeButton.disabled = true;
      }
    });
  } catch (error) {
    console.log("Ocorreu um erro ao renderizar os produtos:", error);
  }
}

renderUser();
localStorage.clear();