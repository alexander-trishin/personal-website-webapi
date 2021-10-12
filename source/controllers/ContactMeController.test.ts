import { asValue } from 'awilix';
import type { FastifyInstance } from 'fastify';

import { ServiceName } from '../core';
import { Startup } from '../startup';

describe('ContactMeController', () => {
    let server: FastifyInstance;

    beforeEach(async () => {
        server = await new Startup().boot({
            logger: { level: 'warn', prettyPrint: { colorize: true } }
        });
    });

    afterEach(async () => {
        await server.close();
    });

    describe('Validation', () => {
        describe('POST', () => {
            it('should require subject', async () => {
                const response = await server
                    .inject()
                    .post('/contact-me')
                    .body({ message: 'test-message' });

                expect(response.statusCode).toBe(400);
                expect(/required property 'subject'/i.test(response.body)).toBeTruthy();
            });

            it('should require message', async () => {
                const response = await server
                    .inject()
                    .post('/contact-me')
                    .body({ subject: 'test-subject' });

                expect(response.statusCode).toBe(400);
                expect(/required property 'message'/i.test(response.body)).toBeTruthy();
            });
        });
    });

    it('POST should send email', async () => {
        const sendMock = jest.fn().mockReturnValue(Promise.resolve());

        server.diContainer.register(ServiceName.EmailService, asValue({ send: sendMock }));

        const response = await server
            .inject()
            .post('/contact-me')
            .body({ subject: 'test-subject', message: 'test-message' });

        expect(sendMock).toBeCalledWith({ subject: 'test-subject', text: 'test-message' });
        expect(response.statusCode).toBe(204);
    });
});
