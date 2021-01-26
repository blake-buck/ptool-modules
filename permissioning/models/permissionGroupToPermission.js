
    const dependencyInjector = require('../dependency-injector.js');
    const sqlite = dependencyInjector.inject('sqlite');

    function getPermissionGroupToPermissions({limit, offset}, fieldData){
        return new Promise((resolve, reject) => {
            sqlite.all(
                `SELECT ${fieldData} FROM permissionGroupToPermission LIMIT $limit OFFSET $offset`, 
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

    function getSpecificPermissionGroupToPermission(permissionGroupToPermissionId, fieldData){
        return new Promise((resolve, reject) => {
            sqlite.get(
                `SELECT ${fieldData} FROM permissionGroupToPermission WHERE id=$id`,
                {
                    $id: permissionGroupToPermissionId
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

    function postPermissionGroupToPermission({groupId,permissionId}){
        return new Promise((resolve, reject) => {
            sqlite.get(
                `INSERT INTO permissionGroupToPermission(groupId, permissionId) VALUES($groupId, $permissionId);`,
                {
                    $groupId:groupId, $permissionId:permissionId
                },
                (err) => {
                    if(err){
                        return reject(err);
                    }
                    sqlite.get(
                        `SELECT MAX(id) FROM permissionGroupToPermission`,
                        (err, idData) => {
                            if(err){
                                return reject(err);
                            }
                            return resolve({
                                id:idData['MAX(id)'],
                                groupId,permissionId
                            })
                        }
                    )
                }
            )
        });
    }

    function updatePermissionGroupToPermissions(permissionGroupToPermissionDataArray){
        return Promise.all(permissionGroupToPermissionDataArray.map(({id, groupId, permissionId}) => {
            return new Promise((resolve, reject) => {
                sqlite.run(
                    `UPDATE permissionGroupToPermission SET groupId=$groupId, permissionId=$permissionId WHERE id=$id`,
                    {
                        $id: id,
                        $groupId:groupId, $permissionId:permissionId
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

    function updateSpecificPermissionGroupToPermission({id, groupId, permissionId}){
        return new Promise((resolve, reject) => {
            sqlite.run(
                `UPDATE permissionGroupToPermission SET groupId=$groupId, permissionId=$permissionId WHERE id=$id`,
                {
                    $id:id,
                    $groupId:groupId, $permissionId:permissionId
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

    function patchPermissionGroupToPermissions(permissionGroupToPermissionDataArray){
        return Promise.all(permissionGroupToPermissionDataArray.map((permissionGroupToPermissionData) => {
    
            let queryContents = 'SET';
            let queryData = {};
            queryData.$id = permissionGroupToPermissionData.id;
            delete permissionGroupToPermissionData.id
            for(let key in permissionGroupToPermissionData){
                queryContents += ` ${key}=$${key},`
                queryData['$' + key] = permissionGroupToPermissionData[key];
            }
            queryContents = queryContents.slice(0, queryContents.length - 1);
            queryContents += ' WHERE id=$id';
    
            return new Promise((resolve, reject) => {
                sqlite.run(
                    `UPDATE permissionGroupToPermission ${queryContents}`,
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
    
    function patchSpecificPermissionGroupToPermission(id, permissionGroupToPermissionData){
        // description, status
        let queryContents = 'SET';
        let queryData = {};
        queryData.$id = id;
        for(let key in permissionGroupToPermissionData){
            queryContents += ` ${key}=$${key},`
            queryData['$' + key] = permissionGroupToPermissionData[key];
        }
        queryContents = queryContents.slice(0, queryContents.length - 1);
        queryContents += ' WHERE id=$id';
    
        return new Promise((resolve, reject) => {
            sqlite.run(
                `UPDATE permissionGroupToPermission ${queryContents}`,
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

    function deletePermissionGroupToPermissions(permissionGroupToPermissionIdList){
        return Promise.all(permissionGroupToPermissionIdList.map(id=> {
            return new Promise((resolve, reject) => {
                sqlite.run(
                    `DELETE FROM permissionGroupToPermission WHERE id=$id`,
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

    function deleteSpecificPermissionGroupToPermission(permissionGroupToPermissionId){
        return new Promise((resolve, reject) => {
            sqlite.run(
                `DELETE FROM permissionGroupToPermission WHERE id=$id`,
                {
                    $id:permissionGroupToPermissionId
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
        getPermissionGroupToPermissions,
        getSpecificPermissionGroupToPermission,
        postPermissionGroupToPermission,
        updatePermissionGroupToPermissions,
        updateSpecificPermissionGroupToPermission,
        patchPermissionGroupToPermissions,
        patchSpecificPermissionGroupToPermission,
        deletePermissionGroupToPermissions,
        deleteSpecificPermissionGroupToPermission
    }
    