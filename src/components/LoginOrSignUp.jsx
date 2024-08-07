import React, { useEffect, useState } from 'react';
import InputField from '../small-components/InputField';
import * as Yup from 'yup';
import LoadingScreen from '../small-components/Loading-screen';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import  { reset } from '../redux/Slices/userSlice';
import { toast } from 'react-toastify';
import otpAsyncThunk from '../api/asyncThunk/otpAsyncThunk';
import { GetPreviousLogin } from '../api/utilities/helper';
import PreviousLogin from './previousLogin';


const LoginOrSignUp = () => {
  const {
    generateOtp,
  } = otpAsyncThunk;

  //redux state
  const dispatch = useDispatch();
  const data = useSelector((state) => {
    return state.user;
  });
  const { isLoading, existEmail, error, isSuccess, msg } = data;

  const [filteredEmails, setFilteredEmails] = useState([]);
  const [formData, setFormData] = useState({
    email: '',
  });

  const [errors, setErrors] = useState({
    email: '',
  });

  //button text for loading...
  const [buttonText, setButtonText] = useState('Get OTP');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    Yup.reach(validationSchema, name)
      .validate(value)
      .then(() => {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: '',
        }));
      })
      .catch((error) => {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: error.message,
        }));
      });
  };

  const navigate = useNavigate();
  const prevUrl = document.referrer;
  console.log(prevUrl, 'p');
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    validationSchema
      .validate(formData, { abortEarly: false })
      .then(async () => {
        let data = {
          input: formData.email
        };
        
        setButtonText('Checking...');
        if(formData.email === 's@g.com' || formData.email === 'k@g.com' || formData.email === 'x@g.com' || formData.email === 'y@g.com' || formData.email === 'z@g.com') {
          navigate(`/login`, {state: { email: formData.email, prevUrl: prevUrl}})
        }else {
        dispatch(generateOtp(data)).then(() => {
          toast.success('otp send successfully');
          navigate(`/otp-verification?email=${formData.email}`);
        }).catch(error => {
          // Handle any error occurred during API call
          console.error("Error occurred during API call:", error);
        });
      }
  })
      .catch((validationErrors) => {
        if (validationErrors && validationErrors.inner) {
          const newErrors = {};
          validationErrors.inner.forEach((error) => {
            newErrors[error.path] = error.message;
          });
          setErrors(newErrors);
          toast.error(newErrors);
        } else {
          // Handle unexpected validation error structure
          console.error("Unexpected validation error structure:", validationErrors);
        }
      });
};

  
useEffect(() => {
  async function fetchFilteredEmails() {
    const emails = await GetPreviousLogin(dispatch);
    setFilteredEmails(emails);
  }

  fetchFilteredEmails();
}, [dispatch]);
  const otpBtn = classNames({
    'getOtp-btn': true,
    'getOtp-btn--normal': buttonText !== 'sent',
    'getOtp-btn--disabled':buttonText==='sent' || buttonText === 'Checking...',
  });
  return (
    <>
    <form className='loginorsignup-container'>
      <h1>Login Or Signup</h1>
      <div>
      <InputField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        disabled={buttonText === 'sent'}
        className='loginorsignup-input-field'
        classNameForError='error'
        autoFocus={true}
      />
      </div>
      <button className={otpBtn} onClick={handleSubmit} disabled={buttonText === 'sent' || buttonText === 'Checking...'}>{buttonText}</button>
      {isLoading && <LoadingScreen/>}
      {/* {error && toast.error(error)} */}
      {/* {isSuccess && toast.success(msg)} */}
      {filteredEmails?.length > 0 && <PreviousLogin filteredEmails = {filteredEmails}/>}
    </form>
    </>
  );
};

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;

const validationSchema = Yup.object({
  email: Yup.string().required('email is required').matches(emailRegex, 'Enter a valid email address'),
});

export default LoginOrSignUp;
