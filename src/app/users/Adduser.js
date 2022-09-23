import React, { useState } from "react";
import { Form } from "react-bootstrap";
import swal from "sweetalert";
import { PostAPi } from "../../services";

const Adduser = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [status, setStatus] = useState("")
  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    status: "",
  })

  const AddSubmit = async (e) => {
    e.preventDefault()

    if(name == ""){
      setError({ name: "Name is required" })
      setTimeout(() => {
        setError({ name: ""})
      }, 3000);
    } 
    else if(email == "") {
      setError({ email: "Email is required" })
      setTimeout(() => {
        setError({ email: ""})
        }, 3000);
    } else if(password == "") {
      setError({ password: "Password is required"})
      setTimeout(() => {
        setError({ password : ""})
        }, 3000);
    } else {
      const data = {
        fullname: name,
        email: email,
        password: password,
        loginType: "mobile",
      }
      const resData = await PostAPi('signup',data)

      if(resData.success){
        window.location = "/users"
      } else {
        swal("Something went wrong", {
          icon: "error",
          timer: 2000,
          buttons: false
      });
      }
        

    }
}

  return (
    <div>
      <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-gradient-primary text-white mr-2">
            <i className="mdi mdi-account-multiple" />
          </span>{" "}
          Add User{" "}
        </h3>
      </div>

      <div className="col-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Add New User</h4>
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
                 <span style={{'color':'red'}}>
                 {error.name}
                </span>
              </Form.Group>
             
              <Form.Group>
                <label>Email address</label>
                <Form.Control
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                 <span style={{'color':'red'}}>
                 {error.email}
                </span>
              </Form.Group>
             
              <Form.Group>
                <label>Password</label>
                <Form.Control
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                 <span style={{'color':'red'}}>
                 {error.password}
                </span>
              </Form.Group>
             
              <Form.Group>
                <label>Account Status</label> 
                <select className="form-control" onChange={(e) => setStatus(e.target.value)}>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <span style={{'color':'red'}}>
                 {error.status}
                </span>
              </Form.Group>
              <button type="submit" className="btn btn-gradient-primary mr-2 pt-2" onClick={AddSubmit}>
                Add
              </button>             
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adduser;
