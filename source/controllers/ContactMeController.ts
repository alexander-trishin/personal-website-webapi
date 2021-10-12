import Schema from 'fluent-json-schema';

import type { Controller, RouteHandler } from '../core';

interface IPostBody {
    subject: string;
    message: string;
}

const ContactMeController: Controller = async server => {
    const path = '/contact-me';

    const postBodySchema = Schema.object()
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
        const { emailService } = request.diScope.cradle;
        const { subject, message } = request.body as IPostBody;

        await emailService.send({ subject, text: message });

        reply.code(204);
    };

    server.post(path, postOptions, postHandler);
};

export default ContactMeController;
