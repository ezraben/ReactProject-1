import { useState } from "react";
import axios from "axios";
import Joi from "joi-browser";
import { toast } from "react-toastify";

import { useHistory } from "react-router-dom";
import bizCardSchema from "../../validation/createBizCard.validation";
import creatBizCss from "./creatBizCss.css";

const CreateBizCardPage = () => {
  const [bizName, setBizName] = useState("");
  const [bizDescription, setBizDescription] = useState("");
  const [bizAddress, setBizAddress] = useState("");
  const [bizPhone, setBizPhone] = useState("");
  const [bizImage, setBizImage] = useState("");

  const history = useHistory();

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
    ev.preventDefault();
    const validatedVlue = Joi.validate(
      { bizName, bizDescription, bizAddress, bizPhone },
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
    // else {
    let dateToSend = {
      bizName,
      bizDescription,
      bizAddress,
      bizPhone,
    };
    if (bizImage) {
      dateToSend.bizImage = bizImage;
    }
    axios
      .post(
        "/cards",
        dateToSend
        // {
        //   bizName,
        //   bizDescription,
        //   bizAddress,
        //   bizPhone,
        // }
      )
      .then((data) => {
        console.log("data from axios", data);
        toast.success("🦄 card created  successfully!");
        history.push("/deshbord");
      })
      .catch((err) => {
        console.log("err from axios", err);
      });
    // }
  };
  return (
    <form onSubmit={handelSubmit}>
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

      <button className="btn btn-primary submitBtn">Submit</button>
    </form>
  );
};

export default CreateBizCardPage;

//////////////////////////////////////////////////////////////
//from here  before tryong to fix biz img requuierd msg
// import { useState } from "react";
// import axios from "axios";
// import Joi from "joi-browser";
// import { toast } from "react-toastify";

// import { useHistory } from "react-router-dom";
// import bizCardSchema from "../../validation/createBizCard.validation";
// import creatBizCss from "./creatBizCss.css";

// const CreateBizCardPage = () => {
//   const [bizName, setBizName] = useState("");
//   const [bizDescription, setBizDescription] = useState("");
//   const [bizAddress, setBizAddress] = useState("");
//   const [bizPhone, setBizPhone] = useState("");
//   const [bizImage, setBizImage] = useState("");

//   const history = useHistory();

//   const handelBizName = (ev) => {
//     setBizName(ev.target.value);
//   };
//   const handlebizDescription = (ev) => {
//     setBizDescription(ev.target.value);
//   };
//   const handleBizAddress = (ev) => {
//     setBizAddress(ev.target.value);
//   };
//   const handleBizPhone = (ev) => {
//     setBizPhone(ev.target.value);
//   };
//   const handleBizImage = (ev) => {
//     setBizImage(ev.target.value);
//   };

//   const handelSubmit = (ev) => {
//     ev.preventDefault();
//     const validatedVlue = Joi.validate(
//       { bizName, bizDescription, bizAddress, bizPhone, bizImage },
//       bizCardSchema,
//       {
//         abortEarly: false,
//       }
//     );

//     const { error } = validatedVlue;
//     console.log(validatedVlue);

//     if (error) {
//       console.log("error", error);
//       let errorArr = [...validatedVlue.error.details];

//       for (let i = 0; i < errorArr.length; i++) {
//         toast.error(error.details[i].message, {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//         });
//       }
//     }
//     // else {
//     let dateToSend = {
//       bizName,
//       bizDescription,
//       bizAddress,
//       bizPhone,
//     };
//     if (bizImage) {
//       dateToSend.bizImage = bizImage;
//     }
//     axios
//       .post(
//         "/cards",
//         dateToSend
//         // {
//         //   bizName,
//         //   bizDescription,
//         //   bizAddress,
//         //   bizPhone,
//         // }
//       )
//       .then((data) => {
//         console.log("data from axios", data);
//         toast.success("🦄 card created  successfully!");
//         history.push("/deshbord");
//       })
//       .catch((err) => {
//         console.log("err from axios", err);
//       });
//     // }
//   };
//   return (
//     <form onSubmit={handelSubmit}>
//       <h1>create business card</h1>

//       <div className="mb-3">
//         <label htmlFor="bizName" className="form-label">
//           Business Name
//         </label>
//         <input
//           type="text"
//           className="form-control"
//           onChange={handelBizName}
//           value={bizName}
//         />
//       </div>

//       <div className="mb-3">
//         <label htmlFor="exampleInputbizDescription1" className="form-label">
//           Business Description
//         </label>
//         <input
//           type="bizDescription"
//           className="form-control"
//           id="exampleInputbizDescription1"
//           aria-describedby="bizDescriptionHelp"
//           onChange={handlebizDescription}
//           value={bizDescription}
//         />
//       </div>

//       <div className="mb-3">
//         <label htmlFor="Address" className="form-label">
//           Business Address
//         </label>
//         <input
//           type="text"
//           className="form-control"
//           onChange={handleBizAddress}
//           value={bizAddress}
//         />
//       </div>

//       <div className="mb-3">
//         <label htmlFor="exampleInputphone1" className="form-label">
//           Business Phone
//         </label>
//         <input
//           type="text"
//           className="form-control"
//           onChange={handleBizPhone}
//           value={bizPhone}
//         />
//       </div>

//       <div className="mb-3">
//         <label htmlFor="exampleInputImage" className="form-label">
//           Business Image (url)
//         </label>
//         <input
//           type="text"
//           className="form-control"
//           onChange={handleBizImage}
//           value={bizImage}
//         />
//       </div>

//       <button className="btn btn-primary submitBtn">Submit</button>
//     </form>
//   );
// };

// export default CreateBizCardPage;
