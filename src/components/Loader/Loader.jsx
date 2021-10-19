import "./Loader.css";

const Loader = ({msg}) => {
    return (
        <div
            style={{
                display: "flex",
                width: "600px",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: 'column',
            }}
        >
            <div className="loader"></div>
            {msg &&
            <h3>{msg}</h3>
            }
        </div>
    );
};

export default Loader;
