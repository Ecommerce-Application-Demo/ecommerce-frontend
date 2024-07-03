import React from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { DesiCartIcon } from "../assets/icons";

const HomeTag = () => {
  return (
    <div className="application">
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0 user-scalable=no" />
        <title>Desi Cart | Home</title>
      </Helmet>
    </div>
  );
};

const AddressTag = () => {
  const user = useSelector(state => state.user.loggedInUserName);


  return (
    <div className="application">
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0 user-scalable=no" />
        <title>{user.toUpperCase()} | Address</title>
      </Helmet>
    </div>
  );
};

const ProfileTag = () => {
  const user = useSelector(state => state.user.loggedInUserName);

  return (
    <div className="application">
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0 user-scalable=no" />
        <title>{user} | Profile</title>

      </Helmet>
    </div>
  );
};

const SingleProductTag = (product) => {
  console.log(product);
  return (
    <div className="application">
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0 user-scalable=no" />
        <meta property="og:url" content={`https://desicart.vercel.app`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${product.styleName} at DesiCart.`} />
        <meta property="og:description" content={'product.productDescription'} />
        <meta property="og:image" content="https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/21496840/2023/3/27/08c78085-82bf-460d-84fd-9ba7fb197ed21679912533908-ADIDAS-Men-Tshirts-4331679912533375-1.jpg" />
        <meta property="image" content={product?.defaultImage ? product?.defaultImage : 'default-image-url'} />
        <meta
          name="description"
          content="ecommerce website"
        />
        <meta property="title" content={`at DesiCart.`} />
        <title>{product.styleName} at DesiCart</title>
      </Helmet>
    </div>
  );
};

const tags = {
  HomeTag,
  AddressTag,
  ProfileTag,
  SingleProductTag,
}

export default tags;