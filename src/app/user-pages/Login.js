import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { PostAPi } from '../../services';

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error,setError] = useState(null)
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const data = {
        email:email,
        password:password
      }
      const resData = await PostAPi('login',data)
      if(resData.success) {
        localStorage.setItem("user", JSON.stringify(resData))
        window.location = "/dashboard"
      } else {
        setError(resData.message)
        setTimeout(() => {
          setError("")
        },3000)
      }
    }
    setValidated(true);
  };
    return (
      <div className='container mt-3'>
        <div className="d-flex auth px-0">
          <div className="row w-100 mx-0">
            <div className='col-lg-3'></div>
            <div className="col-lg-6">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div className="brand-logo" style={{'textAlign':'center'}}>
                  <img src={require("../../assets/images/logo.png")} alt="logo" width={110} height={110} />
                </div>
                <h4>Hello! let's get started</h4>
                <h6 className="font-weight-light">Sign in to continue.</h6>
                <Form className="pt-3" noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Group className="d-flex search-field">
                    <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" size="lg" className="h-auto" required />
                  </Form.Group>
                  <Form.Control.Feedback type="invalid">
                      Email is required.
                    </Form.Control.Feedback>
                  <Form.Group className="d-flex search-field">
                    <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" size="lg" className="h-auto" required />
                  </Form.Group>
                  <Form.Control.Feedback type="invalid">
                      Password is required.
                    </Form.Control.Feedback>
                  <div className="mt-3">
                    <Button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" type="submit">SIGN IN</Button>
                  </div>
                </Form>
                <p className='text-danger mt-3'>{error}</p>
                <div className="my-2 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input"/>
                        <i className="input-helper"></i>
                        Keep me signed in
                      </label>
                    </div>
                    <a href="!#" onClick={event => event.preventDefault()} className="auth-link text-black">Forgot password?</a>
                  </div>
              </div>
            </div>
            <div className='col-lg-3'></div>
          </div>
        </div>  
      </div>
    )
}

export default Login
