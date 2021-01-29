
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

    function getRecordLevelPermissions({limit, offset}, fieldData, queryObject){
        const {
            query,
            escapedQueryValues
        } = buildEscapedQueryValuesObject(queryObject);

        return new Promise((resolve, reject) => {
            sqlite.all(
                `SELECT ${fieldData} FROM recordLevelPermission ${query} LIMIT $limit OFFSET $offset`, 
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

    function getSpecificRecordLevelPermission(recordLevelPermissionId, fieldData){
        return new Promise((resolve, reject) => {
            sqlite.get(
                `SELECT ${fieldData} FROM recordLevelPermission WHERE id=$id`,
                {
                    $id: recordLevelPermissionId
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

    function postRecordLevelPermission({tableName,recordId,permissionType,granteeId,get,modify,del}){
        return new Promise((resolve, reject) => {
            sqlite.get(
                `INSERT INTO recordLevelPermission(tableName, recordId, permissionType, granteeId, get, modify, del) VALUES($tableName, $recordId, $permissionType, $granteeId, $get, $modify, $del);`,
                {
                    $tableName:tableName, $recordId:recordId, $permissionType:permissionType, $granteeId:granteeId, $get:get, $modify:modify, $del:del
                },
                (err) => {
                    if(err){
                        return reject(err);
                    }
                    sqlite.get(
                        `SELECT MAX(id) FROM recordLevelPermission`,
                        (err, idData) => {
                            if(err){
                                return reject(err);
                            }
                            return resolve({
                                id:idData['MAX(id)'],
                                tableName,recordId,permissionType,granteeId,get,modify,del
                            })
                        }
                    )
                }
            )
        });
    }

    function updateRecordLevelPermissions(recordLevelPermissionDataArray){
        return Promise.all(recordLevelPermissionDataArray.map(({id, tableName, recordId, permissionType, granteeId, get, modify, del}) => {
            return new Promise((resolve, reject) => {
                sqlite.run(
                    `UPDATE recordLevelPermission SET tableName=$tableName, recordId=$recordId, permissionType=$permissionType, granteeId=$granteeId, get=$get, modify=$modify, del=$del WHERE id=$id`,
                    {
                        $id: id,
                        $tableName:tableName, $recordId:recordId, $permissionType:permissionType, $granteeId:granteeId, $get:get, $modify:modify, $del:del
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

    function updateSpecificRecordLevelPermission({id, tableName, recordId, permissionType, granteeId, get, modify, del}){
        return new Promise((resolve, reject) => {
            sqlite.run(
                `UPDATE recordLevelPermission SET tableName=$tableName, recordId=$recordId, permissionType=$permissionType, granteeId=$granteeId, get=$get, modify=$modify, del=$del WHERE id=$id`,
                {
                    $id:id,
                    $tableName:tableName, $recordId:recordId, $permissionType:permissionType, $granteeId:granteeId, $get:get, $modify:modify, $del:del
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

    function patchRecordLevelPermissions(recordLevelPermissionDataArray){
        return Promise.all(recordLevelPermissionDataArray.map((recordLevelPermissionData) => {
    
            let queryContents = 'SET';
            let queryData = {};
            queryData.$id = recordLevelPermissionData.id;
            delete recordLevelPermissionData.id
            for(let key in recordLevelPermissionData){
                queryContents += ` ${key}=$${key},`
                queryData['$' + key] = recordLevelPermissionData[key];
            }
            queryContents = queryContents.slice(0, queryContents.length - 1);
            queryContents += ' WHERE id=$id';
    
            return new Promise((resolve, reject) => {
                sqlite.run(
                    `UPDATE recordLevelPermission ${queryContents}`,
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
    
    function patchSpecificRecordLevelPermission(id, recordLevelPermissionData){
        // description, status
        let queryContents = 'SET';
        let queryData = {};
        queryData.$id = id;
        for(let key in recordLevelPermissionData){
            queryContents += ` ${key}=$${key},`
            queryData['$' + key] = recordLevelPermissionData[key];
        }
        queryContents = queryContents.slice(0, queryContents.length - 1);
        queryContents += ' WHERE id=$id';
    
        return new Promise((resolve, reject) => {
            sqlite.run(
                `UPDATE recordLevelPermission ${queryContents}`,
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

    function deleteRecordLevelPermissions(recordLevelPermissionIdList){
        return Promise.all(recordLevelPermissionIdList.map(id=> {
            return new Promise((resolve, reject) => {
                sqlite.run(
                    `DELETE FROM recordLevelPermission WHERE id=$id`,
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

    function deleteSpecificRecordLevelPermission(recordLevelPermissionId){
        return new Promise((resolve, reject) => {
            sqlite.run(
                `DELETE FROM recordLevelPermission WHERE id=$id`,
                {
                    $id:recordLevelPermissionId
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

    function runRecordLevelPermissionQuery(userId, recordId, tableName, operation){
        const escapedValues = {
            $userId: userId,
            $tableName: tableName,
            $recordId: recordId
        }
        const userGroupsQuery = `SELECT groupId FROM permissionGroupToUser WHERE userId=$userId`;
        const selectGroupPermissions = `
        SELECT COUNT(*) 
        FROM recordLevelPermission as rlp
        WHERE rlp.permissionType = 'group'
        AND rlp.tableName = $tableName
        AND rlp.${operation} = 1
        AND rlp.recordId = $recordId
        AND rlp.granteeId IN (${userGroupsQuery})`

        const selectUserPermissions=`
        SELECT COUNT(*)
        FROM recordLevelPermission as rlp
        WHERE rlp.permissionType = 'user'
        AND rlp.tableName = $tableName
        AND rlp.${operation} = 1
        AND rlp.recordId = $recordId
        AND rlp.granteeId = $userId
        `;

        const userHasPermissionQuery=`
        SELECT (
            (SELECT (${selectGroupPermissions}) > 0)
            OR
            (SELECT (${selectUserPermissions}) > 0)
        ) as hasPermission;
        `

        return new Promise((resolve, reject) => {
            sqlite.get(
                userHasPermissionQuery,
                escapedValues,
                (err, result) => {
                    if(err){
                        return reject(err);
                    }
                    return resolve(!!result.hasPermission);
                }
            )
        })
    }


    function addRecordLevelPermissionCheckToBulkGet(tableName, recordName, userId, commaSeperatedGroupList){
        // $userId
        return {
            query: `AND SELECT(
                (SELECT (SELECT COUNT(*) FROM recordLevelPermission as rlp WHERE rlp.table=$tableName AND rlp.recordId=${recordName}.id AND rlp.permissionType='group' AND rlp.granteeId IN(${commaSeperatedGroupList}) AND rlp.get=1) > 0)
                OR
                (SELECT (SELECT COUNT(*) FROM recordLevelPermission as rlp WHERE rlp.table=$tableName AND rlp.recordId=${recordName}.id AND rlp.permissionType='user' AND rlp.granteeId=$userId AND rlp.get=1) > 0)
            )
            `,
            escapedValues: {
                $userId: userId,
                $tableName: tableName
            }
        }
    }

    module.exports = {
        getRecordLevelPermissions,
        getSpecificRecordLevelPermission,
        postRecordLevelPermission,
        updateRecordLevelPermissions,
        updateSpecificRecordLevelPermission,
        patchRecordLevelPermissions,
        patchSpecificRecordLevelPermission,
        deleteRecordLevelPermissions,
        deleteSpecificRecordLevelPermission,
        runRecordLevelPermissionQuery,
        addRecordLevelPermissionCheckToBulkGet
    }