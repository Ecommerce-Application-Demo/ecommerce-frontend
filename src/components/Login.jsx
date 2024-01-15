import React, { useState } from 'react';
import * as Yup from 'yup';
import InputField from '../small-components/InputField';
import { Link } from 'react-router-dom';
import { GoogleIcon } from '../assets/icons';
const Login = () => {
    const [formData, setFormData] = useState({
      password: '',
      email:'',
    });
  
    const [errors, setErrors] = useState({
      password: '',
      email:'',
    });
  
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
        .then(() => {
          console.log('Form is valid:', formData);
        })
        .catch((validationErrors) => {
          const newErrors = {};
          validationErrors.inner.forEach((error) => {
            newErrors[error.path] = error.message;
          });
          setErrors(newErrors);
        });
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
          value={formData.email}
          onChange={handleChange}
        //   onBlur={handleBlur}
          error={errors.email}
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
        <div>
        <button type="submit" className='create-acount-btn'>Login</button>
        <p>forget password?</p>
        </div>
      </form>
        </div>
    );
  };
  
  const validationSchema = Yup.object({
    name: Yup.string().required('name is required').max(15,'name should be between 5 to 15 charrecters').min(5,'mame should be between 5 to 15 charrecters'),
    password: Yup.string().required('Password is required').matches( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]/,'password required tleast one uppercase, one lowercase, one special charrecters and one number'),
    email: Yup.string().required('email is required').email('enter valid email'),
        phoneNumber: Yup.string().required('phone number is required'),

  });
  
  export default Login;