const exampleControllers = require('./example');

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

describe('example controllers tests', () => {
    const improperLimit = 'not a number';
    const improperOffset = 'not a number';
    const improperFields = 'id, --DROP TABLE example';
    const improperId = 'not a number'
    const improperDescription = 12345;
    const improperStatus = 'not a number';

    const properLimit = 10;
    const properOffset = 5;
    const properFields = 'id,description,status';
    const properId = 1;
    const properDescription = 'Proper description';
    const properStatus = 1;

    it('getExamples improper limit should fail validation', () => {
        const result = exampleControllers.getExamples(
            {
                query:{},
                body:{},
                params:{
                    limit: improperLimit,
                    offset: properOffset,
                    fields:properFields
                }
            },
            mockResponse(),
            mockNext
        );
    })
    it('getExamples improper offset should fail validation', () => {
        const result = exampleControllers.getExamples(
            {
                query:{},
                body:{},
                params:{
                    limit: properLimit,
                    offset: improperOffset,
                    fields:properFields
                }
            },
            mockResponse(),
            mockNext
        );
    })
    it('getExamples improper fields should fail validation', () => {
        const result = exampleControllers.getExamples(
            {
                query:{},
                body:{},
                params:{
                    limit: properLimit,
                    offset: properOffset,
                    fields: improperFields
                }
            },
            mockResponse(),
            mockNext
        );
    })

    it('getSpecificExample improper id should fail validation', () => {
        const result = exampleControllers.getSpecificExample(
            {
                query:{
                    id: improperId
                },
                body:{},
                params:{
                    fields: properFields
                }
            },
            mockResponse(),
            mockNext
        );
    })
    it('getSpecificExample improper fields should fail validation', () => {
        const result = exampleControllers.getSpecificExample(
            {
                query:{
                    id: properId
                },
                body:{},
                params:{
                    fields: improperFields
                }
            },
            mockResponse(),
            mockNext
        );
    })

    it('postExample improper description should fail validation', () => {
        const result = exampleControllers.postExample(
            {
                query:{},
                body:{
                    description: improperDescription,
                    status: properStatus
                },
                params:{}
            },
            mockResponse(),
            mockNext
        );
    })
    it('postExample improper status should fail validation', () => {
        const result = exampleControllers.postExample(
            {
                query:{},
                body:{
                    description: properDescription,
                    status: improperStatus
                },
                params:{}
            },
            mockResponse(),
            mockNext
        );
    })

    it('updateExamples non-array request should fail validation', () => {
        const result = exampleControllers.updateExamples(
            {
                query:{},
                body:{},
                params:{}
            },
            mockResponse(),
            mockNext
        );
    })
    it('updateExamples improper id should fail validation', () => {
        const result = exampleControllers.updateExamples(
            {
                query:{},
                body:[
                    {
                        id: improperId,
                        description: properDescription,
                        status: properStatus
                    }
                ],
                params:{}
            },
            mockResponse(),
            mockNext
        );
    })
    it('updateExamples improper description should fail validation', () => {
        const result = exampleControllers.updateExamples(
            {
                query:{},
                body:[
                    {
                        id: properId,
                        description: improperDescription,
                        status: properStatus
                    }
                ],
                params:{}
            },
            mockResponse(),
            mockNext
        );
    })
    it('updateExamples improper status should fail validation', () => {
        const result = exampleControllers.updateExamples(
            {
                query:{},
                body:[
                    {
                        id: properId,
                        description: properDescription,
                        status: improperStatus
                    }
                ],
                params:{}
            },
            mockResponse(),
            mockNext
        );
    })

    it('updateSpecificExample improper id should fail validation', () => {
        const result = exampleControllers.updateSpecificExample(
            {
                query:{},
                body:{
                    id: improperId,
                    description: properDescription,
                    status: properStatus
                },
                params:{
                    id: improperId
                }
            },
            mockResponse(),
            mockNext
        );
    })
    it('updateSpecificExample improper description should fail validation', () => {
        const result = exampleControllers.updateSpecificExample(
            {
                query:{},
                body:{
                    id: properId,
                    description: improperDescription,
                    status: properStatus
                },
                params:{
                    id: properId
                }
            },
            mockResponse(),
            mockNext
        );
    })
    it('updateSpecificExample improper status should fail validation', () => {
        const result = exampleControllers.updateSpecificExample(
            {
                query:{},
                body:{
                    id: properId,
                    description: properDescription,
                    status: improperStatus
                },
                params:{
                    id: properId
                }
            },
            mockResponse(),
            mockNext
        );
    })

    it('deleteExamples non-array request should fail validation', () => {
        const result = exampleControllers.deleteExamples(
            {
                query:{},
                body:{},
                params:{}
            },
            mockResponse(),
            mockNext
        );
    })
    it('deleteExamples improper id should fail validation', () => {
        const result = exampleControllers.deleteExamples(
            {
                query:{},
                body:[
                    improperId
                ],
                params:{}
            },
            mockResponse(),
            mockNext
        );
    })

    it('deleteSpecificExample improper id should fail validation', () => {
        const result = exampleControllers.deleteSpecificExample(
            {
                query:{},
                body:{},
                params:{
                    id: improperId
                }
            },
            mockResponse(),
            mockNext
        );
    })
}) 