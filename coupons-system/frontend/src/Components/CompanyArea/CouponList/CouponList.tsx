import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CouponsModel from "../../../Models/CouponModel";
import { couponsStore } from "../../../Redux/CouponsState";
import companyService from "../../../Service/CompanyService";
import notificationService from "../../../Service/NotificationService";
import useForceLogin from "../../../Utils/useForceLogin";
import CouponCard from "../CouponCard/CouponCard";
import CouponGetOne from "../CouponGetOne/CouponGetOne";
import SortBox from "../Sort/SortBox/SortBox";
import SortByCat from "../Sort/SortByCat/SortByCat";
import SortByPrice from "../Sort/SortByPrice/SortByPrice";
import "./CouponList.css";

function CouponList(): JSX.Element {

    const [coupons, setCoupons] = useState<CouponsModel[]>([]);
    const nav = useNavigate();

    useForceLogin();
    
    useEffect(() => {

        
            
            (async () => {
                try {
                    const coupons = await companyService.getAllCoupons();
                    setCoupons(coupons);
                
                } catch (error: any) {
                    notificationService.error(error);
                    if (error.response?.data?.error === "Unauthorized") {
                        nav("/home");
                    }
                }
                
            })();


            const unsubscibe = couponsStore.subscribe(()=>{
                setCoupons(couponsStore.getState().coupons);
                console.log("from coupons list subscribe");
            });
    
            return ()=>{
                unsubscibe();
            }
            
    },[]);

    
    


    return (
        <div className="CouponList reshima">

           <SortBox/>
            <br />
            
            <fieldset>

                <h3>רשימת כל קופוני החברה</h3>
                <NavLink id="add" to={"/addCoupon"}>יצירת קופון</NavLink>

                <br />
                <br />

                <div id="koteret">

                    <div id="mispar">ת"ז</div>
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
                </div>

                
                <br />
                <br />

                {coupons.map(coupon => (<CouponCard key={coupon.id} coupon={coupon}/>))}


                <br />
                <br />
            </fieldset>
            
			
        </div>
    );
}

export default CouponList;
