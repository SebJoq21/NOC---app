import { envs } from "./envs.plugin"

describe('envs.plugin.test', () => {

    test('Should return env options', () => {

        expect(envs).toEqual({
            PORT: 3001,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'sebastian@gmail.com',
            MAILER_SECRET_KEY: '151515',
            PROD: false,
            MONGO_URL: 'mongodb://sebastian:123456789@localhost:27017',
            MONGO_DB_NAME: 'NOC-TEST',
            MONGO_USER: 'sebastian',
            MONGO_PASS: '123456789',
            POSTGRES_URL: 'postgresql://postgres:123456789@localhost:5433/NOC',
        })

    })

    test('should return error if not found env', async () => {

        jest.resetModules()
        process.env.PORT = 'ABC'

        try {

            await import('./envs.plugin');
            expect(true).toBe(false);

        } catch (error) {
            expect(`${error}`).toContain('"PORT" should be a valid integer')
        }

    })

})  
