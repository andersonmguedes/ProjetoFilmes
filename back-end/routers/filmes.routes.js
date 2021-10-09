const express = require('express');
const router = express.Router();

const filmes = [ 
    {
    id: Date.now(),
    nome: "O Esterminador do futuro",
    imagem: "Vaga para desenvolvedor front-end com as tecnologias React, HTML, CSS, JS",
    nota: "10",
    genero: "acao"
    },
]

router.get('/', (req, res) => {
    res.send(filmes);
})
router.get('/:id', (req,res) => {
    const idParam = req.params.id;
    const index = filmes.findIndex(filme =>  filme.id == idParam);
    const filme = filmes[index];
    res.send(filme);
})

router.put('/:id', (req,res) => {
    const filmeEdit = req.body;
    const id = req.params.id;
    let filmePreCadastrado = filmes.find((filme) =>  filme.id == id);

    filmePreCadastrado.nome = filmeEdit.nome;
    filmePreCadastrado.imagem = filmeEdit.imagem;
    filmePreCadastrado.nota = filmeEdit.nota;
    filmePreCadastrado.genero = filmeEdit.genero;
    
   res.send({
       message:`O seu filme ${filmePreCadastrado.id}foi atualizado com sucesso`,
       data: filmePreCadastrado
})
})

router.post('/add', (req, res) => {
    const filme = req.body;
    filme.id = Date.now();
    filmes.push(filme);
    res.status(201).send({
        message: 'Filme Cadastrado Com sucesso!!! (o_-)',
        data: filme
    });
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const index = filmes.findIndex((filme) => filme.id ==id);
    filmes.splice(index,1);
    res.send({
        message: 'Filme excluido com sucesso! :(',
    })
})

module.exports = router;