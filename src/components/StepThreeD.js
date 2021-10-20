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
  let apptdate = null;
  let okButn = null;

  useEffect(() => {
    apptdate.focus();
    //okButn.focus();
    props.setValues.setCompletedProgress(85);
    setStartDateOne(props.values?.dateone);
    setStartTimeOne(props.values?.timeone);
    setStartDateTwo(props.values?.datetwo);
    setStartTimeTwo(props.values?.timetwo);
    setStartDateThree(props.values?.datethree);
    setStartTimeThree(props.values?.timethree);
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

  const validateTimeOptions = () => {
    let hasError = false;
    let datesArray = [];
    let fullDatesArray = [];
    let timesArray = [];

    if(startDateOne) {
      if (startDateOne < mindate) {
        setOptDateOneMsg("Date should be greater than Today + 4 days");
        hasError = true;
      } else if(!startTimeOne) {
        setOptDateOneMsg("Please select any time");
        hasError = true;
      } else {
        setOptDateOneMsg("");
        fullDatesArray.push(startDateOne + "T" + startTimeOne.slice(0, 5) + ":00");
        datesArray.push(startDateOne);
        timesArray.push(startTimeOne.slice(0, 5) + ":00");
      }
    }

    if(startDateTwo) {
      if (startDateTwo < mindate) {
        setOptDateTwoMsg("Date should be greater than Today + 4 days");
        hasError = true;
      } else if(!startTimeTwo) {
        setOptDateTwoMsg("Please select any time");
        hasError = true;
      }  else {
        setOptDateTwoMsg("");
        fullDatesArray.push(startDateTwo + "T" + startTimeTwo.slice(0, 5) + ":00");
        datesArray.push(startDateTwo);
        timesArray.push(startTimeTwo.slice(0, 5) + ":00");
      }
    }

    if(startDateThree) {
      if (startDateThree < mindate) {
        setOptDateThreeMsg("Date should be greater than Today + 4 days");
        hasError = true;
      } else if(!startTimeThree) {
        setOptDateThreeMsg("Please select any time");
        hasError = true;
      }  else {
        setOptDateThreeMsg("");
        fullDatesArray.push(startDateThree + "T" + startTimeThree.slice(0, 5) + ":00");
        datesArray.push(startDateThree);
        timesArray.push(startTimeThree.slice(0, 5) + ":00");
      }
    }

    let filteredDatesArray = [...new Set(fullDatesArray)];

    if(filteredDatesArray.length !== fullDatesArray.length) {
      hasError = true;
      setMessageFour(
          "The appointment options should be unique. Please review your options."
      );
    } else {
      setMessageFour('');
    }
    return [hasError, fullDatesArray];
  };

  const handleOnButnClick = () => {
    const validate = validateTimeOptions();
    const hasError = validate[0];
    const fullDatesArray = validate[1];

    if(!hasError) {
      for(var i in fullDatesArray) {
        var d = fullDatesArray[i];

        switch (i) {
          case 1:
            props.setValues.setOptionTwo(d);
            break;
          case 2:
            props.setValues.setOptionThree(d);
            break;
          default:
            props.setValues.setOptionOne(d);
            break;
        }
      }

      props.setValues.setDateOne(startDateOne);
      props.setValues.setTimeOne(startTimeOne);
      props.setValues.setDateTwo(startDateTwo);
      props.setValues.setTimeTwo(startTimeTwo);
      props.setValues.setDateThree(startDateThree);
      props.setValues.setTimeThree(startTimeThree);

      props.nextStep(11);
    }
  };

  // DISABLED - RECODED THIS FUNC
  const handleOnButnClick2 = () => {
    if (
      startDateOne === null ||
      startDateTwo === null ||
      startDateThree === null ||
      startTimeOne === null ||
      startTimeTwo === null ||
      startTimeThree === null
    ) {
      setMessageFour(
        "The appointment options should be unique or should not \n be empty Please review your options."
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

    let opt1 = startDateOne + "T" + startTimeOne.slice(0, 5) + ":00";
    let opt2 = startDateTwo + "T" + startTimeTwo.slice(0, 5) + ":00";
    let opt3 = startDateThree + "T" + startTimeThree.slice(0, 5) + ":00";

    //console.log(opt1, opt2, opt3, "My options");

    if (
      opt1 != null &&
      opt2 != null &&
      opt3 != null &&
      (startDateOne === startDateTwo ||
        startDateOne === startDateThree ||
        startDateTwo === startDateThree)
    ) {
      setMessageFour(
        "The appointment options should be unique or should not \n be empty Please review your options."
      );
    } else {
      //console.log("Good to go");
      setMessageFour("");
      props.setValues.setOptionOne(opt1);
      props.setValues.setOptionTwo(opt2);
      props.setValues.setOptionThree(opt3);

      props.setValues.setDateOne(startDateOne);
      props.setValues.setTimeOne(startTimeOne);
      props.setValues.setDateTwo(startDateTwo);
      props.setValues.setTimeTwo(startTimeTwo);
      props.setValues.setDateThree(startDateThree);
      props.setValues.setTimeThree(startTimeThree);

      props.nextStep(11);
    }
  };

  const handleBlurDate = () => {
    //validateTimeOptions();
  };

  const handleBlurDate2 = () => {
    if (
      startDateOne !== null &&
      startDateTwo !== null &&
      startDateThree !== null &&
      startTimeOne !== null &&
      startTimeTwo !== null &&
      startTimeThree !== null
    ) {
      let opt1 = startDateOne + "T" + startTimeOne.slice(0, 5) + ":00";
      let opt2 = startDateTwo + "T" + startTimeTwo.slice(0, 5) + ":00";
      let opt3 = startDateThree + "T" + startTimeThree.slice(0, 5) + ":00";
      if (opt1 === opt2 || opt1 === opt3 || opt2 === opt3) {
        setMessageFour(
          "The appointment options should be unique or should not \n be empty Please review your options."
        );
      } else {
        okButn.focus();
        setMessageFour("");
      }
    } else {
      okButn.focus();
      setMessageFour("");
    }
  };

  return (
    <StyleRoot>
      <div
        className="step-three"
        style={styles.fadeInUp}
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            handleOnButnClick();
          }
        }}
      >
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
                ref={(apptDT) => {
                  apptdate = apptDT;
                }}
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
            className="new-line"
            style={{ color: "red", fontWeight: "bold" }}
          >
            {messagefour}
          </span>
        </div>

        <>
          <button
            className="ok-butn ok-step-three"
            // tabIndex="0"
            onClick={handleOnButnClick}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                handleOnButnClick();
              }
            }}
            ref={(button) => {
              okButn = button;
            }}
          >
            OK
            <HiOutlineCheck></HiOutlineCheck>
          </button>
          <span className="enter-text">press Enter ↵</span>
        </>
        <Footer
          handleOnButnClick={handleOnButnClick}
          stepNo={props.stepNo}
          nextStep={props.nextStep}
          prevStep={props.prevStep}
        />
      </div>
    </StyleRoot>
  );
};

export default StepThreeD;
// const handleBlurDate = () => {
//   if (
//     startDateOne === null ||
//     startDateTwo === null ||
//     startDateThree === null ||
//     startTimeOne === null ||
//     startTimeTwo === null ||
//     startTimeThree === null
//   ) {
//     setMessageFour(
//       "The appointment options should be unique or should not \n be empty Please review your options."
//     );
//   } else {
//     if (
//       startDateOne !== startDateTwo &&
//       startDateOne !== startDateThree &&
//       startDateTwo !== startDateThree
//     ) {
//       //console.log("Good to go");
//       okButn.focus();
//       setMessageFour("");
//     } else {
//       setMessageFour(
//         "The appointment options should be unique or should not \n be empty Please review your options."
//       );
//     }
//   }
// };
