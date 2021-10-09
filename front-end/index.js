const urlApi = 'http://localhost:3000/filmes';
const lista = document.getElementById('lista');
let edicao = false;
let idEdicao = 0;

const getFilmes = async () => {
    const response = await fetch(urlApi);
    const data = await response.json();  
    
    data.map((filme) =>{
    //     lista.insertAdjacentHTML('beforeend', `
    //     <div class="col-6">
    //     <div class="card mt-2">
    //         <div class="card-header">
    //             ${filme.nome}
    //         </div>
    //         <div class="card-body">
    //             <p class="card-text">Url Imagem: ${filme.imagem}</p>
    //             <p class="card-text">nota: ${filme.nota}</p>
    //             <p class="card-text">genero: ${filme.genero}</p>
    //             <button type="button" class="btn btn-primary" onclick="putFilme(${filme.id})">Editar</button>
    //             <button type="button" class="btn btn-danger" onclick="deleteFilme(${filme.id})">Excluir</button>
    //         </div>
    //         <div class= "row mt-2">
    //     </div>
    //<div class="card" style="width: 18rem;">
    //<img src="..." class="card-img-top" alt="..."></img>
    // </div>
    //   `)
            lista.insertAdjacentHTML('beforeend', `
            <div class="col-4">
            <div class="card mt-2">
            <div class="card" style="width: 100%;">
  <div stile= "height: 80px">          
  <img src="${filme.imagem}" class="card-img-top">
  </div>
  <div class="card-body">
    <h5 class="card-title">${filme.nome}</h5>
    </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">genero: ${filme.genero}</li>
    <li class="list-group-item">nota: ${filme.nota}</li>
    <li class="list-group-item">ano: ${filme.ano}</li>
    </ul>
  <div class="card-body">
    <button type="button" class="btn btn-primary" onclick="putFilme(${filme.id})">Editar</button>
    <button type="button" class="btn btn-danger" onclick="deleteFilme(${filme.id})">Excluir</button>
  </div>
</div>
            `)
    })
}
getFilmes();

const submitForm = async (evento) => {
  evento.preventDefault();

  let nome = document.getElementById('nome');
  let imagem = document.getElementById('imagem');
  let nota = document.getElementById('nota');
  let genero = document.getElementById('genero');
  let ano = document.getElementById('ano');

  const filme = {
    nome: nome.value,
    imagem: imagem.value,
    nota: parseInt(nota.value),
    genero: genero.value,
    ano: parseInt(ano.value)
 }

 if (!edicao) {
    const request = new Request(`${urlApi}/add`, {
        method: 'POST',
        body: JSON.stringify(filme),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })

    const response = await fetch(request);
    const result = await response.json();
    
    if (result) {
        getFilmes();
    }
 } else {
    const request = new Request(`${urlApi}/${idEdicao}`, {
        method: 'PUT',
        body: JSON.stringify(filme),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    const response = await fetch(request);
    const result = await response.json();
    if(result) {
        edicao = false;
        getFilmes();
    }
 }
 nome.value = '';
 imagem.value = '';
 nota.value = '';
 genero.value = '';
 ano.value ='';

 lista.innerHTML = '';
}

const getFilmeById = async (id) => {
    const response = await fetch(`${urlApi}/ ${id}`);
    return filme = response.json();
}
const putFilme = async (id) => {
  edicao = true;
  idEdicao = id;
    
  const filme = await getFilmeById(id);

  let nomeEl = document.getElementById('nome');
  let imagemEl = document.getElementById('imagem');
  let notaEl = document.getElementById('nota');
  let generoEl = document.getElementById('genero'); 
  let anoEl = document.getElementById('ano');

  nomeEl.value = filme.nome;
  imagemEl.value = filme.imagem;
  notaEl.value = filme.nota;
  generoEl.value = filme.genero;
  anoEl.value =filme.ano
}


const deleteFilme = async (id) => {
    const request = new Request(`${urlApi}/${id}`, {
        method: 'DELETE',
    }) 
    const response = await fetch(request);
    const data = await response.json();
    
    lista.innerHTML = '';
    getFilmes();
}