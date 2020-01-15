const http = require('http');
const express = require('express');

const app = express();
const PORT = 3000;

const session = require('express-session');

// const FileStore = require('session-file-store')(session);
// app.use(session({
//     store: new FileStore({}),
//     secret: 'lalala1234lalala'
// }));

const es6Renderer = require('express-es6-template-engine');
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

const bodyParser = require('body-parser');
const parseForm = bodyParser.urlencoded({
    extended: true
});

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});