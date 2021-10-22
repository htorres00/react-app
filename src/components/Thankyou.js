import { fadeInUp } from "react-animations";
import Radium, { StyleRoot } from "radium";
import { useState, useEffect } from "react";

const styles = {
  fadeInUp: {
    animation: "x 1s",
    animationName: Radium.keyframes(fadeInUp, "fadeInUp"),
  },
};

const ThankYou = (props) => {
  useEffect(() => {
    localStorage.removeItem("bfusers");
  }, []);

  return (
    <StyleRoot>
      <div className="thank-you" style={styles.fadeInUp}>
        <h1 className="title">That's it! You've been great.</h1>
        {props.values.id &&
          <h2 className="title">Your Service Request # is: {props.values.id}</h2>
        }
        {!props.values.id && props.values.submissionId &&
          <h2 className="title">Submission ID: {props.values.submissionId}</h2>
        }
        <h3 className="levelOOne">
          One of our representatives will contact you shortly. Thank you!
        </h3>
        <p className="levelTwo">
          Feel free to contact us if you have questions.
          <span className="website bold">phlebotomynetwork.com</span>
          <span className="phone bold">(415) 687-4854</span>
        </p>
      </div>
    </StyleRoot>
  );
};

export default ThankYou;
