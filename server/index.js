const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//Middleware

app.use(bodyParser.json());
app.use(cors());

const posts = require('./routes/api/posts');

app.use('/api/posts', posts);
//mongodb+srv://andrey_1:kek123@cluster0-wsoju.mongodb.net/test?retryWrites=true&w=majority
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server started on port ${port}`));
