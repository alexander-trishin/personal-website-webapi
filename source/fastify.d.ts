import { FastifyInstance as OriginalFastifyInstance } from 'fastify';

declare module 'fastify' {
    export interface FastifyInstance extends OriginalFastifyInstance {
        config: {
            HOST: string;
            PORT: string;
            WEBAPI_CORS_ORIGIN?: string;
            WEBAPI_CORS_METHODS?: string[];
            WEBAPI_CORS_HEADERS?: string[];
            WEBAPI_CORS_MAX_AGE?: number;
        };
    }
}
