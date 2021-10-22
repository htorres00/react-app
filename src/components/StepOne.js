import { useEffect, useState } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { HiOutlineCheck } from "react-icons/hi";
import yes from "../images/yes.png";
import no from "../images/no.png";
import { fadeInUp, flash } from "react-animations";
import Radium, { StyleRoot } from "radium";
import Footer from "./Footer";

const styles = {
  fadeInUp: {
    animation: "x 1s",
    animationName: Radium.keyframes(fadeInUp, "fadeInUp"),
  },
  flash: {
    animation: "x 1s",
    animationName: Radium.keyframes(flash, "flash"),
  },
};

const StepOne = (props) => {
  const queryParams = new URLSearchParams(window.location.search);
  const [KeyValue, setKeyValue] = useState("");
  var value;
  let emailOption = null;
  let okButn = null;

  useEffect(() => {
    setKeyValue(props.values?.emailQuestion);
    emailOption.focus();
    props.setValues.setCompletedProgress(10);
  }, []);

  useEffect(() => {
    okButn?.focus();
  }, [KeyValue]);

  const setValue = (answer) => {
    value = answer;
    setKeyValue(value);
    setTimeout(function () {
      if (answer == "yes") {
        props.setValues.setEmailQuestion(value);
        props.nextStep(4, true);
      } else {
        props.setValues.setEmailQuestion(value);
        props.nextStep(2, false);
      }
    }, 1000);
  };

  const handleClick = () => {
    if (KeyValue == "yes") {
      props.nextStep(4);
    } else {
      props.nextStep(2);
    }
  };

  const formatPhoneNumber = (phoneNumberString) => {
    var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      var intlCode = match[1] ? "+1 " : "";
      return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("");
    }
    return phoneNumberString;
  };

  return (
    <StyleRoot>
      <div className="step-one-wrapper">
        <div
          className="step-one step-one-container"
          style={styles.fadeInUp}
          tabIndex="0"
          ref={(div) => {
            emailOption = div;
          }}
          onKeyDown={(e) => {
            if (e.keyCode === 65) {
              setValue("yes");
            } else if (e.keyCode === 66) {
              setValue("no");
            } else {
              setValue("no");
            }
          }}
        >
          <div className="question">
            <span className="step-no">
              {props.stepNo}
              {props.yesstep}
              <BsArrowRightShort></BsArrowRightShort>
            </span>
            <p>
              We have you with email {queryParams.get("email")} and phone number{" "}
              {formatPhoneNumber(queryParams.get("mobile_number"))}. Is this the
              best email and number to reach you?
            </p>
          </div>

          <div className="options-container">
            <div
              className={
                KeyValue == "yes"
                  ? "option-container key-a active"
                  : "option-container key-a"
              }
              style={KeyValue === "yes" ? styles.flash : null}
              onClick={() => {
                setValue("yes");
              }}
            >
              <div className="option-container-wraper">
                <div className="option-wraper yes">
                  <div className="level-one">
                    <div className="img-wraper">
                      <img src={yes} className="option option-yes" alt="Yes" />
                    </div>
                    <div className="spacer"></div>
                    <div className="level-two">
                      <div className="key-helper-wraper">
                        <div className="key-container">
                          <div className="key-box-wraper">
                            <div className="key-box">
                              <span className="key-hint">Key</span>
                              <span className="key-letter">A</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="picture-choice-content-wraper">
                        <div className="picture-choice-content">choice 1</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={
                KeyValue == "no"
                  ? "option-container key-b active"
                  : "option-container key-b"
              }
              style={KeyValue === "no" ? styles.flash : null}
              onClick={() => {
                setValue("no");
              }}
            >
              <div className="option-container-wraper">
                <div className="option-wraper no">
                  <div className="level-one">
                    <div className="img-wraper">
                      <img src={no} className="option option-no" alt="No" />
                    </div>
                    <div className="spacer"></div>
                    <div className="level-two">
                      <div className="key-helper-wraper">
                        <div className="key-container">
                          <div className="key-box-wraper">
                            <div className="key-box">
                              <span className="key-hint">Key</span>
                              <span className="key-letter">B</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="picture-choice-content-wraper">
                        <div className="picture-choice-content">choice 2</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {KeyValue != "" && (
            <button
              className="ok-butn ok-step-one"
              tabIndex="0"
              onClick={() => handleClick()}
              ref={(button) => {
                okButn = button;
              }}
            >
              OK
              <HiOutlineCheck></HiOutlineCheck>
            </button>
          )}
          <Footer
            handleClick={handleClick}
            stepNo={props.stepNo}
            nextStep={props.nextStep}
            prevStep={props.prevStep}
          />
        </div>
      </div>
    </StyleRoot>
  );
};

export default StepOne;
