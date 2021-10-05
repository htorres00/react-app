import React, { useEffect, useState } from "react";
import { HiOutlineCheck } from "react-icons/hi";
import { BiCloudUpload } from "react-icons/bi";
import { GrClose } from "react-icons/gr";
import AttachmentLoader from "./AttachmentLoader";
import Loader from "./Loader/Loader";
import pdfImage from "../images/pdficon.png";

const AttachmentSingleNew = (props) => {
  useEffect(() => {
    console.log(props, "Aprops");
  }, []);
  var input;
  var imageWraperContainer;
  const [domUploadWraper, setDomUploadWraper] = useState([]);
  const [urls, setUrls] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [selected, setSelected] = useState(false);
  const [errormsg, setErrorMsg] = useState(false);
  const [selectedFile, setsSelectedFile] = useState(null);
  const [loader, setLoader] = useState(false);
  const [imgres, setImgRes] = useState(false);
  const [msg, setMsg] = useState("");

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

  const handleFile = (e) => {
    console.log(e.target.files);
    if (urls.length > 0) {
      setErrorMsg(true);
      setMsg("Only one file is acceptable.");
      return;
    } else if (
      e.target.files[0].type == "image/jpeg" ||
      e.target.files[0].type == "image/png" ||
      e.target.files[0].type == "application/pdf"
    ) {
      for (let i = 0; i < e.target.files.length; i++) {
        urls.push({
          name: e.target.files[i].name,
          url: URL.createObjectURL(e.target.files[i]),
          isLoading: false,
          type: e.target.files[0].type,
        });
      }
      setErrorMsg(false);
      setSelected(true);
      setUrls(urls);
      setsSelectedFile(e.target.files[0]);
      setRefresh(refresh + 1);
    } else {
      setErrorMsg(true);
      setMsg("Invalid file format.");
      return;
    }
  };

  useEffect(() => {
    input.focus();
    if (props.values?.files.length > 0) {
      setUrls(props.values?.files);
    }
  }, []);

  useEffect(() => {
    //setDomUploadWraper(imageWraperContainer.getBoundingClientRect());
    setTimeout(function () {
      for (let k = 0; k < urls.length; k++) {
        urls[k].isLoading = true;
        setRefresh(refresh + 1);
      }
    }, 1000);
  }, [refresh]);

  const handleClick = () => {
    props.url(selectedFile);
  };

  const remove = (url, index) => {
    setErrorMsg(false);
    setSelected(false);
    urls.splice(index, 1); // remove the file from the array
    setRefresh(refresh + 1);
  };

  return (
    <section
      className="container"
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
          onChange={(e) => {
            handleFile(e);
          }}
          // onChange={onFileChange}
          single
          style={
            domUploadWraper.height > 0
              ? { height: domUploadWraper.height }
              : null
          }
        />
        {/* {urls.length === 0 && ( */}
        {selected ? null : (
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
        {/* )} */}

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
                      {url.type === "image/jpeg" || url.type === "image/png" ? (
                        <img src={url.url} style={img} />
                      ) : (
                        <img src={pdfImage} style={img} />
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

      {errormsg ? (
        <div style={{ color: "red", fontWeight: "bold", textAlign: "center" }}>
          {msg}
        </div>
      ) : (
        <></>
      )}

      {urls.length > 0 || loader ? (
        <>
          <button
            className="ok-butn ok-step-attachment"
            onClick={() => handleClick()}
          >
            {loader ? <Loader /> : "OK"}
            <HiOutlineCheck></HiOutlineCheck>
          </button>
        </>
      ) : (
        <></>
      )}
    </section>
  );
};

export default AttachmentSingleNew;
