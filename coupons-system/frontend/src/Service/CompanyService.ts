import axios from "axios";
import { request } from "http";
import CompanyModel from "../Models/CompanyModel";
import CouponsModel from "../Models/CouponModel";
import { authStore } from "../Redux/AuthState";
import { addCouponAction, couponsStore, deleteCouponAction, fetchCouponAction, updateCouponAction } from "../Redux/CouponsState";
import appConfig from "../Utils/Config";

class CompanyService {



    // get all coupons belong to the logged company
    public async getAllCoupons(): Promise<CouponsModel[]> {


        if (couponsStore.getState().coupons === null || couponsStore.getState().coupons.length === 0) {
            const companyId = authStore.getState().client.id;
            const response = await axios.get<CouponsModel[]>(appConfig.companyUrl + "get/" + companyId);
            const coupons = response.data;
            couponsStore.dispatch(fetchCouponAction(coupons));
            return coupons;
        } 
        return couponsStore.getState().coupons;
    }
    
    

    // קבלת קופון אחד השייך לחברה המחוברת
    public async getOneCoupon(couponId: number) : Promise<CouponsModel> {
        
        if (couponsStore.getState().coupons.length === 0) {
            const companyId = authStore.getState().client.id;
            const response = await axios.get<CouponsModel> (appConfig.companyUrl + "get/one/" + couponId + "/" + companyId);
            const coupon = response.data;
            return coupon;
        }
        return couponsStore.getState().coupons.find(c => c.id === couponId);
    }
    


    // מחיקת קופון אחד השייך לחברה המחוברת
    public async deleteCoupon(couponId: number): Promise <void>{
        const compId = authStore.getState().client.id;
        await axios.delete(appConfig.companyUrl + "delete/" + couponId + "/" + compId);
        couponsStore.dispatch(deleteCouponAction(couponId));

    }
    


    // קבלת פרטי החברה המחוברת
    public async getCompanyDetailes(): Promise<CompanyModel> {
        const compId = authStore.getState().client.id;
        const response = await axios.get<CompanyModel>(appConfig.companyUrl + "get/detailes/" + compId);
        const details = response.data;
        return details;
    }
    


    // יצירת קופון חדש בלי תמונה
    public async addCoupon(coupon:CouponsModel):Promise<void> {
        
        const compId = authStore.getState().client.id;
        const response = await axios.post<CouponsModel> (appConfig.companyUrl + "add/" + compId, coupon);
        const id1 = response.data as any;
        const id2 = id1 as number;
        coupon.id = id2;
        couponsStore.dispatch(addCouponAction(coupon));
    }


    
    // עדכון פרטי קופון בלי תמונה
    public async updateCoupon(coupon:CouponsModel):Promise<void> {
        
        const compId = authStore.getState().client.id;
        await axios.put<CouponsModel> (appConfig.companyUrl + "update/" + compId, coupon);
        couponsStore.dispatch(updateCouponAction(coupon));
    }
    
    

     // קבלת כל הקופונים של החברה על פי קטגוריה
     public async getAllCouponsBuyCat(category: string): Promise<CouponsModel[]> {
        
        const compId = authStore.getState().client.id;
        if (couponsStore.getState().coupons === null || couponsStore.getState().coupons.length === 0) {
            this.getAllCoupons();
        }
        
        const response = await axios.get<CouponsModel[]>(appConfig.companyUrl + "get/category/" + category + "/" + compId);
        const coupons = response.data;
        return coupons;
    }
    
    // קבלת כל הקופונים של החברה עד מחיר מסויים
    public async getAllCouponsUpToPrice(price: number): Promise<CouponsModel[]> {
        
        const compId = authStore.getState().client.id;
        if (couponsStore.getState().coupons === null || couponsStore.getState().coupons.length === 0) {
            this.getAllCoupons();
        }

        const response = await axios.get<CouponsModel[]>(appConfig.companyUrl + "get/" + price + "/" + compId);
        const coupons = response.data;
        return coupons;
    }









}

const companyService = new CompanyService();
export default companyService;