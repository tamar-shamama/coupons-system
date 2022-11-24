import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import customerService from "../../../../Service/CustomerService";
import notificationService from "../../../../Service/NotificationService";
import useForceLogin from "../../../../Utils/useForceLogin";
import "./DoBuyCoupon.css";

function DoBuyCoupon(): JSX.Element {

    useForceLogin();
    const params = useParams();
    const couponId = +params.couponId;
    const navigate = useNavigate();

    useEffect (() => {


            (async() => {
    
                try {
    
                    await customerService.buyCoupon(couponId);
                    notificationService.success("קופון נקנה");
                    navigate("/customerCoupons");
    
    
                } catch (err:any) {
                    notificationService.error(err);
                    if (err.response?.data?.error === "Unauthorized") {
                        navigate("/home");
                    }
                }
            })();


    },[]);



    return null;
}

export default DoBuyCoupon;
