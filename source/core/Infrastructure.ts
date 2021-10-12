import type { Server } from 'http';

import type { FastifyPluginCallback, FastifyPluginOptions, RouteHandlerMethod } from 'fastify';

export type RouteHandler = RouteHandlerMethod;
export type Controller = FastifyPluginCallback<FastifyPluginOptions, Server>;
