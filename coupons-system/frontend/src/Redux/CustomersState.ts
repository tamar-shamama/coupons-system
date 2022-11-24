import { createStore } from "redux";
import CustomerModel from "../Models/CustomerModel";

// 1. state
export class CustomersState {
    public customers: CustomerModel[] = [];
}


// 2. action types
export enum CustomersActionType {
    FetchCustomers,
    AddCustomers,
    DeleteCustomers,
    UpdateCustomers
}


// 3. action
export interface CustomersAction {
    type: CustomersActionType;
    payload: any;         
}



// 4. actions methods

export function fetchCustomersAction(customers: CustomerModel[]):CustomersAction {
    return {type: CustomersActionType.FetchCustomers, payload: customers};
}

export function addCustomersAction (Customer: CustomerModel): CustomersAction {
    return {type: CustomersActionType.AddCustomers, payload: Customer};
}

export function deleteCustomersAction(id:number): CustomersAction {
    return {type: CustomersActionType.DeleteCustomers, payload: id};
}

export function updateCustomersAction(Customers: CustomerModel): CustomersAction {
    return {type: CustomersActionType.UpdateCustomers, payload: Customers};
}






// 5. reducer
export function CustomersReducer(currentState = new CustomersState(), action: CustomersAction): CustomersState {
    
    const newState = {...currentState};
    
    switch(action.type) {

        case CustomersActionType.FetchCustomers:
            newState.customers = action.payload;
        break;

        case CustomersActionType.AddCustomers:
            newState.customers.push(action.payload);
        break;

        case CustomersActionType.DeleteCustomers:
            const indexToDelete = newState.customers.findIndex(c => c.id === action.payload);
            if (indexToDelete >= 0) {
                newState.customers.splice(indexToDelete, 1);
            };
        break;

        case CustomersActionType.UpdateCustomers:
            const indexToUpdate = newState.customers.findIndex(c => c.id === action.payload.id);
            if (indexToUpdate >= 0) newState.customers[indexToUpdate] = action.payload;
        break;

        
    }
    return newState;
}

    // 6. store
    export const customersStore = createStore(CustomersReducer);