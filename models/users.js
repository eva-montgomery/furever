const db = require('./connection');
const bcrypt = require('bcryptjs');

function createHash(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

// Create
async function create(email, password) {
    const hash = createHash(password);
    const newUser = {
        email,
        hash
    };
    console.log(newUser);   
}

// Retrieve
async function login(email, password) {
    const theUser = await getByEmail(email);
    return bcrypt.compareSync(password, theUser.hash);
}

async function getByEmail(email) {
    const theUser = await db.one(`
        select * from owners where name=$1
    `, [email]);

    return theUser;
}

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
    create,
    login,
    getByEmail,
    getById,
    updateUser
};
