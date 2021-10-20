import { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import Welcome from "./Welcome";
import Footer from "./Footer";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepThreeB from "./StepThreeB";
import StepThreeC from "./StepThreeC";
import StepThreeD from "./StepThreeD";
import StepFour from "./StepFour";
import ThankYou from "./Thankyou";
import NoPageStep1 from "./NoPageStep1";
import NoPageStep2 from "./NoPageStep2";
import DistanceApi from "./DistanceApi";
import FeedBack from "./FeedBack";
import EmailReponse from "./EmailResponse";
import EmailThank from "./EmailThank";
import AddressTwo from "./AddressTwo";

const UserForm = (props) => {
  const [step, setStep] = useState(0);
  const [canProceed, setCanProceed] = useState(false);
  const [yesstep, setYesStep] = useState(2);
  const [yesindicator, setYesindicator] = useState(false);
  const [input, setInput] = useState("");
  const [emailQuestion, setEmailQuestion] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [files, setFiles] = useState([]);
  const [frontfile, setFrontFile] = useState([]);
  const [backfile, setBackFile] = useState([]);
  const [multfile, setMultFile] = useState([]);
  const [cardback, setCardBack] = useState([]);
  const [laborder, setLabOrder] = useState([]);
  const [optionone, setOptionOne] = useState([]);
  const [dateone, setDateOne] = useState(null);
  const [timeone, setTimeOne] = useState(null);
  const [optiontwo, setOptionTwo] = useState([]);
  const [datetwo, setDateTwo] = useState(null);
  const [timetwo, setTimeTwo] = useState(null);
  const [optionthree, setOptionThree] = useState([]);
  const [datethree, setDateThree] = useState(null);
  const [timethree, setTimeThree] = useState(null);
  const [comments, setComments] = useState("");
  const [completedProgress, setCompletedProgress] = useState("");
  const [location, setLocation] = useState("");
  const [id, setId] = useState("");
  const [submissionId, setSubmissionId] = useState("");
  const [distance, setDistance] = useState("");
  const [address, setAddress] = useState("");
  const [servicemsg, setServiceMsg] = useState("");
  const [addresstwo, setAddressTwo] = useState("");

  const testData = [
    { bgcolor: "rgb(251, 206, 55)", completed: completedProgress },
  ];

  // Proceed to next step
  const nextStep = (stepNo, bool) => {
    if (bool === true) {
      setYesindicator(bool);
      //console.log(bool, " after indicator on yes");
      //console.log(stepNo, "step number on clicking yess");
    }

    if (bool === false) {
      setYesindicator(bool);
      //console.log(bool, "indicator on no");
    }

    setStep(stepNo);
    //console.log(stepNo, "Step number before");

    // console.log(yesstep, "Yess step");
    // console.log(bool, "Indicator");
  };

  // Proceed to next step
  const handleCanProceed = (bool) => {
    setCanProceed(bool);
  };

  // Go back to prev step
  const prevStep = () => {
    if (yesindicator && step == 4) {
      setStep(step - 3);
    } else {
      setStep(step - 1);
    }
  };

  // Handle fields change
  const handleChange = (input) => (e) => {
    setInput(e.target.value);
  };

  const HandleView = () => {
    //console.log("bfusers handleviews: ", props.bfusers);
    useEffect(() => {}, []);

    const values = {
      emailQuestion,
      phone,
      email,
      input,
      files,
      completedProgress,
      cardback,
      laborder,
      optionone,
      optiontwo,
      optionthree,
      comments,
      yesstep,
      location,
      id,
      submissionId,
      distance,
      address,
      frontfile,
      backfile,
      multfile,
      dateone,
      timeone,
      datetwo,
      timetwo,
      datethree,
      timethree,
      servicemsg,
      addresstwo,
    };
    const setValues = {
      setEmailQuestion,
      setPhone,
      setEmail,
      setInput,
      setFiles,
      setCompletedProgress,
      setCardBack,
      setLabOrder,
      setOptionOne,
      setOptionTwo,
      setOptionThree,
      setComments,
      setYesStep,
      setLocation,
      setId,
      setSubmissionId,
      setDistance,
      setAddress,
      setFrontFile,
      setBackFile,
      setMultFile,
      setDateOne,
      setTimeOne,
      setDateTwo,
      setTimeTwo,
      setDateThree,
      setTimeThree,
      setServiceMsg,
      setAddressTwo,
    };
    switch (step) {
      case 1:
        return (
          <>
            <StepOne
              stepNo={step}
              nextStep={nextStep}
              prevStep={prevStep}
              handleChange={handleChange}
              values={values}
              setValues={setValues}
              canProceed={handleCanProceed}
            />
          </>
        );

      case 2:
        return (
          <NoPageStep1
            stepNo={step}
            nextStep={nextStep}
            prevStep={prevStep}
            handleChange={handleChange}
            values={values}
            setValues={setValues}
            canProceed={handleCanProceed}
          />
        );

      case 3:
        return (
          <NoPageStep2
            stepNo={step}
            nextStep={nextStep}
            prevStep={prevStep}
            handleChange={handleChange}
            values={values}
            setValues={setValues}
            canProceed={handleCanProceed}
          />
        );

      case 4:
        return (
          <DistanceApi
            stepNo={step}
            setStep={setStep}
            nextStep={nextStep}
            prevStep={prevStep}
            handleChange={handleChange}
            values={values}
            setValues={setValues}
            indicator={yesindicator}
            canProceed={handleCanProceed}
            bfusers={props.bfusers}
          />
        );
      case 5:
        return (
          <AddressTwo
            stepNo={step}
            setStep={setStep}
            nextStep={nextStep}
            prevStep={prevStep}
            handleChange={handleChange}
            values={values}
            setValues={setValues}
            canProceed={handleCanProceed}
            indicator={yesindicator}
          />
        );
      case 6:
        return (
          <StepTwo
            stepNo={step}
            nextStep={nextStep}
            prevStep={prevStep}
            handleChange={handleChange}
            values={values}
            setValues={setValues}
            indicator={yesindicator}
            canProceed={handleCanProceed}
          />
        );
      case 7:
        return (
          <StepThree
            stepNo={step}
            nextStep={nextStep}
            prevStep={prevStep}
            handleChange={handleChange}
            values={values}
            setValues={setValues}
            canProceed={handleCanProceed}
          />
        );
      case 8:
        return (
          <StepThreeB
            stepNo={step}
            nextStep={nextStep}
            prevStep={prevStep}
            handleChange={handleChange}
            values={values}
            setValues={setValues}
            setStep={setStep}
            canProceed={handleCanProceed}
          />
        );

      case 9:
        return (
          <StepThreeC
            stepNo={step}
            setStep={setStep}
            nextStep={nextStep}
            prevStep={prevStep}
            handleChange={handleChange}
            values={values}
            setValues={setValues}
            indicator={yesindicator}
            canProceed={handleCanProceed}
          />
        );

      case 10:
        return (
          <StepThreeD
            stepNo={step}
            setStep={setStep}
            nextStep={nextStep}
            prevStep={prevStep}
            handleChange={handleChange}
            values={values}
            setValues={setValues}
            indicator={yesindicator}
            canProceed={handleCanProceed}
          />
        );

      case 11:
        return (
          <StepFour
            stepNo={step}
            setStep={setStep}
            nextStep={nextStep}
            prevStep={prevStep}
            handleChange={handleChange}
            values={values}
            setValues={setValues}
            indicator={yesindicator}
            canProceed={handleCanProceed}
          />
        );

      case 12:
        return (
          <ThankYou
            stepNo={step}
            setStep={setStep}
            nextStep={nextStep}
            prevStep={prevStep}
            handleChange={handleChange}
            values={values}
          />
        );

      case 13:
        return (
          <EmailReponse
            stepNo={step}
            setStep={setStep}
            nextStep={nextStep}
            prevStep={prevStep}
            handleChange={handleChange}
            values={values}
            indicator={yesindicator}
          />
        );

      case 14:
        return (
          <EmailThank
            stepNo={step}
            setStep={setStep}
            nextStep={nextStep}
            prevStep={prevStep}
            handleChange={handleChange}
            values={values}
          />
        );
      case 15:
        return (
          <FeedBack
            stepNo={step}
            setStep={setStep}
            nextStep={nextStep}
            prevStep={prevStep}
            handleChange={handleChange}
            values={values}
            setValues={setValues}
            canProceed={handleCanProceed}
          />
        );
      default:
        return (
          <Welcome
            nextStep={() => {
              nextStep(1);
            }}
          />
        );
    }
  };

  return (
    <div className="user-from">
      {step === 0 || step === 12
        ? null
        : testData.map((item, idx) => (
            <ProgressBar
              key={idx}
              bgcolor={item.bgcolor}
              completed={item.completed}
            />
          ))}
      <HandleView />
      {/* {step === 0 || step === 12 ? null : (
        <Footer stepNo={step} canProceed={canProceed} nextStep={nextStep} prevStep={prevStep} />
      )} */}
    </div>
  );
};

export default UserForm;
