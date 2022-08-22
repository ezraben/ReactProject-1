import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { useHistory } from "react-router-dom";

const LogOutPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(authActions.logout()); //clear redux
    localStorage.clear(); // clear local storage
    history.push("/");
  }, []);
  return;
};

export default LogOutPage;
