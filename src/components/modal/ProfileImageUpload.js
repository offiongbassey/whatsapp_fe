import React, { useState } from 'react'
import { CloseIcon, ValidIcon } from '../../svg'
import { ClipLoader } from 'react-spinners';
import Picture from '../auth/Picture';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { updateProfileImage } from '../../features/userSlice';

const cloud_name = process.env.REACT_APP_CLOUD_NAME;
const cloud_secret = process.env.REACT_APP_CLOUD_SECRET;

export default function ProfileImageUpload({ open, onClose, setProfileUpload, user}) {
    const [loading, setLoading] = useState(false);
    const [picture, setPicture] = useState();
    const [readablePicture, setReadablePicture] = useState("");
    const dispatch = useDispatch();
  
    const changeProfileImage = async () => {
    let res;
    if (picture) {
    setLoading(true)
      //upload to cloudinary
      await uploadImage().then(async (response) => {
        res = await dispatch(
          updateProfileImage({ picture: response.secure_url, token: user.token })
        );
        
      });
      if(res.payload.success === true){
        setProfileUpload(false);
      }
      setLoading(false);
    } 
  }

  const uploadImage = async () => {
    let formData = new FormData();
    formData.append("upload_preset", cloud_secret);
    formData.append("file", picture);
    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      formData
    );
    // console.log(`Jere${data}`);
    return data;
  };
  return (
    <div
        onClick={onClose}
        className={`
        fixed inset-0 flex justify-center items-center
        transition-colors
        ${open ? "visible bg-dark_bg_6/80 z-20" : "invisible"}`}
    >
       <div
          onClick={(e) => e.stopPropagation()}
          className={`dark:bg-dark_hover_1 w-[35%] min-w-96 rounded-sm shadow pt-6 transition-all
        ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}
        >
            <div>
            <div className="flex gap-4 mb-4 pl-4">
              <span
                className="cursor-pointer"
                onClick={() => setProfileUpload(false)}
              >
                <CloseIcon className="dark:fill-dark_svg_1" />
              </span>
              <p className="dark:text-dark_text_1">Upload Profile Image</p>
            </div>
            <div className="bg-[url('https://res.cloudinary.com/dmhcnhtng/image/upload/v1677358270/Untitled-1_copy_rpx8yb.jpg')] bg-cover bg-no-repeat p-14">
              <div className="relative flex items-center justify-center h-full ">
              <Picture
                readablePicture={readablePicture}
                setReadablePicture={setReadablePicture}
                setPicture={setPicture}
                />
              </div>
            </div>

            <div className="dark:bg-dark_bg_1 p-4 flex gap-4">
              {picture &&
              <button
                type="button"
                onClick={changeProfileImage}
                disabled={loading ? true : false}
                className="btn bg-green_1 scale-100 absolute right-10"
              >
                {loading ? (
                  <ClipLoader size={25} />
                ) : (
                  <ValidIcon className="fill-white mt-2 h-full" />
                )}
              </button>
              }
            </div>
          </div>

      </div>
    </div>
  )
}
