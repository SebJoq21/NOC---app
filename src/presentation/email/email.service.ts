import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/envs.plugin'
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity'

interface SendMailOptions {
    to: string | string[],
    subject: string,
    htmlBody: string,
    attachments?: Attachment[]
}

interface Attachment{
    filename: string,
    path: string
}

export class EmailService {

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    })

    constructor(){}

    async sendEmail(options: SendMailOptions): Promise<boolean> {

        const {to, subject, htmlBody, attachments = []} = options

        try{

            const sendInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachments
            })

            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: 'Email was not sent',
                origin: 'email.service.ts'
            })

            return true
        }catch(error){

            return false
        }

    }

    sendEmailWithFileSystemLogs( to: string | string[] ){
        const subject = 'Logs del servidor'
        const htmlBody = `
        <h3>Logs del sistema</h3>
        <p>Se envia este correo con la información de los logs en sistema</p>
        <p>Ver los archivos adjuntos</p>
        ` 

        const attachments: Attachment[] = [
            { filename: 'logs-all', path: './logs/logs-all.log'},
            { filename: 'logs-all', path: './logs/logs-high.log'},
            { filename: 'logs-all', path: './logs/logs-medium.log'},
        ]

        return this.sendEmail({
            to, subject, attachments, htmlBody
        })

    }
    
}
