import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CompanyModel from "../../../Models/CompanyModel";
import { companiesStore } from "../../../Redux/CompaniesState";
import administratorService from "../../../Service/AdministratorService";
import CompanyService from "../../../Service/CompanyService";
import notificationService from "../../../Service/NotificationService";
import useForceLogin from "../../../Utils/useForceLogin";
import CompanyCard from "../CompanyCard/CompanyCard";
import GetOneCompany from "../GetOneCompany/GetOneCompany";
import "./CompaniesList.css";

function CompaniesList(): JSX.Element {


   useForceLogin();


    const [companies, setCompanies] = useState<CompanyModel[]>([]);
    const navigate = useNavigate();
    
    
    useEffect(() => {


            // לקיחת החברות מהשרת או מהסטייט הגלובלי בכניסה לקומפוננטה
            (async () => {
                try {
                    const companies = await administratorService.getAllCompanies();
                    setCompanies(companies);
                } catch (error: any) {
                    notificationService.error(error);
                    if (error.response?.data?.error === "Unauthorized") {
                        navigate("/home");
                    }
                }
                
            })();
    
    
            // שינוי רשימת החברות אם הן משתנות בסטייט הגלובלי
            const unsubscribe = companiesStore.subscribe(() => {
                setCompanies(companiesStore.getState().companies);
            });
    
            return () => {
                unsubscribe();
            };

            


    },[]);
    
    

  



    return (
        <div className="CompaniesList reshima">

            <br />
            <GetOneCompany/>
            
            <br />

            <fieldset>

                <h3>רשימת כל החברות</h3>

                <NavLink id="add" to={"/addCompany"}>הוספת חברה</NavLink>

                <br />
                <br />
                <br />

                <div id="koteret">

                    <div>מספר זיהוי</div>
                    <div className="space"></div>
                    <div>שם החברה</div>
                    <div className="space"></div>
                    <div>דוא"ל</div>
                    <div className="space"></div>
                </div>


                <br />
                <br />

                {companies.map(comps => (<CompanyCard key={comps.id} company={comps}/>))}
                <br />
                <br />


            </fieldset>
            
            
            
            
        </div>
    );
}

export default CompaniesList;
