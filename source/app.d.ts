/* eslint-disable @typescript-eslint/no-empty-interface */
import type { FastifyInstance as OriginalFastifyInstance } from 'fastify';
import type { PrettyOptions as OriginalPrettyOptions } from 'pino-pretty';

import type { IConfiguration, IContainer } from './core';

declare module 'fastify' {
    export interface FastifyInstance extends OriginalFastifyInstance {
        config: IConfiguration;
    }
}

declare module 'fastify/types/logger' {
    export interface PrettyOptions extends OriginalPrettyOptions {}
}

declare module 'fastify-awilix' {
    export interface Cradle extends IContainer {}
}
