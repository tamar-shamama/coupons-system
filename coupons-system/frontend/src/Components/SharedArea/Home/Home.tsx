import "./Home.css";
import vocation from "../../../Assets/Images/vocation.jpg";
import { NavLink } from "react-router-dom";

function Home(): JSX.Element {
    return (
        <div className="Home">

          <br />
          <p>ברוכים הבאים למערכת ניהול קופונים!</p>
          <p>המערכת שלנו מאפשרת לחברות רבות ומגוונות ליצור קופוני הנחה שונים עבור הלקוחות שלהן, ולמכור אותם כאן.</p>
          <br />
          
          <div id="nof">
            <img src={vocation} alt="חופשה פסטורלית" title="חופשה נהדרת שתוכלו לקבל בזול אצלנו באתר!" />
          </div>
          <br />

          <p id="sheela">עוד לא נרשמתם?!</p>
          <p>חברה המעוניינת להירשם למערכת שלנו תוכל להגיש בקשה <NavLink to={"/register/comp"}>כאן</NavLink>, ונחזור אליה בהקדם.</p>
          <p>אנשים פרטיים המעוניינים להירשם על מנת לקנות קופונים מהחברות השונות הפועלות אצלנו, יכולים להגיש בקשה להצטרפות <NavLink to={"/register/cust"}>כאן</NavLink>. נחזור אליכם עם פרטי ההתחברות מיד עם תום הבירורים!</p>
        
        </div>
    );
}

export default Home;
