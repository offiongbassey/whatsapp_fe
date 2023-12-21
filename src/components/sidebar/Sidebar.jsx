import { useState } from "react";
import { SidebarHeader } from "./header";
import  { Notifications }  from "./notifications";
import {Search, SearchResults} from "./search";
import Conversations from "./conversations/Conversations";

export default function Sidebar() {
  const [ searchResults, setSearchResults ] = useState([]);
  console.log(searchResults);
  return (
    <div className="w-[40%] h-full select-none">
      {/*sidebar header */}
      <SidebarHeader />
      {/* Notifications */}
      <Notifications />
      {/* search */}
      <Search searchLength={searchResults.length} setSearchResults={setSearchResults} />
    
      {/* Search Results */}
      {
        searchResults.length > 0 ? <>
        <SearchResults searchResults={searchResults} />
        </>
        : <>
          {/* Conversations */}
          <Conversations />
        </>
      }
    
    </div>
  )
}
