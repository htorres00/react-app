import { useEffect, useState } from "react";
import { fadeInUp } from "react-animations";
import Radium, { StyleRoot } from "radium";
import AttachmentSingleNew from "./AttachmentSingleNew";
import axios from "axios";
import Loader from "./Loader/Loader";

const styles = {
  fadeInUp: {
    animation: "x 1s",
    animationName: Radium.keyframes(fadeInUp, "fadeInUp"),
  },
};

const StepThreeB = (props) => {
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    props.setValues.setCompletedProgress(55);
  }, []);

  const handleUrls = (myurl) => {
    setLoader(true);
    let data = new FormData();
    data.append("file", myurl);
    const url = `http://philobotoapi.hztech.biz/php/upload.php`;
    axios
      .post(url, data)
      .then((res) => {
        console.log(res.data, "Image");
        setLoader(false);
        props.setValues.setCardBack(res.data);
        props.nextStep(9);
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
            <span className="step-no">b.</span>
            <p>
              <span className="level-one" style={{ display: "inline" }}>
                Now the back of your{" "}
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

export default StepThreeB;
