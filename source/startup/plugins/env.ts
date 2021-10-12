import fs from 'fs';
import path from 'path';

import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import type { FastifyInstance } from 'fastify';
import fastifyEnv from 'fastify-env';
import Schema from 'fluent-json-schema';

const registerEnv = async (server: FastifyInstance) => {
    const rootDirectory = fs.realpathSync(process.cwd());
    const dotenvPath = path.resolve(rootDirectory, '.env');

    const { NODE_ENV } = process.env;

    [
        `${dotenvPath}.${NODE_ENV}.local`,
        NODE_ENV !== 'test' && `${dotenvPath}.local`,
        `${dotenvPath}.${NODE_ENV}`,
        dotenvPath
    ].forEach(dotenvFile => {
        if (dotenvFile && fs.existsSync(dotenvFile)) {
            dotenvExpand(dotenv.config({ path: dotenvFile }));
        }
    });

    const schema = Schema.object()
        .prop('HOST', Schema.string().default('::').required())
        .prop('PORT', Schema.number().default(3000).required())
        .prop('WEBAPI_CORS_ORIGIN', Schema.string())
        .prop('WEBAPI_CORS_METHODS', Schema.string().raw({ separator: ',' }).default('GET,OPTIONS'))
        .prop('WEBAPI_CORS_HEADERS', Schema.string().raw({ separator: ',' }))
        .prop('WEBAPI_CORS_MAX_AGE', Schema.number().default(3600))
        .prop('WEBAPI_DATABASE_CONNECTION_STRING', Schema.string())
        .prop('WEBAPI_EMAIL_SERVICE', Schema.string())
        .prop('WEBAPI_EMAIL_AUTH_USER', Schema.string())
        .prop('WEBAPI_EMAIL_AUTH_PASS', Schema.string())
        .prop('WEBAPI_RECAPTCHA_SECRET_KEY', Schema.string())
        .prop('WEBAPI_VERSION', Schema.string().required());

    await server.register(fastifyEnv, {
        dotenv: false,
        expandEnv: false,
        schema
    });
};

export default registerEnv;
