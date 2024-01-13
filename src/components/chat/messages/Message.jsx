import moment from "moment";
import TriangleIcon from "../../../svg/triangle";
import { useSelector } from "react-redux";
import { ArrowIcon, DangerIcon } from "../../../svg";
import { useState } from "react";
import MessageMenu from "./properties/MessageMenu";
import DeleteModal from "../../modal/DeleteModal";

export default function Message({ message, me, deleteMessage, deletedMessage }) {
  const { user } = useSelector((state) => state.user);
  const [openModal, setOpenModal] = useState(false);
  const [messageArrow, setMessageArrow] = useState(false);
  const [showMessageMenu, setShowMessageMenu ] = useState(false);

  const deleteHandler =  async() => {
    setOpenModal(true);
    setShowMessageMenu(false);
    
  }

  const deleteMessageHandler = async(id) => {
    deleteMessage(id);
    setOpenModal(false);
  }

  return (
    <div 
    className={`w-full flex mt-2 space-x-3 max-w-xs ${ me ? "ml-auto justify-end" : ""}`}>
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
      className={`relative flex h-full  ${deletedMessage._id === message._id ?  "dark:text-dark_text_2 italic" : message.status ==="active" ? "dark:text-dark_text_1"  : "dark:text-dark_text_2 italic" } p-2 rounded-lg 
      ${me && deletedMessage._id === message._id ? "bg-[#133e35]" : me && message.status === "active" ? "bg-green_3" : me && message.status === "deleted" ? "bg-[#133e35]" :  "dark:bg-dark_bg_2"}`}>
        {/* message */}
        {deletedMessage._id === message._id ? <DangerIcon /> : message.status === "deleted" ? <DangerIcon /> : null }
        <p className="float-left h-full text-sm pb-4 pr-8">
         {me && message.status === "deleted" ? "You deleted this message" : 
         !me && message.status === "deleted" ? "This message was deleted" : 
         !me && deletedMessage._id === message._id ? "This message was deleted" : 
         me && deletedMessage._id === message._id ? "You deleted this message" :
         message.message}
        </p>
        {messageArrow && message.status !== "deleted" && deletedMessage?._id !== message._id ? (
            <button 
            onClick={() => setShowMessageMenu((prev) => !prev)}
            className="btn absolute right-0">
            <span className="rotate-90 scale-150 m-1">
              <ArrowIcon className="fill-[#6ea095]"/>
            </span>
        </button>
        ) :  null
      }

        {/* message menu */}
        {showMessageMenu && message.status !== "deleted" && deletedMessage?._id !== message._id ? 
        (<MessageMenu 
        message={message} 
        me={me} 
        deleteHandler={deleteHandler}
        
        />) : null }
        

        {/* modal */}
        <DeleteModal open={openModal} onClose={() => setOpenModal(false)} message={message} setOpenModal={setOpenModal} deleteMessageHandler={deleteMessageHandler} />
       
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
