
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

    function getGroupLevelPermissions({limit, offset}, fieldData, queryObject){
        const {
            query,
            escapedQueryValues
        } = buildEscapedQueryValuesObject(queryObject);

        return new Promise((resolve, reject) => {
            sqlite.all(
                `SELECT ${fieldData} FROM groupLevelPermission ${query} LIMIT $limit OFFSET $offset`, 
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

    function getSpecificGroupLevelPermission(groupLevelPermissionId, fieldData){
        return new Promise((resolve, reject) => {
            sqlite.get(
                `SELECT ${fieldData} FROM groupLevelPermission WHERE id=$id`,
                {
                    $id: groupLevelPermissionId
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

    function postGroupLevelPermission({tableName,groupId,permissionType,granteeId,get,post}){
        return new Promise((resolve, reject) => {
            sqlite.get(
                `INSERT INTO groupLevelPermission(tableName, groupId, permissionType, granteeId, get, post) VALUES($tableName, $groupId, $permissionType, $granteeId, $get, $post);`,
                {
                    $tableName:tableName, $groupId:groupId, $permissionType:permissionType, $granteeId:granteeId, $get:get, $post:post
                },
                (err) => {
                    if(err){
                        return reject(err);
                    }
                    sqlite.get(
                        `SELECT MAX(id) FROM groupLevelPermission`,
                        (err, idData) => {
                            if(err){
                                return reject(err);
                            }
                            return resolve({
                                id:idData['MAX(id)'],
                                tableName,groupId,permissionType,granteeId,get,post
                            })
                        }
                    )
                }
            )
        });
    }

    function updateGroupLevelPermissions(groupLevelPermissionDataArray){
        return Promise.all(groupLevelPermissionDataArray.map(({id, tableName, groupId, permissionType, granteeId, get, post}) => {
            return new Promise((resolve, reject) => {
                sqlite.run(
                    `UPDATE groupLevelPermission SET tableName=$tableName, groupId=$groupId, permissionType=$permissionType, granteeId=$granteeId, get=$get, post=$post WHERE id=$id`,
                    {
                        $id: id,
                        $tableName:tableName, $groupId:groupId, $permissionType:permissionType, $granteeId:granteeId, $get:get, $post:post
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

    function updateSpecificGroupLevelPermission({id, tableName, groupId, permissionType, granteeId, get, post}){
        return new Promise((resolve, reject) => {
            sqlite.run(
                `UPDATE groupLevelPermission SET tableName=$tableName, groupId=$groupId, permissionType=$permissionType, granteeId=$granteeId, get=$get, post=$post WHERE id=$id`,
                {
                    $id:id,
                    $tableName:tableName, $groupId:groupId, $permissionType:permissionType, $granteeId:granteeId, $get:get, $post:post
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

    function patchGroupLevelPermissions(groupLevelPermissionDataArray){
        return Promise.all(groupLevelPermissionDataArray.map((groupLevelPermissionData) => {
    
            let queryContents = 'SET';
            let queryData = {};
            queryData.$id = groupLevelPermissionData.id;
            delete groupLevelPermissionData.id
            for(let key in groupLevelPermissionData){
                queryContents += ` ${key}=$${key},`
                queryData['$' + key] = groupLevelPermissionData[key];
            }
            queryContents = queryContents.slice(0, queryContents.length - 1);
            queryContents += ' WHERE id=$id';
    
            return new Promise((resolve, reject) => {
                sqlite.run(
                    `UPDATE groupLevelPermission ${queryContents}`,
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
    
    function patchSpecificGroupLevelPermission(id, groupLevelPermissionData){
        // description, status
        let queryContents = 'SET';
        let queryData = {};
        queryData.$id = id;
        for(let key in groupLevelPermissionData){
            queryContents += ` ${key}=$${key},`
            queryData['$' + key] = groupLevelPermissionData[key];
        }
        queryContents = queryContents.slice(0, queryContents.length - 1);
        queryContents += ' WHERE id=$id';
    
        return new Promise((resolve, reject) => {
            sqlite.run(
                `UPDATE groupLevelPermission ${queryContents}`,
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

    function deleteGroupLevelPermissions(groupLevelPermissionIdList){
        return Promise.all(groupLevelPermissionIdList.map(id=> {
            return new Promise((resolve, reject) => {
                sqlite.run(
                    `DELETE FROM groupLevelPermission WHERE id=$id`,
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

    function deleteSpecificGroupLevelPermission(groupLevelPermissionId){
        return new Promise((resolve, reject) => {
            sqlite.run(
                `DELETE FROM groupLevelPermission WHERE id=$id`,
                {
                    $id:groupLevelPermissionId
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

    function runGroupLevelPermissionQuery(userId, groupId, tableName, operation){
        const escapedValues = {
            $userId: userId,
            $groupId: groupId,
            $tableName: tableName
        };
        const userGroupsQuery = `SELECT groupId FROM permissionGroupToUser WHERE userId=$userId`;
        const selectGroupPermissions = `
        SELECT COUNT(*)
        FROM groupLevelPermission as glp
        WHERE glp.permissionType='group'
        AND glp.tableName=$tableName
        AND glp.groupId=$groupId
        AND glp.${operation}=1
        AND glp.granteeId IN (${userGroupsQuery})
        `;

        const selectUserPermissions =`
        SELECT COUNT(*)
        FROM groupLevelPermission as glp
        WHERE glp.permissionType='group'
        AND glp.tableName=$tableName
        AND glp.groupId=$groupId
        AND glp.${operation}=1
        AND glp.granteeId=$userId
        `

        const userHasPermissionQuery=`
        SELECT (
            (SELECT (${selectGroupPermissions}) > 0)
            OR
            (SELECT (${selectUserPermissions}) > 0)
        );
        `

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
        getGroupLevelPermissions,
        getSpecificGroupLevelPermission,
        postGroupLevelPermission,
        updateGroupLevelPermissions,
        updateSpecificGroupLevelPermission,
        patchGroupLevelPermissions,
        patchSpecificGroupLevelPermission,
        deleteGroupLevelPermissions,
        deleteSpecificGroupLevelPermission,

        runGroupLevelPermissionQuery
    }
    