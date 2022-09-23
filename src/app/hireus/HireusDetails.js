import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { IMAGE_URL } from "../../baseurl";

const HireusDetails = () => {
    const data = useLocation()

  return (
    <div>
        <div className="page-header">
            <h3 className="page-title">
                <span className="page-title-icon bg-gradient-primary text-white mr-2">
                    <i className="mdi mdi-shopping-music" />
                </span>
                {data?.state?.item?.name}
            </h3>
        </div>

        <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div className="card">
                   <div className="row">
                    {data?.state?.item?.imagelist?.map(item => 
                   <div className="col m-3" key={item}>
                        <img src={`${IMAGE_URL}/${item}`} className="mr-2" width="100" height="100" alt="user" style={{borderRadius:'2px'}} />
                    </div>
                    )}
                   </div>
                </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div className="card">
                        <div className="card-body">
                        <div className="row">
                            <div className="col-md-6">
                            <img src={`${IMAGE_URL}/${data?.state?.item?.profileImage}`} className="mr-2" width="100" height="100" alt="user" />
                            </div>
                            <div className="col-md-6">
                            <img src={`${IMAGE_URL}/${data?.state?.item?.footerImage}`} className="mr-2" width="100" height="100" alt="user" />
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-md-5">
                                <h4 className="card-title">Name :- </h4>
                            </div>
                            <div className="col-md-7">
                                <p className="card-description text-left"> {data?.state?.item?.name} </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-5">
                                <h4 className="card-title">Designation :- </h4>
                            </div>
                            <div className="col-md-7">
                                <p className="card-description text-left"> {data?.state?.item?.designation} </p>
                            </div>
                        </div>
                        </div>
                        <div className="card-body">
                            <h4 className="card-title">About</h4>
                            <p className="lead">{data?.state?.item?.about}</p>
                        </div>
                    </div>
                </div>
        </div>
    </div>
  );
};

export default HireusDetails;