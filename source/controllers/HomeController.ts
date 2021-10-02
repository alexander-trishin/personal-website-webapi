import {
    FastifyPluginCallback,
    FastifyPluginOptions,
    RouteHandlerMethod,
    RouteShorthandOptions
} from 'fastify';
import { Server } from 'http';

const HomeController: FastifyPluginCallback<FastifyPluginOptions, Server> = async fastify => {
    const getOptions: RouteShorthandOptions = {
        schema: {
            response: {
                200: {
                    type: 'string'
                }
            }
        }
    };

    const getHandler: RouteHandlerMethod = async () => 'Hello, %username%!';

    fastify.get('/', getOptions, getHandler);
};

export default HomeController;
