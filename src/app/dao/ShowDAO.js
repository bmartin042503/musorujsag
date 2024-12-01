const db_server = require('../config/db');
const Show = require('../model/Show');

class ShowDAO {

    static async createShow() {

    }

    static async deleteShow() {

    }

    static async editShow() {

    }

    // actors nélkül
    static async getShows() {
        let conn;
        try {
            conn = await db_server.getConnection();
            const rows = await conn.query(`
                SELECT
                    m.id AS id,
                    m.cim AS cim,
                    m.epizod AS epizod,
                    m.ismerteto AS ismerteto,
                    k.mikor AS mikor,
                    k.meddig AS meddig
                FROM Musor m
                LEFT JOIN Kozvetit k ON k.musor_id = m.id
            `);
            return rows.map(row =>
                new Show(
                    row.id,
                    row.cim,
                    row.epizod,
                    row.ismerteto,
                    new Date(row.mikor),
                    new Date(row.meddig),
                    []
                )
            );
        } catch(error) {
            console.error(`ShowDAO Hiba (getShows): ${error}`);
            throw error;
        } finally {
            if(conn) await conn.release();
        }
    }
}

module.exports = ShowDAO;