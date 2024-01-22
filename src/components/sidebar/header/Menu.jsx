import { useDispatch } from "react-redux";
import { logout, updateTheme } from "../../../features/userSlice";
import { destroyActiveConversation } from "../../../features/chatSlice";

export default function Menu({ setShowCreateGroup, setShowTheme }) {
  const dispatch = useDispatch();
  return (
    <div className="absolute right-1 z-50  text-gray-700 bg-white dark:bg-dark_bg_2 dark:text-dark_text_1 shadow-md w-52">
      <ul>
        <li
          onClick={() => setShowCreateGroup(true)}
          className="py-3 pl-5 cursor-pointer hover:bg-light_bg_1 dark:hover:bg-dark_bg_3"
        >
          <span>New group</span>
        </li>
        <li className="py-3 pl-5 cursor-pointer hover:bg-light_bg_1 dark:hover:bg-dark_bg_3">
          <span>New community</span>
        </li>
        <li className="py-3 pl-5 cursor-pointer hover:bg-light_bg_1 dark:hover:bg-dark_bg_3">
          <span>Starred messaged</span>
        </li>
        <li 
          onClick={() => setShowTheme(true)}        
        className="py-3 pl-5 cursor-pointer hover:bg-light_bg_1 dark:hover:bg-dark_bg_3">
          <span>Theme</span>
        </li>
        <li className="py-3 pl-5 cursor-pointer hover:bg-light_bg_1 dark:hover:bg-dark_bg_3">
          <span>Settings</span>
        </li>
        <li
          onClick={() =>  {
            dispatch(logout());
            dispatch(updateTheme("dark"))
            dispatch(destroyActiveConversation());
          }}
          className="py-3 pl-5 cursor-pointer hover:bg-light_bg_1 dark:hover:bg-dark_bg_3"
        >
          <span>Logout</span>
        </li>
      </ul>
    </div>
  );
}
