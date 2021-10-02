import startup from './startup';

describe('startup', () => {
    afterAll(async () => {
        await startup.close();
    });

    it('should register controllers', async () => {
        const response = await startup.inject({
            method: 'GET',
            url: '/'
        });

        expect(response.statusCode).toBe(200);
        expect(response.payload).toBe('Hello, %username%!');
    });
});
