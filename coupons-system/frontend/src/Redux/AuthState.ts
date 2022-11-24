import jwtDecode from "jwt-decode";
import { createStore } from "redux";
import ClientModel from "../Models/ClientModel";
import { companiesStore, deleteCompanyAction } from "./CompaniesState";
import { couponsStore } from "./CouponsState";
import { customersStore } from "./CustomersState";

// 1.  state
export class AuthState {

    public token: string = null;
    public client: ClientModel = null;


    public constructor() {

        this.token = localStorage.getItem("token");

        if (this.token) {
            const decodedToken: ClientModel = jwtDecode(this.token);
            this.client = decodedToken;
        }
    }


    // public constructor() {

    //     this.token = localStorage.getItem("token");

    //     if (this.token) {
    //         const decodedToken: {client:ClientModel} = jwtDecode(this.token);
    //         this.client = decodedToken.client;
    //     }
    // }
}


// 2. action types
export enum AuthActionType {
    Login, Logout
}


// 3. action
export interface AuthAction {
    type: AuthActionType;
    payload?: any;         
}



// 4. action creators

export function loginAction(token: string):AuthAction {
    return {type: AuthActionType.Login, payload: token};
}

export function logoutAction():AuthAction {
    return {type: AuthActionType.Logout};
}




// 5. reducer
export function AuthReducer(currentState = new AuthState(), action: AuthAction): AuthState {
    
    const newState = {...currentState};
    
    switch(action.type) {

        case AuthActionType.Login:

            // save the token in the state
            newState.token = action.payload;

             // decode the token
            const decodedToken: ClientModel = jwtDecode(newState.token);
             // save the user details
             newState.client = decodedToken;

            // save the token in the browser local storage
            localStorage.setItem("token", newState.token);

        break;
        

        case AuthActionType.Logout:
            newState.token = null;
            newState.client = null;
            localStorage.removeItem("token");
            couponsStore.getState().coupons = null;
            customersStore.getState().customers = null;
            companiesStore.getState().companies = null;
        break;

        
    }
    return newState;
}

    // 6. store - the main object handling the state
    export const authStore = createStore(AuthReducer);
