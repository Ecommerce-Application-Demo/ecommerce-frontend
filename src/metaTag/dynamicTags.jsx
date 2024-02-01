import React from "react";
import {Helmet} from "react-helmet";
 
const homeTag = () =>{
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

const tags = {
    homeTag,
}

export default tags;