import nock from 'nock';
import { IMock, Mock } from 'typemoq';

import type { IContainer } from '../core';
import type { IRecaptchaResponse } from '../core/models';
import GoogleRecaptchaService from './GoogleRecaptchaService';

describe('GoogleRecaptchaService', () => {
    let configurationMock: IMock<IContainer['configuration']>;
    let containerMock: IMock<IContainer>;
    let nockScope: nock.Scope | null;

    beforeEach(() => {
        configurationMock = Mock.ofType<IContainer['configuration']>();
        containerMock = Mock.ofType<IContainer>();

        containerMock.setup(x => x.configuration).returns(() => configurationMock.target);
        nockScope = null;
    });

    afterEach(() => {
        nockScope?.persist(false);
    });

    describe('Constructor', () => {
        it('should throw when secret is not defined', () => {
            configurationMock.setup(x => x.WEBAPI_RECAPTCHA_SECRET_KEY).returns(() => undefined);

            expect(() => new GoogleRecaptchaService(containerMock.object)).toThrow();
        });
    });

    it('should return true when token is valid', async () => {
        nockScope = nock(GoogleRecaptchaService.BaseUrl)
            .post('?secret=test-secret&response=test-token')
            .reply(200, { success: true, score: 1 } as IRecaptchaResponse)
            .persist();

        configurationMock.setup(x => x.WEBAPI_RECAPTCHA_SECRET_KEY).returns(() => 'test-secret');

        const actual = new GoogleRecaptchaService(containerMock.object).verify('test-token');

        expect(actual).toBeTruthy();
    });

    it('should return false when score is too low', async () => {
        nockScope = nock(GoogleRecaptchaService.BaseUrl)
            .post('?secret=test-secret&response=test-token')
            .reply(200, { success: true, score: 0 } as IRecaptchaResponse)
            .persist();

        configurationMock.setup(x => x.WEBAPI_RECAPTCHA_SECRET_KEY).returns(() => 'test-secret');

        const actual = await new GoogleRecaptchaService(containerMock.object).verify('test-token');

        expect(actual).toBeFalsy();
    });
});
