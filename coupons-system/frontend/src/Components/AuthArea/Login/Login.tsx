import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Service/AuthService";
import notificationService from "../../../Service/NotificationService";
import "./Login.css";

function Login(): JSX.Element {

    const {register, handleSubmit} = useForm<CredentialsModel>();
    const navigate = useNavigate();

    async function send(credentials: CredentialsModel) {

        try {
            await authService.login(credentials);
            notificationService.success("ברוכים הבאים");
            navigate("/home");
        } catch (err: any) {
            notificationService.error(err);
        }
    }



    return (
        <div className="Login">

            <form onSubmit={handleSubmit(send)}>
			
                <h3>כניסה למערכת</h3>

                <br />

                <label> סוג משתמש:</label>
                <select  {...register("clientType")}>
                    <option>=== בחירה ===</option>
                    <option value="ADMINISTRATOR">אדמיניסטרטור</option>
                    <option value="COMPANY">חברה</option>
                    <option value="CUSTOMER">לקוח</option>
                </select>
                <br />

                <label> דואר אלקטרוני: </label>
                <input type="text" {...register("email")} />
                <br />

                <label> סיסמה: </label>
                <input type="password" {...register("password")} />
                <br />

                <button>כניסה</button>

            </form>

            <br />


            {process.env.NODE_ENV === "development" &&
                <fieldset>
                    <legend >== הערה למפתחים ==</legend>
                    <p>כניסה כאדמיניסטרטור:</p>
                    <p>מייל: admin@mail</p>
                    <p>סיסמה: 1234</p>
                </fieldset>
            }



        </div>
    );
}

export default Login;
