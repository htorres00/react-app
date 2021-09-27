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
    var data = [
      {
        formSubmission: 2392039293,
        submissionDate: new Date(),
        firstName: props.values.firstname,
        lastName: props.values.lastname,
        email: props.values.email,
        altEmail: props.values.email,
        phone: props.values.phone,
        altPhone: props.values.phone,
        insuranceFront: props.values.files,
        insuranceBack: props.values.cardback,
        labOrders: props.values.laborder,
        ApptOpion1: props.values.optionone,
        ApptOpion2: props.values.optiontwo,
        ApptOpion3: props.values.optionthree,
        notes: props.values.comments,
        serviceAddress: props.values.location,
        serviceDistance: props.values.distance,
        serviceMillage: (props.values.distance * 0.54).toFixed(2),
      },
    ];
    console.log(data, "params");
    const options = {
      method: "post",
      url,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };
    // && item.addressWork_Street
    axios(options)
      .then(function (response) {
        console.log(JSON.stringify(response.data, "response"));
        setLoader(false);
        setId(response.data.id);
        props.setValues.setId(response.data.id);
        props.nextStep(12);
      })
      .catch(function (error) {
        setLoader(false);

        console.log(error);
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
