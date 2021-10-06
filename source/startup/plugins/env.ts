import type { FastifyInstance } from 'fastify';
import fastifyEnv from 'fastify-env';

const registerEnv = async (startup: FastifyInstance) => {
    await startup.register(fastifyEnv, {
        dotenv: true,
        schema: {
            type: 'object',
            required: ['HOST', 'PORT'],
            properties: {
                HOST: {
                    type: 'string',
                    default: '::'
                },
                PORT: {
                    type: 'string',
                    default: 3000
                }
            }
        }
    });
};

export default registerEnv;
