
const getAll = async(db, collection, filter, p, res) => {

    const page = p || 0;
    const documentsPerPage = 20;

    let numItems = 0;
    let documents = [];

    if(p == 0){
        await db.collection(collection)
            .find(filter)
            .forEach(d => numItems++)
            .then()
    }

    await db.collection(collection)
        .find(filter)
        .skip(page * documentsPerPage)
        .limit(documentsPerPage)
        .forEach(document => documents.push(document))
        .then(() => {

            if(p == 0){
                res.status(200).json({
                    'pagination': {
                        'pages': Math.ceil(numItems / documentsPerPage),
                        'items': numItems
                    }, 
                    'documents': documents
                })
            }
            else res.status(200).json(documents);
            
        })
        .catch((err) => {
            res.status(500).json({name: 'Could not fetch the documents', error: err})
            
        })
}

const getMany = async(db, collection, property, p, res) => {

    const page = p || 0;
    const documentsPerPage = 20;

    let documents = [];
    let numItems = 0;
    if(p == 0){

        await db.collection(collection)
        .find(property)
        .forEach(d => numItems++)
        .then()
    }

    db.collection(collection)
        .find(property)
        .skip(page * documentsPerPage)
        .limit(documentsPerPage)
        .forEach(doc => documents.push(doc))
        .then(() => {
            
            if(p == 0){
                res.status(200).json({
                    'pagination': {
                        'pages': Math.ceil(numItems / documentsPerPage),
                        'items': numItems
                    }, 
                    'documents': documents
                })
            }
            else res.status(200).json(documents);
          })
          .catch(err => {
            res.status(500).json({error: err})
          })
}

const getCollections = (db, res) => {
    let coll = {};

    db.listCollections().toArray()
    .then( array => {
        array.forEach(({name}) => coll[name] = name)
        res.send(coll);
    })
}

module.exports = {getAll, getMany, getCollections}
