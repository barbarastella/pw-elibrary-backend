const { pool } = require("../config");
const Autor = require("../entities/autor");

const mapRowToAutor = (row) => new Autor(
    row.id,
    row.name
);

const getAutoresDB = async () => {
    try {
        const { rows } = await pool.query("SELECT id, name FROM authors ORDER BY name");
        return rows.map(mapRowToAutor);
    } catch (error) {
        throw "Erro ao buscar autores no banco de dados: " + error.message;
    }
};

const getAutorPorIdDB = async (id) => {
    try {
        const { rows } = await pool.query("SELECT id, name FROM authors WHERE id=$1", [id]);
        if (rows.length === 0) throw `Nenhum autor encontrado com o id ${id}.`;

        return mapRowToAutor(rows[0]);
    } catch (error) {
        throw "Erro ao buscar autor por id no banco de dados: " + error.message;
    }
};

const addAutorDB = async (body) => {
    try {
        const { name } = body;
        const result = await pool.query(`INSERT INTO authors (name) VALUES ($1) RETURNING id, name`, [name]);
        if (result.rowCount === 0) throw "Erro ao criar autor.";

        return mapRowToAutor(result.rows[0]);
    } catch (error) {
        throw "Erro ao criar autor no banco de dados: " + error.message;
    }
};

const updateAutorDB = async (body) => {
    try {
        const { id, name } = body;
        const result = await pool.query(`UPDATE authors  SET name=$2 WHERE id=$1  RETURNING id, name`, [id, name]);
        if (result.rowCount === 0) throw `Nenhum registro encontrado para o id ${id}, não foi possível atualizar.`;

        return mapRowToAutor(result.rows[0]);
    } catch (error) {
        throw "Erro ao atualizar autor no banco de dados: " + error.message;
    }
};

const deleteAutorDB = async (id) => {
    try {
        const result = await pool.query(`DELETE FROM authors WHERE id=$1 RETURNING id, name`, [id]);
        if (result.rowCount === 0) throw `Nenhum registro encontrado para o id ${id}, não foi possível excluir.`;

        return mapRowToAutor(result.rows[0]);
    } catch (error) {
        if (error && error.code === '23503') throw "Não é possível excluir um autor com livros cadastrados.";
        throw "Erro ao excluir autor no banco de dados: " + error.message;
    }
};

module.exports = { getAutoresDB, getAutorPorIdDB, addAutorDB, updateAutorDB, deleteAutorDB };