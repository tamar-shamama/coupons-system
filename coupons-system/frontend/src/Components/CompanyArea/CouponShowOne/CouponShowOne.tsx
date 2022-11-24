import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import CouponsModel from "../../../Models/CouponModel";
import companyService from "../../../Service/CompanyService";
import edit from "../../../Assets/Images/edit.png"
import "./CouponShowOne.css";
import notificationService from "../../../Service/NotificationService";
import useForceLogin from "../../../Utils/useForceLogin";
import appConfig from "../../../Utils/Config";
import { couponsStore } from "../../../Redux/CouponsState";

function CouponShowOne(): JSX.Element {

    useForceLogin();

    const params = useParams();
    const couponId = +params.couponId;
    const [coupon, setCoupon] = useState<CouponsModel>();
    const navigate = useNavigate();


    useEffect(() => {


        (async() => {

            try {
                const coupon = await companyService.getOneCoupon(couponId);

                if (coupon === undefined) {
                    notificationService.error("coupon " + couponId + " not exists");
                    navigate("/couponsList");
                } else {
                    setCoupon(coupon);
                }
                
            } catch (error: any) {

                notificationService.error(error);
                
                if (error.response?.data?.error === "Bad Request") {
                    navigate("/couponsList");
                }
                if (error.response?.data?.error === "Unauthorized") {
                    navigate("/home");
                }
            }
        })();


        const unsubscibe = couponsStore.subscribe(()=>{
            setCoupon(couponsStore.getState().coupons.find(c => c.id === couponId));
        });
    
        return ()=>{
            unsubscibe();
        }


    },[]);


    // if the coupon has a photo, returns true
    function isPhoto(): boolean {

        if (coupon.image === "image") {
            return false;
        } else {
            return true;
        }
    };



    return (
        <div className="CouponShowOne details">


            {coupon && (

                <>

                    <h3>פרטי קופון</h3>

                    <p>
                        <span className="labl">שם: </span>
                        <span className="pratim">{coupon.title}</span>
                    </p>

                    <p>
                        <span className="labl">תיאור: </span>
                        <span className="pratim">{coupon.description}</span>
                    </p>

                    <p>
                        <span className="labl">קטגוריה: </span>
                        <span className="pratim">{coupon.category}</span>
                    </p>
                    <p>
                        <span className="labl">כמות: </span>
                        <span className="pratim">{coupon.amount}</span>
                    </p>
                    <p>
                        <span className="labl">תאריך ייצור: </span>
                        <span className="pratim">{coupon.startDate.toString()}</span>
                    </p>
                    <p>
                        <span className="labl">תאריך תפוגה: </span>
                        <span className="pratim">{coupon.expirationDate.toString()}</span>
                    </p>

                    <p>
                        <span className="labl">מספר זיהוי: </span>
                        <span className="pratim">{coupon.id}</span>
                    </p>

                    <p>
                        <span className="labl">מחיר: </span>
                        <span className="pratim">{coupon.price}</span>
                    </p>

                    {isPhoto() &&
                        (<>
                            <img id="tmuna" src={appConfig.imagesUrl + "dowloadFile/" + coupon.image} alt="coupon photo" />
                        </>)
                    }

                    <br />


                    <span className="peula">
                        <NavLink to={"/deleteCoupon/" + couponId}>מחק ❌</NavLink>
                    </span>

                    <span className="peula">
                        <NavLink to={"/updateCoupon/" + couponId}>ערוך
                            <span>&nbsp;</span>
                            <span><img src={edit} alt="" /></span>
                        </NavLink>
                    </span>




                    <br />
                    <br />
                    <br />

                    <NavLink to={"/couponsList"}>בחזרה לרשימת הקופונים </NavLink>
                    <span> | </span>
                    <NavLink to={"/home"}>בחזרה לדף הבית </NavLink>
                    <br />
                    <br />

                </>
            )}
			
        </div>
    );
}

export default CouponShowOne;
