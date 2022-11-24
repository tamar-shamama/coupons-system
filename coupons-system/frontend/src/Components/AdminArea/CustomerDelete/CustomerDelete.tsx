import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import administratorService from "../../../Service/AdministratorService";
import notificationService from "../../../Service/NotificationService";
import useForceLogin from "../../../Utils/useForceLogin";
import "./CustomerDelete.css";

function CustomerDelete(): JSX.Element {

    useForceLogin();

    const params = useParams();
    const customerId = +params.customerId;
    const navigate = useNavigate();


    
    useEffect (() => {



            (async() => {
    
                try {
    
                    const ok = window.confirm("למחוק ❓");
    
                    if (!ok) {
                        navigate("/showCustomer/" + customerId);
                        return;
    
                    } else if (ok) {
                        await administratorService.deleteCustomer(customerId);
                        notificationService.success("לקוח נמחק")
                        navigate("/listCustomers");
                        return;
                    }
    
                    
                } catch (err:any) {

                    notificationService.error(err);
                    if (err.response?.data?.error === "Unauthorized") {
                        navigate("/home");
                    } else {
                        navigate("/listCustomers");
                    }
                }
            })();



    },[]);




    return null;
}

export default CustomerDelete;
