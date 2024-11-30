const db_server = require('../config/db');
const Admin = require('../model/Admin');

class AdminDAO {
    static async createAdmin(name, email, password) {
        let conn;
        try {
            conn = await db_server.getConnection();
            const result = await conn.query(
                'INSERT INTO Admin (nev, email, jelszo) VALUES (?, ?, ?)',
                [name, email, password]
            );
            return result.insertId;
        } catch(error) {
            console.error(`AdminDAO Hiba (createAdmin): ${error}`);
            throw error;
        } finally {
            if(conn) await conn.release();
        }
    }

    static async getAdminByName(name) {
        let conn;
        try {
            conn = await db_server.getConnection();
            const rows = await conn.query(
                'SELECT * FROM Admin WHERE nev = ?',
                [name]
            );
            if(rows.length > 0) {
                return this.adminFromRow(rows[0]);
            }
            return null;
        } catch(error) {
            console.error(`AdminDAO Hiba (getAdminByName): ${error}`);
            throw error;
        } finally {
            if(conn) await conn.release();
        }
    }

    static async getAdminById(id) {
        let conn;
        try {
            conn = await db_server.getConnection();
            const result = await conn.query(
                'SELECT * FROM Admin WHERE id = ?',
                [id]
            );
            return this.adminFromRow(result.rows[0]);
        } catch(error) {
            console.error(`AdminDAO Hiba (getAdminByName): ${error}`);
            throw error;
        } finally {
            if(conn) await conn.release();
        }
    }

    static async emailExists(email) {
        let conn;
        try {
            conn = await db_server.getConnection();
            const rows = await conn.query(
                'SELECT 1 FROM Admin WHERE email = ? LIMIT 1',
                [email]
            );
            return rows.length > 0;
        } catch(error) {
            console.error(`AdminDAO Hiba (emailExists): ${error}`);
            throw error;
        } finally {
            if(conn) await conn.release();
        }
    }

    static adminFromRow(row) {
        if(!row) return null;
        return new Admin(
            row.id,
            row.nev,
            row.jelszo,
            row.email,
            row.utolso_belepes
        );
    }

}

module.exports = AdminDAO;