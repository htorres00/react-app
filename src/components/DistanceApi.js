import { useEffect, useState } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { HiOutlineCheck } from "react-icons/hi";
import { fadeInUp } from "react-animations";
import Radium, { StyleRoot } from "radium";
import axios from "axios";
import "react-phone-input-2/lib/style.css";
import Loader from "./Loader/Loader";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { DistanceMatrixService, GoogleMap } from "@react-google-maps/api";

const styles = {
  fadeInUp: {
    animation: "x 1s",
    animationName: Radium.keyframes(fadeInUp, "fadeInUp"),
  },
};

const DistanceApi = (props) => {
  const [destinations, setDestinations] = useState([]);
  const [address, setAddress] = useState("");
  const [serviceaddress, setServiceAddress] = useState({});
  const [distance, setDistance] = useState([]);
  const [mindistance, setMinDistance] = useState(0);
  const [handledistance, setHandleDistance] = useState(false);
  const [servicemsg, setServiceMsg] = useState([]);
  const [loader, setLoader] = useState(false);
  const [loader2, setLoader2] = useState(false);
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });
  useEffect(() => {
    setLoader(true);
    getUserList();
  }, []);

  const getUserList = () => {
    const url = "https://philobotoapi.hztech.biz/php/new.php";

    const options = {
      method: "GET",
      url,
    };
    axios(options)
      .then((res) => {
        let userdata = res.data.user;
        let filterdata = userdata.filter(
          (item, key) =>
            item.inactive === "0" &&
            item.roles.role.customName === "Technician" &&
            (item.addressWork_Street.length > 0 ||
              item.addressWork_State.length > 0 ||
              item.addressWork_PostalCode.length > 0)
        );
        let temp = [];
        filterdata.forEach((dest) => {
          let destination = "";
          if (dest.addressWork_Street.length > 0)
            destination += dest.addressWork_Street.replace(/\n|\r/g, "") + " ";

          if (dest.addressWork_State.length > 0)
            destination += dest.addressWork_State + " ";

          if (dest.addressWork_PostalCode.length > 0)
            destination += dest.addressWork_PostalCode;

          if (temp.length < 25) {
            temp.push(destination);
          } else {
            destinations.push(temp);
            temp = [destination];
          }
        });
        if (temp.length) {
          destinations.push(temp);
          temp = [];
        }
        setLoader(false);
        //console.log(destinations, "destinations");
      })

      .catch((error) => {
        setLoader(false);
        console.log("how", error);
      });
  };

  const handleSetAddress = (address) => {
    setAddress(address);
    setHandleDistance(false);
  };

  const handleSelect = async (value) => {
    setLoader2(true);
    const results = await geocodeByAddress(value);

    let storableLocation = {};

    for (let ac = 0; ac < results[0].address_components.length; ac++) {
      let component = results[0].address_components[ac];
      if (
        component.types.includes("sublocality") ||
        component.types.includes("locality")
      ) {
        storableLocation.city = component.long_name;
      } else if (component.types.includes("administrative_area_level_1")) {
        storableLocation.state = component.long_name;
      } else if (component.types.includes("postal_code")) {
        storableLocation.zip = component.long_name;
      } else if (component.types.includes("street_number")) {
        storableLocation.street1 =
          component.long_name == undefined ? "" : component.long_name;
      } else if (component.types.includes("route")) {
        storableLocation.street1 != undefined
          ? (storableLocation.street1 += " " + component.long_name)
          : (storableLocation.street1 = component.long_name);
      } else if (component.types.includes("neighborhood")) {
        storableLocation.street2 = component.long_name;
      }
    }
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setServiceAddress(storableLocation);
    setDistance([]);
    setHandleDistance(true);
    setCoordinates(latLng);
    setLoader2(false);
  };

  // get distance results
  const calculateDistance = (response, status) => {
    //console.log(response, "calculateDistance");
    for (let i = 0; i < response.rows[0].elements.length; i++) {
      if (
        response.rows[0].elements[i].status == "NOT_FOUND" ||
        response.rows[0].elements[i].status == "ZERO_RESULTS"
      ) {
        //console.log("No roads found");
        //setAddress("");
        // setCoordinates({
        //   lat: null,
        //   lng: null,
        // });
        //return;
      } else {
        //console.log(destinations[i]);
        //console.log(response.rows[0].elements[i].distance.text);
        canBeServiced(response.rows[0].elements[i].distance.value);
      }
    }

    let sortedDistance = distance.sort();
    let uniqSortedDistance = [...new Set(sortedDistance)];
    var formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    //console.log(uniqSortedDistance, "sortedDistance");
    if (uniqSortedDistance.length > 0) {
      if (uniqSortedDistance[0] > 25000) {
        setMinDistance((uniqSortedDistance[0] / 1000).toFixed(2));
        setServiceMsg(
          <>
            Good news, you're within our area of service. A millage fee of at
            least{" "}
            {formatter
              .format(((uniqSortedDistance[0] / 1000) * 0.54).toFixed(2))
              .replace(/^(\D+)/, "$1 ")}{" "}
            will be added to the order.
            <br />
            <div style={{ fontSize: 20, color: "#777368" }}>
              The final amount will be added when the appointment is confirmed.
            </div>
          </>
        );
      } else {
        setServiceMsg(
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

  const searchOptions = {
    componentRestrictions: { country: "us" },
  };

  const getDistanceMatrix = () => {
    let temp = [];
    for (let i = 0; i < destinations.length; i++) {
      temp.push(
        <DistanceMatrixService
          key={i}
          options={{
            origins: [address],
            destinations: destinations[i], // destinations
            travelMode: "DRIVING", // destination by driving
            unitSystem: window.google.maps.UnitSystem.IMPERIAL,
            avoidHighways: false,
            avoidTolls: false,
          }}
          callback={(response, status) => {
            calculateDistance(response, status);
          }}
        />
      );
    }
    return <GoogleMap>{temp}</GoogleMap>;
  };

  return (
    <StyleRoot>
      {!loader ? (
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
            onChange={handleSetAddress}
            onSelect={handleSelect}
            searchOptions={searchOptions}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div>
                <input
                  style={{ width: "100%" }}
                  {...getInputProps({ placeholder: "Type address" })}
                />
                <div>
                  {loading ? <div> ...Loading</div> : null}

                  {suggestions.map((suggestion, index) => {
                    const style = {
                      backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                    };
                    return (
                      <div
                        key={index}
                        {...getSuggestionItemProps(suggestion, { style })}
                      >
                        {suggestion.description}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>

          {handledistance ? getDistanceMatrix() : <></>}

          <div className="instructions">
            <span className="bold">Shift ⇧</span> +{" "}
            <span className="bold">Enter ↵</span> to make a line break
          </div>
          {handledistance || !loader2 ? (
            <>
              <button
                className="ok-butn ok-step-three"
                onClick={() => {
                  console.log(serviceaddress, "serviceaddress");
                  props.callBackFeedBack(servicemsg);
                  props.setValues.setLocation(serviceaddress);
                  props.setValues.setDistance(mindistance);
                  setTimeout(function () {
                    props.nextStep(5);
                  }, 2000);
                }}
              >
                OK
                <HiOutlineCheck></HiOutlineCheck>
              </button>
              <span className="enter-text">press Enter ↵</span>
            </>
          ) : (
            <Loader />
          )}
        </div>
      ) : (
        <Loader />
      )}
    </StyleRoot>
  );
};

export default DistanceApi;
