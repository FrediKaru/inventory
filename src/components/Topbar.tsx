import { NavLink } from "react-router-dom";

import { MdDashboard } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";

import { MdInventory } from "react-icons/md";
import { FaBook } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";

export default function Topbar() {
  return (
    <div className="topbar content-padding bg-primary">
      <div className="flex justify-between border23">
        <h2 className="">Lighttrack</h2>
        <div className="lg:hidden">
          <input type="checkbox" id="nav-toggle" className="nav-toggle" />
          <nav className="nav-mobile">
            <ul
              className="flex
         flex-col gap-3"
            >
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive ? "active-button topbar-button" : "topbar-button"
                  }
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/inventory"
                  className={({ isActive }) =>
                    isActive ? "active-button topbar-button" : "topbar-button"
                  }
                >
                  Inventory
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/reservations"
                  className={({ isActive }) =>
                    isActive ? "active-button topbar-button" : "topbar-button"
                  }
                >
                  Reservations
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/preferences"
                  className={({ isActive }) =>
                    isActive ? "active-button topbar-button" : "topbar-button"
                  }
                >
                  {" "}
                  Preferences
                </NavLink>
              </li>
            </ul>
          </nav>
          <label htmlFor="nav-toggle" className="nav-toggle-label">
            <span></span>
          </label>
        </div>
      </div>
    </div>
  );
}
