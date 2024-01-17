export default function ReactionPreview({ open, onClose, setOpenReactionPreview, message, _id, me}) {
 
  return (
    <div 
    onClick={onClose}
    className={`
    fixed inset-0 flex justify-center transition-colors
    ${open ? "visible bg-dark_bg_6/10 z-20" : "invisible" }`}>
        <div 
        onClick={(e) => e.stopPropagation()}
        className={`dark:bg-dark_bg_4 w-80 ${ me ? "right-24" : "" }  bottom-44 absolute rounded-3xl shadow p-6 transition-all
        ${open ? "scale-100 opacity-100" : "scale-125 opacity-0" } `}>

            <div>
                <p>All <span className="dark:text-gray-400 ml-2"> {message.reaction.length}</span></p>
                <hr className="border-1 border-gray-500"/>
                <div className="mt-2">
                    <ul>
                        {message.reaction.map((react) => (
                        <li className="pb-2">
                            <div className="flex gap-4">
                                <img src={react?.user?.picture} alt="" className="w-8 h-8 rounded-full" />
                                <p>{_id === react?.user?._id ? "You" : react?.user?.name} </p>
                                <span className="scale-150 absolute right-5">{react.emoji}</span>
                            </div>
                        </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div> 
      
    </div>
  )
}
