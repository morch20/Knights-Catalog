const express = require('express');
const {MongoClient} = require('mongodb');
const {getAll, getMany} = require('../controllers/index.js')


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

router.get('/', (req, res) => {
    const page = req.query.p;
    getAll(client.db(DB), COLL, {}, page, res);
});

router.get('/:id', (req, res) => {
    const page = req.query.p;
    const id = req.params.id;

    getMany(client.db(DB), COLL, {'name': new RegExp(id,"i")}, page, res);
});

module.exports = router;
