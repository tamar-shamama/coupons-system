import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import CouponsModel from "../../../Models/CouponModel";
import { authStore } from "../../../Redux/AuthState";
import companyService from "../../../Service/CompanyService";
import notificationService from "../../../Service/NotificationService";
import appConfig from "../../../Utils/Config";
import useForceLogin from "../../../Utils/useForceLogin";
import "./CouponUpdate.css";

function CouponUpdate(): JSX.Element {

    useForceLogin();

    const {register, handleSubmit, formState, setValue} = useForm<CouponsModel>();
    const navigate = useNavigate();
    const params = useParams();
    const couponId = +params.couponId
    const [fileName, setFileName] = useState<string>("image");
    const uri = appConfig.imagesUrl;
 

    useEffect(()=>{

        companyService.getOneCoupon(couponId).then(coupon=>{
            setValue("id", couponId);
            setValue("title", coupon.title);
            setValue("description", coupon.description);
            setValue("category", coupon.category);
            setValue("amount", coupon.amount);
            setValue("startDate", coupon.startDate);
            setValue("expirationDate", coupon.expirationDate);
            setValue("price", coupon.price);
            setValue("image", coupon.image);
               
        })
        .catch(err=> notificationService.error(err));

    }, []);
 
 

    async function send(coupon: CouponsModel) {

        if (fileName != "image") {
            coupon.image = fileName;
        }
 
        try {
            await companyService.updateCoupon(coupon);
            notificationService.success("פרטי הקופון עודכנו");
            navigate("/couponsList"); 
 
        } catch(err:any) {
            notificationService.error(err);
            if (err.response?.data?.error === "Unauthorized") {
                navigate("/home");
            }
        }
    }



    // upload image to server and set image name in the new coupon
    const changeHandler = () => {

        let xhttp = new XMLHttpRequest();

        xhttp.onload = function() {
            
            if (this.status==200) {
                console.log("file uploaded: " + this.response);
            } else {
                let error = JSON.parse(this.response);
                console.log("error: " + error.message);
            }
        };
        

        xhttp.open("POST", uri + "uploadFile");

        // if (authStore.getState().token) {
        //     xhttp.setRequestHeader("Authorization", "Bearer " + authStore.getState().token );
        // }

        let inputFiles = document.getElementById("file-img") as HTMLInputElement | null;
        let files = inputFiles?.files;
        let file = files[0];
        setFileName(file.name);

        let formData = new FormData();
        formData.append("file", file);
        xhttp.send(formData);
    }





    return (
        <div className="CouponUpdate">

            <h3>עריכת פרטי קופון</h3>

            <form >

            
                <label>מספר זיהוי:</label>
                <input type="number" readOnly {...register("id")} />
                <br />



                <label>שם:</label>
                <input type="text" {...register("title", {
                    required: {value:true, message:"*** חובה לתת שם."},
                    minLength: {value:4, message:"*** שם הקופון חייב להכיל לפחות ארבעה תווים."}
                })} />
                <span className="valid">{formState.errors.title && "   ****"}</span>
                <br />



                <label>תיאור: </label>
                <input type="text" {...register( "description", {
                    required: {value:true, message:"*** חובה לתת תיאור."}
                })} />
                <span className="valid">{formState.errors.description && "   ****"}</span>
                <br />



                <label>קטגוריה: </label>
                <select  {...register("category", {
                     required: {value:true, message:"*** חובה למסור קטגוריה."}
                })}>
                    <option value={""}>=== בחירה ===</option>
                    <option value="VACATION">חופשה</option>
                    <option value="ELECTRONICS">מוצרי חשמל</option>
                    <option value="FOOD">אוכל</option>
                    <option value="RESTAURANT">מסעדות</option>
                </select>
                <br />



                <label>כמות במלאי: </label>
                <input type="number" {...register("amount", {
                    required: {value:true, message:"*** חובה לתת כמות התחלתית במלאי (ניתן להזין 0)."},
                    min: {value:0, message: "*** כמות במלאי לא יכולה להיות שלילית."}
                })} />
                <span className="valid">{formState.errors.amount && "   ****"}</span>
                <br />



                <label>תאריך התחלה: </label>
                <input type="date" {...register("startDate", {
                    required: {value:true, message: "*** חובה להזין תאריך תחילת תוקף"}
                })} />
                <span className="valid">{formState.errors.startDate && "   ****"}</span>
                <br />



                <label>תאריך תפוגה: </label>
                <input type="date" {...register("expirationDate", {
                    required: {value:true, message: "*** חובה להזין תאריך סיום תוקף"},
                })} />
                <span className="valid">{formState.errors.expirationDate && "   ****"}</span>
                <br />



                <label>מחיר: </label>
                <input type="number" {...register("price", {
                    required: {value:true, message: "*** חובה להזין מחיר."},
                    min: {value:0, message: "*** אין להזין מחיר שלילי (ניתן להזין 0)."}
                    
                })} />
                <span className="valid">{formState.errors.price && "   ****"}</span>
                <br />


                <label>תמונה: </label>
                <input type="file" name="file" accept="image/*" id="file-img" onChange={changeHandler}/>
                <br />



                <p>{formState.errors?.title?.message}</p>
                <p>{formState.errors?.description?.message}</p>
                <p>{formState.errors?.category?.message}</p>
                <p>{formState.errors?.amount?.message}</p>
                <p>{formState.errors?.startDate?.message}</p>
                <p>{formState.errors?.expirationDate?.message}</p>
                <p>{formState.errors?.price?.message}</p>

                <button onClick={handleSubmit(send)}>עריכה</button>



            </form>

            <br />
            <br />
            <br />

            <NavLink to={"/couponsList"}>בחזרה לרשימת קופוני החברה </NavLink>
            <span> | </span>
            <NavLink to={"/home"}>בחזרה לדף הבית </NavLink>
			
        </div>
    );
}

export default CouponUpdate;
