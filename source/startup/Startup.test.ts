import type { FastifyInstance } from 'fastify';

import Startup from './Startup';

describe('Startup', () => {
    let server: FastifyInstance;

    beforeEach(async () => {
        server = await new Startup().boot();
    });

    afterAll(async () => {
        await server.close();
    });

    it('should register controllers', async () => {
        const response = await server.inject({
            method: 'GET',
            url: '/'
        });

        expect(response.statusCode).toBe(200);
        expect(response.payload).toBe('Hello, %username%!');
    });
});
