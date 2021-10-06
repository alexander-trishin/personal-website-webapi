import { asClass } from 'awilix';
import type { FastifyInstance } from 'fastify';
import { FastifyAwilixOptions, diContainer, fastifyAwilixPlugin } from 'fastify-awilix';

import { ServiceName } from '../../core/services';
import { EmailService } from '../../services';

const registerAwilix = (server: FastifyInstance) => {
    server.register<FastifyAwilixOptions>(fastifyAwilixPlugin, {
        disposeOnClose: true,
        disposeOnResponse: true
    });

    diContainer.register(
        ServiceName.EmailService,
        asClass(EmailService)
            .scoped()
            .disposer(service => service.dispose())
    );
};

export default registerAwilix;
