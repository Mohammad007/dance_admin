import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { IMAGE_URL } from '../../baseurl';
import { addBanners } from '../../redux/reducers/webData';
import { DeleteAPi, GetAPi } from '../../services';
import swal from 'sweetalert';

const Banners = () => {
    const dispatch = useDispatch()
    const bannerslist = useSelector(state => state.dances.banners)

    const bannerFun = async () => {
        const responseData = await GetAPi('getAllBanner')
        if(responseData.success) {
            dispatch(addBanners(responseData.banners))
        }
    }

    useEffect(() => {
        bannerFun()
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
              DeleteAPi('deleteBanner',id)
              .then(responseData => {
              if(responseData.success) {
                bannerFun()
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

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    return (
      <div>
        <div className="page-header">
          <h3 className="page-title">
            <span className="page-title-icon bg-gradient-primary text-white mr-2">
              <i className="mdi mdi-image"></i>
            </span> Banners list </h3>
          <nav aria-label="breadcrumb">
            <ul className="breadcrumb">
              <li className="breadcrumb-item active" aria-current="page">
              <Link to="/addbanner" className="btn btn-gradient-primary btn-fw">Add Banners </Link>
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
                        <th> Image </th>
                        <th> Url </th>
                        <th> Status </th>
                        <th> Last Update </th>
                        <th> Action </th>
                      </tr>
                    </thead>
                    <tbody>
                    {bannerslist.length > 0 ? 
                    bannerslist.map(item => 
                      <tr key={item._id}>
                        <td>
                          <img style={{'borderRadius':'1% !important'}} src={`${IMAGE_URL}/${item.image}`} className="mr-2" alt="face" /> </td>
                        <td> {item.url} </td>
                        <td>
                          <Button className="badge badge-gradient-success" style={{'border':'none'}}>{item.active ? 'Active' : 'Inactive'}</Button>
                        </td>
                        <td> {formatDate(item.updatedAt)} </td>
                        <td> 
                            <Link className='badge badge-gradient-success' style={{'border':'none'}} to={{
                              pathname: `/addbanner/${item._id}`,
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

export default Banners;