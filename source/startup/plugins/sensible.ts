import type { FastifyInstance } from 'fastify';
import fastifySensible from 'fastify-sensible';

const registerSensible = async (server: FastifyInstance) => {
    await server.register(fastifySensible);
};

export default registerSensible;
