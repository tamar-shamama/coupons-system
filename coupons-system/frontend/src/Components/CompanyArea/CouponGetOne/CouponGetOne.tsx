import { SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./CouponGetOne.css";

function CouponGetOne(): JSX.Element {

    const navigator = useNavigate();



    function showCustomer(e:SyntheticEvent) {

        e.preventDefault();
        const val = document.getElementById("val") as any;
        navigator("/showCoupon/" + val.value);

    }



    return (
        <div className="CouponGetOne hipus">
            <form>
                <span>חפש קופון לפי מספר זיהוי: </span>
                <input type="number" id="val" />
                <button onClick={showCustomer}>שליחה</button>
            </form>
        </div>
    );
}

export default CouponGetOne;
