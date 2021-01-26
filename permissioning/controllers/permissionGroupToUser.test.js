
        const dependencyInjector = require('../dependency-injector.js');
        dependencyInjector.register(
            'permissionGroupToUserService', 
            {
                getPermissionGroupToUsers: () => true,
                getSpecificPermissionGroupToUser: () => true,
                postPermissionGroupToUser: () => true,
                updatePermissionGroupToUsers: () => true,
                updateSpecificPermissionGroupToUser: () => true,
                patchPermissionGroupToUsers: () => true,
                patchSpecificPermissionGroupToUser: () => true,
                deletePermissionGroupToUsers: () => true,
                deleteSpecificPermissionGroupToUser: () => true
            }
        );
        const permissionGroupToUserControllers = require('./permissionGroupToUser');

        const properValues = {"id":1,"userId":"string","groupId":0};
        const patchSpecificProperValues = {"userId":"string","groupId":0}

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

        describe('permissionGroupToUser controller tests', () => {
            
    it('getPermissionGroupToUsers - improper offset fails validation', () => {
        permissionGroupToUserControllers.getPermissionGroupToUsers(
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
    it('getPermissionGroupToUsers - improper limit fails validation', () => {
        permissionGroupToUserControllers.getPermissionGroupToUsers(
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
    it('getPermissionGroupToUsers - improper fields fails validation', () => {
        permissionGroupToUserControllers.getPermissionGroupToUsers(
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

    it('getSpecificPermissionGroupToUser - improper id fails validation', () => {
        permissionGroupToUserControllers.getPermissionGroupToUsers(
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
    it('getSpecificPermissionGroupToUser - improper fields fails validation', () => {
        permissionGroupToUserControllers.getPermissionGroupToUsers(
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

            
        it('postPermissionGroupToUser - improper id fails validation', () => {
            permissionGroupToUserControllers.postPermissionGroupToUser(
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
        
        
        it('postPermissionGroupToUser - improper userId fails validation', () => {
            permissionGroupToUserControllers.postPermissionGroupToUser(
                {
                    body:{
                        ...properValues,
                        userId:0
                    }
                },
                mockResponse(),
                mockNext
            )
        });
        
        
        it('postPermissionGroupToUser - improper groupId fails validation', () => {
            permissionGroupToUserControllers.postPermissionGroupToUser(
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
        
        
            
        it('updatePermissionGroupToUsers - improper id fails validation', () => {
            permissionGroupToUserControllers.updatePermissionGroupToUsers(
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

        
        it('updatePermissionGroupToUsers - improper userId fails validation', () => {
            permissionGroupToUserControllers.updatePermissionGroupToUsers(
                {
                    body:[{
                        ...properValues,
                        userId:0
                    }]
                },
                mockResponse(),
                mockNext
            )
        })

        
        it('updatePermissionGroupToUsers - improper groupId fails validation', () => {
            permissionGroupToUserControllers.updatePermissionGroupToUsers(
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

        
        it('updateSpecificPermissionGroupToUser - improper id fails validation', () => {
            permissionGroupToUserControllers.updateSpecificPermissionGroupToUser(
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

        
        it('updateSpecificPermissionGroupToUser - improper userId fails validation', () => {
            permissionGroupToUserControllers.updateSpecificPermissionGroupToUser(
                {
                    body:{
                        ...properValues,
                        userId:0
                    }
                },
                mockResponse(),
                mockNext
            )
        })

        
        it('updateSpecificPermissionGroupToUser - improper groupId fails validation', () => {
            permissionGroupToUserControllers.updateSpecificPermissionGroupToUser(
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

        
            
        it('patchPermissionGroupToUsers - improper id fails validation', () => {
            permissionGroupToUserControllers.patchPermissionGroupToUsers(
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

        
        it('patchPermissionGroupToUsers - improper userId fails validation', () => {
            permissionGroupToUserControllers.patchPermissionGroupToUsers(
                {
                    body:[{
                        ...properValues,
                        userId:0
                    }]
                },
                mockResponse(),
                mockNext
            )
        })

        
        it('patchPermissionGroupToUsers - improper groupId fails validation', () => {
            permissionGroupToUserControllers.patchPermissionGroupToUsers(
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

        
        it('patchSpecificPermissionGroupToUser - improper id fails validation', () => {
            permissionGroupToUserControllers.patchSpecificPermissionGroupToUser(
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

        
        it('patchSpecificPermissionGroupToUser - improper userId fails validation', () => {
            permissionGroupToUserControllers.patchSpecificPermissionGroupToUser(
                {
                    body:{
                        ...patchSpecificProperValues,
                        userId:0
                    }
                },
                mockResponse(),
                mockNext
            )
        })

        
        it('patchSpecificPermissionGroupToUser - improper groupId fails validation', () => {
            permissionGroupToUserControllers.patchSpecificPermissionGroupToUser(
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

        
            
    it('deletePermissionGroupToUsers - improper request fails validation', () => {
        permissionGroupToUserControllers.deletePermissionGroupToUsers(
            {
                body:[
                    "string"
                ]
            },
            mockResponse(),
            mockNext
        );
    });

    it('deleteSpecificPermissionGroupToUser - improper id fails validation', () => {
        permissionGroupToUserControllers.deletePermissionGroupToUsers(
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
    