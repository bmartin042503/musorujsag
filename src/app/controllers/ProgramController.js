const ChannelDAO = require("../dao/ChannelDAO");
const getProgramGuide = async(req, res) => {
    try {
        const channelsAllData = await ChannelDAO.getChannelsAllData();
        res.render('program-guide', { channels: channelsAllData, availableChannelsCount: 28 });
    } catch(error) {
        res.status(500).json({ message: `Hiba történt a műsorújság betöltése során: ${error}` });
    }
}

module.exports = { getProgramGuide };