import { NavLink } from "react-router-dom";
import CompanyModel from "../../../Models/CompanyModel";
import "./CompanyCard.css";
import edit from "../../../Assets/Images/edit.png";

interface CompanyCardProps {
    company: CompanyModel;
}

function CompanyCard(props: CompanyCardProps): JSX.Element {


    return (
        <div className="CompanyCard">

            {/* <div id="mispar">{props.company.id}</div>
            <div className="space"></div>
            <div>{props.company.name}</div>
            <div className="space"></div>
            <div>{props.company.email}</div>
            <div className="space"></div>
            <div id="kaftor"> <NavLink to={"/showCompany/" + props.company.id} title="ראה פרטים">🔍</NavLink>
                <div>&nbsp;</div>
                <div>&nbsp;</div>
                <NavLink to={"/deleteCompany/" + props.company.id} title="מחק">➖</NavLink>
                <div>&nbsp;</div>
                <div>&nbsp;</div>
                <NavLink to={"/updateCompany/" + props.company.id} title="שינוי סיסמה">
                <div><img src={edit} alt="" /></div>
                </NavLink>
            </div> */}

            <div>{props.company.id}</div>
            <div className="space"></div>

            <div>{props.company.name}</div>
            <div className="space"></div>

            <div>{props.company.email}</div>
            <div className="space"></div>

            <div className="kaftor">
                <NavLink to={"/showCompany/" + props.company.id} title="ראה פרטים">🔍</NavLink>
                &nbsp;
                &nbsp;
                <NavLink to={"/deleteCompany/" + props.company.id} title="מחק">➖</NavLink>
                &nbsp;
                &nbsp;
                <NavLink to={"/updateCompany/" + props.company.id} title="שינוי סיסמה">
                <span><img src={edit} alt="" /></span>
                </NavLink>
            </div>

           

        </div>
    );
}

export default CompanyCard;
