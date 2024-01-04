import moment from "moment";
import TriangleIcon from "../../../../svg/triangle";
import FileImageVideo from "./FileImageVideo";
import FileOthers from "./FileOthers";


export default function FileMessage({ fileMessage, message, me}) {
    const { file, type} = fileMessage;
  return (
    <div className={`w-full flex mt-2 sspace-x-3 max-w-xs ${ me ? "ml-auto justify-end" : ""}`}>
      {/* Message Container */}

      <div className="relative">
      {/* sender user message */}
      {
        !me && message.conversation.isGroup && (
      <div className="absolute top-1 left-[-37px]">
          <img src={message.sender.picture} alt="" className="w-8 h-8 rounded-full" />
      </div>
      )
      }
       
      <div className={`relative h-full dark:text-dark_text_1 rounded-lg
      ${me ? "border-[3px] border-green_3 " : "dark:bg-dark_bg_2"}
      ${me && file.public_id.split('.')[1] === "png" ? "bg-white" : "bg-green_3 p-1"}
      `}>
        {/* message */} 
        <p className={`h-full text-sm ${type !== "IMAGE" && type !== "VIDEO" ? "pb-5" : ""}`}>
           {
            type === "IMAGE" || type === "VIDEO" ? 
            <FileImageVideo url={file.secure_url} type={type}/> 
            : 
            <FileOthers file={file} type={type} />
           }
        </p>
        {/* message date */}
        <span className="absolute right-1.5 bottom-1.5 text-xs text-dark_text_5 leading-none"
        >{moment(message.createdAt).format("HH:mm:a")}
        </span>
        {/* Triangle */}
        <span>
        {
            !me ? 
            <TriangleIcon className="dark:fill-dark_bg_2 rotate-[60deg] absolute top-[-5px] -left-1.5 " /> : null
        }
        </span>
      </div>
    </div>
    </div>
  )
}
