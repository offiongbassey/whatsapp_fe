import FileViewer from "./FileViewer";
import Header from "./Header";
import Input from "./Input";
import HandleAndSend from "./HandleAndSend";
import { useState } from "react";

export default function FilesPreview() {
  const [message, setMessage] = useState(" ");
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="relative py-2 w-full flex items-center justify-center">
      {/* container */}
      <div className="w-full flex flex-col items-center">
        {/* Header */}
        <Header activeIndex={activeIndex} />
        {/* viewing selected file */}
        <FileViewer activeIndex={activeIndex} />
        <div className="w-full flex flex-col items-center">
          {/* message input */}
          <Input message={message} setMessage={setMessage} />
          {/* send and manipulate files */}
          <HandleAndSend
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            message={message}
          />
        </div>
      </div>
    </div>
  );
}
