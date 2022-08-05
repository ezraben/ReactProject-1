import { useState } from "react";
import Joi from "joi-browser";
import axios from "axios";

import { toast } from "react-toastify";

import registerSchema from "../../validation/register.validation";

const RegisterComponent = () => {
  const [biz, setIsBiz] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [confirmPassword, SetConfirmPassword] = useState("");

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
    // console.log(ev.target.checked);
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
          toast.success("🦄 User registered successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        })
        .catch((err) => {
          console.log("err from axios", err);
          let errorArr = [err.response.data.errors];
          for (let i = 0; i < errorArr.length; i++) {
            //the toast is working but error in console about promise
            // toast.error(err.response.data.errors[i], {
            //   position: "top-right",
            //   autoClose: 5000,
            //   hideProgressBar: false,
            //   closeOnClick: true,
            //   pauseOnHover: true,
            //   draggable: true,
            //   progress: undefined,
            // });
          }
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
          <h3>password must be at least 8 characters</h3>
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

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
            onChange={handelCheckButton}
            checked={biz}
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegisterComponent;
