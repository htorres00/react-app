import { useEffect, useState } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { HiOutlineCheck } from "react-icons/hi";
import { fadeInUp } from "react-animations";
import Radium, { StyleRoot } from "radium";
import axios from "axios";
import "react-phone-input-2/lib/style.css";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { DistanceMatrixService, GoogleMap } from "@react-google-maps/api";
import { IoMdReturnLeft } from "react-icons/io";

const styles = {
  fadeInUp: {
    animation: "x 1s",
    animationName: Radium.keyframes(fadeInUp, "fadeInUp"),
  },
};

const DistanceApi = (props) => {
  const [destinations, setDestinations] = useState([]);
  const [address, setAddress] = useState("");
  const [distance, setDistance] = useState([]);
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });
  const [technicians, setTechnicians] = useState([
    {
      technician: 1,
      addr: "5225 E. Charleston Blvd, Nevada, NV",
    },
    {
      technician: 2,
      addr: "4306 N 180th Drive, Goodyear, az",
    },
    {
      technician: 3,
      addr: "9149 Rich Tapestry Court, Las Vegas, NV",
    },
    {
      technician: 4,
      addr: "1912 Hamilton Street, Jacksonville, FL",
    },
    {
      technician: 5,
      addr: "4939 Grayhawk Court, Dublin, CA",
    },
    {
      technician: 6,
      addr: "4485 El Carnal Way, Las Vegas, NV",
    },
    {
      technician: 7,
      addr: "1632 Tiesa Lane, Oxnard, CA",
    },
  ]);

  let textInput = null;

  useEffect(() => {
    textInput.focus();
    getUserList();
    technicians.forEach((dest) => destinations.push(dest.addr));
  }, []);

  const getUserList = () => {
    const url = "https://philobotoapi.hztech.biz/php/new.php";

    const options = {
      method: "GET",
      url,
    };

    axios(options)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log("how", error);
      });
  };

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
    console.log(value, latLng, "address");
  };

  // get distance results
  const calculateDistance = (response, status) => {
    console.log(response, "calculateDistance");
    for (let i = 0; i < response.rows[0].elements.length; i++) {
      if (
        response.rows[0].elements[i].status == "NOT_FOUND" ||
        response.rows[0].elements[i].status == "ZERO_RESULTS"
      ) {
        console.log("No roads found");
        setAddress("");
        setCoordinates({
          lat: null,
          lng: null,
        });
        return;
      } else {
        //console.log(destinations[i]);
        //console.log(response.rows[0].elements[i].distance.text);
        canBeServiced(response.rows[0].elements[i].distance.value);
      }
    }

    let sortedDistance = distance.sort();
    console.log(sortedDistance, "sortedDistance");
    if (sortedDistance.length > 0) {
      if (sortedDistance[0] > 25000) {
        props.callBackFeedBack(
          "Good news, you're within our area of service. A millage fee of at least " +
            sortedDistance[0] * 0.54 +
            " will be added to the order. The final amount will be added when the appointment is confirmed."
        );
      } else {
        props.callBackFeedBack(
          "Good news. This address is within our area of service. Please notice mileage fees might be incurred when the appointment is confirmed."
        );
      }
    }
  };

  const canBeServiced = (val) => {
    let d = val / 1.609;
    distance.push(d);
    // if (d < 25000) {
    //   console.log("yes", d);
    // } else {
    //   console.log("Distance:", d);
    // }
  };

  return (
    <StyleRoot>
      <div className="step-two" style={styles.fadeInUp}>
        <div className="question">
          <span className="step-no">
            {props.indicator === true ? <span>2</span> : <> {props.stepNo}</>}
            <BsArrowRightShort></BsArrowRightShort>
          </span>
          <p>
            <span>
              Please enter the address where the service will be rendered.*
            </span>
          </p>
        </div>
        <PlacesAutocomplete
          value={address}
          onChange={setAddress}
          onSelect={handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div>
              <input {...getInputProps({ placeholder: "Type address" })} />

              <div>
                {loading ? <div> ...Loading</div> : null}

                {suggestions.map((suggestion) => {
                  const style = {
                    backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                  };
                  return (
                    <div {...getSuggestionItemProps(suggestion, { style })}>
                      {suggestion.description}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>

        {coordinates.lat ? (
          <GoogleMap>
            <DistanceMatrixService
              options={{
                origins: [address],
                destinations: destinations, // destinations
                travelMode: "DRIVING", // destination by driving
                avoidHighways: false,
                avoidTolls: false,
              }}
              callback={(response, status) => {
                calculateDistance(response, status);
              }}
            />
          </GoogleMap>
        ) : (
          <></>
        )}

        <div className="instructions">
          <span className="bold">Shift ⇧</span> +{" "}
          <span className="bold">Enter ↵</span> to make a line break
        </div>
        <>
          <button
            className="ok-butn ok-step-three"
            onClick={() => {
              props.nextStep(11);
            }}
            ref={(button) => {
              textInput = button;
            }}
          >
            OK
            <HiOutlineCheck></HiOutlineCheck>
          </button>
          <span className="enter-text">press Enter ↵</span>
        </>
      </div>
    </StyleRoot>
  );
};

export default DistanceApi;
