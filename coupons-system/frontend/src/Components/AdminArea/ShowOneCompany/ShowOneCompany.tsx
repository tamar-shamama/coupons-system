import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import CompanyModel from "../../../Models/CompanyModel";
import administratorService from "../../../Service/AdministratorService";
import edit from "../../../Assets/Images/edit.png";
import "./ShowOneCompany.css";
import notificationService from "../../../Service/NotificationService";
import useForceLogin from "../../../Utils/useForceLogin";

function ShowOneCompany(): JSX.Element {

    useForceLogin();

    const params = useParams();
    const companyId = +params.companyId;
    const [company, setCompany] = useState<CompanyModel>();
    const navigate = useNavigate();


    useEffect(() => {


            (async() => {
                try {
                    const company = await administratorService.getOneCompany(companyId);
                    if (company === undefined) {
                        notificationService.error("company " + companyId + " not found");
                        navigate("/CompaniesList")
                    }
                    setCompany(company);

                } catch (error: any) {
                    notificationService.error(error);
                    if (error.response?.data?.error === "Bad Request") {
                        navigate("/CompaniesList");
                    }
                    if (error.response?.data?.error === "Unauthorized") {
                        navigate("/home");
                    }
                }
            })();
            


    },[]);



    return (
        <div className="ShowOneCompany details">

            {company && (

                <>

                    <h3>פרטי החברה</h3>
                    
                    <p>
                        <span className="labl">שם החברה: </span>
                        <span className="pratim">{company.name}</span>
                    </p>

                    <p>
                        <span className="labl">דוא"ל: </span>
                        <span className="pratim">{company.email}</span>
                    </p>

                    <p>
                        <span className="labl">מספר זיהוי: </span>
                        <span className="pratim">{company.id}</span>
                    </p>

                    <br />


                <span className="peula">
                    <NavLink to={"/deleteCompany/" + companyId}>מחק ❌</NavLink>
                </span>

                <span className="peula">
                    <NavLink to={"/updateCompany/" + companyId}>ערוך 
                        <span>&nbsp;</span>
                        <span><img src={edit} alt="" /></span>
                    </NavLink>
                </span>



                    <br />
                    <br />
                    <br />

                    <NavLink to={"/CompaniesList"}>בחזרה לרשימת החברות </NavLink>
                    <span> | </span>
                    <NavLink to={"/home"}>בחזרה לדף הבית </NavLink>

                </>
            )}
			  
        </div>
    );
}

export default ShowOneCompany;
