class Livro {
    constructor(id, title, author_id, genre_id, publication_year) {
        this.id = id;
        this.title = title;
        this.author_id = author_id;
        this.genre_id = genre_id;
        this.publication_year = publication_year;
    }
}

module.exports = Livro;