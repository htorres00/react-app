import { useState, useEffect } from "react";
import { BsArrowRightShort, BsShift } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { BiCommand } from "react-icons/bi";
import { AiOutlineEnter } from "react-icons/ai";
import { fadeInUp } from "react-animations";
import Radium, { StyleRoot } from "radium";
import axios from "axios";
import Loader from "./Loader/Loader";

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
  const [loader, setLoader] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    console.log(props, "my props");
    setInputValue(props.values?.input);
    inputValueRef?.focus();
    props.setValues.setCompletedProgress(100);
  }, []);

  const handleOnButnClick = () => {
    setLoader(true);
    postUserList();
  };

  function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const postUserList = () => {
    const queryParams = new URLSearchParams(window.location.search);

    const url = "https://philobotoapi.hztech.biz/php/api.php";
    var data = new FormData();
    data.append("formSubmission", makeid(5));
    data.append("submissionDate", new Date());
    data.append("firstName", queryParams.get("first_name"));
    data.append("lastName", queryParams.get("last_name"));
    data.append("email", queryParams.get("email"));
    data.append("altEmail", props.values.email);
    data.append("phone", queryParams.get("mobile_number"));
    data.append("altPhone", props.values.phone);
    data.append("customertype", queryParams.get("customer_type"));
    data.append("insuranceFront", props.values.files);
    data.append("insuranceBack", props.values.cardback);
    data.append("labOrders", props.values.laborder);
    data.append("ApptOpion1", props.values.optionone);
    data.append("ApptOpion2", props.values.optiontwo);
    data.append("ApptOpion3", props.values.optionthree);
    data.append("notes", inputValue);
    data.append("serviceAddress", props.values.location);
    data.append("serviceDistance", props.values.distance);
    data.append("serviceMillage", (props.values.distance * 0.54).toFixed(2));
    console.log(
      makeid(5),
      inputValue,
      props,
      queryParams.get("first_name"),
      queryParams.get("last_name"),
      queryParams.get("email"),
      queryParams.get("mobile_number"),
      queryParams.get("customer_type")
    );
    var config = {
      method: "post",
      url: url,
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data, "response");
        setLoader(false);
        setId(response.data.id);
        props.setValues.setId(response.data.id);
        props.nextStep(12);
      })
      .catch(function (error) {
        console.log(error);
        setLoader(false);
      });
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
            {props.indicator === true ? (
              <span>5</span>
            ) : (
              <>
                {" "}
                <span>8</span>
              </>
            )}

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
                {loader ? <Loader /> : "Submit"}
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
