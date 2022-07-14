
const getAll = (db, collection, p, res) => {

    const page = p || 0;
    const documentsPerPage = 20;

    let numPages;
    let documents = []

    db.collection(collection)
        .countDocuments()
        .then( val => numPages = val)

    db.collection(collection)
        .find()
        .skip(page * documentsPerPage)
        .limit(documentsPerPage)
        .forEach(document => documents.push(document))
        .then(() => {
            res.status(200).json({'pages': Math.ceil(numPages / 20), 'documents': documents})
            
        })
        .catch((err) => {
            res.status(500).json({error: 'Could not fetch the documents'})
            
        })
}

const getMany = (db, collection, property, p, res) => {

    const page = p || 0;
    const documentsPerPage = 10;

    let documents = [];

    db.collection(collection)
        .find(property)
        .skip(page * documentsPerPage)
        .limit(documentsPerPage)
        .forEach(doc => documents.push(doc))
        .then(() => {
            res.status(200).json(documents)
          })
          .catch(err => {
            res.status(500).json({error: err})
          })
}

module.exports = {getAll, getMany}
