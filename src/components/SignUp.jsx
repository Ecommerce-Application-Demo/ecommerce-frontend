import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import InputField from '../small-components/InputField';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GoogleIcon } from '../assets/icons';
import { useDispatch, useSelector } from 'react-redux';
import userApi from '../api/asyncThunk/userApi';
import { toast } from 'react-toastify';
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
    const {email} = location.state || {};
    const [formData, setFormData] = useState({
      name: '',
      password: '',
      phoneNumber:'',
      email:email ? email : '',
    });
  
    const [errors, setErrors] = useState({
      name: '',
      password: '',
      phoneNumber:'',
      email:'',
    });
    const [containsNumber,setContainsNumber] = useState(false);
    const [containsUppercase,setContainsUppercase] = useState(false);
    const [containsLowercase,setContainsLowercase] = useState(false);
    const [containsSpecial,setContainsSpecial] = useState(false);

    useEffect(()=>{
      if(isLoggedIn) {
        toast.success('login successfully.')
       navigate('/');
      }
    },[msg,isLoggedIn,isLoading,navigate]);
  
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
            dispatch(register(dataToBePost))

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
        <div className='createAccount-main-container'>
          {isLoading && <LoadingScreen/>}
            <div className='createAccount-container'>
                <h1>Create an account</h1>
            </div>
      <form onSubmit={handleSubmit} className='signup-form-container'>
        <div>
        <InputField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          classNameForError='error'
          error={errors.name}
        />
        </div>
        <div>
         <InputField
          label="Email"
          name="email"
          value={email || formData.email}
          onChange={handleChange}
          disabled={true}
          classNameForError='error'
          error={errors.email}
        />
        </div>
        <div>
         <InputField
          label="Phone Number"
          name="phoneNumber"
          type='text'
          maxLength={10}
          value={formData.phoneNumber}
          onChange={handleChange}
          classNameForError='error'
          error={errors.phoneNumber}
        />
        </div>
        <div>
        <InputField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          classNameForError='error'
          error={errors.password}
        />
        </div>
        { errors?.password &&
        <div className='signupPassword-validation'>
          <div className={containsSpecial && 'special'}>Special</div>
          <div className={containsNumber && 'number'}>1 Number</div>
          <div className={containsUppercase && 'uppercase'}>1 Uppercase</div>
          <div className={containsLowercase && 'lowercase'}>1 Lowercase</div>
          <div className={formData.password.length>=8 && 'charrecters'}>8 Charrecters</div>
        </div>
}
        <button type="submit" className='create-acount-btn'>Create Account</button>
      </form>
      <div>
        <div className='signupform-google-btn'><GoogleIcon/> sign up with Google</div>
      </div>
        </div>
    );
  };
  
  const phoneNumberRegex = /^(?=[6-9])\d{10}$/

  const validationSchema = Yup.object({
    name: Yup.string().required('name is required').max(15,'name should be between 5 to 15 charrecters').min(5,'name should be between 5 to 15 charrecters'),
    password: Yup.string().required('Password is required').matches( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{8,}/,'please check all the box'),
    email: Yup.string().required('email is required').email('enter valid email'),
    phoneNumber: Yup.string().required('phone number is required').min(10,'only 10 digit required').matches(phoneNumberRegex,'this number is not valid'),

  });
  
  export default SignUp;