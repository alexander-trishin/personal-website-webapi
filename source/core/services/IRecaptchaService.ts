interface IRecaptchaService {
    verify: (token: string) => Promise<boolean | string[]>;
}

export default IRecaptchaService;
