import { Notyf } from "notyf";
import { useNavigate } from "react-router-dom";
import authService from "./AuthService";

class NotificationService {



    private notify = new Notyf({duration:5000, position:{x:"center",y:"top"}});

    
    public success (messages:string): void {
        this.notify.success(messages);
    }
    
    public error (err:any): void {
        this.notify.error(this.extractErrorMessage(err));
    }


    private extractErrorMessage(err:any) {

        if (typeof err === "string") return err;
        
        if (typeof err.response?.data?.message === "string") {

            // if token expired - delete from state
            const msg = err.response.data.message;
            const check = msg.startsWith("you are not authorized. JWT expired at");

            if (check) {
                authService.logout();
                return "פג תוקף ההתחברות לאתר. יש להתחבר כדי להמשיך";
            }

            
         return err.response.data;
        };
            
         
        if (Array.isArray(err.response?.data)) return err.response.data[0];
        
        if (typeof err.message === "string") return err.message;
        
        console.dir(err); // if non of the above worked
        return "an error has aqured, plead check console"
    }
















}










const notificationService = new NotificationService();
export default notificationService;