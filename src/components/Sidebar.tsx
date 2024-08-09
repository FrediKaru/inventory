import React from "react";

import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div>
        <h2 className="component-label">Lighttrack</h2>
        <ul>
          <li>
            <NavLink to="/inventory">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/inventory">Inventory</NavLink>
          </li>
          <li>
            <NavLink to="/inventory">Reservations</NavLink>
          </li>
          <li>
            <NavLink to="/preferences">Preferences</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
