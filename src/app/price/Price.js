import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addPricesList } from '../../redux/reducers/webData';
import { DeleteAPi, GetAPi } from '../../services';
import swal from 'sweetalert';
import { API_URL, IMAGE_URL } from '../../baseurl';
 

const Price = () => {
  const dispatch = useDispatch()
  const PricesList = useSelector(state => state.dances.PricesList)

  const priceFun = async () => {
      const responseData = await GetAPi('getPricesList')
      if(responseData.success) {
          dispatch(addPricesList(responseData.priceslist))
      }
  }

  useEffect(() => {
    priceFun()
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
              fetch(`${API_URL}/deletePrices`,{
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
                  priceFun()
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
            </span> Price </h3>
          <nav aria-label="breadcrumb">
            <ul className="breadcrumb">
              <li className="breadcrumb-item active" aria-current="page">
              <Link to="/addprice" className="btn btn-gradient-primary btn-fw">Add Price </Link>
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
                        <th> Subtitle </th>
                        <th> Price </th>
                        <th> Last Update </th>
                        <th> Action </th>
                      </tr>
                    </thead>
                    <tbody>
                    {PricesList.length > 0 ? 
                    PricesList.map(item => 
                      <tr key={item._id}>
                        <td> {item.title} </td>
                        <td> {item.subtitle} </td>
                        <td> ₹{item.price} </td>
                        <td> {formatDate(item.updatedAt)} </td>
                        <td> 
                            <Link className='badge badge-gradient-success' style={{'border':'none'}} to={{
                              pathname: `/addprice/${item._id}`,
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

export default Price;