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
            it('should require recaptcha', async () => {
                const response = await server
                    .inject()
                    .post('/contact-me')
                    .body({ subject: 'test-subject', message: 'test-message' });

                expect(response.statusCode).toBe(400);
                expect(/required property 'recaptcha'/i.test(response.body)).toBeTruthy();
            });

            it('should require subject', async () => {
                const response = await server
                    .inject()
                    .post('/contact-me')
                    .body({ recaptcha: 'test-recaptcha', message: 'test-message' });

                expect(response.statusCode).toBe(400);
                expect(/required property 'subject'/i.test(response.body)).toBeTruthy();
            });

            it('should require message', async () => {
                const response = await server
                    .inject()
                    .post('/contact-me')
                    .body({ recaptcha: 'test-recaptcha', subject: 'test-subject' });

                expect(response.statusCode).toBe(400);
                expect(/required property 'message'/i.test(response.body)).toBeTruthy();
            });
        });
    });

    it('POST should return 204 NO CONTENT when email was send', async () => {
        const verifyMock = jest.fn().mockReturnValue(Promise.resolve(true));
        const sendMock = jest.fn().mockReturnValue(Promise.resolve());

        server.diContainer.register(ServiceName.EmailService, asValue({ send: sendMock }));
        server.diContainer.register(ServiceName.RecaptchaService, asValue({ verify: verifyMock }));

        const response = await server.inject().post('/contact-me').body({
            recaptcha: 'test-recaptcha-token',
            subject: 'test-subject',
            message: 'test-message'
        });

        expect(verifyMock).toBeCalledWith('test-recaptcha-token');
        expect(sendMock).toBeCalledWith({ subject: 'test-subject', text: 'test-message' });
        expect(response.statusCode).toBe(204);
    });

    it('POST should return 400 BAD REQUEST when recaptcha check has been failed', async () => {
        const verifyMock = jest.fn().mockReturnValue(Promise.resolve(false));

        server.diContainer.register(ServiceName.EmailService, asValue({}));
        server.diContainer.register(ServiceName.RecaptchaService, asValue({ verify: verifyMock }));

        const response = await server.inject().post('/contact-me').body({
            recaptcha: 'test-recaptcha-token',
            subject: 'test-subject',
            message: 'test-message'
        });

        expect(verifyMock).toBeCalledWith('test-recaptcha-token');
        expect(response.statusCode).toBe(400);
        expect(/recaptcha validation/i.test(response.body)).toBeTruthy();
    });
});
