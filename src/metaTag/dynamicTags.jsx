import React from "react";
import {Helmet} from "react-helmet";
import { useSelector } from "react-redux";
 
const HomeTag = () =>{
    return (
        <div className="application">
            <Helmet>
                <meta charSet="utf-8" />
              <title>Desi Cart | Home</title>
            </Helmet>
            ...
        </div>
    );
};

const AddressTag = () =>{
    const user = useSelector(state=>state.user.loggedInUserName);


    return (
        <div className="application">
            <Helmet>
                <meta charSet="utf-8" />
                <title>{user.toUpperCase()} | Address</title>
            </Helmet>
            ...
        </div>
    );
};

const ProfileTag = () =>{
    const user = useSelector(state=>state.user.loggedInUserName);

    return (
        <div className="application">
            <Helmet>
                <meta charSet="utf-8" />
                <title>{user} | Profile</title>
            </Helmet>
            ...
        </div>
    );
};


const tags = {
    HomeTag,
    AddressTag,
    ProfileTag,
}

export default tags;