const http = require('http');
const express = require('express');

const app = express();
const PORT = 3000;

const session = require('express-session');

const FileStore = require('session-file-store')(session);
app.use(session({
    store: new FileStore({}),

    // We will move this to a secure location, shortly.
//     secret: 'lalala1234lalala' --> change
// }));

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});