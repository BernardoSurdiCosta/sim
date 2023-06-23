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

function adicionarFavorito(index) {
  const id_produto = index
  const id_usuario = localStorage.getItem('userID');
  console.log(id_produto, id_usuario);
   fetch("http://localhost:3000/api/favoritos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_produto,
        id_usuario,
      }),
    })
    .then(response => {
      if (response.ok) {
        console.log('Favorito adicionado com sucesso!');
        const botaoFavorito = document.querySelector(`#favorite-button-${index}`);
        botaoFavorito.classList.add('red');
      } else {
        console.error('Erro ao adicionar favorito:', response.status);
      }
    })
    .catch(error => {
      console.error('Erro ao adicionar favorito:', error);
    });
}


async function getLikes() {
  try {
    // Fazer uma chamada assíncrona para obter os likes
    const response = await fetch("http://localhost:3000/api/produtolikes");
    const data = await response.json();
    console.log(data)
    // Processar os likes obtidos
    const likes = data.likes;
    
    return likes;

  } catch (error) {
    console.error('Ocorreu um erro:', error);
    throw error;
  }
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
              <button class="like-button" onclick="Like(${index})" id="like-button-${index}"><img src="/assets/like.svg" alt=""><span id="like-count-${index}">0</span></button>
              <button class="dislike-button" onclick="Dislike(${index})" id="dislike-button-${index}"><img src="/assets/deslike.svg" alt=""><span id="dislike-count-${index}">0</span></button>
              <button onclick="adicionarFavorito(${index})" ><svg id="favorite-button-${index}" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="white">
              <path d="M0 0h24v24H0V0z" fill="none"/>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg></button>
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
getLikes();
