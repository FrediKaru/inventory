import { NavLink } from "react-router-dom";

import { MdDashboard } from "react-icons/md";
import { MdInventory } from "react-icons/md";
import { FaBook } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";

export default function Sidebar() {
  return (
    <div className="sidebar content-padding bg-primary">
      <div>
        <h2 className="mb-10">Lighttrack</h2>
        <ul
          className="flex
         flex-col gap-3"
        >
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "active-button sidebar-button" : "sidebar-button"
              }
            >
              <MdDashboard className="mr-2" /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/inventory"
              className={({ isActive }) =>
                isActive ? "active-button sidebar-button" : "sidebar-button"
              }
            >
              <MdInventory className="mr-2" />
              Inventory
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/reservations"
              className={({ isActive }) =>
                isActive ? "active-button sidebar-button" : "sidebar-button"
              }
            >
              <FaBook className="mr-2" />
              Reservations
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/preferences"
              className={({ isActive }) =>
                isActive ? "active-button sidebar-button" : "sidebar-button"
              }
            >
              {" "}
              <IoSettingsSharp className="mr-2" />
              Preferences
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
