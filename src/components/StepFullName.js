import { useEffect, useState } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { HiOutlineCheck } from "react-icons/hi";
import { fadeInUp, flash } from "react-animations";
import Radium, { StyleRoot } from "radium";
import Footer from "./Footer";

const styles = {
  fadeInUp: {
    animation: "x 1s",
    minWidth: '291px',
    animationName: Radium.keyframes(fadeInUp, "fadeInUp"),
  },
  flash: {
    animation: "x 1s",
    animationName: Radium.keyframes(flash, "flash"),
  },
};


const StepOne = (props) => {
  if(props.values.firstName == null || props.values.lastName == null) {
    props.values.firstName = ""
    props.values.lastName = ""
  }
  const [hasError, setHasError] = useState("");
  const [lastName, setLastName] = useState(props.values.firstName);
  const [firstName, setFirstName] = useState(props.values.lastName);
  
  useEffect(() => {
    props.setValues.setCompletedProgress(10);
  }, []);


  const handleClick = () => {
    if (!firstName || !lastName) {
      setHasError(true) 
    } else {
      props.setValues.setFirstName(firstName);
      props.setValues.setLastName(lastName);
      props.nextStep(2);
    }
  };

  return (
    <StyleRoot>
      <div
        className="step-three step-three-question"
        style={styles.fadeInUp}
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            handleClick();
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
              What's your name?*
            </span>
          </p>
        </div>

        <div>
          <input
            name="firstName"
            value={firstName}
            style={{ width: "100%" }}
            placeholder="First Name"
            onChange={(e) => {
              if (!e.target.value) {
                setHasError(true);
              }
              setFirstName(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                handleClick();
              }
            }}
          />
          
        </div>

        <div>
          <input
            name="lastName"
            value={lastName}
            style={{ width: "100%", marginTop:"15px" }}
            placeholder="Last Name"
            onChange={(e) => {
              if (!e.target.value) {
                setHasError(true);
              }
              setLastName(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                handleClick();
              }
            }}
          />

        </div>

        {hasError ? (
          <div style={{ color: "red", fontWeight: "bold", marginTop: "10px" }}>
            First Name and Last name are required
          </div>
        ) : (
          <></>
        )}

        <>
          <button
            className="ok-butn ok-step-three"
            tabIndex="0"
            onClick={() => {
              handleClick();
            }}
            onKeyDown={() => {
              handleClick();
            }}
          >
            OK
            <HiOutlineCheck></HiOutlineCheck>
          </button>
          <span className="enter-text">press Enter ↵</span>
        </>

        <Footer
          handleClick={handleClick}
          stepNo={props.stepNo}
          nextStep={props.nextStep}
          prevStep={props.prevStep}
        />
      </div>
    </StyleRoot>
  );
};

export default StepOne;
