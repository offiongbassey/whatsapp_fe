import { useSelector } from "react-redux";
import { ArrowIcon, CallIcon, DotsIcon, SearchLargeIcon } from "../../../svg";
import { capitalize } from "../../../utils/string";
import {
  getConversationName,
  getConversationPicture,
} from "../../../utils/chat";
import { IoVideocamOutline } from "react-icons/io5";

export default function ChatHeader({ online, callUser, setMobileToggle, mobileToggle }) {
  const { activeConversation } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const name = activeConversation.isGroup
    ? activeConversation.name
    : getConversationName(user, activeConversation.users);
  // dark:bg-dark_bg_2
  return (
    <div className="h-[68px] bg-light_bg_1 dark:bg-dark_bg_2  py-6 flex items-center p16 select-none">
      {/* container */}
      <div className="w-full flex items-center justify-between">
        {/*  left */}
        <div className="flex items-center gap-x-4">
          {/* mobile toggle */}
          {mobileToggle && 
          <button onClick={() => setMobileToggle(false)} className="btn visible sm:invisible">
            <span className="rotate-180 scale-150 m-1">
              <ArrowIcon className="dark:fill-white" />
            </span>
          </button>
          }

          {/* Conversation image */}
          <button className="btn">
            <img
              src={
                activeConversation.isGroup
                  ? activeConversation.picture
                  : getConversationPicture(user, activeConversation.users)
              }
              alt={`${name} picture`}
              className="w-full h-full rounded-full object-cover"
            />
          </button>
          {/* Conversation name and online status */}
          <div className="flex flex-col">
            <h1 className="dark:text-white text-md">{name}</h1>

            <span className="text-xs dark:text-dark_svg_2">
              {!activeConversation.isGroup && online ? "online" : ""}
            </span>
          </div>
        </div>
        {/*  right */}
        <ul className="flex items-center gap-x-2.5">
          {online ? (
            <li onClick={() => callUser()}>
              <button className="btn">
                {/* <VideoCallIcon2 className="dark:fill-dark_svg_1 scale-200" /> */}
                <span className=" scale-150">
                  <IoVideocamOutline className="fill-light_text_2 dark:text-blue-500" />
                </span>
              </button>
            </li>
          ) : null}
          {online ? (
            <li>
              <button className="btn">
                <span className=" scale-75">
                  <CallIcon className="fill-light_text_2 dark:fill-blue-500" />
                </span>
              </button>
            </li>
          ) : null}
          <li>
            <button className="btn">
              <SearchLargeIcon className="fill-light_text_2 dark:fill-dark_svg_1 " />
            </button>
          </li>
          <li>
            <button className="btn">
              <DotsIcon className="fill-light_text_2 dark:fill-dark_svg_1" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
