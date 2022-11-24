import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import CouponsModel from "../../../../Models/CouponModel";
import customerService from "../../../../Service/CustomerService";
import notificationService from "../../../../Service/NotificationService";
import "./CustomerCouponCard.css";

interface CustomerCouponCardProps {
    coupon: CouponsModel;
}

function CustomerCouponCard(props: CustomerCouponCardProps): JSX.Element {


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
        <div className="CustomerCouponCard">

            <div>{props.coupon.id}</div>
            <div className="space"></div>

            <div>{translateCategory()}</div>
            <div className="space"></div>

            <div>{props.coupon.title}</div>
            <div className="space"></div>

            <div>{props.coupon.description}</div>
            <div className="space"></div>

            {/* <div>{props.coupon.amount}</div>
            <div className="space"></div> */}

            <div>{props.coupon.startDate.toString()}</div>
            <div className="space"></div>

            <div>{props.coupon.expirationDate.toString()}</div>
            <div className="space"></div>

            <div>{props.coupon.price}₪</div>
            <div className="space"></div>

            <div>{compName}</div>
            <div className="space"></div>

            <div>
                    <NavLink to={"/customerShowOne/" + props.coupon.id} title="ראה פרטים">🔍</NavLink>
            </div>

           <br />
           <br />

			
        </div>
    );
}

export default CustomerCouponCard;
