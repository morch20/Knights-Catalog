const express = require('express');
require('dotenv').config();
const {MongoClient} = require('mongodb');

const app = express();
const PORT = process.env.PORT || 5000;

let client;

MongoClient.connect(process.env.CONNECTION_URI)
    .then(c => {
        client = c;
        app.listen(PORT, () => console.log(`Server listening to port ${PORT}`));
    })
    .catch(err => console.log(err))

app.get('/', (req, res) => {
    res.send('api working!')
})

app.get('/programSearch', (req, res) => {

    const db = client.db("programSearch");

    const page = req.query.p || 0;
    const documentsPerPage = 20;

  let documents = []

  db.collection('programSearch')
    .find()
    .skip(page * documentsPerPage)
    .limit(documentsPerPage)
    .forEach(document => documents.push(document))
    .then(() => {
      res.status(200).json(documents)
    })
    .catch(() => {
      res.status(500).json({error: 'Could not fetch the documents'})
    })
})
