export interface Configuration {
    port: number;
    mongo: {
        uri: string;
    };
    redis: {
        url: string;
        username: string;
        password: string;
    };
    security: {
        jwtSecret: string;
        accessTokenExpiry: string;
        cacheExpiry: number;
    };
}