import { useEffect, useState } from "react";
import { Sidebar } from "../components/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getConversations, updateMessagesAndConversations } from "../features/chatSlice";
import { WhatsappHome } from "../components/chat/Welcome";
import { ChatContainer } from "../components/chat";
import SocketContext from "../context/sendContext";
function Home({ socket }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);
  const [onlineUsers, setOnlineUsers] = useState([]);
  //typing
  const [typing, setTyping] = useState(false);
  //join user into this socket io
  useEffect(() => {
    socket.emit('join', user._id);
    //get online users
    socket.on('get-online-users', (users) => {
      setOnlineUsers(users);  
      console.log("Online Users: ", users)
    })
  },[user])

  //get conversations
  useEffect(() => {
    if(user.token){
      dispatch(getConversations(user.token));
    }
  }, [user]);
  //Listening to received messages
  useEffect(() => {
    socket.on('receive message', (message) => {
      dispatch(updateMessagesAndConversations(message));
    });
    //listening when a user is typing
    socket.on("typing", (conversation) => setTyping(conversation));
    socket.on("stop typing", (message) => setTyping(false));

  },[]);

  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden">
        {/* Container */}
        <div className="container h-screen flex py-[19px]">
          {/*  sidebar */}
          <Sidebar onlineUsers={onlineUsers} typing={typing}/>
          {
            activeConversation._id ?
            <ChatContainer onlineUsers={onlineUsers} typing={typing} />
            : 
            <WhatsappHome />
          }
        </div>      
    </div>
  )
}

const HomeWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Home {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default HomeWithSocket;
