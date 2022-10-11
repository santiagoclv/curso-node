const { DataBase } = require('./database');
const { performanceLogger } = require('../utils/performanceLogger');
const { join } = require('path');

class RocketRepository {
    constructor() {
        const path = join(__dirname, '..', 'databases/rockets.db');
        this.rocketsDB = new DataBase(path);
    }

    createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS rockets (
                id TEXT PRIMARY KEY,
                rocket TEXT
        )`
        return this.rocketsDB.run(sql)
    }

    create(rocket) {
        const rocketStringified = JSON.stringify(rocket);
        return this.rocketsDB.run(
            `INSERT INTO rockets (id, rocket) VALUES (?, ?)`, [rocket.id, rocketStringified])
    }

    async getById(id) {
        const result = await performanceLogger(() => this.rocketsDB.get(`SELECT * FROM rockets WHERE id = ?`,[id]),
        `SELECT * FROM rockets WHERE id = ${id}`);
        return JSON.parse(result.rocket);
    }

    async getAll() {
        const results = await performanceLogger(() => this.rocketsDB.all(`SELECT * FROM rockets`), 
        `SELECT * FROM rockets`);
        return results.map(dataset => JSON.parse(dataset.rocket));
    }

    async getByIds(ids) {
        const results = await performanceLogger(() =>
            this.rocketsDB.all(`SELECT * FROM rockets WHERE id IN (${ids.map(() => '?').join(',')})`, ids),
            `SELECT * FROM rockets WHERE id IN (${ids.map(id => id).join(',')})`
        );
        return results.map(dataset => JSON.parse(dataset.rocket));
    }
}


module.exports = {
    RocketRepository
};