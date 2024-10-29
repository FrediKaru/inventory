import React from "react";
import { render, screen } from "@testing-library/react";
import { expect } from "vitest";
import "@testing-library/jest-dom";

import { MemoryRouter, Route, Routes } from "react-router-dom";
import Sidebar from "../src/components/Sidebar";

test("renders Sidebar with all menu items", async () => {
  render(
    <MemoryRouter>
      <Sidebar />
    </MemoryRouter>
  );

  expect(screen.getByRole("link", { name: /Dashboard/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /Inventory/i })).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: /Reservations/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: /Preferences/i })
  ).toBeInTheDocument();
});

test("applies active class to the active link", () => {
  render(
    <MemoryRouter initialEntries={["/dashboard"]}>
      <Routes>
        <Route path="*" element={<Sidebar />} />
        <Route path="/dashboard" element={<div>Dashboard Page</div>} />
      </Routes>
    </MemoryRouter>
  );

  const dashboardLink = screen.getByText("Dashboard");
  expect(dashboardLink).toHaveClass("active-button");
});
