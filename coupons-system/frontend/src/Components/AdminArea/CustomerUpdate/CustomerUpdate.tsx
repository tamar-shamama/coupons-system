import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import CustomerModel from "../../../Models/CustomerModel";
import administratorService from "../../../Service/AdministratorService";
import notificationService from "../../../Service/NotificationService";
import useForceLogin from "../../../Utils/useForceLogin";
import "./CustomerUpdate.css";

function CustomerUpdate(): JSX.Element {

    useForceLogin();

    const {register, handleSubmit, formState, setValue} = useForm<CustomerModel>();
     const navigate = useNavigate();
     const params = useParams();
     const customerId = +params.customerId;
 
     useEffect(()=>{


            administratorService.getOneCustomer(customerId).then(cust=>{
                setValue("id", customerId);
                setValue("firstName", cust.lastName);
                setValue("lastName", cust.lastName);
                setValue("email", cust.email);
                setValue("password", cust.password);
            })
            .catch(err=> notificationService.error(err));



     }, []);
 
 
     async function send(customer: CustomerModel) {
 
         customer.id = customerId;
 
         try {
             await administratorService.updateCustomer(customer);
             notificationService.success("פרטי הלקוח עודכנו בהצלחה");
             navigate("/listCustomers"); 
 
         } catch(err:any) {
            notificationService.error(err);
            if (err.response?.data?.error === "Unauthorized") {
                navigate("/home");
            }
         }
     }



    return (
        <div className="CustomerUpdate">

            <h3>עדכון פרטי לקוח</h3>

            <form >

                <label>מספר זיהוי:</label>
                <input type="text" readOnly {...register("id")} />
                <br />

                <label>שם פרטי:</label>
                <input type="text" {...register("firstName", {
                    required: {value:true, message:"*** חובה לתת שם."},
                    minLength: {value:2, message:"*** שם חייב להכיל לפחות שני תווים."}
                })} />
                <span className="valid">{formState.errors.firstName && "   ****"}</span>
                <br />


                <label>שם משפחה:</label>
                <input type="text" {...register("lastName", {
                    required: {value:true, message:"***  חובה לתת שם משפחה."},
                    minLength: {value:2, message:"*** שם משפחה חייב להכיל לפחות שני תווים."}
                })} />
                <span className="valid">{formState.errors.lastName && "   ****"}</span>
                <br />


                <label>דוא"ל: </label>
                <input type="email" readOnly {...register( "email")} />
                <br />

                <label>סיסמה: </label>
                <input type="password" {...register("password")} />
                <br />

                <br />
                <p>{formState.errors?.firstName?.message}</p>
                <p>{formState.errors?.lastName?.message}</p>


            <button onClick={handleSubmit(send)}>עריכה</button>

            </form>

            <br />
            <br />

            <NavLink to={"/listCustomers"}>בחזרה לרשימת הלקוחות </NavLink>
            <span> | </span>
            <NavLink to={"/home"}>בחזרה לדף הבית </NavLink>
			
        </div>
    );
}

export default CustomerUpdate;
