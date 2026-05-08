import { envs } from "../config/plugins/envs.plugin"
import { checkService } from "../domain/use-cases/checks/check-service"
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource"
import { logRepositoryImpl } from "../infrastructure/repositories/log.repository.impl"
import { CronService } from "./cron/cron-service"
import { EmailService } from "./email/email.service"

const fileSystemLogRepository = new logRepositoryImpl(
    new FileSystemDataSource()
)

export class Server {

    public static start() {

        console.log('Server started...')
    
        const emailService = new EmailService()
        emailService.sendEmail({
            to: 'joaquin.serrato21@gmail.com',
            subject: 'Logs de sistema',
            htmlBody:`
            <h3>Logs de sistemas - NOC</h3>
            <p>Asi que volvieron tus limones</p>
            <p>yara me paltie</p>
            `
        })

//        CronService.createJob(
//            '*/5 * * * * * ',
//            () => {
//                const url = 'http://google.com'
//
//                new checkService(
//                    fileSystemLogRepository,
//                    () => console.log(`${ url } is ok`),
//                    ( error ) => console.log( error )
//                ).execute( url )
//
//            }
//        )
    }

}