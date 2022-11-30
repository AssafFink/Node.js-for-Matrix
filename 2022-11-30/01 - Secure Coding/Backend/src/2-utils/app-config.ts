class AppConfig {
    public supportEmail: string = "support@northwind.com";
}

class DevelopmentConfig extends AppConfig {
    public isDevelopment = true;
    public isProduction = false;
    public host = "localhost";
    public user = "root";
    public password = "";
    public database = "northwind";
    public port = 4000;
    public frontendUrl = "http://localhost:3000";
}

class ProductionConfig extends AppConfig {
    public isDevelopment = false;
    public isProduction = true;
    public host = "some-network-computer";
    public user = "some-db-user";
    public password = "some-password";
    public database = "some-db-name";
    public port = 36542;
    public frontendUrl = "http://northwind.com";
}

// Must check in production: 
const appConfig = (process.env.NODE_ENV === "production") ? new ProductionConfig() : new DevelopmentConfig();

export default appConfig;