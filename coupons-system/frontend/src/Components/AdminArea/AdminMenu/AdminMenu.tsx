import { NavLink } from "react-router-dom";
import "./AdminMenu.css";

function AdminMenu(): JSX.Element {
    return (
        <div className="AdminMenu">

            <br />

            <NavLink to={"/CompaniesList"}>
                <span>🔍</span>
                <span>&nbsp; &nbsp;</span>
                <span>כל החברות</span>
            </NavLink>

            <NavLink to={"/addCompany"}>
                <span>✖️</span>
                <span>&nbsp; &nbsp;</span>
                <span>הוספת חברה</span>
            </NavLink>

    

            <br />


            <NavLink to={"/listCustomers"}>
                <span>🔍</span>
                <span>&nbsp; &nbsp;</span>
                <span>כל הלקוחות</span>
            </NavLink>

            <NavLink to={"/addCustomer"}>
                <span>✖️</span>
                <span>&nbsp; &nbsp;</span>
                <span>הוספת לקוח</span>
            </NavLink>

           



            <br />
            <br />
            <br />
            <br />
			
        </div>
    );
}

export default AdminMenu;
