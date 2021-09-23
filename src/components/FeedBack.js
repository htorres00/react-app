import { useEffect, useState } from "react";
import { HiOutlineCheck } from "react-icons/hi";
import { fadeInUp } from "react-animations";
import Radium, { StyleRoot } from "radium";

const styles = {
  fadeInUp: {
    animation: "x 1s",
    animationName: Radium.keyframes(fadeInUp, "fadeInUp"),
  },
};

const FeedBack = (props) => {
  let textInput = null;
  useEffect(() => {
    console.log(props, "props");
    textInput.focus();
  }, []);

  return (
    <StyleRoot>
      <div className="step-two" style={styles.fadeInUp}>
        <div className="question">
          <p>
            <span className="level-one">{props.tecnicianresponce}</span>
            {/* <span className="level-one">
              Good news, you're within our area of service.
            </span>
            <span className="level-one">
              A mileage fee of at least $7.30 will be added to the order.
            </span>

            <span className="level-two">
              The final amount will be included when the appoitment is
              confirmed.
            </span> */}
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
              props.nextStep(12);
            }}
            ref={(button) => {
              textInput = button;
            }}
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

export default FeedBack;
