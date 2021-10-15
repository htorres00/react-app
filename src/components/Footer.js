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
            props.stepNo >= 11 && " disabled",
          ]}
          onClick={
            props.stepNo < 11
              ? () => {
                  switch (props.stepNo) {
                    case 1:
                      props.handleClick();
                      break;
                    case 2:
                      props.handleOnButnClick();
                      break;
                    case 3:
                      props.handleOnButnClick();
                      break;
                    case 4:
                      props.handleDistance();
                      break;
                    case 7:
                      props.handleClick();
                      break;
                    case 8:
                      props.handleClick();
                      break;
                    case 9:
                      props.handleClick();
                      break;
                    case 10:
                      props.handleOnButnClick();
                      break;

                    default:
                      props.nextStep(props.stepNo + 1);
                      console.log(props.stepNo, "pg in footor");
                  }
                }
              : null
          }
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
