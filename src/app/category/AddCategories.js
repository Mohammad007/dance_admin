import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { API_URL, IMAGE_URL } from "../../baseurl"
import swal from 'sweetalert';
import { useLocation } from "react-router-dom";

const AddCategories = () => {
  const  data  = useLocation()
  const path_id = data.pathname.slice(13)

  const [name, setName] = useState(data?.state?.item?.categoryName ? data?.state?.item?.categoryName : "")
  const [title, setTitle] = useState(data?.state?.item?.title ? data?.state?.item?.title : "")
  const [titleName, setTitleName] = useState(data?.state?.item?.titleName ? data?.state?.item?.titleName : "")
  const [about, setAbout] = useState(data?.state?.item?.about ? data?.state?.item?.about : "")
  const [videourl, setVideourl] = useState(data?.state?.item?.videoUrl ? data?.state?.item?.videoUrl : "")
  const [timeduration, setTimeDuration] = useState(data?.state?.item?.timeDate ? data?.state?.item?.timeDate : "")
  const [titleImage, setTitleImage] = useState(data?.state?.item?.titleImage ? data?.state?.item?.titleImage : "")
  const [image, setImage] = useState(data?.state?.item?.image ? IMAGE_URL+'/'+data?.state?.item?.image : null)
  const [uploadImages, setUploadImages] = useState(null)
  const [active, setActive] = useState(data?.state?.item?.active ? data?.state?.item?.active : null)
  const [error, setError] = useState("")

  const AddSubmit = async (e) => {
    e.preventDefault()
    if(name == ""){
      setError("Category is required")
      setTimeout(() => {
        setError("")
      }, 3000);
    } else {
      var formdata = new FormData();
      formdata.append("categoryName", name);
      formdata.append("videoUrl", videourl);
      formdata.append("title", title);
      formdata.append("titleName", titleName);
      formdata.append("timeDate", timeduration);
      formdata.append("about", about);
      formdata.append("image", uploadImages, uploadImages.name);

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };

    fetch(`${API_URL}/addCategories`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result.success){
          window.location = "/category"
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

    var formdata = new FormData();
    formdata.append("categoryName", name);
    formdata.append("videoUrl", videourl);
    formdata.append("title", title);
    formdata.append("titleName", titleName);
    formdata.append("timeDate", timeduration);
    formdata.append("about", about);

    var requestOptions = {
      method: 'PUT',
      body: formdata,
    };

    fetch(`${API_URL}/updateCategories/${path_id}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      if(result.success) {
        window.location = "/category"
      } else {
        console.log(result)
        swal("Something went wrong", {
          icon: "error",
          timer: 2000,
          buttons: false
        });
      }
    })
    .catch(error => console.log('error', error));

    // swal("Update Successfully", {
    //   icon: "success",
    //   timer: 2000,
    //   buttons: false
    // });
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
          <i className="mdi mdi-apps"></i>
          </span>
          {path_id ? 'Update Learn To Dance' : 'Add Learn To Dance'}
        </h3>
      </div>

      <div className="col-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            {/* <h4 className="card-title">Add Learn To Dance</h4> */}
            <form className="forms-sample">

              <Form.Group>
                <label>Category Name</label>
                <Form.Control
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <span style={{'color':'red'}}>
                 {error}
                </span>
              </Form.Group>    

              <Form.Group>
                <label>Category Image</label>
                <div className="custom-file">
                  <Form.Control
                    type="file"
                    className="form-control visibility-hidden"
                    onChange={(e) => uploadImage(e)}
                  />
                  <label className="custom-file-label" htmlFor="customFileLang">
                    Upload image
                  </label>
                </div>
                {image ?  <img src={image} width="150px" height="150px" className="mt-3" /> : null}
              </Form.Group>

              <Form.Group>
                <label>Song Title</label>
                <Form.Control
                  type="text"
                  className="form-control"
                  placeholder="Song Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <span style={{'color':'red'}}>
                 {error}
                </span>
              </Form.Group>

              <Form.Group>
                <label>Name</label>
                <Form.Control
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  value={titleName}
                  onChange={(e) => setTitleName(e.target.value)}
                />
                <span style={{'color':'red'}}>
                 {error}
                </span>
              </Form.Group>

              <Form.Group>
                <label>YouTube Video Url</label>
                <Form.Control
                  type="text"
                  className="form-control"
                  placeholder="YouTube Video Url"
                  value={videourl}
                  onChange={(e) => setVideourl(e.target.value)}
                />
                <span style={{'color':'red'}}>
                 {error}
                </span>
              </Form.Group>

              <Form.Group>
                <label>About</label>
                <Form.Control
                  type="text"
                  className="form-control"
                  placeholder="About"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
                <span style={{'color':'red'}}>
                 {error}
                </span>
              </Form.Group>

              <Form.Group>
                <label>Time Duration</label>
                <Form.Control
                  type="text"
                  className="form-control"
                  placeholder="Time Duration"
                  value={timeduration}
                  onChange={(e) => setTimeDuration(e.target.value)}
                />
                <span style={{'color':'red'}}>
                 {error}
                </span>
              </Form.Group>

              <Form.Group>
                <label>Title Image</label>
                <div className="custom-file">
                  <Form.Control
                    type="file"
                    className="form-control visibility-hidden"
                    onChange={(e) => uploadImage(e)}
                  />
                  <label className="custom-file-label" htmlFor="customFileLang">
                    Upload image
                  </label>
                </div>
                {titleImage ?  <img src={titleImage} width="150px" height="150px" className="mt-3" /> : null}
              </Form.Group>
              
              <Form.Group>
                <label>City Status</label> 
                <select className="form-control" onChange={(e) => setActive(e.target.value)}>
                <option defaultValue={`${active}`}>{active ? 'Active' : ''} {active == null ? 'Select Status' : ''}</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
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

export default AddCategories;
