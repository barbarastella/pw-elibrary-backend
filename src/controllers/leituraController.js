const { getLeiturasDB, getLeituraPorIdDB, addLeituraDB, updateLeituraDB, deleteLeituraDB } = require("../usecases/leituraUseCases");

const getLeituras = async (req, res) => {
    await getLeiturasDB()
        .then(data => res.status(200).json({ status: 'success', message: 'Leituras consultadas com sucesso!', objeto: data }))
        .catch(err => res.status(400).json({ message: 'Erro ao consultar leituras: ' + err, status: 'error' }));
};

const getLeituraPorId = async (req, res) => {
    const id = parseInt(req.params.id);
    await getLeituraPorIdDB(id)
        .then(data => res.status(200).json({ status: 'success', message: 'Leitura consultada com sucesso!', objeto: data }))
        .catch(err => res.status(400).json({ message: 'Erro ao consultar leitura por id: ' + err, status: 'error' }));
};

const addLeitura = async (req, res) => {
    await addLeituraDB(req.body)
        .then(data => res.status(201).json({ status: 'success', message: 'Leitura criada com sucesso!', objeto: data }))
        .catch(err => res.status(400).json({ message: 'Erro ao criar leitura: ' + err, status: 'error' }));
};

const updateLeitura = async (req, res) => {
    await updateLeituraDB(req.body)
        .then(data => res.status(200).json({ status: 'success', message: 'Leitura atualizada com sucesso!', objeto: data }))
        .catch(err => res.status(400).json({ message: 'Erro ao atualizar leitura: ' + err, status: 'error' }));
};

const deleteLeitura = async (req, res) => {
    const id = parseInt(req.params.id);
    await deleteLeituraDB(id)
        .then(data => res.status(200).json({ status: 'success', message: 'Leitura deletada com sucesso!', objeto: data }))
        .catch(err => res.status(400).json({ message: 'Erro ao excluir leitura: ' + err, status: 'error' }));
};

module.exports = { getLeituras, getLeituraPorId, addLeitura, updateLeitura, deleteLeitura };


