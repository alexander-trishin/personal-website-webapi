import got from 'got';

import type { IContainer } from '../core';
import type { IRecaptchaResponse } from '../core/models';
import type { IRecaptchaService } from '../core/services';

class GoogleRecaptchaService implements IRecaptchaService {
    static readonly BaseUrl = 'https://www.google.com/recaptcha/api/siteverify';

    private readonly secret: string;

    constructor(container: IContainer) {
        const { WEBAPI_RECAPTCHA_SECRET_KEY: key } = container.configuration;

        if (!key) {
            throw new Error('The recaptcha service is configured incorrectly.');
        }

        this.secret = key;
    }

    verify = async (token: string) => {
        const response = await got.post<IRecaptchaResponse>(GoogleRecaptchaService.BaseUrl, {
            searchParams: {
                secret: this.secret,
                response: token
            }
        });

        const { success, score, ['error-codes']: errorCodes = [] } = response.body;

        return success && score > 0.5 && errorCodes.length === 0;
    };
}

export default GoogleRecaptchaService;
