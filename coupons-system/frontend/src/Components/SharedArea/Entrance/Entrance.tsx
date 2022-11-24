import { NavLink } from "react-router-dom";
import "./Entrance.css";

function Entrance(): JSX.Element {
    return (
        <div className="Entrance">

            <p>
                <span> ברוכים הבאים למערכת ניהול קופונים. אנא</span>
                <span> <NavLink to={"/login"}>התחברו</NavLink> </span>
                <span> כדי לבצע פעולות.</span>
            </p>

            <p>
                <span>אם אינכם רשומים עדיין, תוכלו להגיש בקשה להצטרפות כחברה</span>
                <span> <NavLink to={"/register/comp"}>כאן</NavLink></span>
                <span>, או כלקוח </span>
                <span> <NavLink to={"/register/cust"}>כאן</NavLink></span>
                <span>, ונחזור אליכם בהקדם.</span>
            </p>

            <br />
            <br />
            <NavLink id="home" to={"/home"}>לדף הבית</NavLink>
			
        </div>
    );
}

export default Entrance;
