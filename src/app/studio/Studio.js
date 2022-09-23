import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select'
import { FileUploader } from "react-drag-drop-files";
import { addCategories } from "../../redux/reducers/webData";
import { GetAPi } from "../../services";
import { API_URL } from "../../baseurl";
import swal from "sweetalert";
import { useLocation } from "react-router-dom";

const fileTypes = ["JPG","JPEG", "PNG", "GIF"];

const Studio = () => {
  const  data  = useLocation()
  const path_id = data.pathname.slice(11)

  const [Name, setName] = useState(data?.state?.item ? data?.state?.item?.studioName : "")
  const [description, setDescription] = useState(data?.state?.item ? data?.state?.item?.description : "")
  const [category, setCategory] = useState(data?.state?.item ? data?.state?.item?.category : "")
  const [address, setAddress] = useState(data?.state?.item ? data?.state?.item?.address : "")
  const [city, setCity] = useState(data?.state?.item ? data?.state?.item?.city : "")
  const [state, setState] = useState(data?.state?.item ? data?.state?.item?.state : "")
  const [status, setStatus] = useState(data?.state?.item ? data?.state?.item?.status : "")
  const [files, setFiles] = useState(data?.state?.item ? data?.state?.item?.images : []);
  const [error, setError] = useState({
    Name: "",
    description: "",
    category: "",
    address: "",
    city: "",
    state: "",
    status: ""
  })

    const handleChange = (e) => {
      setFiles([...e.target.files]);
    };

    const dispatch = useDispatch()
    const categorieslist = useSelector(state => state.dances.categories)

    const categoryFun = async () => {
        const responseData = await GetAPi('getAllCategories')
        if(responseData.success) {
          const newArrayOfObj = responseData.categorys.map(({
            categoryName: value,
            categoryName: label,
            ...rest
          }) => ({
            value,
            label,
          ...rest
          }))
          dispatch(addCategories(newArrayOfObj))
        }
    }

    useEffect(()=> {
        categoryFun()
    },[])

    const AddSubmit = async (e) => {
      e.preventDefault()

      if(Name == ""){
        setError({ Name: "Name is required" })
        setTimeout(() => {
          setError({ Name: "" })
        }, 3000);
      } else if(description == ""){
        setError({ description: "Description is required" })
        setTimeout(() => {
          setError({ description : "" })
        }, 3000);
      } else if(category == ""){
        setError({ category: "Description is required" })
        setTimeout(() => {
          setError({ category : "" })
        }, 3000);
      } else if(address == ""){
        setError({ address: "Description is required" })
        setTimeout(() => {
          setError({ address : "" })
        }, 3000);
      } else if(city == ""){
        setError({ city: "Description is required" })
        setTimeout(() => {
          setError({ city : "" })
        }, 3000);
      } else if(state == ""){
        setError({ state: "Description is required" })
        setTimeout(() => {
          setError({ state : "" })
        }, 3000);
      } else if(status == ""){
        setError({ status: "Description is required" })
        setTimeout(() => {
          setError({ status : "" })
        }, 3000);
      } else {
      let formdata = new FormData();
      formdata.append("studioName", Name);
      formdata.append("description", description);
      formdata.append("category", category);
      formdata.append("address", address);
      formdata.append("city", city);
      formdata.append("state", state);

      [...files].forEach((image) => {
        formdata.append("image", image);
      })

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };
      fetch(`${API_URL}/addStudio`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result.success){
          window.location = "/studiolist"
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
      e.preventDefault();
      const responseData = await fetch(`${API_URL}/updateStudio/${path_id}`,{
        method: 'PUT',
        body: JSON.stringify({
          studioName: Name,
          description: description,
          category: category,
          address: address,
          city: city,
          state: state
        })
      })
      if(responseData.success) {
        window.location = "/studiolist"
      } else {
        swal("Something went wrong", {
          icon: "error",
          timer: 2000,
          buttons: false
        });
      }
    }


  return (
    <div>
      <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-gradient-primary text-white mr-2">
            <i className="mdi mdi-shopping-music" />
          </span>
          {path_id ? 'Update Studio' : 'Add Studio'}
        </h3>
      </div>

      <div className="col-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Add New</h4>
            <form className="forms-sample">
              <Form.Group>
                <label htmlFor="exampleInputName1">Name</label>
                <Form.Control
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  value={Name}
                  onChange={(e) => setName(e.target.value)}
                />
                <span style={{'color':'red'}}>
                 {error.Name}
                </span>
              </Form.Group>
           
              <Form.Group>
                <label htmlFor="exampleInputEmail3">Discription</label>
                <Form.Control
                  type="text"
                  className="form-control"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <span style={{'color':'red'}}>
                 {error.description}
                </span>
              </Form.Group>
            
              <Form.Group>
                <label>Category</label>
                <Select options={categorieslist} onChange={(e) => setCategory(e.value)} defaultValue={{ 'label':category, 'value':category }} />
              </Form.Group>
            
              <Form.Group>
                <label htmlFor="exampleInputPhone">Address</label>
                <Form.Control
                  type="text"
                  className="form-control"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Group>
             
              <Form.Group>
                <label htmlFor="exampleInputPhone">City</label>
                <Form.Control
                  type="text"
                  className="form-control"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </Form.Group>
            
              <Form.Group>
                <label htmlFor="exampleInputPhone">State</label>
                <Form.Control
                  type="text"
                  className="form-control"
                  placeholder="State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <label>Status</label> 
                <select className="form-control" onChange={(e) => setStatus(e.target.value)}>
                <option defaultValue={`${status}`}>{status ? 'Active' : 'Inactive'} {status == null ? 'Select Status' : ''}</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </Form.Group>
              
              <Form.Group>
                <label>File upload</label>
                <input type="file" multiple onChange={handleChange} />
              </Form.Group>
            
              <button type="submit" className="btn btn-gradient-primary mr-2 pt-2" onClick={ path_id ? updateSubmit : AddSubmit }>
                { path_id ? 'Update' : 'Add'}
              </button>             
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Studio;