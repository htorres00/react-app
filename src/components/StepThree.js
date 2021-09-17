import { useEffect, useState } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { HiOutlineCheck } from "react-icons/hi";
import { fadeInUp } from "react-animations";
import Radium, { StyleRoot } from "radium";
import Attachment from "./Attachment";
import AttachmentSingle from "./AttachmentSingle";
import AttachmentSingleNew from "./AttachmentSingleNew";

const styles = {
  fadeInUp: {
    animation: "x 1s",
    animationName: Radium.keyframes(fadeInUp, "fadeInUp"),
  },
};

const StepThree = (props) => {
  // let emailInput = null;
  let okButn = null;
  // const [emailValue, setEmailValue] = useState("");
  var value;

  useEffect(() => {
    // setEmailValue(props.values?.email);
    // emailInput.focus();

    props.setValues.setCompletedProgress(40);
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

  const handleOnButnClick = () => {
    console.log("next page");
    // props.nextStep();
  };
  const handleUrls = (urlss) => {
    props.setValues.setFiles(urlss);
    props.nextStep(6);
  };

  return (
    <StyleRoot>
      <div className="step-three" style={styles.fadeInUp}>
        <div className="question">
          <span className="step-no">a.</span>
          <p>
            <span className="level-one" style={{ display: "inline" }}>
              Please upload the front of your{" "}
              <span style={{ fontWeight: 600 }}>insurance card.</span>
            </span>
            {/* <span className="level-two">
              We promise not to spam you or sell your contact information.
            </span> */}
          </p>
        </div>

        <AttachmentSingleNew url={handleUrls} />

        {/* <Attachment/> */}

        {/* <AttachmentSingle/> */}

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

export default StepThree;
