import { useEffect, useState } from "react";
import CouponsModel from "../../../../Models/CouponModel";
import customerService from "../../../../Service/CustomerService";
import CouponCard from "../../../CompanyArea/CouponCard/CouponCard";
import CustomerCouponCard from "../CustomerCouponCard/CustomerCouponCard";
import CustomerGetOneCoupon from "../../CustomerGetOneCoupon/CustomerGetOneCoupon";
import "./GetAllCoupons.css";
import notificationService from "../../../../Service/NotificationService";
import useForceLogin from "../../../../Utils/useForceLogin";
import { useNavigate } from "react-router-dom";

function GetAllCoupons(): JSX.Element {


    useForceLogin();
    const [coupons, setCoupons] = useState<CouponsModel[]>([]);
    const navigate = useNavigate();

    
    useEffect(() => {


            (async () => {
                try {
                    const coupons = await customerService.getAllCoupons();
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
        <div className="GetAllCoupons reshima">

            <br />

            <fieldset>


                <h3>הקופונים שלי </h3>
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

                    {/* <div>כמות</div>
                    <div className="space"></div> */}

                    <div>תאריך ייצור</div>
                    <div className="space"></div>

                    <div>תאריך תפוגה</div>
                    <div className="space"></div>

                    <div>מחיר</div>
                    <div className="space"></div>

                    <div>חברה</div>
                    <div className="space"></div>

                </div>

                <br />
                <br />

                {coupons.map(coupons => (<CustomerCouponCard coupon={coupons}/>))}
                
            </fieldset>
                        
                        

            <br />
                    
                    
			
        </div>
    );
}

export default GetAllCoupons;
