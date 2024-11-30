const db_server = require('../config/db');

class ChannelDAO {
    static async createChannel(name, description) {
        let conn;
        try {
            conn = await db_server.getConnection();
            const result = await conn.query(
                'INSERT INTO Csatorna (nev, leiras) VALUES (?, ?)',
                [name, description]
            );
            return result.insertId;
        } catch(error) {
            console.error(`ChannelDAO Hiba (createChannel): ${error}`);
            throw error;
        } finally {
            if(conn) await conn.release();
        }
    }

    static async deleteChannelById(channelId) {
        let conn;
        try {
            conn = await db_server.getConnection();
            const result = await conn.query(
                'DELETE FROM Csatorna WHERE id = ?',
                [channelId]
            );
            return result.affectedRows;
        } catch(error) {
            console.error(`ChannelDAO Hiba (deleteChannelById): ${error}`);
            throw error;
        } finally {
            if(conn) await conn.release();
        }
    }

    static async updateChannelById(channelId, name, description, category) {
        let conn;
        try {
            conn = await db_server.getConnection();
            const result = await conn.query(
                'UPDATE Csatorna SET nev = ?, leiras = ?, kategoria = ? WHERE id = ?',
                [name, description, category, channelId]
            );
            return result.affectedRows;
        } catch(error) {
            console.error(`ChannelDAO Hiba (updateChannelById): ${error}`);
            throw error;
        } finally {
            if(conn) await conn.release();
        }
    }

    static async getChannels() {
        // Összekapcsolt lekérdezés ?
    }
}

module.exports = ChannelDAO;