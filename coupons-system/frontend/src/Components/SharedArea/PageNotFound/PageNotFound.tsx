import "./PageNotFound.css";
import pageNotFound from "../../../Assets/Images/pageNotFound.png";

function PageNotFound(): JSX.Element {
    return (
        <div className="PageNotFound">
            <img src={pageNotFound} alt="404" />
            <br />
            <br />
            <p>	מצטערים, לא הצלחנו למצוא את הדף הזה :( </p>
        </div>
    );
}

export default PageNotFound;
