import React from "react";

import { NavLink, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="sidebar bg-primary">
      <div>
        <h2 className="component-label">Lighttrack</h2>
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
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/inventory"
              className={({ isActive }) =>
                isActive ? "active-button sidebar-button" : "sidebar-button"
              }
            >
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
              Preferences
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
