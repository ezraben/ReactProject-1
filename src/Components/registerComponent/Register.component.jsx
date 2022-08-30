import { useState } from "react";
import { useEffect } from "react";

import { useSelector } from "react-redux";
import Joi from "joi-browser";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import BizRegisterPage from "../../Pages/bizRegisterPage/BizRegister.page";

import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";

import registerSchema from "../../validation/register.validation";
import registerComponentCss from "./registerComponentCss.css";
import NavBarComponent from "../navBar/NavBar.component";

import { authActions } from "../../store/auth";

const RegisterComponent = (props) => {
  const [biz, setIsBiz] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [confirmPassword, SetConfirmPassword] = useState("");
  const [showBizCheckBox, setShowBizCheckBox] = useState(false);

  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const userData = useSelector((state) => state.auth.userData);

  const history = useHistory();
  const dispatch = useDispatch();

  const handleNameChange = (ev) => {
    setName(ev.target.value);
  };
  const handleEmailChange = (ev) => {
    setEmail(ev.target.value);
  };

  const handlePasswordChange = (ev) => {
    SetPassword(ev.target.value);
  };
  const handleConfirmPassword = (ev) => {
    SetConfirmPassword(ev.target.value);
  };

  const handelCheckButton = (ev) => {
    setIsBiz(ev.target.checked);
    console.log(ev.target.checked);

    // console.log(dispatch(isBizActions));

    // useEffect(() => {
    //   dispatch(isBizActions.register());
    // }, []);
  };

  const handelSubmit = (ev) => {
    ev.preventDefault();
    const validatedVlue = Joi.validate(
      { name, email, password, confirmPassword, biz },
      registerSchema,
      {
        abortEarly: false,
      }
    );

    const { error } = validatedVlue;

    if (error) {
      // console.log("joi error", error.details);
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
    } else {
      axios
        .post("/users", {
          email,
          name,
          password,
          biz,
        })
        .then((data) => {
          console.log("data from axios", data);
          //
          axios
            .post("/auth", { email, password })
            .then(({ data }) => {
              // console.log("dataaa", data);
              localStorage.setItem("token", data.token);
              dispatch(authActions.login());
              console.log("token decoded", jwt_decode(data.token));
              dispatch(authActions.upDateUserData(jwt_decode(data.token)));

              // dispatch(authActions.onLoginCheckBiz(jwt_decode(data.token)));
              // console.log("bizState", bizState.biz);
            })
            .catch((err) => {
              console.log("err from axios", err);
              toast.error(err.response.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            });

          //

          toast.success("🦄 User registered successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          // if (userData.biz === false) {
          //   console.log("userData.biz === false", userData.biz);
          // }
          // if (userData.biz === true) {
          //   console.log("userData.biz === true", userData.biz);
          // }

          if (biz === true) {
            history.push("/createCard");
          }
        })
        .catch((err) => {
          console.log("err from axios", err);
          if (err.message) {
            console.log(err.message);

            toast.error(
              err.message,

              {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }
            );
          }
          if (err.response.data.message) {
            // setEmailErrMsg(err.response.data.message);

            toast.error(
              err.response.data.message,

              {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }
            );
          }

          console.log(err.response.data.message);
        });
    }
  };

  return (
    <div>
      <form onSubmit={handelSubmit}>
        <div className="mb-3">
          <label htmlFor="Name" className="form-label">
            Please enter your Name
          </label>
          <input
            type="text"
            className="form-control"
            onChange={handleNameChange}
            value={name}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={handleEmailChange}
            value={email}
          />
        </div>
        {
          // <div
          //   className="alert alert-warning"
          //   // onChange={handelEmailErrMsg}
          //   // value={emailErrMsg}
          // ></div>
        }
        {/* for email elready exists msg
         {email === emailMasgError && (
          <div className="alert alert-warning">already exsist</div>
        )} */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="Password"
            className="form-control"
            onChange={handlePasswordChange}
            value={password}
          />
        </div>
        {password.length > 0 && password.length < 8 && (
          <div className="alert alert-warning">
            password must be at least 8 characters
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="ConfirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            onChange={handleConfirmPassword}
            value={confirmPassword}
          />
        </div>
        {confirmPassword.length > 3 && confirmPassword !== password && (
          <div className="alert alert-warning">
            password and confirm password must match
          </div>
        )}
        <div
          className={`mb-3 form-check ${
            props.showBizCheckBox ? "" : "d-none"
          } `}
        >
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
            onChange={handelCheckButton}
            checked={biz}
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check this box if you want to create a business account
          </label>
        </div>

        <button
          type="submit"
          className={`btn btn-primary ${
            props.showBizCheckBox ? "d-none" : ""
          }  `}
        >
          Submit
        </button>

        {props.showBizCheckBox && biz === true && (
          <button className="btn btn-primary"> submittt</button>
        )}
      </form>
    </div>
  );
};

export default RegisterComponent;

///////////////////////////////////////////////////////////
//from here with green nave at register no token
// import { useState } from "react";
// import { useEffect } from "react";

// import { useSelector } from "react-redux";
// import Joi from "joi-browser";
// import { useHistory } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";
// import BizRegisterPage from "../../Pages/bizRegisterPage/BizRegister.page";

// import { useDispatch } from "react-redux";
// import jwt_decode from "jwt-decode";

// import registerSchema from "../../validation/register.validation";
// import registerComponentCss from "./registerComponentCss.css";
// import { authActions } from "../../store/auth";

// const RegisterComponent = (props) => {
//   const [biz, setIsBiz] = useState(false);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, SetPassword] = useState("");
//   const [confirmPassword, SetConfirmPassword] = useState("");
//   const [showBizCheckBox, setShowBizCheckBox] = useState(false);

//   const loggedIn = useSelector((state) => state.auth.loggedIn);
//   const userData = useSelector((state) => state.auth.userData);

//   const history = useHistory();
//   const dispatch = useDispatch();

//   const handleNameChange = (ev) => {
//     setName(ev.target.value);
//   };
//   const handleEmailChange = (ev) => {
//     setEmail(ev.target.value);
//   };

//   const handlePasswordChange = (ev) => {
//     SetPassword(ev.target.value);
//   };
//   const handleConfirmPassword = (ev) => {
//     SetConfirmPassword(ev.target.value);
//   };

//   const handelCheckButton = (ev) => {
//     setIsBiz(ev.target.checked);
//     console.log(ev.target.checked);

//     // console.log(dispatch(isBizActions));

//     // useEffect(() => {
//     //   dispatch(isBizActions.register());
//     // }, []);
//   };

//   const handelSubmit = (ev) => {
//     ev.preventDefault();
//     const validatedVlue = Joi.validate(
//       { name, email, password, confirmPassword, biz },
//       registerSchema,
//       {
//         abortEarly: false,
//       }
//     );

//     const { error } = validatedVlue;

//     if (error) {
//       // console.log("joi error", error.details);
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
//     } else {
//       axios
//         .post("/users", {
//           email,
//           name,
//           password,
//           biz,
//         })
//         .then((data) => {
//           console.log("data from axios", data);

//           // if (userData.biz === false) {
//           //   console.log("userData.biz === false", userData.biz);
//           // }
//           // if (userData.biz === true) {
//           //   console.log("userData.biz === true", userData.biz);
//           // }
//           toast.success("🦄 User registered successfully!", {
//             position: "top-right",
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//           });
//           if (userData.biz === false) {
//             console.log("userData.biz === false", userData.biz);
//           }
//           if (userData.biz === true) {
//             console.log("userData.biz === true", userData.biz);
//           }
//           localStorage.setItem("token", data.token);
//           dispatch(authActions.login());
//           console.log("token decoded", jwt_decode(data.token));
//           dispatch(authActions.upDateUserData(jwt_decode(data.token)));

//           if (biz === true) {
//             history.push("/createCard");
//           }
//         })
//         .catch((err) => {
//           console.log("err from axios", err);
//           if (err.message) {
//             console.log(err.message);

//             toast.error(
//               err.message,

//               {
//                 position: "top-right",
//                 autoClose: 5000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//               }
//             );
//           }
//           if (err.response.data.message) {
//             // setEmailErrMsg(err.response.data.message);

//             toast.error(
//               err.response.data.message,

//               {
//                 position: "top-right",
//                 autoClose: 5000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//               }
//             );
//           }

//           console.log(err.response.data.message);
//         });
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handelSubmit}>
//         <div className="mb-3">
//           <label htmlFor="Name" className="form-label">
//             Please enter your Name
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             onChange={handleNameChange}
//             value={name}
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="exampleInputEmail1" className="form-label">
//             Email address
//           </label>
//           <input
//             type="email"
//             className="form-control"
//             id="exampleInputEmail1"
//             aria-describedby="emailHelp"
//             onChange={handleEmailChange}
//             value={email}
//           />
//         </div>
//         {
//           // <div
//           //   className="alert alert-warning"
//           //   // onChange={handelEmailErrMsg}
//           //   // value={emailErrMsg}
//           // ></div>
//         }
//         {/* for email elready exists msg
//          {email === emailMasgError && (
//           <div className="alert alert-warning">already exsist</div>
//         )} */}
//         <div className="mb-3">
//           <label htmlFor="password" className="form-label">
//             Password
//           </label>
//           <input
//             type="Password"
//             className="form-control"
//             onChange={handlePasswordChange}
//             value={password}
//           />
//         </div>
//         {password.length > 0 && password.length < 8 && (
//           <div className="alert alert-warning">
//             password must be at least 8 characters
//           </div>
//         )}
//         <div className="mb-3">
//           <label htmlFor="ConfirmPassword" className="form-label">
//             Confirm Password
//           </label>
//           <input
//             type="password"
//             className="form-control"
//             onChange={handleConfirmPassword}
//             value={confirmPassword}
//           />
//         </div>
//         {confirmPassword.length > 3 && confirmPassword !== password && (
//           <div className="alert alert-warning">
//             password and confirm password must match
//           </div>
//         )}
//         <div
//           className={`mb-3 form-check ${
//             props.showBizCheckBox ? "" : "d-none"
//           } `}
//         >
//           <input
//             type="checkbox"
//             className="form-check-input"
//             id="exampleCheck1"
//             onChange={handelCheckButton}
//             checked={biz}
//           />
//           <label className="form-check-label" htmlFor="exampleCheck1">
//             Check this box if you want to create a business account
//           </label>
//         </div>

//         <button
//           type="submit"
//           className={`btn btn-primary ${
//             props.showBizCheckBox ? "d-none" : ""
//           }  `}
//         >
//           Submit
//         </button>

//         {props.showBizCheckBox && biz === true && (
//           <button className="btn btn-primary"> submittt</button>
//         )}
//       </form>
//     </div>
//   );
// };

// export default RegisterComponent;
