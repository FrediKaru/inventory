// interface InventoryItemProps {
//   id: number;
//   name: string;
//   status: string;
//   lastModified?: number;
// }

import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

function App() {
  return (
    <>
      {/* <div>
        <input type="text" placeholder="Search.."></input>
      </div> */}
      <div className="">
        <Topbar />
      </div>
      <div className="flex">
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default App;
