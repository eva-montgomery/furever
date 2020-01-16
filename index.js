const http = require('http');
const express = require('express');

const app = express();
const PORT = 3000;

//const session = require('express-session');

// const FileStore = require('session-file-store')(session);
// app.use(session({
//     store: new FileStore({}),

//     // We will move this to a secure location, shortly.
//     secret: 'lalala1234lalala'
// }));

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


// get pet by id
app.get('/pets/:id',async (req, res)=> {
    //console.log(pets.getPet(req.params.id));
    res.json(await pets.getPet(req.params.id));
});

// get pet by breed --> not working
// app.get('/pets/:breed',async (req, res)=> {
//     console.log(pets.getPet(req.params.breed_id));
//     res.json(await pets.getPetByBreed(req.params.breed_id));
// });


// CREATING A NEW PET
app.get('/pets/create', requireLogin, (req, res) => {
    console.log('you want the form');
    console.log('yes you are at /pets/create');
    res.send('yes you are at /pets/create');

    // express will look in templates/pets/form.html
    res.render('pets/form', {
        locals: {
            pet_name: '',
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
  

    const { name, image, species, birthdate, pet_location, color, gender, size, pet_description } = req.body;
    
    const user_id = req.session.user.id;
    const newPetId = await pets.createPet(name, image, species, birthdate, pet_location, color, gender, size, pet_description, user_id, breed_id);
    console.log(`The new pet id is ${newPetId}`);

    res.redirect(`/pets/${newPetId}`);
});







server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});