interface InventoryItemProps {
  id: number;
  name: string;
  status: string;
  lastModified?: number;
}

import { NavLink, Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <>
      {/* <div>
        <input type="text" placeholder="Search.."></input>
      </div> */}
      <div className="flex">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
}

export default App;
