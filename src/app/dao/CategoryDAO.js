const db_server = require('../config/db');
const Category = require('../model/Category');

class CategoryDAO {
    static async createCategory(name) {
        let conn;
        try {
            conn = await db_server.getConnection();
            const result = await conn.query(
                'INSERT INTO Kategoria (megnevezes) VALUES (?)',
                [name]
            );
            return result.affectedRows > 0;
        } catch(error) {
            console.error(`CategoryDAO Hiba (createCategory): ${error}`);
            throw error;
        } finally {
            if(conn) await conn.release();
        }
    }

    static async getCategories() {
        let conn;
        try {
            conn = await db_server.getConnection();
            const rows = await conn.query(
                'SELECT * FROM Kategoria'
            );
            return rows.map(row => new Category(
                row.id,
                row.megnevezes
            ));
        } catch(error) {
            console.error(`CategoryDAO Hiba (getCategories): ${error}`);
            throw error;
        } finally {
            if(conn) await conn.release();
        }
    }

    static async deleteCategoryById(categoryId) {
        let conn;
        try {
            conn = await db_server.getConnection();
            const rows = await conn.query(
                'DELETE FROM Kategoria WHERE id = ?',
                [categoryId]
            );
            return rows.affectedRows > 0;
        } catch(error) {
            console.error(`CategoryDAO Hiba (deleteCategoryById): ${error}`);
            throw error;
        } finally {
            if(conn) await conn.release();
        }
    }
}

module.exports = CategoryDAO;