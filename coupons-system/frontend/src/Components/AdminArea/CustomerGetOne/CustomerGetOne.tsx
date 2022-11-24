import { SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerGetOne.css";

function CustomerGetOne(): JSX.Element {

    const navigator = useNavigate();



    function showCustomer(e:SyntheticEvent) {

        e.preventDefault();
        const val = document.getElementById("val") as any;
        navigator("/showCustomer/" + val.value);

    }

    return (
        <div className="CustomerGetOne hipus">

            <form>
                <span>חפש לקוח לפי מספר זיהוי: </span>
                <input type="number" id="val" />
                <button onClick={showCustomer}>שליחה</button>
            </form>

			
        </div>
    );
}

export default CustomerGetOne;
