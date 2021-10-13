interface IConfiguration {
    HOST: string;
    PORT: string;
    WEBAPI_CORS_ORIGIN?: string;
    WEBAPI_CORS_METHODS?: string[];
    WEBAPI_CORS_HEADERS?: string[];
    WEBAPI_CORS_MAX_AGE?: number;
    WEBAPI_DATABASE_CONNECTION_STRING?: string;
    WEBAPI_EMAIL_SERVICE?: string;
    WEBAPI_EMAIL_AUTH_USER?: string;
    WEBAPI_EMAIL_AUTH_PASS?: string;
    WEBAPI_VERSION: string;
}

export default IConfiguration;
