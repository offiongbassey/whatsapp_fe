
import { LockIcon, WelcomeIcon } from '../../../svg';

export default function PageLoad({ timer }) {

  return (
    <div className='h-screen w-full  dark:bg-dark_bg_1 select-  '>
        {/* container */}
        <div className='-mt-1.5 w-full h-full flex flex-col gap-y-8 items-center justify-center'>
            <span className='scale-[2.7] dark:fill-dark_svg_2 fill-light_bg_3'>
                <WelcomeIcon />
            </span>
            <div class="md:w-[30%] w-[70%] bg-gray-200 h-[3px] dark:bg-gray-700 mt-5">
                        <div className={` bg-green_2 h-[3px] w-[${timer}%] `}></div>
                </div>
            {/* Page Loading info */}
            <div className='mt-1 text-center space-y-[12px] '>
               
                <h1 className='text-[22px] dark:text-dark_text_4 font-extralight'>
                    WhatsApp
                </h1>
                <p className="flex items-center">
                    <LockIcon className="fill-white scale-75" />
                    <span className="text-xs dark:text-dark_text_4">End-to-end Encrypted</span>
                </p>

            </div>
        </div>
    </div>
  )
}
