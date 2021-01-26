
        const dependencyInjector = require('../dependency-injector.js');
        dependencyInjector.register(
            'groupService', 
            {
                getGroups: () => true,
                getSpecificGroup: () => true,
                postGroup: () => true,
                updateGroups: () => true,
                updateSpecificGroup: () => true,
                patchGroups: () => true,
                patchSpecificGroup: () => true,
                deleteGroups: () => true,
                deleteSpecificGroup: () => true
            }
        );
        const groupControllers = require('./group');

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

        describe('group controller tests', () => {
            
    it('getGroups - improper offset fails validation', () => {
        groupControllers.getGroups(
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
    it('getGroups - improper limit fails validation', () => {
        groupControllers.getGroups(
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
    it('getGroups - improper fields fails validation', () => {
        groupControllers.getGroups(
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

    it('getSpecificGroup - improper id fails validation', () => {
        groupControllers.getGroups(
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
    it('getSpecificGroup - improper fields fails validation', () => {
        groupControllers.getGroups(
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

            
        it('postGroup - improper id fails validation', () => {
            groupControllers.postGroup(
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
        
        
        it('postGroup - improper name fails validation', () => {
            groupControllers.postGroup(
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
        
        
        it('postGroup - improper description fails validation', () => {
            groupControllers.postGroup(
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
        
        
            
        it('updateGroups - improper id fails validation', () => {
            groupControllers.updateGroups(
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

        
        it('updateGroups - improper name fails validation', () => {
            groupControllers.updateGroups(
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

        
        it('updateGroups - improper description fails validation', () => {
            groupControllers.updateGroups(
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

        
        it('updateSpecificGroup - improper id fails validation', () => {
            groupControllers.updateSpecificGroup(
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

        
        it('updateSpecificGroup - improper name fails validation', () => {
            groupControllers.updateSpecificGroup(
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

        
        it('updateSpecificGroup - improper description fails validation', () => {
            groupControllers.updateSpecificGroup(
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

        
            
        it('patchGroups - improper id fails validation', () => {
            groupControllers.patchGroups(
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

        
        it('patchGroups - improper name fails validation', () => {
            groupControllers.patchGroups(
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

        
        it('patchGroups - improper description fails validation', () => {
            groupControllers.patchGroups(
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

        
        it('patchSpecificGroup - improper id fails validation', () => {
            groupControllers.patchSpecificGroup(
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

        
        it('patchSpecificGroup - improper name fails validation', () => {
            groupControllers.patchSpecificGroup(
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

        
        it('patchSpecificGroup - improper description fails validation', () => {
            groupControllers.patchSpecificGroup(
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

        
            
    it('deleteGroups - improper request fails validation', () => {
        groupControllers.deleteGroups(
            {
                body:[
                    "string"
                ]
            },
            mockResponse(),
            mockNext
        );
    });

    it('deleteSpecificGroup - improper id fails validation', () => {
        groupControllers.deleteGroups(
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
    