import { useEffect, useState } from "react";
import { fadeInUp } from "react-animations";
import Radium, { StyleRoot } from "radium";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

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
      <div className="step-two location-accept" style={styles.fadeInUp}>
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
              props.nextStep(5);
            }}
            ref={(fdbackbtn) => {
              fdbackbtnfocus = fdbackbtn;
            }}
          >
            Continue
          </button>
          <span className="enter-text">press Enter ↵</span>
        </>

        <br />

        <div className="footer-navigation">
          <button
            className={["footer-navigation-butn down bold"]}
            onClick={() => {
              props.nextStep(5);
            }}
          >
            <IoIosArrowDown></IoIosArrowDown>
          </button>
          <button
            style={{
              borderRight: "1px solid rgba(50, 39, 1, 0.3)",
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            }}
            className={["footer-navigation-butn up"]}
            onClick={() => {
              props.nextStep(4);
            }}
          >
            <IoIosArrowUp></IoIosArrowUp>
          </button>
        </div>
      </div>
    </StyleRoot>
  );
};

export default FeedBack;
