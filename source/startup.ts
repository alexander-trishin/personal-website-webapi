import Fastify, { FastifyInstance } from 'fastify';

import { HomeController } from './controllers';

const fastify: FastifyInstance = Fastify({ logger: true });

fastify.register(HomeController);

export default fastify;
