import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { API_URL } from "../../baseurl";
import swal from "sweetalert";
import { useLocation } from "react-router-dom";

const Premiumadd = () => {
  const  data  = useLocation()
  const path_id = data.pathname.slice(12)

  const [title, setTitle] = useState(data?.state?.item ? data?.state?.item?.title : "")
  const [content, setContent] = useState(data?.state?.item ? data?.state?.item?.content : "")

  console.log(data)

  const [error, setError] = useState({
    title: "",
    content: "",
  })

    const AddSubmit = async (e) => {
      e.preventDefault()

      if(title == ""){
        setError({ title: "title is required" })
        setTimeout(() => {
          setError({ title: "" })
        }, 3000);
      } else if(content == ""){
        setError({ content: "content is required" })
        setTimeout(() => {
          setError({ content : "" })
        }, 3000);
      } else {
      fetch(`${API_URL}/premiumAdd`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: title,
          content: content
        })
      })
      .then(response => response.json())
      .then(result => {
        if(result.success){
          window.location = "/punlimited"
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
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "title": title,
        "content": content
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
      };

      fetch(`${API_URL}/premiumUpdate/${path_id}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result)
          if(result.success) {
            window.location = "/punlimited"
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
            <i className="mdi mdi-shopping-music" />
          </span>
          {path_id ? 'Update Studio' : 'Add Premium Data'}
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
                <label>Content</label>
                <Form.Control
                  type="text"
                  className="form-control"
                  placeholder="Content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                <span style={{'color':'red'}}>
                 {error.content}
                </span>
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

export default Premiumadd;