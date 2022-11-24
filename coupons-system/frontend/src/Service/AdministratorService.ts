import axios from "axios";
import CompanyModel from "../Models/CompanyModel";
import appConfig from "../Utils/Config";
import {addCompanyAction, companiesStore, deleteCompanyAction, fetchCompanyAction, updateCompanyAction} from "../Redux/CompaniesState";
import CustomerModel from "../Models/CustomerModel";
import { addCustomersAction, customersStore, deleteCustomersAction, fetchCustomersAction, updateCustomersAction } from "../Redux/CustomersState";
import notificationService from "./NotificationService";
import useForceLogin from "../Utils/useForceLogin";

class AdministratorService {




    // GET all companies
    public async getAllCompanies(): Promise<CompanyModel[]> {

        if (companiesStore.getState().companies === null || companiesStore.getState().companies.length === 0) {
            const response = await axios.get<CompanyModel[]>(appConfig.adminUrl + "company/get");
            const companies = response.data;
            companiesStore.dispatch(fetchCompanyAction(companies));
            return companies;
        } 
        return companiesStore.getState().companies;
    }




    // GET one company by id number
    public async getOneCompany(compId: number): Promise<CompanyModel> {

        if (companiesStore.getState().companies.length === 0) {
            const response = await axios.get<CompanyModel> (appConfig.adminUrl + "company/get/" + compId);
            const company = response.data;
            return company;
        }
        const company = companiesStore.getState().companies.find (c => c.id === compId) as CompanyModel;
        return company;
    }




    // POST add (create) one company
    // השרת מחזיר מספר זהות של החברה, לכן במקום לשמור בסטייט הגלובלי את
    // הריספונס מהשרת שהוא בסה"כ מספר, שמרתי את החברה שהמתודה מקבלת
    // והוספתי לה את הת"ז מהריספונס של השרת

    public async addCompany(company: CompanyModel): Promise<void> {

        try {
            const response = await axios.post<CompanyModel>(appConfig.adminUrl + "company/add", company);
            const newId1 = response.data as any;
            const newId2 = newId1 as number;
            company.id = newId2;
            companiesStore.dispatch(addCompanyAction(company));
            
        } catch (err: any) {
            notificationService.error(err);
        }
    }




    // DELETE a company by id
    public async deleteCompany(companyId: number): Promise<void> {
        await axios.delete(appConfig.adminUrl + "company/delete/" + companyId);
        companiesStore.dispatch(deleteCompanyAction(companyId));
    }
    
    
    
    
    // PUT - update company
    public async updateCompany(company: CompanyModel): Promise<void> {
        
        await axios.put<CompanyModel> (appConfig.adminUrl + "company/update", company);
        companiesStore.dispatch(updateCompanyAction(company));
    }




    
    // get a list of all the customers
    public async getAllCustomers(): Promise<CustomerModel[]> {

        if (customersStore.getState().customers === null ||customersStore.getState().customers.length === 0) {
            const response = await axios.get<CustomerModel[]>(appConfig.adminUrl + "customer/get");
            const customers = response.data;
            customersStore.dispatch(fetchCustomersAction(customers));
            return customers;
        } 
        return customersStore.getState().customers;
    }



    // get one customer by id
    public async getOneCustomer(custId: number): Promise<CustomerModel> {

        if (customersStore.getState().customers.length === 0) {
            const response = await axios.get<CustomerModel> (appConfig.adminUrl + "customer/get/" + custId);
            const customer = response.data;
            return customer;
        }
        const customer = customersStore.getState().customers.find(c => c.id === custId) as CustomerModel;
        return customer;
    }



    // delete customer by id
    public async deleteCustomer(customerId: number): Promise<void> {
        
        await axios.delete(appConfig.adminUrl + "customer/delete/" + customerId);
        customersStore.dispatch(deleteCustomersAction(customerId));
    }



    // add customer
    public async addCustomer(customer: CustomerModel): Promise<void> {
        const response = await axios.post<CustomerModel>(appConfig.adminUrl + "customer/add", customer);
        const id1 = response.data as any;
        const id2 = id1 as number;
        customer.id = id2;
        customersStore.dispatch(addCustomersAction(customer));
    }



    // update customer
    public async updateCustomer(customer: CustomerModel): Promise<void> {
    
        await axios.put<CompanyModel> (appConfig.adminUrl + "customer/update", customer);
        customersStore.dispatch(updateCustomersAction(customer));
    }









}

const administratorService = new AdministratorService();
export default administratorService;