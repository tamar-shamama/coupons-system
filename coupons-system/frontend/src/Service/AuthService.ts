import axios from "axios";
import CredentialsModel from "../Models/CredentialsModel";
import { authStore, loginAction, logoutAction } from "../Redux/AuthState";
import appConfig from "../Utils/Config";

class AuthService {

    public async login (credentials: CredentialsModel): Promise<void> {
        const response = await axios.put<string> (appConfig.loginUrl + credentials.clientType + "/" + credentials.email + "/" + credentials.password);
        const token = response.data;
        authStore.dispatch(loginAction(token));
    }

    public logout(): void {
        authStore.dispatch(logoutAction());
    }

}

const authService = new AuthService();
export default authService;