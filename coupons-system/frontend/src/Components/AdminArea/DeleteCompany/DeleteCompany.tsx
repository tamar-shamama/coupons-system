import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import administratorService from "../../../Service/AdministratorService";
import notificationService from "../../../Service/NotificationService";
import useForceLogin from "../../../Utils/useForceLogin";
import "./DeleteCompany.css";

function DeleteCompany(): JSX.Element {

    useForceLogin();

    const params = useParams();
    const companyId = +params.companyId;
    const navigate = useNavigate();


    
    useEffect (() => {

            
                    (async() => {
            
                        try {
            
                            const ok = window.confirm("למחוק ❓");
            
                            if (!ok) {
                                navigate("/showCompany/" + companyId);
                                return;
                            
                            } else if (ok) {
                                await administratorService.deleteCompany(companyId);
                                notificationService.success("החברה נמחקה");
                                navigate("/companiesList");
                                return;
                            }
            
            
                        } catch (err:any) {
                            notificationService.error(err);
                            if (err.response?.data?.error === "Unauthorized") {
                                navigate("/home");
                            }
                        }
                    })();


    },[]);




    return null;
}

export default DeleteCompany;
