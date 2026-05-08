import { checkService } from "../domain/use-cases/checks/check-service"
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource"
import { logRepositoryImpl } from "../infrastructure/repositories/log.repository.impl"
import { CronService } from "./cron/cron-service"

const fileSystemLogRepository = new logRepositoryImpl(
    new FileSystemDataSource()
)

export class Server {

    public static start() {

        console.log('Server started...')
    
        CronService.createJob(
            '*/5 * * * * * ',
            () => {
                const url = 'http://google.com'

                new checkService(
                    fileSystemLogRepository,
                    () => console.log(`${ url } is ok`),
                    ( error ) => console.log( error )
                ).execute( url )

            }
        )
    }

}