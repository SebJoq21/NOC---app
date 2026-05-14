import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { Server } from './presentation/server'
import { LogModel, MongoDatabase } from './data/mongodb'
import { envs } from './config/plugins/envs.plugin'

(async () => {
    main()
})()

async function main() {

    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    })

    // 2. Crear el Pool de conexiones para Postgres usando tu variable de entorno
    const pool = new Pool({ connectionString: envs.POSTGRES_URL })

    // 3. Crear el adaptador de Prisma
     const adapter = new PrismaPg(pool)

    // 4. Instanciar Prisma pasándole el adaptador (¡Esto resuelve el error de 0 argumentos!)
    const prisma = new PrismaClient({ adapter })

    // 5. Tu código de prueba
    // const newLog = await prisma.logModel.create({
    //     data: {
    //         level: 'HIGH',
    //         message: 'Hola Mundo',
    //         origin: 'App.ts'
    //     }
    // })

    // console.log({ newLog })

    Server.start()
    //console.log( envs )
}
