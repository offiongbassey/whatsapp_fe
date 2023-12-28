import { useState } from "react";
import { SidebarHeader } from "./header";
import  { Notifications }  from "./notifications";
import {Search, SearchResults} from "./search";
import Conversations from "./conversations/Conversations";

export default function Sidebar({ onlineUsers, typing }) {
  const [ searchResults, setSearchResults ] = useState([]);
  return (
    <div className="flex0030 max-w-[30%] h-full select-none">
      {/*sidebar header */}
      <SidebarHeader />
      {/* Notifications */}
      <Notifications />
      {/* search */}
      <Search searchLength={searchResults.length} setSearchResults={setSearchResults} />
    
      {/* Search Results */}
      {
        searchResults.length > 0 ? <>
        <SearchResults searchResults={searchResults} 
        setSearchResults={setSearchResults} />
        </>
        : <>
          {/* Conversations */}
          <Conversations onlineUsers={onlineUsers} typing={typing} />
        </>
      }
    
    </div>
  )
}
