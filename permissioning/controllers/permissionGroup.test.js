
        const dependencyInjector = require('../dependency-injector.js');
        dependencyInjector.register(
            'permissionGroupService', 
            {
                getPermissionGroups: () => true,
                getSpecificPermissionGroup: () => true,
                postPermissionGroup: () => true,
                updatePermissionGroups: () => true,
                updateSpecificPermissionGroup: () => true,
                patchPermissionGroups: () => true,
                patchSpecificPermissionGroup: () => true,
                deletePermissionGroups: () => true,
                deleteSpecificPermissionGroup: () => true
            }
        );
        const permissionGroupControllers = require('./permissionGroup');

        const properValues = {"id":1,"name":"string","description":"string"};
        const patchSpecificProperValues = {"name":"string","description":"string"}

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

        describe('permissionGroup controller tests', () => {
            
    it('getPermissionGroups - improper offset fails validation', () => {
        permissionGroupControllers.getPermissionGroups(
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
    it('getPermissionGroups - improper limit fails validation', () => {
        permissionGroupControllers.getPermissionGroups(
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
    it('getPermissionGroups - improper fields fails validation', () => {
        permissionGroupControllers.getPermissionGroups(
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

    it('getSpecificPermissionGroup - improper id fails validation', () => {
        permissionGroupControllers.getPermissionGroups(
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
    it('getSpecificPermissionGroup - improper fields fails validation', () => {
        permissionGroupControllers.getPermissionGroups(
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

            
        it('postPermissionGroup - improper id fails validation', () => {
            permissionGroupControllers.postPermissionGroup(
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
        
        
        it('postPermissionGroup - improper name fails validation', () => {
            permissionGroupControllers.postPermissionGroup(
                {
                    body:{
                        ...properValues,
                        name:0
                    }
                },
                mockResponse(),
                mockNext
            )
        });
        
        
        it('postPermissionGroup - improper description fails validation', () => {
            permissionGroupControllers.postPermissionGroup(
                {
                    body:{
                        ...properValues,
                        description:0
                    }
                },
                mockResponse(),
                mockNext
            )
        });
        
        
            
        it('updatePermissionGroups - improper id fails validation', () => {
            permissionGroupControllers.updatePermissionGroups(
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

        
        it('updatePermissionGroups - improper name fails validation', () => {
            permissionGroupControllers.updatePermissionGroups(
                {
                    body:[{
                        ...properValues,
                        name:0
                    }]
                },
                mockResponse(),
                mockNext
            )
        })

        
        it('updatePermissionGroups - improper description fails validation', () => {
            permissionGroupControllers.updatePermissionGroups(
                {
                    body:[{
                        ...properValues,
                        description:0
                    }]
                },
                mockResponse(),
                mockNext
            )
        })

        
        it('updateSpecificPermissionGroup - improper id fails validation', () => {
            permissionGroupControllers.updateSpecificPermissionGroup(
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

        
        it('updateSpecificPermissionGroup - improper name fails validation', () => {
            permissionGroupControllers.updateSpecificPermissionGroup(
                {
                    body:{
                        ...properValues,
                        name:0
                    }
                },
                mockResponse(),
                mockNext
            )
        })

        
        it('updateSpecificPermissionGroup - improper description fails validation', () => {
            permissionGroupControllers.updateSpecificPermissionGroup(
                {
                    body:{
                        ...properValues,
                        description:0
                    }
                },
                mockResponse(),
                mockNext
            )
        })

        
            
        it('patchPermissionGroups - improper id fails validation', () => {
            permissionGroupControllers.patchPermissionGroups(
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

        
        it('patchPermissionGroups - improper name fails validation', () => {
            permissionGroupControllers.patchPermissionGroups(
                {
                    body:[{
                        ...properValues,
                        name:0
                    }]
                },
                mockResponse(),
                mockNext
            )
        })

        
        it('patchPermissionGroups - improper description fails validation', () => {
            permissionGroupControllers.patchPermissionGroups(
                {
                    body:[{
                        ...properValues,
                        description:0
                    }]
                },
                mockResponse(),
                mockNext
            )
        })

        
        it('patchSpecificPermissionGroup - improper id fails validation', () => {
            permissionGroupControllers.patchSpecificPermissionGroup(
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

        
        it('patchSpecificPermissionGroup - improper name fails validation', () => {
            permissionGroupControllers.patchSpecificPermissionGroup(
                {
                    body:{
                        ...patchSpecificProperValues,
                        name:0
                    }
                },
                mockResponse(),
                mockNext
            )
        })

        
        it('patchSpecificPermissionGroup - improper description fails validation', () => {
            permissionGroupControllers.patchSpecificPermissionGroup(
                {
                    body:{
                        ...patchSpecificProperValues,
                        description:0
                    }
                },
                mockResponse(),
                mockNext
            )
        })

        
            
    it('deletePermissionGroups - improper request fails validation', () => {
        permissionGroupControllers.deletePermissionGroups(
            {
                body:[
                    "string"
                ]
            },
            mockResponse(),
            mockNext
        );
    });

    it('deleteSpecificPermissionGroup - improper id fails validation', () => {
        permissionGroupControllers.deletePermissionGroups(
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
    