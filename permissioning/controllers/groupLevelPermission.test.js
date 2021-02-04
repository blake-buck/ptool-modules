
        const dependencyInjector = require('../dependency-injector.js');
        dependencyInjector.register(
            'groupLevelPermissionService', 
            () => ({
                getGroupLevelPermissions: () => true,
                getSpecificGroupLevelPermission: () => true,
                postGroupLevelPermission: () => true,
                updateGroupLevelPermissions: () => true,
                updateSpecificGroupLevelPermission: () => true,
                patchGroupLevelPermissions: () => true,
                patchSpecificGroupLevelPermission: () => true,
                deleteGroupLevelPermissions: () => true,
                deleteSpecificGroupLevelPermission: () => true
            })
        );
        const groupLevelPermissionControllers = require('./groupLevelPermission');

        const properValues = {"id":1,"tableName":"string","groupId":0,"permissionType":"string","granteeId":"string","get":0,"post":0};
        const patchSpecificProperValues = {"tableName":"string","groupId":0,"permissionType":"string","granteeId":"string","get":0,"post":0}

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

        describe('groupLevelPermission controller tests', () => {
            
    it('getGroupLevelPermissions - improper offset fails validation', () => {
        groupLevelPermissionControllers.getGroupLevelPermissions(
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
    it('getGroupLevelPermissions - improper limit fails validation', () => {
        groupLevelPermissionControllers.getGroupLevelPermissions(
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
    it('getGroupLevelPermissions - improper fields fails validation', () => {
        groupLevelPermissionControllers.getGroupLevelPermissions(
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

    it('getSpecificGroupLevelPermission - improper id fails validation', () => {
        groupLevelPermissionControllers.getGroupLevelPermissions(
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
    it('getSpecificGroupLevelPermission - improper fields fails validation', () => {
        groupLevelPermissionControllers.getGroupLevelPermissions(
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

            
        it('postGroupLevelPermission - improper id fails validation', () => {
            groupLevelPermissionControllers.postGroupLevelPermission(
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
        
        
        it('postGroupLevelPermission - improper tableName fails validation', () => {
            groupLevelPermissionControllers.postGroupLevelPermission(
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
        
        
        it('postGroupLevelPermission - improper groupId fails validation', () => {
            groupLevelPermissionControllers.postGroupLevelPermission(
                {
                    body:{
                        ...properValues,
                        groupId:"string"
                    }
                },
                mockResponse(),
                mockNext
            )
        });
        
        
        it('postGroupLevelPermission - improper permissionType fails validation', () => {
            groupLevelPermissionControllers.postGroupLevelPermission(
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
        
        
        it('postGroupLevelPermission - improper granteeId fails validation', () => {
            groupLevelPermissionControllers.postGroupLevelPermission(
                {
                    body:{
                        ...properValues,
                        granteeId:0
                    }
                },
                mockResponse(),
                mockNext
            )
        });
        
        
        it('postGroupLevelPermission - improper get fails validation', () => {
            groupLevelPermissionControllers.postGroupLevelPermission(
                {
                    body:{
                        ...properValues,
                        get:"string"
                    }
                },
                mockResponse(),
                mockNext
            )
        });
        
        
        it('postGroupLevelPermission - improper post fails validation', () => {
            groupLevelPermissionControllers.postGroupLevelPermission(
                {
                    body:{
                        ...properValues,
                        post:"string"
                    }
                },
                mockResponse(),
                mockNext
            )
        });
        
        
            
        it('updateGroupLevelPermissions - improper id fails validation', () => {
            groupLevelPermissionControllers.updateGroupLevelPermissions(
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

        
        it('updateGroupLevelPermissions - improper tableName fails validation', () => {
            groupLevelPermissionControllers.updateGroupLevelPermissions(
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

        
        it('updateGroupLevelPermissions - improper groupId fails validation', () => {
            groupLevelPermissionControllers.updateGroupLevelPermissions(
                {
                    body:[{
                        ...properValues,
                        groupId:"string"
                    }]
                },
                mockResponse(),
                mockNext
            )
        })

        
        it('updateGroupLevelPermissions - improper permissionType fails validation', () => {
            groupLevelPermissionControllers.updateGroupLevelPermissions(
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

        
        it('updateGroupLevelPermissions - improper granteeId fails validation', () => {
            groupLevelPermissionControllers.updateGroupLevelPermissions(
                {
                    body:[{
                        ...properValues,
                        granteeId:0
                    }]
                },
                mockResponse(),
                mockNext
            )
        })

        
        it('updateGroupLevelPermissions - improper get fails validation', () => {
            groupLevelPermissionControllers.updateGroupLevelPermissions(
                {
                    body:[{
                        ...properValues,
                        get:"string"
                    }]
                },
                mockResponse(),
                mockNext
            )
        })

        
        it('updateGroupLevelPermissions - improper post fails validation', () => {
            groupLevelPermissionControllers.updateGroupLevelPermissions(
                {
                    body:[{
                        ...properValues,
                        post:"string"
                    }]
                },
                mockResponse(),
                mockNext
            )
        })

        
        it('updateSpecificGroupLevelPermission - improper id fails validation', () => {
            groupLevelPermissionControllers.updateSpecificGroupLevelPermission(
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

        
        it('updateSpecificGroupLevelPermission - improper tableName fails validation', () => {
            groupLevelPermissionControllers.updateSpecificGroupLevelPermission(
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

        
        it('updateSpecificGroupLevelPermission - improper groupId fails validation', () => {
            groupLevelPermissionControllers.updateSpecificGroupLevelPermission(
                {
                    body:{
                        ...properValues,
                        groupId:"string"
                    }
                },
                mockResponse(),
                mockNext
            )
        })

        
        it('updateSpecificGroupLevelPermission - improper permissionType fails validation', () => {
            groupLevelPermissionControllers.updateSpecificGroupLevelPermission(
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

        
        it('updateSpecificGroupLevelPermission - improper granteeId fails validation', () => {
            groupLevelPermissionControllers.updateSpecificGroupLevelPermission(
                {
                    body:{
                        ...properValues,
                        granteeId:0
                    }
                },
                mockResponse(),
                mockNext
            )
        })

        
        it('updateSpecificGroupLevelPermission - improper get fails validation', () => {
            groupLevelPermissionControllers.updateSpecificGroupLevelPermission(
                {
                    body:{
                        ...properValues,
                        get:"string"
                    }
                },
                mockResponse(),
                mockNext
            )
        })

        
        it('updateSpecificGroupLevelPermission - improper post fails validation', () => {
            groupLevelPermissionControllers.updateSpecificGroupLevelPermission(
                {
                    body:{
                        ...properValues,
                        post:"string"
                    }
                },
                mockResponse(),
                mockNext
            )
        })

        
            
        it('patchGroupLevelPermissions - improper id fails validation', () => {
            groupLevelPermissionControllers.patchGroupLevelPermissions(
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

        
        it('patchGroupLevelPermissions - improper tableName fails validation', () => {
            groupLevelPermissionControllers.patchGroupLevelPermissions(
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

        
        it('patchGroupLevelPermissions - improper groupId fails validation', () => {
            groupLevelPermissionControllers.patchGroupLevelPermissions(
                {
                    body:[{
                        ...properValues,
                        groupId:"string"
                    }]
                },
                mockResponse(),
                mockNext
            )
        })

        
        it('patchGroupLevelPermissions - improper permissionType fails validation', () => {
            groupLevelPermissionControllers.patchGroupLevelPermissions(
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

        
        it('patchGroupLevelPermissions - improper granteeId fails validation', () => {
            groupLevelPermissionControllers.patchGroupLevelPermissions(
                {
                    body:[{
                        ...properValues,
                        granteeId:0
                    }]
                },
                mockResponse(),
                mockNext
            )
        })

        
        it('patchGroupLevelPermissions - improper get fails validation', () => {
            groupLevelPermissionControllers.patchGroupLevelPermissions(
                {
                    body:[{
                        ...properValues,
                        get:"string"
                    }]
                },
                mockResponse(),
                mockNext
            )
        })

        
        it('patchGroupLevelPermissions - improper post fails validation', () => {
            groupLevelPermissionControllers.patchGroupLevelPermissions(
                {
                    body:[{
                        ...properValues,
                        post:"string"
                    }]
                },
                mockResponse(),
                mockNext
            )
        })

        
        it('patchSpecificGroupLevelPermission - improper id fails validation', () => {
            groupLevelPermissionControllers.patchSpecificGroupLevelPermission(
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

        
        it('patchSpecificGroupLevelPermission - improper tableName fails validation', () => {
            groupLevelPermissionControllers.patchSpecificGroupLevelPermission(
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

        
        it('patchSpecificGroupLevelPermission - improper groupId fails validation', () => {
            groupLevelPermissionControllers.patchSpecificGroupLevelPermission(
                {
                    body:{
                        ...patchSpecificProperValues,
                        groupId:"string"
                    }
                },
                mockResponse(),
                mockNext
            )
        })

        
        it('patchSpecificGroupLevelPermission - improper permissionType fails validation', () => {
            groupLevelPermissionControllers.patchSpecificGroupLevelPermission(
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

        
        it('patchSpecificGroupLevelPermission - improper granteeId fails validation', () => {
            groupLevelPermissionControllers.patchSpecificGroupLevelPermission(
                {
                    body:{
                        ...patchSpecificProperValues,
                        granteeId:0
                    }
                },
                mockResponse(),
                mockNext
            )
        })

        
        it('patchSpecificGroupLevelPermission - improper get fails validation', () => {
            groupLevelPermissionControllers.patchSpecificGroupLevelPermission(
                {
                    body:{
                        ...patchSpecificProperValues,
                        get:"string"
                    }
                },
                mockResponse(),
                mockNext
            )
        })

        
        it('patchSpecificGroupLevelPermission - improper post fails validation', () => {
            groupLevelPermissionControllers.patchSpecificGroupLevelPermission(
                {
                    body:{
                        ...patchSpecificProperValues,
                        post:"string"
                    }
                },
                mockResponse(),
                mockNext
            )
        })

        
            
    it('deleteGroupLevelPermissions - improper request fails validation', () => {
        groupLevelPermissionControllers.deleteGroupLevelPermissions(
            {
                body:[
                    "string"
                ]
            },
            mockResponse(),
            mockNext
        );
    });

    it('deleteSpecificGroupLevelPermission - improper id fails validation', () => {
        groupLevelPermissionControllers.deleteGroupLevelPermissions(
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
    