import type { FastifyInstance } from 'fastify';
import fastifyCompress from 'fastify-compress';

const registerCompress = async (server: FastifyInstance) => {
    await server.register(fastifyCompress, {
        global: true,
        inflateIfDeflated: true
    });
};

export default registerCompress;
