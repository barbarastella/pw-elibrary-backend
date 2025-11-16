const { pool } = require("../config");
const Usuario = require("../entities/usuario");

const mapRowToUsuario = (row) => new Usuario(
    row.id,
    row.name,
    row.username,
    row.email,
    row.password,
    row.user_type
);

const autenticaUsuarioDB = async (body) => {
    try {
        const { username, senha, user_type } = body
        const results = await pool.query(`SELECT * FROM users WHERE username = $1 AND password = $2`, [username, senha]);

        if (results.rowCount == 0) throw "Usuário ou senha inválidos";

        const user = results.rows[0];
        return new Usuario(user.id, user.name, user.username, user.email, null, user.user_type);
    } catch (err) {
        throw "Erro ao autenticar o usuário: " + err;
    }
}

const getUsuariosDB = async () => {
    try {
        const { rows } = await pool.query("SELECT id, name, username, email, user_type FROM users ORDER BY name");
        return rows.map(mapRowToUsuario);
    } catch (error) {
        throw "Erro ao buscar usuários no banco de dados: " + error.message;
    }
};

const getUsuarioPorIdDB = async (id) => {
    try {
        const { rows } = await pool.query("SELECT id, name, username, email, user_type FROM users WHERE id=$1", [id]);
        if (rows.length === 0) throw `Nenhum usuário encontrado com o id ${id}.`;

        return mapRowToUsuario(rows[0]);
    } catch (error) {
        throw "Erro ao buscar usuário por id no banco de dados: " + error.message;
    }
};

const addUsuarioDB = async (body) => {
    try {
        const { name, username, email, password } = body;
        const user_type = 'regular';
        const result = await pool.query(`INSERT INTO users (name, username, email, password, user_type) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, username, email, password, user_type`, [name, username, email, password, user_type]);
        if (result.rowCount === 0) throw "Erro ao criar usuário.";

        return mapRowToUsuario(result.rows[0]);
    } catch (error) {
        throw "Erro ao criar usuário no banco de dados: " + error.message;
    }
};

const updateUsuarioDB = async (body) => {
    try {
        const { id, name, username, email, password } = body;
        const result = await pool.query(`UPDATE users  SET name=$2, username=$3, email=$4, password=$5 WHERE id=$1  RETURNING id, name, username, email, password, user_type`, [id, name, username, email, password]);
        if (result.rowCount === 0) throw `Nenhum registro encontrado para o id ${id}, não foi possível atualizar.`;

        return mapRowToUsuario(result.rows[0]);
    } catch (error) {
        throw "Erro ao atualizar usuário no banco de dados: " + error.message;
    }
};

const deleteUsuarioDB = async (id) => {
    try {
        await pool.query(`DELETE FROM readings WHERE user_id=$1`, [id]);

        const result = await pool.query(`DELETE FROM users WHERE id=$1 RETURNING id, name, username, email, password, user_type`, [id]);
        if (result.rowCount === 0) throw `Nenhum registro encontrado para o id ${id}, não foi possível excluir.`;

        return mapRowToUsuario(result.rows[0]);
    } catch (error) {
        throw "Erro ao excluir usuário no banco de dados: " + error.message;
    }
};

module.exports = { autenticaUsuarioDB, getUsuariosDB, getUsuarioPorIdDB, addUsuarioDB, updateUsuarioDB, deleteUsuarioDB };