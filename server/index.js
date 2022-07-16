const express = require('express');
const cors = require('cors');
require('dotenv').config();

const searchRoute = require('./routes/search.js');
const undergraduateRoute = require('./routes/undergraduate.js');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;



app.listen(PORT, () => console.log(`Server listening to port ${PORT}`));

app.use('/search', searchRoute);
app.use('/undergraduate', undergraduateRoute);
// app.use('/graduate', searchRoute);
// app.use('/ratings', searchRoute);
