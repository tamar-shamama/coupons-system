import axios from "axios";
import CouponsModel from "../Models/CouponModel";
import CustomerModel from "../Models/CustomerModel";
import { authStore } from "../Redux/AuthState";
import { addCouponAction, couponsStore, fetchCouponAction } from "../Redux/CouponsState";
import appConfig from "../Utils/Config";

class CustomerService {


    // קבלת פרטי הלקוח המחובר מהשרת
    public async getCustomerDetailes(): Promise<CustomerModel> {
        const custIs = authStore.getState().client.id;
        const response = await axios.get<CustomerModel>(appConfig.customerUrl + "get/detailes/" + custIs);
        const details = response.data;
        return details;
    }
    

    // קבלת כל הקופונים שנקנו ע"י הלקוח המחובר
    // get all of the coupons own by logged customer
    public async getAllCoupons(): Promise<CouponsModel[]> {
        
        if (couponsStore.getState().coupons === null || couponsStore.getState().coupons.length === 0) {
            const custIs = authStore.getState().client.id;
            const response = await axios.get<CouponsModel[]>(appConfig.customerUrl + "getAll/" + custIs);
            const coupons = response.data;
            couponsStore.dispatch(fetchCouponAction(coupons));
            return coupons;
        }
        return couponsStore.getState().coupons;
    }


    
    // קבלת קופון אחד עפ"י מספר זיהוי השייך ללקוח המחובר
    public async getOneCoupon(couponId: number): Promise<CouponsModel> {

        if (couponsStore.getState().coupons.length === 0) {
            const custIs = authStore.getState().client.id;
            const response = await axios.get<CouponsModel>(appConfig.customerUrl + "getOne/" + custIs + "/" + couponId);
            return response.data;
        }
        return couponsStore.getState().coupons.find(c => c.id === couponId);
    }



    // קבלת קופון אחד עפ"י מספר זיהוי - לא בהכרח שייך ללקוח
    public async getAnyOneCoupon(couponId: number): Promise<CouponsModel> {
        const response = await axios.get<CouponsModel>(appConfig.customerUrl + "getOne/" + couponId);
        return response.data;
    }
    



    // קבלת החברה שבבעלותה הקופון שמספר הזיהוי שלו ניתן
    public async getOwnerCompany(couponId: number): Promise<string> {
        
        const response = await axios.get<string>(appConfig.customerUrl + "get/ownerComp/" + couponId);
        const compName = response.data;
        return compName;
    }
    
    


    // קניית קופון עפ"י מספר זיהוי ע"י הלקוח המחובר
    public async buyCoupon(couponId: number): Promise<CouponsModel> {
        const custIs = authStore.getState().client.id;
        const response = await axios.get<CouponsModel>(appConfig.customerUrl + "buy/" + couponId + "/" + custIs);
        const boughtCoupon = response.data;
        couponsStore.dispatch(addCouponAction(boughtCoupon));
        return response.data;
    }




    // קבלת כל הקופונים הקיימים בלי לשמור בסטייט
    public async getAllExistingCoupons(): Promise<CouponsModel[]> {
        
        // get all coupons owned by customer - so they will be marked as owned in the list
        if (couponsStore.getState().coupons === null || couponsStore.getState().coupons.length === 0) {
            this.getAllCoupons();
        }

        // get all of the coupons from the server, including those not owned by customer
        const response = await axios.get<CouponsModel[]>(appConfig.customerUrl + "getAll");
        const coupons = response.data;
        return coupons;
    }




    // קבלת כל הקופונים הקיימים על פי קטגוריה
    public async getAllExistingCouponsBuyCat(category: string): Promise<CouponsModel[]> {
        
        if (couponsStore.getState().coupons === null || couponsStore.getState().coupons.length === 0) {
            this.getAllCoupons();
        }

        const response = await axios.get<CouponsModel[]>(appConfig.customerUrl + "getAll/category/" + category);
        const coupons = response.data;
        return coupons;
    }



    // קבלת כל הקופונים הקיימים עד מחיר מסויים
    public async getAllExistingCouponsUpToPrice(price: number): Promise<CouponsModel[]> {
        
        if (couponsStore.getState().coupons === null || couponsStore.getState().coupons.length === 0) {
            this.getAllCoupons();
        }

        const response = await axios.get<CouponsModel[]>(appConfig.customerUrl + "getAll/price/" + price);
        const coupons = response.data;
        return coupons;
    }






}



const customerService = new CustomerService();
export default customerService;