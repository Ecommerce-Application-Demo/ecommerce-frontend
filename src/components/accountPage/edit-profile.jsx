import React, { useState, useEffect } from "react";
import InputField from "../../small-components/InputField";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import profileThunk from "../../api/asyncThunk/profileAsyncThnuk";
import LoadingScreen from "../../small-components/Loading-screen";
import { GreenTick } from "../../assets/icons";
import classNames from "classnames";
import { resetPasswordVerification } from "../../redux/Slices/profileSlice";
import { toast } from "react-toastify";
import OtpVerificationModal from "../../modals/OtpVerificationModal";
import tags from "../../metaTag/dynamicTags";
import { setUnauthorizedError } from "../../redux/Slices/errorSlice";
import UnauthorizedComponent from "../../error/UnauthorizedError";
import { Navigate, useNavigate } from "react-router-dom";
import AccountManagement from "./account-management";
import { authenticateErrorHandler } from "../../api/utilities/helper";
import { resetUserDetails } from "../../redux/Slices/userSlice";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profileDetails = useSelector((state) => state.profile);
  const errorAuthorized = useSelector((state) => state.error?.unAuthorizedError);
  const { viewProfile, validatePassword, editProfile, changePassword } = profileThunk;

  const { profile, isProfileLoading, isVerifiedPassword, isPasswordLoading } = profileDetails;

  const [formData, setFormData] = useState({
    name: profile?.name,
    phoneNumber: profile?.phoneNumber,
    email: profile?.email,
    gender: profile?.gender,
    currentPassword: "",
    newPassword: "",
    firstName: "",
    lastName: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    gender: "",
    currentPassword: "",
    newPassword: "",
  });

  const [containsNumber, setContainsNumber] = useState(false);
  const [containsUppercase, setContainsUppercase] = useState(false);
  const [containsLowercase, setContainsLowercase] = useState(false);
  const [containsSpecial, setContainsSpecial] = useState(false);
  const [clickForgotPassword, setClickForgotPassword] = useState(false);
  const [clickVerifyEmail, setClickVerifyEmail] = useState(false);
  const [validateOtpEmailChange, setValidateOtpEmailChange] = useState(false);
  const [validateOtpForgotPassword, setValidateOtpForgotPassword] = useState(false);

  useEffect(() => {
    dispatch(viewProfile())
      .unwrap((res) => {
        console.log();
      })
      .then((data) => {
        const nameArray = (data?.name || "").split(" ");
        const firstName = nameArray && nameArray.length > 0 ? nameArray[0] : "";
        const lastName = nameArray && nameArray.length > 1 ? nameArray[1] : "";

        setFormData({
          name: data?.name,
          phoneNumber: data?.phoneNumber,
          email: data?.email,
          gender: data?.gender,
          firstName: firstName,
          lastName: lastName,
        });
      })
      .catch((error) => {
         authenticateErrorHandler(dispatch, error);
        if (error?.message === "Invalid or missing JWT token" || error?.message !== "Unauthorized") {
          dispatch(setUnauthorizedError("UNAUTHORIZED"));
        }
      });
  }, [dispatch, viewProfile]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = value;

    if (type === "checkbox") {
      newValue = checked;
    } else if (name === "name") {
      // Split the full name into first name and last name
      const nameArray = value.split(" ");
      const firstName = nameArray[0] || "";
      const lastName = nameArray.slice(1).join(" ") || "";

      setFormData((prevData) => ({
        ...prevData,
        name: `${firstName} ${lastName}`,
        firstName: firstName,
        lastName: lastName,
      }));
    } else if (name === "firstName" || name === "lastName") {
      const otherName = name === "firstName" ? "lastName" : "firstName";
      const otherValue = formData[otherName];
      const updatedName = name === "firstName" ? `${value} ${otherValue}` : `${otherValue} ${value}`;

      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        name: updatedName, // Concatenate with the other name field
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: newValue,
      }));

      if (name === "newPassword") {
        setContainsLowercase(/^(?=.*[a-z])/.test(value));
        setContainsNumber(/\d/.test(value));
        setContainsUppercase(/^(?=.*[A-Z])/.test(value));
        setContainsSpecial(/^(?=.*[\W_])/.test(value));
      }
    }

    yup
      .reach(validationSchemaForProfile, name)
      .validate(value)
      .then(() => {
        setErrors((prevError) => ({
          ...prevError,
          [name]: "",
        }));
      })
      .catch((error) => {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: error.message,
        }));
      });

    if (name === "gender") {
      handleGenderSelection(value);
    }
  };

  const handleGenderSelection = (selectedGender) => {
    setFormData((prevData) => ({
      ...prevData,
      gender: selectedGender,
    }));
  };

  const handleValidatePassword = () => {
    console.log("hii");
    const dataForDispatch = {
      input: formData.currentPassword,
    };
    dispatch(validatePassword(dataForDispatch))
      .unwrap()
      .then((res) => {
        if (!res) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            newPassword: "Incorrect password. Please try again.",
          }));
        } else {
          toast.success("Verified");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleVerifyEmail = () => {
    setClickVerifyEmail(true);
  };
  const handleCancel = () => {
    setFormData((prevData) => ({
      ...prevData,
      currentPassword: "",
      newPassword: "",
    }));
    setErrors({
      name: "",
      phoneNumber: "",
      email: "",
      gender: "",
      currentPassword: "",
      newPassword: "",
    });
    window.history.back();
    dispatch(resetPasswordVerification());
  };

  const handleSaveChange = () => {
    const dataToDispatch = {
      userId: profile?.userId,
      email: formData?.email,
      name: formData?.name,
      phoneNumber: formData?.phoneNumber,
      gender: formData?.gender,
    };
    console.log(dataToDispatch);
    dispatch(editProfile(dataToDispatch))
      .unwrap()
      .then((response) => {
        console.log("Profile edited successfully");
        toast.success("Profile edited successfully");
        window.history.back();
      })
      .catch((error) => {
        console.error("Error editing profile:", error);
        authenticateErrorHandler(dispatch, error);
        toast.error("Error editing profile");
      });
    console.log(formData.name);
    setFormData((prevData) => ({
      ...prevData,
      currentPassword: "",
      newPassword: "",
    }));
    setErrors({
      name: "",
      phoneNumber: "",
      email: "",
      gender: "",
      currentPassword: "",
      newPassword: "",
    });
    dispatch(resetPasswordVerification());
  };

  const handleForgotPassword = () => {
    setClickForgotPassword(true);
  };

  const verifyBtnStyle = classNames({
    "edit-profile-verify-btn": !isPasswordLoading,
    "edit-profile-verify-btn-disabled": isPasswordLoading,
  });

  const maleSelect = formData.gender === "Male";
  const handleChangePassword = ()=> {
      const changePasswordDispatch = {
        input: formData?.newPassword
      }
      dispatch(changePassword(changePasswordDispatch)).unwrap()
      .then(()=>{
        dispatch(resetUserDetails());
        dispatch(resetUserDetails());
        toast.success('password changes successfully, you have to login again.');
       setTimeout(() => { 
         navigate('/login-signup');
       }, 1000);
      }).catch(error=>{
        console.log(error);
        authenticateErrorHandler(dispatch, error);
        toast.error('error in password changes');
      })
  };

  return (
    <div className="edit-profile-main-container">
      {tags.ProfileTag()}
      {/* {errorAuthorized && <UnauthorizedComponent />} */}
      {isProfileLoading && <LoadingScreen />}
      {(clickForgotPassword || clickVerifyEmail) && (
        <OtpVerificationModal
          clickVerifyEmail={clickVerifyEmail}
          setClickVerifyEmail={setClickVerifyEmail}
          clickForgotPassword={clickForgotPassword}
          setClickForgotPassword={setClickForgotPassword}
          validateOtpEmailChange={validateOtpEmailChange}
          validateOtpForgotPassword={validateOtpForgotPassword}
          setValidateOtpEmailChange={setValidateOtpEmailChange}
          setValidateOtpForgotPassword={setValidateOtpForgotPassword}
        />
      )}
      <div className="edit-profile-details-container">
          <div
              className="profile-info-email"
              label="Email"
              name="email"
              type="text"
              value={formData.email}
              error={errors.email}
              classNameForError="errorMsg">
                {formData.email || '--not added--'}
                <div className="profile-info-email-change">
                  CHANGE
                </div>
                </div>

          <div>
            <InputField
              className="edit-profile-info-input"
              label="First Name"
              name="firstName"
              type="text"
              onChange={handleChange}
              value={formData.firstName}
              error={errors.name}
              classNameForError="errorMsg"
              successFlag={true}
            />
          </div>
          <div>
            <InputField
              className="edit-profile-info-input"
              label="Last Name"
              name="lastName"
              type="text"
              onChange={handleChange}
              value={formData.lastName}
              error={errors.lastName}
              classNameForError="errorMsg"
              successFlag={true}
            />
          </div>
          <div>
            <InputField
              className="edit-profile-info-input"
              label="Phone Number"
              name="phoneNumber"
              type="text"
              maxLength={10}
              onChange={handleChange}
              value={formData.phoneNumber}
              error={errors.phoneNumber}
              classNameForError="errorMsg"
              successFlag={true}
            />
        </div>
        <div className="edit-profile-gender-container">
          <div
            className={classNames({
              "edit-profile-gender-type-container": formData.gender !== "Male",
              "edit-profile-gender-type-container-active": formData.gender === "Male",
            })}
            onClick={() => handleGenderSelection("Male")}
          >
            {maleSelect && <GreenTick height="14" width="14" />} MALE
          </div>
          <div
            className={classNames({
              "edit-profile-gender-type-container": formData.gender !== "Female",
              "edit-profile-gender-type-container-active": formData.gender === "Female",
            })}
            onClick={() => handleGenderSelection("Female")}
          >
            {!maleSelect && <GreenTick height="14" width="14" />} FEMALE
          </div>
        </div>
      </div>
      <div className="edit-profile-saveChanges-container">
        <div className="edit-profile-saveChanges-btn" onClick={handleSaveChange}>
          Save Changes
        </div>
        <div className="edit-profile-cancel-btn" onClick={handleCancel}>
          Cancel
        </div>
      </div>
      <div className="edit-profile-password-container">
        <h3>Password Changes</h3>
        {!isVerifiedPassword && (
          <>
            <div className="edit-profile-password-wrapper">
              <div>
                <InputField
                  type="password"
                  className="edit-profile-password-input"
                  label="Current Password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  error={errors.currentPassword}
                />
              </div>
              <div className={verifyBtnStyle} onClick={handleValidatePassword}>
                VERIFY
              </div>
            </div>
            {isVerifiedPassword !== null && !isVerifiedPassword && (
              <h4 className="edit-profile-forgot-password-text" onClick={handleForgotPassword}>
                Forgot Password?
              </h4>
            )}
          </>
        )}
        {isVerifiedPassword && (
          <>
            <div className="edit-profile-password-wrapper">
              <div>
                <InputField
                  type="password"
                  className="edit-profile-password-input"
                  label="New Password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  error={errors.newPassword}
                />
              </div>
              <div className="edit-profile-verify-btn" onClick={handleChangePassword}>
                Change
              </div>
            </div>
            <div style={{ width: "400px", marginTop: "20px" }}>
              <div className="signupPassword-validation">
                <div className={containsSpecial && "special"}>Special</div>
                <div className={containsNumber && "number"}>1 Number</div>
                <div className={containsUppercase && "uppercase"}>1 Uppercase</div>
                <div className={containsLowercase && "lowercase"}>1 Lowercase</div>
                <div className={formData?.newPassword?.length >= 8 && "charrecters"}>8 Charrecters</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const phoneNumberRegex = /^(?=[6-9])\d{10}$/;
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;

const validationSchemaForProfile = yup.object({
  name: yup.string().required("Name is required").min(5, "Minimum 5 characters required"),
  phoneNumber: yup.string().required("phone number is required").min(10, "only 10 digit required").matches(phoneNumberRegex, "this number is not valid"),
  email: yup.string().required("Email is required").matches(emailRegex, "Enter a valid email address"),
  gender: yup.string(),
  firstName: yup.string(),
  lastName: yup.string(),
  currentPassword: yup.string().min(8, "8 charrecters need"),
  newPassword: yup.string().required("Password is required").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]/, "check all the checkbox"),
});

export default EditProfile;
