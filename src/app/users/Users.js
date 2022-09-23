import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { IMAGE_URL } from '../../baseurl';
import { addUsers } from '../../redux/reducers/webData';
import { GetAPi } from '../../services';
 

const Users = () => {
  const dispatch = useDispatch()
  const userslist = useSelector(state => state.dances.users)

  const usersFun = async () => {
      const responseData = await GetAPi('userslist')
      if(responseData.success) {
          dispatch(addUsers(responseData.users))
      }
  }

  useEffect(() => {
    usersFun()
  },[])

  const formatDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric" }
      return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const statusUpdate = (id) => {
    swal('Status updated..',{
      icon: 'success',
      timer: 2000,
      buttons: false
    })
  }

    return (
      <div>
        <div className="page-header">
          <h3 className="page-title">
            <span className="page-title-icon bg-gradient-primary text-white mr-2">
              <i className="mdi mdi-account-multiple"></i>
            </span> Users </h3>
          <nav aria-label="breadcrumb">
            <ul className="breadcrumb">
              <li className="breadcrumb-item active" aria-current="page">
              <Link to="/adduser" className="btn btn-gradient-primary btn-fw">Add User </Link>
              </li>
            </ul>
          </nav>
        </div>
        
        <div className="row">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th> Name </th>
                        <th> Email </th>
                        <th> Phone </th>
                        <th> Status </th>
                        <th> Last Update </th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {userslist.length > 0 ? 
                    userslist.filter(item => item.email != 'admin@gmail.com').map(item => 
                      <tr key={item._id}>
                        <td>
                          <img src={item.profileImage == 'https://cdn-icons-png.flaticon.com/512/219/219983.png' ? item.profileImage : `${IMAGE_URL}/${item.profileImage}`} className="mr-2" alt="face" /> {item.fullname} </td>
                        <td> {item.email}</td>
                        <td>
                          {item.phone ? item.phone : 'XXXXXXXX'}
                        </td>
                        <td onClick={() => statusUpdate(item._id)}><label className='badge badge-gradient-success' style={{'cursor':'pointer'}}>{`${item.active}`}</label></td>
                        <td> {formatDate(item.updatedAt)} </td>
                        <td> 
                            <Link className='badge badge-gradient-success' style={{'border':'none'}} to="" >Edit</Link> &nbsp;
                            <Button className='badge badge-gradient-danger' style={{'border':'none'}} onClick={() => alert('delete')}>Delete</Button>
                        </td>
                      </tr>
                      ) : (
                        <tr>
                            <td colSpan={5} className="text-center">
                                <label>There is no banners</label>
                            </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
               
      </div> 
    );
}

export default Users;