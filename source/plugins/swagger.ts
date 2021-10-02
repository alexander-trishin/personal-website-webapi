import type { FastifyInstance } from 'fastify';
import fastifySwagger, { SwaggerOptions } from 'fastify-swagger';

import packageJson from '../../package.json';

const registerSwagger = (server: FastifyInstance) => {
    server.register<SwaggerOptions>(fastifySwagger, {
        routePrefix: '/swagger',
        exposeRoute: true,
        openapi: {
            info: {
                title: 'Personal Website: Web API',
                description: 'Swagger documentation',
                version: packageJson.version
            },
            externalDocs: {
                url: 'https://swagger.io',
                description: 'Leadn more about Swagger.'
            }
        },
        uiConfig: {
            docExpansion: 'full',
            deepLinking: false
        },
        staticCSP: true,
        transformStaticCSP: header => header
    });
};

export default registerSwagger;
