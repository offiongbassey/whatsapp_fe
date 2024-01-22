import { ArrowIcon, CloseIcon, NotificationIcon } from "../../../svg";

export default function Notifications() {
  return (
    <div className="h-[90px] bg-sky-400 dark:bg-dark_bg_3 flex items-center p-[13px]">
      {/* Container */}
      <div className="w-full flex items-center justify-between">
        {/* left */}
        <div className="flex items-center gap-x-4">
          <div className="cursor-pointer">
            <NotificationIcon className="fill-white dark:fill-blue_1" />
          </div>
          <div className="flex flex-col">
            <span className="dark:textPrimary text-light_text_1">Get notified of new messages</span>
            <span className="dark:textSecondary text-light_text_1 mt-0.5 flex items-center gap-0.5">
              Turn on desktop notifications
              <ArrowIcon className="dark:fill-dark_svg_2 mt-1" />
            </span>
          </div>
        </div>
        {/* right */}
        <div className="cursor-pointer">
          <CloseIcon className="fill-white dark:fill-dark_svg_2" />
        </div>
      </div>
    </div>
  );
}
