import moment from "moment";
import TriangleIcon from "../../../svg/triangle";
import { useSelector } from "react-redux";

export default function Message({ message, me }) {
  const { user } = useSelector((state) => state.user);
  return (
    <div className={`w-full flex mt-2 sspace-x-3 max-w-xs ${ me ? "ml-auto justify-end" : ""}`}>
      {/* Message Container */}
      <div className="relative">
        {/* sender user message */}
        { !me && message.conversation.isGroup &&  (
          <div className="absolute top-1 left-[-37px]">
          <img src={message.sender.picture} alt="" className="w-8 h-8 rounded-full" />
        </div>
        ) }
        
      <div className={`relative h-full dark:text-dark_text_1 p-2 rounded-lg
      ${me ? "bg-green_3" : "dark:bg-dark_bg_2"}`}>
        {/* message */}
        <p className="float-left h-full text-sm pb-4 pr-8">
            {message.message}
        </p>
        {/* message date */}
        <span className="absolute right-1.5 bottom-1.5 text-xs text-dark_text_5 leading-none"
        >{moment(message.createdAt).format("HH:mm:a")}
        </span>
        {/* Triangle */}
        <span>
        {
            !me ? 
            <TriangleIcon className="dark:fill-dark_bg_2 rotate-[60deg] absolute top-[-5px] -left-1.5 " /> : null
        }
        </span>
      </div>
    </div>
    </div>
  )
}
