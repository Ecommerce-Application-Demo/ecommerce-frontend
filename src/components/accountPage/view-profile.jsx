import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import profileThunk from "../../api/asyncThunk/profileAsyncThnuk";
import LoadingScreen from "../../small-components/Loading-screen";
import { GreenTick } from "../../assets/icons";
import classNames from "classnames";
import { resetPasswordVerification } from "../../redux/Slices/profileSlice";
import { toast } from "react-toastify";
import OtpVerificationModal from "../../modals/OtpVerificationModal";
import { setUnauthorizedError } from "../../redux/Slices/errorSlice";
import { authenticateErrorHandler } from "../../api/utilities/helper";

const ViewProfile = () => {
  const dispatch = useDispatch();
  const profileDetails = useSelector((state) => state.profile);
//   const errorAuthorized = useSelector((state) => state.error?.unAuthorizedError);
  const { viewProfile, validatePassword } = profileThunk;

  const { profile, isProfileLoading, isVerifiedPassword, isPasswordLoading } = profileDetails;


  useEffect(() => {
    dispatch(viewProfile())
      .unwrap((res) => {})
      .then((data) => {})
      .catch((error) => {
        console.log(error,'viewProfile');
        authenticateErrorHandler(dispatch, error);
      });
  }, [dispatch, viewProfile]);


  return (
    <div className= 'profile-background-details-container'>
      <div className="profile-details-container">
            {isProfileLoading && <LoadingScreen />}
          <div className="profile-info-wrapper">
            <div className="profile-info-label">Full Name</div>
            <div className='profile-info-divider'></div>
            <div className="profile-info-value">{profile?.name || '--Not Added--'}</div>
          </div>
          <div className="profile-info-wrapper">
            <div className="profile-info-label">Email</div>
            <div className='profile-info-divider'></div>
            <div className="profile-info-value">{profile?.email || '--Not Added--'}</div>
          </div>
          <div className="profile-info-wrapper">
            <div className="profile-info-label">Phone Number</div>
            <div className='profile-info-divider'></div>
            <div className="profile-info-value">{profile?.phoneNumber || '--Not Added--'}</div>
          </div>
          <div className="profile-info-wrapper">
            <div className="profile-info-label">Gender</div>
            <div className='profile-info-divider'></div>
            <div className="profile-info-value">{profile?.gender || '--Not Added--'}</div>
          </div>
      </div>
    </div>
  );
};

// const phoneNumberRegex = /^(?=[6-9])\d{10}$/;
// const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;

// const validationSchemaForProfile = yup.object({
//   name: yup
//     .string()
//     .required("Name is required")
//     .min(5, "Minimum 5 characters required"),
//   phoneNumber: yup
//     .string()
//     .required("Phone number is required")
//     .min(10, "Only 10 digits required")
//     .matches(phoneNumberRegex, "This number is not valid"),
//   email: yup
//     .string()
//     .required("Email is required")
//     .matches(emailRegex, "Enter a valid email address"),
//   gender: yup.string(),
// });

export default ViewProfile;
