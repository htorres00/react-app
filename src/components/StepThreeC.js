import { useEffect, useState } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { HiOutlineCheck } from "react-icons/hi";
import { fadeInUp } from "react-animations";
import Radium, { StyleRoot } from "radium";
import Attachment from "./Attachment";
import AttachmentSingleNew from "./AttachmentSingleNew";
import AttachmentSingle from "./AttachmentSingle";

const styles = {
  fadeInUp: {
    animation: "x 1s",
    animationName: Radium.keyframes(fadeInUp, "fadeInUp"),
  },
};

const StepThreeC = (props) => {
  // let emailInput = null;
  let okButn = null;
  // const [emailValue, setEmailValue] = useState("");
  var value;

  useEffect(() => {
    // console.log(props, "props");
    // setEmailValue(props.values?.email);
    // emailInput.focus();
    props.setValues.setCompletedProgress(75);
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

  const handleUrl = (urls) => {
    // console.log(props, "Lab order page");
    // console.log(urls, "step 5");
    props.setValues.setLabOrder(urls);
    props.nextStep(10);
  };

  return (
    <StyleRoot>
      <div className="step-three" style={styles.fadeInUp}>
        <div className="question">
          <span className="step-no">c.</span>
          <p>
            <span className="level-one" style={{ display: "inline" }}>
              Please upload your
              <span style={{ fontWeight: 600 }}> lab order.</span>
            </span>
            {/* <span className="level-two">
              We promise not to spam you or sell your contact information.
            </span> */}
          </p>
        </div>

        {/* <Attachment/> */}
        {/* <AttachmentSingleNew/> */}

        <AttachmentSingle url={handleUrl} />
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

export default StepThreeC;
