const db = require('./connection');
const { dateToFormattedString } = require('../utils');

///////// SEE PETS FUNCTIONS //////////

// get all pets
async function allPets() {
    try {
        const thePets = await db.any(`select * from pets;`);
        console.log(thePets);
        return thePets;
    } catch (err) {
        console.log(err)
        return [];
    }
}

// function to retrieve a pet by id:
async function getPet(id) {
    try {
        const onePet = await db.one(`select * from pets where id=$1`, [id]);
        return onePet;
    } catch (err) {
        return null;
    }
}

// get pet by breed --> not working
// async function getPetByBreed(breed_id) {
//     try {
//         const petByBreed = await db.one(`select * from pets where breed_id=$1`, [breed_id]);
//         return petByBreed;
//     } catch (err) {
//         return null;
//     }
// }

// CREATING A NEW PET

// function to create a new pet
async function createPet(name, image, species, birthdate, pet_location, color, gender, size, pet_description, user_id, breed_id) {
    const result = await db.one(`
insert into pets
    (name, image, species, birthdate, pet_location, color, gender, size, pet_description, user_id, breed_id)
values
    ($1, $2, $3, $4, $5, $6, $7, $8, $9; $10, $11)    
returning id
    `, [name, image, species, birthdate, pet_location, color, gender, size, pet_description, user_id, breed_id]);

    return result.id;
};




async function updateName(id,name) {
    const result = await db.result(`

        update pets set 
            name=$1
            where id=$2;
    `, [name, id]);


    if (result.rowCount === 1) {
        return id;
    } else {
        return null;
    }
}

// async function  updatebirthdate(id, birthdate){

// }
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
    allPets,
    getPet,
    createPet,
    //getPetByBreed
    // del,
    // updateName,
    

}