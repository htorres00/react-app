import { useEffect } from "react";
import logo from "../images/logo.png";
import { BsClockFill } from "react-icons/bs";

const Welcome = (props) => {
  let textInput = null;
  const queryParams = new URLSearchParams(window.location.search);

  useEffect(() => {
    textInput.focus();
  }, []);

  useEffect(() => {
    console.log(props, "default props");
  }, []);
  return (
    <div className="welcome-screen">
      <img src={logo} className="logo" alt="logo" />
      <h1>
        Hello {queryParams.get("first_name")} {queryParams.get("last_name")},
        please respond to few questions to get your service request started:
      </h1>
      <div className="butnWraper">
        <button
          className="start-form"
          onClick={props.nextStep}
          ref={(button) => {
            textInput = button;
          }}
        >
          Start
        </button>
        <span className="press">press Enter ↵</span>
      </div>

      <span className="form-fill-time">
        <BsClockFill></BsClockFill> Takes 1 min
      </span>
    </div>
  );
};

export default Welcome;
