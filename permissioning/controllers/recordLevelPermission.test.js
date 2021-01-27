
        const dependencyInjector = require('../dependency-injector.js');
        dependencyInjector.register(
            'recordLevelPermissionService', 
            {
                getRecordLevelPermissions: () => true,
                getSpecificRecordLevelPermission: () => true,
                postRecordLevelPermission: () => true,
                updateRecordLevelPermissions: () => true,
                updateSpecificRecordLevelPermission: () => true,
                patchRecordLevelPermissions: () => true,
                patchSpecificRecordLevelPermission: () => true,
                deleteRecordLevelPermissions: () => true,
                deleteSpecificRecordLevelPermission: () => true
            }
        );
        const recordLevelPermissionControllers = require('./recordLevelPermission');

        const properValues = {"id":1,"tableName":"string","recordId":0,"permissionType":"string","get":"string","update":"string","delete":"string"};
        const patchSpecificProperValues = {"tableName":"string","recordId":0,"permissionType":"string","get":"string","update":"string","delete":"string"}

        const mockResponse = () => {
            const res = {};
            res.status = (passedInStatus) => {
                res.status = passedInStatus
                return res;
            };
            res.json = (passedInBody) => {
                res.body = passedInBody;
                return res;
            }
        
            return res;
        };
        
        const mockNext = (e) => {
            expect(e).toBeTruthy();
        }

        describe('recordLevelPermission controller tests', () => {
            
    it('getRecordLevelPermissions - improper offset fails validation', () => {
        recordLevelPermissionControllers.getRecordLevelPermissions(
            {
                query:{
                    offset: "string",
                    limit: 10,
                    fields: "string,string"
                }
            },
            mockResponse(),
            mockNext
        );
    })
    it('getRecordLevelPermissions - improper limit fails validation', () => {
        recordLevelPermissionControllers.getRecordLevelPermissions(
            {
                query:{
                    offset: 0,
                    limit: "string",
                    fields: "string,string"
                }
            },
            mockResponse(),
            mockNext
        );
    })
    it('getRecordLevelPermissions - improper fields fails validation', () => {
        recordLevelPermissionControllers.getRecordLevelPermissions(
            {
                query:{
                    offset: 0,
                    limit: 10,
                    fields: false
                }
            },
            mockResponse(),
            mockNext
        );
    })

    it('getSpecificRecordLevelPermission - improper id fails validation', () => {
        recordLevelPermissionControllers.getRecordLevelPermissions(
            {
                query:{
                    fields: "string,string"
                },
                param:{
                    id: "string"
                }
            },
            mockResponse(),
            mockNext
        );
    })
    it('getSpecificRecordLevelPermission - improper fields fails validation', () => {
        recordLevelPermissionControllers.getRecordLevelPermissions(
            {
                query:{
                    fields: false
                },
                param:{
                    id: 1
                }
            },
            mockResponse(),
            mockNext
        );
    })

            
        it('postRecordLevelPermission - improper id fails validation', () => {
            recordLevelPermissionControllers.postRecordLevelPermission(
                {
                    body:{
                        ...properValues,
                        id:"string"
                    }
                },
                mockResponse(),
                mockNext
            )
        });
        
        
        it('postRecordLevelPermission - improper tableName fails validation', () => {
            recordLevelPermissionControllers.postRecordLevelPermission(
                {
                    body:{
                        ...properValues,
                        tableName:0
                    }
                },
                mockResponse(),
                mockNext
            )
        });
        
        
        it('postRecordLevelPermission - improper recordId fails validation', () => {
            recordLevelPermissionControllers.postRecordLevelPermission(
                {
                    body:{
                        ...properValues,
                        recordId:"string"
                    }
                },
                mockResponse(),
                mockNext
            )
        });
        
        
        it('postRecordLevelPermission - improper permissionType fails validation', () => {
            recordLevelPermissionControllers.postRecordLevelPermission(
                {
                    body:{
                        ...properValues,
                        permissionType:0
                    }
                },
                mockResponse(),
                mockNext
            )
        });
        
        
        it('postRecordLevelPermission - improper get fails validation', () => {
            recordLevelPermissionControllers.postRecordLevelPermission(
                {
                    body:{
                        ...properValues,
                        get:0
                    }
                },
                mockResponse(),
                mockNext
            )
        });
        
        
        it('postRecordLevelPermission - improper update fails validation', () => {
            recordLevelPermissionControllers.postRecordLevelPermission(
                {
                    body:{
                        ...properValues,
                        update:0
                    }
                },
                mockResponse(),
                mockNext
            )
        });
        
        
        it('postRecordLevelPermission - improper delete fails validation', () => {
            recordLevelPermissionControllers.postRecordLevelPermission(
                {
                    body:{
                        ...properValues,
                        delete:0
                    }
                },
                mockResponse(),
                mockNext
            )
        });
        
        
            
        it('updateRecordLevelPermissions - improper id fails validation', () => {
            recordLevelPermissionControllers.updateRecordLevelPermissions(
                {
                    body:[{
                        ...properValues,
                        id:"string"
                    }]
                },
                mockResponse(),
                mockNext
            )
        })

        
        it('updateRecordLevelPermissions - improper tableName fails validation', () => {
            recordLevelPermissionControllers.updateRecordLevelPermissions(
                {
                    body:[{
                        ...properValues,
                        tableName:0
                    }]
                },
                mockResponse(),
                mockNext
            )
        })

        
        it('updateRecordLevelPermissions - improper recordId fails validation', () => {
            recordLevelPermissionControllers.updateRecordLevelPermissions(
                {
                    body:[{
                        ...properValues,
                        recordId:"string"
                    }]
                },
                mockResponse(),
                mockNext
            )
        })

        
        it('updateRecordLevelPermissions - improper permissionType fails validation', () => {
            recordLevelPermissionControllers.updateRecordLevelPermissions(
                {
                    body:[{
                        ...properValues,
                        permissionType:0
                    }]
                },
                mockResponse(),
                mockNext
            )
        })

        
        it('updateRecordLevelPermissions - improper get fails validation', () => {
            recordLevelPermissionControllers.updateRecordLevelPermissions(
                {
                    body:[{
                        ...properValues,
                        get:0
                    }]
                },
                mockResponse(),
                mockNext
            )
        })

        
        it('updateRecordLevelPermissions - improper update fails validation', () => {
            recordLevelPermissionControllers.updateRecordLevelPermissions(
                {
                    body:[{
                        ...properValues,
                        update:0
                    }]
                },
                mockResponse(),
                mockNext
            )
        })

        
        it('updateRecordLevelPermissions - improper delete fails validation', () => {
            recordLevelPermissionControllers.updateRecordLevelPermissions(
                {
                    body:[{
                        ...properValues,
                        delete:0
                    }]
                },
                mockResponse(),
                mockNext
            )
        })

        
        it('updateSpecificRecordLevelPermission - improper id fails validation', () => {
            recordLevelPermissionControllers.updateSpecificRecordLevelPermission(
                {
                    body:{
                        ...properValues,
                        id:"string"
                    }
                },
                mockResponse(),
                mockNext
            )
        })

        
        it('updateSpecificRecordLevelPermission - improper tableName fails validation', () => {
            recordLevelPermissionControllers.updateSpecificRecordLevelPermission(
                {
                    body:{
                        ...properValues,
                        tableName:0
                    }
                },
                mockResponse(),
                mockNext
            )
        })

        
        it('updateSpecificRecordLevelPermission - improper recordId fails validation', () => {
            recordLevelPermissionControllers.updateSpecificRecordLevelPermission(
                {
                    body:{
                        ...properValues,
                        recordId:"string"
                    }
                },
                mockResponse(),
                mockNext
            )
        })

        
        it('updateSpecificRecordLevelPermission - improper permissionType fails validation', () => {
            recordLevelPermissionControllers.updateSpecificRecordLevelPermission(
                {
                    body:{
                        ...properValues,
                        permissionType:0
                    }
                },
                mockResponse(),
                mockNext
            )
        })

        
        it('updateSpecificRecordLevelPermission - improper get fails validation', () => {
            recordLevelPermissionControllers.updateSpecificRecordLevelPermission(
                {
                    body:{
                        ...properValues,
                        get:0
                    }
                },
                mockResponse(),
                mockNext
            )
        })

        
        it('updateSpecificRecordLevelPermission - improper update fails validation', () => {
            recordLevelPermissionControllers.updateSpecificRecordLevelPermission(
                {
                    body:{
                        ...properValues,
                        update:0
                    }
                },
                mockResponse(),
                mockNext
            )
        })

        
        it('updateSpecificRecordLevelPermission - improper delete fails validation', () => {
            recordLevelPermissionControllers.updateSpecificRecordLevelPermission(
                {
                    body:{
                        ...properValues,
                        delete:0
                    }
                },
                mockResponse(),
                mockNext
            )
        })

        
            
        it('patchRecordLevelPermissions - improper id fails validation', () => {
            recordLevelPermissionControllers.patchRecordLevelPermissions(
                {
                    body:[{
                        ...properValues,
                        id:"string"
                    }]
                },
                mockResponse(),
                mockNext
            )
        })

        
        it('patchRecordLevelPermissions - improper tableName fails validation', () => {
            recordLevelPermissionControllers.patchRecordLevelPermissions(
                {
                    body:[{
                        ...properValues,
                        tableName:0
                    }]
                },
                mockResponse(),
                mockNext
            )
        })

        
        it('patchRecordLevelPermissions - improper recordId fails validation', () => {
            recordLevelPermissionControllers.patchRecordLevelPermissions(
                {
                    body:[{
                        ...properValues,
                        recordId:"string"
                    }]
                },
                mockResponse(),
                mockNext
            )
        })

        
        it('patchRecordLevelPermissions - improper permissionType fails validation', () => {
            recordLevelPermissionControllers.patchRecordLevelPermissions(
                {
                    body:[{
                        ...properValues,
                        permissionType:0
                    }]
                },
                mockResponse(),
                mockNext
            )
        })

        
        it('patchRecordLevelPermissions - improper get fails validation', () => {
            recordLevelPermissionControllers.patchRecordLevelPermissions(
                {
                    body:[{
                        ...properValues,
                        get:0
                    }]
                },
                mockResponse(),
                mockNext
            )
        })

        
        it('patchRecordLevelPermissions - improper update fails validation', () => {
            recordLevelPermissionControllers.patchRecordLevelPermissions(
                {
                    body:[{
                        ...properValues,
                        update:0
                    }]
                },
                mockResponse(),
                mockNext
            )
        })

        
        it('patchRecordLevelPermissions - improper delete fails validation', () => {
            recordLevelPermissionControllers.patchRecordLevelPermissions(
                {
                    body:[{
                        ...properValues,
                        delete:0
                    }]
                },
                mockResponse(),
                mockNext
            )
        })

        
        it('patchSpecificRecordLevelPermission - improper id fails validation', () => {
            recordLevelPermissionControllers.patchSpecificRecordLevelPermission(
                {
                    body:{
                        ...patchSpecificProperValues,
                        id:"string"
                    }
                },
                mockResponse(),
                mockNext
            )
        })

        
        it('patchSpecificRecordLevelPermission - improper tableName fails validation', () => {
            recordLevelPermissionControllers.patchSpecificRecordLevelPermission(
                {
                    body:{
                        ...patchSpecificProperValues,
                        tableName:0
                    }
                },
                mockResponse(),
                mockNext
            )
        })

        
        it('patchSpecificRecordLevelPermission - improper recordId fails validation', () => {
            recordLevelPermissionControllers.patchSpecificRecordLevelPermission(
                {
                    body:{
                        ...patchSpecificProperValues,
                        recordId:"string"
                    }
                },
                mockResponse(),
                mockNext
            )
        })

        
        it('patchSpecificRecordLevelPermission - improper permissionType fails validation', () => {
            recordLevelPermissionControllers.patchSpecificRecordLevelPermission(
                {
                    body:{
                        ...patchSpecificProperValues,
                        permissionType:0
                    }
                },
                mockResponse(),
                mockNext
            )
        })

        
        it('patchSpecificRecordLevelPermission - improper get fails validation', () => {
            recordLevelPermissionControllers.patchSpecificRecordLevelPermission(
                {
                    body:{
                        ...patchSpecificProperValues,
                        get:0
                    }
                },
                mockResponse(),
                mockNext
            )
        })

        
        it('patchSpecificRecordLevelPermission - improper update fails validation', () => {
            recordLevelPermissionControllers.patchSpecificRecordLevelPermission(
                {
                    body:{
                        ...patchSpecificProperValues,
                        update:0
                    }
                },
                mockResponse(),
                mockNext
            )
        })

        
        it('patchSpecificRecordLevelPermission - improper delete fails validation', () => {
            recordLevelPermissionControllers.patchSpecificRecordLevelPermission(
                {
                    body:{
                        ...patchSpecificProperValues,
                        delete:0
                    }
                },
                mockResponse(),
                mockNext
            )
        })

        
            
    it('deleteRecordLevelPermissions - improper request fails validation', () => {
        recordLevelPermissionControllers.deleteRecordLevelPermissions(
            {
                body:[
                    "string"
                ]
            },
            mockResponse(),
            mockNext
        );
    });

    it('deleteSpecificRecordLevelPermission - improper id fails validation', () => {
        recordLevelPermissionControllers.deleteRecordLevelPermissions(
            {
                params:{
                    id:"string"
                }
            },
            mockResponse(),
            mockNext
        );
    });

        })
    