import { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import administratorService from "../../../Service/AdministratorService";
import "./GetOneCompany.css";


function GetOneCompany(): JSX.Element {

    const navigator = useNavigate();



    function showCompany(e:SyntheticEvent) {

        e.preventDefault();
        const val = document.getElementById("val") as any;
        navigator("/showCompany/" + val.value);

    }




    return (
        <div className="GetOneCompany hipus">

            <form>
                <span>חפש חברה לפי מספר זיהוי: </span>
                <input type="number" id="val" />
                <button onClick={showCompany}>שליחה</button>
            </form>

			
        </div>
    );
}

export default GetOneCompany;
