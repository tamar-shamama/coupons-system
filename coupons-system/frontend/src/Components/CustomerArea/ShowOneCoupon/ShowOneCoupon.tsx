import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import CouponsModel from "../../../Models/CouponModel";
import { couponsStore } from "../../../Redux/CouponsState";
import customerService from "../../../Service/CustomerService";
import notificationService from "../../../Service/NotificationService";
import appConfig from "../../../Utils/Config";
import useForceLogin from "../../../Utils/useForceLogin";
import "./ShowOneCoupon.css";

function ShowOneCoupon(): JSX.Element {

    useForceLogin();
    const params = useParams();
    const couponId = +params.couponId;
    const [coupon, setCoupon] = useState<CouponsModel>();
    const [compName, setCompName] = useState<string>();
    const navigate = useNavigate();
    
    
    const [owned, setOwned] = useState<boolean>(false);
    
    useEffect(() => {
        
        const allreadyBoughtCoupons = couponsStore.getState().coupons;
        if (allreadyBoughtCoupons.find(c => c.id === couponId)) {
            setOwned(true);
        } else {
            setOwned(false);
        }
    },[]);
    
    
    useEffect(() => {
        
        (async() => {

            try {
                const coupon = await customerService.getAnyOneCoupon(couponId);
                setCoupon(coupon);

                const compName = await customerService.getOwnerCompany(couponId);
                setCompName(compName);
                
            } catch (error: any) {
                notificationService.error(error);
                navigate("/buy");
                if (error.response?.data?.error === "Unauthorized") {
                    navigate("/home");
                }
            }

        })();

    },[]);


    function isPhoto(): boolean {

        if (coupon.image === "image") {
            return false;
        } else {
            return true;
        }
    };


    return (
        <div className="ShowOneCoupon details">

            <br />
            {coupon && (
                
                <>


                {owned && (
                    <p id="nirkash">????????</p>
                    )}
                {!owned && (
                    <NavLink id="buy" to={"/customerBuyCoupon/" + couponId} title="??????">   ??? ?????? ??????????</NavLink>
                )}

                <br />
                <br />

                <p>
                    <span className="labl">????: </span>
                    <span className="pratim">{coupon.title}</span>
                </p>

                <p>
                    <span className="labl">??????????: </span>
                    <span className="pratim">{coupon.description}</span>
                </p>

                <p>
                    <span className="labl">??????????????: </span>
                    <span className="pratim">{coupon.category}</span>
                </p>
                <p>
                    <span className="labl">????????: </span>
                    <span className="pratim">{coupon.amount}</span>
                </p>
                <p>
                    <span className="labl">?????????? ??????????: </span>
                    <span className="pratim">{coupon.startDate.toString()}</span>
                </p>
                <p>
                    <span className="labl">?????????? ??????????: </span>
                    <span className="pratim">{coupon.expirationDate.toString()}</span>
                </p>

                <p>
                    <span className="labl">???????? ??????????: </span>
                    <span className="pratim">{coupon.id}</span>
                </p>

                <p>
                    <span className="labl">???????????? ????????: </span>
                    <span className="pratim">{compName}</span>
                </p>

                <p>
                    <span className="labl">????????: </span>
                    <span className="pratim">{coupon.price}</span>
                </p>

                {isPhoto() &&
                        (<>
                            <img id="tmuna" src={appConfig.imagesUrl + "dowloadFile/" + coupon.image} alt="coupon photo" />
                        </>)
                    }

               

                <br />


                <NavLink to={"/customerCoupons"}>???????????????? ?????? </NavLink>
                <span> | </span>
                <NavLink to={"/buy"}>?????????????? ???????????? ???????????? </NavLink>
                <span> | </span>
                <NavLink to={"/home"}>?????????? ?????? ???????? </NavLink>
                <br />

            </>
            )}
			
        </div>
    );
}

export default ShowOneCoupon;
