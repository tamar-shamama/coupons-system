import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import CompanyModel from "../../../Models/CompanyModel";
import "./CompanyRegister.css";

function CompanyRegister(): JSX.Element {

    const {register, handleSubmit} = useForm<CompanyModel>();
    const navigate = useNavigate();

    async function send(company: CompanyModel) {

        navigate("/toda");
    }



    return (
        <div className="CompanyRegister">


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

                <label>שם החברה:</label>
                <input type="text" {...register("name")} />
                <br />

                <label>דוא"ל החברה: </label>
                <input type="text" {...register( "email")} />
                <br />

                <label>סיסמה: </label>
                <input type="text" {...register("password")} />
                <br />


                <button onClick={handleSubmit(send)}>הגש בקשה</button>

            </form>

            <br />
            <br />
            <br />

            <NavLink to={"/home"}>בחזרה לדף הבית </NavLink>


			
        </div>
    );
}

export default CompanyRegister;
