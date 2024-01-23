
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateTheme } from '../../features/userSlice';

export default function ThemeModal({ open, onClose, setShowTheme }) {
    const { theme } = useSelector((state) => state.user);
    const [newTheme, setNewTheme] = useState(theme);
    const dispatch = useDispatch();

    const handleTheme = async (e) => {
        await dispatch(updateTheme(newTheme));
        setShowTheme(false);
    }
  return (
    <div
    onClick={onClose}
    className={`fixed inset-0 flex justify-center items-center
    transition-colors
    ${open ? "visible dark:bg-dark_bg_6/80 bg-light_bg_3/60 z-20" : "invisible"}
    `}
    >
       
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`dark:bg-dark_hover_1 bg-white text-light_text_1 rounded-sm shadow-xl p-6 transition-all
        ${open ? "scale-100 opacity-100": "scale-125 opacity-0"}
        `}
      >
        <div>
            <p className='dark:text-white mb-12'>Theme</p>
            <div className=''>
                    <div className="mb-3 block min-h-[1.5rem] pl-[1.5rem]">
                    <input
                          className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 
                          appearance-none rounded-full border-2 border-solid border-neutral-300 
                          before:pointer-events-none before:absolute before:h-4 before:w-4 
                          before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 
                          before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute 
                          after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] 
                          checked:border-primary checked:before:opacity-[0.16] checked:after:absolute 
                          checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] 
                          checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary 
                          checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] 
                          hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] 
                          focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] 
                          focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] 
                          focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary 
                          checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] 
                          checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-gray-400 
                          dark:checked:border-green_2 checked:border-green_2 dark:checked:after:border-primary dark:checked:after:bg-green_2  checked:after:bg-green_2 
                          dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-green_2  checked:focus:border-green_2 
                          dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                            type="radio"
                            name="flexRadioDefault"
                            id="radioDefault01"
                            onChange={() => setNewTheme("light")}
                            defaultChecked={newTheme === "light" ? true : false}
                        />
                        <label
                            className="mt-px inline-block dark:text-white pl-[0.15rem] hover:cursor-pointer"
                            htmlFor="radioDefault01"
                        >
                        Light
                        </label>
                    </div>
                    <div className="mb-3 block min-h-[1.5rem] pl-[1.5rem]">
                        <input
                           className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 
                           appearance-none rounded-full border-2 border-solid border-neutral-300 
                           before:pointer-events-none before:absolute before:h-4 before:w-4 
                           before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 
                           before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute 
                           after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] 
                           checked:border-primary checked:before:opacity-[0.16] checked:after:absolute 
                           checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] 
                           checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary 
                           checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] 
                           hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] 
                           focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] 
                           focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] 
                           focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary 
                           checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] 
                           checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-gray-400 
                           dark:checked:border-green_2 checked:border-green_2 dark:checked:after:border-primary dark:checked:after:bg-green_2  checked:after:bg-green_2 
                           dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-green_2  checked:focus:border-green_2 
                           dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                            type="radio"
                            name="flexRadioDefault"
                            id="radioDefault02"
                            onChange={() => setNewTheme("dark")}
                            defaultChecked={newTheme === "dark" ? true : false}
                           

                        />
                        <label
                            className="mt-px inline-block dark:text-white pl-[0.15rem] hover:cursor-pointer"
                            htmlFor="radioDefault02"
                        >
                        Dark 
                        </label>
                    </div>
                    <div className="mb-3 block min-h-[1.5rem] pl-[1.5rem]">
                    <input
                           className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 
                           appearance-none rounded-full border-2 border-solid border-neutral-300 
                           before:pointer-events-none before:absolute before:h-4 before:w-4 
                           before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 
                           before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute 
                           after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] 
                           checked:border-primary checked:before:opacity-[0.16] checked:after:absolute 
                           checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] 
                           checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary 
                           checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] 
                           hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] 
                           focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] 
                           focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] 
                           focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary 
                           checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] 
                           checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-gray-400 
                           dark:checked:border-green_2 checked:border-green_2 dark:checked:after:border-primary dark:checked:after:bg-green_2  checked:after:bg-green_2 
                           dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-green_2  checked:focus:border-green_2 
                           dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                            type="radio"
                            name="flexRadioDefault"
                            id="radioDefault03"
                            onChange={() => setNewTheme("dark")}
                            
                        />
                        <label
                            className="mt-px inline-block dark:text-white pl-[0.15rem] hover:cursor-pointer"
                            htmlFor="radioDefault03"
                        >
                        System Default 
                        </label>
                    </div>
            </div>
            <div className='mx-auto my-4 w-96 flex gap-3 items-end justify-end'>
                <button
                onClick={() => setShowTheme(false)}
                    className='btn w-[100px] mb-2 text-teal-600 hover:text-teal-500 dark:bg-dark_hover_1 border border-light_bg_3 shadow-2xl transition duration-700 dark:border-gray-600'
                >
                Cancel
                </button>
                <button
                type='button'
                onClick={handleTheme}
                className='btn w-[70px] mb-2 dark:text-dark_bg_1 bg-green_3 text-white hover:text-dark_bg_1 dark:bg-teal-600 dark:hover:bg-teal-500'
                >
                OK
                </button>
            </div>
        </div>

      </div>

    </div>
  )
}
