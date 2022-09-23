import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCities, addStudiolist, addUsers } from '../../redux/reducers/webData';
import { GetAPi, userDetails } from '../../services';

const Dashboard = () => {
  const dispatch = useDispatch()
  const userslist = useSelector(state => state.dances.users)
  const citieslist = useSelector(state => state.dances.cities)
  const studiolist = useSelector(state => state.dances.studiolist)

  const studioFun = async () => {
      const responseData = await GetAPi('getStudiosList')
      if(responseData.success) {
          dispatch(addStudiolist(responseData.studios))
      }
  }

  const cityFun = async () => {
      const responseData = await GetAPi('allcity')
      if(responseData.success) {
          dispatch(addCities(responseData.citys))
      }
  }

  const usersFun = async () => {
    const responseData = await GetAPi('userslist')
    if(responseData.success) {
        dispatch(addUsers(responseData.users))
    }
  }

  useEffect(() => {
    usersFun()
    cityFun()
    studioFun()
  },[])

    return (
      <div>
        <div className="page-header">
          <h3 className="page-title">
            <span className="page-title-icon bg-gradient-primary text-white mr-2">
              <i className="mdi mdi-home"></i>
            </span> Dashboard </h3>
          <nav aria-label="breadcrumb">
            <ul className="breadcrumb">
              <li className="breadcrumb-item active" aria-current="page">
                <span></span>Overview <i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle"></i>
              </li>
            </ul>
          </nav>
        </div>
        <div className="row">
          <div className="col-md-4 stretch-card grid-margin">
            <div className="card bg-gradient-danger card-img-holder text-white">
              <div className="card-body">
                <img src={require("../../assets/images/dashboard/circle.svg")} className="card-img-absolute" alt="circle" />
                <h4 className="font-weight-normal mb-3">Total Users <i className="mdi mdi-chart-line mdi-24px float-right"></i>
                </h4>
                <h2 className="mb-5">{userslist.length}</h2>
                <h6 className="card-text">Increased by 60%</h6>
              </div>
            </div>
          </div>
          <div className="col-md-4 stretch-card grid-margin">
            <div className="card bg-gradient-info card-img-holder text-white">
              <div className="card-body">
                <img src={require("../../assets/images/dashboard/circle.svg")} className="card-img-absolute" alt="circle" />
                <h4 className="font-weight-normal mb-3">Total States<i className="mdi mdi-bookmark-outline mdi-24px float-right"></i>
                </h4>
                <h2 className="mb-5">{citieslist.length}</h2>
                <h6 className="card-text">Decreased by 10%</h6>
              </div>
            </div>
          </div>
          <div className="col-md-4 stretch-card grid-margin">
            <div className="card bg-gradient-success card-img-holder text-white">
              <div className="card-body">
                <img src={require("../../assets/images/dashboard/circle.svg")} className="card-img-absolute" alt="circle" />
                <h4 className="font-weight-normal mb-3">Total Studio <i className="mdi mdi-diamond mdi-24px float-right"></i>
                </h4>
                <h2 className="mb-5">{studiolist.length}</h2>
                <h6 className="card-text">Increased by 5%</h6>
              </div>
            </div>
          </div>
        </div>
      </div> 
    );
}

export default Dashboard;