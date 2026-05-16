import mongoose from "mongoose";
import { MongoDatabase } from "../init";
import { LogModel } from "./log.model";

describe('Log.Model.test.ts', () => {

    beforeAll(async () => {

        await MongoDatabase.connect({
            mongoUrl: process.env.MONGO_URL!,
            dbName: process.env.DB_NAME!
        });

    });

    afterAll( () => {
        mongoose.connection.close();
    });

    test('should return LogModel', async() => {
        
        const logData = {
            level: 'low',
            message: 'test-message',
            origin: 'log.model.test.ts'
        } as const;

        const log = await LogModel.create( logData );

        expect( log ).toEqual( expect.objectContaining({
            ...logData,
            createdAt: expect.any(Date),
            id: expect.any(String)
        }) )

        await LogModel.findByIdAndDelete( log.id )

    });


    test('Should return schema object', () => {

        const schema = LogModel.schema.obj
        
        expect( schema ).toEqual( expect.objectContaining({
            level: {
                type: String, 
                enum: [ 'low', 'medium', 'high' ],
                default: 'low'
            },
            message: { 
                type: String, 
                required: true 
            },
            origin: { 
                type: String 
            },
            createdAt: expect.objectContaining({ 
                type: Date
            })
        }));

    })

});


