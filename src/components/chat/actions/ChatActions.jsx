import { Attachments } from "./attachments";
import Input from "./Input";
import { CloseIcon, SendIcon } from "../../../svg";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { replyMessage, sendMessage } from "../../../features/chatSlice";
import { ClipLoader } from "react-spinners";
import EmojiPickerApp from "./EmojiPickerApp";
import SocketContext from "../../../context/sendContext";

function ChatActions({
  socket,
  setOpenReplyMessage,
  handleReplyToggle,
  currentReplyMessage,
  setCurrentReplyMessage,
  openReplyMessage,
  mobileToggle
}) {
  const dispatch = useDispatch();
  const [showAttachments, setShowAttachments] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [loading, setLoading] = useState(false);
  const { activeConversation, status } = useSelector((state) => state.chat);
  const { user, theme } = useSelector((state) => state.user);
  const { token } = user;
  const [message, setMessage] = useState("");
  const [textareaDetector, setTextAreaDetector] = useState(1);
  const textRef = useRef();
  const values = {
    message,
    convo_id: activeConversation._id,
    files: [],
    token,
    reply_id: currentReplyMessage !== "" ? currentReplyMessage._id : null,
  };

  const SendMessageHandler = async (e) => {
    e.preventDefault();
    if (message !== "") {
      setLoading(true);
      let newMsg = await dispatch(sendMessage(values));
      //only emit when operation is successful;
      if(newMsg.payload.success === true) {
        socket.emit("send message", newMsg.payload.data)
      } 
      setShowEmoji(false);
      setShowAttachments(false);
      setMessage("");
      setLoading(false);
      setTextAreaDetector(1);
    }
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      //check if it's a reply or new message
      if (!openReplyMessage) {
        SendMessageHandler(e);
      } else {
        sendReplyHandler(e);
      }
    }
  };

  const sendReplyHandler = async (e) => {
    e.preventDefault();
    if (message !== "") {
      setLoading(true);
      let newMsg = await dispatch(replyMessage(values));
      //only emit when operation is successful;
      if(newMsg.payload.success === true) {
        socket.emit("reply message", newMsg.payload.data);
      } 
      setShowEmoji(false);
      setShowAttachments(false);
      setCurrentReplyMessage("");
      setOpenReplyMessage(false);
      setMessage("");
      setLoading(false);
      setTextAreaDetector(1);
    }
  };
  return (
    <form
      onSubmit={(e) => {
        if (!openReplyMessage) {
          SendMessageHandler(e);
        } else {
          sendReplyHandler(e);
        }
      }}
      // ${currentReplyMessage === "" ? "min-h-[60px]" :  "min-h-[115px]"}
      className={`dark:bg-dark_bg_2 bg-light_bg_1
     ${
       currentReplyMessage === "" && textareaDetector > 3
         ? "max-h-[115px]"
         : currentReplyMessage === "" && textareaDetector > 2
         ? "max-h-[95px]"
         : currentReplyMessage === "" && textareaDetector > 1
         ? "max-h-[80px]"
         : currentReplyMessage === "" && textareaDetector > 0
         ? "max-h-[60px]"
         : currentReplyMessage !== "" && textareaDetector > 3
         ? "max-h-[300px]"
         : currentReplyMessage !== "" && textareaDetector > 2
         ? "max-h-[250px]"
         : currentReplyMessage !== "" && textareaDetector > 1
         ? "max-h-[200px]"
         : currentReplyMessage !== "" && textareaDetector > 0
         ? "max-h-[150px]"
         : "max-h-[60px]"
     } 
   
    
    w-full items-center absolute bottom-0 py-2 px-4 select-none `}
    >
      {/* container */}
      {/*  reply */}
      {openReplyMessage ? (
        <div className="flex">
          <div className="w-[905px] mb-3 bg-light_bg_3 dark:bg-dark_bg_1 rounded-lg flex overflow-hidden">
            <span
              className={`${
                currentReplyMessage.sender._id === user._id
                  ? "dark:bg-blue-400 bg-green-400"
                  : "dark:bg-green-400 bg-blue-400"
              }  py-6 w-1 h-[80px]`}
            ></span>
            <div className="absolute m-3">
              <p
                className={`${
                  currentReplyMessage.sender._id === user._id
                    ? "dark:text-blue-400 text-green-400"
                    : "dark:text-green-400 text-blue-400"
                } text-xs font-semibold`}
              >
                {currentReplyMessage !== "" &&
                currentReplyMessage.sender._id === user._id
                  ? "You"
                  : currentReplyMessage !== "" &&
                    currentReplyMessage.sender._id !== user._id
                  ? currentReplyMessage.sender.name
                  : null}
              </p>
              <p className="dark:text-dark_text_2 text-xs">{`${
                currentReplyMessage.message.length > 120 &&
                currentReplyMessage !== ""
                  ? `${currentReplyMessage.message.substring(0, 120)}...`
                  : currentReplyMessage.message.length <= 120 &&
                    currentReplyMessage !== ""
                  ? currentReplyMessage.message
                  : null
              }`}</p>
            </div>
          </div>
          <div>
            <span
              onClick={() => {
                setOpenReplyMessage(false);
                setCurrentReplyMessage("");
              }}
              className="scale-100 cursor-pointer absolute right-5 top-10"
            >
              <CloseIcon className="dark:fill-gray-400" />
            </span>
          </div>
        </div>
      ) : null}
      {/* reply ends here */}
      <div className="w-full flex items-center gap-x-2">
        {/* emojies and attachement */}
        <ul className="flex gap-x-2">
          {/*  hiding emojipicker on mobile device */}
          {!mobileToggle &&
          <EmojiPickerApp
            textRef={textRef}
            message={message}
            setMessage={setMessage}
            showEmoji={showEmoji}
            setShowEmoji={setShowEmoji}
            setShowAttachments={setShowAttachments}
          />
          }
          <Attachments
            showAttachments={showAttachments}
            setShowAttachments={setShowAttachments}
            setShowEmoji={setShowEmoji}
          />
        </ul>
        {/* Input */}
        <Input
          message={message}
          setMessage={setMessage}
          textRef={textRef}
          handleKeyDown={handleKeyDown}
          textareaDetector={textareaDetector}
          setTextAreaDetector={setTextAreaDetector}
        />
        {/*send button */}

        <button type="submit" className="btn" disabled={loading ? true : false}>
          {loading ? (
            <ClipLoader color={`${theme === "dark" ? "#E9EDEF" : "#000"}`}  size={25} />
          ) : (
            <SendIcon className="dark:fill-dark_svg_1 fill-light_text_2" />
          )}
        </button>
      </div>
    </form>
  );
}

const ChatActionsWithContext = (props) => (
  <SocketContext.Consumer>
    {(socket) => <ChatActions {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default ChatActionsWithContext;
