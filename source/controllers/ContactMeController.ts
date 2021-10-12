import Schema from 'fluent-json-schema';
import HttpErrors from 'http-errors';

import type { Controller, RouteHandler } from '../core';

interface IPostBody {
    recaptcha: string;
    subject: string;
    message: string;
}

const ContactMeController: Controller = async server => {
    const path = '/contact-me';

    const postBodySchema = Schema.object()
        .prop('recaptcha', Schema.string().required())
        .prop('subject', Schema.string().required())
        .prop('message', Schema.string().required());

    const postResponseSchema = {
        204: Schema.null(),
        400: server.getSchema('bad-request')
    };

    const postOptions = {
        schema: {
            body: postBodySchema,
            response: postResponseSchema
        }
    };

    const postHandler: RouteHandler = async (request, reply) => {
        const { emailService, recaptchaService } = request.diScope.cradle;
        const { recaptcha, subject, message } = request.body as IPostBody;

        if (await recaptchaService.verify(recaptcha)) {
            await emailService.send({ subject, text: message });

            reply.code(204);
        } else {
            reply.code(400).send(new HttpErrors.BadRequest('reCAPTCHA validation failed'));
        }
    };

    server.post(path, postOptions, postHandler);
};

export default ContactMeController;
