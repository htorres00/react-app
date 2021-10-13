import { useEffect, useState } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { HiOutlineCheck } from "react-icons/hi";
import { fadeInUp } from "react-animations";
import Radium, { StyleRoot } from "radium";
import "react-phone-input-2/lib/style.css";
import Footer from "./Footer";

const styles = {
  fadeInUp: {
    animation: "x 1s",
    animationName: Radium.keyframes(fadeInUp, "fadeInUp"),
  },
};

const StepTwo = (props) => {
  useEffect(() => {}, []);
  let serreqfocus = null;

  useEffect(() => {
    props.setValues.setCompletedProgress(26);
    serreqfocus?.focus();
  }, []);

  return (
    <StyleRoot>
      <div className="step-two" style={styles.fadeInUp}>
        <div className="question">
          <span className="step-no">
            {props.indicator === true ? <span>3</span> : <> {props.stepNo}</>}

            <BsArrowRightShort></BsArrowRightShort>
          </span>
          <p>
            <span className="level-one">
              To process your Service Request, we need some documents.
            </span>
            <span className="level-one">
              Mainly, insurance details and lab orders.
            </span>
            <span className="level-two">
              INSTRUCTIONS: You can upload only one file on each question. If
              you have a file attachment with multiple pages, great!. Otherwise,
              you can take a picture or scan one page and upload it as prompted
              on each of the questions below.
            </span>
          </p>
        </div>

        <div className="butnWraper">
          <button
            className="start-form"
            onClick={() => {
              props.nextStep(7);
            }}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                props.nextStep(7);
              }
            }}
            ref={(button) => {
              serreqfocus = button;
            }}
          >
            Continue
          </button>
          <span className="press">press Enter ↵</span>
        </div>
        <Footer
          stepNo={props.stepNo}
          nextStep={props.nextStep}
          prevStep={props.prevStep}
        />
      </div>
    </StyleRoot>
  );
};

export default StepTwo;
