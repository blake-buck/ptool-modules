
    const dependencyInjector = require('../dependency-injector.js');
    const sqlite = dependencyInjector.inject('sqlite');

    function getPermissions({limit, offset}, fieldData, remainingQueryData){
        const escapedValues = {};
        escapedValues.$limit = limit;
        escapedValues.$offset = offset;

        // proceed with caution; query params _NEED_ to be validated at the controller otherwise you're looking at a potential SQL injection vulnerability
        let whereQuery = '';
        for(const key in remainingQueryData){
            escapedValues[`$${key}Escaped`] = key;
            escapedValues[`$${key}`] = remainingQueryData[key];
            if(whereQuery === ''){
                whereQuery += `WHERE $${key}Escaped=$${key}`
            }
            else{
                whereQuery += `AND $${key}Escaped=$${key}`
            }
        }
        return new Promise((resolve, reject) => {
            sqlite.all(
                `SELECT ${fieldData} FROM permission ${whereQuery} LIMIT $limit OFFSET $offset`, 
                escapedValues, 
                (err, rows) => {
                    if(err){
                        return reject(err);
                    }
                    return resolve(rows)
                }
            )
        })
    }

    function getSpecificPermission(permissionId, fieldData){
        return new Promise((resolve, reject) => {
            sqlite.get(
                `SELECT ${fieldData} FROM permission WHERE id=$id`,
                {
                    $id: permissionId
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

    function postPermission({name,description}){
        return new Promise((resolve, reject) => {
            sqlite.get(
                `INSERT INTO permission(name, description) VALUES($name, $description);`,
                {
                    $name:name, $description:description
                },
                (err) => {
                    if(err){
                        return reject(err);
                    }
                    sqlite.get(
                        `SELECT MAX(id) FROM permission`,
                        (err, idData) => {
                            if(err){
                                return reject(err);
                            }
                            return resolve({
                                id:idData['MAX(id)'],
                                name,description
                            })
                        }
                    )
                }
            )
        });
    }

    function updatePermissions(permissionDataArray){
        return Promise.all(permissionDataArray.map(({id, name, description}) => {
            return new Promise((resolve, reject) => {
                sqlite.run(
                    `UPDATE permission SET name=$name, description=$description WHERE id=$id`,
                    {
                        $id: id,
                        $name:name, $description:description
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

    function updateSpecificPermission({id, name, description}){
        return new Promise((resolve, reject) => {
            sqlite.run(
                `UPDATE permission SET name=$name, description=$description WHERE id=$id`,
                {
                    $id:id,
                    $name:name, $description:description
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

    function patchPermissions(permissionDataArray){
        return Promise.all(permissionDataArray.map((permissionData) => {
    
            let queryContents = 'SET';
            let queryData = {};
            queryData.$id = permissionData.id;
            delete permissionData.id
            for(let key in permissionData){
                queryContents += ` ${key}=$${key},`
                queryData['$' + key] = permissionData[key];
            }
            queryContents = queryContents.slice(0, queryContents.length - 1);
            queryContents += ' WHERE id=$id';
    
            return new Promise((resolve, reject) => {
                sqlite.run(
                    `UPDATE permission ${queryContents}`,
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
    
    function patchSpecificPermission(id, permissionData){
        // description, status
        let queryContents = 'SET';
        let queryData = {};
        queryData.$id = id;
        for(let key in permissionData){
            queryContents += ` ${key}=$${key},`
            queryData['$' + key] = permissionData[key];
        }
        queryContents = queryContents.slice(0, queryContents.length - 1);
        queryContents += ' WHERE id=$id';
    
        return new Promise((resolve, reject) => {
            sqlite.run(
                `UPDATE permission ${queryContents}`,
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

    function deletePermissions(permissionIdList){
        return Promise.all(permissionIdList.map(id=> {
            return new Promise((resolve, reject) => {
                sqlite.run(
                    `DELETE FROM permission WHERE id=$id`,
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

    function deleteSpecificPermission(permissionId){
        return new Promise((resolve, reject) => {
            sqlite.run(
                `DELETE FROM permission WHERE id=$id`,
                {
                    $id:permissionId
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
        getPermissions,
        getSpecificPermission,
        postPermission,
        updatePermissions,
        updateSpecificPermission,
        patchPermissions,
        patchSpecificPermission,
        deletePermissions,
        deleteSpecificPermission
    }
    