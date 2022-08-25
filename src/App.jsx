import { ToastContainer } from "react-toastify";
import { Route, Switch } from "react-router-dom";

import logo from "./logo.svg";
import "./App.css";
import NavBarComponent from "./Components/navBar/NavBar.component";
import LoginPage from "./Pages/loginPage/LoginPage";
import RegisterPage from "./Pages/registerPage/RegisterPage";
import BizRegisterPage from "./Pages/bizRegisterPage/BizRegister.page";
import CreateBizCardPage from "./Pages/createBizCard/CreateBizCard.page";
import DashbordPage from "./Pages/dashbordPage/DashbordPage";
import HomePage from "./Pages/homePage/HomePage";
import PageNotFound from "./Pages/pageNotFound/PageNotFound";
import LogOutPage from "./Pages/logOut/LogOut.page";
import FooterComponent from "./Components/footer/Footer.component";
import AboutUsPage from "./Pages/aboutPage/AboutPage";

function App() {
  return (
    <div className="container">
      <NavBarComponent />
      <ToastContainer />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path={"/bizRegister"}>
          <BizRegisterPage />
        </Route>
        <Route path={"/about"}>
          <AboutUsPage />
        </Route>
        <Route path="/createCard">
          <CreateBizCardPage />
        </Route>
        <Route path="/deshbord">
          <DashbordPage />
        </Route>
        <Route path="/logOut">
          <LogOutPage />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
      <FooterComponent />
    </div>
  );
}

export default App;
