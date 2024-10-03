import { useState } from "react";
import { NavLink } from "react-router-dom";

import { FaRegUser } from "react-icons/fa";

export default function Topbar() {
  const [burgerOpen, setBurgerOpen] = useState(false);

  function toggleBurgerMenu() {
    setBurgerOpen(!burgerOpen);
  }

  return (
    <div className="topbar content-padding bg-primary">
      <div className="flex justify-between border23">
        <h2 className="">Lighttrack</h2>
        <div className="lg:hidden">
          <input
            type="checkbox"
            id="nav-toggle"
            className="nav-toggle"
            checked={burgerOpen}
          />
          <nav className="nav-mobile">
            <ul
              className="flex
         flex-col gap-3"
            >
              <li>
                <NavLink
                  to="/dashboard"
                  onClick={toggleBurgerMenu}
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
                  onClick={toggleBurgerMenu}
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
                  onClick={toggleBurgerMenu}
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
                  onClick={toggleBurgerMenu}
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
          <label
            htmlFor="nav-toggle"
            className="nav-toggle-label"
            onClick={toggleBurgerMenu}
          >
            <span></span>
          </label>
        </div>
        <NavLink to="/dashboard" className="login-btn">
          <FaRegUser className="mr-2" />
          Log in
        </NavLink>
      </div>
    </div>
  );
}
