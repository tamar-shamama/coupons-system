import { NavLink } from "react-router-dom";
import "./CustomerMenu.css";

function CustomerMenu(): JSX.Element {
    return (
        <div className="CustomerMenu">

        <br />


        <NavLink to={"/buy"}>
            <span>✖️</span>
            <span>&nbsp; &nbsp;</span>
            <span>קניית קופון</span>
        </NavLink>

        <NavLink to={"/customerCoupons"}>
            <span>🔍</span>
            <span>&nbsp; &nbsp;</span>
            <span> הקופונים שלי</span>
        </NavLink>

        <NavLink to={"/customerDetailes"}>
            <span>❓</span>
            <span>&nbsp; &nbsp;</span>
            <span>פרטים</span>
        </NavLink>




        <br />
        <br />
        <br />
        <br />
			
        </div>
    );
}

export default CustomerMenu;
