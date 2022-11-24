import { createStore } from "redux";
import CompanyModel from "../Models/CompanyModel"

// 1. state
// מאותחל למערך ריק מסוג קומפני מודל
export class CompanyState {
    public companies: CompanyModel[] = [];
}


// 2. action types
// אינם של סוגי הפעולות האפשריות
export enum CompanyActionType {
    FetchCompany,
    AddCompany,
    DeleteCompany,
    UpdateCompany
}


// 3. 
// אינטרפייס שמחזיק סוג פעולה ותשובה
export interface CompanyAction {
    type: CompanyActionType;
    payload: any;         
}



// 4. actions
// מתודה שמקבלת משהו ומחזירה את סוג הפעולה המתאים ואת מה שהיא קיבלה
export function fetchCompanyAction(companies: CompanyModel[]):CompanyAction {
    return {type: CompanyActionType.FetchCompany, payload: companies};
}

export function addCompanyAction (company: CompanyModel): CompanyAction {
    return {type: CompanyActionType.AddCompany, payload: company};
}

export function deleteCompanyAction(id:number): CompanyAction {
    return {type: CompanyActionType.DeleteCompany, payload: id};
}

export function updateCompanyAction(company: CompanyModel): CompanyAction {
    return {type: CompanyActionType.UpdateCompany, payload: company};
}






// 5. reducer
// שמירת תוצאות הפעולה בסטייט - מתודה שמקבלת את הסטייט הנוכחי ואת המתודה לסוג הפעולה והתוצאה
export function CompanyReducer(currentState = new CompanyState(), action: CompanyAction): CompanyState {
    
    const newState = {...currentState};
    
    switch(action.type) {

        // מוסיפים את כל החברות לזיכרון הגלובלי
        case CompanyActionType.FetchCompany:
            newState.companies = action.payload;
        break;

        // מוסיפים את החברה החדשה לזיכרון הגלובלי
        case CompanyActionType.AddCompany:
            newState.companies.push(action.payload);
        break;

        // הסרת החברה מהזיכרון הגלובלי
        case CompanyActionType.DeleteCompany:
            console.log("========= 1");
            const indexToDelete = newState.companies.findIndex(c => c.id === action.payload);
            console.log("========= 2");
            if (indexToDelete >= 0) {
                newState.companies.splice(indexToDelete, 1);
                console.log("========= 3");
            };
            console.log("========= 4");
        break;

        case CompanyActionType.UpdateCompany:
            const indexToUpdate = newState.companies.findIndex(c => c.id === action.payload.id);
            if (indexToUpdate >= 0) newState.companies[indexToUpdate] = action.payload;
        break;

        
    }
    return newState;
}

    // 6. store
    export const companiesStore = createStore(CompanyReducer);