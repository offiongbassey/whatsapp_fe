import { useSelector } from "react-redux"

export default function FileViewer({ activeIndex }) {
  const { files } = useSelector((state) => state.chat);

  return (
    <div className="w-full max-w-[60%]">
      {/* Container */}
      <div className="flex justify-center items-center">
        { 
          files[activeIndex]?.type === "IMAGE" ? 
          <img src={files[activeIndex].fileData} alt="" className="max-w-[80%] object-contain hview" /> 
          :
          <div className="min-w-full hview flex flex-col items-center justify-center">
            {/* File Icon Image */}
            <img src={`../../../../images/file/${files[activeIndex]?.type}.png`}  alt={files[activeIndex]?.type}/>
            { /* No preview text */}
            <h1 className="dark:text-dark_text_2 text-2xl">
              No preview available
            </h1>
            {/* file size /type */}
            <span className="dark:text-dark_text_2">
              {files[activeIndex]?.file?.size} KB - {files[activeIndex]?.type}
            </span>
          </div>
        }
        
      </div>
      
    </div>
  )
}
