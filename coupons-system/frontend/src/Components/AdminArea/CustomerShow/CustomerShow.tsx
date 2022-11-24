import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import CustomerModel from "../../../Models/CustomerModel";
import administratorService from "../../../Service/AdministratorService";
import edit from "../../../Assets/Images/edit.png"
import "./CustomerShow.css";
import notificationService from "../../../Service/NotificationService";
import useForceLogin from "../../../Utils/useForceLogin";

function CustomerShow(): JSX.Element {

    useForceLogin();

    const params = useParams();
    const customerId = +params.customerId;
    const [customer, setCustomer] = useState<CustomerModel>();
    const navigate = useNavigate();


    useEffect(() => {


            (async() => {
                try {
                    const customer = await administratorService.getOneCustomer(customerId);
                    if (customer === undefined) {
                        notificationService.error("customer " + customerId + " not found");
                        navigate("/listCustomers");
                    }
                    setCustomer(customer);

                } catch (error: any) {
                    notificationService.error(error);
                    if (error.response?.data?.error === "Bad Request") {
                        navigate("/listCustomers");
                    }
                    if (error.response?.data?.error === "Unauthorized") {
                        navigate("/home");
                    }
                }
            })();



    },[]);



    return (
        <div className="CustomerShow details">


        {customer && (

            <>

                <h3>פרטי הלקוח</h3>

                <p>
                    <span className="labl">שם פרטי: </span>
                    <span className="pratim">{customer.firstName}</span>
                </p>

                <p>
                    <span className="labl">שם משפחה: </span>
                    <span className="pratim">{customer.lastName}</span>
                </p>

                <p>
                    <span className="labl">דוא"ל: </span>
                    <span className="pratim">{customer.email}</span>
                </p>

                <p>
                    <span className="labl">מספר זיהוי: </span>
                    <span className="pratim">{customer.id}</span>
                </p>

                <br />


                <span className="peula">
                    <NavLink to={"/deleteCustomer/" + customerId}>מחק ❌</NavLink>
                </span>

                <span className="peula">
                    <NavLink to={"/updateCustomer/" + customerId}>ערוך 
                        <span>&nbsp;</span>
                        <span><img src={edit} alt="" /></span>
                    </NavLink>
                </span>



                <br />
                <br />
                <br />

                <NavLink to={"/listCustomers"}>בחזרה לרשימת הלקוחות </NavLink>
                <span> | </span>
                <NavLink to={"/home"}>בחזרה לדף הבית </NavLink>

                <br />
                <br />

            </>
        )}
			
        </div>
    );
}

export default CustomerShow;
