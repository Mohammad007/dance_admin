import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { API_URL, IMAGE_URL } from "../../baseurl"
import swal from 'sweetalert';
import { useLocation } from "react-router-dom";

const AddCities = () => {
  const  data  = useLocation()
  const path_id = data.pathname.slice(11)

  const [name, setName] = useState(data?.state?.item?.cityName ? data?.state?.item?.cityName : "")
  const [image, setImage] = useState(data?.state?.item?.profileImage ? IMAGE_URL+'/'+data?.state?.item?.profileImage : null)
  const [uploadImages, setUploadImages] = useState(null)
  const [active, setActive] = useState(data?.state?.item?.active ? data?.state?.item?.active : null)
  const [error, setError] = useState("")

  const AddSubmit = async (e) => {
    e.preventDefault()
    if(name == ""){
      setError("City is required")
      setTimeout(() => {
        setError("")
      }, 3000);
    } else {
      var formdata = new FormData();
      formdata.append("cityName", name);
      formdata.append("image", uploadImages, uploadImages.name);

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };

    fetch(`${API_URL}/addcity`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result.success){
          window.location = "/city"
        } else{
          swal("Something went wrong", {
            icon: "error",
            timer: 2000,
            buttons: false
        });
        }
      })
      .catch(error => {
        swal("Server error", {
          icon: "error",
          timer: 2000,
          buttons: false
      });
        })
      }
    }
  
  const updateSubmit = async (e) => {
    e.preventDefault()

    const responseData = await fetch(`${API_URL}/updatecity/${path_id}`,{
      method: 'PUT',
      body: JSON.stringify({
        cityName: name
      })
    })
    if(responseData.success) {
      window.location = "/city"
    } else {
      swal("Something went wrong", {
        icon: "error",
        timer: 2000,
        buttons: false
      });
    }
  }

  // upload image
  const uploadImage = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]))
    setUploadImages(e.target.files[0])
  }
  return (
    <div>
      <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-gradient-primary text-white mr-2">
          <i className="mdi mdi-bank"></i>
          </span>
          { path_id ? 'Update City' : 'Add City'}
        </h3>
      </div>

      <div className="col-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Add City</h4>
            <form className="forms-sample">
              <Form.Group>
                <label htmlFor="exampleInputName1">Name</label>
                <Form.Control
                  type="text"
                  className="form-control"
                  id="exampleInputName1"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <span style={{'color':'red'}}>
                 {error}
                </span>
              </Form.Group>              
              <Form.Group>
                <label>File upload</label>
                <div className="custom-file">
                  <Form.Control
                    type="file"
                    className="form-control visibility-hidden"
                    id="customFileLang"
                    onChange={(e) => uploadImage(e)}
                  />
                  <label className="custom-file-label" htmlFor="customFileLang">
                    Upload image
                  </label>
                </div>
                {image ?  <img src={image} width="150px" height="150px" className="mt-3" /> : null}
              </Form.Group>
              
              <Form.Group>
                <label htmlFor="exampleInputPassword4">City Status</label> 
                <select className="form-control" onChange={(e) => setActive(e.target.value)}>
                <option defaultValue={`${active}`}>{active ? 'Active' : 'Inactive'} {active == null ? 'Select Status' : ''}</option>
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </Form.Group>
              <button className="btn btn-gradient-primary mr-2" onClick={path_id ? updateSubmit : AddSubmit}>
              {path_id ? 'Update' : 'Add'}
              </button>             
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCities;
