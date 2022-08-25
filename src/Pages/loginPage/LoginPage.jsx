import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Joi from "joi-browser";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

//

import axios from "axios";

import loginSchema from "../../validation/login.validation";
import { authActions } from "../../store/auth";
import auth from "../../store/auth";

const LoginPage = () => {
  const userData = useSelector((state) => state.auth.userData);
  const bizState = useSelector((state) => state.auth.bizState);

  useEffect(() => {
    console.log("bizState.biz", bizState.biz);
    if (bizState.biz === true) {
      history.push("/deshbord");
    }
    if (bizState.biz === false) {
      history.push("/about");
    }
    //
  }, [bizState.biz]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const handelEmail = (ev) => {
    setEmail(ev.target.value);
  };
  const handelPassword = (ev) => {
    setPassword(ev.target.value);
  };

  const handelSubmit = (ev) => {
    ev.preventDefault();
    const validatedVlue = Joi.validate({ email, password }, loginSchema, {
      abortEarly: false,
    });
    const { error } = validatedVlue;
    if (error) {
      console.log("invalidddddddd", { error });

      //invalid email
      //invalid password
    }

    // else {
    if (email && password) {
      axios
        .post("/auth", { email, password })
        .then(({ data }) => {
          // console.log("dataaa", data);
          localStorage.setItem("token", data.token);
          dispatch(authActions.login());
          console.log("token decoded", jwt_decode(data.token));
          dispatch(authActions.upDateUserData(jwt_decode(data.token)));

          // dispatch(authActions.onLoginCheckBiz(jwt_decode(data.token)));
          console.log("bizState", bizState.biz);
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
    }
    // } closing of if out comnted
  };
  return (
    <form onSubmit={handelSubmit}>
      <h1>please login</h1>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          onChange={handelEmail}
          value={email}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          onChange={handelPassword}
          value={password}
        />
      </div>

      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="exampleCheck1"
        />
        <label className="form-check-label" htmlFor="exampleCheck1">
          Check me out
        </label>
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};
export default LoginPage;
////////////////////////////////////////////////////////////////////////

// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import Joi from "joi-browser";
// import jwt_decode from "jwt-decode";
// import { useHistory } from "react-router-dom";
// import { toast } from "react-toastify";
// //

// import axios from "axios";

// import loginSchema from "../../validation/login.validation";
// import { authActions } from "../../store/auth";
// import auth from "../../store/auth";

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const dispatch = useDispatch();
//   const history = useHistory();

//   const handelEmail = (ev) => {
//     setEmail(ev.target.value);
//   };
//   const handelPassword = (ev) => {
//     setPassword(ev.target.value);
//   };

//   const handelSubmit = (ev) => {
//     ev.preventDefault();
//     const validatedVlue = Joi.validate({ email, password }, loginSchema, {
//       abortEarly: false,
//     });
//     const { error } = validatedVlue;
//     if (error) {
//       console.log("invalidddddddd", { error });

//       //invalid email
//       //invalid password
//     }
//     // else {
//     if (email && password) {
//       axios
//         .post("/auth", { email, password })
//         .then(({ data }) => {
//           console.log("data", data);
//           localStorage.setItem("token", data.token);
//           dispatch(authActions.login());
//           console.log("token decoded", jwt_decode(data.token));
//           dispatch(authActions.upDateUserData(jwt_decode(data.token)));
//           history.push("/deshbord");
//         })
//         .catch((err) => {
//           console.log("err from axios", err);
//           toast.error(err.response.data.message, {
//             position: "top-right",
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//           });
//         });
//     }
//     // } closing of if out comnted
//   };
//   return (
//     <form onSubmit={handelSubmit}>
//       <h1>please login</h1>
//       <div className="mb-3">
//         <label htmlFor="exampleInputEmail1" className="form-label">
//           Email address
//         </label>
//         <input
//           type="email"
//           className="form-control"
//           id="exampleInputEmail1"
//           aria-describedby="emailHelp"
//           onChange={handelEmail}
//           value={email}
//         />
//         <div>{email}</div>
//       </div>
//       <div className="mb-3">
//         <label htmlFor="exampleInputPassword1" className="form-label">
//           Password
//         </label>
//         <input
//           type="password"
//           className="form-control"
//           id="exampleInputPassword1"
//           onChange={handelPassword}
//           value={password}
//         />
//       </div>
//       <div>{password}</div>
//       <div className="mb-3 form-check">
//         <input
//           type="checkbox"
//           className="form-check-input"
//           id="exampleCheck1"
//         />
//         <label className="form-check-label" htmlFor="exampleCheck1">
//           Check me out
//         </label>
//       </div>
//       <button className="btn btn-primary">Submit</button>
//     </form>
//   );
// };
// export default LoginPage;
