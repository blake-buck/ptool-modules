const dependencyInjector = require('../dependency-injector.js');
let sqlite = dependencyInjector.inject('sqlite');

function getExamples({limit, offset}, fieldData){
    return new Promise((resolve, reject) => {
        sqlite.all(
            `SELECT ${fieldData} FROM example LIMIT $limit OFFSET $offset`, 
            {
                $limit: limit, 
                $offset: offset
            }, 
            (err, rows) => {
                if(err){
                    return reject(err);
                }
                return resolve(rows)
            }
        )
    })
}

function getSpecificExample(exampleId, fieldData){
    return new Promise((resolve, reject) => {
        sqlite.get(
            `SELECT ${fieldData} FROM example WHERE id=$id`,
            {
                $id: exampleId
            },
            (err, row) => {
                if(err){
                    return reject(err);
                }
                return resolve(row);
            }
        );
    });
}

function postExample({description, status}){
    return new Promise((resolve, reject) => {
        sqlite.get(
            `INSERT INTO example(description, status) VALUES($description, $status);`,
            {
                $description: description,
                $status: status
            },
            (err) => {
                if(err){
                    return reject(err);
                }
                sqlite.get(
                    `SELECT MAX(id) FROM example`,
                    (err, idData) => {
                        if(err){
                            return reject(err);
                        }
                        return resolve({
                            id:idData['MAX(id)'],
                            description,
                            status
                        })
                    }
                )
            }
        )
    });
}

function updateExamples(exampleDataArray){
    return Promise.all(exampleDataArray.map(({id, description, status}) => {
        return new Promise((resolve, reject) => {
            sqlite.run(
                `UPDATE example SET description=$description, status=$status WHERE id=$id`,
                {
                    $id:id,
                    $description: description,
                    $status: status
                },
                (err) => {
                    if(err){
                        return reject(err);
                    }
                    return resolve(true);
                }
            )
        });
    }))
}

function updateSpecificExample({id, description, status}){
    return new Promise((resolve, reject) => {
        sqlite.run(
            `UPDATE example SET description=$description, status=$status WHERE id=$id`,
            {
                $id:id,
                $description: description,
                $status: status
            },
            (err) => {
                if(err){
                    return reject(err);
                }
                return resolve(true);
            }
        )
    });
}

function patchExamples(exampleDataArray){
    return Promise.all(exampleDataArray.map((exampleData) => {

        let queryContents = 'SET';
        let queryData = {};
        queryData.$id = exampleData.id;
        delete exampleData.id
        for(let key in exampleData){
            queryContents += ` ${key}=$${key},`
            queryData['$' + key] = exampleData[key];
        }
        queryContents = queryContents.slice(0, queryContents.length - 1);
        queryContents += ' WHERE id=$id';

        return new Promise((resolve, reject) => {
            sqlite.run(
                `UPDATE example ${queryContents}`,
                queryData,
                (err) => {
                    if(err){
                        return reject(err);
                    }
                    return resolve(true);
                }
            )
        });
    }))
}

function patchSpecificExample(id, exampleData){
    // description, status
    let queryContents = 'SET';
    let queryData = {};
    queryData.$id = id;
    for(let key in exampleData){
        queryContents += ` ${key}=$${key},`
        queryData['$' + key] = exampleData[key];
    }
    queryContents = queryContents.slice(0, queryContents.length - 1);
    queryContents += ' WHERE id=$id';

    return new Promise((resolve, reject) => {
        sqlite.run(
            `UPDATE example ${queryContents}`,
            queryData,
            (err) => {
                if(err){
                    return reject(err);
                }
                return resolve(true);
            }
        )
    });
}

function deleteExamples(exampleIdList){
    return Promise.all(exampleIdList.map(id=> {
        return new Promise((resolve, reject) => {
            sqlite.run(
                `DELETE FROM example WHERE id=$id`,
                {
                    $id:id
                },
                (err) => {
                    if(err){
                        return reject(err);
                    }
                    return resolve(true);
                }
            )
        });
    }))
}

function deleteSpecificExample(exampleId){
    return new Promise((resolve, reject) => {
        sqlite.run(
            `DELETE FROM example WHERE id=$id`,
            {
                $id:exampleId
            },
            (err) => {
                if(err){
                    return reject(err);
                }
                return resolve(true);
            }
        )
    });
}

module.exports = {
    getExamples,
    getSpecificExample,
    postExample,
    updateExamples,
    updateSpecificExample,
    patchExamples,
    patchSpecificExample,
    deleteExamples,
    deleteSpecificExample
}