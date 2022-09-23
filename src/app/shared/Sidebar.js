import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import { Trans } from 'react-i18next';

class Sidebar extends Component {

  state = {};

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({[menuState] : false});
    } else if(Object.keys(this.state).length === 0) {
      this.setState({[menuState] : true});
    } else {
      Object.keys(this.state).forEach(i => {
        this.setState({[i]: false});
      });
      this.setState({[menuState] : true});
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    document.querySelector('#sidebar').classList.remove('active');
    Object.keys(this.state).forEach(i => {
      this.setState({[i]: false});
    });

    const dropdownPaths = [
      {path:'/apps', state: 'appsMenuOpen'},
      {path:'/basic-ui', state: 'basicUiMenuOpen'},
      {path:'/advanced-ui', state: 'advancedUiMenuOpen'},
      {path:'/form-elements', state: 'formElementsMenuOpen'},
      {path:'/tables', state: 'tablesMenuOpen'},
      {path:'/maps', state: 'mapsMenuOpen'},
      {path:'/icons', state: 'iconsMenuOpen'},
      {path:'/charts', state: 'chartsMenuOpen'},
      {path:'/user-pages', state: 'userPagesMenuOpen'},
      {path:'/error-pages', state: 'errorPagesMenuOpen'},
      {path:'/general-pages', state: 'generalPagesMenuOpen'},
      {path:'/ecommerce', state: 'ecommercePagesMenuOpen'},
    ];

    dropdownPaths.forEach((obj => {
      if (this.isPathActive(obj.path)) {
        this.setState({[obj.state] : true})
      }
    }));
 
  }

  render () {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          <li className={ this.isPathActive('/dashboard') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/dashboard">
              <span className="menu-title"><Trans>Dashboard</Trans></span>
              <i className="mdi mdi-home menu-icon"></i>
            </Link>
          </li>
          <li className={ this.isPathActive('/users') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/users">
              <span className="menu-title"><Trans>Users</Trans></span>
              <i className="menu-icon mdi mdi-account-multiple"></i>
            </Link>
          </li>
          <li className={ this.isPathActive('/contactlist') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/contactlist">
              <span className="menu-title"><Trans>Contacts</Trans></span>
              <i className="menu-icon mdi mdi-account-multiple"></i>
            </Link>
          </li>
          <li className={ this.isPathActive('/category') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/category">
              <span className="menu-title"><Trans>Learn To Dance</Trans></span>
              <i className="mdi mdi-apps menu-icon"></i>
            </Link>
          </li>
          <li className={ this.isPathActive('/banners') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/banners">
              <span className="menu-title"><Trans>Banner</Trans></span>
              <i className="mdi mdi-image menu-icon"></i>
            </Link>
          </li>
          <li className={ this.isPathActive('/city') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/city">
              <span className="menu-title"><Trans>Cities</Trans></span>
              <i className="mdi mdi-bank menu-icon"></i>
            </Link>
          </li>
          <li className={ this.isPathActive('/studiolist') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/studiolist">
              <span className="menu-title"><Trans>Studio</Trans></span>
              <i className="mdi mdi-shopping-music menu-icon"></i>
            </Link>
          </li>
          <li className={ this.isPathActive('/hireus') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/hireus">
              <span className="menu-title"><Trans>Hire Us</Trans></span>
              <i className="mdi mdi-shopping-music menu-icon"></i>
            </Link>
          </li>
          <li className={ this.isPathActive('/price') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/price">
              <span className="menu-title"><Trans>Price</Trans></span>
              <i className="mdi mdi-shopping-music menu-icon"></i>
            </Link>
          </li>
          <li className={ this.isPathActive('/learnvideo') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/learnvideo">
              <span className="menu-title"><Trans>Learn Video</Trans></span>
              <i className="mdi mdi-shopping-music menu-icon"></i>
            </Link>
          </li>
          <li className={ this.isPathActive('/punlimited') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/punlimited">
              <span className="menu-title"><Trans>Premium Unlimted</Trans></span>
              <i className="mdi mdi-shopping-music menu-icon"></i>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {
      
      el.addEventListener('mouseover', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

}

export default withRouter(Sidebar);