import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMAGE_URL } from "../../baseurl";
import { GetAPi, PostAPi } from "../../services";

const StudioDetails = () => {
    const [studio,setStudio] = useState(null)
    let { id } = useParams();

    const studioFun = async () => {
        const data = {
            id:id
        }
        const responseData = await PostAPi('getAllStudios',data)
        if(responseData.success) {
            setStudio(responseData.studios)
        }
    }

    useEffect(()=> {
        studioFun()
    },[])

  return (
    <div>
        <div className="page-header">
            <h3 className="page-title">
                <span className="page-title-icon bg-gradient-primary text-white mr-2">
                    <i className="mdi mdi-shopping-music" />
                </span>{" "}
                {studio?.studioName}{" "}
            </h3>
        </div>

        <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div className="card">
                   <div className="row">
                    {studio?.images.map(item => 
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
                            <div className="col-md-5">
                                <h4 className="card-title">Studio Name :- </h4>
                            </div>
                            <div className="col-md-7">
                                <p className="card-description text-left"> {studio?.studioName} </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-5">
                                <h4 className="card-title">Category :- </h4>
                            </div>
                            <div className="col-md-7">
                                <p className="card-description text-left"> {studio?.category} </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-5">
                                <h4 className="card-title">Address :- </h4>
                            </div>
                            <div className="col-md-7">
                                <p className="card-description text-left"> {studio?.address} </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-5">
                                <h4 className="card-title">City :- </h4>
                            </div>
                            <div className="col-md-7">
                                <p className="card-description text-left"> {studio?.city} </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-5">
                                <h4 className="card-title">State :- </h4>
                            </div>
                            <div className="col-md-7">
                                <p className="card-description text-left"> {studio?.state} </p>
                            </div>
                        </div>
                        </div>
                        <div className="card-body">
                            <h4 className="card-title">Description</h4>
                            <p className="lead">{studio?.description}</p>
                        </div>
                    </div>
                </div>
        </div>
    </div>
  );
};

export default StudioDetails;