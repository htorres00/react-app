import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const Footer = (props) => {
  return (
    <div className="footer-navigation">
      <button
        className={[
          "footer-navigation-butn down bold",
          props.stepNo >= 10 && " disabled",
        ]}
        onClick={
          props.stepNo < 10
            ? () => {
                props.nextStep(props.stepNo + 1);
                console.log(props.stepNo, "pg in footor");
              }
            : null
        }
        // onClick={props.stepNo < 10 ? props.nextStep(props.stepNo) : null}
      >
        <IoIosArrowDown></IoIosArrowDown>
      </button>
      <button
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
  );
};

export default Footer;
