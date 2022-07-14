const express = require('express');
require('dotenv').config();

const searchRoute = require('./routes/search.js');

const app = express();
const PORT = process.env.PORT || 5000;



app.listen(PORT, () => console.log(`Server listening to port ${PORT}`));

app.use('/search', searchRoute);
// app.use('/undergraduate', searchRoute);
// app.use('/graduate', searchRoute);
// app.use('/ratings', searchRoute);
