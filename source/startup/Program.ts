import Startup from './Startup';

type Server = ReturnType<typeof Startup.boot>;

class Program {
    static start = async () => {
        const server = Startup.boot({ logger: true });

        process.once('SIGINT', () => this.dispose(server));

        await this.run(server);
    };

    private static executeSafe = async (server: Server, callback: () => Promise<void>) => {
        try {
            await callback();
        } catch (error) {
            server.log.error(error);
            process.exit(1);
        }
    };

    private static dispose = (server: Server) => {
        return this.executeSafe(server, async () => {
            await server.close();
            process.exit(0);
        });
    };

    private static run = (server: Server) => {
        return this.executeSafe(server, async () => {
            const { PORT = 3000, HOST = '::' } = process.env;

            await server.listen(PORT, HOST);
        });
    };
}

export default Program;
