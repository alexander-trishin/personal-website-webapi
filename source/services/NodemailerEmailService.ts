import nodemailer from 'nodemailer';

import type { IEmailService } from '../core/services';

class NodemailerEmailService implements IEmailService {
    send = async () => {
        const testAccount = await nodemailer.createTestAccount();

        const transporter = nodemailer.createTransport({
            ...testAccount.smtp,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass
            }
        });

        await transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>',
            to: 'bar@example.com, baz@example.com',
            subject: 'Hello ✔',
            text: 'Hello world?'
        });
    };
}

export default NodemailerEmailService;
