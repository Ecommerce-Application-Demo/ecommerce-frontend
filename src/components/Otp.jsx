import React, { useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Otp = () => {
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const [otp, setOtp] = useState(Array(4).fill(''));

  const [searchParams]=useSearchParams();
  const email=searchParams.get('email');
  const navigate=useNavigate();
  const handleInputChange = (index, e) => {
    const value = e.target.value;
    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1); // Limit the value to the first character

    if (value.length === 1 && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }

    setOtp(newOtp);
  };

  const handleKeyDown = (index, e) => {
    const value = e.target.value;
    if (e.key === 'Backspace' && index > 0 && value.length === 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const getFullOtp = () => {
    return otp.join(''); // Combine the OTP array into a string
  };
  if(getFullOtp().length===4){
    console.log('VALIDATE');
    navigate('/login',{state:{id:email}});

  }
  return (
    <div className='otp-main-container'>
      <h2>verify with OTP</h2>
      <p>sent to {email}</p>
      <div className='otp-input-wrapper'>
      {inputRefs.map((ref, index) => (
        <input
          key={index}
          ref={ref}
          type='number'
          autoFocus={index === 0}
          onChange={(e) => handleInputChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          value={otp && otp[index]}
          className='otp-input'
        />
      ))}
      </div>
      <p className='resend-otp-text'>resend OTP</p>
      <p className="loginText">login with <span className="password">password</span></p>
    </div>
  );
};

export default Otp;
