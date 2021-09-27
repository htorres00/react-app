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

const NoPageStep1 = (props) => {
  useEffect(() => {
    console.log(props, "step two props");
  }, []);
  let textInput = null;

  //   useEffect(() => {
  //     textInput.focus();
  //   }, []);

  let okButn = null;
  const [phone, setPhone] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");

  useEffect(() => {
    setPhone(props.values?.phone);
    props.setValues.setCompletedProgress(15);
  }, []);

  const handlePhone = (phone) => {
    setPhone(phone);
  };

  const handleOnButnClick = () => {
    console.log(phone, "phone number");
    props.setValues.setPhone(phone);
    props.setValues.setFirstName(firstname);
    props.setValues.setLastName(lastname);
    props.nextStep(3);
  };

  return (
    <StyleRoot>
      <div className="step-two" style={styles.fadeInUp}>
        <div className="question">
          <span className="step-no">
            {props.stepNo}
            <BsArrowRightShort></BsArrowRightShort>
          </span>
          <p>
            <span className="level-one">
              Enter your first name, last name and the best number to call you?
            </span>
            <span className="level-two">
              Please enter a direct line. If your number has an extension, you
              can add it at the end of the notes.
            </span>
          </p>
        </div>
        <div>
          <input
            type="text"
            name="text"
            value={firstname}
            placeholder="first name"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            style={{ marginBottom: "25px" }}
          />
        </div>

        <div>
          <input
            type="text"
            name="text"
            value={lastname}
            placeholder="last name"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            style={{ marginBottom: "25px" }}
          />
        </div>
        <div>
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
        </div>

        {phone && phone.length > 0 && (
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
        )}
      </div>
    </StyleRoot>

    // <div>
    //     <h1>No page 1</h1>
    //     <button
    //     onClick={() => {props.nextStep(3);}}
    //     >ok</button>
    // </div>
  );
};

export default NoPageStep1;
