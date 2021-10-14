import { useEffect, useState } from "react";
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

const FeedBack = (props) => {
  let fdbackbtnfocus = null;

  useEffect(() => {
    fdbackbtnfocus?.focus();
  }, []);

  return (
    <StyleRoot>
      <div className="step-two" style={styles.fadeInUp}>
        <div className="question">
          <p>
            <span className="level-one">{props.values?.servicemsg}</span>
          </p>
        </div>

        <div className="instructions">
          <span className="bold">Shift ⇧</span> +{" "}
          <span className="bold">Enter ↵</span> to make a line break
        </div>
        <>
          <button
            className="ok-butn ok-step-three"
            onClick={() => {
              props.nextStep(6);
            }}
            ref={(fdbackbtn) => {
              fdbackbtnfocus = fdbackbtn;
            }}
          >
            Continue
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

export default FeedBack;
