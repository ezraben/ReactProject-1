import { useState } from "react";
import axios from "axios";
import Joi from "joi-browser";
import { toast } from "react-toastify";

import bizCardSchema from "../../validation/createBizCard.validation";
import editPopUp from "./editPopUp.css";

const EditCardComponent = (props) => {
  //   {
  //   bizName,
  //   bizDescription,
  //   bizAddress,
  //   bizPhone,
  //   bizImage,
  //   onEditDone,
  //   onCancel,
  // }
  const [bizName, setBizName] = useState(props.bizName);
  const [bizDescription, setBizDescription] = useState(props.bizDescription);
  const [bizAddress, setBizAddress] = useState(props.bizAddress);
  const [bizPhone, setBizPhone] = useState(props.bizPhone);
  const [bizImage, setBizImage] = useState(props.bizImage);

  const handelBizName = (ev) => {
    setBizName(ev.target.value);
  };
  const handlebizDescription = (ev) => {
    setBizDescription(ev.target.value);
  };
  const handleBizAddress = (ev) => {
    setBizAddress(ev.target.value);
  };
  const handleBizPhone = (ev) => {
    setBizPhone(ev.target.value);
  };
  const handleBizImage = (ev) => {
    setBizImage(ev.target.value);
  };
  const handelSubmit = (ev) => {
    console.log("kdh");
    ev.preventDefault();
  };
  const handeleConfirmClick = () => {
    const validatedVlue = Joi.validate(
      { bizName, bizDescription, bizAddress, bizPhone, bizImage },
      bizCardSchema,
      {
        abortEarly: false,
      }
    );

    const { error } = validatedVlue;
    console.log(validatedVlue);

    if (error) {
      console.log("error", error);
      let errorArr = [...validatedVlue.error.details];

      for (let i = 0; i < errorArr.length; i++) {
        toast.error(error.details[i].message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
    let dataToSend = {
      bizName,
      bizDescription,
      bizAddress,
      bizPhone,
    };
    if (bizImage) {
      dataToSend.bizImage = bizImage;
    }
    props.onEditDone(props._id, dataToSend);
    //  else {
    //   axios
    //     .put("/cards", {
    //       bizName,
    //       bizDescription,
    //       bizAddress,
    //       bizPhone,
    //     })
    //     .then((data) => {
    //       console.log("data from axios", data);
    //       toast.success("🦄 card created  successfully!");
    //     })
    //     .catch((err) => {
    //       console.log("err from axios", err);
    //     });
    // }
  };
  const handeleCancelClick = () => {
    props.onCancel();
  };
  const handleFormClick = (ev) => {
    ev.stopPropagation();
  };
  return (
    <div className="mainContainer" onClick={handeleCancelClick}>
      <form
        className="editPopUpContainer"
        onSubmit={handelSubmit}
        onClick={handleFormClick}
      >
        <h1>create business card</h1>

        <div className="mb-3">
          <label htmlFor="bizName" className="form-label">
            Business Name
          </label>
          <input
            type="text"
            className="form-control"
            onChange={handelBizName}
            value={bizName}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputbizDescription1" className="form-label">
            Business Description
          </label>
          <input
            type="bizDescription"
            className="form-control"
            id="exampleInputbizDescription1"
            aria-describedby="bizDescriptionHelp"
            onChange={handlebizDescription}
            value={bizDescription}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="Address" className="form-label">
            Business Address
          </label>
          <input
            type="text"
            className="form-control"
            onChange={handleBizAddress}
            value={bizAddress}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputphone1" className="form-label">
            Business Phone
          </label>
          <input
            type="text"
            className="form-control"
            onChange={handleBizPhone}
            value={bizPhone}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputImage" className="form-label">
            Business Image (url)
          </label>
          <input
            type="text"
            className="form-control"
            onChange={handleBizImage}
            value={bizImage}
          />
        </div>

        <div className="d-flex p-2 justify-content-around">
          <button className="btn btn-success" onClick={handeleConfirmClick}>
            confirm
          </button>
          <button className="btn btn-danger" onClick={handeleCancelClick}>
            Cancel edit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCardComponent;
