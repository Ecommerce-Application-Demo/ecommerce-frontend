import React,{useState} from 'react'
import InputField from '../small-components/InputField'
import * as Yup from 'yup';
import LoadingScreen from '../small-components/Loading-screen';
import { Link, useNavigate } from 'react-router-dom';
import Otp from './Otp';
import classNames from 'classnames';

const LoginOrSignUp = ({}) => {
    const [formData, setFormData] = useState({
        email:'',
      });
    
      const [errors, setErrors] = useState({
        email:'',
      });

    //button text for loading...
      const [buttonText,setButtonText]=useState('Get OTP');
      const [isLoading, setIsLoading]=useState(false);

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

      const history = useNavigate();
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        validationSchema
          .validate(formData, { abortEarly: false })
          .then(() => {
            console.log('Form is valid:', formData);
            setIsLoading(true);
            setButtonText('sent');
            setTimeout(() => {
              history(`/otp-verification?email=${formData.email}`)
            }, 2000);
          })
          .catch((validationErrors) => {
            const newErrors = {};
            validationErrors.inner.forEach((error) => {
              newErrors[error.path] = error.message;
            });
            setErrors(newErrors);
          });
      };

      const otpBtn = classNames({
        'getOtp-btn':true,
        'getOtp-btn--normal':buttonText!=='sent',
        'getOtp-btn--disabled':buttonText==='sent',
      })
    
  return (
    <div className='loginorsignup-container'>
        <h1>Login Or Signup</h1>
        <InputField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          disabled={buttonText==='sent'}
          className='loginorsignup-input-field'
        />
         <button className={otpBtn} onClick={handleSubmit} disabled={buttonText==='sent'}>{buttonText}</button>
            </div>
  )
}
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;

const validationSchema = Yup.object({
    email: Yup.string().required('email is required').matches(emailRegex, 'Enter a valid email address'),
  });

export default LoginOrSignUp