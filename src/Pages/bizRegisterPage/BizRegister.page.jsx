import { useState } from "react";
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
import RegisterComponent from "../../Components/registerComponent/Register.component";

// import { authActions } from "../../store/auth";

const BizRegisterPage = () => {
  const showBizCheckBox = () => {};

  return (
    <div>
      <h1>biz registerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr</h1>

      <RegisterComponent showBizCheckBox={showBizCheckBox} />

      {/* <Link to={"/createCard"} className="btn btn-success">
        Create biz card
      </Link> */}
    </div>
  );
};

export default BizRegisterPage;
