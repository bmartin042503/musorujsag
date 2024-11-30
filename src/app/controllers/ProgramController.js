const getProgramGuide = async(req, res) => {
    try {
        res.render('program-guide', { channels: [], availableChannelsCount: 28 });
    } catch(error) {
        res.status(500).json({ message: `Hiba történt a műsorújság betöltése során: ${error}` });
    }
}

module.exports = { getProgramGuide };