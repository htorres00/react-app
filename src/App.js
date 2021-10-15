import "./App.css";
import UserForm from "./components/UserForm";
import axios from "axios";
import Constants from "./Constants";
import { useState, useEffect } from "react";
import Loader from "./components/Loader/Loader";

function App() {
  const [bfusers, setBFUsers] = useState([]);
  const [loader, setLoader] = useState(true);

  var apiLoading = false;
  useEffect(() => {
    if (bfusers.length == 0) {
      console.log("api fetch one time");
      getUserList();
    }
  }, []);

  const getUserList = () => {
    if (apiLoading) {
      return;
    }
    apiLoading = true;
    const url = Constants.API_URL + "?action=get_bf_users";

    const options = {
      method: "GET",
      url,
    };
    axios(options)
      .then((res) => {
        console.log(res.data.user);
        setLoader(false);
        apiLoading = false;
        setBFUsers(res.data.user);
      })
      .catch((error) => {
        setLoader(false);
        console.log("getUserList", error);
      });
  };

  return (
    <div className="App">
      <div className="back"></div>
      {loader ? <Loader /> : <UserForm bfusers={bfusers} />}
    </div>
  );
}

export default App;
