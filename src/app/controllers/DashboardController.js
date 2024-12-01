const session = require('express-session');
const ChannelDAO = require('../dao/ChannelDAO');
const CategoryDAO = require('../dao/CategoryDAO');
const ShowDAO = require('../dao/ShowDAO');

const getDashboard = async(req, res) => {
    try {
        const channelsAllData = await ChannelDAO.getChannelsAllData();
        const shows = await ShowDAO.getShows(); // actors nélkül
        res.render('dashboard', { channels: channelsAllData, shows: shows, actors: [], categories: [] });
    } catch(error) {
        res.status(500).json({ message: `Hiba történt a kezelőpanel megjelenítése során: ${error}` });
    }
}

const createChannel = async(req, res) => {
    const { name, description, category } = req.body;
    try {
        const channelExists = await ChannelDAO.channelExists(name);
        if(channelExists) {
            return res.status(400).json({ message: 'Csatorna már létezik ilyen névvel!' });
        } else {
            const isCreated = await ChannelDAO.createChannel(name, description);
            // TODO: CsatornaKategóriában új rekord
            if(isCreated) {
                return res.status(201).json({ message: 'Új csatorna létrehozva!' });
            } else {
                return res.status(500).json({ message: 'Hiba történt! Nem sikerült a csatorna létrehozása!'});
            }
        }
    } catch(error) {
        res.status(500).json({ message: `Hiba történt a csatorna létrehozása során: ${error}` });
    }
}

const getCategories = async(req, res) => {
    try {
        const categories = await CategoryDAO.getCategories();
        if(categories.length > 0) {
            res.status(200).json({ message: 'Kategóriák sikeresen lekérve!', categories: categories });
        } else {
            res.status(204).json({ message: 'Nincsenek kategóriák!' })
        }
    } catch(error) {
        res.status(500).json({ message: `Hiba történt a kategóriák lekérése során: ${error}` });
    }
}

module.exports = { getDashboard, createChannel, getCategories }