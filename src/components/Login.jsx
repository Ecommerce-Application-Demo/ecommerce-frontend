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
    previousLogin,
  } = data;

  const location = useLocation();
  const { email } = location.state || {};
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: '',
    email: email ? email : 'kingshukr713@gmail.com',
  });

  const [errors, setErrors] = useState({
    password: '',
    email: '',
  });

  const [containsNumber,setContainsNumber] = useState(false);
  const [containsUppercase,setContainsUppercase] = useState(false);
  const [containsLowercase,setContainsLowercase] = useState(false);
  const [containsSpecial,setContainsSpecial] = useState(false);

  useEffect(() => {
    if (msg && isLoggedIn) {
      localStorage.setItem('PREVIOUS_LOGIN', JSON.stringify(previousLogin));
      navigate('/');
    }
  }, [msg, isLoggedIn, error, isLoading,navigate,previousLogin]);
  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      toast.success('Logged in successfully');
    }
  }, [isSuccess, isLoggedIn]);
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update form data
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === 'password') {
      setContainsLowercase(/^(?=.*[a-z])/.test(value));
      setContainsNumber(/\d/.test(value));
      setContainsUppercase(/^(?=.*[A-Z])/.test(value));
      setContainsSpecial(/^(?=.*[\W_])/.test(value));
    }
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
    <div className='createAccount-main-container'>
      <div className='createAccount-container'>
        <h1>Login to Myntra</h1>
        <p>Enter your details below</p>
      </div>
      <form onSubmit={handleSubmit} className='signup-form-container'>
        <div>
        <InputField
          label="Email"
          name="email"
          disabled={true}
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          classNameForError='error'
        />
        </div>
        <div>
        <InputField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          classNameForError='error'
        />
        </div>
        <div className='signupPassword-validation'>
          <div className={containsSpecial && 'special'}>Special</div>
          <div className={containsNumber && 'number'}>1 Number</div>
          <div className={containsUppercase && 'uppercase'}>1 Uppercase</div>
          <div className={containsLowercase && 'lowercase'}>1 Lowercase</div>
          <div className={formData.password.length>=8 && 'charrecters'}>8 Charrecters</div>
        </div>
        <div>
          <button type="submit" className='create-acount-btn'>Login</button>
          {error && <p>{error}</p>}
          <p>forget password?</p>
          {isLoading && <LoadingScreen />}
        </div>
      </form>
    </div>
  );
};

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
const validationSchema = Yup.object({
  password: Yup.string().required('Password is required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{8,}/, 'check all the checkbox'),
  email: Yup.string().required('Email is required').matches(emailRegex, 'Enter a valid email address'),
});

export default Login;
