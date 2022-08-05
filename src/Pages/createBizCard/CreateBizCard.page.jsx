import { useState } from "react";

const CreateBizCardPage = () => {
  const [bizName, setBizName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [Address, setAddress] = useState("");

  const handelBizName = (ev) => {
    setBizName(ev.target.value);
  };
  const handleEmailChange = (ev) => {
    setEmail(ev.target.value);
  };
  const handlePhone = (ev) => {
    setPhone(ev.target.value);
  };
  const handleAddress = (ev) => {
    setAddress(ev.target.value);
  };
  const handelSubmit = (ev) => {
    ev.preventDefault();
  };
  return (
    <form onSubmit={handelSubmit}>
      <h1>creat biz card</h1>

      <div className="mb-3">
        <label htmlFor="bizName" className="form-label">
          biz name
        </label>
        <input
          type="text"
          className="form-control"
          onChange={handelBizName}
          value={bizName}
        />
      </div>
      <div>{bizName}</div>

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
      <div>{email}</div>

      <div className="mb-3">
        <label htmlFor="exampleInputphone1" className="form-label">
          phone
        </label>
        <input
          type="phone"
          className="form-control"
          onChange={handlePhone}
          value={phone}
        />
      </div>
      <div>{phone}</div>

      <div className="mb-3">
        <label htmlFor="Address" className="form-label">
          Address
        </label>
        <input
          type="phone"
          className="form-control"
          onChange={handleAddress}
          value={Address}
        />
      </div>
      <div>{Address}</div>

      <button className="btn btn-primary">Submit</button>
    </form>
  );
};

export default CreateBizCardPage;
