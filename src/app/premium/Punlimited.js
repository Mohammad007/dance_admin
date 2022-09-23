import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addPremiumData } from '../../redux/reducers/webData';
import { DeleteAPi, GetAPi } from '../../services';
import swal from 'sweetalert';
import { API_URL, IMAGE_URL } from '../../baseurl';
 

const Punlimited = () => {
  const dispatch = useDispatch()
  const premiumDatalist = useSelector(state => state.dances.premiumDatalist)

  const premiumFun = async () => {
      const responseData = await GetAPi('premiumData')
      if(responseData.success) {
          dispatch(addPremiumData(responseData.premiumlist))
      }
  }

  useEffect(() => {
    premiumFun()
  },[])

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
              fetch(`${API_URL}/premiumDelete`,{
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
                  premiumFun()
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

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
}

    return (
      <div>

        <div className="page-header">
          <h3 className="page-title">
            <span className="page-title-icon bg-gradient-primary text-white mr-2">
              <i className="mdi mdi-bank"></i>
            </span> Premium Unlimited </h3>
          <nav aria-label="breadcrumb">
            <ul className="breadcrumb">
              <li className="breadcrumb-item active" aria-current="page">
              <Link to="/premiumadd" className="btn btn-gradient-primary btn-fw">Add Data</Link>
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
                        <th> Title </th>
                        <th> Content </th>
                        <th> Last Update </th>
                        <th> Action </th>
                      </tr>
                    </thead>
                    <tbody>
                    {premiumDatalist.length > 0 ? 
                    premiumDatalist.map(item => 
                      <tr key={item._id}>
                        <td>
                          <p>{item.title}</p>
                        </td>
                        <td> {item.content} </td>
                        <td>
                          <p>{formatDate(item.updatedAt)}</p>
                        </td>
                        <td> 
                        <Link className='badge badge-gradient-success' style={{'border':'none'}} to={{
                              pathname: `/Premiumadd/${item._id}`,
                              state: {
                                item
                              }
                            }} >Edit</Link>&nbsp;
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

export default Punlimited;