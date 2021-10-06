import type { FastifyInstance } from 'fastify';

import Startup from './Startup';

class Program {
    start = async () => {
        const server = await new Startup().boot({ logger: true });

        process.once('SIGINT', () => this.dispose(server));

        await this.run(server);
    };

    private executeSafe = async (server: FastifyInstance, callback: () => Promise<void>) => {
        try {
            await callback();
        } catch (error) {
            server.log.error(error);
            process.exit(1);
        }
    };

    private dispose = (server: FastifyInstance) => {
        return this.executeSafe(server, async () => {
            await server.close();
            process.exit(0);
        });
    };

    private run = (server: FastifyInstance) => {
        return this.executeSafe(server, async () => {
            const { PORT, HOST } = server.config;

            await server.listen(PORT, HOST);
        });
    };
}

export default Program;
