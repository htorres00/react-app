import "./Loader.css";
const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "600px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
