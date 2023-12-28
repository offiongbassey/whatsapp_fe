import { useSelector } from "react-redux"
import Message from "./Message";
import { useEffect, useRef } from "react";
import Typing from "./Typing";

export default function ChatMessages({ typing }) {
  const { messages, activeConversation } = useSelector((state) => state.chat );
  const { user } = useSelector((state) => state.user);
  const endRef = useRef();
  useEffect(() => {
    endRef.current.scrollIntoView({behavior: "smooth"})
  },[messages]);

  return (
    <div className="mb-[60px] bg-[url('https://res.cloudinary.com/dmhcnhtng/image/upload/v1677358270/Untitled-1_copy_rpx8yb.jpg')]
    bg-cover bg-no-repeat 
    "> 
      {/* container */}
      <div className="scrollbar overflow_scrollbar overflow-auto py-2 px-[4%]">
        {/* messages */}
        {
          messages && messages.map((message) => (
           <Message message={message} key={message._id} me={user._id === message.sender._id} />
          ))
        }
        { typing === activeConversation._id ? <Typing /> : null}
        <div className="mt-10" ref={endRef} ></div>
    </div>
    </div>
  )
}