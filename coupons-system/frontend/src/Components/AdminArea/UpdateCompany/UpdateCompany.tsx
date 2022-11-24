import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import CompanyModel from "../../../Models/CompanyModel";
import administratorService from "../../../Service/AdministratorService";
import notificationService from "../../../Service/NotificationService";
import useForceLogin from "../../../Utils/useForceLogin";
import "./UpdateCompany.css";

function UpdateCompany(): JSX.Element {

    useForceLogin();

     const {register, handleSubmit, formState, setValue} = useForm<CompanyModel>();
     const navigate = useNavigate();
     const params = useParams();
     const companyId = +params.companyId;
 
     // מתודה כדי למלא את הערכים המקוריים בטופס
     useEffect(()=>{


            administratorService.getOneCompany(companyId).then(comp=>{
                setValue("id", companyId);
                setValue("name", comp.name);
                setValue("email", comp.email);
                setValue("password", comp.password);
            })
            .catch(err=> notificationService.error(err));
            


     }, []);
 
 
     async function send(company: CompanyModel) {
 
         company.id = companyId;
 
         try {
             await administratorService.updateCompany(company);
             notificationService.success("פרטי החברה עודכנו");
             navigate("/companiesList"); 
 
         } catch(err:any) {
            notificationService.error(err);
            if (err.response?.data?.error === "Unauthorized") {
                navigate("/home");
            }
         }
     }



    return (
        <div className="UpdateCompany">

        <h3>שינוי סיסמה</h3>

            <form >

                <label>מספר זיהוי:</label>
                <input type="text" readOnly {...register("id")} />
                <br />

                <label>שם החברה:</label>
                <input type="text" readOnly {...register("name")} />
                <br />

                <label>דוא"ל החברה: </label>
                <input type="text" readOnly {...register( "email")} />
                <br />

                <label>סיסמה: </label>
                <input type="password" {...register("password", {
                    required: {value:true, message:"***  חובה לתת סיסמה."},
                    minLength: {value:4, message:"*** סיסמה חייבת להכיל לפחות ארבעה תווים."}
                })} />
                <span className="valid">{formState.errors.password && "   ****"}</span>
                <br />

                <br />
                <p>{formState.errors?.password?.message}</p>

    
            <button onClick={handleSubmit(send)}>עריכה</button>
    
            </form>

            <br />
            <br />

            <NavLink to={"/CompaniesList"}>בחזרה לרשימת החברות </NavLink>
            <span> | </span>
            <NavLink to={"/home"}>בחזרה לדף הבית </NavLink>
			
        </div>
    );
}

export default UpdateCompany;
