import React, { useState } from 'react'

import useChangePassword from '../hooks/useChangePassword'

const ChangePassword = () => {

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setCofirmNewPassword] = useState('')

  const { loading, error, change_password } = useChangePassword()


  const handleSubmit = (e) => {
    e.preventDefault()
    change_password(oldPassword, newPassword)
  }

  const disabled = !oldPassword || !newPassword || !confirmNewPassword || loading || !(newPassword === confirmNewPassword)

  return (
    <div className='flex justify-center items-center min-h-full '>
      <form className='flex flex-col border-2 border-[#FFB200] p-6 rounded-2xl' onSubmit={handleSubmit}>
        {error && <div className='mb-1 rounded-2xl bg-red-600 p-2'>
          {error}
        </div>}
        <div className='flex flex-col mb-2'>
          <label htmlFor="oldPassword">Old Password: </label>
          <input value={oldPassword} type="password" id='oldPassword' name='oldPassword' onChange={(e) => setOldPassword(e.target.value)} placeholder='*************' />
        </div>
        <div className='flex flex-col mb-2'>
          <label htmlFor="newPassword">New Password: </label>
          <input value={newPassword} type="password" id='newPassword' name='newPassword' onChange={(e) => setNewPassword(e.target.value)} placeholder='*************' />
        </div>
        <div className='flex flex-col mb-2'>
          <label htmlFor="confirmNewPassword">Confirm New Password: </label>
          <input value={confirmNewPassword} type="password" id='confirmNewPassword' name='confirmNewPassword' onChange={(e) => setCofirmNewPassword(e.target.value)} placeholder='*************' />
          { (newPassword && confirmNewPassword && !(newPassword === confirmNewPassword) ) && <span className='text-xs text-red-500 font-semibold'>Passwords do not match</span>}
        </div>
        <button type='submit' disabled={disabled} className='btn'>{loading ? 'Loading' : 'Change Password'}</button>
      </form>
    </div>
  )
}

export default ChangePassword
