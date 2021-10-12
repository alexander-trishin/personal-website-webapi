import nodemailer from 'nodemailer';

import type { IContainer } from '../core';
import type { IEmailService } from '../core/services';

class NodemailerEmailService implements IEmailService {
    private readonly service: string;
    private readonly username: string;
    private readonly password: string;

    constructor(container: IContainer) {
        const {
            configuration: {
                WEBAPI_EMAIL_SERVICE: service,
                WEBAPI_EMAIL_AUTH_USER: username,
                WEBAPI_EMAIL_AUTH_PASS: password
            }
        } = container;

        if (!service || !username || !password) {
            throw new Error('The email service is configured incorrectly.');
        }

        this.service = service;
        this.username = username;
        this.password = password;
    }

    send: IEmailService['send'] = async options => {
        const transport = nodemailer.createTransport({
            service: this.service,
            auth: {
                user: this.username,
                pass: this.password
            }
        });

        const { to = this.username, subject, text } = options;

        await transport.sendMail({
            from: this.username,
            to,
            subject,
            text
        });
    };
}

export default NodemailerEmailService;
