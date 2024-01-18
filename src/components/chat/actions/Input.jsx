import { useEffect, useState } from "react";
import SocketContext from "../../../context/sendContext";
import { useSelector } from "react-redux";

function Input({
  message,
  setMessage,
  textRef,
  socket,
  handleKeyDown,
  textareaDetector,
  setTextAreaDetector,
}) {
  const [typing, setTyping] = useState(false);
  const { activeConversation } = useSelector((state) => state.chat);
  const onChangeHandler = (e) => {
    setMessage(e.target.value);
    if (!typing) {
      setTyping(true);
      socket.emit("typing", activeConversation._id);
    }
    let lastTypingTime = new Date().getTime();
    let timer = 2000;
    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timer && typing) {
        socket.emit("stop typing", activeConversation._id);
        setTyping(false);
      }
    }, timer);
    adjustRows(e.target);
  };

  const adjustRows = (element) => {
    const minRows = 1;
    const maxRows = 4;
    const lineHeight = 24; // Adjust this value based on your textarea's line-height
    const contentRows = Math.floor(element.scrollHeight / lineHeight);

    if (contentRows >= minRows && contentRows <= maxRows) {
      element.rows = contentRows;
    } else if (contentRows > maxRows) {
      element.rows = maxRows;
    } else {
      element.rows = minRows;
    }
    setTextAreaDetector(element.rows);
  };

  return (
    <div className="w-full">
      <textarea
        id="message"
        rows={textareaDetector}
        onChange={onChangeHandler}
        ref={textRef}
        value={message}
        onKeyDown={handleKeyDown}
        className="p-2.5 w-full pb-2 text-sm dark:bg-dark_hover_1 dark:text-dark_text_1 outline-none flex-1 rounded-lg pl-4"
        placeholder="Type a message"
      />
      {/* <input type="text" className="dark:bg-dark_hover_1 dark:text-dark_text_1 outline-none h-[45px] w-full flex-1 rounded-lg pl-4" 
        placeholder="Type a message"
        value={message}
        onChange={onChangeHandler}
        ref={textRef}
        />  */}
    </div>
  );
}

const InputWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Input {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default InputWithSocket;
