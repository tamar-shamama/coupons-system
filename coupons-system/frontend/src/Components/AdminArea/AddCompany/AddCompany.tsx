import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CompanyModel from "../../../Models/CompanyModel";
import { companiesStore } from "../../../Redux/CompaniesState";
import administratorService from "../../../Service/AdministratorService";
import notificationService from "../../../Service/NotificationService";
import useForceLogin from "../../../Utils/useForceLogin";
import "./AddCompany.css";

function AddCompany(): JSX.Element {

    useForceLogin();

    const {register, handleSubmit, formState} = useForm<CompanyModel>();
    const navigate = useNavigate();

    async function send(company: CompanyModel) {

        try {
            await administratorService.addCompany(company);
            notificationService.success("חברה נוספה בהצלחה")
            navigate("/CompaniesList");
        
        } catch (error:any) {
            notificationService.error(error);
            if (error.response?.data?.error === "Unauthorized") {
                navigate("/home");
            }
        }
    }



    return (
        <div className="AddCompany">
			
            <h3>הוספת חברה</h3>

            <form >

                <label>שם החברה:</label>
                <input type="text" {...register("name", {
                    required: {value:true, message:"*** חובה לתת שם."},
                    minLength: {value:2, message:"*** שם חייב להכיל לפחות שני תווים."}
                })} />
                <span className="valid">{formState.errors.name && "   ****"}</span>
                <br />


                <label>דוא"ל החברה: </label>
                <input type="text" {...register( "email", {
                    required: {value:true, message:"*** חובה לתת דואר אלקטרוני."},
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
                <p>{formState.errors?.name?.message}</p>
                <p>{formState.errors?.email?.message}</p>
                <p>{formState.errors?.password?.message}</p>
                <button onClick={handleSubmit(send)}>הוספה</button>
                
            </form>

            <br />
            <br />
            <br />

            <NavLink to={"/CompaniesList"}>בחזרה לרשימת החברות </NavLink>
            <span> | </span>
            <NavLink to={"/home"}>בחזרה לדף הבית </NavLink>




        </div>
    );
}

export default AddCompany;
