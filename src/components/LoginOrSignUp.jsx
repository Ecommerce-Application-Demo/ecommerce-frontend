import React, { useEffect, useState } from 'react';
import InputField from '../small-components/InputField';
import * as Yup from 'yup';
import LoadingScreen from '../small-components/Loading-screen';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import  { reset } from '../redux/Slices/userSlice';
import userApi from '../api/asyncThunk/userApi';
import { toast } from 'react-toastify';


const LoginOrSignUp = () => {
  const {
    isEmailExist,
  } = userApi;

  //redux state
  const dispatch = useDispatch();
  const data = useSelector((state) => {
    return state.user;
  });
  const { isLoading, existEmail, error, isSuccess,msg } = data;


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

  useEffect(() => {
    if (isLoading) {
      setButtonText('Checking...');
      // toast.info('Checking..');
    }
    if (!existEmail && isSuccess) {
      navigate('/signup', { state: { id: formData.email } });
      console.log('signup');
      setTimeout(() => {
        dispatch(reset());
      }, 5000);
    } else if (existEmail && isSuccess) {
      navigate('/login', { state: { id: formData.email } });
      console.log('login');
      setTimeout(() => {
        dispatch(reset());
      }, 5000);
    }
  }, [existEmail, isSuccess, isLoading,msg,dispatch,formData.email,navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    validationSchema
      .validate(formData, { abortEarly: false })
      .then(async () => {
        let data = {
          input: formData.email
        };
  
        setButtonText('Checking...');
        
          dispatch(isEmailExist(data)).then(()=>{
            setButtonText('Get OTP'); 
          })
      })
      .catch((validationErrors) => {
        const newErrors = {};
        validationErrors.inner.forEach((error) => {
          newErrors[error.path] = error.message;
          toast.error(error.message);
        });
        setErrors(newErrors);
      });
  };
  

  const otpBtn = classNames({
    'getOtp-btn': true,
    'getOtp-btn--normal': buttonText !== 'sent',
    // 'getOtp-btn--disabled':buttonText==='sent',
  });

  return (
    <div className='loginorsignup-container'>
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
      />
      </div>
      <button className={otpBtn} onClick={handleSubmit} disabled={buttonText === 'sent'}>{buttonText}</button>
      {isLoading && <LoadingScreen/>}
      {error && toast.error(error)}
      {isSuccess && toast.success(msg)}

    </div>
  );
};

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;

const validationSchema = Yup.object({
  email: Yup.string().required('email is required').matches(emailRegex, 'Enter a valid email address'),
});

export default LoginOrSignUp;
