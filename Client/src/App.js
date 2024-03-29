import { Route, Routes } from "react-router-dom";
import { Home, Login, Details, Public, News, Contact, DetailsProduct, Confirm, ResetPass, Cart } from "./pages/public";
import Path from "./ultils/path";
import { getBanner, getBlog, getCategory, getOneBlog, getProduct } from "./store/action";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { AdminLayout, CreateProduct, DashBoard, ManageOrder, ManageProduct, ManageUser } from "./pages/admin";
import { MemberLayout, Personal, Checkout, Purchase, Account } from "./pages/member";
import { CalendarFull } from "./pages/admin/components";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBanner());
    dispatch(getProduct());
    dispatch(getBlog());
    dispatch(getCategory())
  }, []);
  return (
    <>
      <div className="min-h-screen">
        <Routes>
          {/* user */}
          <Route path={Path.PUBLIC} element={<Public />}>
            <Route path={Path.HOME} element={<Home />} />
            <Route path={Path.TINTUC} element={<News />} />
            <Route path={Path.LIENHE} element={<Contact />} />
            <Route path={Path.PRODUCT} element={<Details />} />
            <Route path={Path.PRODUCT} element={<Details />} />
            <Route path={Path.LOGIN} element={<Login />} />
            <Route path={Path.REGISTER} element={<Login register />} />
            <Route path={Path.FORGOTPASS} element={<Login forgot />} />
            <Route path={Path.PRODUCT} element={<Details />} />
            <Route path={Path.DETAILS} element={<DetailsProduct />} />
            <Route path={Path.RESET_PASS} element={<ResetPass />} />
            <Route path={Path.CART} element={<Cart />} />
          </Route>
          <Route path={Path.CONFIRM} element={<Confirm />} />

          <Route path={Path.CHECKOUT} element={<Checkout />} />

          {/* admin */}
          <Route path={Path.ADMIN} element={<AdminLayout />} >
            <Route path={Path.DEFAULT} element={<DashBoard />} />
            <Route path={Path.DASH_BOARD} element={<DashBoard />} />
            <Route path={Path.MANAGE_USER} element={<ManageUser />} />
            <Route path={Path.MANAGE_PRODUCT} element={<ManageProduct />} />
            <Route path={Path.MANAGE_ORDER} element={<ManageOrder />} />
            <Route path={Path.CREATE_PRODUCT} element={<CreateProduct />} />
            <Route path={Path.CALENDAR} element={<CalendarFull />} />


          </Route>
          {/* member */}
          <Route path={Path.MEMBER} element={<MemberLayout />} >
            <Route path={Path.PERSONAL} element={<Personal />} />
            <Route path={Path.ACCOUNT} element={<Account />} />
            <Route path={Path.PURCHASE} element={<Purchase />} />

          </Route>

        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
