import { Notyf } from "notyf";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../../Service/AuthService";
import notificationService from "../../../Service/NotificationService";
import "./Logout.css";

function Logout(): JSX.Element {

    const navigate = useNavigate();

    useEffect(() => {
        authService.logout();
        notificationService.success("התנתקות");
        navigate("/login");
    }, []);

    return null;
}

export default Logout;
