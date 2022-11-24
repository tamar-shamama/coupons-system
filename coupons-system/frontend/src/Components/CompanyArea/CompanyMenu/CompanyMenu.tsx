import { NavLink } from "react-router-dom";
import { authStore } from "../../../Redux/AuthState";
import "./CompanyMenu.css";

function CompanyMenu(): JSX.Element {


    return (
        <div className="CompanyMenu">

            <br />


            <NavLink to={"/couponsList"}>
                <span>🔍</span>
                <span>&nbsp; &nbsp;</span>
                <span>כל הקופונים</span>
            </NavLink>

            <NavLink to={"/addCoupon"}>
                <span>✖️</span>
                <span>&nbsp; &nbsp;</span>
                <span>יצירת קופון חדש</span>
            </NavLink>

            <NavLink to={"/detailes"}>
                <span>❓</span>
                <span>&nbsp; &nbsp;</span>
                <span>פרטי החברה</span>
            </NavLink>




            <br />
            <br />
            <br />
            <br />
			
        </div>
    );
}

export default CompanyMenu;
