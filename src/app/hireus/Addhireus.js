import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { API_URL, IMAGE_URL } from "../../baseurl";
import swal from "sweetalert";
import { useLocation } from "react-router-dom";

const Addhireus = () => {
  const data = useLocation();
  const path_id = data.pathname.slice(11);

  const [name, setName] = useState(
    data?.state?.item ? data?.state?.item?.name : ""
  );
  const [designation, setDesignation] = useState(
    data?.state?.item ? data?.state?.item?.designation : ""
  );
  const [about, setAbout] = useState(
    data?.state?.item ? data?.state?.item?.about : ""
  );
  const [status, setStatus] = useState(
    data?.state?.item ? data?.state?.item?.status : ""
  );
  const [profileImage, setProfileImage] = useState(
    data?.state?.item?.profileImage
      ? IMAGE_URL + "/" + data?.state?.item?.profileImage
      : null
  );
  const [profileImageUpload, setProfileImageUpload] = useState(null);
  const [footerImage, setFooterImage] = useState(
    data?.state?.item?.footerImage
      ? IMAGE_URL + "/" + data?.state?.item?.footerImage
      : null
  );
  const [footerImageUpload, setFooterImageUpload] = useState(null);
  const [files, setFiles] = useState(
    data?.state?.item ? data?.state?.item?.imagelist : []
  );
  const [error, setError] = useState({
    name: "",
    designation: "",
    about: "",
    status: "",
    profileImage: "",
    footerImage: "",
  });

  const handleChange = (e) => {
    setFiles([...e.target.files]);
  };

  const AddSubmit = async (e) => {
    e.preventDefault();

    if (name == "") {
      setError({ name: "Name is required" });
      setTimeout(() => {
        setError({ name: "" });
      }, 3000);
    } else if (designation == "") {
      setError({ designation: "Designation is required" });
      setTimeout(() => {
        setError({ designation: "" });
      }, 3000);
    } else if (about == "") {
      setError({ about: "About is required" });
      setTimeout(() => {
        setError({ about: "" });
      }, 3000);
    } else if (status == "") {
      setError({ status: "Status is required" });
      setTimeout(() => {
        setError({ status: "" });
      }, 3000);
    } else {
      let formdata = new FormData();
      formdata.append("name", name);
      formdata.append("designation", designation);
      formdata.append("about", about);
      formdata.append("status", status);
      formdata.append("footerImage", footerImageUpload, footerImageUpload.name);
      formdata.append(
        "profileImage",
        profileImageUpload,
        profileImageUpload.name
      );

      [...files].forEach((image) => {
        formdata.append("imagelist", image);
      });

      var requestOptions = {
        method: "POST",
        body: formdata,
      };
      fetch(`${API_URL}/addHire`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.success) {
            window.location = "/hireus";
          } else {
            swal("Something went wrong", {
              icon: "error",
              timer: 2000,
              buttons: false,
            });
          }
        })
        .catch((error) => {
          swal("Server error", {
            icon: "error",
            timer: 2000,
            buttons: false,
          });
        });
    }
  };

  const updateSubmit = async (e) => {
    e.preventDefault();

    var requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: status,
        name: name,
        designation: designation,
        about: about,
      }),
    };

    fetch(`${API_URL}/updateHire/${path_id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          window.location = "/hireus";
        } else {
          swal("Something went wrong", {
            icon: "error",
            timer: 2000,
            buttons: false,
          });
        }
      })
      .catch((error) => console.log("error", error));
  };

  const uploadImageFooter = (e) => {
    setFooterImage(URL.createObjectURL(e.target.files[0]));
    setFooterImageUpload(e.target.files[0]);
  };

  const uploadImageProfile = (e) => {
    setProfileImage(URL.createObjectURL(e.target.files[0]));
    setProfileImageUpload(e.target.files[0]);
  };

  // Update footer image with id
  const UploadImageUpdate = (e) => {
    let formdata = new FormData();

    formdata.append("id", path_id);
    formdata.append("footerImage", e.target.files[0], e.target.files[0].name);

    var requestOptions = {
      method: "POST",
      body: formdata,
    };
    fetch(`${API_URL}/footerImageUpdate`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          swal("Footer image uploaded", {
            icon: "success",
            timer: 2000,
            buttons: false,
          });
        } else {
          swal("Something went wrong", {
            icon: "error",
            timer: 2000,
            buttons: false,
          });
        }
      })
      .catch((error) => {
        swal("Server error", {
          icon: "error",
          timer: 2000,
          buttons: false,
        });
      });
  };

  // Update profile image with id
  const UploadImageUpdateProfile = (e) => {
    let formdata = new FormData();

    formdata.append("id", path_id);
    formdata.append("profileImage", e.target.files[0], e.target.files[0].name);

    var requestOptions = {
      method: "POST",
      body: formdata,
    };
    fetch(`${API_URL}/profileImageUpdate`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          swal("Profile image uploaded", {
            icon: "success",
            timer: 2000,
            buttons: false,
          });
        } else {
          swal("Something went wrong", {
            icon: "error",
            timer: 2000,
            buttons: false,
          });
        }
      })
      .catch((error) => {
        swal("Server error", {
          icon: "error",
          timer: 2000,
          buttons: false,
        });
      });
  };

  const UpdateImageSlider = (e) => {
    let formdata = new FormData();
    [e.target.files].forEach((image) => {
    formdata.append("imagelist", image);
    });
    formdata.append("id", path_id);

    var requestOptions = {
      method: "POST",
      body: formdata,
    };
    fetch(`${API_URL}/imageListUpdate`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          swal("Images uploaded successfully", {
            icon: "success",
            timer: 2000,
            buttons: false,
          });
        } else {
          swal("Something went wrong", {
            icon: "error",
            timer: 2000,
            buttons: false,
          });
        }
      })
      .catch((error) => {
        swal("Server error", {
          icon: "error",
          timer: 2000,
          buttons: false,
        });
      });
  }

  return (
    <div>
      <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-gradient-primary text-white mr-2">
            <i className="mdi mdi-shopping-music" />
          </span>
          {path_id ? "Update Studio" : "Add Hire Us"}
        </h3>
      </div>

      <div className="col-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <form className="forms-sample">
              <Form.Group>
                <label>Name</label>
                <Form.Control
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <span style={{ color: "red" }}>{error.name}</span>
              </Form.Group>

              <Form.Group>
                <label>Designation</label>
                <Form.Control
                  type="text"
                  className="form-control"
                  placeholder="Designation"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                />
                <span style={{ color: "red" }}>{error.designation}</span>
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>About</Form.Label>
                <Form.Control
                  placeholder="About Text Here ..."
                  as="textarea"
                  rows={3}
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formFile" className="mb-3 ">
                <Form.Label>Profile Image</Form.Label>
                <Form.Control
                  className="border"
                  type="file"
                  style={{ padding: "10px", borderRadius: "3px" }}
                  onChange={(e) =>
                    path_id
                      ? UploadImageUpdateProfile(e)
                      : uploadImageProfile(e)
                  }
                />
                {profileImage ? (
                  <img
                    src={profileImage}
                    width="150px"
                    height="150px"
                    className="mt-3"
                  />
                ) : null}
              </Form.Group>

              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Slider Image</Form.Label>
                <Form.Control
                  className="border"
                  type="file"
                  style={{ padding: "10px", borderRadius: "3px" }}
                  multiple
                  onChange={ path_id ? UpdateImageSlider : handleChange}
                />
                {files?.map((item) => (
                  <img
                    key={item}
                    src={`${IMAGE_URL}/${item}`}
                    width="150px"
                    height="150px"
                    className="mt-3"
                  />
                ))}
              </Form.Group>

              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Footer Image</Form.Label>
                <Form.Control
                  className="border"
                  type="file"
                  style={{ padding: "10px", borderRadius: "3px" }}
                  onChange={(e) =>
                    path_id ? UploadImageUpdate(e) : uploadImageFooter(e)
                  }
                />
                {footerImage ? (
                  <img
                    src={footerImage}
                    width="150px"
                    height="150px"
                    className="mt-3"
                  />
                ) : null}
              </Form.Group>

              <Form.Group>
                <label>Status</label>
                <select
                  className="form-control"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option defaultValue={`${status}`}>
                    {status ? "Active" : "Inactive"}{" "}
                    {status == null ? "Select Status" : ""}
                  </option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </Form.Group>

              <button
                type="submit"
                className="btn btn-gradient-primary mr-2 pt-2"
                onClick={path_id ? updateSubmit : AddSubmit}
              >
                {path_id ? "Update" : "Add"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addhireus;
