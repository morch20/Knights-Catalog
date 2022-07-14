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
    const p = req.query.p;
    getAll(client.db(DB), COLL, p, res);
});

router.get('/:id', (req, res) => {

    const id = req.params.id.split(':');    
    const p = req.query.p;

    if(id[1] === ''){
        res.json({});
        return;
    }

    let property = {};
    property[id[0]] =  new RegExp(id[1],"i");

    getMany(client.db(DB), COLL, property, p, res);
});

module.exports = router;
