import { useEffect, useState } from "react";
import { fadeInUp } from "react-animations";
import Radium, { StyleRoot } from "radium";
import AttachmentSingle from "./AttachmentSingle";
import axios from "axios";
import Loader from "./Loader/Loader";
import Constants from "../Constants";
import Footer from "./Footer";

const styles = {
  fadeInUp: {
    animation: "x 1s",
    animationName: Radium.keyframes(fadeInUp, "fadeInUp"),
  },
};

const StepThreeC = (props) => {
  const [loader, setLoader] = useState(false);
  const [myUrls, setMyUrls] = useState([]);
  useEffect(() => {
    props.setValues.setCompletedProgress(75);
  }, []);

  const handleUrl = (urls) => {
    setLoader(true);
    let data = new FormData();
    const url = Constants.API_URL;
    data.append("action", "post_file");
    for (let i = 0; i < urls.length; i++) {
      data.append(`file${i}`, urls[i]);
    }
    axios
      .post(url, data)
      .then((res) => {
        setLoader(false);
        props.setValues.setLabOrder(res.data);
        console.log(res.data, "upload api");
        props.nextStep(10);
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
            <span className="step-no">c.</span>
            <p>
              <span className="level-one" style={{ display: "inline" }}>
                Please upload your
                <span style={{ fontWeight: 600 }}> lab order.</span>
              </span>
            </p>
            <p
              style={{
                marginTop: "-25px",
                fontSize: "18px",
                fontWeight: 600,
                color: "rgb(71, 69, 64) ",
              }}
            >
              Upload as many files as needed.
            </p>
          </div>

          <AttachmentSingle url={handleUrl} />
          <Footer
            stepNo={props.stepNo}
            nextStep={props.nextStep}
            prevStep={props.prevStep}
          />
        </div>
      ) : (
        <Loader />
      )}
    </StyleRoot>
  );
};

export default StepThreeC;
