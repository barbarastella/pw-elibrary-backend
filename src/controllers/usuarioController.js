const { getUsuariosDB, getUsuarioPorIdDB, addUsuarioDB, updateUsuarioDB, deleteUsuarioDB } = require("../usecases/usuarioUseCases");

const getUsuarios = async (req, res) => {
    await getUsuariosDB()
        .then(data => res.status(200).json({ status: 'success', message: 'Usuários consultados com sucesso!', objeto: data }))
        .catch(err => res.status(400).json({ message: 'Erro ao consultar usuários: ' + err, status: 'error' }));
};

const getUsuarioPorId = async (req, res) => {
    const id = parseInt(req.params.id);
    await getUsuarioPorIdDB(id)
        .then(data => res.status(200).json({ status: 'success', message: 'Usuário consultado com sucesso!', objeto: data }))
        .catch(err => res.status(400).json({ message: 'Erro ao consultar usuário por id: ' + err, status: 'error' }));
};

const addUsuario = async (req, res) => {
    await addUsuarioDB(req.body)
        .then(data => res.status(201).json({ status: 'success', message: 'Usuário criado com sucesso!', objeto: data }))
        .catch(err => res.status(400).json({ message: 'Erro ao criar usuário: ' + err, status: 'error' }));
};

const updateUsuario = async (req, res) => {
    await updateUsuarioDB(req.body)
        .then(data => res.status(200).json({ status: 'success', message: 'Usuário atualizado com sucesso!', objeto: data }))
        .catch(err => res.status(400).json({ message: 'Erro ao atualizar usuário: ' + err, status: 'error' }));
};

const deleteUsuario = async (req, res) => {
    const id = parseInt(req.params.id);
    await deleteUsuarioDB(id)
        .then(data => res.status(200).json({ status: 'success', message: 'Usuário deletado com sucesso!', objeto: data }))
        .catch(err => res.status(400).json({ message: 'Erro ao excluir usuário: ' + err, status: 'error' }));
};

module.exports = { getUsuarios, getUsuarioPorId, addUsuario, updateUsuario, deleteUsuario };


