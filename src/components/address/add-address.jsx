import React, { useEffect, useState, useRef } from "react";
import Modal from "../../small-components/Modal-global";
import InputField from "../../small-components/InputField";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import addressThunk from "../../api/asyncThunk/addressAsyncThunk";
import { getPincode } from "../../api/services/pincodeService";
import { toast } from "react-toastify";
import { authenticateErrorHandler } from "../../api/utilities/helper";
import { useNavigate } from "react-router-dom";

const AddAddress = (props) => {
  const { setShowAddModal } = props;
  const addressData = useSelector((state) => state.address);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const firstDefault =
    addressData.address === "No Address registered." ||
    addressData.address.length === 0;
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    pincode: "",
    state: "",
    address: "",
    locality: "",
    city: "",
    addressType: "",
    isDefault: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    phoneNumber: "",
    pincode: "",
    state: "",
    address: "",
    locality: "",
    city: "",
    addressType: "",
  });

  const [allLocality, setAllLocality] = useState([]);
  const [selectedLocalityIndex, setSelectedLocalityIndex] = useState(0);
  const [otherLocality, setOtherLocality] = useState("");
  const [isLocalityDropdownOpen, setIsLocalityDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const { addAddress } = addressThunk;
  const { error } = addressData;

  useEffect(() => {
    if (formData.pincode.length === 6) {
      getPincode(formData.pincode)
        .then((res) => {
          if (res?.state) {
            setAllLocality(res?.locality);
            if (!otherLocality) {
              setFormData((prevData) => ({
                ...prevData,
                locality: res?.locality[0],
              }));
            }

            setFormData((prevData) => ({
              ...prevData,
              state: res.state,
              city: res.district,
            }));
          } else {
            setAllLocality([]);
            setErrors((prevError) => ({
              ...prevError,
              pincode: res.message,
            }));
          }
        })
        .catch((error) => {
          console.error("Error fetching state:", error);
        });
    }
  }, [formData.pincode, otherLocality]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsLocalityDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (firstDefault) {
      setFormData((prevData) => ({
        ...prevData,
        isDefault: true,
      }));
    }
  }, [firstDefault]);

  const handleOtherLocality = (e) => {
    setOtherLocality(e.target.value);
    setSelectedLocalityIndex(-1); 
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));

    if (name === "otherLocality") {
      setSelectedLocalityIndex(-1);
    }

    yup
      .reach(validationSchemaForAddAddress, name)
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
  };

  const handleConfirmLocality = () => {
    if (allLocality.length > 0 || otherLocality.length > 0) {
      if (selectedLocalityIndex !== -1) {
        setFormData((prevData) => ({
          ...prevData,
          locality: allLocality[selectedLocalityIndex],
        }));
      } else if (otherLocality) {
        setFormData((prevData) => ({
          ...prevData,
          locality: otherLocality,
        }));
      }
    }
    setIsLocalityDropdownOpen(false);
  };

  const onClose = () => {
    setIsLocalityDropdownOpen(false);
    setShowAddModal(false);
  };

  const handleLocalityClick = () => {
    setIsLocalityDropdownOpen(!isLocalityDropdownOpen);
  };

  const handleLocalitySelect = (index) => {
    setSelectedLocalityIndex(index);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (errors.pincode) {
      return;
    }
    validationSchemaForAddAddress
      .validate(formData, { abortEarly: false })
      .then(() => {
        const dataForDispatch = {
          name: formData.name,
          phoneNumber: formData.phoneNumber,
          addressLine1: formData.address,
          pincode: formData.pincode,
          state: formData.state,
          locality: formData.locality,
          city: formData.city,
          addressType: formData.addressType,
          default: formData.isDefault,
        };
        dispatch(addAddress(dataForDispatch)).unwrap().then(() => {
          toast.success("address added successfully");
          setShowAddModal(false);
        }).catch((error)=>{
          if (error?.name === 'CustomError') {
            navigate('/login-signup')
            authenticateErrorHandler(dispatch, error);
          } else toast.error('an error occured.')
        })
      })
      .catch((validationErrors) => {
        const newErrors = {};
        validationErrors.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
        toast.error("please fill the required field");
      });
  };
  return (
    <Modal
      width="500px"
      title="Add Address"
      onClose={onClose}
      height="500px"
      heightForMobile='400px'
      widthForMobile='100%'
      footer={
        <div className="addAddress-btn-footer">
          <div onClick={handleSubmit} style={addressData.isAddressLoading ? {cursor:"not-allowed", backgroundColor:'grey'} : {}}>Save</div>
          <div style={{ backgroundColor: "grey" }} onClick={onClose}>
            Cancel
          </div>
        </div>
      }
    >
      <div className="addAddress-main-container">
        <InputField
          label="Name"
          name="name"
          type="text"
          onChange={handleChange}
          value={formData.name}
          error={errors.name}
        />
        <InputField
          label="Phone No."
          name="phoneNumber"
          type="text"
          maxLength={10}
          onChange={handleChange}
          value={formData.phoneNumber}
          error={errors.phoneNumber}
        />
        <div className="addAdress-pincode-wrapper">
          <div>
          <InputField
            label="Pincode"
            name="pincode"
            type="text"
            onChange={handleChange}
            value={formData.pincode}
            error={errors.pincode}
            maxLength={6}
            className='inputPincode'
            classNameForError="error"
          />
          </div>
          <div>
          <InputField
            label="State"
            disabled={true}
            name="state"
            type="text"
            onChange={handleChange}
            value={formData.state}
            error={errors.state}
            className='inputPincode'
          />
          </div>
        </div>
        <InputField
          label="Address"
          name="address"
          type="text"
          onChange={handleChange}
          value={formData.address}
          error={errors.address}
        />
        <div onClick={handleLocalityClick} className="loyality-main-wrapper">
          <InputField
            label="Locality/Town"
            name="locality"
            type="text"
            value={formData.locality}
            error={errors.locality}
            readOnly={true}
          />
          {isLocalityDropdownOpen && (
            <div
              className="address-locality-dropdown"
              ref={dropdownRef}
              onClick={(e) => e.stopPropagation()}
            >
              <h4>Locality Selection</h4>
              <div className="address-locality-mapFunc">
                {allLocality.map((option, index) => (
                  <div key={index}>
                    <label>
                      <input
                        type="radio"
                        checked={index === selectedLocalityIndex}
                        onChange={() => handleLocalitySelect(index)}
                      />
                      <span>{option}</span>
                    </label>
                  </div>
                ))}
              </div>
              <InputField
                label="Others"
                name="otherLocality"
                type="text"
                value={otherLocality}
                onChange={handleOtherLocality}
              />
              <div className="btn-wrapper">
                <button onClick={handleConfirmLocality} className="confirm-btn">
                  Confirm
                </button>
                <button
                  onClick={() => setIsLocalityDropdownOpen(false)}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
        <InputField
          label="City/District"
          name="city"
          type="text"
          onChange={handleChange}
          value={formData.city}
          error={errors.city}
          disabled={true}
        />
        <div className="addAddress-type">
          <p>Type Of Address</p>
          <div>
            <label>
              <input
                type="radio"
                value="HOME"
                name="addressType"
                checked={formData.addressType === "HOME"}
                error={errors.addressType}
                onChange={handleChange}
              />
              <span>HOME</span>
            </label>
            <label>
              <input
                type="radio"
                value="OFFICE"
                name="addressType"
                checked={formData.addressType === "OFFICE"}
                error={errors.addressType}
                onChange={handleChange}
              />
              <span>OFFICE</span>
            </label>
          </div>
          {errors.addressType && (
            <p style={{ color: "red" }}>{errors.addressType}</p>
          )}
        </div>
        <label className="addAddress-Default-address">
          <input
            type="checkbox"
            name="isDefault"
            checked={formData.isDefault}
            disabled={firstDefault}
            onChange={handleChange}
          />
          <p>Make this as my default address</p>
        </label>
      </div>
    </Modal>
  );
};
const phoneNumberRegex = /^(?=[6-9])\d{10}$/;

const validationSchemaForAddAddress = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(5, "Minimum 5 characters required"),
  phoneNumber: yup
    .string()
    .required("phone number is required")
    .min(10, "only 10 digit required")
    .matches(phoneNumberRegex, "this number is not valid"),
  pincode: yup
    .string()
    .required("Pincode is required")
    .matches(/^.{6}$/, "6 characters required"),
  state: yup.string(),
  address: yup
    .string()
    .required("Address is required")
    .min(5, "Minimum 5 characters required"),
  locality: yup.string(),
  city: yup.string(),
  addressType: yup.string().required("it is required"),
  isDefault: yup.bool(),
});

export default AddAddress;
