import { useState } from "react";
import { SidebarHeader } from "./header";
import  { Notifications }  from "./notifications";
import {Search} from "./search";
import Conversations from "./conversations/Conversations";

export default function Sidebar() {
  const [ searchResults, setSearchResults ] = useState([]);
  return (
    <div className="w-[40%] h-full select-none">
      {/*sidebar header */}
      <SidebarHeader />
      {/* Notifications */}
      <Notifications />
      {/* search */}
      <Search searchLength={searchResults.length} />
      {/* Conversations */}
      <Conversations />
    </div>
  )
}
