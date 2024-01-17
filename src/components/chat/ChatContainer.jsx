import { useDispatch, useSelector } from "react-redux";
import ChatHeader from "./header/ChatHeader";
import ChatMessages from "./messages/ChatMessages";
import { useEffect, useState } from "react";
import { getConversationMessages } from "../../features/chatSlice";
import ChatActions from "./actions/ChatActions";
import { checkOnlineStatus } from "../../utils/chat";
import FilesPreview from "../chat/preview/files/FilesPreview";

export default function ChatContainer({ onlineUsers, typing, callUser, deletedMessage, setDeletedMessage, setMobileToggle, mobileToggle}) {
    const dispatch = useDispatch();
    const { activeConversation, files } = useSelector((state) => state.chat);
    const { user } = useSelector((state) => state.user);
    const [currentReplyMessage, setCurrentReplyMessage] = useState("");
    const values = {
    token: user.token,
    convo_id: activeConversation?._id
    }

  const [ openReplyMessage, setOpenReplyMessage ] = useState(false);

  const handleReplyToggle = async (message) => {
    console.log("here is the message ", message.message, message._id);
    setOpenReplyMessage(true);
    setCurrentReplyMessage(message)
  }

    useEffect(() => {
        if(activeConversation?._id){
            dispatch(getConversationMessages(values))
        }
    },[activeConversation]);

  return (
    <div className={`md:relative absolute ${!mobileToggle ? "invisible sm:visible" : ""} w-[90%] border-l dark:border-l-dark_border_2 select-none overflow-hidden`}>
        {/* Container */}
        <div>
            {/* chat Header */}
            <ChatHeader online={checkOnlineStatus(onlineUsers, user, activeConversation.users)} callUser={callUser} setMobileToggle={setMobileToggle} />
         {
            files.length > 0 ? 
            <FilesPreview />
            : 
            <>
            {/* Chat Messages */}
            <ChatMessages typing={typing} deletedMessage={deletedMessage} setDeletedMessage={setDeletedMessage} setOpenReplyMessage={setOpenReplyMessage} handleReplyToggle={handleReplyToggle}  />
            {/* Chat Actions */}
            <ChatActions setOpenReplyMessage={setOpenReplyMessage} handleReplyToggle={handleReplyToggle} currentReplyMessage={currentReplyMessage} setCurrentReplyMessage={setCurrentReplyMessage} openReplyMessage={openReplyMessage} />
           </>
         }
        </div>
    </div>
  )
}
