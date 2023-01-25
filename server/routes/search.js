const express = require('express');
const {MongoClient} = require('mongodb');
const {getAll, getMany} = require('../controllers/index.js')
const {getFilters} = require('../functions/index.js')


//connect to database
let client;

MongoClient.connect(process.env.CONNECTION_URI)
.then(c => {
    client = c
    console.log('connected to database on search route')
})
.catch(error => console.log(error))


const DB = 'search';
const COLL = 'search';

//routes
const router = express.Router();

router.post('/', (req, res) => {
    const page = req.query.p;
    const filters = req.body || {};

    getAll(client.db(DB), COLL, getFilters(filters, true), page, res);
});

router.post('/:id', (req, res) => {
    const page = req.query.p;
    const id = req.params.id;
    const filters = req.body || {};
    filters['name'] = [id.replace('(', String.raw`\(`).replace(')', String.raw`\)`)];

    getMany(client.db(DB), COLL, getFilters(filters, true), page, res);
});

module.exports = router;
