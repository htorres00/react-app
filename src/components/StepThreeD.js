import { useEffect, useState } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { HiOutlineCheck } from "react-icons/hi";
import { fadeInUp } from "react-animations";
import Radium, { StyleRoot } from "radium";
import Footer from "./Footer";

const styles = {
  fadeInUp: {
    animation: "x 1s",
    animationName: Radium.keyframes(fadeInUp, "fadeInUp"),
  },
};

const StepThreeD = (props) => {
  const [appttimes, setApptTimes] = useState([
    { id: 1, value: "07:00 AM" },
    { id: 2, value: "07:30 AM" },
    { id: 3, value: "08:00 AM" },
    { id: 4, value: "08:30 AM" },
    { id: 5, value: "09:00 AM" },
    { id: 6, value: "09:30 AM" },
    { id: 7, value: "10:00 AM" },
    { id: 8, value: "10:30 AM" },
    { id: 9, value: "11:00 AM" },
    { id: 10, value: "11:30 AM" },
    { id: 11, value: "12:00 AM" },
    { id: 12, value: "12:30 PM" },
    { id: 13, value: "01:00 PM" },
    { id: 14, value: "01:30 PM" },
    { id: 15, value: "02:00 PM" },
    { id: 16, value: "02:30 PM" },
    { id: 17, value: "03:00 PM" },
    { id: 18, value: "03:30 PM" },
    { id: 19, value: "04:00 PM" },
  ]);
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

  useEffect(() => {
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
    if (timeone == "") {
      setMessageOne("Please enter the time between 7am to 4pm Only.");
      return;
    }
    setStartTimeOne(timeone);
    setMessageOne("");
  };

  const handleStartTimeTwo = (timetwo) => {
    if (timetwo == "") {
      setMessageTwo("Please enter the time between 7am to 4pm Only.");
      return;
    }
    setStartTimeTwo(timetwo);
    setMessageTwo("");
  };

  const handleStartTimeThree = (timethree) => {
    if (timethree == "") {
      setMessageThree("Please enter the time between 7am to 4pm Only.");
      return;
    }
    setStartTimeThree(timethree);
    setMessageThree("");
  };

  const handleOnButnClick = () => {
    if (
      startDateOne === null ||
      startDateTwo === null ||
      startDateThree === null ||
      startTimeOne === null ||
      startTimeTwo === null ||
      startTimeThree === null
    ) {
      setMessageFour(
        "The appointment options should be unique or should not be empty Please review your options."
      );
      return;
    }
    setMessageFour("");
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

    let opt1 = startDateOne + "T" + startTimeOne + ":00";
    let opt2 = startDateTwo + "T" + startTimeTwo + ":00";
    let opt3 = startDateThree + "T" + startTimeThree + ":00";

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
      props.nextStep(11);
    }
  };

  const handleBlurDate = () => {
    if (
      startDateOne === null ||
      startDateTwo === null ||
      startDateThree === null ||
      startTimeOne === null ||
      startTimeTwo === null ||
      startTimeThree === null
    ) {
      setMessageFour(
        "The appointment options should be unique or should not be empty Please review your options."
      );
    } else {
      if (
        startDateOne !== startDateTwo &&
        startDateOne !== startDateThree &&
        startDateTwo !== startDateThree
      ) {
        console.log("Good to go");
        setMessageFour("");
      } else {
        setMessageFour(
          "The appointment options should be unique or should not be empty Please review your options."
        );
      }
    }
  };

  return (
    <StyleRoot>
      <div className="step-three" style={styles.fadeInUp}>
        <div className="question">
          <span className="step-no">
            {props.indicator === true ? (
              <span>4</span>
            ) : (
              <>
                {" "}
                <span>7</span>
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
                onBlur={() => handleBlurDate()}
                onChange={(e) => handleStartDateOne(e.target.value)}
              />
            </span>

            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <select
                className="appttime"
                onBlur={() => handleBlurDate()}
                onChange={(e) => handleStartTimeOne(e.target.value)}
                value={startTimeOne}
              >
                <option value="" selected disabled style={{ fontSize: "15px" }}>
                  00:00 AM
                </option>

                {appttimes.map((appttime) => (
                  <option
                    key={appttime.id}
                    value={appttime.value}
                    style={{
                      fontSize: "15px",
                    }}
                  >
                    {appttime.value}
                  </option>
                ))}
              </select>
            </div>

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
                onBlur={() => handleBlurDate()}
                onChange={(e) => handleStartDateTwo(e.target.value)}
              />
            </span>
            <span>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <select
                  className="appttime"
                  onBlur={() => handleBlurDate()}
                  onChange={(e) => handleStartTimeTwo(e.target.value)}
                  value={startTimeTwo}
                >
                  <option
                    value=""
                    selected
                    disabled
                    style={{ fontSize: "15px" }}
                  >
                    00:00 AM
                  </option>

                  {appttimes.map((appttime) => (
                    <option
                      key={appttime.id}
                      value={appttime.value}
                      style={{
                        fontSize: "15px",
                      }}
                    >
                      {appttime.value}
                    </option>
                  ))}
                </select>
              </div>

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
                onBlur={() => handleBlurDate()}
                onChange={(e) => handleStartDateThree(e.target.value)}
              />
            </span>
            <span>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <select
                  className="appttime"
                  onBlur={() => handleBlurDate()}
                  onChange={(e) => handleStartTimeThree(e.target.value)}
                  value={startTimeThree}
                >
                  <option
                    value=""
                    selected
                    disabled
                    style={{ fontSize: "15px" }}
                  >
                    00:00 AM
                  </option>

                  {appttimes.map((appttime) => (
                    <option
                      key={appttime.id}
                      value={appttime.value}
                      style={{
                        fontSize: "15px",
                      }}
                    >
                      {appttime.value}
                    </option>
                  ))}
                </select>
              </div>

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
        <Footer
          stepNo={props.stepNo}
          nextStep={props.nextStep}
          prevStep={props.prevStep}
        />
      </div>
    </StyleRoot>
  );
};

export default StepThreeD;
