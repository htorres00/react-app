import { useEffect, useState } from "react";
import { fadeInUp } from "react-animations";
import Radium, { StyleRoot } from "radium";
import AttachmentSingle from "./AttachmentSingle";
import axios from "axios";
import Loader from "./Loader/Loader";

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
    for (let i = 0; i < urls.length; i++) {
      data.append("file", urls[i]);
      const url = `http://philobotoapi.hztech.biz/php/upload.php`;
      axios
        .post(url, data)
        .then((res) => {
          myUrls.push(res.data);
          if (i == urls.length - 1) {
            setLoader(false);
            props.setValues.setLabOrder(myUrls);
            console.log(myUrls, "myUrls pushed");
            props.nextStep(10);
          }
        })
        .catch((error) => {
          setLoader(false);
          console.log(error, "upload api");
        });
    }
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
          </div>

          <AttachmentSingle url={handleUrl} />
        </div>
      ) : (
        <Loader />
      )}
    </StyleRoot>
  );
};

export default StepThreeC;
