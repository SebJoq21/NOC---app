import fs from 'fs'
import path from 'path'
import { FileSystemDataSource } from './file-system.datasource'
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity'

describe('file-system.datasource.test.ts', () => {

    const logPath = path.join(__dirname, '../../../logs') 

    beforeEach(() => {
        fs.rmSync( logPath, { recursive: true, force: true})
    })

    test('Should create log files if they do not exists', () => {
        
        new FileSystemDataSource()
        const files = fs.readdirSync( logPath )

        expect( files ).toEqual(["logs-all.log", "logs-high.log", "logs-medium.log"])

    })

    test('Should save a log in logs-all.log', () => {

        const logDataSource = new FileSystemDataSource()
        const log = new LogEntity({
            message: 'test',
            level: LogSeverityLevel.low,
            origin: 'file-system.datasource.test.ts'
        })

        logDataSource.saveLog( log )
        const allLogs = fs.readFileSync(`${ logPath }/logs-all.log`, 'utf-8')
        expect( allLogs ).toContain( JSON.stringify(log) )
    })

    test('Should save a log in logs-all.log and logs-medium.log', () => {

        const logDataSource = new FileSystemDataSource()
        const log = new LogEntity({
            message: 'test',
            level: LogSeverityLevel.medium,
            origin: 'file-system.datasource.test.ts'
        })

        logDataSource.saveLog( log )
        const allLogs = fs.readFileSync(`${ logPath }/logs-all.log`, 'utf-8')
        const mediumLogs = fs.readFileSync(`${ logPath }/logs-medium.log`, 'utf-8')
        
        expect( allLogs ).toContain( JSON.stringify(log) )
        expect( mediumLogs ).toContain( JSON.stringify(log) ) 
    })

    test('Should save a log in logs-all.log and logs-high.log', () => {

        const logDataSource = new FileSystemDataSource()
        const log = new LogEntity({
            message: 'test',
            level: LogSeverityLevel.high,
            origin: 'file-system.datasource.test.ts'
        })

        logDataSource.saveLog( log )
        const allLogs = fs.readFileSync(`${ logPath }/logs-all.log`, 'utf-8')
        const highLogs = fs.readFileSync(`${ logPath }/logs-high.log`, 'utf-8')
        

        expect( allLogs ).toContain( JSON.stringify(log) )
        expect( highLogs ).toContain( JSON.stringify(log) ) 
    })

    test('Should return all logs', async() => {

        const logDataSource = new FileSystemDataSource()
        const logLow = new LogEntity({
            message: 'log-low',
            level: LogSeverityLevel.low,
            origin: 'low'
        })
        const logMedium = new LogEntity({
            message: 'log-medium',
            level: LogSeverityLevel.medium,
            origin: 'medium'
        })
        const logHigh = new LogEntity({
            message: 'log-high',
            level: LogSeverityLevel.high,
            origin: 'high'
        })

        await logDataSource.saveLog(logLow)
        await logDataSource.saveLog(logMedium)
        await logDataSource.saveLog(logHigh)

        const logsLow = await logDataSource.getLogs(LogSeverityLevel.low)
        const logsMedium = await logDataSource.getLogs(LogSeverityLevel.medium)
        const logsHigh = await logDataSource.getLogs(LogSeverityLevel.high)

        expect( logsLow ).toEqual( expect.arrayContaining([ logLow, logMedium, logHigh ]))
        expect( logsMedium ).toEqual( expect.arrayContaining([ logMedium ]))
        expect( logsHigh ).toEqual( expect.arrayContaining([ logHigh ]))

    })

})
