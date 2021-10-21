import { useState, useEffect } from "react";
import { BsArrowRightShort, BsShift } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { BiCommand } from "react-icons/bi";
import { AiOutlineEnter } from "react-icons/ai";
import { fadeInUp } from "react-animations";
import Radium, { StyleRoot } from "radium";
import axios from "axios";
import Loader from "./Loader/Loader";
import Constants from "../Constants";
import Footer from "./Footer";

const styles = {
  fadeInUp: {
    animation: "x 1s",
    animationName: Radium.keyframes(fadeInUp, "fadeInUp"),
  },
};

const StepFour = (props) => {
  let inputValueRef = null;
  const [isTyped, setIsTyped] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [loader, setLoader] = useState(false);
  const [id, setId] = useState(0);
  const [submissionId, setSubmissionId] = useState(0);

  useEffect(() => {
    console.log(props, "my props");
    setInputValue(props.values?.input);
    inputValueRef?.focus();
    props.setValues.setCompletedProgress(100);
  }, []);

  const handleOnButnClick = () => {
    setLoader(true);
    postUserList();
  };

  function makeid(length) {
    return Math.floor(Math.random() * 999999999);
  }

  async function shortenUrl(long_url) {
    return axios({
      method: "post",
      url: "https://api-ssl.bitly.com/v4/shorten",
      headers: {
        Authorization: "Bearer dc976a543799782f62c35ca8edf34aab9106dc35",
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        long_url,
      }),
    });
  }

  const dateMaker = (date) => {
    var dateInString = date.toString();
    var dateInSplit = dateInString.split("GMT");
    var dateParts = dateInSplit[1].split(" ");
    var day = ("0" + date.getDate()).slice(-2);
    var monthIndex = ("0" + (date.getMonth() + 1)).slice(-2);
    var year = date.getFullYear();
    var seconds = (date.getSeconds() < 10 ? "0" : "") + date.getSeconds();
    var minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
    var hour = ("0" + date.getHours()).slice(-2);
    var ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12;
    hour = hour ? hour : 12; // the hour '0' should be '12'
    var strTime = hour + ":" + minutes + " " + ampm;
    var newDate = monthIndex + "/" + day + "/" + year + " - " + strTime;
    return newDate;
  };

  const postUserList = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const url = Constants.API_URL; //"https://philobotoapi.hztech.biz/php/api.php";
    var data = new FormData();
    data.append("action", "post_zapier");
    data.append("formSubmission", makeid(5));
    data.append("submissionDate", dateMaker(new Date()));
    data.append("firstName", queryParams.get("first_name"));
    data.append("lastName", queryParams.get("last_name"));
    data.append("email", queryParams.get("email"));
    data.append("altEmail", props.values.email);
    data.append("phone", queryParams.get("mobile_number"));
    data.append("altPhone", props.values.phone);
    data.append("customerType", queryParams.get("customer_type"));
    data.append("insuranceFront", props.values.files);
    data.append("insuranceBack", props.values.cardback);
    data.append("labOrders", props.values.laborder.join("\n  "));
    data.append("ApptOpion1", props.values.optionone);
    data.append("ApptOpion2", props.values.optiontwo);
    data.append("ApptOpion3", props.values.optionthree);
    data.append("notes", inputValue);
    data.append("serviceDistance", props.values.distance);
    data.append("serviceMillage", (props.values.distance * 0.54).toFixed(2));
    data.append("serviceStreet1", props.values.location.street1);
    data.append("serviceStreet2", props.values.location.street2);
    data.append("serviceCity", props.values.location.city);
    data.append("serviceState", props.values.location.state);
    data.append("serviceZip", props.values.location.zip);
    data.append("address2", props.values.addresstwo);
    console.log(
      makeid(5),
      inputValue,
      props,
      props.values.location.city,
      props.values.optionone,
      queryParams.get("first_name"),
      queryParams.get("last_name"),
      queryParams.get("email"),
      queryParams.get("mobile_number"),
      queryParams.get("customer_type"),
      props.values.addresstwo
    );
    var config = {
      method: "post",
      url: url,
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data, "response");
        setLoader(false);
        setId(response.data.id);
        setSubmissionId(response.data.submission_id);
        props.setValues.setId(response.data.id);
        props.setValues.setSubmissionId(response.data.submission_id);
        props.nextStep(12);
      })
      .catch(function (error) {
        console.log(error);
        setLoader(false);
      });
  };

  const handleKeyPress = (e) => {
    if (e.nativeEvent.keyCode === 13) {
      if (e.nativeEvent.ctrlKey) {
        handleOnButnClick();
      }
      if (e.nativeEvent.metaKey) {
        handleOnButnClick();
      }
    }
  };

  return (
    <StyleRoot>
      {loader ? (
        <Loader msg={"Processing your order. Please wait..."} />
      ) : (
        <div className="step-four" style={styles.fadeInUp}>
          <div className="question">
            <span className="step-no">
              {props.indicator === true ? (
                <span>6</span>
              ) : (
                <>
                  {" "}
                  <span>8</span>
                </>
              )}

              <BsArrowRightShort></BsArrowRightShort>
            </span>
            <p>
              Excellent. One of our representatives will be contacting you
              shortly, but any additional information or comments you can share
              in advance will help to expedite your order. <br />
              Do you have any comments or concerns you would like to add?
            </p>
          </div>
          <div>
            <textarea
              className="input-answer"
              type="text"
              name="answer"
              value={inputValue}
              placeholder="Type your answer here..."
              onChange={(e) => {
                setInputValue(e.target.value);
                setIsTyped(true);
              }}
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
              ref={(inputVal) => {
                inputValueRef = inputVal;
              }}
              onKeyDown={(e) => handleKeyPress(e)}
            />
            <div className="instructions">
              <span className="bold">Shift ⇧</span> +{" "}
              <span className="bold">Enter ↵</span> to make a line break
            </div>

            <div className="butnWrap">
              <button
                type="submit"
                className="submit-form"
                tabIndex="0"
                onClick={() => {
                  handleOnButnClick();
                }}
              >
                Submit
              </button>
              {window.navigator.platform.toLowerCase().includes("win") && (
                <>
                  <span>press </span>
                  <span className="bold">
                    Ctrl <AiOutlinePlus></AiOutlinePlus>
                  </span>
                  <span className="bold">
                    &nbsp;Enter <AiOutlineEnter></AiOutlineEnter>
                  </span>
                </>
              )}
              {window.navigator.platform.toLowerCase().includes("mac") && (
                <>
                  <span>press </span>
                  <span className="bold">
                    Cmd <BiCommand></BiCommand>
                  </span>
                  <span className="bold">
                    &nbsp;Enter <AiOutlineEnter></AiOutlineEnter>
                  </span>
                </>
              )}
            </div>
          </div>
          <Footer
            stepNo={props.stepNo}
            nextStep={props.nextStep}
            prevStep={props.prevStep}
          />
        </div>
      )}
    </StyleRoot>
  );
};

export default StepFour;
