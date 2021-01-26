
    const dependencyInjector = require('../dependency-injector.js');
    const sqlite = dependencyInjector.inject('sqlite');

    function getPermissionGroupToUsers({limit, offset}, fieldData){
        return new Promise((resolve, reject) => {
            sqlite.all(
                `SELECT ${fieldData} FROM permissionGroupToUser LIMIT $limit OFFSET $offset`, 
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

    function getSpecificPermissionGroupToUser(permissionGroupToUserId, fieldData){
        return new Promise((resolve, reject) => {
            sqlite.get(
                `SELECT ${fieldData} FROM permissionGroupToUser WHERE id=$id`,
                {
                    $id: permissionGroupToUserId
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

    function postPermissionGroupToUser({userId,groupId}){
        return new Promise((resolve, reject) => {
            sqlite.get(
                `INSERT INTO permissionGroupToUser(userId, groupId) VALUES($userId, $groupId);`,
                {
                    $userId:userId, $groupId:groupId
                },
                (err) => {
                    if(err){
                        return reject(err);
                    }
                    sqlite.get(
                        `SELECT MAX(id) FROM permissionGroupToUser`,
                        (err, idData) => {
                            if(err){
                                return reject(err);
                            }
                            return resolve({
                                id:idData['MAX(id)'],
                                userId,groupId
                            })
                        }
                    )
                }
            )
        });
    }

    function updatePermissionGroupToUsers(permissionGroupToUserDataArray){
        return Promise.all(permissionGroupToUserDataArray.map(({id, userId, groupId}) => {
            return new Promise((resolve, reject) => {
                sqlite.run(
                    `UPDATE permissionGroupToUser SET userId=$userId, groupId=$groupId WHERE id=$id`,
                    {
                        $id: id,
                        $userId:userId, $groupId:groupId
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

    function updateSpecificPermissionGroupToUser({id, userId, groupId}){
        return new Promise((resolve, reject) => {
            sqlite.run(
                `UPDATE permissionGroupToUser SET userId=$userId, groupId=$groupId WHERE id=$id`,
                {
                    $id:id,
                    $userId:userId, $groupId:groupId
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

    function patchPermissionGroupToUsers(permissionGroupToUserDataArray){
        return Promise.all(permissionGroupToUserDataArray.map((permissionGroupToUserData) => {
    
            let queryContents = 'SET';
            let queryData = {};
            queryData.$id = permissionGroupToUserData.id;
            delete permissionGroupToUserData.id
            for(let key in permissionGroupToUserData){
                queryContents += ` ${key}=$${key},`
                queryData['$' + key] = permissionGroupToUserData[key];
            }
            queryContents = queryContents.slice(0, queryContents.length - 1);
            queryContents += ' WHERE id=$id';
    
            return new Promise((resolve, reject) => {
                sqlite.run(
                    `UPDATE permissionGroupToUser ${queryContents}`,
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
    
    function patchSpecificPermissionGroupToUser(id, permissionGroupToUserData){
        // description, status
        let queryContents = 'SET';
        let queryData = {};
        queryData.$id = id;
        for(let key in permissionGroupToUserData){
            queryContents += ` ${key}=$${key},`
            queryData['$' + key] = permissionGroupToUserData[key];
        }
        queryContents = queryContents.slice(0, queryContents.length - 1);
        queryContents += ' WHERE id=$id';
    
        return new Promise((resolve, reject) => {
            sqlite.run(
                `UPDATE permissionGroupToUser ${queryContents}`,
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

    function deletePermissionGroupToUsers(permissionGroupToUserIdList){
        return Promise.all(permissionGroupToUserIdList.map(id=> {
            return new Promise((resolve, reject) => {
                sqlite.run(
                    `DELETE FROM permissionGroupToUser WHERE id=$id`,
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

    function deleteSpecificPermissionGroupToUser(permissionGroupToUserId){
        return new Promise((resolve, reject) => {
            sqlite.run(
                `DELETE FROM permissionGroupToUser WHERE id=$id`,
                {
                    $id:permissionGroupToUserId
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
        getPermissionGroupToUsers,
        getSpecificPermissionGroupToUser,
        postPermissionGroupToUser,
        updatePermissionGroupToUsers,
        updateSpecificPermissionGroupToUser,
        patchPermissionGroupToUsers,
        patchSpecificPermissionGroupToUser,
        deletePermissionGroupToUsers,
        deleteSpecificPermissionGroupToUser
    }
    