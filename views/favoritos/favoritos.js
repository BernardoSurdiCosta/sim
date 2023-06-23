
async function renderFavoritos() {
    try {
        const id_usuario = localStorage.getItem('userID');

    if (!id_usuario) {
    console.error('ID do usuário não encontrado no LocalStorage');
    return;
    } 
  
      let req = await fetch(`http://localhost:3000/api/favorito/${id_usuario}`);
      let data = await req.json();
      const mainPage = document.querySelector('main');
      console.log(data)
  
      data.favoritos.forEach((item, index) => {
        let cardSizeClass = 'small';
        let itemProduto = `
          <div class="card ${cardSizeClass}"">
            <img src="/assets/${item.nome}.jpg" class="card-img-top" alt="${item.nome}">
            <div class="card-body">
              <h5 class="card-title" id="${index}">${item.nome}</h5>  
              <div class="botoes">
                <button class="like-button" onclick="Like(${index})" id="like-button-${index}"><img src="/assets/like.svg" alt=""><span id="like-count-${index}">0</span></button>
                <button class="dislike-button" onclick="Dislike(${index})" id="dislike-button-${index}"><img src="/assets/deslike.svg" alt=""><span id="dislike-count-${index}">0</span></button>
                <button onclick="adicionarFavorito(${index})"><svg id="favorite-button-${index}" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="red">
                <path d="M0 0h24v24H0V0z" fill="none"/>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg></button>
              </div>
            </div>
          </div>
        `;
  
        mainPage.innerHTML += itemProduto;
      });
    } catch (error) {
      console.log("Ocorreu um erro ao renderizar os produtos:", error);
    }
  }

renderFavoritos()