import React, { useEffect, useState } from "react";
import { HiOutlineCheck } from "react-icons/hi";
import { BiCloudUpload } from "react-icons/bi";
import { GrClose } from "react-icons/gr";
import AttachmentLoader from "./AttachmentLoader";
import pdfImage from "../images/pdficon.png";
import Footer from "./Footer";
import _ from "lodash";

const AttachmentSingle = (props) => {
  useEffect(() => {
    //console.log(props, "props attachment file");
  }, []);
  var input;
  var imageWraperContainer;
  const [domUploadWraper, setDomUploadWraper] = useState([]);
  const [urls, setUrls] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [selected, setSelected] = useState(false);
  const [selectedFile, setSelectedFile] = useState([]);
  const [imgload, setImgLoad] = useState(false);
  const [errorSizeMsg, setErrorSizeMsg] = useState(false);
  const [errorSize, setErrorSize] = useState("");

  const thumb = {
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    padding: 4,
    boxSizing: "border-box",
  };

  const thumbInner = {
    display: "flex",
    minWidth: 0,
    overflow: "hidden",
  };

  const img = {
    display: "block",
    width: "auto",
    height: "100%",
  };

  useEffect(() => {
    input.focus();

    if (props.mybackfile?.length > 0) {
      for (let i = 0; i < props.mybackfile.length; i++) {
        urls.push({
          name: props.mybackfile[i].name,
          url: props.mybackfile[i].url,
          type: props.mybackfile[i].type,
        });
      }

      setSelected(false);
      setUrls(urls);
      setRefresh(refresh + 1);
    }
  }, []);

  const handleFile = (e) => {

    let file = e.target.files[0];
    if (!selected) {
      if (file && file.size != undefined && file.size > 1e+7) {
        setErrorSizeMsg(true);
        setErrorSize("Incorrect file size, please try another image...")
        return
      } else {
        setErrorSizeMsg(false);
      }
    }
    for (let i = 0; i < e.target.files.length; i++) {
      urls.push({
        name: e.target.files[i].name,
        url: URL.createObjectURL(e.target.files[i]),
        isLoading: false,
      });
      selectedFile.push(e.target.files[i]);
    }
    setSelected(false);
    setUrls(urls);
    setRefresh(refresh + 1);
  };

  useEffect(() => {
    setDomUploadWraper(imageWraperContainer.getBoundingClientRect());
    const urlsArr = setTimeout(function () {
      for (let k = 0; k < urls.length; k++) {
        urls[k].isLoading = true;
        setRefresh(refresh + 1);
      }
    }, 1000);
    return () => {
      clearTimeout(urlsArr)
    }
  }, [refresh]);

  const handleClick = () => {
    if (urls.length == 0) {
      props.mysetmultfile([]);
      props.nextStep(10);
      return;
    }

    if (props.mybackfile.length == 0) {
      props.url(selectedFile, urls);
      return;
    }
    let result = props.mybackfile.filter((o1) =>
      urls.some((o2) => o1.name === o2.name)
    );

    if (
      result.length != urls.length ||
      result.length != props.mybackfile.length
    ) {
      props.url(selectedFile, urls);
    } else {
      props.nextStep(10);
    }
  };

  const remove = (url, index) => {
    urls.splice(index, 1);
    selectedFile.splice(index, 1);
    setRefresh(refresh + 1);
  };

  return (
    <section
      className="container drag-file"
      tabIndex="0"
      ref={(e) => {
        input = e;
      }}
      onKeyDown={(e) => {
        if (e.keyCode === 13) {
          handleClick();
        }
      }}
    >
      <div
        className="upload-wraper"
        style={urls.length !== 0 ? { overflow: "auto" } : null}
      >
        <input
          type="file"
          name="images"
          id="imgid"
          className="imgcls"
          accept="image/jpeg, application/pdf, image/png, image/jpg"
          onChange={(e) => {
            handleFile(e);
          }}
          multiple
          style={
            domUploadWraper.height > 0
              ? { height: domUploadWraper.height }
              : null
          }
        />
        {urls.length === 0 && (
          <div className="upload-container">
            <div className="icnStyle" style={{ textAlign: "center" }}>
              <BiCloudUpload></BiCloudUpload>
            </div>
            <p>
              <span className="bold">Choose files</span> or{" "}
              <span className="bold">Drag here</span>
            </p>
            <p style={{ textAlign: "center" }} className="filesize">
              Size limit: 10MB
            </p>
          </div>
        )}

        <div
          className="image-wraper-container"
          ref={(e) => {
            imageWraperContainer = e;
          }}
        >
          {urls.map((url, index) =>
            !url.isLoading ? (
              <div className="image-wraper" style={thumb} key={index}>
                <div className="img-uper-box">
                  <div className="img-box" style={thumbInner}>
                    <AttachmentLoader myClass="loader-wraper" />
                  </div>
                  <div className="imgDescWraper">
                    <span className="img-name">{url.name}</span>
                    <span
                      className="removeIcn"
                      onClick={(e) => {
                        remove(url, index, e);
                      }}
                    >
                      <GrClose></GrClose>
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="image-wraper" style={thumb} key={index}>
                <div className="img-uper-box">
                  <div className="img-box" style={thumbInner}>
                    <div className="img-inner-box">
                      {url.name.split(".").pop() == "pdf" ? (
                        <img src={pdfImage} style={{ width: "140px" }} />
                      ) : (
                        <img src={url.url} style={img} />
                      )}
                    </div>
                  </div>
                  <div className="imgDescWraper">
                    <span className="img-name">{url.name}</span>
                    <span
                      className="removeIcn"
                      onClick={() => {
                        remove(url, index);
                      }}
                    >
                      <GrClose></GrClose>
                    </span>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {selected ? (
        <div style={{ color: "red", fontWeight: "bold", marginTop: "10px" }}>
          Please select any file.
        </div>
      ) : (
        <></>
      )}

      {errorSizeMsg ? (
        <div style={{ color: "red", fontWeight: "bold", marginTop: "10px" }}>
          {errorSize}
        </div>
      ) : (
        <></>
      )}

      <button
        className="ok-butn ok-step-attachment"
        onClick={() => handleClick()}
      >
        OK
        <HiOutlineCheck></HiOutlineCheck>
      </button>

      <div style={{ marginTop: 10 }} />
      <Footer
        handleClick={handleClick}
        stepNo={props.stepNo}
        nextStep={props.nextStep}
        prevStep={props.prevStep}
      />
    </section>
  );
};

export default AttachmentSingle;
