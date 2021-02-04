
        const dependencyInjector = require('../dependency-injector.js');
        dependencyInjector.register(
            'permissionGroupToPermissionService', 
            () => ({
                getPermissionGroupToPermissions: () => true,
                getSpecificPermissionGroupToPermission: () => true,
                postPermissionGroupToPermission: () => true,
                updatePermissionGroupToPermissions: () => true,
                updateSpecificPermissionGroupToPermission: () => true,
                patchPermissionGroupToPermissions: () => true,
                patchSpecificPermissionGroupToPermission: () => true,
                deletePermissionGroupToPermissions: () => true,
                deleteSpecificPermissionGroupToPermission: () => true
            })
        );
        const permissionGroupToPermissionControllers = require('./permissionGroupToPermission');

        const properValues = {"id":1,"groupId":0,"permissionId":0};
        const patchSpecificProperValues = {"groupId":0,"permissionId":0}

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

        describe('permissionGroupToPermission controller tests', () => {
            
    it('getPermissionGroupToPermissions - improper offset fails validation', () => {
        permissionGroupToPermissionControllers.getPermissionGroupToPermissions(
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
    it('getPermissionGroupToPermissions - improper limit fails validation', () => {
        permissionGroupToPermissionControllers.getPermissionGroupToPermissions(
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
    it('getPermissionGroupToPermissions - improper fields fails validation', () => {
        permissionGroupToPermissionControllers.getPermissionGroupToPermissions(
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

    it('getSpecificPermissionGroupToPermission - improper id fails validation', () => {
        permissionGroupToPermissionControllers.getPermissionGroupToPermissions(
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
    it('getSpecificPermissionGroupToPermission - improper fields fails validation', () => {
        permissionGroupToPermissionControllers.getPermissionGroupToPermissions(
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

            
        it('postPermissionGroupToPermission - improper id fails validation', () => {
            permissionGroupToPermissionControllers.postPermissionGroupToPermission(
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
        
        
        it('postPermissionGroupToPermission - improper groupId fails validation', () => {
            permissionGroupToPermissionControllers.postPermissionGroupToPermission(
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
        
        
        it('postPermissionGroupToPermission - improper permissionId fails validation', () => {
            permissionGroupToPermissionControllers.postPermissionGroupToPermission(
                {
                    body:{
                        ...properValues,
                        permissionId:"string"
                    }
                },
                mockResponse(),
                mockNext
            )
        });
        
        
            
        it('updatePermissionGroupToPermissions - improper id fails validation', () => {
            permissionGroupToPermissionControllers.updatePermissionGroupToPermissions(
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

        
        it('updatePermissionGroupToPermissions - improper groupId fails validation', () => {
            permissionGroupToPermissionControllers.updatePermissionGroupToPermissions(
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

        
        it('updatePermissionGroupToPermissions - improper permissionId fails validation', () => {
            permissionGroupToPermissionControllers.updatePermissionGroupToPermissions(
                {
                    body:[{
                        ...properValues,
                        permissionId:"string"
                    }]
                },
                mockResponse(),
                mockNext
            )
        })

        
        it('updateSpecificPermissionGroupToPermission - improper id fails validation', () => {
            permissionGroupToPermissionControllers.updateSpecificPermissionGroupToPermission(
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

        
        it('updateSpecificPermissionGroupToPermission - improper groupId fails validation', () => {
            permissionGroupToPermissionControllers.updateSpecificPermissionGroupToPermission(
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

        
        it('updateSpecificPermissionGroupToPermission - improper permissionId fails validation', () => {
            permissionGroupToPermissionControllers.updateSpecificPermissionGroupToPermission(
                {
                    body:{
                        ...properValues,
                        permissionId:"string"
                    }
                },
                mockResponse(),
                mockNext
            )
        })

        
            
        it('patchPermissionGroupToPermissions - improper id fails validation', () => {
            permissionGroupToPermissionControllers.patchPermissionGroupToPermissions(
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

        
        it('patchPermissionGroupToPermissions - improper groupId fails validation', () => {
            permissionGroupToPermissionControllers.patchPermissionGroupToPermissions(
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

        
        it('patchPermissionGroupToPermissions - improper permissionId fails validation', () => {
            permissionGroupToPermissionControllers.patchPermissionGroupToPermissions(
                {
                    body:[{
                        ...properValues,
                        permissionId:"string"
                    }]
                },
                mockResponse(),
                mockNext
            )
        })

        
        it('patchSpecificPermissionGroupToPermission - improper id fails validation', () => {
            permissionGroupToPermissionControllers.patchSpecificPermissionGroupToPermission(
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

        
        it('patchSpecificPermissionGroupToPermission - improper groupId fails validation', () => {
            permissionGroupToPermissionControllers.patchSpecificPermissionGroupToPermission(
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

        
        it('patchSpecificPermissionGroupToPermission - improper permissionId fails validation', () => {
            permissionGroupToPermissionControllers.patchSpecificPermissionGroupToPermission(
                {
                    body:{
                        ...patchSpecificProperValues,
                        permissionId:"string"
                    }
                },
                mockResponse(),
                mockNext
            )
        })

        
            
    it('deletePermissionGroupToPermissions - improper request fails validation', () => {
        permissionGroupToPermissionControllers.deletePermissionGroupToPermissions(
            {
                body:[
                    "string"
                ]
            },
            mockResponse(),
            mockNext
        );
    });

    it('deleteSpecificPermissionGroupToPermission - improper id fails validation', () => {
        permissionGroupToPermissionControllers.deletePermissionGroupToPermissions(
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
    