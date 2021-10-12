import type { FastifyInstance } from 'fastify';
import fastifySwagger, { SwaggerOptions } from 'fastify-swagger';
import Schema from 'fluent-json-schema';

const registerSwagger = async (server: FastifyInstance) => {
    await server.register<SwaggerOptions>(fastifySwagger, {
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

    server.addSchema(
        Schema.object()
            .id('bad-request')
            .prop('statusCode', Schema.number().required())
            .prop('error', Schema.string().required())
            .prop('message', Schema.string().required())
    );
};

export default registerSwagger;
