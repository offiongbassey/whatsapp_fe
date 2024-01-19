import React from 'react'

export default function ProfileImageMenu({setProfileImageMenu}) {
  return (
    <div className='absolute right-0  bottom-64 z-50 dark:bg-dark_bg_2 dark:text-dark_text_1 shadow-md w-52'>
      <ul>
        <li 
            className='py-3 pl-5 cursor-pointer hover:bg-dark_bg_3'
        >
            <span>View Photo</span>
        </li>
        <li className='py-3 pl-5 cursor-pointer hover:bg-dark_bg_3'>
            <span>Upload Photo</span>
        </li>
        <li
            className='py-3 pl-5 cursor-pointer hover:bg-dark_bg_3'
        >
            <span>Remove Photo</span>
        </li>
      </ul>
    </div>
  )
}
