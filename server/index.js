const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect("lola", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)}))
    .catch(err => console.log(err))

app.get('/', (res, req) => {
    req.send('api working!')
})
