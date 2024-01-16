import moment from "moment";
import TriangleIcon from "../../../../svg/triangle";
import FileImageVideo from "./FileImageVideo";
import FileOthers from "./FileOthers";
import { useState } from "react";
import { ArrowIcon, DangerIcon } from "../../../../svg";
import MessageMenu from "../properties/MessageMenu";
import DeleteModal from "../../../modal/DeleteModal";
import { ReactionEmoji } from "../../actions";
import ReactionPreview from "../../../modal/ReactionPreview";
import { useSelector } from "react-redux";


export default function FileMessage({ fileMessage, message, me, deleteMessage, deletedMessage}) {
    const { user } = useSelector((state) => state.user);
    const { file, type} = fileMessage;
    const [messageArrow, setMessageArrow] = useState(false);
    const [showMessageMenu, setShowMessageMenu ] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [showEmoji, setShowEmoji] = useState(false);
    const [openReactionPreview, setOpenReactionPreview] = useState(false);

  const handleEmoji = async () => {
      setShowEmoji(true);
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
    <div className={`w-full flex mt-2 sspace-x-3 max-w-xs ${ me ? "ml-auto justify-end" : ""}`}>
      {/* Message Container */}

      <div className={`relative ${message.reaction.length > 0 ? "mb-4": ""}`}>
      {/* sender user message */}
      {
        !me && message.conversation.isGroup && (
      <div className="absolute top-1 left-[-37px]">
          <img src={message.sender.picture} alt="" className="w-8 h-8 rounded-full" />
      </div>
      )
      }
       
      <div 
      onMouseOver={() => setMessageArrow(true)}
      onMouseOut={() => setMessageArrow(false)}
      className={`relative flex h-full ${deletedMessage._id === message._id ?  "dark:text-dark_text_2 italic" : message.status ==="active" ? "dark:text-dark_text_1"  : "dark:text-dark_text_2 italic" }  rounded-lg
      ${deletedMessage._id === message._id ? "" : message.status === "deleted" ? "" : me ? "border-[3px] border-green_3 " : "dark:bg-dark_bg_2"}
      ${!me&& deletedMessage._id === message._id ?  "dark:bg-dark_bg_2 p-3"  :
        !me && message.status === "deleted" ? "dark:bg-dark_bg_2 p-3" :
        me && deletedMessage._id === message._id ?  "bg-[#133e35] p-3"  :
        me && message.status === "deleted" ? "bg-[#133e35] p-3" :
         me && file.public_id.split('.')[1] === "png" ? "bg-white" :
          "bg-green_3 p-1"}
      `}>
        {/* message */} 
        {/* if message has been deleted */}
        {deletedMessage._id === message._id ? <DangerIcon /> : message.status === "deleted" ? <DangerIcon /> : null }

        <p className={`h-full text-sm ${type !== "IMAGE" && type !== "VIDEO" ? "pb-5" : ""}`}>

          {messageArrow && message.status !== "deleted" && deletedMessage?._id !== message._id ? (
              <button 
              onClick={() => setShowMessageMenu((prev) => !prev)}
              className="absolute top-0 right-0 btn">
                  <span className="rotate-90 scale-150 m-1">
                    <ArrowIcon className="fill-[#d9e3e1]"/>
                  </span>
              </button>
           ) :  null
           } 

           {
            me && message.status === "deleted" ? "You deleted this message" : 
            !me && message.status === "deleted" ? "This message was deleted" : 
            !me && deletedMessage._id === message._id ? "This message was deleted" : 
            me && deletedMessage._id === message._id ? "You deleted this message" :
            type === "IMAGE" || type === "VIDEO" ? 
            <FileImageVideo url={file.secure_url} type={type}/> 
            : 
            <FileOthers file={file} type={type} />
            
           }
        </p>
        {/* menu button */}
        
      {/* message menu */}
      {showMessageMenu && message.status !== "deleted" && deletedMessage?._id !== message._id ? 
        (<MessageMenu 
          open={showMessageMenu}
          onClose={() => setShowMessageMenu(false)}
          message={message} 
          deleteMessage={deleteMessage}  
          me={me}     
          deleteHandler={deleteHandler}
          handleEmoji={handleEmoji}
          />) : null }

      {/* modal */}
      <DeleteModal open={openModal} onClose={() => setOpenModal(false)} message={message} setOpenModal={setOpenModal} deleteMessageHandler={deleteMessageHandler} />
       
          {/* ReactionEmoji */}
          <ReactionEmoji showEmoji={showEmoji} onClose={() => setShowEmoji(false)} setShowEmoji={setShowEmoji} message={message} />
        
        {/* ReactionPreview */}
          <ReactionPreview open={openReactionPreview} onClose={() => setOpenReactionPreview(false)} setOpenReactionPreview={setOpenReactionPreview} message={message} _id={user._id} me={me} />

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
