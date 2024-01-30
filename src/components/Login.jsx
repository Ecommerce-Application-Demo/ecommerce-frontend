import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import InputField from '../small-components/InputField';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import userApi from '../api/asyncThunk/userApi';
import { toast } from 'react-toastify';
import LoadingScreen from '../small-components/Loading-screen';

const Login = () => {
  const { login } = userApi;
  const dispatch = useDispatch();
  const data = useSelector((state) => state.user);

  const {
    msg,
    isSuccess,
    isLoggedIn,
    error,
    isLoading,
  } = data;

  const location = useLocation();
  const { id } = location.state || {};
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: '',
    email: id ? id : '',
  });

  const [errors, setErrors] = useState({
    password: '',
    email: '',
  });

  useEffect(() => {
    if (msg && isLoggedIn) {
      navigate('/');
    }
  }, [msg, isLoggedIn, error, isLoading,navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update form data
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear error state
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));

    // Validation
    Yup.reach(validationSchema, name)
      .validate(value)
      .catch((error) => {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: error.message,
        }));
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });

      const dataToBePost = {
        email: formData.email,
        password: formData.password,
      };
      dispatch(login(dataToBePost)).then((unwrapResult)=>{
        console.log(unwrapResult);
        if(unwrapResult.type === 'LOGIN/rejected'){
        toast.error(unwrapResult.payload)
        }
      })
    } catch (error) {
      // Handle validation errors
      if (error.name === 'ValidationError') {
        const newErrors = {};
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      } else {
        toast.error('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div>
      <div className='createAccount-container'>
        <h1>Login to Myntra</h1>
        <p>Enter your details below</p>
      </div>
      <form onSubmit={handleSubmit} className='signup-form-container'>
        <InputField
          label="Email"
          name="email"
          disabled={id}
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />
        <div>
          <button type="submit" className='create-acount-btn'>Login</button>
          {error && <p>{error}</p>}
          <p>forget password?</p>
          {isLoading && <LoadingScreen />}
        {isSuccess && toast.success(msg)}
          {/* {(error) && toast.error(error)}  */}
        </div>
      </form>
    </div>
  );
};

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
const validationSchema = Yup.object({
  password: Yup.string().required('Password is required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]/, 'Password must contain at least one uppercase, one lowercase, one special character, and one number'),
  email: Yup.string().required('Email is required').matches(emailRegex, 'Enter a valid email address'),
});

export default Login;
