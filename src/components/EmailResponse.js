import { useEffect, useState } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { HiOutlineCheck } from "react-icons/hi";
import { fadeInUp } from "react-animations";
import Radium, { StyleRoot } from "radium";
import "react-phone-input-2/lib/style.css";
import Footer from "./Footer";
import axios from "axios";

import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const styles = {
  fadeInUp: {
    animation: "x 1s",
    animationName: Radium.keyframes(fadeInUp, "fadeInUp"),
  },
};


const EmailResponse = (props) => {
  const [loader, setLoader] = useState(false);

  useEffect(() => { }, []);
  let serreqfocus = null;

  const postUserList = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const url = "https://hooks.zapier.com/hooks/catch/2616746/bhh3x7a/"

    var data = {
      firstName: props.values.firstName,
      lastName: props.values.lastName,
      customerType: queryParams.get("customer_type"),
      phone: props.values.mobileNumber,
      email: props.values.mandotaryEmail,
      address: props.values.unattendedAddress,
    }
    var config = {
      method: "post",
      url: url,
      data: JSON.stringify([data]),
    };

    axios(config)
      .then(function () {
        setLoader(false);
        props.nextStep(14);
      })
      .catch(function (error) {
        console.log(error);
        setLoader(false);
      });
  };

  useEffect(() => {
    //   props.setValues.setCompletedProgress(26);
    serreqfocus?.focus();
    return () => {
      serreqfocus?.focus();
    }
  },  []);

  function handleOnButnClick() {
    postUserList()
    props.nextStep(14);
  }

  return (
    <StyleRoot>
      <div className="step-two" style={styles.fadeInUp}>
        <div className="question">
          <span className="step-no">
            {props.indicator === true ? <span>2</span> : <>4</>}
            <BsArrowRightShort></BsArrowRightShort>
          </span>
          <p>
            <span className="level-one">
              Oh, we're very sorry but at the moment we are not servicing the
              address you provided. We're continously expanding our services and
              would love to inform you when our technicians are able to visit
              this area.
            </span>
          </p>
        </div>

        <div className="buttons">
          <div
            className="butnWraper"
            style={{ width: "35%", marginRight: "20px" }}
          >
            <button
              style={{ width: "100%" }}
              className="start-form"
              onClick={() => {
                props.nextStep(4);
              }}
            >
              Let me try another address
            </button>
          </div>

          <div className="butnWraper" style={{ width: "60%" }}>
            <button
              style={{ width: "100%" }}
              className="start-form"
              onClick={() => {
                handleOnButnClick()
              }}
            >
              Please email me when you can service my area
            </button>
          </div>
        </div>
        <br />

        <div className="footer-navigation">
          <button
            className={["footer-navigation-butn down bold", " disabled"]}
            onClick={() => {
              //props.nextStep(14);
            }}
          >
            <IoIosArrowDown></IoIosArrowDown>
          </button>
          <button
            style={{
              borderRight: "1px solid rgba(50, 39, 1, 0.3)",
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            }}
            className={["footer-navigation-butn up"]}
            onClick={() => {
              props.nextStep(4);
            }}
          >
            <IoIosArrowUp></IoIosArrowUp>
          </button>
        </div>
      </div>
    </StyleRoot>
  );
};

export default EmailResponse;
