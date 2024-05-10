export interface Configuration {
    port: number;
    mysql: {
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
    }
}