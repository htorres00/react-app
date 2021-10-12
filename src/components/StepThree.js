import { useEffect, useState } from "react";
import { fadeInUp } from "react-animations";
import Radium, { StyleRoot } from "radium";
import AttachmentSingleNew from "./AttachmentSingleNew";
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

const StepThree = (props) => {
  const [loader, setLoader] = useState(false);
  let okButn = null;
  var value;

  useEffect(() => {
    props.setValues.setCompletedProgress(40);
  }, []);

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

export default StepThree;
