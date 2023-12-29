import { useState } from "react";
import { AttachmentIcon } from "../../../../svg";
import Menu from "./menu/Menu";

export default function Attachments({ showAttachments, setShowAttachments, setShowEmoji }) {

  return (
    <li className="relative">
        <button
         onClick={() => {
          setShowAttachments((prev) => !prev);
          setShowEmoji(false);
         
        }}
        className="btn" type="button">
          <AttachmentIcon className="dark:fill-dark_svg_1" />
        </button>
        {/* Menu */}
        {
          showAttachments ? <Menu /> : null
        }
       
    </li>
  )
}
