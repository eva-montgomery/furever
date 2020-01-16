const db = require('./connection');

async function getPet(id) {
    try {
        const onePet = await db.one(`select * from pets where id=$1`, [id]);
        return onePet;
    } catch (err) {
        return null;
    }
}

async function updateName(id,name) {
    const result = await db.result(`

        update pets set 
            name=$1
            where id=$2;
    `, [name, id]);
    // return result;
    if (result.rowCount === 1) {
        return id;
    } else {
        return null;
    }
}

async function  updatebirthdate(id, birthdate){

}
//to delete pets using id

async function del(id) {
    const result = await db.result(`delete from pets where id=$1`, [id]);
    console.log(result);
    if (result.rowCount === 1) {
        return id;
    } else {
        return null;
    }
}

module.exports = {
    del,
    updateName,
    getPet
    
}