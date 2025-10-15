const { pool } = require("../config");

const mapRowToLivro = (row) => ({
    id: row.id,
    title: row.title,
    publication_year: row.publication_year,
    author: {
        id: row.author_id,
        name: row.author_name,
    },
    genre: {
        id: row.genre_id,
        name: row.genre_name,
    },
});

const getLivrosDB = async () => {
    try {
        const { rows } = await pool.query(
            `SELECT 
                b.id,
                b.title,
                b.publication_year,
                b.author_id,
                a.name AS author_name,
                b.genre_id,
                g.name AS genre_name
             FROM books b
             JOIN authors a ON a.id = b.author_id
             JOIN genres g ON g.id = b.genre_id
             ORDER BY b.title`
        );
        return rows.map(mapRowToLivro);
    } catch (error) {
        throw "Erro ao buscar livros no banco de dados: " + error.message;
    }
};

const getLivroPorIdDB = async (id) => {
    try {
        const { rows } = await pool.query(
            `SELECT 
                b.id,
                b.title,
                b.publication_year,
                b.author_id,
                a.name AS author_name,
                b.genre_id,
                g.name AS genre_name
             FROM books b
             JOIN authors a ON a.id = b.author_id
             JOIN genres g ON g.id = b.genre_id
             WHERE b.id = $1`,
            [id]
        );
        if (rows.length === 0) throw `Nenhum livro encontrado com o id ${id}.`;
        return mapRowToLivro(rows[0]);
    } catch (error) {
        throw "Erro ao buscar livro por id no banco de dados: " + error.message;
    }
};

const addLivroDB = async (body) => {
    try {
        const { title, author_id, genre_id, publication_year } = body;
        const { rows, rowCount } = await pool.query(
            `WITH ins AS (
                INSERT INTO books (title, author_id, genre_id, publication_year)
                VALUES ($1, $2, $3, $4)
                RETURNING id, title, publication_year, author_id, genre_id
            )
            SELECT 
                i.id,
                i.title,
                i.publication_year,
                i.author_id,
                a.name AS author_name,
                i.genre_id,
                g.name AS genre_name
            FROM ins i
            JOIN authors a ON a.id = i.author_id
            JOIN genres g ON g.id = i.genre_id`,
            [title, author_id, genre_id, publication_year]
        );
        if (rowCount === 0) throw "Erro ao criar livro.";
        return mapRowToLivro(rows[0]);
    } catch (error) {
        throw "Erro ao criar livro no banco de dados: " + error.message;
    }
};

const updateLivroDB = async (body) => {
    try {
        const { id, title, author_id, genre_id, publication_year } = body;
        const { rows, rowCount } = await pool.query(
            `UPDATE books b
             SET title = $2,
                 author_id = $3,
                 genre_id = $4,
                 publication_year = $5
             FROM authors a, genres g
             WHERE b.id = $1
               AND a.id = b.author_id
               AND g.id = b.genre_id
             RETURNING 
               b.id,
               b.title,
               b.publication_year,
               b.author_id,
               a.name AS author_name,
               b.genre_id,
               g.name AS genre_name`,
            [id, title, author_id, genre_id, publication_year]
        );
        if (rowCount === 0) throw `Nenhum registro encontrado para o id ${id}, não foi possível atualizar.`;
        return mapRowToLivro(rows[0]);
    } catch (error) {
        throw "Erro ao atualizar livro no banco de dados: " + error.message;
    }
};

const deleteLivroDB = async (id) => {
    try {
        const { rows, rowCount } = await pool.query(
            `DELETE FROM books b
             USING authors a, genres g
             WHERE b.id = $1
               AND a.id = b.author_id
               AND g.id = b.genre_id
             RETURNING 
               b.id,
               b.title,
               b.publication_year,
               b.author_id,
               a.name AS author_name,
               b.genre_id,
               g.name AS genre_name`,
            [id]
        );
        if (rowCount === 0) throw `Nenhum registro encontrado para o id ${id}, não foi possível excluir.`;
        return mapRowToLivro(rows[0]);
    } catch (error) {
        if (error && error.code === '23503') throw "Não é possível excluir um livro com leituras cadastradas.";
        throw "Erro ao excluir livro no banco de dados: " + (error && error.message ? error.message : String(error));
    }
};

module.exports = { getLivrosDB, getLivroPorIdDB, addLivroDB, updateLivroDB, deleteLivroDB };


