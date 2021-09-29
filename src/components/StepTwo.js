import { useEffect, useState } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { HiOutlineCheck } from "react-icons/hi";
import { fadeInUp } from "react-animations";
import Radium, { StyleRoot } from "radium";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const styles = {
  fadeInUp: {
    animation: "x 1s",
    animationName: Radium.keyframes(fadeInUp, "fadeInUp"),
  },
};

const StepTwo = (props) => {
  useEffect(() => {
    console.log(props, "step two props");
    console.log(props.indicator, "indicator value on page two");
  }, []);
  let textInput = null;

  useEffect(() => {
    textInput.focus();
  }, []);

  let okButn = null;
  const [phone, setPhone] = useState("");

  useEffect(() => {
    setPhone(props.values?.phone);
    props.setValues.setCompletedProgress(26);
  }, []);

  const handlePhone = (phone) => {
    setPhone(phone);
  };

  const handleOnButnClick = () => {
    props.setValues.setPhone(phone);
    props.nextStep(5);
  };

  return (
    // <StyleRoot>
    //   <div className="step-two" style={styles.fadeInUp}>
    //     <div className="question">
    //       <span className="step-no">
    //         {props.stepNo}
    //         <BsArrowRightShort></BsArrowRightShort>
    //       </span>
    //       <p>
    //         <span className="level-one">
    //           What is the best number to call you?
    //         </span>
    //         <span className="level-two">
    //           Please enter a direct line. If your number has an extension, you
    //           can add it at the end of the notes.
    //         </span>
    //       </p>
    //     </div>
    //     <div>
    //       <PhoneInput
    //         enableSearch
    //         country={"us"}
    //         placeholder="(201) 555-0123"
    //         value={phone}
    //         onChange={(phone) => handlePhone(phone)}
    //         onKeyDown={(e) => {
    //           if (e.keyCode === 13) {
    //             handleOnButnClick();
    //           }
    //         }}
    //         inputProps={{
    //           name: "phone",
    //           required: true,
    //           autoFocus: true,
    //         }}
    //       />
    //     </div>

    //     {phone && phone.length > 0 && (
    //       <>
    //         <button
    //           className="ok-butn ok-step-two"
    //           tabIndex="0"
    //           onClick={() => {
    //             handleOnButnClick();
    //           }}
    //           onKeyDown={() => {
    //             handleOnButnClick();
    //           }}
    //         >
    //           OK
    //           <HiOutlineCheck></HiOutlineCheck>
    //         </button>
    //         <span className="enter-text">press Enter ↵</span>
    //       </>
    //     )}
    //   </div>
    // </StyleRoot>

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
            ref={(button) => {
              textInput = button;
            }}
          >
            Continue
          </button>
          <span className="press">press Enter ↵</span>
        </div>

        {/* <div>
    <PhoneInput
      enableSearch
      country={"us"}
      placeholder="(201) 555-0123"
      value={phone}
      onChange={(phone) => handlePhone(phone)}
      onKeyDown={(e) => {
        if (e.keyCode === 13) {
          handleOnButnClick();
        }
      }}
      inputProps={{
        name: "phone",
        required: true,
        autoFocus: true,
      }}
    />
  </div> */}

        {/* {phone && phone.length > 0 && (
    <>
      <button
        className="ok-butn ok-step-two"
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
  )} */}
      </div>
    </StyleRoot>
  );
};

export default StepTwo;
