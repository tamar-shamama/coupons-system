import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import CouponModel from "../../../../Models/CouponModel";
import companyService from "../../../../Service/CompanyService";
import notificationService from "../../../../Service/NotificationService";
import useForceLogin from "../../../../Utils/useForceLogin";
import CouponCard from "../../CouponCard/CouponCard";
import SortBox from "../SortBox/SortBox";
import "./ListForSortUpToPrice.css";

function ListForSortUpToPrice(): JSX.Element {

    useForceLogin();
    const [coupons, setCoupons] = useState<CouponModel[]>([]);
    const navigate = useNavigate();
    const params = useParams();
    const price1 = params.price as any;
    const price2 = price1 as number;


    useEffect(() => {


        (async () => {
            try {
                const coupons = await companyService.getAllCouponsUpToPrice(price2);
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
        <div className="ListForSortUpToPrice reshima">


            <SortBox/>
            <br />
            
            <fieldset>

                <h3>רשימת קופוני החברה עד ל- {price2} שקל </h3>
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

export default ListForSortUpToPrice;
