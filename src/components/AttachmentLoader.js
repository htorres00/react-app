import arrow from "../images/arrow.png";

const AttachmentLoader = (props) => {
  return (
    <div className={props.myClass}>
    <div className="img-div">
      <div className="img-div-inner">
        <img src={arrow} />
        <img src={arrow} />
        <img src={arrow} />
      </div>
    </div>
    </div>
  );
};

export default AttachmentLoader;
