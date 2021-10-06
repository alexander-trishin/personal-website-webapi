import { FastifyInstance as OriginalFastifyInstance } from 'fastify';

declare module 'fastify' {
    export interface FastifyInstance extends OriginalFastifyInstance {
        config: {
            HOST: string;
            PORT: string;
        };
    }
}
