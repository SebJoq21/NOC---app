import { LogEntity, LogSeverityLevel } from "../entities/log.entity";
import { LogDataSource } from "./log-datasource";

describe('Log.datasource.test.ts', () => {

    const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: 'test-message',
        origin: 'log.datasource.test.ts'
    })

    class MockLogDataSource implements LogDataSource {
        
        async saveLog(log: LogEntity): Promise<void> {
            return;
        }
        async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [log]
        }

    }

    test('Should test the abstract class LogDataSource', async() => {

        const mockLogDataSource = new MockLogDataSource()

        expect( mockLogDataSource ).toBeInstanceOf( MockLogDataSource )
        expect( mockLogDataSource ).toHaveProperty('saveLog')
        expect( mockLogDataSource ).toHaveProperty('getLogs')

        await mockLogDataSource.saveLog(log)
        await mockLogDataSource.getLogs(LogSeverityLevel.high)

        const logs = await mockLogDataSource.getLogs(LogSeverityLevel.high)

        expect(logs).toHaveLength(1)
        expect(logs[0]).toBeInstanceOf(LogEntity)
        
    })

});
