export default function MessageMenu({ message, me, deleteHandler }) {

  const editMessage = async (message_id, message) => {
    console.log("Editing Message", message_id, message);
  } 
  return (
    <>
    <div className="absolute mt-10 right-1 z-50 dark:bg-dark_bg_2 dark:text-dark_text_1 shadow-md w-48">
      <ul>
        {/* <li className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3">
          <span>Message Info</span>
        </li> */}
        <li className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3">
          <span>Reply</span>
        </li>
        <li className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3">
          <span>React</span>
        </li>
        {/* <li className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3">
          <span>Forward</span>
        </li> */}
        {
          me ? <li onClick={() => editMessage(message._id, message.message)} className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3">
          <span>Edit</span>
        </li> : null
        }
        
        {/* <li className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3">
          <span>Pin</span>
        </li> */}
        {/* <li className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3">
          <span>Star</span>
        </li> */}
        {
          me ? <li onClick={deleteHandler} className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3">
          <span>Delete</span>
        </li> : null
        }
        
      </ul>
    </div>

     
    </>
  )
}
