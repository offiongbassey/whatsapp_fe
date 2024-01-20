import { useRef, useState } from "react";

export default function Picture({
  readablePicture,
  setReadablePicture,
  setPicture,
}) {
  const [error, setError] = useState();
  const inputRef = useRef();
  const handlePicture = (e) => {
    let pic = e.target.files[0];
    if (!pic) return;
    if (
      pic.type !== "image/jpg" &&
      pic.type !== "image/jpeg" &&
      pic.type !== "image/png"
    ) {
      setError(`${pic.name} format is not supported.`);
      return;
    } else if (pic.size > 1024 * 1024 * 5) {
      //5mb
      setError(`${pic.name} is too large, maximum is 5mb`);
      return;
    } else {
      setError("");
      setPicture(pic);
      //reading the picture
      const reader = new FileReader();
      reader.readAsDataURL(pic);
      reader.onload = (e) => {
        setReadablePicture(e.target.result);
      };
    }
  };
  const handleChangePic = () => {
    setPicture("");
    setReadablePicture("");
  };

  return (
    <div className="flex justify-center items-center mt-8 content-center dark:text-dark_text_1 space-y-1">
      {readablePicture ? (
        <div className="flex flex-col items-center justify-center">
          <img
            src={readablePicture}
            alt="picture"
            className="w-48 h-full object-cover rounded-full"
          />
          {/*   change pics */}
          <button
            className="mt-2 py-1 w-20 dark:bg-dark_bg_3 rounded-md text-xs font-bold flex items-center justify-center cursor-pointer"
            onClick={() => handleChangePic()}
          >
            Remove
          </button>
        </div>
      ) : (
        <div
          className="w-full h-12 font-bold flex items-center justify-center cursor-pointer"
          onClick={() => inputRef.current.click()}
        >
          Select Photo from Device
        </div>
      )}
      <input
        type="file"
        name="picture"
        id="picture"
        hidden
        ref={inputRef}
        accept="image/png,image/jpg,image/jpeg"
        onChange={handlePicture}
      />
      {/* error */}
      <div className="mt-2">
        <p className="text-red-400">{error}</p>
      </div>
    </div>
  );
}
