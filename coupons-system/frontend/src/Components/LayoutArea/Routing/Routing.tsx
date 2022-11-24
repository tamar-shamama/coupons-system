import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../../AuthArea/Login/Login";
import Entrance from "../../SharedArea/Entrance/Entrance";
import PageNotFound from "../../SharedArea/PageNotFound/PageNotFound";
import "./Routing.css";
import CompaniesList from "../../AdminArea/CompaniesList/CompaniesList";
import AddCompany from "../../AdminArea/AddCompany/AddCompany";
import Logout from "../../AuthArea/Logout/Logout";
import Home from "../../SharedArea/Home/Home";
import ShowOneCompany from "../../AdminArea/ShowOneCompany/ShowOneCompany";
import DeleteCompany from "../../AdminArea/DeleteCompany/DeleteCompany";
import UpdateCompany from "../../AdminArea/UpdateCompany/UpdateCompany";
import About from "../../SharedArea/About/About";
import ContactUs from "../../SharedArea/ContactUs/ContactUs";
import CustomerAdd from "../../AdminArea/CustomerAdd/CustomerAdd";
import CustomerDelete from "../../AdminArea/CustomerDelete/CustomerDelete";
import CustomerShow from "../../AdminArea/CustomerShow/CustomerShow";
import CustomerUpdate from "../../AdminArea/CustomerUpdate/CustomerUpdate";
import CustomerList from "../../AdminArea/CustomerList/CustomerList";
import CouponList from "../../CompanyArea/CouponList/CouponList";
import CouponShowOne from "../../CompanyArea/CouponShowOne/CouponShowOne";
import CouponDelete from "../../CompanyArea/CouponDelete/CouponDelete";
import Detailes from "../../CompanyArea/Detailes/Detailes";
import CouponAddOne from "../../CompanyArea/CouponAddOne/CouponAddOne";
import CouponUpdate from "../../CompanyArea/CouponUpdate/CouponUpdate";
import GetAllCoupons from "../../CustomerArea/MyCoupons/GetAllCoupons/GetAllCoupons";
import CustomerDetales from "../../CustomerArea/CustomerDetales/CustomerDetales";
import ShowOneCoupon from "../../CustomerArea/ShowOneCoupon/ShowOneCoupon";
import ListForByCoupon from "../../CustomerArea/BuyCoupon/ListForByCoupon/ListForByCoupon";
import DoBuyCoupon from "../../CustomerArea/BuyCoupon/DoBuyCoupon/DoBuyCoupon";
import ListForBuyCouponByCat from "../../CustomerArea/BuyCoupon/ListForBuyCouponByCat/ListForBuyCouponByCat";
import ListForBuyCouponUpToPrice from "../../CustomerArea/BuyCoupon/ListForBuyCouponUpToPrice/ListForBuyCouponUpToPrice";
import CompanyRegister from "../../SharedArea/CompanyRegister/CompanyRegister";
import Toda from "../../SharedArea/Toda/Toda";
import CustomerRegister from "../../SharedArea/CustomerRegister/CustomerRegister";
import ListForSortByCat from "../../CompanyArea/Sort/ListForSortByCat/ListForSortByCat";
import ListForSortUpToPrice from "../../CompanyArea/Sort/ListForSortUpToPrice/ListForSortUpToPrice";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>

                {/* כללי */}
                <Route path="/" element={<Navigate to="/entrance" />}/>
                <Route path="/entrance" element={<Entrance/>}></Route>
                <Route path="/home" element={<Home/>}></Route>
                <Route path="/about" element={<About/>}></Route>
                <Route path="/contact" element={<ContactUs/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/logout" element={<Logout/>}></Route>
                <Route path="/register/comp" element={<CompanyRegister/>}></Route>
                <Route path="/register/cust" element={<CustomerRegister/>}></Route>
                <Route path="/toda" element={<Toda/>}></Route>


                {/* אדמיניסטרטור */}

                <Route path="/companiesList" element={<CompaniesList/>}></Route>
                <Route path="/addCompany" element={<AddCompany/>}></Route>
                <Route path="/showCompany/:companyId" element={<ShowOneCompany/>}></Route>
                <Route path="/deleteCompany/:companyId" element={<DeleteCompany/>}></Route>
                <Route path="/updateCompany/:companyId" element={<UpdateCompany/>}></Route>

                <Route path="/listCustomers" element={<CustomerList/>}></Route>
                <Route path="/showCustomer/:customerId" element={<CustomerShow/>}></Route>
                <Route path="/addCustomer" element={<CustomerAdd/>}></Route>
                <Route path="/deleteCustomer/:customerId" element={<CustomerDelete/>}></Route>
                <Route path="/updateCustomer/:customerId" element={<CustomerUpdate/>}></Route>

                {/* חברה */}
                <Route path="/couponsList" element={<CouponList/>}></Route>
                <Route path="/showCoupon/:couponId" element={<CouponShowOne/>}></Route>
                <Route path="/deleteCoupon/:couponId" element={<CouponDelete/>}></Route>
                <Route path="/updateCoupon/:couponId" element={<CouponUpdate/>}></Route>
                <Route path="/detailes" element={<Detailes/>}></Route>
                <Route path="/addCoupon" element={<CouponAddOne/>}></Route>
                <Route path="/sort/cat/:category" element={<ListForSortByCat/>}></Route>
                <Route path="/sort/price/:price" element={<ListForSortUpToPrice/>}></Route>

                {/* לקוח */}
                <Route path="/buy" element={<ListForByCoupon/>}></Route>
                <Route path="/cat/:category" element={<ListForBuyCouponByCat/>}></Route>
                <Route path="/price/:price" element={<ListForBuyCouponUpToPrice/>}></Route>
                <Route path="/customerCoupons" element={<GetAllCoupons/>}></Route>
                <Route path="/customerDetailes" element={<CustomerDetales/>}></Route>
                <Route path="/customerShowOne/:couponId" element={<ShowOneCoupon/>}></Route>
                <Route path="/customerBuyCoupon/:couponId" element={<DoBuyCoupon/>}></Route>
                
                <Route path="*" element={<PageNotFound/>}></Route>
            </Routes>
			
        </div>
    );
}

export default Routing;
