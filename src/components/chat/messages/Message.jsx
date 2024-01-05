import moment from "moment";
import TriangleIcon from "../../../svg/triangle";
import { useSelector } from "react-redux";
import { ArrowIcon } from "../../../svg";
import { useState } from "react";
import MessageMenu from "./properties/MessageMenu";

export default function Message({ message, me }) {
  const { user } = useSelector((state) => state.user);
  const [messageArrow, setMessageArrow] = useState(false);
  const [showMessageMenu, setShowMessageMenu ] = useState(false);
  const [messageMenuId, setMessageMenuId] = useState(0);

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
        
      <div
      onMouseOver={() => setMessageArrow(true)}
      onMouseOut={() => setMessageArrow(false)}
      className={`relative flex h-full dark:text-dark_text_1 p-2 rounded-lg
      ${me ? "bg-green_3" : "dark:bg-dark_bg_2"}`}>
        {/* message */}
        <p className="float-left h-full text-sm pb-4 pr-8">
           {message.message}
        </p>
            <button 
            onClick={() => setShowMessageMenu((prev) => !prev)}
            className="btn float-end">
            <span className="rotate-90 scale-150 m-1">
            { messageArrow && (
              <ArrowIcon className="fill-[#6ea095]"/>
              )
            }
            </span>
        </button>

        {/* message menu */}
        {showMessageMenu && (<MessageMenu message={message} />) }
        
       
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
