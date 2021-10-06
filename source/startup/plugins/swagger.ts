import type { FastifyInstance } from 'fastify';
import fastifySwagger, { SwaggerOptions } from 'fastify-swagger';

const registerSwagger = (server: FastifyInstance) => {
    server.register<SwaggerOptions>(fastifySwagger, {
        routePrefix: '/swagger',
        exposeRoute: true,
        openapi: {
            info: {
                title: 'Personal Website: Web API',
                description: 'Swagger documentation',
                version: '1.0.0'
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
