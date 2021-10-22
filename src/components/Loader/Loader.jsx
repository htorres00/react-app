import "./Loader.css";

const Loader = ({msg}) => {
    return (
        <div
            className="style-loader"
        >
            <div className="loader"></div>
            {msg &&
            <h3>{msg}</h3>
            }
        </div>
    );
};

export default Loader;
