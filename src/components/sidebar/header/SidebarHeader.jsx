import { useDispatch, useSelector } from "react-redux";
import { ChatIcon, CommunityIcon, DotsIcon, StoryIcon } from "../../../svg";
import { useState } from "react";
import Menu from "./Menu";
import CreateGroup from "./createGroup/CreateGroup";
import ProfileMenu from "./ProfileMenu";
import ThemeModal from "../../modal/ThemeModal";

export default function SidebarHeader() {
  const { user } = useSelector((state) => state.user);
  const [showMenu, setShowMenu] = useState(false);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showTheme, setShowTheme] = useState(false);

  console.log("here we go", showProfile)

  return (
    <>
      {/* Sidebar header */}
      <div className="h-[50px] dark:bg-dark_bg_2 flex items-center p16">
        {/* Container */}
        <div className="w-full flex items-center justify-between">
          {/* user image */}
          <button 
          onClick={() => setShowProfile((prev) => !prev)}
          className="btn">
            <img
              src={user.picture}
              alt={user.name}
              className="w-full h-full rounded-full object-cover"
            />
            
          </button>
          {
              showProfile ? (
                <ProfileMenu setShowProfile={setShowProfile} user={user} />
              ): null
            }
          {/* user icons */}
          <ul className="flex items-center gap-x-2.5 ">
            <li>
              <button className="btn">
                <CommunityIcon className="dark:fill-dark_svg_1" />
              </button>
            </li>
            <li>
              <button className="btn">
                <StoryIcon className="dark:fill-dark_svg_1" />
              </button>
            </li>
            <li>
              <button className="btn">
                <ChatIcon className="dark:fill-dark_svg_1" />
              </button>
            </li>
            <li
              className="relative"
              onClick={() => setShowMenu((prev) => !prev)}
            >
              <button className={`btn ${showMenu ? "bg-dark_hover_1" : ""}`}>
                <DotsIcon className="dark:fill-dark_svg_1" />
              </button>
              {/* create group Menu */}
              {showMenu ? (
                <Menu setShowCreateGroup={setShowCreateGroup} setShowTheme={setShowTheme}/>
              ) : null}

            </li>
          </ul>
        </div>
      </div>
      {/* theme settings */}
      {showTheme && 
      <ThemeModal open={showTheme} onClose={() => setShowTheme(false)} setShowTheme={setShowTheme} />}
      {/* Create Group */}
      {showCreateGroup && (
        <CreateGroup setShowCreateGroup={setShowCreateGroup} />
      )}
    </>
  );
}
