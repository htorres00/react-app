import { fadeInUp } from "react-animations";
import Radium, { StyleRoot } from "radium";
import { HiOutlineCheck } from "react-icons/hi";

const styles = {
  fadeInUp: {
    animation: "x 1s",
    animationName: Radium.keyframes(fadeInUp, "fadeInUp"),
  },
};
const EmailThank = (props) => {
  const handleNavigate = () => {
    window.location.href = "https://qa.phlebotomynetwork.com/";
  };
  return (
    <StyleRoot>
      <div className="thank-you" style={styles.fadeInUp}>
        <h1 className="title" style={{ margin: 0 }}>
          Perfect. We will notify you
        </h1>
        <h1 className="title" style={{ margin: 0 }}>
          Thank You!
        </h1>
        <p className="levelTwo">
          Feel free to contact us if you have questions.
          <span className="website bold">phlebotomynetwork.com</span>
          <span className="phone bold">(415) 687-4854</span>
        </p>
        <button
          style={{ float: "none" }}
          className="ok-butn ok-step-three"
          onClick={handleNavigate}
        >
          OK
          <HiOutlineCheck></HiOutlineCheck>
        </button>
      </div>
    </StyleRoot>
  );
};

export default EmailThank;
