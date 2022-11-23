class AppConfig {
    public port = 4000;
    public connectionString = "mongodb://127.0.0.1:27017/Northwind";
}

const appConfig = new AppConfig();

export default appConfig;