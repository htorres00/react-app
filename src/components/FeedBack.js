import { useEffect, useState } from "react";
import { HiOutlineCheck } from "react-icons/hi";
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

const FeedBack = (props) => {
  let textInput = null;
  const [id, setId] = useState(0);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    console.log(props, "my props");
    textInput.focus();
  }, []);

  const postUserList = () => {
    const url = "https://philobotoapi.hztech.biz/php/api.php";
    var data = new FormData();
    data.append("formSubmission", 2392039293);
    data.append("submissionDate", new Date());
    data.append("firstName", props.values.firstname);
    data.append("lastName", props.values.lastname);
    data.append("email", props.values.email);
    data.append("altEmail", props.values.email);
    data.append("phone", props.values.phone);
    data.append("altPhone", props.values.phone);
    data.append("insuranceFront", props.values.files);
    data.append("insuranceBack", props.values.cardback);
    data.append("labOrders", props.values.laborder);
    data.append("ApptOpion1", props.values.optionone);
    data.append("ApptOpion2", props.values.optiontwo);
    data.append("ApptOpion3", props.values.optionthree);
    data.append("notes", props.values.comments);
    data.append("serviceAddress", props.values.location);
    data.append("serviceDistance", props.values.distance);
    data.append("serviceMillage", (props.values.distance * 0.54).toFixed(2));
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

  return (
    <StyleRoot>
      <div className="step-two" style={styles.fadeInUp}>
        <div className="question">
          <p>
            <span className="level-one">{props.tecnicianresponce}</span>
            {/* <span className="level-one">
              Good news, you're within our area of service.
            </span>
            <span className="level-one">
              A mileage fee of at least $7.30 will be added to the order.
            </span>

            <span className="level-two">
              The final amount will be included when the appoitment is
              confirmed.
            </span> */}
          </p>
        </div>

        <div className="instructions">
          <span className="bold">Shift ⇧</span> +{" "}
          <span className="bold">Enter ↵</span> to make a line break
        </div>
        <>
          <button
            className="ok-butn ok-step-three"
            onClick={() => {
              setLoader(true);
              postUserList();
            }}
            ref={(button) => {
              textInput = button;
            }}
          >
            {loader ? <Loader /> : "Submit"}
          </button>
          <span className="enter-text">press Enter ↵</span>
        </>
      </div>
    </StyleRoot>
  );
};

export default FeedBack;
