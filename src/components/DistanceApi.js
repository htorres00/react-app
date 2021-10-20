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
import Constants from "../Constants";
import Footer from "./Footer";

const styles = {
  fadeInUp: {
    animation: "x 1s",
    animationName: Radium.keyframes(fadeInUp, "fadeInUp"),
  },
};

const DistanceApi = (props) => {
  const [destinations, setDestinations] = useState([]);
  const [distanceCallbacks, setDistanceCallbacks] = useState([]);
  const [distanceRequested, setDistanceRequested] = useState([]);
  const [address, setAddress] = useState("");
  const [serviceaddress, setServiceAddress] = useState({});
  const [distance, setDistance] = useState({});
  const [mindistance, setMinDistance] = useState(0);
  const [handledistance, setHandleDistance] = useState(false);
  const [servicemsg, setServiceMsg] = useState([]);
  const [loader, setLoader] = useState(false);
  const [loader2, setLoader2] = useState(false);
  const [proceed, setProceed] = useState(false);
  const [showerrmsg, setShowErrMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });

  useEffect(() => {
    setLoader(true);
    if (props.values?.address != "") {
      setAddress(props.values?.address);
      setServiceMsg(props.values?.servicemsg);
      setServiceAddress(props.values?.location);
      setMinDistance(props.values?.distance);
      setHandleDistance(true);
      setProceed(true);
    }
    console.log(JSON.parse(localStorage.getItem("bfusers")), "bfuserslength");
    if (!localStorage.getItem("bfusers")) {
      getUserList();
    } else {
      getPrefilledUserList(JSON.parse(localStorage.getItem("bfusers")));
    }
  }, []);

  const _setProceed = (bool) => {
    setProceed(bool);
    props.canProceed(bool);
  };

  const getUserList = () => {
    const url = Constants.API_URL + "?action=get_bf_users"; //"https://philobotoapi.hztech.biz/php/new.php";

    const options = {
      method: "GET",
      url,
    };
    axios(options)
      .then((res) => {
        let userdata = res.data.user;
        localStorage.setItem("bfusers", JSON.stringify(res.data.user));

        let filterdata = userdata.filter(
          (item, key) =>
            item.inactive === "0" &&
            item.roles.role.customName === "Technician" &&
            (item.addressWork_Street.length > 0 ||
              item.addressWork_State.length > 0 ||
              item.addressWork_PostalCode.length > 0)
        );
        filterdata.forEach((dest) => {
          let destination = "";

          if (dest.addressWork_Street.length > 0)
            destination += dest.addressWork_Street.replace(/\n|\r/g, "") + " ";

          if (dest.addressWork_State.length > 0)
            destination += dest.addressWork_State + " ";

          if (dest.addressWork_PostalCode.length > 0)
            destination += dest.addressWork_PostalCode;

          destinations.push(destination);
        });
        setLoader(false);
      })

      .catch((error) => {
        setLoader(false);
        console.log("how", error);
      });
  };

  const getPrefilledUserList = (bfusers) => {
    let filterdata = bfusers.filter(
      (item, key) =>
        item.inactive === "0" &&
        item.roles.role.customName === "Technician" &&
        (item.addressWork_Street.length > 0 ||
          item.addressWork_State.length > 0 ||
          item.addressWork_PostalCode.length > 0)
    );
    filterdata.forEach((dest) => {
      let destination = "";

      if (dest.addressWork_Street.length > 0)
        destination += dest.addressWork_Street.replace(/\n|\r/g, "") + " ";

      if (dest.addressWork_State.length > 0)
        destination += dest.addressWork_State + " ";

      if (dest.addressWork_PostalCode.length > 0)
        destination += dest.addressWork_PostalCode;

      destinations.push(destination);
    });
    setLoader(false);
  };

  const handleSetAddress = (address) => {
    setAddress(address);
    setShowErrMsg(false);
    setHandleDistance(false);
  };

  const handleSelect = async (value) => {
    setLoader2(true);
    setShowErrMsg(false);

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
    setDistance({});
    setHandleDistance(true);
    getDistanceMatrixCalc(value);
    setCoordinates(latLng);
  };

  // get distance results
  const calculateDistance = (response, status) => {
    for (let i = 0; i < response.rows[0].elements.length; i++) {
      if (
        response.rows[0].elements[i].status == "NOT_FOUND" ||
        response.rows[0].elements[i].status == "ZERO_RESULTS"
      ) {
        // nothing
      } else {
        canBeServiced(
          response.rows[0].elements[i].distance.text,
          response.destinationAddresses[i]
        );
      }
    }

    let sortedDistance = objSort(distance);

    if (distanceCallbacks.length === distanceRequested.length) {
      sortedDistance.forEach((a) => {
        console.log("Technician Addr: " + a[0] + ", ");
        console.log("Distance: " + a[1] + " mi");
        console.log("---------");
      });
    }
    let firstFinalDistance = () => {
      for (var i in Object.keys(sortedDistance)) {
        return sortedDistance[Object.keys(i)];
      }
      return [0, 0];
    };

    var finalDistanceObj = firstFinalDistance();
    var finalDistance = finalDistanceObj[1];
    var formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });

    if (distanceCallbacks.length === distanceRequested.length) {
      console.log("Final: ", finalDistanceObj);

      if (finalDistance > 0) {
        setMinDistance(finalDistance.toFixed(2));

        if (finalDistance > 25 && finalDistance <= 100) {
          setServiceMsg(
            <>
              Good news, you're within our area of service. A millage fee of at
              least{" "}
              {formatter
                .format((finalDistance * 0.54).toFixed(2))
                .replace(/^(\D+)/, "$1 ")}{" "}
              will be added to the order.
              <br />
              <div style={{ fontSize: 20, color: "#777368" }}>
                The final amount will be added when the appointment is
                confirmed.
              </div>
            </>
          );
          setLoader2(false);
          setProceed(true);
        } else if (finalDistance > 100) {
          console.log(finalDistance, "finalDistance elseif");

          props.setValues.setServiceMsg("");
          props.setValues.setLocation("");
          props.setValues.setDistance("");
          props.setValues.setAddress("");

          setLoader2(false);
          setProceed(false);
          props.nextStep(13);
        } else {
          setServiceMsg(
            "Good news. This address is within our area of service. Please notice mileage fees might be incurred when the appointment is confirmed."
          );
          setLoader2(false);
          setProceed(true);
        }
      } else {
        setLoader2(false);
        setProceed(false);
        setShowErrMsg(true);
        setErrorMsg("Results not found, Please try another address.");
      }
    }
  };

  const objSort = (obj) => {
    var sortable = [];
    for (var vehicle in obj) {
      sortable.push([vehicle, obj[vehicle]]);
    }

    sortable.sort(function (a, b) {
      return a[1] - b[1];
    });
    return sortable;
  };

  const canBeServiced = (val, a) => {
    //let d = val / 1.609;
    distance[a] = parseFloat(val.replace("mi", "").replace(",", "").trim());
    //console.log(val, distance[a]);
  };

  const searchOptions = {
    componentRestrictions: { country: "us" },
  };

  const chunks = (arr, chunkSize) => {
    if (chunkSize <= 0) throw "Invalid chunk size";
    var R = [];
    for (var i = 0, len = arr.length; i < len; i += chunkSize)
      R.push(arr.slice(i, i + chunkSize));
    return R;
  };

  const getDistanceMatrixCalc = (addr) => {
    let dest = chunks(destinations, 25);
    console.log(dest, addr);

    for (let i = 0; i < dest.length; i++) {
      distanceRequested.push(i);

      var service = new window.google.maps.DistanceMatrixService();

      service.getDistanceMatrix(
        {
          origins: [addr],
          destinations: dest[i], // destinations
          travelMode: window.google.maps.TravelMode.DRIVING, // destination by driving
          unitSystem: window.google.maps.UnitSystem.IMPERIAL, // miles and feet.
          avoidHighways: false,
          avoidTolls: false,
        },
        (response, status) => {
          distanceCallbacks.push(response);
          calculateDistance(response, status);
        }
      );
    }
  };

  const handleDistance = () => {
    if (!handledistance) {
      setShowErrMsg(true);
      setErrorMsg("Please enter your service location.");
      return;
    }

    if (proceed) {
      setShowErrMsg(false);
      props.setValues.setServiceMsg(servicemsg);
      props.setValues.setLocation(serviceaddress);
      props.setValues.setDistance(mindistance);
      props.setValues.setAddress(address);
      //feedbackpage
      props.nextStep(15);
    } else {
      setShowErrMsg(false);
      setLoader2(false);
      setProceed(false);
      props.nextStep(13);
    }
  };

  const onError = (status, clearSuggestions) => {
    setShowErrMsg(true);
    setErrorMsg("Hmm… that Address doesn't look valid");
    clearSuggestions();
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
            onError={onError}
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
                  {...getInputProps({
                    placeholder: "Type your answer here...",
                    autoFocus: true,
                  })}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                      handleDistance();
                    }
                  }}
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

          <div className="instructions">
            <span className="bold">Shift ⇧</span> +{" "}
            <span className="bold">Enter ↵</span> to make a line break
          </div>

          {showerrmsg ? (
            <div
              style={{ color: "red", fontWeight: "bold", marginTop: "10px" }}
            >
              {errorMsg}
            </div>
          ) : (
            <></>
          )}

          {!loader2 ? (
            <>
              <button
                className="ok-butn ok-step-three"
                onClick={() => handleDistance()}
              >
                OK
                <HiOutlineCheck></HiOutlineCheck>
              </button>
              <span className="enter-text">press Enter ↵</span>
              <Footer
                handleDistance={handleDistance}
                stepNo={props.stepNo}
                nextStep={props.nextStep}
                prevStep={props.prevStep}
              />
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
