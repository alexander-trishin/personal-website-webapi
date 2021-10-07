import type { FastifyInstance } from 'fastify';
import fastifyCors from 'fastify-cors';

const registerCors = async (startup: FastifyInstance) => {
    const {
        WEBAPI_CORS_ORIGIN: origin,
        WEBAPI_CORS_METHODS: methods,
        WEBAPI_CORS_HEADERS: allowedHeaders,
        WEBAPI_CORS_MAX_AGE: maxAge
    } = startup.config;

    const options = { origin, methods, allowedHeaders, maxAge };

    (Object.keys(options) as (keyof typeof options)[]).forEach(key => {
        if (options[key] === undefined) {
            delete options[key];
        }
    });

    await startup.register(fastifyCors, options);
};

export default registerCors;
