import server from './startup';

const logErrorAndShutdown = <T>(error: T) => {
    server.log.error(error);
    process.exit(1);
};

const start = async () => {
    try {
        const { PORT = 3000, HOST = '::' } = process.env;

        await server.listen(PORT, HOST);
    } catch (error) {
        logErrorAndShutdown(error);
    }
};

process.on('SIGINT', async () => {
    try {
        await server.close();

        process.exit(0);
    } catch (error) {
        logErrorAndShutdown(error);
    }
});

start();
