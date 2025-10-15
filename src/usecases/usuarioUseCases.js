const { pool } = require("../config");
const Usuario = require("../entities/usuario");

const mapRowToUsuario = (row) => new Usuario(
    row.id,
    row.name,
    row.username,
    row.email,
    row.password
);

const getUsuariosDB = async () => {
    try {
        const { rows } = await pool.query("SELECT id, name, username, email, password FROM users ORDER BY name");
        return rows.map(mapRowToUsuario);
    } catch (error) {
        throw "Erro ao buscar usuários no banco de dados: " + error.message;
    }
};

const getUsuarioPorIdDB = async (id) => {
    try {
        const { rows } = await pool.query("SELECT id, name, username, email, password FROM users WHERE id=$1", [id]);
        if (rows.length === 0) throw `Nenhum usuário encontrado com o id ${id}.`;

        return mapRowToUsuario(rows[0]);
    } catch (error) {
        throw "Erro ao buscar usuário por id no banco de dados: " + error.message;
    }
};

const addUsuarioDB = async (body) => {
    try {
        const { name, username, email, password } = body;
        const result = await pool.query(`INSERT INTO users (name, username, email, password) VALUES ($1, $2, $3, $4) RETURNING id, name, username, email, password`, [name, username, email, password]);
        if (result.rowCount === 0) throw "Erro ao criar usuário.";

        return mapRowToUsuario(result.rows[0]);
    } catch (error) {
        throw "Erro ao criar usuário no banco de dados: " + error.message;
    }
};

const updateUsuarioDB = async (body) => {
    try {
        const { id, name, username, email, password } = body;
        const result = await pool.query(`UPDATE users  SET name=$2, username=$3, email=$4, password=$5 WHERE id=$1  RETURNING id, name, username, email, password`, [id, name, username, email, password]);
        if (result.rowCount === 0) throw `Nenhum registro encontrado para o id ${id}, não foi possível atualizar.`;

        return mapRowToUsuario(result.rows[0]);
    } catch (error) {
        throw "Erro ao atualizar usuário no banco de dados: " + error.message;
    }
};

const deleteUsuarioDB = async (id) => {
    try {
        // Primeiro, deleta todas as leituras do usuário (cascade)
        await pool.query(`DELETE FROM readings WHERE user_id=$1`, [id]);
        
        // Depois, deleta o usuário
        const result = await pool.query(`DELETE FROM users WHERE id=$1 RETURNING id, name, username, email, password`, [id]);
        if (result.rowCount === 0) throw `Nenhum registro encontrado para o id ${id}, não foi possível excluir.`;

        return mapRowToUsuario(result.rows[0]);
    } catch (error) {
        throw "Erro ao excluir usuário no banco de dados: " + error.message;
    }
};

module.exports = { getUsuariosDB, getUsuarioPorIdDB, addUsuarioDB, updateUsuarioDB, deleteUsuarioDB };