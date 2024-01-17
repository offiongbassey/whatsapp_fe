import moment from "moment";
import TriangleIcon from "../../../svg/triangle";
import { useSelector } from "react-redux";
import { ArrowIcon, DangerIcon } from "../../../svg";
import { useState } from "react";
import MessageMenu from "./properties/MessageMenu";
import DeleteModal from "../../modal/DeleteModal";
import EditModal from "../../modal/EditModal";
import { ReactionEmoji } from "../actions";
import ReactionPreview from "../../modal/ReactionPreview";

export default function Message({ message, me, deleteMessage, deletedMessage, setOpenReplyMessage, handleReplyToggle}) {
  const { user } = useSelector((state) => state.user);
  const [openModal, setOpenModal] = useState(false);
  const [openReactionPreview, setOpenReactionPreview] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [messageArrow, setMessageArrow] = useState(false);
  const [showMessageMenu, setShowMessageMenu ] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  

  const handleEmoji = async () => {
    setShowEmoji(true);
    setShowMessageMenu(false);
  }
  const editHandler = async () => {
    setOpenEditModal(true);
    setShowMessageMenu(false);
  }

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
    className={`w-full flex mt-2 space-x-3  max-w-xs ${ me ? "ml-auto justify-end" : ""}`}>
      {/* Message Container */}
      
      <div className={`relative ${message.reaction.length > 0 ? "mb-4": ""}`}>
        {/* sender user message */}
        { !me && message.conversation.isGroup &&  (
          <div className="absolute top-1 left-[-37px]">
          <img src={message.sender.picture} alt="" className="w-8 h-8 rounded-full" />
        </div>
        ) }
        
      <div
      onMouseOver={() => setMessageArrow(true)}
      onMouseOut={() => setMessageArrow(false)}
      className={`relative flex flex-col h-full   ${deletedMessage._id === message._id ?  "dark:text-dark_text_2 italic" : message.status ==="active" ? "dark:text-dark_text_1"  : "dark:text-dark_text_2 italic" } 
      ${message.is_reply ? "p-1" : "p-2" } rounded-lg 
      ${me && deletedMessage._id === message._id ? "bg-[#133e35]" : me && message.status === "active" ? "bg-green_3" : me && message.status === "deleted" ? "bg-[#133e35]" :  "dark:bg-dark_bg_2"}`}>
        {/* message */}
        {deletedMessage._id === message._id ? <DangerIcon /> : message.status === "deleted" ? <DangerIcon /> : null }
        {/*  displaying reply */}
        {message.is_reply ? (
          <div className={` ${message.message_replied.message.length > 120 ? "w-[300px]" : "w-full"} mb-3 h-20 dark:bg-dark_bg_3 rounded-lg flex overflow-hidden`}>
            <span className={`${message.sender._id === user._id ? "dark:bg-blue-400" : "dark:bg-green-400"} w-1`}></span>
              <div className="absolute m-3">
                  <p className={`${message.sender._id === user._id ? "dark:text-blue-400" : "dark:text-green-400"} text-xs font-semibold`}>{message.sender._id === user._id ? "You" : message.sender.name }</p>
                  <p className="dark:text-dark_text_2 text-xs">{message.message_replied.message.length > 100 ? `${message.message_replied.message.substring(0, 100)}...` : message.message_replied.message }</p>
              </div>
          </div>
        ): null }


        <p className="float-left text-sm pb-4 pr-8">
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
        open={showMessageMenu}
        onClose={() => setShowMessageMenu(false)}
        message={message} 
        me={me} 
        deleteHandler={deleteHandler}
        editHandler={editHandler}
        handleEmoji={handleEmoji}
        setOpenReplyMessage={setOpenReplyMessage}
        handleReplyToggle={handleReplyToggle}
        />) : null }
        

        {/* modal */}
        <DeleteModal open={openModal} onClose={() => setOpenModal(false)} message={message} setOpenModal={setOpenModal} deleteMessageHandler={deleteMessageHandler} />
       
       {/* edit modal */}
        <EditModal open={openEditModal} onClose={() => setOpenEditModal(false)} message={message} setOpenEditModal={setOpenEditModal} />
        
        {/* ReactionEmoji */}
          <ReactionEmoji showEmoji={showEmoji} onClose={() => setShowEmoji(false)} setShowEmoji={setShowEmoji} message={message} />
        
        {/* ReactionPreview */}
          <ReactionPreview open={openReactionPreview} onClose={() => setOpenReactionPreview(false)} setOpenReactionPreview={setOpenReactionPreview} message={message} _id={user._id} me={me} />

        {/* message date */}
        <span className="absolute right-1.5 bottom-1.5 text-xs text-dark_text_5 leading-none"
        > {message?.editedStatus ? "Edited" : ""} {moment(message.createdAt).format("HH:mm:a")}
        </span>
        {/* Triangle */}
        <span>
        {
            !me ? 
            <TriangleIcon className="dark:fill-dark_bg_2 rotate-[60deg] absolute top-[-5px] -left-1.5 " /> : null
        }
        </span>
        <span onClick={() => setOpenReactionPreview(true)} className={`absolute ${me ? "right-0" : ""} cursor-pointer  bottom-[-20px] dark:bg-dark_bg_5 px-2 scale-100 rounded-xl`}>
        {message.reaction.map((item) => (
        item.emoji
        ))} 
        </span>
      </div>
     
    </div>
    </div>
  )
}
