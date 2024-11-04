import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Sidebar from "../Sidebar";
import { MemoryRouter } from "react-router";

describe("Sidebar", () => {
  test("render links", () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );
    expect(screen.getByText(/Dashboard/)).toBeInTheDocument();
    expect(screen.getByText(/Inventory/)).toBeInTheDocument();
    expect(screen.getByText(/Reservations/)).toBeInTheDocument();
    expect(screen.getByText(/Preferences/)).toBeInTheDocument();
  });
  test("active link class is applied", () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );
    const inventoryLink = screen.getByText("Inventory");
    userEvent.click(inventoryLink);
    screen.debug();
    expect(inventoryLink).toHaveClass("active-button sidebar-button");
  });
});
