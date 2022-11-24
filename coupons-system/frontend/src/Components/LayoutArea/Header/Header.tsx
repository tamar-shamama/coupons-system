import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import "./Header.css";

function Header(): JSX.Element {
    return (
        <div className="Header">
			מערכת ניהול קופונים

            <p>
                <AuthMenu/>
            </p>
        </div>
    );
}

export default Header;
