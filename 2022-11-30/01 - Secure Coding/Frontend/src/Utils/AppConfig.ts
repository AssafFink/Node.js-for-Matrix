class AppConfig {
    public registerUrl = "http://localhost:4000/api/auth/register/";
    public loginUrl = "http://localhost:4000/api/auth/login/";
    public productsUrl = "http://localhost:4000/api/products/";
    public forumUrl = "http://localhost:4000/api/forum/";
    public usersUrl = "http://localhost:4000/api/users/";
}

const appConfig = new AppConfig();

export default appConfig;
