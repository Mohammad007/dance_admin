import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { API_URL, IMAGE_URL } from "../../baseurl"
import swal from 'sweetalert';
import { useLocation } from "react-router-dom";

const AddPrice = () => {
  const  data  = useLocation()
  const path_id = data.pathname.slice(10)

  console.log(data)
  console.log(path_id)

  const [title, setTitle] = useState(data?.state?.item?.title ? data?.state?.item?.title : "")
  const [subtitle, setSubtitle] = useState(data?.state?.item?.subtitle ? data?.state?.item?.subtitle : "")
  const [price, setPrice] = useState(data?.state?.item?.price ? data?.state?.item?.price : "")
  const [error, setError] = useState({
    title: "",
    subtitle: "",
    price: ""
  })

  const AddSubmit = async (e) => {
    e.preventDefault()
    if(title == ""){
      setError({ title: "Title is required"})
      setTimeout(() => {
        setError({ title : ""})
      }, 3000);
    } else if(subtitle == ""){
      setError({ subtitle: "Subtitle is required"})
      setTimeout(() => {
        setError({ subtitle : ""})
      }, 3000);
    } else if(price == ""){
      setError({ price: "Price is required"})
      setTimeout(() => {
        setError({ price : ""})
      }, 3000);
    } else {

      var requestOptions = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: title,
          subtitle: subtitle,
          price: price,
        }),
      };

    fetch(`${API_URL}/addPrices`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result.success){
          window.location = "/price"
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
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "title": title,
      "subtitle": subtitle,
      "price": price,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    fetch(`${API_URL}/updatePrices/${path_id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if(result.success) {
          window.location = "/price"
        } else {
          swal("Something went wrong", {
            icon: "error",
            timer: 2000,
            buttons: false
        });
      }
      })
      .catch(error => console.log('error', error));
  }

  return (
    <div>
      <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-gradient-primary text-white mr-2">
          <i className="mdi mdi-bank"></i>
          </span>
          { path_id ? 'Update Price' : 'Add Price'}
        </h3>
      </div>

      <div className="col-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <form className="forms-sample">
              <Form.Group>
                <label>Title</label>
                <Form.Control
                  type="text"
                  className="form-control"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <span style={{'color':'red'}}>
                 {error.title}
                </span>
              </Form.Group>              
              <Form.Group>
                <label>Subitle</label>
                <Form.Control
                  type="text"
                  className="form-control"
                  placeholder="Subtitle"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                />
                <span style={{'color':'red'}}>
                 {error.subtitle}
                </span>
              </Form.Group>              
              <Form.Group>
                <label>Price</label>
                <Form.Control
                  type="text"
                  className="form-control"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <span style={{'color':'red'}}>
                 {error.price}
                </span>
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

export default AddPrice;
