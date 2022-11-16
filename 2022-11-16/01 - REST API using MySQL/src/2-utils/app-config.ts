class AppConfig {
    public port = 4000;
    public mySqlHost = "localhost";
    public mySqlUser = "root";
    public mySqlPassword = "";
    public mySqlDatabase = "northwind";
}

const appConfig = new AppConfig();

export default appConfig;