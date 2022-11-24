
// פונקציה לבדיקת הטוקן

import { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { authStore } from "../Redux/AuthState";
import notificationService from "../Service/NotificationService";

function useForceLogin() {

    const navigate = useNavigate();

    useEffect(() => {

        if (!authStore.getState().token) {
            notificationService.error("יש להתחבר לצורך פעולה זו");
            navigate("/login");
        }

    }, []);

}
export default useForceLogin;