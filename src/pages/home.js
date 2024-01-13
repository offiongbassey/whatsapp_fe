import { useEffect, useRef, useState } from "react";
import SimplePeer from "simple-peer";
import { Sidebar } from "../components/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getConversations, updateMessagesAndConversations, updateDeletedMessage } from "../features/chatSlice";
import { WhatsappHome } from "../components/chat/Welcome";
import { ChatContainer } from "../components/chat";
import SocketContext from "../context/sendContext";
import Call from "../components/chat/call/Call";
import { getConversationId, getConversationName, getConversationPicture } from "../utils/chat";

const callData = {
  socketId: '',
  receivingCall: false,
  callEnded: false,
  name: '',
  picture: ''
}

function Home({ socket }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);
  const [onlineUsers, setOnlineUsers] = useState([]);

  //deleted messages
  const [deletedMessage, setDeletedMessage] = useState([]);
  //call
  const [call, setCall] = useState(callData);
  const [stream, setStream] = useState();
  const [show, setShow] = useState(false);
  const { receivingCall, callEnded, socketId } = call;
  const [callAccepted, setCallAccepted] = useState(false);
  const [totalSecInCall, setTotalSecInCall] = useState(0);
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  //typing
  const [typing, setTyping] = useState(false);
  //join user into this socket io
  useEffect(() => {
    socket.emit('join', user._id);
    //get online users
    socket.on('get-online-users', (users) => {
      setOnlineUsers(users);  
    })
  },[user]);

//call
useEffect(() => {
  setUpMedia()
  socket.on('setup socket', (id) => {
    setCall({...call, socketId: id});
  })
  socket.on('call user', (data) => {
    setCall({...call, 
      socketId: 
      data.from, 
      name: data.name, 
      picture: data.picture, 
      signal: data.signal, 
      receivingCall: true,
     })
  })
  socket.on('end call', () => {
    setShow(false);
    setCall({...call, callEnded: true, receivingCall: false});
    myVideo.current.srcObject = null;
    connectionRef?.current?.destroy();
    window.location.reload();
  })
},[]);

//call user function
const callUser = () => {
  enableMedia();
  setCall({...call, 
    name:getConversationName(user, activeConversation.users),
    picture: getConversationPicture(user, activeConversation.users)
  });
  const peer = new SimplePeer({
    initiator: true,
    trickle: false,
    stream: stream,
  });
  peer.on('signal', (data) => {
    socket.emit('call user', {
      userToCall: getConversationId(user, activeConversation.users),
      signal: data,
      from: socketId,
      name:  user.name,
      picture: user.picture,
    })
  });
  peer.on("stream", (stream) => {
    userVideo.current.srcObject = stream;
  });
  socket.on("call accepted", (signal) => {
    setCallAccepted(true);
    peer.signal(signal);
  })
  connectionRef.current = peer;
}

// answer user function 
const answerCall = () => {
  enableMedia();
  setCallAccepted(true);
  const peer = new SimplePeer({
    initiator: false,
    trickle: false,
    stream: stream,
  });
  peer.on('signal', (data) => {
    socket.emit('answer call', {signal:data, to:call.socketId})
  })
  peer.on('stream', (stream) => {
    userVideo.current.srcObject = stream;
  });
  peer.signal(call.signal);
  connectionRef.current = peer;
}

//end call function
const endCall = () => {
  setShow(false);
  setCall({...call, callEnded: true, receivingCall: false});
  myVideo.current.srcObject = null;
  socket.emit("end call", call.socketId);
  connectionRef?.current?.destroy();
  window.location.reload();
}

const setUpMedia = () => {
  navigator.mediaDevices.getUserMedia({ video: true, audio: true})
  .then((stream) => {
    setStream(stream);
  })
}

const enableMedia = () => {
  myVideo.current.srcObject = stream;
  setShow(true);
}


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

    //listening when a message is deleted
    socket.on("deletedMessage", (msg) => {
      setDeletedMessage(msg);
      dispatch(updateDeletedMessage(msg));
    });

  },[]);

  return (
    <>
    <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden">
        {/* Container */}
        <div className="container h-screen flex py-[19px]">
          {/*  sidebar */}
          <Sidebar onlineUsers={onlineUsers} typing={typing} deletedMessage={deletedMessage} />
          {
            activeConversation._id ?
          <ChatContainer onlineUsers={onlineUsers} typing={typing}  callUser={callUser} deletedMessage={deletedMessage} setDeletedMessage={setDeletedMessage} />
            : 
            <WhatsappHome />
          }
        </div>      
    </div>
    {/* Call components */}
    <Call call={call} 
    setCall={setCall} 
    callAccepted={callAccepted} 
    myVideo={myVideo} 
    userVideo={userVideo}
    stream={stream}
    answerCall={answerCall}
    show={show}
    endCall={endCall}
    totalSecInCall={totalSecInCall}
    setTotalSecInCall={setTotalSecInCall}
    />
    </>
  )
}

const HomeWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Home {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default HomeWithSocket;
