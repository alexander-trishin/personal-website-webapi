import { asClass, asValue } from 'awilix';
import type { FastifyInstance } from 'fastify';
import { FastifyAwilixOptions, diContainer, fastifyAwilixPlugin } from 'fastify-awilix';

import { ServiceName } from '../../core';
import { NodemailerEmailService } from '../../services';

const registerAwilix = async (server: FastifyInstance) => {
    await server.register<FastifyAwilixOptions>(fastifyAwilixPlugin, {
        disposeOnClose: true,
        disposeOnResponse: true
    });

    diContainer.register(ServiceName.Configuration, asValue(server.config));
    diContainer.register(ServiceName.EmailService, asClass(NodemailerEmailService).transient());
    diContainer.register(ServiceName.Logger, asValue(server.log));
};

export default registerAwilix;
