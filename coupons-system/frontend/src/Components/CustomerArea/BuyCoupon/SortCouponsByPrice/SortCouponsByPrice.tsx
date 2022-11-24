import { SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./SortCouponsByPrice.css";

function SortCouponsByPrice(): JSX.Element {

    const navigator = useNavigate();

    function showCoupons(e:SyntheticEvent) {

        e.preventDefault();
        const val1 = document.getElementById("prc");
        const val2 = val1 as any;
        navigator("/price/" + val2.value);

    }

    return (
        <div className="SortCouponsByPrice hipus">

            <form>
                <span>סינון לפי מחיר: </span>
                <input type="number" id="prc" />
                <button onClick={showCoupons}>שליחה</button>
            </form>
			
        </div>
    );
}

export default SortCouponsByPrice;
