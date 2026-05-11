import { Server } from './presentation/server'
import { LogModel, MongoDatabase } from './data/mongodb'
import { envs } from './config/plugins/envs.plugin'

(async() => {
    main()
})()

async function main() {

    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    })

    // Crear un registro 
    /* const newLog = await LogModel.create({
        message:'Test message from MongoDB',
        origin:'App.ts',
        level: 'low'
    })*/

    /*await newLog.save();
    console.log('Log creado:', newLog);*/

    //Server.start()
    //console.log( envs )
}
