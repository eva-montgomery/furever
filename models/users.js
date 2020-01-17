const db = require('./connection');
const bcrypt = require('bcryptjs');

function createHash(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

// Create
async function createUsername(user_name,first_name, last_name,phone_number,user_location,email, password) {
    const hash = createHash(password);
    const newUser = {
        email,
        password,
        user_name,
        first_name, 
        last_name,
        phone_number,
        user_location
    };
    console.log(newUser);  
    const returningId = await db.one("insert into users (user_name,first_name, last_name,phone_number,user_location,email, hash)values ($1, $2, $3,$4,$5,$6,$7)returning id ", [user_name,first_name, last_name,phone_number,user_location,email, hash])
    return returningId
     
}

// Retrieve
async function login(username, password) {
    const theUser = await getByUsername(username);
    return bcrypt.compareSync(password, theUser.hash);
}

async function getByUsername(username) {
    const theUser = await db.one(`
        select * from users where user_name=$1
    `, [username]);


    return theUser;
}

// async function signup(username, password) {
//     const theUser = await get(username);
//     return bcrypt.compareSync(password, theUser.hash);
// }

// async function getByUsername(username) {
//     const theUser = await db.one(`
//         select * from users where password=$1
//     `, [hush]);

//     return theUser;
// }




function getById(id) {

}
// Update User
async function updateUser(id, user_name, first_name, email, phone_number, location) {
    const result = await db.result(`
        update users set
            user_name=$2,
            first_name=$3,
            email=$4,
            phone_number=$5,
            location=$6,
        where id=$1;
    `, [id, user_name, first_name, email, phone_number, location]);  
    if (result.rowCount === 1) {
        return id;
    } else {
        return null;
    }
}

// Delete

module.exports = {
    createUsername,
    login,
    getByUsername,
    getById,
    updateUser
};