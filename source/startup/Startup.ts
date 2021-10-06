import fastify from 'fastify';

import { HomeController } from '../controllers';
import { registerSwagger } from './plugins';

class Startup {
    static boot = (options?: Parameters<typeof fastify>[0]) => {
        const startup = fastify(options);

        this.configurePlugins(startup);
        this.configureControllers(startup);
        this.configurePipeline(startup);

        return startup;
    };

    private static configurePlugins = (startup: ReturnType<typeof fastify>) => {
        registerSwagger(startup);
    };

    private static configureControllers = (startup: ReturnType<typeof fastify>) => {
        startup.register(HomeController);
    };

    private static configurePipeline = (startup: ReturnType<typeof fastify>) => {
        startup.ready(error => {
            if (error) {
                throw error;
            }

            startup.swagger();
        });
    };
}

export default Startup;
