import { NavLink } from "react-router-dom";
import CustomerModel from "../../../Models/CustomerModel";
import edit from "../../../Assets/Images/edit.png";
import "./CustomerCard.css";

interface CustomerCardProps {
    customer: CustomerModel;
}

function CustomerCard(props: CustomerCardProps): JSX.Element {

    return (
        <div className="CustomerCard">

            <div>{props.customer.id}</div>
            <div className="space"></div>

            <div>{props.customer.firstName}</div>
            <div className="space"></div>

            <div>{props.customer.lastName}</div>
            <div className="space"></div>

            <div>{props.customer.email}</div>
            <div className="space"></div>

            <div className="kaftor">
                <NavLink to={"/showCustomer/" + props.customer.id} title="ראה פרטים">🔍</NavLink>
                &nbsp;
                &nbsp;
                <NavLink to={"/deleteCustomer/" + props.customer.id} title="מחק">➖</NavLink>
                &nbsp;
                &nbsp;
                <NavLink to={"/updateCustomer/" + props.customer.id} title="ערוך">
                <span><img src={edit} alt="" /></span>
                </NavLink>
            </div>

           

			
        </div>
    );
}

export default CustomerCard;
