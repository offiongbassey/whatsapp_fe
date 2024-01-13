import { useDispatch, useSelector } from "react-redux"
import Message from "./Message";
import { useEffect, useRef } from "react";
import Typing from "./Typing";
import FileMessage from "./files/FileMessage";
import { removeMessage } from "../../../features/chatSlice";
import SocketContext from "../../../context/sendContext";

function ChatMessages({ socket, typing, deletedMessage, setDeletedMessage }) {
  const { messages, activeConversation } = useSelector((state) => state.chat );
  const { user } = useSelector((state) => state.user);
  const endRef = useRef();
  const dispatch = useDispatch();

const { token } = user;
  const deleteMessage = async (message_id) => {
    const values = {
      token,
      message_id
    }
    let del_message = await dispatch(removeMessage(values));
    socket.emit("delete message", del_message.payload);
    setDeletedMessage(del_message.payload)
}

  useEffect(() => {
    endRef.current.scrollIntoView({behavior: "smooth"})
  },[messages]);


  return (
    <div className="mb-[60px] bg-[url('https://res.cloudinary.com/dmhcnhtng/image/upload/v1677358270/Untitled-1_copy_rpx8yb.jpg')]
    bg-cover bg-no-repeat 
    "> 
      {/* container */}
      {/* <div className=""> */}
      <div className="scrollbar overflow_scrollbar overflow-auto py-2 px-[4%]">
        {/* messages */}
        {/* <ScrollToBottom className="overflow_scrollbar py-2 px-[4%]" > */}
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
              deleteMessage={deleteMessage} 
              deletedMessage={deletedMessage}
              />
              )
              : null
             }

              {/* message texts */}
            {
              message. message.length > 0 ? 
              <Message message={message} key={message._id} me={user._id === message.sender._id} deleteMessage={deleteMessage} deletedMessage={deletedMessage} />
              :
              null
            }
           </>
          ))
          
        }
        {/* </ScrollToBottom> */}
        { typing === activeConversation._id ? <Typing /> : null}
        <div className="mt-10" ref={endRef} ></div>
    </div>
    </div>
  )
}

const ChatMessagesWithContext = (props) => (
  <SocketContext.Consumer>
    {(socket) => <ChatMessages {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default ChatMessagesWithContext;