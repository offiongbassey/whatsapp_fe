

export default function ProfileImageMenu({setPreviewProfileImage, setProfileImageMenu, user, setProfileUpload}) {
    
    return (
    <>
    <div className='absolute right-0  bottom-64 z-50 dark:bg-dark_bg_2 dark:text-dark_text_1 shadow-md w-52'>
      <ul>
        <li 
            onClick={() => {

            setPreviewProfileImage(true)
            setProfileImageMenu(false);
            }}
            className='py-3 pl-5 cursor-pointer hover:bg-dark_bg_3'
        >
            <span>View Photo</span>
        </li>
        <li 
        onClick={() => {
            setProfileUpload(true);
            setProfileImageMenu(false);
        }}
        className='py-3 pl-5 cursor-pointer hover:bg-dark_bg_3'>
            <span>Upload Photo</span>
        </li>
        <li
            className='py-3 pl-5 cursor-pointer hover:bg-dark_bg_3'
        >
            <span>Remove Photo</span>
        </li>
      </ul>
    </div>
    </>
  )
}
