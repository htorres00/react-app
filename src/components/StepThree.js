import { useEffect, useState } from "react";
import { fadeInUp } from "react-animations";
import Radium, { StyleRoot } from "radium";
import AttachmentSingleNew from "./AttachmentSingleNew";
import axios from "axios";
import Loader from "./Loader/Loader";
import Constants from "../Constants";

const styles = {
  fadeInUp: {
    animation: "x 1s",
    animationName: Radium.keyframes(fadeInUp, "fadeInUp"),
  },
};

const StepThree = (props) => {
  const [loader, setLoader] = useState(false);
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

  const handleUrls = (myurl) => {
    setLoader(true);
    let data = new FormData();
    data.append("file", myurl);
    data.append("action", "post_file");
    const url = Constants.API_URL; //`http://philobotoapi.hztech.biz/php/upload.php`;
    axios
      .post(url, data)
      .then((res) => {
        console.log(res.data, "Image");
        setLoader(false);
        props.setValues.setFiles(res.data);
        props.nextStep(8);
      })
      .catch((error) => {
        setLoader(false);
        console.log(error, "upload api");
      });
  };

  return (
    <StyleRoot>
      {!loader ? (
        <div className="step-three" style={styles.fadeInUp}>
          <div className="question">
            <span className="step-no">a.</span>
            <p>
              <span className="level-one" style={{ display: "inline" }}>
                Please upload the front of your{" "}
                <span style={{ fontWeight: 600 }}>insurance card.</span>
              </span>
            </p>
          </div>

          <AttachmentSingleNew url={handleUrls} />
        </div>
      ) : (
        <Loader />
      )}
    </StyleRoot>
  );
};

export default StepThree;
