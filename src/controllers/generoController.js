const { getGenerosDB, getGeneroPorIdDB, addGeneroDB, updateGeneroDB, deleteGeneroDB } = require("../usecases/generoUseCases");

const getGeneros = async (req, res) => {
    await getGenerosDB()
        .then(data => res.status(200).json({ status: 'success', message: 'Gêneros consultados com sucesso!', objeto: data }))
        .catch(err => res.status(400).json({ message: 'Erro ao consultar gêneros: ' + err, status: 'error' }));
};

const getGeneroPorId = async (req, res) => {
    const id = parseInt(req.params.id);
    await getGeneroPorIdDB(id)
        .then(data => res.status(200).json({ status: 'success', message: 'Gênero consultado com sucesso!', objeto: data }))
        .catch(err => res.status(400).json({ message: 'Erro ao consultar gênero por id: ' + err, status: 'error' }));
};

const addGenero = async (req, res) => {
    await addGeneroDB(req.body)
        .then(data => res.status(201).json({ status: 'success', message: 'Gênero criado com sucesso!', objeto: data }))
        .catch(err => res.status(400).json({ message: 'Erro ao criar gênero: ' + err, status: 'error' }));
};

const updateGenero = async (req, res) => {
    await updateGeneroDB(req.body)
        .then(data => res.status(200).json({ status: 'success', message: 'Gênero atualizado com sucesso!', objeto: data }))
        .catch(err => res.status(400).json({ message: 'Erro ao atualizar gênero: ' + err, status: 'error' }));
};

const deleteGenero = async (req, res) => {
    const id = parseInt(req.params.id);
    await deleteGeneroDB(id)
        .then(data => res.status(200).json({ status: 'success', message: 'Gênero deletado com sucesso!', objeto: data }))
        .catch(err => res.status(400).json({ message: 'Erro ao excluir gênero: ' + err, status: 'error' }));
};

module.exports = { getGeneros, getGeneroPorId, addGenero, updateGenero, deleteGenero };