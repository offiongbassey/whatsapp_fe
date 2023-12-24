import { useDispatch, useSelector } from "react-redux";
import ChatHeader from "./header/ChatHeader";
import ChatMessages from "./messages/ChatMessages";
import { useEffect } from "react";
import { getConversationMessages } from "../../features/chatSlice";
import ChatActions from "./actions/ChatActions";

export default function ChatContainer() {
    const dispatch = useDispatch();
    const { activeConversation, messages } = useSelector((state) => state.chat);
    const { user } = useSelector((state) => state.user);
    const values = {
    token: user.token,
    convo_id: activeConversation?._id
    }

    useEffect(() => {
        if(activeConversation?._id){
            dispatch(getConversationMessages(values))
        }
    },[activeConversation]);

  return (
    <div className="relative w-full h-full border-l dark:border-l-dark_border_2 select-none overflow-hidden">
        {/* Container */}
        <div>
            {/* chat Header */}
            <ChatHeader />
            {/* Chat Messages */}
            <ChatMessages />
            {/* Chat Actions */}
            <ChatActions />
        </div>
    </div>
  )
}
