import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ClientModel from "../../../Models/ClientModel";
import { authStore } from "../../../Redux/AuthState";
import Login from "../Login/Login";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {

    const [client, setClient] = useState<ClientModel>();



    useEffect(() => {

        // לקבל פרטי משתמש מהרידוקס בהתחברות
        setClient(authStore.getState().client);
         // כל פעם שיש שינוי בפרטי המשמש ברידוקס, כלומר אם הוא התנתק - ישתנה גם כאן
        const unsubscibe = authStore.subscribe(()=>{
            setClient(authStore.getState().client);
        });

        // הפסקת עדכון פרטי המשתמש כשלא רואים את הקומפוננטה הזו
        return ()=>{
            unsubscibe();
        }
    }, []);



    return (
        <div className="AuthMenu">

            {/* אם לא מחובר */}
            {!client && (
                <>
                    <span>שלום אורח | </span>
                    <NavLink to={"/login"}>התחברות</NavLink>
                </>
            )}


            {/* אם משתמש מחובר */}
            {client && (
                <>
                    <span>שלום </span>
                    <span> {client.email} </span>
                    <span> | </span>
                    <NavLink to={"/logout"}>התנתקות</NavLink>
                </>
            )}
            
			
        </div>
    );
}

export default AuthMenu;
