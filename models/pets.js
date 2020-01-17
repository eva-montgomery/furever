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
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)    
returning id
    `, [name, image, species, birthdate, pet_location, color, gender, size, pet_description, user_id, breed_id]);

    return result.id;
};


//////// EDIT / UPDATE PETS ////////
async function updatePet(id, name, species, birthdate, pet_location, color, gender, size, pet_description) {
    const result = await db.result(`
        update pets set
            name=$2,
            species=$3,
            birthdate=$4,
            pet_location=$5,
            color=$6,
            gender=$7,
            size=$8,
            pet_description=$9
        where id=$1;
    `, [id, name, species, birthdate, pet_location, color, gender, size, pet_description]);  
    if (result.rowCount === 1) {
        return id;
    } else {
        return null;
    }
}

// update pet name

async function updatePetName(id, name) {
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
};

// update pet species
async function updatePetSpecies(id, species) {
    const result = await db.result(`
        update pets set
            species=$1
        where id=$2;
    `, [species, id]);  
    if (result.rowCount === 1) {
        return id;
    } else {
        return null;
    }
};

// update pet birthdate
async function updatePetBirthdate(id, dateObject) {
    const dateString = dateToFormattedString(dateObject);
    const result = await db.result(`
        update pets set
            birthdate=$1
        where id=$2
    `, [dateString, id]);
    return result;
};

// update pet location
async function updatePetLocation(id, pet_location) {
    const result = await db.result(`
        update pets set
            pet_location=$1
        where id=$2
    `, [pet_location, id]);
    return result;
};

// update pet color
async function updatePetColor(id, color) {
    const result = await db.result(`
        update pets set
            color=$1
        where id=$2
    `, [color, id]);
    return result;
};

// update pet color
async function updatePetGender(id, gender) {
    const result = await db.result(`
        update pets set
            gender=$1
        where id=$2
    `, [gender, id]);
    return result;
};

// update pet size
async function updatePetSize(id, size) {
    const result = await db.result(`
        update pets set
            size=$1
        where id=$2
    `, [size, id]);
    return result;
};

// update pet description
async function updatePetDescription(id, pet_description) {
    const result = await db.result(`
        update pets set
            pet_description=$1
        where id=$2
    `, [pet_description, id]);
    return result;
};

// update pet image
async function updatePetImage(id, image) {
    const result = await db.result(`
        update pets set
            image=$1
        where id=$2
    `, [image, id]);
    return result;
};

// Delete Pet
async function delPet(id) {
    const result = await db.result(`delete from pets where id=$1`, [id]);
    console.log(result);
    if (result.rowCount === 1) {
        return id;
    } else {
        return null;
    }
};


module.exports = {
    allPets,
    getPet,
    createPet,
    updatePet,
    updatePetName,
    updatePetSpecies,
    updatePetBirthdate,
    updatePetLocation,
    updatePetColor,
    updatePetGender,
    updatePetSize,
    updatePetDescription,
    updatePetImage,
    delPet

    //getPetByBreed



};