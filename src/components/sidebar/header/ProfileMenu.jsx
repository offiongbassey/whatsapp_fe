import { useState } from "react";
import { ArrowIcon } from "../../../svg";
import ProfileImageMenu from "./ProfileImageMenu";
import ProfileImage from "../../modal/ProfileImage";
import ProfileImageUpload from "../../modal/ProfileImageUpload";

export default function ProfileMenu({ setShowProfile, user }) {
    const [profileImageMenu, setProfileImageMenu] = useState(false);
    const [previewProfileImage, setPreviewProfileImage] = useState(false);
    const [profileUpload, setProfileUpload] = useState(false);
    
    return(
        <>
        <div className="absolute pt-[600px] left-0 z-50 dark:bg-dark_bg_2 dark:text-dark_text_1 shadow-md w-[440px]">
                <ul>
                    <li>
                        <button
                        onClick={() => setShowProfile(false)} 
                        className="btn flex gap-8 pl-20">
                            <span className="rotate-180 scale-150">
                                <ArrowIcon className="fill-white"/>
                            </span>
                            <span>Profile</span>
                        </button>
                    </li>
                    <li
                    // onClick={(e) => e.stopPropagation() }
                    >
                        <div className="dark:bg-dark_bg_6  w-full p-10">
                            <div className="flex flex-col items-center">
                                    <div className="group relative">
                                        <img
                                           
                                            src={user.picture}
                                            alt="profile"
                                            className="w-48 h-full rounded-full object-cover group-hover:opacity-40"
                                            />
                                            <div
                                             onClick={() => setProfileImageMenu((prev) => !prev)}
                                            class="absolute inset-0 flex text-center items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                                    <p class="text-white text-sm">CHANGE <br/> PROFILE <br/> PHOTO </p>
                                        </div>
                                    </div>
                            </div>
                            {/* profile image properties */}
                            {profileImageMenu && 
                            <ProfileImageMenu setPreviewProfileImage={setPreviewProfileImage} setProfileImageMenu={setProfileImageMenu} user={user} setProfileUpload={setProfileUpload} />
                            }
                            {/* image preview */}
                            {previewProfileImage && 
                            <ProfileImage open={previewProfileImage} onClose={() => setPreviewProfileImage(false)} user={user} />
                             }
                             {/* image upload */}
                             {profileUpload &&
                                <ProfileImageUpload open={profileUpload} onClose={() => setProfileUpload(false)} setProfileUpload={setProfileUpload} user={user} />
                             }
                            <div className="flex flex-col gap-4 text-left pt-10 dark:bg-dark_bg_6">
                                <span className=" dark:text-green_2 text-sm">Your name</span>
                                <p>{user.name}</p>
                                <p className="dark:text-dark_svg_2 text-sm">This is not your username or pin. This name will be visible to your WhatsApp contacts.</p>

                                <span className=" dark:text-green_2 text-sm pt-10">About</span>
                                <p>{user.status}</p>
                            </div>
                        </div>
                    </li>
                </ul>
        </div>
        
        </>
    )
}