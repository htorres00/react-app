import { fadeInUp } from "react-animations";
import Radium, { StyleRoot } from "radium";
import { useState, useEffect } from "react";
import Check from '../images/check.png'

const styles = {
  fadeInUp: {
    width: '93%',
    margin: 'auto',
    textAlign: 'center',
    animation: "x 1s",
    animationName: Radium.keyframes(fadeInUp, "fadeInUp"),
  },
  btnGroup: {
    display: 'flex', justifyContent: 'space-evenly', alignItems: 'center'
  },
  homePageLink: {
    textDecoration: 'none',
    color: 'black',
  },
  mr: {
    marginRight: '8px'
  },
  padding: {
    padding: '11px 15px 11px 15px',
    fontSize: '15px',
    cursor: 'pointer',
  },
};

const ThankYou = (props) => {
  useEffect(() => {
    localStorage.removeItem("bfusers");
  }, []);

  const closeTab = () => {
    window.open('','_self').close()
}

  return (
    <StyleRoot>
      <div  className="thank-you" style={styles.fadeInUp}>
        <div>
          <h1 className="title">That's it! You've been great.</h1>
          {props.values.id &&
            <h2 className="title">Your Service Request # is: {props.values.id}</h2>
          }
          {!props.values.id && props.values.submissionId &&
            <h2 className="title">Submission ID: {props.values.submissionId}</h2>
          }
          <h3 className="levelOOne">
            One of our representatives will contact you shortly. Thank you!
          </h3>
          <p className="levelTwo">
            Feel free to contact us if you have questions.
            <span className="website bold">phlebotomynetwork.com</span>
            <span className="phone bold">(415) 687-4854</span>
          </p>
        </div>
        <div style={{marginTop: '2.1rem'}}>
        <div style={styles.btnGroup}>
          <div className="butnWraper">
            <button
              style={{...styles.btnGroup, ...styles.padding}}
              
              className="start-form"
            >
              <a style={{...styles.homePageLink, ...styles.mr}} href="https://qa.phlebotomynetwork.com/">Return to Home</a>
              <img width="13" height="13" src={Check} />
            </button>
          </div>
          <div className="butnWraper">
            <button
              style={styles.padding}
              className="start-form"
              onClick={closeTab}
            >
              Close Page
            </button>
          </div>
        </div>
        </div>
      </div>
    </StyleRoot>
  );
};

export default ThankYou;
