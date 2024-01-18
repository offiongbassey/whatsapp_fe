import { useDispatch, useSelector } from "react-redux";
import Add from "./Add";
import { CloseIcon, SendIcon } from "../../../../svg";
import { uploadFiles } from "../../../../utils/upload";
import { useState } from "react";
import {
  clearFiles,
  removeFileFromFiles,
  sendMessage,
} from "../../../../features/chatSlice";
import SocketContext from "../../../../context/sendContext";
import { ClipLoader } from "react-spinners";
import VideoThumbnail from "react-video-thumbnail";

function HandleAndSend({ activeIndex, setActiveIndex, message, socket }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { files, activeConversation } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const sendMessageHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    //upload files
    const upload_files = await uploadFiles(files);
    //send the message
    const values = {
      token: user.token,
      message,
      convo_id: activeConversation._id,
      files: upload_files.length > 0 ? upload_files : [],
    };
    let newMsg = await dispatch(sendMessage(values));
    if(newMsg.payload.success === true) {
      socket.emit("send message", newMsg.payload.data);
    } 
    
    dispatch(clearFiles());
    setLoading(false);
  };
  //remove file
  const handleRemoveFile = (index) => {
    dispatch(removeFileFromFiles(index));
  };
  return (
    <div className="w-[97%] flex items-center justify-between mt-2 border-t dark:border-dark_border_2">
      {/* Empty */}
      <span></span>
      {/* list files */}
      <div className="flex gap-x-2">
        {files.map((file, i) => (
          <div
            key={i}
            className={`fileThumbnail relative w-14 h-14 border dark:border-white rounded-md overflow-hidden cursor-pointer
          ${activeIndex === i ? "border-[3px] !border-green_1" : ""}
          `}
            onClick={() => setActiveIndex(i)}
          >
            {file.type === "IMAGE" ? (
              <img
                src={file.fileData}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : file.type === "VIDEO" ? (
              <VideoThumbnail videoUrl={file.fileData} />
            ) : (
              <img
                src={`../../../../images/file/${file.type}.png`}
                alt=""
                className="w-8 h-10 mt-1.5 ml-2.5"
              />
            )}
            {/* Remove file icon */}
            <div
              className="removeFileIcon hidden"
              onClick={() => handleRemoveFile(i)}
            >
              <CloseIcon className="dark:fill-white absolute right-0 top-0 w-6 h-6" />
            </div>
          </div>
        ))}
        {/* Add another file */}
        <Add setActiveIndex={setActiveIndex} />
      </div>
      {/* send button */}
      <button
        type="button"
        disabled={loading ? true : false}
        className="bg-green_1 w-16 h-16 mt-2 rounded-full flex items-center justify-center cursor-pointer"
        onClick={(e) => sendMessageHandler(e)}
      >
        {loading ? (
          <ClipLoader color="#E9EDEF" size={25} />
        ) : (
          <SendIcon className="fill-white" />
        )}
      </button>
    </div>
  );
}

const HandleAndSendWithContext = (props) => (
  <SocketContext.Consumer>
    {(socket) => <HandleAndSend {...props} socket={socket} />}
  </SocketContext.Consumer>
);
export default HandleAndSendWithContext;
