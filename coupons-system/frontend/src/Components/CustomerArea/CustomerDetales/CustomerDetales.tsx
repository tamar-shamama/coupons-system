import { SyntheticEvent, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CustomerModel from "../../../Models/CustomerModel";
import customerService from "../../../Service/CustomerService";
import notificationService from "../../../Service/NotificationService";
import useForceLogin from "../../../Utils/useForceLogin";
import "./CustomerDetales.css";

function CustomerDetales(): JSX.Element {

    useForceLogin();

    const [customer, setCustomer] = useState<CustomerModel>();
    const [a, setA] = useState<boolean>();
    const navigate = useNavigate();



    useEffect(() => {
        setA(true);
    },[])

    function showPassword(e:SyntheticEvent) {
        e.preventDefault();
        if (a === true) {
            setA(false);
        } else if (a === false) {
            setA(true);
        }
    }


    useEffect(() => {


            (async() => {
                try {
                    const customer = await customerService.getCustomerDetailes();
                    setCustomer(customer);
                } catch (error: any) {
                    notificationService.error(error);
                    if (error.response?.data?.error === "Unauthorized") {
                        navigate("/home");
                    }
                    
                }
            })();



    },[]);



    return (
        <div className="CustomerDetales details">

                        
            {customer && (

            <>

                <p>
                    <h3>פרטים:</h3>
                </p>

                <br />

                <p>
                    <span className="labl">מספר זיהוי: </span>
                    <span className="pratim">{customer.id}</span>
                </p>

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
                    <span className="labl">סיסמא: </span>
                    {a && (
                        <>
                            <span className="pratim"> ****</span>
                            <span title="ראה סיסמה"><button onClick={showPassword}>👁️‍🗨️</button></span>
                        </>
                    )}
                    {!a && (
                        <>
                            <span className="pratim">{customer.password}</span>
                            <span title="הסתר סיסמה"><button onClick={showPassword}>👁️‍🗨️</button></span>
                        </>
                    )}
                </p>

                <br />
                <br />
                <br />

                <NavLink to={"/customerCoupons"}>בחזרה לרשימת הקופונים </NavLink>
                <span> | </span>
                <NavLink to={"/buy"}>קופונים זמינים לקנייה </NavLink>
                <span> | </span>
                <NavLink to={"/home"}>בחזרה לדף הבית </NavLink>
                <br />
                <br />


            </>

            

            )}
			
        </div>
    );
}

export default CustomerDetales;
