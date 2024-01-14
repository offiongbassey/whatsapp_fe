import { CloseIcon, ValidIcon } from "../../svg";
import moment from "moment";
import InputWithSocket from "../chat/actions/Input";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editMessage } from "../../features/chatSlice";
import { ClipLoader } from "react-spinners";
import SocketContext from "../../context/sendContext";

function EditModal({socket, open, onClose, message, setOpenEditModal}) {
const [newMessage, setNewMessage] = useState(message.message);
const { user} = useSelector((state) => state.user);
const { token } = user;
const [loading, setLoading] = useState(false);
const textRef = useRef();
const dispatch = useDispatch();

const value = {
    message: newMessage,
    token, 
    message_id: message._id
  }
  const editMessageHandler = async (e) => {
    e.preventDefault();
    if(newMessage !== ""){
        setLoading(true);
        let editMsg = await dispatch(editMessage(value));
        socket.emit("edit message", editMsg.payload);
        setOpenEditModal(false);
        setLoading(false);
        console.log(editMsg);
    }
  }

  return (
    <form
    onSubmit={(e) => editMessageHandler(e)}
    >
    <div 
    onClick={onClose}
    className={`
    fixed inset-0 flex justify-center items-center
    transition-colors
    ${open ? "visible bg-dark_bg_6/80 z-20" : "invisible"}
    `}>
        <div
        onClick={(e) => e.stopPropagation()}
        className={`dark:bg-dark_hover_1 w-[35%] min-w-96 rounded-sm shadow pt-6 transition-all
        ${open ? "scale-100 opacity-100": "scale-125 opacity-0"}`}
        >
            <div>
                <div className="flex gap-4 mb-4 pl-4">
                    <span className="cursor-pointer"
                    onClick={() => setOpenEditModal(false)}>
                        <CloseIcon className="dark:fill-dark_svg_1" />
                    </span>
                <p className="dark:text-dark_text_1">Edit Message</p>
                </div>
                <div className="bg-[url('https://res.cloudinary.com/dmhcnhtng/image/upload/v1677358270/Untitled-1_copy_rpx8yb.jpg')] bg-cover bg-no-repeat p-14">
                    <div className="relative flex h-full  dark:text-dark_text_1 p-2 rounded-lg bg-[#1f6052]">
                        <p className="float-left h-full text-sm pb-4">{message.message}</p>
                        {/* message date */}
                        <span className="absolute right-1.5 bottom-1.5 text-xs text-dark_text_5 leading-none">
                        {moment(message.createdAt).format("HH:mm:a")}
                        </span>
                    </div>
                   
                </div>
                
                <div className="dark:bg-dark_bg_1 p-4 flex gap-4">
                {/* input section */}
                <InputWithSocket message={newMessage} setMessage={setNewMessage} textRef={textRef} />
                <button 
                type="submit" 
                disabled={loading ? true : false }
                className="btn bg-green_1 scale-100">
                    {
                        loading ? 
                        <ClipLoader size={25} /> :
                        <ValidIcon className="fill-white mt-2 h-full"/>
                    }
                    </button> 
                </div>
            </div>
        </div>
    </div>
    </form>
  )
}

const EditModalWithContext = (props) => (
    <SocketContext.Consumer>
        {(socket) => <EditModal {...props} socket={socket} />}
    </SocketContext.Consumer>
);

export default EditModalWithContext;
