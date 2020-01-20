const db = require('./connection');
const { dateToFormattedString } = require('../utils');

// Get breed information

async function getBreedInfo(id) {
    try {
        const breedInfo = await db.one(`select * from breeds where id=$1`, [id]);
        return breedInfo;
    } catch (err) {
        return null;
    }
}

module.exports = {
    getBreedInfo
};
