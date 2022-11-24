import { SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerGetOneCoupon.css";

function CustomerGetOneCoupon(): JSX.Element {

    const navigator = useNavigate();

    function showCoupon(e:SyntheticEvent) {

        e.preventDefault();
        const val = document.getElementById("val") as any;
        navigator("/customerShowOne/" + val.value);

    }

    return (
        <div className="CustomerGetOneCoupon hipus">

            <form>
                <span>חפש קופון לפי מספר זיהוי: </span>
                <input type="number" id="val" />
                <button onClick={showCoupon}>שליחה</button>
            </form>

        </div>
    );
}

export default CustomerGetOneCoupon;
