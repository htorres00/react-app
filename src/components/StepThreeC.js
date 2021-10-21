import { useEffect, useState } from "react";
import { fadeInUp } from "react-animations";
import Radium, { StyleRoot } from "radium";
import AttachmentSingle from "./AttachmentSingle";
import axios from "axios";
import Loader from "./Loader/Loader";
import Constants from "../Constants";

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

  const handleUrl = (selectedfile, urls) => {
    setLoader(true);
    let data = new FormData();
    const url = Constants.API_URL;
    data.append("action", "post_file");
    for (let i = 0; i < selectedfile.length; i++) {
      data.append(`file${i}`, selectedfile[i]);
    }
    axios
      .post(url, data)
      .then((res) => {
        console.log(res.data, "upload api");

        setLoader(false);
        let arr = [];
        if (props.values.laborder.length > 0) {
          arr = [...res.data, ...props.values.laborder];
        } else {
          arr = res.data;
        }
        let filteredarr = [...new Set(arr)];
        props.setValues.setLabOrder(filteredarr);
        props.setValues.setMultFile(urls);
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
              Upload additional attachments by clicking on the drop area below.
            </p>
          </div>

          <AttachmentSingle
            url={handleUrl}
            mybackfile={props.values.multfile}
            mysetmultfile={props.setValues.setMultFile}
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
