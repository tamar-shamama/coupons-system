import { NavLink } from "react-router-dom";
import "./Toda.css";

function Toda(): JSX.Element {
    return (
        <div className="Toda">

            <p>תודה על שנרשמתם למערכת ניהול קופונים!</p>
            <p>בקשתכם נתקבלה בהצלחה, נחזור אליכם בהקדם!</p>
 
            <br />
            <br />
            <br />

            <NavLink to={"/home"}>בחזרה לדף הבית </NavLink>

            <br />
            <br />


            {process.env.NODE_ENV === "development" &&
                <fieldset>
                    <legend >== הערה למפתחים ==</legend>
                        באתר האמיתי, מנהלי האתר יקבלו את
                        הבקשה ויוכלו להחליט אם לאשר אותה
                        ולרשום את המשתמש החדש. כרגע לא
                        נשלח דבר בהגשת בקשה הזו.
                    
                </fieldset>
            }

			
        </div>
    );
}

export default Toda;
