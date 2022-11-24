import { useState } from "react";
import useForceLogin from "../../../../Utils/useForceLogin";
import CustomerGetOneCoupon from "../../CustomerGetOneCoupon/CustomerGetOneCoupon";
import SortCouponsByCat from "../SortCouponsByCat/SortCouponsByCat";
import SortCouponsByPrice from "../SortCouponsByPrice/SortCouponsByPrice";
import "./SortBoxForBuyCoupon.css";

function SortBoxForBuyCoupon(): JSX.Element {


    useForceLogin();

    const [a, setA] = useState<boolean>();
    const [b, setB] = useState<boolean>();
    const [c, setC] = useState<boolean>();


    function show1() {
        setA(true);
        setB(false);
        setC(false);
    }

    function show2() {
        setB(true);
        setA(false);
        setC(false);
    }

    function show3() {
        setC(true);
        setA(false);
        setB(false);
    }


    return (
        <div className="SortBoxForBuyCoupon">

            <button onClick={show1}>חיפוש לפי מספר</button>
            <button onClick={show2}>סינון לפי קטגוריה</button>
            <button onClick={show3}>סינון לפי מחיר</button>
            <br />

            {a && <CustomerGetOneCoupon/>}
            {b && <SortCouponsByCat/>}
            {c && <SortCouponsByPrice/>}
            
            <br />
			
        </div>
    );
}

export default SortBoxForBuyCoupon;
