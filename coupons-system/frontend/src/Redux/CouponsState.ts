import { createStore } from "redux";
import CouponsModel from "../Models/CouponModel";

// 1. state
export class CouponState {
    public coupons: CouponsModel[] = [];
}


// 2. action types
export enum CouponActionType {
    FetchCoupon,
    AddCoupon,
    DeleteCoupon,
    UpdateCoupon
}


// 3. action
export interface CouponAction {
    type: CouponActionType;
    payload: any;         
}



// 4. actions

export function fetchCouponAction(coupons: CouponsModel[]):CouponAction {
    return {type: CouponActionType.FetchCoupon, payload: coupons};
}

export function addCouponAction (Coupon: CouponsModel): CouponAction {
    return {type: CouponActionType.AddCoupon, payload: Coupon};
}

export function deleteCouponAction(id:number): CouponAction {
    return {type: CouponActionType.DeleteCoupon, payload: id};
}

export function updateCouponAction(Coupon: CouponsModel): CouponAction {
    return {type: CouponActionType.UpdateCoupon, payload: Coupon};
}






// 5. reducer
export function CouponReducer(currentState = new CouponState(), action: CouponAction): CouponState {
    
    const newState = {...currentState};
    
    switch(action.type) {

        case CouponActionType.FetchCoupon:
            newState.coupons = action.payload;
        break;

        case CouponActionType.AddCoupon:
            newState.coupons.push(action.payload);
        break;

        case CouponActionType.DeleteCoupon:
            const indexToDelete = newState.coupons.findIndex(c => c.id === action.payload);
            if (indexToDelete >= 0) {
                newState.coupons.splice(indexToDelete, 1);
            };
        break;

        case CouponActionType.UpdateCoupon:
            const indexToUpdate = newState.coupons.findIndex(c => c.id === action.payload.id);
            if (indexToUpdate >= 0) newState.coupons[indexToUpdate] = action.payload;
        break;

        
    }
    return newState;
}

    // 6. store
    export const couponsStore = createStore(CouponReducer);