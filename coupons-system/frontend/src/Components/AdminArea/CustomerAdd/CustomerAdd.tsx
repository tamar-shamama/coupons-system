import { json } from "node:stream/consumers";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CustomerModel from "../../../Models/CustomerModel";
import administratorService from "../../../Service/AdministratorService";
import notificationService from "../../../Service/NotificationService";
import useForceLogin from "../../../Utils/useForceLogin";
import "./CustomerAdd.css";

function CustomerAdd(): JSX.Element {

    useForceLogin();

    const {register, handleSubmit, formState} = useForm<CustomerModel>();
    const navigate = useNavigate();


    async function send(customer: CustomerModel) {


        try {
            await administratorService.addCustomer(customer);
            notificationService.success("הלקוח נוסף בהצלחה");
            navigate("/listCustomers");
        
        } catch (error:any) {
            notificationService.error(error);
            if (error.response?.data?.error === "Unauthorized") {
                navigate("/home");
            }
        }
    }


    return (
        <div className="CustomerAdd">

            <h3>הוספת לקוח</h3>

            <form >

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
                <input type="email" {...register( "email", {
                    required: {value:true, message:"***  חובה לתת דואר אלקטרוני."},
                    pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message:"***  מבנה דוא''ל לא תקין."}
                })} />
                <span className="valid">{formState.errors.email && "   ****"}</span>
                <br />

                <label>סיסמה: </label>
                <input type="password" {...register("password", {
                    required: {value:true, message:"***  חובה לתת סיסמה."},
                    minLength: {value:4, message:"*** סיסמה חייבת להכיל לפחות ארבעה תווים."}
                })} />
                <span className="valid">{formState.errors.password && "   ****"}</span>
                <br />

                <br />
                <p>{formState.errors?.firstName?.message}</p>
                <p>{formState.errors?.lastName?.message}</p>
                <p>{formState.errors?.email?.message}</p>
                <p>{formState.errors?.password?.message}</p>

    
                <button onClick={handleSubmit(send)}>הוספה</button>
    
            </form>

            <br />
            <br />
            <br />

            <NavLink to={"/listCustomers"}>בחזרה לרשימת הלקוחות </NavLink>
            <span> | </span>
            <NavLink to={"/home"}>בחזרה לדף הבית </NavLink>



			
        </div>
    );
}

export default CustomerAdd;
