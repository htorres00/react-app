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
  let inputfocus = null;

  useEffect(() => {
    props.setValues.setCompletedProgress(22);
    inputfocus?.focus();
  });

  const handleOnButnClick = () => {
    props.setValues.setEmail(email);
    props.nextStep(4);
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
              Do you have an alternative email address?
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
          stepNo={props.stepNo}
          nextStep={props.nextStep}
          prevStep={props.prevStep}
        />
      </div>
    </StyleRoot>
  );
};
export default NoPageStep2;
