import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import Radium, { StyleRoot } from "radium";
import { fadeInUp } from "react-animations";

const styles = {
  fadeInUp: {
    animation: "x 1s",
    animationName: Radium.keyframes(fadeInUp, "fadeInUp"),
  },
};

const Footer = (props) => {
  return (
    <StyleRoot>
      <div className="footer-navigation" style={styles.fadeInUp}>
        <button
          className={[
            "footer-navigation-butn down bold",
            props.stepNo >= 12 && " disabled",
          ]}
          onClick={
            props.stepNo < 12
              ? () => {
                  if (props.stepNo == 4) {
                    props.handleDistance();
                  } else {
                    props.nextStep(props.stepNo + 1);
                    console.log(props.stepNo, "pg in footor");
                  }
                }
              : null
          }
          // onClick={props.stepNo < 10 ? props.nextStep(props.stepNo) : null}
        >
          <IoIosArrowDown></IoIosArrowDown>
        </button>
        <button
          style={{
            borderRight: "1px solid rgba(50, 39, 1, 0.3)",
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          }}
          className={[
            "footer-navigation-butn up",
            props.stepNo <= 1 && " disabled",
          ]}
          onClick={
            props.stepNo > 1
              ? () => {
                  props.prevStep();
                }
              : null
          }
        >
          <IoIosArrowUp></IoIosArrowUp>
        </button>
      </div>
    </StyleRoot>
  );
};

export default Footer;
