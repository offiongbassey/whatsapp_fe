import moment from "moment";
import { dateHandler } from "../../../utils/date";
import { useDispatch, useSelector } from "react-redux";
import { openCreateCoversation } from "../../../features/chatSlice";
import {
  getConversationId,
  getConversationName,
  getConversationPicture,
} from "../../../utils/chat.js";
import { capitalize } from "../../../utils/string";
import SocketContext from "../../../context/sendContext.js";
import DangerIcon from "../../../svg/Danger.js";
import { useState } from "react";

function Conversation({
  convo,
  socket,
  online,
  typing,
  deletedMessage,
  setMobileToggle,
}) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);

  const values = {
    token: user.token,
    isGroup: convo.isGroup ? convo._id : false,
    receiver_id: getConversationId(user, convo.users),
  };

  function isMobileScreen() {
    return window.innerWidth <= 768;
  }
  let isMobile;
  if(isMobileScreen()) isMobile = true;
  else isMobile = false;
  
  const openConversation = async () => {
    let newConvo = await dispatch(openCreateCoversation(values));
    if(newConvo.payload.success === true) {
      socket.emit("join conversation", newConvo.payload.data._id);
    } 
    
  };

  return (
    <li
      onClick={() => {
        openConversation();
        isMobile && setMobileToggle(true);
      }}
      className={`list-none h-[72px] w-full dark:bg-dark_bg_1  hover:${
        convo._id !== activeConversation._id ? "dark:bg-dark_bg_2 bg-white" : ""
      } cursor-pointer dark:text-dark_text_1 px-[10px] ${
        convo._id === activeConversation._id ? "dark:bg-dark_hover_1 bg-light_bg_3" : ""
      }`}
    >
      {/* Container */}
      <div className="relative w-full flex items-center justify-between py-[10px]">
        {/* left */}
        <div className="flex items-center gap-x-3">
          {/* Conversation  user picture*/}
          <div
            className={`relative min-w-[50px] max-w-[50px] h-[50px] rounded-full overflow-hidden ${
              online ? "online" : ""
            } `}
          >
            <img
              src={
                convo.isGroup
                  ? convo.picture
                  : getConversationPicture(user, convo.users)
              }
              alt={
                convo.isGroup
                  ? convo.name
                  : getConversationName(user, convo.users)
              }
              className="w-full h-full object-cover"
            />
          </div>
          {/* Conversation name and message */}
          <div className="w-full flex flex-col min-w-[240px]">
            {/* Conversation name */}
            <h1 className="flex items-center gap-x-2">
              {convo.isGroup
                ? convo.name
                : getConversationName(user, convo.users)}
            </h1>
            {/* Conversation Message */}
            <div>
              <div className="flex items-center gap-x-1 dark:text-dark_text_2">
                <div className="flex-1 items-center gap-x-1 dark:text-dark_text_2">
                  {typing === convo._id ? (
                    <p className="text-green_1">Typing</p>
                  ) : (
                    <>
                      {deletedMessage?._id === convo?.latestMessage?._id ? (
                        <DangerIcon className="float-left" />
                      ) : (
                        convo?.latestMessage?.status === "deleted" && (
                          <DangerIcon className="float-left" />
                        )
                      )}
                      <p
                        className={`text-light_text_2 ${
                          deletedMessage?._id === convo?.latestMessage?._id
                            ? "italic"
                            : convo?.latestMessage?.status === "deleted"
                            ? "italic"
                            : ""
                        }`}
                      >
                        {convo?.latestMessage?.message?.length > 30 &&
                        convo?.latestMessage?.status === "active"
                          ? `${convo?.latestMessage?.message.substring(
                              0,
                              20
                            )}...`
                          : deletedMessage?._id === convo?.latestMessage?._id &&
                            convo?.latestMessage?.sender?._id === user._id
                          ? "You deleted this message."
                          : deletedMessage?._id === convo?.latestMessage?._id &&
                            convo?.latestMessage?.sender?._id !== user._id
                          ? "This message was deleted."
                          : convo?.latestMessage?.status === "deleted" &&
                            convo?.latestMessage?.sender?._id === user._id
                          ? "You deleted this message"
                          : convo?.latestMessage?.status === "deleted" &&
                            convo?.latestMessage?.sender?._id !== user._id
                          ? "This message was deleted."
                          : convo?.latestMessage?.message}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*  Right */}
        <div className="flex flex-col gap-y-4 items-end text-xs">
          <span className="text-light_text_2 dark:text-dark_text_2">
            {dateHandler(convo?.latestMessage?.createdAt)}
          </span>
        </div>
      </div>
      {/* Border */}
      <div className="ml-16 border-b dark:border-b-dark_border_1"></div>
    </li>
  );
}

const ConversationWithContext = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Conversation {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default ConversationWithContext;
