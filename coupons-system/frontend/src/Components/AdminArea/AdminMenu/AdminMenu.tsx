import { NavLink } from "react-router-dom";
import "./AdminMenu.css";

function AdminMenu(): JSX.Element {
    return (
        <div className="AdminMenu">

            <br />

            <NavLink to={"/CompaniesList"}>
                <span>馃攳</span>
                <span>&nbsp; &nbsp;</span>
                <span>讻诇 讛讞讘专讜转</span>
            </NavLink>

            <NavLink to={"/addCompany"}>
                <span>鉁栵笍</span>
                <span>&nbsp; &nbsp;</span>
                <span>讛讜住驻转 讞讘专讛</span>
            </NavLink>

    

            <br />


            <NavLink to={"/listCustomers"}>
                <span>馃攳</span>
                <span>&nbsp; &nbsp;</span>
                <span>讻诇 讛诇拽讜讞讜转</span>
            </NavLink>

            <NavLink to={"/addCustomer"}>
                <span>鉁栵笍</span>
                <span>&nbsp; &nbsp;</span>
                <span>讛讜住驻转 诇拽讜讞</span>
            </NavLink>

           



            <br />
            <br />
            <br />
            <br />
			
        </div>
    );
}

export default AdminMenu;
