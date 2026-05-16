import { LogEntity, LogSeverityLevel } from "./log.entity"

describe('LogEntity.test.ts', () => {
    
    const dataObj = new LogEntity({
        message: 'Hola mundo',
        level: LogSeverityLevel.low,
        origin: 'log.entity.test.ts'
    })

    test('should create a log entity instance', () => {

        const log = new LogEntity( dataObj )

        expect( log ).toBeInstanceOf( LogEntity )
        expect( log.message ).toBe( dataObj.message )
        expect( log.level ).toBe( dataObj.level )
        expect( log.origin ).toBe( dataObj.origin )
        expect( log.createdAt ).toBeInstanceOf( Date )

    })

    test('Should create a LogEntity instance from json', () => {

        const json = `{"level":"low","message":"Service https://google.com working","createdAt":"2026-05-15T01:01:05.420Z","origin":"check-service.ts"}`

        const log = LogEntity.fromJson( json )

        expect( log ).toBeInstanceOf( LogEntity )
        expect( log.message ).toBe( 'Service https://google.com working' )
        expect( log.level ).toBe( LogSeverityLevel.low )
        expect( log.origin ).toBe( 'check-service.ts' )
        expect( log.createdAt ).toBeInstanceOf( Date )
        
    })

    test('Should create a logEntity instance from object', () => {

        const log = LogEntity.fromObject( dataObj )

        expect( log ).toBeInstanceOf( LogEntity )
        expect( log.message ).toBe( dataObj.message )
        expect( log.level ).toBe( dataObj.level )
        expect( log.origin ).toBe( dataObj.origin )
        expect( log.createdAt ).toBeInstanceOf( Date )

    })

})
