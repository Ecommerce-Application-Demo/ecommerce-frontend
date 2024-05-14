import React from 'react'
import ViewProfile from '../components/accountPage/view-profile';
import tags from '../metaTag/dynamicTags';
import { Link, useLocation } from 'react-router-dom';
import EditProfile from '../components/accountPage/edit-profile';
import AccountManagement from '../components/accountPage/account-management';

const ProfilePage = () => {
  const route = useLocation().pathname;
  const viewProfileRoute = route === '/my/profile';
  const editProfileRoute = route === '/my/profile/edit';
  return (
    <div className="profile-main-container">
    {tags.ProfileTag()}
    {viewProfileRoute && <h2>View Your Profile</h2>}
    {editProfileRoute && <h2>Edit Your Profile</h2>}
      {viewProfileRoute && <ViewProfile/>}
      {editProfileRoute && <EditProfile/>}
      {viewProfileRoute && <Link className='profile-edit-btn' to='/my/profile/edit'>
        EDIT PROFILE
      </Link>}
      {viewProfileRoute && <AccountManagement/>}
    </div>
  )
}

export default ProfilePage;