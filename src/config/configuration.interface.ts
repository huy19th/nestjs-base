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
    nodemailer: {
        user: string;
        pass: string;
        host: string;
        port: number;
    };
}