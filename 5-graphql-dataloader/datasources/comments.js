const { DataBase } = require('./database');
const { join } = require('path');

class CommentRepository {
    constructor() {
        const path = join(__dirname, '..', 'databases/comments.db');
        this.commentsDB = new DataBase(path);
    }

    createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS comments (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                launch_id INTEGER,
                user_name TEXT,
                message TEXT
        )`
        return this.commentsDB.run(sql)
    }

    create(launch_id, {user_name, message}) {
        return this.commentsDB.run(
            `INSERT INTO comments (user_name, message, launch_id) VALUES (?, ?, ?)`, [user_name, message, launch_id]);
    }

    getById(id) {
        return this.commentsDB.get(`SELECT * FROM comments WHERE id = ?`,[id]);
    }

    getAllByLaunchId(launch_id) {
        return this.commentsDB.all(`SELECT * FROM comments WHERE launch_id = ?`,[launch_id]);
    }

    getAllByLaunchIds(launch_ids) {
        return this.commentsDB.all(`SELECT * FROM comments WHERE launch_id IN (${launch_ids.map(id => '?').join(',')})`, launch_ids);
    }
}


module.exports = {
    CommentRepository
};