import { useEffect, useState } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { HiOutlineCheck } from "react-icons/hi";
import { fadeInUp } from "react-animations";
import Radium, { StyleRoot } from "radium";
import Footer from "./Footer";
import React from "react";

const styles = {
  fadeInUp: {
    animation: "x 1s",
    animationName: Radium.keyframes(fadeInUp, "fadeInUp"),
  },
};

const NoPageStep2 = (props) => {
  const [email, setEmail] = useState("");
  const [showerrmsg, setShowErrMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  let inputfocus = null;

  useEffect(() => {
    setEmail(props.values?.email || props.values?.mandotaryEmail || "");
    props.setValues.setCompletedProgress(22);
    inputfocus?.focus();
  }, []);

  const handleOnButnClick = () => {
    var pattern = /^([a-zA-Z0-9_\.-]+\@[\da-z\.-]+\.[a-z\.]{2,6})$/;
    if (props.values.hasInformation && email == "") {
      props.nextStep(4);
    } else if (pattern.test(email)) {
      setShowErrMsg(false);
      setErrorMsg("");
      if (!props.values.hasInformation) {
        props.setValues.setMandotaryEmail(email);
      } else {
        props.setValues.setEmail(email);
      }
      props.nextStep(4);
    } else {
      setShowErrMsg(true);
      setErrorMsg("Hmm… that email doesn't look valid");
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
            {props.stepNo}
            <BsArrowRightShort></BsArrowRightShort>
          </span>
          <p>
            <span className="level-one">
              {props.values.hasInformation ? 'Do you have an alternative email address?' : "What's your email address?*" }
            </span>
            <span className="level-two">
              We promise not to spam you or sell your contact information.
            </span>
          </p>
        </div>

        <div>
          <input
            type="email"
            name="email"
            value={email}
            style={{ width: "100%" }}
            placeholder="name@example.com"
            onChange={(e) => {
              if (e.target.value == "") {
                setShowErrMsg(false);
                setErrorMsg("");
              }
              setEmail(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                handleOnButnClick();
              }
            }}
            ref={(email) => {
              inputfocus = email;
            }}
          />
        </div>

        {showerrmsg ? (
          <div style={{ color: "red", fontWeight: "bold", marginTop: "10px" }}>
            {errorMsg}
          </div>
        ) : (
          <></>
        )}

        <>
          <button
            className="ok-butn ok-step-three"
            tabIndex="0"
            onClick={() => {
              handleOnButnClick();
            }}
            onKeyDown={() => {
              handleOnButnClick();
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
export default NoPageStep2;
