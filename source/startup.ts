import fastify, { FastifyInstance } from 'fastify';

import { HomeController } from './controllers';
import { registerSwagger } from './plugins';

const startup: FastifyInstance = fastify({ logger: true });

registerSwagger(startup);

startup.register(HomeController);

startup.ready(error => {
    if (error) {
        throw error;
    }

    startup.swagger();
});

export default startup;
