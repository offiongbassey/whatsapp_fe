import React, { useEffect, useState } from 'react';
import { CloseIcon, EmojiIcon } from '../../../svg';
import EmojiPicker from 'emoji-picker-react';

export default function EmojiPickerApp({ textRef, message, setMessage, showEmoji, setShowEmoji, setShowAttachments }) {
  const [cursorPosition, setCursorPosition] = useState();
  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  },[cursorPosition])
  const handleEmoji = (emojiData, e) => {
    const { emoji } = emojiData;
    const ref = textRef.current;
    ref.focus();
    const start = message.substring(0,ref.selectionStart);
    const end = message.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setMessage(newText);
    setCursorPosition(start.length + emoji.length);
  }
  return (
    <li className='w-full'>
      <button 
      onClick={() => {
        setShowEmoji((prev)=> !prev);
        setShowAttachments(false);
      }
      }
      className='btn' type='button'>
        {
          showEmoji ? (
            <CloseIcon  className="dark:fill-dark_svg_1"/>
          ) : (
            <EmojiIcon className="dark:fill-dark_svg_1" />
          )
        }
        
      </button>   
      {/* Emoji Picker */}
      {
        showEmoji ? (
          <div className='openEmojiAnimation absolute bottom-[60px] left-[-0.5px] w-full'>
          <EmojiPicker theme='dark' onEmojiClick={handleEmoji} />
      </div>
        ) : null
      }
      
    </li>
  )
}
