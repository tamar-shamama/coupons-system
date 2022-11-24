import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { applyMiddleware } from "redux";
import { authStore } from "../../../Redux/AuthState";
import { couponsStore } from "../../../Redux/CouponsState";
import companyService from "../../../Service/CompanyService";
import notificationService from "../../../Service/NotificationService";
import appConfig from "../../../Utils/Config";
import useForceLogin from "../../../Utils/useForceLogin";
import "./CouponDelete.css";

function CouponDelete(): JSX.Element {


    useForceLogin();

    const params = useParams();
    const couponId = +params.couponId;
    const navigate = useNavigate();
    const uri = appConfig.imagesUrl;
    
    
    useEffect (() => {
        

        (async() => {
        
            try {
        
                    
                const ok = window.confirm("למחוק ❓");
                if (!ok) {
                    navigate("/showCoupon/" + couponId);
                    return
                }
                  
                // delete photo
                deleteFile();

               // delete coupon
                await companyService.deleteCoupon(couponId);
                notificationService.success("הקופון נמחק");
                navigate("/couponsList");
        
            } catch (err:any) {
                notificationService.error(err);
                if (err.response?.data?.error === "Unauthorized") {
                    navigate("/home");
                }
            }
        })();


    },[]);



    function deleteFile() {

        let c = couponsStore.getState().coupons.find(c => c.id === couponId).image;

        // if image exist
        if (c != "image") {

            let xhttp = new XMLHttpRequest();
    
            xhttp.onload = function() {
    
                if (this.status==200) {
                    console.log(this.response);
                } else {
                    let e = JSON.parse(this.response);
                    console.log("ERROR: " + e.status + ". " + e.message);
                }
            }
    
            console.log(c);
            xhttp.open("DELETE", uri + c);
            xhttp.send();
        };

    }





return null;

}

export default CouponDelete;
