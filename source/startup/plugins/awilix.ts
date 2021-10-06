import { asClass } from 'awilix';
import type { FastifyInstance } from 'fastify';
import { FastifyAwilixOptions, diContainer, fastifyAwilixPlugin } from 'fastify-awilix';

import { ServiceName } from '../../core/services';
import { NodemailerEmailService } from '../../services';

const registerAwilix = async (server: FastifyInstance) => {
    await server.register<FastifyAwilixOptions>(fastifyAwilixPlugin, {
        disposeOnClose: true,
        disposeOnResponse: true
    });

    diContainer.register(ServiceName.EmailService, asClass(NodemailerEmailService).transient());
};

export default registerAwilix;
