import type { FastifyInstance } from 'fastify';
import fastifyHelmet from 'fastify-helmet';

const registerHelmet = async (server: FastifyInstance) => {
    await server.register(fastifyHelmet);
};

export default registerHelmet;
