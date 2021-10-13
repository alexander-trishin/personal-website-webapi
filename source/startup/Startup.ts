import fastify, { FastifyInstance } from 'fastify';

import { ContactMeController } from '../controllers';
import {
    registerAwilix,
    registerCors,
    registerEnv,
    registerSensible,
    registerSwagger
} from './plugins';

class Startup {
    boot = async (options?: Parameters<typeof fastify>[0]) => {
        const startup = await fastify(options);

        await this.configurePlugins(startup);
        await this.configureControllers(startup);

        startup.ready(error => {
            if (error) {
                throw error;
            }

            startup.swagger();
        });

        return startup;
    };

    private configurePlugins = async (startup: FastifyInstance) => {
        await registerEnv(startup);
        await registerSensible(startup);
        await registerAwilix(startup);
        await registerCors(startup);
        await registerSwagger(startup);
    };

    private configureControllers = async (startup: FastifyInstance) => {
        await startup.register(ContactMeController);
    };
}

export default Startup;
