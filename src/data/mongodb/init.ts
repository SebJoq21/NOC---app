import mongoose from "mongoose";

interface ConnectionOptions {
    mongoUrl: string;
    dbName: string;
}

export class MongoDatabase {

    static async connect(options: ConnectionOptions) {
        const { mongoUrl, dbName } = options

        try {

            await mongoose.connect(mongoUrl, {
                dbName: dbName
            })

            console.log('Mongo connected!')
            
        } catch (error) {
            console.error("Mongo connect error:", error)
            throw error
        }
    }

}
