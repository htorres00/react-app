import { useEffect, useState } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { HiOutlineCheck } from "react-icons/hi";
import { fadeInUp } from "react-animations";
import Radium, { StyleRoot } from "radium";

const styles = {
  fadeInUp: {
    animation: "x 1s",
    animationName: Radium.keyframes(fadeInUp, "fadeInUp"),
  },
};

const StepThreeD = (props) => {
  const [startDateOne, setStartDateOne] = useState(null);
  const [startTimeOne, setStartTimeOne] = useState(null);

  const [startDateTwo, setStartDateTwo] = useState(null);
  const [startTimeTwo, setStartTimeTwo] = useState(null);

  const [startDateThree, setStartDateThree] = useState(null);
  const [startTimeThree, setStartTimeThree] = useState(null);

  const [mindate, setMinDate] = useState(null);

  const [messageone, setMessageOne] = useState("");
  const [messagetwo, setMessageTwo] = useState("");
  const [messagethree, setMessageThree] = useState("");
  const [messagefour, setMessageFour] = useState("");

  const [optdateonemsg, setOptDateOneMsg] = useState("");
  const [optdatetwomsg, setOptDateTwoMsg] = useState("");
  const [optdatethreemsg, setOptDateThreeMsg] = useState("");
  // let emailInput = null;
  let okButn = null;
  // const [emailValue, setEmailValue] = useState("");
  var value;

  useEffect(() => {
    console.log("props three D", props);
    props.setValues.setCompletedProgress(85);

    let date = new Date(new Date().toISOString().slice(0, 10));
    date.setDate(date.getDate() + parseInt(5));
    setMinDate(date.toLocaleDateString("fr-CA"));
  }, []);

  const handleStartDateOne = (startdateone) => {
    setStartDateOne(startdateone);
  };

  const handleStartDateTwo = (startdatetwo) => {
    setStartDateTwo(startdatetwo);
  };

  const handleStartDateThree = (startdatethree) => {
    setStartDateThree(startdatethree);
  };

  const handleStartTimeOne = (timeone) => {
    if (timeone > "07:00" && timeone < "17:00") {
      setStartTimeOne(timeone);
      setMessageOne("");
    } else {
      setMessageOne("Please enter the time between 7am to 4pm Only.");
    }
  };

  const handleStartTimeTwo = (timetwo) => {
    if (timetwo > "07:00" && timetwo < "17:00") {
      setStartTimeTwo(timetwo);
      setMessageTwo("");
    } else {
      setMessageTwo("Please enter the time between 7am to 4pm Only.");
    }
  };

  const handleStartTimeThree = (timethree) => {
    if (timethree > "07:00" && timethree < "17:00") {
      setStartTimeThree(timethree);
      setMessageThree("");
    } else {
      setMessageThree("Please enter the time between 7am to 4pm Only.");
    }
  };

  const handleOnButnClick = () => {
    if (startDateOne >= mindate) {
      setOptDateOneMsg("");
    } else {
      setOptDateOneMsg("Date should be greater than Today + 4 days");
      return;
    }

    if (startDateTwo >= mindate) {
      setOptDateTwoMsg("");
    } else {
      setOptDateTwoMsg("Date should be greater than Today + 4 days");
      return;
    }

    if (startDateThree >= mindate) {
      setOptDateThreeMsg("");
    } else {
      setOptDateThreeMsg("Date should be greater than Today + 4 days");
      return;
    }

    let opt1 = startDateOne + " " + startTimeOne;
    let opt2 = startDateTwo + " " + startTimeTwo;
    let opt3 = startDateThree + " " + startTimeThree;

    console.log(opt1, opt2, opt3, "My options");

    if (
      opt1 != null &&
      opt2 != null &&
      opt3 != null &&
      (opt1 === opt2 || opt1 === opt3 || opt2 === opt3)
    ) {
      setMessageFour(
        "The appointment options should be unique or should not be empty Please review your options."
      );
    } else {
      console.log("Good to go");
      setMessageFour("");
      props.setValues.setOptionOne(opt1);
      props.setValues.setOptionTwo(opt2);
      props.setValues.setOptionThree(opt3);
      props.nextStep(9);
    }
  };

  return (
    <StyleRoot>
      {/* <div> <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /></div> */}
      <div className="step-three" style={styles.fadeInUp}>
        <div className="question">
          <span className="step-no">
            {props.indicator === true ? (
              <span>3</span>
            ) : (
              <>
                {" "}
                <span>5</span>
              </>
            )}

            <BsArrowRightShort></BsArrowRightShort>
          </span>
          <p>
            <span className="level-one">
              Now, let's see what time and date works for you.
            </span>
          </p>
        </div>
        <div style={{ justifyContent: "space-around" }}>
          <div style={{ marginBottom: "8px", fontWeight: "bold" }}>
            <span> Option 1</span>
          </div>

          <div>
            <span>
              <input
                //onKeyDown={(e) => e.preventDefault()}
                //className="datetime"
                min={mindate}
                max="9999-12-31"
                style={{ fontSize: "20px", color: "darkslategrey" }}
                type="date"
                value={startDateOne}
                onChange={(e) => handleStartDateOne(e.target.value)}
              />
            </span>
            <span>
              <input
                // onKeyDown={(e) => e.preventDefault()}
                // className="datetime"
                style={{
                  marginLeft: "90px",
                  //marginBottom: "30px",
                  fontSize: "20px",
                  color: "darkslategrey",
                }}
                type="time"
                value={startTimeOne}
                selected=""
                onChange={(e) => handleStartTimeOne(e.target.value)}
              />
              <div
                style={{
                  color: "red",
                  marginBottom: messageone == "" ? "0px" : "30px",
                }}
              >
                {messageone}
              </div>
              <div style={{ color: "red", marginBottom: "30px" }}>
                {optdateonemsg}
              </div>
            </span>
          </div>

          <div style={{ marginBottom: "8px", fontWeight: "bold" }}>
            <span> Option 2</span>
          </div>
          <div>
            <span>
              <input
                // onKeyDown={(e) => e.preventDefault()}
                // className="datetime"
                min={mindate}
                max="9999-12-31"
                style={{ fontSize: "20px", color: "darkslategrey" }}
                type="date"
                value={startDateTwo}
                onChange={(e) => handleStartDateTwo(e.target.value)}
              />
            </span>
            <span>
              <input
                // onKeyDown={(e) => e.preventDefault()}
                // className="datetime"
                style={{
                  marginLeft: "90px",
                  // marginBottom: "30px",
                  fontSize: "20px",
                  color: "darkslategrey",
                }}
                type="time"
                value={startTimeTwo}
                selected=""
                onChange={(e) => handleStartTimeTwo(e.target.value)}
              />
              <div
                style={{
                  color: "red",
                  marginBottom: messagetwo == "" ? "0px" : "30px",
                }}
              >
                {messagetwo}
              </div>
              <div style={{ color: "red", marginBottom: "30px" }}>
                {optdatetwomsg}
              </div>
            </span>
          </div>

          <div style={{ marginBottom: "8px", fontWeight: "bold" }}>
            <span> Option 3</span>
          </div>
          <div>
            <span>
              <input
                // onKeyDown={(e) => e.preventDefault()}
                // className="datetime"
                min={mindate}
                style={{ fontSize: "20px", color: "darkslategrey" }}
                type="date"
                max="9999-12-31"
                value={startDateThree}
                // selected=""
                onChange={(e) => handleStartDateThree(e.target.value)}
              />
            </span>
            <span>
              <input
                // onKeyDown={(e) => e.preventDefault()}
                // className="datetime"
                style={{
                  marginLeft: "90px",
                  //marginBottom: "30px",
                  fontSize: "20px",
                  color: "darkslategrey",
                }}
                type="time"
                value={startTimeThree}
                selected=""
                onChange={(e) => handleStartTimeThree(e.target.value)}
              />
              <div
                style={{
                  color: "red",
                  marginBottom: messagethree == "" ? "0px" : "30px",
                }}
              >
                {messagethree}
              </div>
              <div style={{ color: "red", marginBottom: "30px" }}>
                {optdatethreemsg}
              </div>
            </span>
          </div>
        </div>

        <div className="messagefour">
          <span
            style={{ color: "red", textAlign: "center", fontWeight: "bolder" }}
          >
            {messagefour}
          </span>
        </div>

        <>
          <button
            className="ok-butn ok-step-three"
            // tabIndex="0"
            onClick={handleOnButnClick}
            // ref={(button) => {
            //   okButn = button;
            // }}
            // onKeyDown={() => {
            //   handleOnButnClick();
            // }}
          >
            OK
            <HiOutlineCheck></HiOutlineCheck>
          </button>
          <span className="enter-text">press Enter ↵</span>
        </>
      </div>
    </StyleRoot>
  );
};

export default StepThreeD;
