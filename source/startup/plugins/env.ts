import type { FastifyInstance } from 'fastify';
import fastifyEnv from 'fastify-env';

const registerEnv = async (startup: FastifyInstance) => {
    await startup.register(fastifyEnv, {
        dotenv: true,
        expandEnv: true,
        schema: {
            type: 'object',
            required: ['HOST', 'PORT'],
            properties: {
                HOST: {
                    type: 'string',
                    default: '::'
                },
                PORT: {
                    type: 'number',
                    default: 3000
                },
                WEBAPI_CORS_ORIGIN: {
                    type: 'string'
                },
                WEBAPI_CORS_METHODS: {
                    type: 'string',
                    separator: ',',
                    default: 'GET,OPTIONS'
                },
                WEBAPI_CORS_HEADERS: {
                    type: 'string',
                    separator: ','
                },
                WEBAPI_CORS_MAX_AGE: {
                    type: 'number',
                    default: 86400
                }
            }
        }
    });
};

export default registerEnv;
