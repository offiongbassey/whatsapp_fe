import { useDispatch, useSelector } from "react-redux";
import { openCreateCoversation } from "../../../features/chatSlice";
import SocketContext from "../../../context/sendContext";

function Contact({ contact, setSearchResults, socket}) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const values = {
    token: user.token,
    isGroup: false,
    receiver_id: contact._id
  }

  const openConversation = async () => {
   let newConvo = await dispatch(openCreateCoversation(values));
   socket.emit("join conversation", newConvo.payload._id);
   setSearchResults([]);
  }
  return (
    <li
    onClick={() => openConversation()}
    className="list-none h-[72px] hover:dark:bg-dark_bg_2 cursor-pointer dark:text-dark_text_1 px-[10px]">
      {/* Container */}
      <div className="flex items-center gap-x-3 py-[10px]">
        {/* contact */}
        <div className="flex items-center gap-x-3">
            {/* Conversation  user picture*/}
          <div className="relative min-w-[50px] max-w-[50px] h-[50px] rounded-full overflow-hidden">
            <img src={contact.picture} alt={contact.name} className="w-full h-full object-cover" />
          </div>
          {/* Conversation name and message */}
          <div className="w-full flex flex-col">
              {/* Conversation name */}
                <h1 className="font-bold flex items-center gap-x-2">
                  {contact.name}
                  </h1>
                {/* Conversation status */}
                <div>
                    <div className="flex items-center gap-x-1 dark:text-dark_text_2">
                        <div className="flex-1 items-center gap-x-1 dark:text-dark_text_2">
                          <p>{contact.status}</p>

                        </div>
                    </div>
                </div>
          </div>
        </div>
      </div>
      {/* Border */}
      <div className="ml-16 border-b dark:border-b-dark_border_1"></div>
    </li>
  )
}

const ContactWithContext = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Contact {...props} socket={socket}/>}
  </SocketContext.Consumer>
);

export default ContactWithContext;