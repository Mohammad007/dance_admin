import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { IMAGE_URL } from '../../baseurl';
import { addStudiolist } from '../../redux/reducers/webData';
import { DeleteAPi, GetAPi, PostAPi } from '../../services';
 

const Studiolist = () => {
  const dispatch = useDispatch()
  const studiolist = useSelector(state => state.dances.studiolist)

  const studioFun = async () => {
      const responseData = await GetAPi('getStudiosList')

      if(responseData.success) {
          dispatch(addStudiolist(responseData.studios))
      }
  }

  useEffect(() => {
    studioFun()
  },[])

  const formatDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric" }
      return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const ChangeStatus = async (status) => {
    if(status == "Inactive"){
        const data = {
            activeAndInactive:"Active"
        }
        const resData = await PostAPi('activeAndInactiveStudio',data)
        if(resData.success) {
            swal("Studio is open", {
                icon: "success",
                timer: 2000,
                buttons: false
            });
        }
    } else if(status == 'Active') {
        const data = {
            activeAndInactive:"Inactive"
        }
        const resData = await PostAPi('activeAndInactiveStudio',data)
        if(resData.success) {
            swal("Studio is close", {
                icon: "success",
                timer: 2000,
                buttons: false
            });
        }
    }
  }

    // delete Data
    const deleteData = async (id) => {
          swal({
              title: "Are you sure?",
              icon: "warning",
              buttons: true,
              dangerMode: true,
            })
            .then((willDelete) => {
              if (willDelete) {
                DeleteAPi('deleteStudio',id)
                .then(responseData => {
                if(responseData.success) {
                  studioFun()
                  swal("Deleted successfully", {
                      icon: "success",
                      timer: 2000,
                      buttons: false
                  });
                 }
                })
              } 
            });
    }

    return (
      <div>
        <div className="page-header">
          <h3 className="page-title">
            <span className="page-title-icon bg-gradient-primary text-white mr-2">
              <i className="mdi mdi-account-multiple"></i>
            </span> Studio list </h3>
          <nav aria-label="breadcrumb">
            <ul className="breadcrumb">
              <li className="breadcrumb-item active" aria-current="page">
              <Link to="/studio" className="btn btn-gradient-primary btn-fw">Add Studio </Link>
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
                        <th> Studio Name </th>
                        <th> Category </th>
                        <th> City </th>
                        <th> State </th>
                        <th> Status </th>
                        <th> Last Update </th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {studiolist.length > 0 ? 
                    studiolist.map(item => 
                      <tr key={item._id}>
                        <td> {item.studioName} </td>
                        <td> {item.category}</td>
                        <td>{item.city}</td>
                        <td>{item.state}</td>
                        <td><label className={`badge badge-gradient-${item.status == 'Active' ? 'success' : 'danger'}`} onClick={() => ChangeStatus(item.status)} style={{'cursor':'pointer'}}>{`${item.status == 'Active' ? 'Open' : 'Close'}`}</label></td>
                        <td> {formatDate(item.updatedAt)} </td>
                        <td> 
                        <Link className='badge badge-gradient-primary' style={{'border':'none'}} to={`/studiodetails/${item._id}`} >View</Link> &nbsp;
                            <Link className='badge badge-gradient-success' style={{'border':'none'}} to={{
                              pathname: `/studio/${item._id}`,
                              state: {
                                item
                              }
                            }} >Edit</Link> &nbsp;
                            <Button className='badge badge-gradient-danger' style={{'border':'none'}} onClick={() => deleteData(item._id)}>Delete</Button>
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

export default Studiolist;