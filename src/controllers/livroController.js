const { getLivrosDB, getLivroPorIdDB, addLivroDB, updateLivroDB, deleteLivroDB } = require("../usecases/livroUseCases");

const getLivros = async (req, res) => {
    await getLivrosDB()
        .then(data => res.status(200).json({ status: 'success', message: 'Livros consultados com sucesso!', objeto: data }))
        .catch(err => res.status(400).json({ message: 'Erro ao consultar livros: ' + err, status: 'error' }));
};

const getLivroPorId = async (req, res) => {
    const id = parseInt(req.params.id);
    await getLivroPorIdDB(id)
        .then(data => res.status(200).json({ status: 'success', message: 'Livro consultado com sucesso!', objeto: data }))
        .catch(err => res.status(400).json({ message: 'Erro ao consultar livro por id: ' + err, status: 'error' }));
};

const addLivro = async (req, res) => {
    await addLivroDB(req.body)
        .then(data => res.status(201).json({ status: 'success', message: 'Livro criado com sucesso!', objeto: data }))
        .catch(err => res.status(400).json({ message: 'Erro ao criar livro: ' + err, status: 'error' }));
};

const updateLivro = async (req, res) => {
    await updateLivroDB(req.body)
        .then(data => res.status(200).json({ status: 'success', message: 'Livro atualizado com sucesso!', objeto: data }))
        .catch(err => res.status(400).json({ message: 'Erro ao atualizar livro: ' + err, status: 'error' }));
};

const deleteLivro = async (req, res) => {
    const id = parseInt(req.params.id);
    await deleteLivroDB(id)
        .then(data => res.status(200).json({ status: 'success', message: 'Livro deletado com sucesso!', objeto: data }))
        .catch(err => {
            const msg = String(err);
            const conflict = msg.includes('leituras cadastradas');
            res.status(conflict ? 409 : 400).json({ message: 'Erro ao excluir livro: ' + msg, status: 'error' });
        });
};

module.exports = { getLivros, getLivroPorId, addLivro, updateLivro, deleteLivro };


