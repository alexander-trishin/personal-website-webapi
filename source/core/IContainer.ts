import type { IConfiguration, ILogger, ServiceName } from '.';
import type { IEmailService } from './services';

interface IContainer {
    [ServiceName.Configuration]: IConfiguration;
    [ServiceName.EmailService]: IEmailService;
    [ServiceName.Logger]: ILogger;
}

export default IContainer;
