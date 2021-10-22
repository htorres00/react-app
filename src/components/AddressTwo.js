import { useEffect, useState } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { HiOutlineCheck } from "react-icons/hi";
import { fadeInUp } from "react-animations";
import Radium, { StyleRoot } from "radium";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const styles = {
  fadeInUp: {
    animation: "x 1s",
    animationName: Radium.keyframes(fadeInUp, "fadeInUp"),
  },
};

const AddressTwo = (props) => {
  const [addresstwo, setAddressTwo] = useState("");
  const [showerrmsg, setShowErrMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  let inputfocus = null;

  useEffect(() => {
    setAddressTwo(props.values?.addresstwo);
    // props.setValues.setCompletedProgress(22);
    inputfocus?.focus();
  }, []);

  const handleOnButnClick = () => {
    props.setValues.setAddressTwo(addresstwo);
    props.nextStep(6);
  };

  return (
    <StyleRoot>
      <div
        className="step-three"
        style={styles.fadeInUp}
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            handleOnButnClick();
          }
        }}
      >
        <div className="question">
          <span className="step-no">
            {props.indicator === true ? <span>3</span> : <> {props.stepNo}</>}
            <BsArrowRightShort></BsArrowRightShort>
          </span>
          <p>
            <span className="level-one">
              If the address includes an apartment, suite, etc, please enter it below?
            </span>
          </p>
        </div>

        <div>
          <input
            type="addresstwo"
            name="addresstwo"
            value={addresstwo}
            style={{ width: "100%" }}
            placeholder="Apartment, Suite, etc"
            onChange={(e) => {
              setAddressTwo(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                handleOnButnClick();
              }
            }}
            ref={(addresstwo) => {
              inputfocus = addresstwo;
            }}
          />
        </div>

        {showerrmsg ? (
          <div style={{ color: "red", fontWeight: "bold", marginTop: "10px" }}>
            {errorMsg}
          </div>
        ) : (
          <></>
        )}

        <>
          <button
            className="ok-butn ok-step-three"
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

        <br />

        <div className="footer-navigation">
          <button
            className={["footer-navigation-butn down bold"]}
            onClick={() => {
              handleOnButnClick();
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
              props.nextStep(15);
            }}
          >
            <IoIosArrowUp></IoIosArrowUp>
          </button>
        </div>
      </div>
    </StyleRoot>
  );
};
export default AddressTwo;
