
    const dependencyInjector = require('../dependency-injector.js');
    const sqlite = dependencyInjector.inject('sqlite');

    function buildEscapedQueryValuesObject(queryObj){
        const escapedQueryValues = {};
        let query = '';
        const conversionHashmap = {
            lt: '<',
            gt: '>',
            lte: '<=',
            gte: '>=',
            ne: '!='
        };
        let precursor = 'WHERE';
        let counter = 0;
        for(const outerKey in queryObj){
            const queryValue = queryObj[outerKey];
            
            if(typeof queryValue === 'object'){
                for(const innerKey in queryValue){
    
                    const escapedQueryValue = `$queryValue${counter}`;
    
                    escapedQueryValues[escapedQueryValue] = queryValue[innerKey];
                    
                    if(innerKey === 'in'){
                        query += ` ${precursor} ${outerKey} IN ( ${queryValue[innerKey]} )`;
                        delete escapedQueryValues[escapedQueryValue];
                        
                    }
                    else if(innerKey=== 'like'){
                        escapedQueryValues[escapedQueryValue] = `%${queryValue[innerKey]}%`;
                        query += ` ${precursor} ${outerKey} LIKE ${escapedQueryValue}`;
                    }
                    else{
                        query += ` ${precursor} ${outerKey} ${conversionHashmap[innerKey]} ${escapedQueryValue}`;
                    }
                    counter++;
                    precursor = 'AND'
                }
                
            }
            else{
                const escapedQueryValue = `$queryValue${counter}`;
    
                escapedQueryValues[escapedQueryValue] = queryValue;
                query += ` ${precursor} ${outerKey}=${escapedQueryValue}`;
            }
            counter++
            precursor = 'AND'
        }
        return {
            query,
            escapedQueryValues
        }
    }

    function getPermissions({limit, offset}, fieldData, queryObject){
        const {
            query,
            escapedQueryValues
        } = buildEscapedQueryValuesObject(queryObject);

        return new Promise((resolve, reject) => {
            sqlite.all(
                `SELECT ${fieldData} FROM permission ${query} LIMIT $limit OFFSET $offset`, 
                {
                    $limit: limit, 
                    $offset: offset,
                    ...escapedQueryValues
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

    function runPermissionQuery(userId, permissionId){
        const escapedValues = {
            $userId: userId,
            $permissionId: permissionId
        };

        const userGroupsQuery = `SELECT groupId FROM permissionGroupToUser WHERE userId=$userId`;

        const selectPermissions = `
        SELECT COUNT(*)
        FROM permissionGroupToPermission as pgtp
        WHERE pgtp.permissionId=$permissionId
        AND pgtp.groupId IN (${userGroupsQuery})
        `;

        const userHasPermissionQuery=`
        SELECT (${selectPermissions}) > 0;
        `;

        return new Promise((resolve, reject) => {
            sqlite.get(
                userHasPermissionQuery,
                escapedValues,
                (err, result) => {
                    if(err){
                        return reject(err);
                    }
                    return resolve(!!result);
                }
            )
        })
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
        deleteSpecificPermission,
        runPermissionQuery
    }
    