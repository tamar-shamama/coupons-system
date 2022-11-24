import { SyntheticEvent, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import CouponModel from "../../../../Models/CouponModel";
import companyService from "../../../../Service/CompanyService";
import notificationService from "../../../../Service/NotificationService";
import useForceLogin from "../../../../Utils/useForceLogin";
import CouponCard from "../../CouponCard/CouponCard";
import CouponGetOne from "../../CouponGetOne/CouponGetOne";
import SortBox from "../SortBox/SortBox";
import SortByCat from "../SortByCat/SortByCat";
import SortByPrice from "../SortByPrice/SortByPrice";
import "./ListForSortByCat.css";

function ListForSortByCat(): JSX.Element {


    useForceLogin();

    const [coupons, setCoupons] = useState<CouponModel[]>([]);
    const navigate = useNavigate();
    const params = useParams();
    const category = params.category;
    
    useEffect(() => {


            (async () => {
                try {
                    const coupons = await companyService.getAllCouponsBuyCat(category);
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
        <div className="ListForSortByCat reshima">


            <SortBox/>
            <br />


            <fieldset>

                <h3>רשימת קופוני החברה לפי קטגוריה: {category} </h3>
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

                {coupons.map(c => (<CouponCard key={c.id} coupon={c}/>))}

            </fieldset>
        

         
			
        </div>
    );
}

export default ListForSortByCat;
