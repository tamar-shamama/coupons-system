import { SyntheticEvent, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CompanyModel from "../../../Models/CompanyModel";
import companyService from "../../../Service/CompanyService";
import notificationService from "../../../Service/NotificationService";
import useForceLogin from "../../../Utils/useForceLogin";
import "./Detailes.css";

function Detailes(): JSX.Element {

    useForceLogin();
    const navigate = useNavigate();

    const [company, setCompany] = useState<CompanyModel>();
    const [a, setA] = useState<boolean>();

    useEffect(() => {
        setA(true);
    },[])
    

    // get the logged company
    useEffect(() => {



            (async() => {
                try {
                    const company = await companyService.getCompanyDetailes();
                    setCompany(company)
                    
                } catch (error: any) {
                    notificationService.error(error);
                    if (error.response?.data?.error === "Unauthorized") {
                        navigate("/home");
                    }
                }
            })();



    },[]);


    // handle show password button
    function showPassword(e:SyntheticEvent) {

        e.preventDefault();

        if (a === true) {
            setA(false);
        } else if (a === false) {
            setA(true);
        }
    }



    return (
        <div className="Detailes details">

            {company && (

                <>

                    <p>
                        <h3>פרטי החברה:</h3>
                    </p>

                    <br />

                    <p>
                        <span className="labl">מספר זיהוי: </span>
                        <span className="pratim">{company.id}</span>
                    </p>

                     <p>
                        <span className="labl">שם: </span>
                        <span className="pratim">{company.name}</span>
                    </p>

                    <p>
                        <span className="labl">דוא"ל: </span>
                        <span className="pratim">{company.email}</span>
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
                                <span className="pratim">{company.password}</span>
                                <span title="הסתר סיסמה"><button onClick={showPassword}>👁️‍🗨️</button></span>
                            </>
                        )}
                    </p>

                    <br />
                    <NavLink to={"/home"}>בחזרה לדף הבית </NavLink>
                    <br />
                    <br />

                
                </>

            )}
        </div>
    );
}

export default Detailes;
