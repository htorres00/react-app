import { useState, useEffect } from "react";
import { BsArrowRightShort, BsShift } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { BiCommand } from "react-icons/bi";
import { AiOutlineEnter } from "react-icons/ai";
import { fadeInUp } from "react-animations";
import Radium, { StyleRoot } from "radium";

const styles = {
  fadeInUp: {
    animation: "x 1s",
    animationName: Radium.keyframes(fadeInUp, "fadeInUp"),
  },
};

const StepFour = (props) => {
  let inputValueRef = null;
  const [isTyped, setIsTyped] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue(props.values?.input);
    inputValueRef?.focus();
     props.setValues.setCompletedProgress(100);
  }, []);

  const handleOnButnClick = () => {
    console.log(inputValue, "Input value");
    props.setValues.setComments(inputValue);
    props.nextStep(10);
    // console.log(props, "Final page props");
    // props.nextStep(10)
    // if (inputValue !== "") {
    //   props.setValues.setInput(inputValue);
    //   props.nextStep(10)
    //   console.log("Input found")
    // }
    // else{
    //   console.log("Input not found")
    // }
  };

  const handleKeyPress = (e) => {
    if (e.nativeEvent.keyCode === 13) {
      if (e.nativeEvent.ctrlKey) {
        handleOnButnClick();
      }
      if (e.nativeEvent.metaKey) {
        handleOnButnClick();
      }
    }
  };

  return (
    <StyleRoot>
      <div className="step-four" style={styles.fadeInUp}>
        <div className="question">
          <span className="step-no">
            {props.indicator === true ? <span>4</span> : <> <span>6</span></>}

            <BsArrowRightShort></BsArrowRightShort>
          </span>
          <p>
            Excellent. One of our representatives will be contacting you
            shortly, but any additional information or comments you can share in
            advance will help to expedite your order. <br />
            Do you have any comments or concerns you would like to add?
          </p>
        </div>
        <div>
          <textarea
            className="input-answer"
            type="text"
            name="answer"
            value={inputValue}
            placeholder="Type your answer here..."
            onChange={(e) => {
              setInputValue(e.target.value);
              setIsTyped(true);
            }}
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
            ref={(inputVal) => {
              inputValueRef = inputVal;
            }}
            onKeyDown={(e) => handleKeyPress(e)}
          />
          <div className="instructions">
            <span className="bold">Shift ⇧</span> +{" "}
            <span className="bold">Enter ↵</span> to make a line break
          </div>

          {inputValue && inputValue.length > 0 && (
            <div className="butnWrap">
              <button
                type="submit"
                className="submit-form"
                tabIndex="0"
                onClick={() => {
                  handleOnButnClick();
                }}
              >
                Submit
              </button>
              {window.navigator.platform.toLowerCase().includes("win") && (
                <>
                  <span>press </span>
                  <span className="bold">
                    Ctrl <AiOutlinePlus></AiOutlinePlus>
                  </span>
                  <span className="bold">
                    &nbsp;Enter <AiOutlineEnter></AiOutlineEnter>
                  </span>
                </>
              )}
              {window.navigator.platform.toLowerCase().includes("mac") && (
                <>
                  <span>press </span>
                  <span className="bold">
                    Cmd <BiCommand></BiCommand>
                  </span>
                  <span className="bold">
                    &nbsp;Enter <AiOutlineEnter></AiOutlineEnter>
                  </span>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </StyleRoot>
  );
};

export default StepFour;
