const http = require('http');
const express = require('express');

const app = express();
const PORT = 3000;

const session = require('express-session');

const FileStore = require('session-file-store')(session);
app.use(session({
    store: new FileStore({}),

    // We will move this to a secure location, shortly.
    secret: 'lalala1234lalala'
}));

app.use((req, res, next) =>  {
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

const pets = require('./models/pets');
const users = require('./models/users')

// login required function
function requireLogin(req, res, next) {
    if (req.session && req.session.user) {
        console.log('user is logged in')
        next();
    } else {
        console.log('user is not logged in')
        res.redirect('/login');
    }
};

///////// SEE PETS FUNCTIONS //////////
// get all pets
app.get('/pets', async (req, res) => {
    const thePets = await pets.allPets();
    res.json(thePets);
});

// get pet by breed --> not working
// app.get('/pets/:breed',async (req, res)=> {
//     console.log(pets.getPet(req.params.breed_id));
//     res.json(await pets.getPetByBreed(req.params.breed_id));
// });


// CREATING A NEW PET
app.get('/pets/create', requireLogin,(req, res) => {
    console.log("hererere")
    //res.send('yes you are at /pets/create');

    // express will look in templates/pets/form.html
    res.render('templates/pets/form', {
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
        }
    });
});

app.post('/pets/create', requireLogin, parseForm, async (req, res) => {
    console.log(req.body.image);
    console.log(req.body.species);
    console.log(req.body.species);
    console.log(req.body.birthdate);
    console.log(req.body.pet_location);
    console.log(req.body.color);
    console.log(req.body.gender);
    console.log(req.body.size);
    console.log(req.body.pet_description);
  

    const { name, image, species, birthdate, pet_location, color, gender, size, pet_description,breed_id } = req.body;
    
    const user_id = req.session.user.id;
    const newPetId = await pets.createPet(name, image, species, birthdate, pet_location, color, gender, size, pet_description, user_id, breed_id);
    console.log(`The new pet id is ${newPetId}`);

    res.redirect(`/pets/${newPetId}`);
});




//////// EDIT / UPDATE PETS ////////

app.get('/pets/:id/edit', requireLogin, async (req, res) => {

    const { id } = req.params;
    const thePet = await pets.getPet(id);

    res.render('templates/pets/form', {
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
        }
    });
});

app.post('/pets/:id/edit', requireLogin, parseForm, async (req, res) => {
    const { name, species, birthdate, pet_location, color, gender, size, pet_description } = req.body;
    const { id } = req.params;
    const result = await pets.updatePet(id, name, species, birthdate, pet_location, color, gender, size, pet_description);
    if (result) {
        res.redirect(`/pets/${id}`);
    } else {
        res.redirect(`/pets/${id}/edit`)
    }
});

// get pet by id
app.get('/pets/:id(\\d+)/',async (req, res)=> {
    //console.log(pets.getPet(req.params.id));
    res.json(await pets.getPet(req.params.id));
});

//////// DELETE PET ////////
app.get('/pets/:id/delete')
app.post('/pets/:id/delete')



////// USER LOGIN /////
// Login!
app.get('/login', (req, res) => {
    res.render('users/auth');
});
app.post('/login', parseForm, async (req, res) => {
    console.log(req.body);
    const { name, password } = req.body;
    const didLoginSuccessfully = await users.login(name, password);
    if (didLoginSuccessfully) {
        console.log(`yay! you logged in!`);

        // Assuming users have unique names:
        const theUser = await users.getByUsername(name);

        // Add some info to the user's session
        req.session.user = {
            name,
            id: theUser.id
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

app.get('/signup', (req, res) => {
    res.render('users/auth');
});



app.post('/signup', parseForm, async (req, res) => {
    console.log(req.body);
    const { name, password } = req.body;
    const didLoginSuccessfully = await users.signup(name, password);
    if (didLoginSuccessfully) {
        console.log(`yay! you signed in!`);

        // Assuming users have unique names:
        const theUser = await users.getByUsername(name);

        // Add some info to the user's session
        req.session.user = {
            name,
            id: theUser.id
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



app.get('/logout', (req, res) => {
    // Get rid of the user's session!
    // Then redirect them to the login page.
    req.session.destroy(() => {
        console.log('The session is now destroyed!!!');
        // This avoids a long-standing
        // bug in the session middleware
        res.redirect('/login');
    });
    
})

// "Profile" - list pets for this owner
app.get('/profile', (req, res) => {
    res.send(`Welcome back ${req.session.user.name}`)
});





server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});