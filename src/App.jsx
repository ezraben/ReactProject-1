import { ToastContainer } from "react-toastify";

// import { Route, Switch } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import NavBarComponent from "./Components/navBar/NavBar.component";
import LoginPage from "./Pages/loginPage/LoginPage";
import RegisterPage from "./Pages/registerPage/RegisterPage";
import BizRegisterPage from "./Pages/bizRegisterPage/BizRegister.page";
import CreateBizCardPage from "./Pages/createBizCard/CreateBizCard.page";

function App() {
  return (
    <div className="container">
      <NavBarComponent />
      <ToastContainer />
      {/* <LoginPage /> */}
      <RegisterPage />
      {/* <BizRegisterPage /> */}
      {/* <CreateBizCardPage /> */}
    </div>
  );
}

export default App;
