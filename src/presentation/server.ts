import { envs } from "../config/plugins/envs.plugin"
import { checkService } from "../domain/use-cases/checks/check-service"
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs"
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource"
import { MongoLogDataSource } from "../infrastructure/datasources/mongo-log.datasource"
import { logRepositoryImpl } from "../infrastructure/repositories/log.repository.impl"
import { CronService } from "./cron/cron-service"
import { EmailService } from "./email/email.service"

const logRepository = new logRepositoryImpl(
    new FileSystemDataSource()
    //new MongoLogDataSource()
)
const emailService = new EmailService()

export class Server {

    public static start() {

        console.log('Server started...')
    
        //todo: Mandar email
//        new SendEmailLogs(
//            emailService,
//            fileSystemLogRepository
//        ).execute(
//            ['sebastian.chicata@gmail.com', 'joaquin.serrato21@gmail.com']
//        )
//       const emailService = new EmailService()
//       emailService.sendEmailWithFileSystemLogs(
//            ['sebastian.chicata@gmail.com', 'joaquin.serrato21@gmail.com']
//        )

        CronService.createJob(
            '*/5 * * * * * ',
            () => {
                const url = 'https://google.com'

                new checkService(
                    logRepository,
                    () => console.log(`${ url } is ok`),
                    ( error ) => console.log( error )
                ).execute( url )

            }
        )
    }

}