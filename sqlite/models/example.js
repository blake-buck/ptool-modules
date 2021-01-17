let {database} = require('../initialization');

function getExamples({limit, offset}, fieldData){
    return new Promise((resolve, reject) => {
        database.db.all(
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
        database.db.get(
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
        database.db.get(
            `INSERT INTO example(description, status) VALUES($description, $status);`,
            {
                $description: description,
                $status: status
            },
            (err) => {
                if(err){
                    return reject(err);
                }
                database.db.get(
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
            database.db.run(
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
        database.db.run(
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

function deleteExamples(exampleIdList){
    return Promise.all(exampleIdList.map(id=> {
        return new Promise((resolve, reject) => {
            database.db.run(
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
        database.db.run(
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
    deleteExamples,
    deleteSpecificExample
}