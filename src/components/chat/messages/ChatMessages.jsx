import { useDispatch, useSelector } from "react-redux";
import Message from "./Message";
import { useEffect, useRef } from "react";
import Typing from "./Typing";
import FileMessage from "./files/FileMessage";
import { removeMessage } from "../../../features/chatSlice";
import SocketContext from "../../../context/sendContext"

function ChatMessages({
  socket,
  typing,
  deletedMessage,
  setDeletedMessage,
  setOpenReplyMessage,
  handleReplyToggle,
}) {
  const { messages, activeConversation } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const endRef = useRef();
  const dispatch = useDispatch();

  const { token } = user;
  const deleteMessage = async (message_id) => {
    const values = {
      token,
      message_id,
    };
    let del_message = await dispatch(removeMessage(values));
    if(del_message?.payload?.success === true) {
      socket.emit("delete message", del_message.payload.data);
    } 
    
    setDeletedMessage(del_message.payload);
  };

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className={`mb-[60px] dark:darkBg lightBg
    bg-cover bg-no-repeat 
    `}
    >
      {/* container */}
      {/* <div className=""> */}
      <div className="scrollbar overflow_scrollbar overflow-auto py-2 px-[4%]">
        {/* messages */}
        {/* <ScrollToBottom className="overflow_scrollbar py-2 px-[4%]" > */}
        {messages &&
          messages.map((message, key) => (
            <div key={key}>
              {/* message files */}

              {message.files.length > 0
                ? message.files.map((file, key) => (
                    <FileMessage
                      fileMessage={file}
                      message={message}
                      key={key}
                      me={user._id === message.sender._id}
                      deleteMessage={deleteMessage}
                      deletedMessage={deletedMessage}
                    />
                  ))
                : null}

              {/* message texts */}
              {message.message.length > 0 ? (
                <Message
                  message={message}
                  key={message._id}
                  me={user._id === message.sender._id}
                  deleteMessage={deleteMessage}
                  deletedMessage={deletedMessage}
                  setOpenReplyMessage={setOpenReplyMessage}
                  handleReplyToggle={handleReplyToggle}
                />
              ) : null}
            </div>
          ))}
        {/* </ScrollToBottom> */}
        {typing === activeConversation._id ? <Typing /> : null}
        <div className="mt-10" ref={endRef}></div>
      </div>
    </div>
  );
}

const ChatMessagesWithContext = (props) => (
  <SocketContext.Consumer>
    {(socket) => <ChatMessages {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default ChatMessagesWithContext;
