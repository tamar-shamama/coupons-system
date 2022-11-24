import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { isNoSubstitutionTemplateLiteral } from "typescript";
import CouponModel from "../../../../Models/CouponModel";
import { couponsStore } from "../../../../Redux/CouponsState";
import customerService from "../../../../Service/CustomerService";
import notificationService from "../../../../Service/NotificationService";
import "./BuyCouponCard.css";

interface BuyCouponCardProps {
    coupon: CouponModel;
}

function BuyCouponCard(props: BuyCouponCardProps): JSX.Element {


    const [compName, setCompName] = useState<string>();


    // get the ownet company of the coupon from the server
    useEffect(() => {

        (async () => {
            try {
                const compName = await customerService.getOwnerCompany(props.coupon.id);
                setCompName(compName);
            } catch (err: any) {
                notificationService.error(err);
            }
        })();

    },[]);
    
    
    // if the customer allready bought this coupon, said coupon will be
    // in global state allready, and owned will be set as true
    const [owned, setOwned] = useState<boolean>();
    
    useEffect(() => {

        const allreadyBoughtCoupons = couponsStore.getState().coupons;
            if (allreadyBoughtCoupons.find(c => c.id === props.coupon.id)) {
                setOwned(true);
            } else {
                setOwned(false);
            }
    },[]);


    
    function translateCategory(): string {

        if (props.coupon.category === "VACATION") {
            return "חופשה";
        } else if (props.coupon.category === "ELECTRONICS") {
            return "מוצרי חשמל";
        } else if (props.coupon.category === "FOOD") {
            return "אוכל";
        } else if (props.coupon.category === "RESTAURANT") {
            return "מסעדות";
        }
    }
    
    return (
        <div className="BuyCouponCard">

            <div>{props.coupon.id}</div>
            <div className="space"></div>

            <div>{translateCategory()}</div>
            <div className="space"></div>

            <div>{props.coupon.title}</div>
            <div className="space"></div>

            <div>{props.coupon.description}</div>
            <div className="space"></div>

            <div>{props.coupon.amount}</div>
            <div className="space"></div>

            <div>{props.coupon.startDate.toString()}</div>
            <div className="space"></div>

            <div>{props.coupon.expirationDate.toString()}</div>
            <div className="space"></div>

            <div>{props.coupon.price}₪</div>
            <div className="space"></div>

            <div>{compName}</div>
            <div className="space"></div>

            <div id="space"><NavLink to={"/customerShowOne/" + props.coupon.id} title="ראה פרטים">🔍</NavLink></div>
                

            <div id="space">


                {!owned && (
                    <>
                        <NavLink to={"/customerBuyCoupon/" + props.coupon.id} title="קנה">✖️</NavLink>
                    </>
                )}
                {owned && (
                    <>
                        <p>
                            נקנה
                        </p>
                    </>
                )}
            </div>

           <br />
           <br />

			
        </div>
    );
}

export default BuyCouponCard;