import {Attachments} from "./attachments";
import Input from "./Input";
import { SendIcon } from "../../../svg";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../../features/chatSlice";
import { ClipLoader } from "react-spinners";
import EmojiPickerApp from "./EmojiPickerApp";

export default function ChatActions() {
const dispatch = useDispatch();
const [showAttachments, setShowAttachments] = useState(false);
const [showEmoji, setShowEmoji] = useState(false);
const [loading, setLoading] = useState(false);
const { activeConversation, status} = useSelector((state) => state.chat);
const { user } = useSelector((state) => state.user);
const { token } = user;
const [ message, setMessage ] = useState("");
const textRef = useRef();
const values = {
    message,
    convo_id: activeConversation._id,
    files: [],
    token,

}
const SendMessageHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    await dispatch(sendMessage(values));
    setMessage("");
    setLoading(false);

}

  return (
    <form 
    onSubmit={(e) => SendMessageHandler(e)}
    className="dark:bg-dark_bg_2 h-[60px] w-full flex items-center absolute bottom-0 py-2 px-4 select-none">
        {/* container */}
        <div className="w-full flex items-center gap-x-2">
            {/* emojies and attachement */}
            <ul className="flex gap-x-2">
                <EmojiPickerApp textRef={textRef} message={message} setMessage={setMessage} showEmoji={showEmoji} setShowEmoji={setShowEmoji} setShowAttachments={setShowAttachments} />
                <Attachments showAttachments={showAttachments} setShowAttachments={setShowAttachments} setShowEmoji={setShowEmoji} />
            </ul>
            {/* Input */}
            <Input message={message} setMessage={setMessage} textRef={textRef} />
            {/*send button */}
            
            <button type="submit" className="btn">
            {
               status === "loading" && loading ?
                <ClipLoader color="#E9EDEF" size={25} /> :
                <SendIcon className="dark:fill-dark_svg_1" />
            }
                
            </button>
        </div>
    </form>
  )
}
