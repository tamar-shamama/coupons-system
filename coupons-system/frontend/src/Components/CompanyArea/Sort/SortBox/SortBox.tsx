import { useState } from "react";
import CouponGetOne from "../../CouponGetOne/CouponGetOne";
import SortByCat from "../SortByCat/SortByCat";
import SortByPrice from "../SortByPrice/SortByPrice";
import "./SortBox.css";

function SortBox(): JSX.Element {

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
        <div className="SortBox">

            <button onClick={show1}>חיפוש לפי מספר</button>
            <button onClick={show2}>סינון לפי קטגוריה</button>
            <button onClick={show3}>סינון לפי מחיר</button>
            <br />

            {a && <CouponGetOne/>}
            {b && <SortByCat/>}
            {c && <SortByPrice/>}
			
        </div>
    );
}

export default SortBox;
