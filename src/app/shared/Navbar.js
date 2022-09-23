import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Trans } from 'react-i18next';
import { userDetails } from '../../services';
import Logo from '../../assets/images/logo.png'

const Navbar = () => {
  const [email,setEmail] = useState("")
  const [fullname,setFullname] = useState("")
  const [profile,setProfile] = useState("")

  useEffect(() => {
    ;(async() => {
      const user = await userDetails()
      if(user != null){
        setEmail(user.user.email)
        setFullname(user.user.fullname)
        setProfile(user.user.profileImage)
      }
    })()
  },[])

  const toggleOffcanvas = () => {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }

  const logout = () => {
    localStorage.removeItem('user')
    window.location = "/"
  }
    return (
      <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
          <Link className="navbar-brand brand-logo" to="/"><img src={Logo} alt="logo" /></Link>
          <Link className="navbar-brand brand-logo-mini" to="/"><img src={Logo} alt="logo" /></Link>
        </div>
        <div className="navbar-menu-wrapper d-flex align-items-stretch">
          <button className="navbar-toggler navbar-toggler align-self-center" type="button" onClick={ () => document.body.classList.toggle('sidebar-icon-only') }>
            <span className="mdi mdi-menu"></span>
          </button>
          <ul className="navbar-nav navbar-nav-right">
            <li className="nav-item nav-profile">
              <Dropdown alignRight>
                <Dropdown.Toggle className="nav-link">
                  <div className="nav-profile-img">
                    <img src={profile} alt="user"/>
                    <span className="availability-status online"></span>
                  </div>
                  <div className="nav-profile-text">
                    <p className="mb-1 text-black"><Trans>{fullname}</Trans></p>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu className="navbar-dropdown">
                  <Dropdown.Item onClick={evt =>evt.preventDefault()}>
                    <i className="mdi mdi-cached mr-2 text-success"></i>
                    <Trans>Profile</Trans>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={logout}>
                    <i className="mdi mdi-logout mr-2 text-primary"></i>
                    <Trans>Signout</Trans>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
          <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" onClick={toggleOffcanvas}>
            <span className="mdi mdi-menu"></span>
          </button>
        </div>
      </nav>
    );
}

export default Navbar;
