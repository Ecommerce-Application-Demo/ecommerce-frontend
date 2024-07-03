import React from 'react'
import { CiUser } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
const PreviousLogin = (props) => {
    const navigate = useNavigate();
    const {
        filteredEmails,
    } = props;
    const handleRedirectLogin = (email) => {
        navigate('/login', {state: { email: email}})
    }
  return (
    <div className='Previous-login-container'>
        <h4>Previous Login</h4>
        <h6>Click to log in</h6>
        <div className='previous-login-card-wrapper'>
        {filteredEmails?.map(email=>{
            return (
                <div className='previous-login-card' onClick ={ ()=>handleRedirectLogin(email) }>
                   <CiUser size={20} />
                    <p>{email}</p>
                </div>
            )
        })}
        </div>
      
    </div>
  )
}

export default PreviousLogin;