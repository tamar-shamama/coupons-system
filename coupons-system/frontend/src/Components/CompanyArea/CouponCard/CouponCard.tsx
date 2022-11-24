import { NavLink } from "react-router-dom";
import CouponsModel from "../../../Models/CouponModel";
import edit from "../../../Assets/Images/edit.png"
import "./CouponCard.css";
import { useEffect } from "react";
import { couponsStore } from "../../../Redux/CouponsState";

interface CouponCardProps {
    coupon: CouponsModel;
}

function CouponCard(props: CouponCardProps): JSX.Element {

    
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

        <div className="CouponCard">

            <div>{props.coupon.id}</div>
            <div className="space"></div>

            <div>{translateCategory()}</div>
            <div className="space"></div>

            <div>{props.coupon.title}</div>
            <div className="space"></div>

            <div title={props.coupon.description}>{props.coupon.description}</div>
            <div className="space"></div>

            <div>{props.coupon.amount}</div>
            <div className="space"></div>

            <div>{props.coupon.startDate.toString()}</div>
            <div className="space"></div>

            <div>{props.coupon.expirationDate.toString()}</div>
            <div className="space"></div>

            <div>{props.coupon.price}₪</div>
            <div className="space"></div>

            <div className="kaftor">
                
                <NavLink to={"/showCoupon/" + props.coupon.id} title="ראה פרטים">🔍</NavLink>
                &nbsp;
                &nbsp;
               
                <NavLink to={"/updateCoupon/" + props.coupon.id} title="ערוך"><img src={edit} alt="" /></NavLink>
                &nbsp;
                &nbsp;

                <NavLink to={"/deleteCoupon/" + props.coupon.id} title="מחק">❌</NavLink>
               

            </div>

           <br />
           <br />

			
        </div>
    );
}

export default CouponCard;
