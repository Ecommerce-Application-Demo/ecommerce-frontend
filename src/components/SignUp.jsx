import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import InputField from '../small-components/InputField';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GoogleIcon } from '../assets/icons';
import { useDispatch, useSelector } from 'react-redux';
import userApi from '../api/asyncThunk/userApi';
import { toast } from 'react-toastify';
import ToastMessageWIthUpdatedState, { ToastErrorWithUpdatedState } from '../Toast/ToastMessageWIthUpdatedState';
import LoadingScreen from '../small-components/Loading-screen';


const SignUp = () => {

  const user = useSelector((state)=>state.user);
  const {
    register
} = userApi;

  const {
    msg,
    isLoggedIn,
    isLoading,
  } = user
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const location = useLocation();
    const {id} = location.state || {};
    const [formData, setFormData] = useState({
      name: '',
      password: '',
      phoneNumber:'',
      email:id ? id : '',
    });
  
    const [errors, setErrors] = useState({
      name: '',
      password: '',
      phoneNumber:'',
      email:'',
    });

    useEffect(()=>{
      if(isLoggedIn) {
        navigate('/')
      }
    },[msg,isLoggedIn,isLoading]);
  
    const handleChange = (e) => {
        const { name, value } = e.target;
    
        // Update form data
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
        
        // Validate the field using Yup
        Yup
          .reach(validationSchema, name)
          .validate(value)
          .then(() => {
            setErrors((prevErrors) => ({
              ...prevErrors,
              [name]: '', // Clear the error if validation passes
            }));
          })
          .catch((error) => {
            setErrors((prevErrors) => ({
              ...prevErrors,
              [name]: error.message,
            }));
          });
      };
    
  
    const handleSubmit = (e) => {
      e.preventDefault();
      
      validationSchema
        .validate(formData, { abortEarly: false })
        .then(async() => {
          let dataToBePost = {
            email:formData.email,
            name:formData.name,
            password:formData.password,
            phoneNumber:formData.phoneNumber,
            gender:'Male'
          }
          
          await toast.promise(
            dispatch(register(dataToBePost)),
            {
              pending: {
                render: 'Checking...', 
                type: 'info'
              },
              success : {
                render: () => 'User login successfully',
                type: 'success'
              },
              error: {
                render: () => <ToastErrorWithUpdatedState/>,
                type: 'error'
              }
            }
          );

        })
        .catch((validationErrors) => {
          const newErrors = {};
          validationErrors.inner.forEach((error) => {
            newErrors[error.path] = error.message;
          });
          setErrors(newErrors);
          toast.error('please fill required field with perfect data');
        });
    };
  
    return (
        <div>
          {isLoading && <LoadingScreen/>}
            <div className='createAccount-container'>
                <h1>Create an account</h1>
                <p>Already have account? <Link to='/login' style={{ color:'inherit'}}>log in</Link></p>
            </div>
      <form onSubmit={handleSubmit} className='signup-form-container'>
        <InputField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        //   onBlur={handleBlur}
          error={errors.name}
        />
         <InputField
          label="Email"
          name="email"
          value={id || formData.email}
          onChange={handleChange}
          disabled={true}
        //   onBlur={handleBlur}
          error={errors.email}
        />
         <InputField
          label="Phone Number"
          name="phoneNumber"
          type='number'
          maxLength='10'
          value={formData.phoneNumber}
          onChange={handleChange}
        //   onBlur={handleBlur}
          error={errors.phoneNumber}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        //   onBlur={handleBlur}
          error={errors.password}
        />
        <button type="submit" className='create-acount-btn'>Create Account</button>
      </form>
      <div>
        <div className='signupform-google-btn'><GoogleIcon/> sign up with Google</div>
      </div>
        </div>
    );
  };
  
  const phoneNumberRegex = /^\d{10}$/

  const validationSchema = Yup.object({
    name: Yup.string().required('name is required').max(15,'name should be between 5 to 15 charrecters').min(5,'mame should be between 5 to 15 charrecters'),
    password: Yup.string().required('Password is required').matches( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]/,'password required tleast one uppercase, one lowercase, one special charrecters and one number'),
    email: Yup.string().required('email is required').email('enter valid email'),
    phoneNumber: Yup.string().required('phone number is required').matches(phoneNumberRegex,'only 10 digit required'),

  });
  
  export default SignUp;