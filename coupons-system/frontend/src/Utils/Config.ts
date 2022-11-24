class Config {

}

class DevelopmentConfig extends Config {

    public loginUrl = "http://localhost:8080/login/";
    public adminUrl = "http://localhost:8080/api/admin/";
    public companyUrl = "http://localhost:8080/api/company/";
    public customerUrl = "http://localhost:8080/api/customer/";
    public imagesUrl = "http://localhost:8080/api/file/";
}

// production environment
class ProductionConfig extends Config {

    public loginUrl = "http://localhost:8080/login/";
    public adminUrl = "http://localhost:8080/api/admin/";
    public companyUrl = "http://localhost:8080/api/company/";
    public customerUrl = "http://localhost:8080/api/customer/";
    public imagesUrl = "http://localhost:8080/api/file/";
}


const appConfig =
    process.env.NODE_ENV === "development"
        ? new DevelopmentConfig()
        : new ProductionConfig();


export default appConfig;