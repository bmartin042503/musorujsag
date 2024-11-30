const db_server = require('../config/db');
const Admin = require('../model/Admin');
const Show = require('../model/Show');
const Actor = require('../model/Actor');

class ChannelDAO {
    static async createChannel(name, description) {
        let conn;
        try {
            conn = await db_server.getConnection();
            const result = await conn.query(
                'INSERT INTO Csatorna (nev, leiras) VALUES (?, ?)',
                [name, description]
            );
            return result.affectedRows > 0;
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

    static async channelExists(name) {
        let conn;
        try {
            conn = await db_server.getConnection();
            const rows = await conn.query(
                'SELECT 1 FROM Csatorna WHERE nev = ? LIMIT 1',
                [name]
            );
            return rows.length > 0;
        } catch(error) {
            console.error(`ChannelDAO Hiba (channelExists): ${error}`);
            throw error;
        } finally {
            if(conn) await conn.release();
        }
    }

    // az ultra mega lekérdezés 💀
    static async getChannelsAllData() {
        let conn;
        try {
            conn = await db_server.getConnection();
            const rows = await conn.query(`
                SELECT
                    c.id AS channel_id,
                    c.nev AS channel_name,
                    c.leiras AS channel_description,
                    k.megnevezes AS category_name,
                    m.id AS show_id,
                    m.cim AS show_title,
                    m.epizod AS show_episode,
                    m.ismerteto AS show_description,
                    ko.mikor AS air_begins_time,
                    ko.meddig AS air_ends_time,
                    s.id AS actor_id,
                    s.nev AS actor_name,
                    s.foglalkozas AS actor_profession,
                    s.nemzetiseg AS actor_nationality,
                    s.szuletesi_datum AS actor_birthdate
                FROM Csatorna c
                LEFT JOIN CsatornaKategoria ck ON c.id = ck.csatorna_id
                LEFT JOIN Kategoria k ON ck.kategoria_id = k.id
                LEFT JOIN Kozvetit ko ON c.id = ko.csatorna_id
                LEFT JOIN Musor m ON ko.musor_id = m.id
                LEFT JOIN Szerepel sz ON m.id = sz.musor_id
                LEFT JOIN Szereplo s ON sz.szereplo_id = s.id
            `);
            const channelsMap = new Map();
            rows.forEach(row => {
                if (!channelsMap.has(row.channel_id)) {
                    channelsMap.set(row.channel_id, {
                        id: row.channel_id,
                        name: row.channel_name,
                        description: row.channel_description,
                        categories: [row.category_name],
                        shows: []
                    });
                }
                const channel = channelsMap.get(row.channel_id);
                if (!channel.categories.includes(row.category_name)) {
                    channel.categories.push(row.category_name);
                }
                let show = channel.shows.find(show => show.id === row.show_id);
                if (!show) {
                    show = new Show(
                        row.show_id,
                        row.show_title,
                        row.show_episode,
                        row.show_description,
                        row.air_begins_time,
                        row.air_ends_time
                    );
                    channel.shows.push(show);
                }
                if (row.actor_id) {
                    const actor = new Actor(
                        row.actor_id,
                        row.actor_name,
                        row.actor_profession,
                        row.actor_nationality,
                        row.actor_birthdate
                    );
                    if (!show.actors) {
                        show.actors = [];
                    }
                    show.actors.push(actor);
                }
            });
            return Array.from(channelsMap.values());
        } catch(error) {
            console.error(`ChannelDAO Hiba (getChannelsAllData): ${error}`);
            throw error;
        } finally {
            if(conn) await conn.release();
        }
    }
}

module.exports = ChannelDAO;