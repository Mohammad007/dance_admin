import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { addContact } from '../../redux/reducers/webData';
import { DeleteAPi, GetAPi } from '../../services';
import swal from 'sweetalert';
 

const Contacts = () => {
  const dispatch = useDispatch()
  const contactslist = useSelector(state => state.dances.contactslist)

  const contactFun = async () => {
      const responseData = await GetAPi('getAllContact')
      if(responseData.success) {
          dispatch(addContact(responseData.contacts))
      }
  }

  useEffect(() => {
    contactFun()
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
            DeleteAPi('deleteContact',id)
            .then(responseData => {
            if(responseData.success) {
              contactFun()
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
              <i className="mdi mdi-bank"></i>
            </span> Contacts list </h3>
          <nav aria-label="breadcrumb">
            <ul className="breadcrumb">
              <li className="breadcrumb-item active" aria-current="page">
              {/* <Link to="/addcities" className="btn btn-gradient-primary btn-fw">Add City </Link> */}
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
                        <th> Name </th>
                        <th> Last Update </th>
                        <th> Action </th>
                      </tr>
                    </thead>
                    <tbody>
                    {contactslist.length > 0 ? 
                    contactslist.map(item => 
                      <tr key={item._id}>
                        <td> {item.mobile} </td>
                        <td> {item.msg} </td>
                        <td> {formatDate(item.updatedAt)} </td>
                        <td> 
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

export default Contacts;