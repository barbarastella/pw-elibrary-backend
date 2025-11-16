const { pool } = require("../config");

const mapRowToLeituraCompleta = (row) => ({
    id: row.id,
    status: row.status,
    user: {
        id: row.u_id,
        name: row.u_name,
        username: row.u_username,
        email: row.u_email
    },
    book: {
        id: row.b_id,
        title: row.b_title,
        author_id: row.b_author_id,
        genre_id: row.b_genre_id,
        publication_year: row.b_publication_year
    },
    review: row.review,
    rating: row.rating,
});

const getLeiturasDB = async () => {
    try {
        const { rows } = await pool.query(
            `SELECT r.id,
                r.status,
                r.review,
                r.rating,
                u.id   AS u_id,
                u.name AS u_name,
                u.username AS u_username,
                u.email AS u_email,
                b.id   AS b_id,
                b.title AS b_title,
                b.author_id AS b_author_id,
                b.genre_id AS b_genre_id,
                b.publication_year AS b_publication_year
             FROM readings r
             JOIN users u  ON u.id = r.user_id
             JOIN books b  ON b.id = r.book_id
             ORDER BY u.name, b.title`
        );
        return rows.map(mapRowToLeituraCompleta);
    } catch (error) {
        throw "Erro ao buscar leituras no banco de dados: " + error.message;
    }
};

const getLeituraPorIdDB = async (id) => {
    try {
        const { rows } = await pool.query(
            `SELECT
                r.id,
                r.status,
                r.review,
                r.rating,
                u.id   AS u_id,
                u.name AS u_name,
                u.username AS u_username,
                u.email AS u_email,
                b.id   AS b_id,
                b.title AS b_title,
                b.author_id AS b_author_id,
                b.genre_id AS b_genre_id,
                b.publication_year AS b_publication_year
             FROM readings r
             JOIN users u  ON u.id = r.user_id
             JOIN books b  ON b.id = r.book_id
             WHERE r.id = $1`,
            [id]
        );
        if (rows.length === 0) throw `Nenhum leitura encontrado com o id ${id}.`;
        return mapRowToLeituraCompleta(rows[0]);
    } catch (error) {
        throw "Erro ao buscar leitura por id no banco de dados: " + error.message;
    }
};

const addLeituraDB = async (body) => {
    try {
        const { user_id, book_id, status, review, rating } = body;
        const inserted = await pool.query(
            `INSERT INTO readings (user_id, book_id, status, review, rating)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING id`,
            [user_id, book_id, status, review, rating]
        );
        if (inserted.rowCount === 0) throw "Erro ao criar leitura.";
        const novoId = inserted.rows[0].id;
        return await getLeituraPorIdDB(novoId);
    } catch (error) {
        throw "Erro ao criar leitura no banco de dados: " + error.message;
    }
};

const updateLeituraDB = async (body) => {
    try {
        const { id, user_id, book_id, status, review, rating } = body;
        const updated = await pool.query(
            `UPDATE readings
             SET user_id=$2, book_id=$3, status=$4, review=$5, rating=$6
             WHERE id=$1`,
            [id, user_id, book_id, status, review, rating]
        );

        if (updated.rowCount === 0) throw `Nenhum registro encontrado para o id ${id}, não foi possível atualizar.`;
        return await getLeituraPorIdDB(id);
    } catch (error) {
        throw "Erro ao atualizar leitura no banco de dados: " + error.message;
    }
};

const deleteLeituraDB = async (id) => {
    try {
        const leituraCompleta = await getLeituraPorIdDB(id);
        const result = await pool.query(`DELETE FROM readings WHERE id=$1`, [id]);

        if (result.rowCount === 0) throw `Nenhum registro encontrado para o id ${id}, não foi possível excluir.`;
        return leituraCompleta;
    } catch (error) {
        throw "Erro ao excluir leitura no banco de dados: " + error.message;
    }
};

module.exports = { getLeiturasDB, getLeituraPorIdDB, addLeituraDB, updateLeituraDB, deleteLeituraDB };