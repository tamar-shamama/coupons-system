 import axios from "axios";
 import { authStore } from "../Redux/AuthState";

 class InterceptorsService {

     public createInterceptors(): void {
         
         axios.interceptors.request.use(request => {

            // אם קיים טוקן בסטייט הגלובלי
             if (authStore.getState().token) {
                 // הוספת הטוקן להדר של הבקשה
                 request.headers = {authorization: "Bearer " + authStore.getState().token}
             }
             // שליחת הבקשה בכל מקרה
             return request;
         });
     }
 }

 const interceptorsService = new InterceptorsService();
 export default interceptorsService;