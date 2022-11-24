import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ClientModel from "../../../Models/ClientModel";
import { authStore } from "../../../Redux/AuthState";
import AdminMenu from "../../AdminArea/AdminMenu/AdminMenu";
import CompanyMenu from "../../CompanyArea/CompanyMenu/CompanyMenu";
import CustomerMenu from "../../CustomerArea/CustomerMenu/CustomerMenu";
import "./Menu.css";

function Menu(): JSX.Element {

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


	function isAdmin(): boolean {
		if (client.type === "ADMINISTRATOR") {
			return true;
		} else {
			console.log(client.type);
			return false;
		}
	}

	function isCompany(): boolean {
		if (client.type === "COMPANY") {
			return true;
		} else {
			return false;
		}
	}

	function isCustomer(): boolean {
		if (client.type === "CUSTOMER") {
			return true;
		} else {
			return false;
		}
	}


	

    return (
        <div className="Menu">

			<NavLink to={"/home"}>דף הבית</NavLink>

			{!client && (
				<>
					<NavLink to={"/login"}>כניסה</NavLink>
                </>
            )}

			<NavLink to={"/about"}>אודות</NavLink>
			<NavLink to={"/contact"}>צור קשר</NavLink>



			{client && isAdmin() &&
				<>
					<NavLink to={"/logout"}>התנתקות</NavLink>
					<AdminMenu/>
				</>
			}

			{client && isCompany() &&
				<>
					<NavLink to={"/logout"}>התנתקות</NavLink>
					<CompanyMenu/>
				</>
			}

			{client && isCustomer() &&
				<>
					<NavLink to={"/logout"}>התנתקות</NavLink>
					<CustomerMenu/>
				</>
			}
		
			
        </div>
    );
}

export default Menu;
