import nodemailer, { Transporter } from 'nodemailer';
import { IMock, It, Mock } from 'typemoq';

import type { IContainer } from '../core';
import NodemailerEmailService from './NodemailerEmailService';

describe('NodemailerEmailService', () => {
    let configurationMock: IMock<IContainer['configuration']>;
    let containerMock: IMock<IContainer>;

    beforeEach(() => {
        configurationMock = Mock.ofType<IContainer['configuration']>();
        containerMock = Mock.ofType<IContainer>();

        containerMock.setup(x => x.configuration).returns(() => configurationMock.target);
    });

    describe('Constructor', () => {
        it('should throw when service is not defined', () => {
            configurationMock.setup(x => x.WEBAPI_EMAIL_SERVICE).returns(() => undefined);
            configurationMock.setup(x => x.WEBAPI_EMAIL_AUTH_USER).returns(() => 'test-user');
            configurationMock.setup(x => x.WEBAPI_EMAIL_AUTH_PASS).returns(() => 'test-pass');

            expect(() => new NodemailerEmailService(containerMock.object)).toThrow();
        });

        it('should throw when username is not defined', () => {
            configurationMock.setup(x => x.WEBAPI_EMAIL_SERVICE).returns(() => 'test-service');
            configurationMock.setup(x => x.WEBAPI_EMAIL_AUTH_USER).returns(() => undefined);
            configurationMock.setup(x => x.WEBAPI_EMAIL_AUTH_PASS).returns(() => 'test-pass');

            expect(() => new NodemailerEmailService(containerMock.object)).toThrow();
        });

        it('should throw when password is not defined', () => {
            configurationMock.setup(x => x.WEBAPI_EMAIL_SERVICE).returns(() => 'test-service');
            configurationMock.setup(x => x.WEBAPI_EMAIL_AUTH_USER).returns(() => 'test-user');
            configurationMock.setup(x => x.WEBAPI_EMAIL_AUTH_PASS).returns(() => undefined);

            expect(() => new NodemailerEmailService(containerMock.object)).toThrow();
        });
    });

    it('should send mail', async () => {
        configurationMock.setup(x => x.WEBAPI_EMAIL_SERVICE).returns(() => 'test-service');
        configurationMock.setup(x => x.WEBAPI_EMAIL_AUTH_USER).returns(() => 'test-username');
        configurationMock.setup(x => x.WEBAPI_EMAIL_AUTH_PASS).returns(() => 'test-password');

        const transporterMock = Mock.ofType<Transporter>();
        const createTransportMock = jest.spyOn(nodemailer, 'createTransport');
        const sendOptions = {
            subject: 'test-subject',
            text: 'test-message'
        };

        transporterMock
            .setup(x =>
                x.sendMail(
                    It.isObjectWith({
                        ...sendOptions,
                        from: 'test-username',
                        to: 'test-username'
                    })
                )
            )
            .returns(() => Promise.resolve())
            .verifiable();

        createTransportMock.mockReturnValue(transporterMock.object);

        const actual = async () => {
            await new NodemailerEmailService(containerMock.object).send(sendOptions);

            transporterMock.verifyAll();
        };

        await expect(actual()).resolves.not.toThrow();
    });
});
