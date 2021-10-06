import type { IEmailService, ServiceName } from './core/services';

declare module 'fastify-awilix' {
    interface Cradle {
        [ServiceName.EmailService]: IEmailService;
    }
}
