const http = require('http');
const express = require('express');

const app = express();
const PORT = 3000;

//const session = require('express-session');



const es6Renderer = require('express-es6-template-engine');
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

const bodyParser = require('body-parser');
const parseForm = bodyParser.urlencoded({
    extended: true
});

const server = http.createServer(app);


const pets = require('./models/pets');

// //async function main() {
//     const result = await pets.updateName(1, 'Peter');
//     console.log(result);


// }

// main();
// async function main() {
//     const result = await pets.del(1);
//     console.log(result);

// }

app.get('/pets/:id',async (req, res)=> {
    //console.log(pets.getPet(req.params.id));
    res.json(await pets.getPet(req.params.id));

})

async function main() {
    const result = await pets.updateName(1, 'Maggie');
    console.log(result);

}
async function main() {
    const result = await pets.del(1);
    console.log(result);

}



server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});