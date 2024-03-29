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


//get colleges names and courses codes
router.get('/colleges', (req, res) => {
    getCollections(client.db('undergraduatePrograms'), res);
})

router.get('/codes', (req, res) =>{
    getCollections(client.db('undergraduateCourses'), res);
})

//get full program
router.get('/program/:id', (req, res) =>{
    const college = req.query.college;
    const program = req.params.id.replaceAll('slash', '/'); 
    console.log(program)  

    getMany(client.db('undergraduatePrograms'), college, {'name': program}, 0, res);
})

//programs
router.post('/programs', (req, res) => {
    const p = req.query.p;
    const filters = req.body || {};

    getAll(client.db('undergraduateSearch'), 'programs', getFilters(filters, true), p, res);
    
});

router.post('/programs/:id', (req, res) => {
    const p = req.query.p;
    const id = req.params.id;
    const filters = req.body || {};
    filters['name'] = [id.replace('(', String.raw`\(`).replace(')', String.raw`\)`)];

    getMany(client.db('undergraduateSearch'), 'programs', getFilters(filters, true), p, res);
});

//courses
router.get('/courses', (req, res) => {
    const p = req.query.p;
    let code = req.query.code;
    if(code){
        code = code.replace("ampersand", "&");
    
        getAll(client.db('undergraduateCourses'), code, {}, p, res);
    }
    else{
        res.status(400).send('Please enter the code');
    }

    
});

router.get('/courses/:id', (req, res) => {
    const p = req.query.p;
    const id = req.params.id;
    let code = (req.query.code === undefined || req.query.code === '') ? new RegExp() : req.query.code; 
    code = code.replace("ampersand", "&");

    getMany(client.db('undergraduateCourses'), code, {'name': new RegExp(id,"i")}, p, res);
});

router.get('/:id', (req, res) => {
    const p = req.query.p;
    const id = req.params.id;

    getMany(client.db('undergraduateSearch'), 'search', {'name': new RegExp(id,"i")}, p, res);
});


module.exports = router;
