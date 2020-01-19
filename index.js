const http = require('http');
const express = require('express');

const app = express();
const PORT = 3000;

const session = require('express-session');
// const bootstrap = require('bootstrap');

const FileStore = require('session-file-store')(session);
app.use(session({
    store: new FileStore({}),

    // We will move this to a secure location, shortly.
    secret: 'lalala1234lalala'
}));

app.use((req, res, next) => {
    console.log('***********');
    console.log(req.session);
    console.log('***********');

    next();
});

const es6Renderer = require('express-es6-template-engine');
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

const bodyParser = require('body-parser');
const parseForm = bodyParser.urlencoded({
    extended: true
});

const { dateToFormattedString } = require('./utils');

const server = http.createServer(app);

const morgan = require('morgan');
const logger = morgan('tiny');
app.use(logger);

const helmet = require('helmet');
app.use(helmet());

const pets = require('./models/pets');

const users = require('./models/users');
const breeds = require('./models/breeds');

app.use(express.static('public'));

const partials = {
    header: 'partials/header',
    nav: 'partials/nav',
    footer: 'partials/footer',
};

// LANDING PAGE ////

app.get('/', async(req, res) => {
    res.render('users/landingpage', {
        partials
    });
});

app.get('/petslist', async(req, res) => {
    const thePets = await pets.allPets();

    res.render('users/petslist', {
        locals: {
            thePets
        },
        partials
    });
});

// login required function
function requireLogin(req, res, next) {
    if (req.session && req.session.users) {
        console.log('user is logged in')
        next();
    } else {
        console.log('user is not logged in')
        res.redirect('/login');
    }
};

// ///////// SEE PETS - FUNCTIONS //////////
// // get all pets
// app.get('/pets', async (req, res) => {
//     const allPets = [];
//     const thePets = await pets.allPets();
//     res.json(thePets);
//     // TODO: Rahel fix this to return all the pets from the database using the same concept as /profile
// });

// get pet by id
app.get('/pets/:id(\\d+)/', async (req, res) => {
    const thePet = await pets.getPet(req.params.id);
    res.render('users/pets', {
        locals: {
            ...thePet
        },
        partials
    });
});

// get pet by breed --> not working
// app.get('/pets/:breed',async (req, res)=> {
//     console.log(pets.getPet(req.params.breed_id));
//     res.json(await pets.getPetByBreed(req.params.breed_id));
// });


// CREATING A NEW PET

app.get('/pets/create', requireLogin, async (req, res) => {

    // express will look in templates/pets/form.html
    res.render('pets/create', {
        locals: {
            name: '',
            image: '',
            species: '',
            birthdate: '',
            pet_location: '',
            color: '',
            gender: '',
            size: '',
            pet_description: '',
        },
        partials,
    });
});

app.post('/pets/create', requireLogin, parseForm, async (req, res) => {
    const { name, image, species, birthdate, pet_location, color, gender, size, pet_description, breed_id } = req.body;

    const user_id = req.session.users.id;
    const newPetId = await pets.createPet(name, image, species, birthdate, pet_location, color, gender, size, pet_description, user_id, breed_id);

    res.redirect(`/pets/${newPetId}`);
});

//////// EDIT / UPDATE PETS ////////

app.get('/pets/:id/edit', requireLogin, async (req, res) => {

    const { id } = req.params;
    const thePet = await pets.getPet(id);

    res.render('pets/edit', {
        locals: {
            name: thePet.name,
            image: thePet.image,
            species: thePet.species,
            birthdate: dateToFormattedString(thePet.birthdate),
            pet_location: thePet.pet_location,
            color: thePet.color,
            gender: thePet.gender,
            size: thePet.size,
            pet_description: thePet.pet_description
        },
        partials,
    });
});

app.post('/pets/:id/edit', requireLogin, parseForm, async (req, res) => {
    const { name, species, birthdate, pet_location, color, gender, size, pet_description } = req.body;
    const { id } = req.params;
    const updatedId = await pets.updatePet(id, name, species, birthdate, pet_location, color, gender, size, pet_description);
    if (result) {
        res.redirect(`/pets/${id}`);
    } else {
        res.redirect(`/pets/${id}/edit`)
    }
});

//////// DELETE PET ////////
app.get('/pets/:id/delete')
app.post('/pets/:id/delete')


//// SIGN UP FUNCTION /////

app.get('/signup', (req, res) => {
    res.render('users/signup', { partials });
});

app.post('/signup', parseForm, async (req, res) => {
    const { user_name, first_name, last_name, phone_number, user_location, email, password } = req.body;

    const newUserId = await users.createUser(user_name, first_name, last_name, phone_number, user_location, email, password);

    if (newUserId && newUserId > 0) {
        console.log(`yay! you signed in!`);

        // Add some info to the user's session
        req.session.users = {
            user_name,
            id: newUserId
        };
        req.session.save(() => {
            console.log('The session is now saved!!!');
            // This avoids a long-standing
            // bug in the session middleware
            res.redirect('/profile');
        });
    } else {
        console.log(`boooooooo. that is not correct`);
    }
});

app.get('/login', (req, res) => {
    res.render('users/auth', {
        partials
    });
});

app.post('/login', parseForm, async (req, res) => {
    const { user_name, password } = req.body;
    console.log("===== index.js line 262")
    console.log(req.body);
    const didLoginSuccessfully = await users.login(user_name, password);
    console.log(didLoginSuccessfully)
    if (didLoginSuccessfully) {
        console.log(`the user has logged in!`);

        const theUser = await users.getByUsername(user_name);
        req.session.users = {
            user_name,
            id: theUser.id
        };
        req.session.save(() => {
            console.log('The session is now saved!!!');
            res.redirect('/profile');
        });
    } else {
        console.log(`Incorrect`);
    }
});

///// LOGOUT /////
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

// "Profile" - list pets for this owner

app.get('/profile', requireLogin, async (req, res) => {
    const id = req.session.users.id
    const userPets = await pets.getAllPetsByUserId(id);

    res.render('users/profile', {
        locals: {
            userPets,
        },
        partials
    });
});

////// UPDATE USER PROFILE /////////
app.get('/profile/edit', requireLogin, async (req, res) => {

    const id = req.session.users.id
    const userProfile = await users.getById(id);

    res.render('users/edit-profile', {
        locals: {
            ...userProfile,
        },
        partials
    });

});

app.post('/profile/edit', requireLogin, parseForm, async (req, res) => {
    const { user_name, first_name, last_name, email, phone_number, user_location } = req.body;
    const id = req.session.users.id
    const result = await users.updateUser(id, user_name, first_name, last_name, email, phone_number, user_location);
    if (result) {
        res.redirect(`/profile`);
    } else {
        res.redirect(`/profile/edit`)
    }
});

// Get breed information
app.get('/breed/:id', async (req, res) => {
    const breed = await breeds.getBreedInfo(req.params.id);

    res.render('breed', {
        locals: {
            ...breed
        },
        partials
    });
});


app.get('*', (req, res) => {
    console.log("Redirecting, because no page here.");
    res.redirect('/');
})

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});