const { getAutoresDB, getAutorPorIdDB, addAutorDB, updateAutorDB, deleteAutorDB } = require("../usecases/autorUseCases");

const getAutores = async (req, res) => {
    await getAutoresDB()
        .then(data => res.status(200).json({ status: 'success', message: 'Autores consultados com sucesso!', objeto: data }))
        .catch(err => res.status(400).json({ message: 'Erro ao consultar autores: ' + err, status: 'error' }));
};

const getAutorPorId = async (req, res) => {
    const id = parseInt(req.params.id);
    await getAutorPorIdDB(id)
        .then(data => res.status(200).json({ status: 'success', message: 'Autor consultado com sucesso!', objeto: data }))
        .catch(err => res.status(400).json({ message: 'Erro ao consultar autor por id: ' + err, status: 'error' }));
};

const addAutor = async (req, res) => {
    await addAutorDB(req.body)
        .then(data => res.status(201).json({ status: 'success', message: 'Autor criado com sucesso!', objeto: data }))
        .catch(err => res.status(400).json({ message: 'Erro ao criar autor: ' + err, status: 'error' }));
};

const updateAutor = async (req, res) => {
    await updateAutorDB(req.body)
        .then(data => res.status(200).json({ status: 'success', message: 'Autor atualizado com sucesso!', objeto: data }))
        .catch(err => res.status(400).json({ message: 'Erro ao atualizar autor: ' + err, status: 'error' }));
};

const deleteAutor = async (req, res) => {
    const id = parseInt(req.params.id);
    await deleteAutorDB(id)
        .then(data => res.status(200).json({ status: 'success', message: 'Autor deletado com sucesso!', objeto: data }))
        .catch(err => res.status(400).json({ message: 'Erro ao excluir autor: ' + err, status: 'error' }));
};

module.exports = { getAutores, getAutorPorId, addAutor, updateAutor, deleteAutor };