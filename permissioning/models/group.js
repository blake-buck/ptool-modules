
    const dependencyInjector = require('../dependency-injector.js');
    const sqlite = dependencyInjector.inject('sqlite');

    function getGroups({limit, offset}, fieldData){
        return new Promise((resolve, reject) => {
            sqlite.all(
                `SELECT ${fieldData} FROM group LIMIT $limit OFFSET $offset`, 
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

    function getSpecificGroup(groupId, fieldData){
        return new Promise((resolve, reject) => {
            sqlite.get(
                `SELECT ${fieldData} FROM group WHERE id=$id`,
                {
                    $id: groupId
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

    function postGroup({name,description}){
        return new Promise((resolve, reject) => {
            sqlite.get(
                `INSERT INTO group(name, description) VALUES($name, $description);`,
                {
                    $name:name, $description:description
                },
                (err) => {
                    if(err){
                        return reject(err);
                    }
                    sqlite.get(
                        `SELECT MAX(id) FROM group`,
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

    function updateGroups(groupDataArray){
        return Promise.all(groupDataArray.map(({id, name, description}) => {
            return new Promise((resolve, reject) => {
                sqlite.run(
                    `UPDATE group SET name=$name, description=$description WHERE id=$id`,
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

    function updateSpecificGroup({id, name, description}){
        return new Promise((resolve, reject) => {
            sqlite.run(
                `UPDATE group SET name=$name, description=$description WHERE id=$id`,
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

    function patchGroups(groupDataArray){
        return Promise.all(groupDataArray.map((groupData) => {
    
            let queryContents = 'SET';
            let queryData = {};
            queryData.$id = groupData.id;
            delete groupData.id
            for(let key in groupData){
                queryContents += ` ${key}=$${key},`
                queryData['$' + key] = groupData[key];
            }
            queryContents = queryContents.slice(0, queryContents.length - 1);
            queryContents += ' WHERE id=$id';
    
            return new Promise((resolve, reject) => {
                sqlite.run(
                    `UPDATE group ${queryContents}`,
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
    
    function patchSpecificGroup(id, groupData){
        // description, status
        let queryContents = 'SET';
        let queryData = {};
        queryData.$id = id;
        for(let key in groupData){
            queryContents += ` ${key}=$${key},`
            queryData['$' + key] = groupData[key];
        }
        queryContents = queryContents.slice(0, queryContents.length - 1);
        queryContents += ' WHERE id=$id';
    
        return new Promise((resolve, reject) => {
            sqlite.run(
                `UPDATE group ${queryContents}`,
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

    function deleteGroups(groupIdList){
        return Promise.all(groupIdList.map(id=> {
            return new Promise((resolve, reject) => {
                sqlite.run(
                    `DELETE FROM group WHERE id=$id`,
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

    function deleteSpecificGroup(groupId){
        return new Promise((resolve, reject) => {
            sqlite.run(
                `DELETE FROM group WHERE id=$id`,
                {
                    $id:groupId
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
        getGroups,
        getSpecificGroup,
        postGroup,
        updateGroups,
        updateSpecificGroup,
        patchGroups,
        patchSpecificGroup,
        deleteGroups,
        deleteSpecificGroup
    }
    