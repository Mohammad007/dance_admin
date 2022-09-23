import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { API_URL, IMAGE_URL } from '../../baseurl';
import { addHireList } from '../../redux/reducers/webData';
import { DeleteAPi, GetAPi, PostAPi } from '../../services';
 

const Hireus = () => {
  const dispatch = useDispatch()
  const HireList = useSelector(state => state.dances.HireList)

  const hireFun = async () => {
      const responseData = await GetAPi('getHireList')
      if(responseData.success) {
          dispatch(addHireList(responseData.hirelist))
      }
  }

  useEffect(() => {
    hireFun()
  },[])

  const formatDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric" }
      return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const ChangeStatus = async (status, id) => {
    if(status == "Inactive"){
        const data = {
            activeAndInactive:"Active",
            id:id
        }
        const resData = await PostAPi('activeAndInactiveHire',data)
        if(resData.success) {
            hireFun()
            swal("Hire us is open", {
                icon: "success",
                timer: 2000,
                buttons: false
            });
        }
    } else if(status == 'Active') {
        const data = {
            activeAndInactive:"Inactive",
            id:id
        }
        const resData = await PostAPi('activeAndInactiveHire',data)
        if(resData.success) {
            hireFun()
            swal("Hire us is close", {
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
                try {
                  fetch(`${API_URL}/deleteHire`,{
                      method:'DELETE',
                      headers: {
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify({
                        "id": id
                      })
                  })
                  .then(response => response.json())
                  .then(responseJson => {
                    if(responseJson.success) {
                      hireFun()
                      swal("Deleted successfully", {
                          icon: "success",
                          timer: 2000,
                          buttons: false
                      });
                     }
                  })
              } catch (error) {
                  return error
              }
            }  
            });
    }

    return (
      <div>
        <div className="page-header">
          <h3 className="page-title">
            <span className="page-title-icon bg-gradient-primary text-white mr-2">
              <i className="mdi mdi-account-multiple"></i>
            </span> Hire Us </h3>
          <nav aria-label="breadcrumb">
            <ul className="breadcrumb">
              <li className="breadcrumb-item active" aria-current="page">
              <Link to="/addhireus" className="btn btn-gradient-primary btn-fw">Add Hireus </Link>
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
                        <th> Profile </th>
                        <th> Name </th>
                        <th> Designation </th>
                        <th> Status </th>
                        <th> Last Update </th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {HireList.length > 0 ? 
                    HireList.map(item => 
                      <tr key={item._id}>
                        <td><img style={{'borderRadius':'1% !important'}} src={`${IMAGE_URL}/${item.profileImage}`} className="mr-2" alt="face" /> </td>
                        <td> {item.name} </td>
                        <td> {item.designation} </td>
                        <td><label className={`badge badge-gradient-${item.status == 'Active' ? 'success' : 'danger'}`} onClick={() => ChangeStatus(item.status, item._id)} style={{'cursor':'pointer'}}>{`${item.status == 'Active' ? 'Open' : 'Close'}`}</label></td>
                        <td> {formatDate(item.updatedAt)} </td>
                        <td> 
                        <Link className='badge badge-gradient-primary' style={{'border':'none'}} to={{
                              pathname: `/hireusdetails/${item._id}`,
                              state: {
                                item
                              }}}>View</Link> &nbsp;
                            <Link className='badge badge-gradient-success' style={{'border':'none'}} to={{
                              pathname: `/addhireus/${item._id}`,
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

export default Hireus;