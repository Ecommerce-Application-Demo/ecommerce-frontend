import React,{useState} from 'react'
import InputField from '../small-components/InputField'
import * as Yup from 'yup';

const LoginOrSignUp = () => {
    const [formData, setFormData] = useState({
        email:'',
      });
    
      const [errors, setErrors] = useState({
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
    <div className='loginorsignup-container'>
        <h1>Login Or Signup</h1>
        <InputField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          className='loginorsignup-input-field'
        />
        <button className='getOtp-btn' onClick={handleSubmit}>get OTP</button>
            </div>
  )
}
const validationSchema = Yup.object({
    email: Yup.string().required('email is required').email('enter valid email'),
  });

export default LoginOrSignUp