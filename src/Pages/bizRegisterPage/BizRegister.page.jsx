import { useState } from "react";

import RegisterComponent from "../../Components/registerComponent/Register.component";

import bizregisterCss from "./bizregisterCss.css";

const BizRegisterPage = () => {
  const showBizCheckBox = () => {};

  return (
    <div className="topSpaceFromNav">
      <h1>business register page</h1>

      <RegisterComponent showBizCheckBox={showBizCheckBox} />
    </div>
  );
};

export default BizRegisterPage;
