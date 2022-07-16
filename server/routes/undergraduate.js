const express = require('express');
const {MongoClient} = require('mongodb');
const {getAll, getMany, getCollections} = require('../controllers/index.js')
const {getFilters} = require('../functions/index.js')


//connect to database
let client;

MongoClient.connect(process.env.CONNECTION_URI)
.then(c => {

    client = c
    console.log('connected to database on undergraduate route')
})
.catch(error => console.log(error))



//routes
const router = express.Router();

router.get('/', (req, res) => {
    const p = req.query.p;

    getAll(client.db('undergraduateSearch'), 'search', {}, p, res);
});

router.get('/colleges', (req, res) => {
    getCollections(client.db('undergraduatePrograms'), res);
})

router.get('/codes', (req, res) =>{
    getCollections(client.db('undergraduateCourses'), res);
})

router.get('/program/:id', (req, res) =>{
    const college = req.headers.college;
    const program = req.params.id;

    getMany(client.db('undergraduatePrograms'), college, {'name': program}, 0, res)
})

router.get('/programs', (req, res) => {
    const p = req.query.p;

    getAll(client.db('undergraduateSearch'), 'programs',
         getFilters(['type', 'college'], [req.get('types'), req.get('colleges')]), p, res);
    
});

router.get('/programs/:id', (req, res) => {
    const p = req.query.p;
    const id = req.params.id;
    const college = (req.headers.college === undefined || req.headers.college === '') ? new RegExp() : req.headers.college;
    console.log(college)

    getMany(client.db('undergraduateSearch'), 'programs', {'name': new RegExp(id,"i"), 'college': college}, p, res);
});

router.get('/:id', (req, res) => {
    const p = req.query.p;
    const id = req.params.id;

    getMany(client.db('undergraduateSearch'), 'search', {'name': new RegExp(id,"i")}, p, res);
});


module.exports = router;
