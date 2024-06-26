export default function DeleteModal({
  open,
  onClose,
  message,
  setOpenModal,
  deleteMessageHandler,
}) {
  return (
    <div
      onClick={onClose}
      className={`
    fixed inset-0 flex justify-center items-center
    transition-colors
    ${open ? "visible dark:bg-dark_bg_6/80 bg-light_bg_1/80 z-20" : "invisible"}
    `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`dark:bg-dark_hover_1 w-64 md:w-96 bg-white text-light_text_1 rounded-sm shadow-xl p-6 transition-all 
      ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
      `}
      >
        <div className="">
          <p className="dark:text-dark_svg_1 text-sm mb-12">Delete messages?</p>
          <div className="mx-auto my-4 flex flex-col items-end">
            <button
              onClick={() => deleteMessageHandler(message._id)}
              className="btn w-[200px] mb-6 text-teal-600 hover:text-teal-500 dark:bg-dark_hover_1 border border-light_bg_3 hover:shadow-xl transition duration-700 dark:border-gray-600"
            >
              Delete for everyone
            </button>
            <button
              className="btn w-[150px] mb-6 text-teal-600 hover:text-teal-500 dark:bg-dark_hover_1 border border-light_bg_3 hover:shadow-xl transition duration-700 dark:border-gray-600"
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
