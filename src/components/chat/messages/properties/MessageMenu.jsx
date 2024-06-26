export default function MessageMenu({
  open,
  onClose,
  message,
  me,
  deleteHandler,
  editHandler,
  handleEmoji,
  setOpenReplyMessage,
  handleReplyToggle,
}) {

  return (
    <>
      <div
        onClick={onClose}
        className={`
    fixed inset-0 flex justify-center items-center
    transition-colors
    ${open ? "visible bg-dark_bg_6/10 z-20" : "invisible"}
    `}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`absolute mt-10 ${
            me ? "right-24" : "left-42"
          } z-50 dark:bg-dark_bg_2 bg-light_bg_1 text-light_text_1 dark:text-dark_text_1 shadow-md w-48`}
        >
          <ul>
            <li
              onClick={(e) => {
                handleReplyToggle(message);
                onClose();
              }}
              className="py-3 pl-5 cursor-pointer dark:hover:bg-dark_bg_3 hover:bg-light_bg_3"
            >
              <span>Reply</span>
            </li>
            <li
              onClick={handleEmoji}
              className="py-3 pl-5 cursor-pointer dark:hover:bg-dark_bg_3 hover:bg-light_bg_3"
            >
              <span>React</span>
            </li>
            {me ? (
              <li
                onClick={editHandler}
                className="py-3 pl-5 cursor-pointer dark:hover:bg-dark_bg_3 hover:bg-light_bg_3"
              >
                <span>Edit</span>
              </li>
            ) : null}
            {me ? (
              <li
                onClick={deleteHandler}
                className="py-3 pl-5 cursor-pointer dark:hover:bg-dark_bg_3 hover:bg-light_bg_3"
              >
                <span>Delete</span>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </>
  );
}
