import { useSelector } from "react-redux";
import { CallIcon, DotsIcon, SearchLargeIcon, VideoCallIcon } from "../../../svg";
import { capitalize } from "../../../utils/string";

export default function ChatHeader({online, callUser}) {
  const { activeConversation} = useSelector((state) => state.chat);
  const { name, picture} = activeConversation;
  return (
    <div className="h-[59px] dark:bg-dark_bg_2 flex items-center p16 select-none">
        {/* container */}
        <div className="w-full flex items-center justify-between">
          {/*  left */}
          <div className="flex items-center gap-x-4">
            {/* Conversation image */}
            <button className="btn">
              <img src={picture} alt={`${name} picture`} className="w-full h-full rounded-full object-cover" />
            </button>
            {/* Conversation name and online status */}
            <div className="flex flex-col">
              <h1 className="dark:text-white text-md font-bold">{name}</h1>
              <span className="text-xs dark:text-dark_svg_2">{online ? 'online': ''}</span>
            </div>
          </div>
          {/*  right */}
          <ul className="flex items-center gap-x-2.5">
            {1 == 1 ? (
              <li onClick={() => callUser()}>
                <button className="btn">
                    <VideoCallIcon />
                  </button>
              </li>
            ): null}
            {1 == 1 ? (
              <li>
                <button className="btn">
                    <CallIcon />
                </button>
              </li>
            ) : null}
            <li>
              <button className="btn">
                <SearchLargeIcon className="dark:fill-dark_svg_1" />
              </button>
            </li>
            <li>
              <button className="btn">
                <DotsIcon className="dark:fill-dark_svg_1" />
              </button>
            </li>
          </ul>
        </div>
    </div>
  )
}
