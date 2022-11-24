import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CouponModel from "../../../../Models/CouponModel";
import customerService from "../../../../Service/CustomerService";
import notificationService from "../../../../Service/NotificationService";
import useForceLogin from "../../../../Utils/useForceLogin";
import CustomerGetOneCoupon from "../../CustomerGetOneCoupon/CustomerGetOneCoupon";
import BuyCouponCard from "../BuyCouponCard/BuyCouponCard";
import SortBoxForBuyCoupon from "../SortBoxForBuyCoupon/SortBoxForBuyCoupon";
import SortCouponsByCat from "../SortCouponsByCat/SortCouponsByCat";
import SortCoupons from "../SortCouponsByCat/SortCouponsByCat";
import SortCouponsByPrice from "../SortCouponsByPrice/SortCouponsByPrice";
import "./ListForByCoupon.css";

function ListForByCoupon(): JSX.Element {


    useForceLogin();
    const [coupons, setCoupons] = useState<CouponModel[]>([]);
    const navigate = useNavigate();
    
    
    useEffect(() => {


        (async () => {
            try {
                const coupons = await customerService.getAllExistingCoupons();
                setCoupons(coupons);
            } catch (error: any) {
                notificationService.error(error);
                if (error.response?.data?.error === "Unauthorized") {
                    navigate("/home");
                }
            }
                
        })();

        
    },[]);




    return (
        <div className="ListForByCoupon reshima">

            <SortBoxForBuyCoupon/>
            <br />

            <fieldset>


                <h3>רשימת הקופונים המלאה </h3>
                <br />
                <br />

                <div id="koteret">

                    <div>ת"ז</div>
                    <div className="space"></div>

                    <div>קטגוריה</div>
                    <div className="space"></div>

                    <div>שם</div>
                    <div className="space"></div>

                    <div>תיאור</div>
                    <div className="space"></div>

                    <div>כמות</div>
                    <div className="space"></div>

                    <div>תאריך ייצור</div>
                    <div className="space"></div>

                    <div>תאריך תפוגה</div>
                    <div className="space"></div>

                    <div>מחיר</div>
                    <div className="space"></div>

                    <div>חברה</div>
                    <div className="space"></div>

                    <div id="kaftor"></div>
                </div>

                <br />
                <br />

                {coupons.map(coupon => (<BuyCouponCard key={coupon.id} coupon={coupon}/>))}

            </fieldset>
                        
                        

            <br />
                    
                    
			
        </div>
    );
}

export default ListForByCoupon;
