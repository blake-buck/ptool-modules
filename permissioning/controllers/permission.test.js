
        const dependencyInjector = require('../dependency-injector.js');
        dependencyInjector.register(
            'permissionService', 
            () => ({
                getPermissions: () => true,
                getSpecificPermission: () => true,
                postPermission: () => true,
                updatePermissions: () => true,
                updateSpecificPermission: () => true,
                patchPermissions: () => true,
                patchSpecificPermission: () => true,
                deletePermissions: () => true,
                deleteSpecificPermission: () => true
            })
        );
        const permissionControllers = require('./permission');

        const properValues = {"id":1,"name":"string","description":"TEST_MODIFY"};
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

        describe('permission controller tests', () => {
            
    it('getPermissions - improper offset fails validation', () => {
        permissionControllers.getPermissions(
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
    it('getPermissions - improper limit fails validation', () => {
        permissionControllers.getPermissions(
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
    it('getPermissions - improper fields fails validation', () => {
        permissionControllers.getPermissions(
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

    it('getSpecificPermission - improper id fails validation', () => {
        permissionControllers.getPermissions(
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
    it('getSpecificPermission - improper fields fails validation', () => {
        permissionControllers.getPermissions(
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

            
        it('postPermission - improper id fails validation', () => {
            permissionControllers.postPermission(
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
        
        
        it('postPermission - improper name fails validation', () => {
            permissionControllers.postPermission(
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
        
        
        it('postPermission - improper description fails validation', () => {
            permissionControllers.postPermission(
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
        
        
            
        it('updatePermissions - improper id fails validation', () => {
            permissionControllers.updatePermissions(
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

        
        it('updatePermissions - improper name fails validation', () => {
            permissionControllers.updatePermissions(
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

        
        it('updatePermissions - improper description fails validation', () => {
            permissionControllers.updatePermissions(
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

        
        it('updateSpecificPermission - improper id fails validation', () => {
            permissionControllers.updateSpecificPermission(
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

        
        it('updateSpecificPermission - improper name fails validation', () => {
            permissionControllers.updateSpecificPermission(
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

        
        it('updateSpecificPermission - improper description fails validation', () => {
            permissionControllers.updateSpecificPermission(
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

        
            
        it('patchPermissions - improper id fails validation', () => {
            permissionControllers.patchPermissions(
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

        
        it('patchPermissions - improper name fails validation', () => {
            permissionControllers.patchPermissions(
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

        
        it('patchPermissions - improper description fails validation', () => {
            permissionControllers.patchPermissions(
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

        
        it('patchSpecificPermission - improper id fails validation', () => {
            permissionControllers.patchSpecificPermission(
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

        
        it('patchSpecificPermission - improper name fails validation', () => {
            permissionControllers.patchSpecificPermission(
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

        
        it('patchSpecificPermission - improper description fails validation', () => {
            permissionControllers.patchSpecificPermission(
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

        
            
    it('deletePermissions - improper request fails validation', () => {
        permissionControllers.deletePermissions(
            {
                body:[
                    "string"
                ]
            },
            mockResponse(),
            mockNext
        );
    });

    it('deleteSpecificPermission - improper id fails validation', () => {
        permissionControllers.deletePermissions(
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
    