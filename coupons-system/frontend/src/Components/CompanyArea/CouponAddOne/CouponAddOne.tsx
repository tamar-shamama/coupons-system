import {useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CouponsModel from "../../../Models/CouponModel";
import companyService from "../../../Service/CompanyService";
import notificationService from "../../../Service/NotificationService";
import appConfig from "../../../Utils/Config";
import useForceLogin from "../../../Utils/useForceLogin";
import "./CouponAddOne.css";

function CouponAddOne(): JSX.Element {

    useForceLogin();

    const navigate = useNavigate();
    const {register, handleSubmit, formState} = useForm<CouponsModel>();
    const [a, setA] = useState<boolean>(false);
    const [fileName, setFileName] = useState<string>("image");
    const uri = appConfig.imagesUrl;

    console.log(a);


    // create a new coupon in db
    async function send(coupon: CouponsModel) {

        coupon.image = fileName;

        try {
            await companyService.addCoupon(coupon);
            notificationService.success("הקופון נוסף");
            navigate("/couponsList");
        
        } catch (error:any) {
            notificationService.error(error);
            if (error.response?.data?.error === "Unauthorized") {
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
        
        
        xhttp.open("POST", uri + "/uploadFile");

        let inputFiles = document.getElementById("file-img") as HTMLInputElement | null;
        let files = inputFiles?.files;
        let file = files[0];
        setFileName(file.name);

        let formData = new FormData();
        formData.append("file", file);
        xhttp.send(formData);
    }


    


    return (
        <div className="CouponAddOne">

            <h3>הוספת קופון לחברה</h3>

            <form>

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
                <select id="cat"  {...register("category", {
                    required: {value:true, message:"*** חובה למסור קטגוריה."}
                })}>
                    <option value={""}>=== בחירה ===</option>
                    <option value="VACATION">חופשה</option>
                    <option value="ELECTRONICS">מוצרי חשמל</option>
                    <option value="FOOD">אוכל</option>
                    <option value="RESTAURANT">מסעדות</option>
                </select>

                <span className="valid">{formState.errors.category && "   ****"}</span>
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
               

                <br />


                <p>{formState.errors?.title?.message}</p>
                <p>{formState.errors?.description?.message}</p>
                <p>{formState.errors?.category?.message}</p>
                <p>{formState.errors?.amount?.message}</p>
                <p>{formState.errors?.startDate?.message}</p>
                <p>{formState.errors?.expirationDate?.message}</p>
                <p>{formState.errors?.price?.message}</p>

                
                <button onClick={handleSubmit(send)}>הוספה</button>

            </form>






            <br />

            <NavLink to={"/couponsList"}>בחזרה לרשימת קופוני החברה </NavLink>
            <span> | </span>
            <NavLink to={"/home"}>בחזרה לדף הבית </NavLink>



			
        </div>
    );

}

export default CouponAddOne;


