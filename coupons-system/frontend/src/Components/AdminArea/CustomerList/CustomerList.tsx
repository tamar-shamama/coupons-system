import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CustomerModel from "../../../Models/CustomerModel";
import administratorService from "../../../Service/AdministratorService";
import notificationService from "../../../Service/NotificationService";
import useForceLogin from "../../../Utils/useForceLogin";
import CustomerCard from "../CustomerCard/CustomerCard";
import CustomerGetOne from "../CustomerGetOne/CustomerGetOne";
import "./CustomerList.css";

function CustomerList(): JSX.Element {

    useForceLogin();

    const [customers, setCustomers] = useState<CustomerModel[]>([]);
    const navigate = useNavigate();
    
    useEffect(() => {



            (async () => {
                try {
                    const customers = await administratorService.getAllCustomers();
                    setCustomers(customers);
                } catch (error: any) {
                    notificationService.error(error);
                    if (error.response?.data?.error === "Unauthorized") {
                        navigate("/home");
                    }
                }
                
            })();

        
    },[]);
    


    return (
        <div className="CustomerList reshima">

            <CustomerGetOne/>

            <br />
            
            <fieldset>

                <h3>רשימת כל הלקוחות</h3>

                <NavLink id="add" to={"/addCustomer"}>הוספת לקוח</NavLink>

                <br />
                <br />
                <br />

                <div id="koteret">
                    <div>מספר זיהוי</div>
                    <div className="space"></div>
                    <div>שם פרטי</div>
                    <div className="space"></div>
                    <div>שם משפחה</div>
                    <div className="space"></div>
                    <div>דוא"ל</div>
                </div>

                <br />
                <br />

                {customers.map(customer => (<CustomerCard key={customer.id} customer={customer}/>))}
                <br />
                <br />

            </fieldset>
            
			
        </div>
    );
}

export default CustomerList;
