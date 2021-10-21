import { useEffect, useState } from "react";
import { BsArrowRightShort, BsBootstrapReboot } from "react-icons/bs";
import { HiOutlineCheck } from "react-icons/hi";
import { fadeInUp } from "react-animations";
import Radium, { StyleRoot } from "radium";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/bootstrap.css'
import Footer from "./Footer";

const styles = {
  fadeInUp: {
    animation: "x 1s",
    animationName: Radium.keyframes(fadeInUp, "fadeInUp"),
  },
};

const NoPageStep1 = (props) => {
  useEffect(() => { }, []);
  const [phone, setPhone] = useState("");
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setPhone(props.values?.phone || props.values?.mobileNumber);
    props.setValues.setCompletedProgress(15);
  }, []);

  const handlePhone = (phone) => {
    setPhone(phone);
  };

  const handleOnButnClick = () => {
    if (!props.values.hasInformation) {
      if (!phone) {
        return setHasError(true)
      }
      props.setValues.setMobileNumber(phone)
    }
    else {
      props.setValues.setPhone(phone);
    }
    props.nextStep(3);
  };

  return (
    <StyleRoot>
      <div
        className="step-two"
        style={styles.fadeInUp}
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            handleOnButnClick();
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
              What is the best number to call you?
            </span>
            <span className="level-two">
              Please enter a direct line. If your number has an extension, you
              can add it at the end of the notes.
            </span>
          </p>
        </div>
        <div>
          <PhoneInput
            enableSearch
            country={'us'}
            onlyCountries={['us']}
            disableDropdown={true}
            placeholder="(201) 555-0123"
            disableCountryCode={true}
            value={phone}
            onChange={(phone) => handlePhone(phone)}
            tabIndex="0"
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
        </div>

        {hasError ? (
          <div style={{ color: "red", fontWeight: "bold", marginTop: "10px" }}>
            Phone number is required
          </div>
        ) : (
          <></>
        )}
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
        <Footer
          handleOnButnClick={handleOnButnClick}
          stepNo={props.stepNo}
          nextStep={props.nextStep}
          prevStep={props.prevStep}
        />
      </div>
    </StyleRoot>
  );
};

export default NoPageStep1;
