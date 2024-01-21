import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import InputField from '../small-components/InputField';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GoogleIcon } from '../assets/icons';
const Login = () => {
    const location=useLocation();
    const {id}=location.state || {};
    const navigate=useNavigate();
    
    const [formData, setFormData] = useState({
      password: '',
      email:'',
    });
  
    const [errors, setErrors] = useState({
      password: '',
      email:'',
    });

    useEffect(() => {
      setFormData((prevData) => ({
        ...prevData,
        email: id || '',
      }));
    }, [id]);
    
  
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
      console.log(formData);
      validationSchema
        .validate(formData, { abortEarly: false })
        .then(() => {
          console.log('Form is valid:', formData);
          console.log('validate');
          setTimeout(()=>{
            navigate('/');
          },2000);
        })
        .catch((validationErrors) => {
          const newErrors = {};
          console.log('error');
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
        <p>forget password?</p>
        </div>
      </form>
        </div>
    );
  };
  
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
  const validationSchema = Yup.object({
    password: Yup.string().required('Password is required').matches( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]/,'password required tleast one uppercase, one lowercase, one special charrecters and one number'),
    email: Yup.string().required('email is required').matches(emailRegex, 'Enter a valid email address'),

  });
  
  export default Login;