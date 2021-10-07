import React, { useEffect, useState } from "react";
import { HiOutlineCheck } from "react-icons/hi";
import { BiCloudUpload } from "react-icons/bi";
import { GrClose } from "react-icons/gr";
import AttachmentLoader from "./AttachmentLoader";
import Loader from "./Loader/Loader";
import pdfImage from "../images/pdficon.png";

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
  const [loader, setLoader] = useState(false);
  const [selectedFile, setSelectedFile] = useState([]);
  const [myUrls, setMyUrls] = useState([]);
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
    if (urls.length + e.target.files.length > 20) {
      setMsg("Selected files should be less than 21.");
      setSelected(true);
      return;
    }
    if (urls.length < 3) {
      setMsg("Selected files should be greater than 2.");
      setSelected(true);
    } else {
      setMsg("");
      setSelected(false);
    }

    for (let i = 0; i < e.target.files.length; i++) {
      if (
        e.target.files[i].type == "image/jpeg" ||
        e.target.files[i].type == "image/png" ||
        e.target.files[i].type == "application/pdf"
      ) {
        urls.push({
          name: e.target.files[i].name,
          url: URL.createObjectURL(e.target.files[i]),
          isLoading: false,
        });
        selectedFile.push(e.target.files[i]);
        setMsg("");

        //console.log(e.target.files[i], "files");
      } else {
        setSelected(true);
        setMsg("Invalid file type");
        // return;
      }
    }

    setUrls(urls);
    setRefresh(refresh + 1);
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
    urls.splice(index, 1);
    selectedFile.splice(index, 1);
    if (urls.length == 1 || urls.length == 2 || urls.length > 20) {
      setMsg("Selected files should be greater than 2.");
      setSelected(true);
    } else {
      setMsg("");
      setSelected(false);
    }
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
                        <img src={pdfImage} style={img} />
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

      {urls.length > 2 && urls.length < 21 ? (
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
        console.log("")
      )}

      {selected ? (
        <div style={{ color: "red", fontWeight: "bold", textAlign: "center" }}>
          {msg}
        </div>
      ) : (
        <></>
      )}
    </section>
  );
};

export default AttachmentSingle;
