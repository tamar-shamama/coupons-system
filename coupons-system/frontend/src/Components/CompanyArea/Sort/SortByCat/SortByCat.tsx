import { SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./SortByCat.css";

function SortByCat(): JSX.Element {

    const navigator = useNavigate();

    function showCoupons(e:SyntheticEvent) {

        e.preventDefault();
        const val1 = document.getElementById("cat");
        const val2 = val1 as any;
        navigator("/sort/cat/" + val2.value);

    }


    return (
        <div className="SortByCat hipus">

            <form>
                <span>סינון לפי קטגוריה: </span>
                <select id="cat">
                    <option>== בחירה ==</option>
                    <option value="VACATION">חופשה</option>
                    <option value="ELECTRONICS">מוצרי חשמל</option>
                    <option value="FOOD">אוכל</option>
                    <option value="RESTAURANT">מסעדות</option>
                </select>
                <button onClick={showCoupons}>שליחה</button>
            </form>
			
        </div>
    );
}

export default SortByCat;
