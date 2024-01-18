import { useDispatch, useSelector } from "react-redux";
import { CloseIcon } from "../../../../svg";
import { clearFiles } from "../../../../features/chatSlice";

export default function Header({ activeIndex }) {
  const dispatch = useDispatch();
  const { files } = useSelector((state) => state.chat);
  const clearFileHandler = () => {
    dispatch(clearFiles());
  };
  return (
    <div className="w-full">
      {/* container */}
      <div className="w-full flex items-center justify-between">
        {/* close icon / empty files */}
        <div
          className="translate-x-4 cursor-pointer"
          onClick={() => clearFileHandler()}
        >
          <CloseIcon className="dark:fill-dark_svg_1" />
        </div>
        {/* file name */}
        <h1 className="dark:text-dark_text_1 text-[15px]">
          {files[activeIndex]?.file?.name}
        </h1>
        {/* empty tag */}
        <span></span>
      </div>
    </div>
  );
}
