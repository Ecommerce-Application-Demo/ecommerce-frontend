import React, { useState } from 'react';
import * as Yup from 'yup';
import InputField from '../small-components/InputField';
import { Link } from 'react-router-dom';
import { GoogleIcon } from '../assets/icons';
const SignUp = () => {
    const [formData, setFormData] = useState({
      name: '',
      password: '',
      phoneNumber:'',
      email:'',
    });
  
    const [errors, setErrors] = useState({
      name: '',
      password: '',
      phoneNumber:'',
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
          // Handle form submission logic here
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
          value={formData.email}
          onChange={handleChange}
        //   onBlur={handleBlur}
          error={errors.email}
        />
         <InputField
          label="Phone Number"
          name="phoneNumber"
          type='number'
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
  
  const validationSchema = Yup.object({
    name: Yup.string().required('name is required').max(15,'name should be between 5 to 15 charrecters').min(5,'mame should be between 5 to 15 charrecters'),
    password: Yup.string().required('Password is required').matches( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]/,'password required tleast one uppercase, one lowercase, one special charrecters and one number'),
    email: Yup.string().required('email is required').email('enter valid email'),
    phoneNumber: Yup.number('only number is allowed').required('phone number is required').max(11,'this should be 10 numbers').min(9,'this should be 10 numbers'),

  });
  
  export default SignUp;