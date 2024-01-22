import EmojiPicker from "emoji-picker-react";
import { CloseIcon } from "../../../svg";
import { ClipLoader } from "react-spinners";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitReactionEmoji } from "../../../features/chatSlice";
import SocketContext from "../../../context/sendContext";

function ReactionEmoji({ showEmoji, onClose, setShowEmoji, message, socket }) {
  const [loading, setLoading] = useState(false);
  const { user, theme } = useSelector((state) => state.user);
  const { token } = user;

  const dispatch = useDispatch();

  const handleReactionEmoji = async (emojiData, e) => {
    const { emoji } = emojiData;
    setLoading(true);
    const value = {
      token,
      emoji,
      message_id: message._id,
    };
    const result = await dispatch(submitReactionEmoji(value));
    if(result.payload.success === true) {
      socket.emit("send reaction", result.payload.data);
    } 
    setLoading(false);
    setShowEmoji(false);
  };
  return (
    <div
      onClick={onClose}
      className={`
    fixed inset-0 flex justify-center items-center
    transition-colors
    ${showEmoji ? "visible bg-dark_bg_6/1 z-20" : "invisible"}
    `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`dark:bg-transparent bg-transparent rounded-sm p-6 transition-all 
      ${showEmoji ? "scale-100 opacity-100" : "scale-125 opacity-0"}
      `}
      >
        <div className="mt-[350px]">
          <ul className="gap-x-2">
            <li className="w-64">
              {/* emoji picket */}
              {showEmoji ? (
                <div className="openEmojiAnimation absolute bottom-[60px] left-[-0.5px] w-full">
                  <EmojiPicker
                    theme={theme === "dark" ? "dark" : "light"}
                    onEmojiClick={handleReactionEmoji}
                  />
                </div>
              ) : null}
            </li>
          </ul>

          {/* <div className="mx-auto w-72 flex flex-col items-end">
            <div className="flex gap-4 mb-4 pl-4">
              <span
                className="cursor-pointer scale-150 pt-24"
                onClick={() => setShowEmoji(false)}
              >
                {!loading ? (
                  <CloseIcon className="dark:fill-dark_svg_1" />
                ) : (
                  <ClipLoader color="red" className="fill-white bg-white mt-2 h-full" />
                )}
              </span>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

const ReactionEmojiWithContext = (props) => (
  <SocketContext.Consumer>
    {(socket) => <ReactionEmoji {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default ReactionEmojiWithContext;
