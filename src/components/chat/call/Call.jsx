import { useState } from "react";
import CallActions from "./CallActions";
import CallArea from "./CallArea";
import Header from "./Header";
import Ringing from "./Ringing";

export default function Call({ 
  call, 
  setCall, 
  callAccepted, 
  myVideo, 
  userVideo,
  stream,
  answerCall,
  show,
  endCall,
  totalSecInCall,
  setTotalSecInCall
}) {
  const { receivingCall, callEnded, name, picture } = call;
  const [showActions, setShowActions ] = useState(false);
  const [toggle, setToggle] = useState(false);
    console.log(`callended ${callEnded} show ${show} {rec: ${receivingCall}  accp ${!callAccepted}}`)
  return (
    <>
    <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[550px] z-10 rounded-2xl overflow-hidden callbg
    ${!show || (receivingCall && !callAccepted) ? "hidden" : ""}
    `}
    onMouseOver={() => setShowActions(true)}
    onMouseOut={() => setShowActions(false)}
    >
      {/* Container */}
      <div>
        <div>
          {/* Header */}
          <Header />
          {/* Call area */}
          <CallArea 
          name={name} 
          picture={picture} 
          totalSecInCall={totalSecInCall} 
          setTotalSecInCall={setTotalSecInCall } 
          callAccepted={callAccepted}
          />
          {/* call actions */}
          { showActions ? <CallActions endCall={endCall} /> : null }
         
        </div>
        {/* Video streams */}
        <div>
          {/* User video */}
         {
          callAccepted && !callEnded ? (
            <div>
            <video 
            ref={userVideo} 
            playsInline muted 
            autoPlay 
            className={`${toggle ? "smallVideoCall" : "largeVideoCall"}`}
            onClick={() => setToggle((prev) => prev)}
            >
            </video>
          </div>
          ) : null
         }
          {/* my video */}
          {
            stream ? (
              <div>
            <video 
            ref={myVideo} 
            playsInline 
            muted 
            autoPlay 
            className={`${toggle ? "largeVideoCall" : "smallVideoCall"}  
            ${showActions ? "moveVideoCall" : ""}`}
            onClick={() => setToggle((prev)=> prev)}
            >

            </video>
          </div>
            ): null
          }
        </div>

      </div>
    </div>
    {/* ringing */}
      {
         receivingCall && !callAccepted && !callEnded && (
          <Ringing 
          call={call} 
          setCall={setCall} 
          answerCall={answerCall} 
          endCall={endCall}
          /> 
        )
      }
      {/* calling ringtone */}
      {
          !callAccepted && show ? <audio src="../../../../audio/ringing.mp3" autoPlay loop></audio> : null
      }
      </>
    
  )
}
