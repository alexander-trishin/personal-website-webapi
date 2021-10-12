type SendOptions = {
    to?: string;
    subject: string;
    text: string;
};

interface IEmailService {
    send: (options: SendOptions) => Promise<void>;
}

export default IEmailService;
