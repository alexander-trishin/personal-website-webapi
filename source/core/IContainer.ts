import type { IConfiguration, ILogger, ServiceName } from '.';
import type { IEmailService, IRecaptchaService } from './services';

interface IContainer {
    [ServiceName.Configuration]: IConfiguration;
    [ServiceName.EmailService]: IEmailService;
    [ServiceName.Logger]: ILogger;
    [ServiceName.RecaptchaService]: IRecaptchaService;
}

export default IContainer;
