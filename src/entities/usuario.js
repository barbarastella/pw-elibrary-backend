class Usuário {
    constructor(id, name, username, email, password, user_type) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.user_type = user_type;
    }
}

module.exports = Usuário;