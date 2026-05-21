import { LogDataSource } from "../../domain/datasources/log-datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import fs from 'fs'

export class FileSystemDataSource implements LogDataSource{

    private readonly logPath = 'logs/' 
    private readonly allLogsPath = 'logs/logs-all.log' 
    private readonly mediumLogsPath = 'logs/logs-medium.log'
    private readonly highLogsPath = 'logs/logs-high.log'

    constructor(){
        this.createLogsFile()
    }

    private createLogsFile = () => {
        if( !fs.existsSync( this.logPath ) ){
            fs.mkdirSync( this.logPath ) 
        }

        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath
        ].forEach(path => {
            if( fs.existsSync( path ) ) return
                    
            fs.writeFileSync( path, '' ); 
        });
    }

    async saveLog( newlog: LogEntity ): Promise<void> {

        const logAsJson = `${ JSON.stringify(newlog) }\n`

        fs.appendFileSync( this.allLogsPath, logAsJson)

        if( newlog.level === LogSeverityLevel.low ) return

        if ( newlog.level === LogSeverityLevel.medium ){
            fs.appendFileSync( this.mediumLogsPath, logAsJson)
        } else {
            fs.appendFileSync( this.highLogsPath, logAsJson)
        }
            
    }

    private getLogsFromFile = ( path: string ): LogEntity[] => {
        const content = fs.readFileSync( path, 'utf-8')

        if (content === '') return [];
        const Logs = content.split('\n')
            .filter( line => line !== '' )
            .map(log => LogEntity.fromJson(log))

        return Logs
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        
        switch( severityLevel ){
            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.allLogsPath)
            
            case LogSeverityLevel.medium:
                return this.getLogsFromFile(this.mediumLogsPath)

            case LogSeverityLevel.high:
                return this.getLogsFromFile(this.highLogsPath)

            default:
                throw new Error(`${ severityLevel } not implemented`)    
        }

    }

}
