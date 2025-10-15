const { pool } = require("../config");
const Genero = require("../entities/genero");

const mapRowToGenero = (row) => new Genero(
    row.id,
    row.name
);

const getGenerosDB = async () => {
    try {
        const { rows } = await pool.query("SELECT id, name FROM genres ORDER BY name");
        return rows.map(mapRowToGenero);
    } catch (error) {
        throw "Erro ao buscar gêneros no banco de dados: " + error.message;
    }
};

const getGeneroPorIdDB = async (id) => {
    try {
        const { rows } = await pool.query("SELECT id, name FROM genres WHERE id=$1", [id]);
        if (rows.length === 0) throw `Nenhum gênero encontrado com o id ${id}.`;

        return mapRowToGenero(rows[0]);
    } catch (error) {
        throw "Erro ao buscar gênero por id no banco de dados: " + error.message;
    }
};

const addGeneroDB = async (body) => {
    try {
        const { name } = body;
        const result = await pool.query(`INSERT INTO genres (name) VALUES ($1) RETURNING id, name`, [name]);
        if (result.rowCount === 0) throw "Erro ao criar gênero.";

        return mapRowToGenero(result.rows[0]);
    } catch (error) {
        throw "Erro ao criar gênero no banco de dados: " + error.message;
    }
};

const updateGeneroDB = async (body) => {
    try {
        const { id, name } = body;
        const result = await pool.query(`UPDATE genres  SET name=$2 WHERE id=$1  RETURNING id, name`, [id, name]);
        if (result.rowCount === 0) throw `Nenhum registro encontrado para o id ${id}, não foi possível atualizar.`;

        return mapRowToGenero(result.rows[0]);
    } catch (error) {
        throw "Erro ao atualizar gênero no banco de dados: " + error.message;
    }
};

const deleteGeneroDB = async (id) => {
    try {
        const result = await pool.query(`DELETE FROM genres WHERE id=$1 RETURNING id, name`, [id]);
        if (result.rowCount === 0) throw `Nenhum registro encontrado para o id ${id}, não foi possível excluir.`;

        return mapRowToGenero(result.rows[0]);
    } catch (error) {

        if (error && error.code === '23503') throw "Não é possível excluir um gênero com livros cadastrados.";
        throw "Erro ao excluir gênero no banco de dados: " + error.message;
    }
};

module.exports = { getGenerosDB, getGeneroPorIdDB, addGeneroDB, updateGeneroDB, deleteGeneroDB };