import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CouponModel from "../../../../Models/CouponModel";
import customerService from "../../../../Service/CustomerService";
import notificationService from "../../../../Service/NotificationService";
import useForceLogin from "../../../../Utils/useForceLogin";
import CustomerGetOneCoupon from "../../CustomerGetOneCoupon/CustomerGetOneCoupon";
import BuyCouponCard from "../BuyCouponCard/BuyCouponCard";
import SortBoxForBuyCoupon from "../SortBoxForBuyCoupon/SortBoxForBuyCoupon";
import "./ListForBuyCouponUpToPrice.css";

function ListForBuyCouponUpToPrice(): JSX.Element {

    useForceLogin();

    const [coupons, setCoupons] = useState<CouponModel[]>([]);
    const navigate = useNavigate();
    const params = useParams();
    const price1 = params.price as any;
    const price2 = price1 as number;
    
    useEffect(() => {


            (async () => {
                try {
                    const coupons = await customerService.getAllExistingCouponsUpToPrice(price2);
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
        <div className="ListForBuyCouponUpToPrice reshima">

            <SortBoxForBuyCoupon/>
            <br />

            <fieldset>


                <h3>רשימת הקופונים עד ל- {price2} שקל </h3>
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

export default ListForBuyCouponUpToPrice;
