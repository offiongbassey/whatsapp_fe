

export default function ProfileImage({ open, onClose, setOpenModal, user}) {
    console.log("geetingint", open);
  return (
    <div
        onClick={onClose}
        className={`
        fixed inset-0 
        transition-colors
        ${open ? "visible bg-dark_bg_6/80 z-20" : "invisible"}`}
    >   
        <div className="flex p-5">
            <div className="flex gap-4">
               <button className="btn">
                <img
                src={user.picture}
                alt={user.name}
                className="w-10 h-full rounded-full object-cover"
                />
                </button>
                <p className="pt-2">{user.name}</p>
            </div>

            <div className="absolute right-5">
                 <button 
                 className="btn cursor-pointer"
                 onClick={() => setOpenModal(false)}
                >
                    <span className="scale-150 cursor-pointer">X</span>
                </button>
            </div>
        </div>

        <div className="fixed inset-0  flex justify-center items-center">
                <div
                onClick={(e) => e.stopPropagation()}
                className={`shadow transition-all
                ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
                `}
                >
                    <img
                    src={user.picture}
                    alt={user.name}
                    className="w-[420px] h-full object-cover"
                    />
                </div>
        </div>
    </div>
  )
}
