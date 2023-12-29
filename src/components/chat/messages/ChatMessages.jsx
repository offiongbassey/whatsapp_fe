import { useSelector } from "react-redux"
import Message from "./Message";
import { useEffect, useRef } from "react";
import Typing from "./Typing";
import FileMessage from "./files/FileMessage";

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
            <>
             {/* message files */}
             {
              message.files.length > 0 ?
              message.files.map((file) => 
              <FileMessage 
              fileMessage={file}
              message={message}
              key={message._id}
              me={user._id === message.sender._id}
              />
              )
              : null
             }

              {/* message texts */}
            {
              message. message.length > 0 ? 
              <Message message={message} key={message._id} me={user._id === message.sender._id} />
              :
              null
            }
           </>
          ))
        }
        { typing === activeConversation._id ? <Typing /> : null}
        <div className="mt-10" ref={endRef} ></div>
    </div>
    </div>
  )
}
