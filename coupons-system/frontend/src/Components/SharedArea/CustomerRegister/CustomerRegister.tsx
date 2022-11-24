import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import CustomerModel from "../../../Models/CustomerModel";
import "./CustomerRegister.css";

function CustomerRegister(): JSX.Element {


    const {register, handleSubmit} = useForm<CustomerModel>();
    const navigate = useNavigate();


    
    function send(customer: CustomerModel) {
       navigate("/toda");
    }



    return (
        <div className="CustomerRegister">

            {process.env.NODE_ENV === "development" &&
                <fieldset>
                    <legend >== הערה למפתחים ==</legend>
                        באתר האמיתי, מנהלי האתר יקבלו את
                        הבקשה ויוכלו להחליט אם לאשר אותה
                        ולרשום את המשתמש החדש. כרגע לא
                        נשלח דבר בהגשת בקשה הזו.
                    
                </fieldset>
            }

            <br />

            <form >

            <label>שם פרטי:</label>
            <input type="text" {...register("firstName")} />
            <br />

            <label>שם משפחה:</label>
            <input type="text" {...register("lastName")} />
            <br />

            <label>דוא"ל: </label>
            <input type="text" {...register( "email")} />
            <br />

            <label>סיסמה: </label>
            <input type="text" {...register("password")} />
            <br />


            <button onClick={handleSubmit(send)}>הוספה</button>

            </form>

            <br />
            <br />
            <br />

            <NavLink to={"/home"}>בחזרה לדף הבית </NavLink>


			
        </div>
    );
}

export default CustomerRegister;
