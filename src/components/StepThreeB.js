import { useEffect, useState } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { HiOutlineCheck } from "react-icons/hi";
import { fadeInUp } from "react-animations";
import Radium, { StyleRoot } from "radium";
import Attachment from "./Attachment";
import AttachmentSingleNew from "./AttachmentSingleNew";

const styles = {
  fadeInUp: {
    animation: "x 1s",
    animationName: Radium.keyframes(fadeInUp, "fadeInUp"),
  },
};

const StepThreeB = (props) => {
  // let emailInput = null;
  let okButn = null;
  // const [emailValue, setEmailValue] = useState("");
  var value;

  useEffect(() => {
    // setEmailValue(props.values?.email);
    // emailInput.focus();
    props.setValues.setCompletedProgress(55);
  }, []);

  // const setValue = (answer) => {
  //   value = answer;
  //   setEmailValue(value);
  //   setTimeout(function () {
  //     props.setValues.setEmail(value);
  //   }, 1000);
  // };

  // const handleOnButnClick = () => {
  //   if (emailValue != "") {
  //     props.setValues.setEmail(emailValue);
  //     props.nextStep();
  //   }
  // };

  const handleUrls = (urlss) => {
    console.log(urlss);
    props.setValues.setCardBack(urlss);
    props.nextStep(7);
  };

  return (
    <StyleRoot>
      <div className="step-three" style={styles.fadeInUp}>
        <div className="question">
          <span className="step-no">b.</span>
          <p>
            <span className="level-one" style={{ display: "inline" }}>
              Now the back of your{" "}
              <span style={{ fontWeight: 600 }}>insurance card.</span>
            </span>
            {/* <span className="level-two">
              We promise not to spam you or sell your contact information.
            </span> */}
          </p>
        </div>

        <AttachmentSingleNew url={handleUrls} />
        {/* <div>
          <input
            type="email"
            name="email"
            value={emailValue}
            placeholder="name@example.com"
            onChange={(e) => {
              setEmailValue(e.target.value);
            }}
            ref={(emailInpt) => {
              emailInput = emailInpt;
            }}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                handleOnButnClick();
              }
            }}
          />
        </div> */}

        {/* {emailValue && emailValue.length > 0 && (
          <>
            <button
              className="ok-butn ok-step-three"
              tabIndex="0"
              onClick={() => {
                handleOnButnClick();
              }}
              ref={(button) => {
                okButn = button;
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
        )} */}

        {/* <>
            <button
              className="ok-butn ok-step-three"
              // tabIndex="0"
              onClick={() => {
                handleOnButnClick();
              }}
              ref={(button) => {
                okButn = button;
              }}
              onKeyDown={() => {
                handleOnButnClick();
              }}
            >
              OK 
              <HiOutlineCheck></HiOutlineCheck>
            </button>
            <span className="enter-text">press Enter ↵</span>
          </> */}
      </div>
    </StyleRoot>
  );
};

export default StepThreeB;
