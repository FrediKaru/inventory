import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Bookings from "../Bookings";
import { expect } from "vitest";
import { vi } from "vitest";
import { MemoryRouter } from "react-router";

const bookings = [
  {
    endingDate: "2038-10-14T21:00:00.000Z",
    id: "5bee6ef9-c18d-4836-9969-aa4449e72250",
    name: "Thomas",
    savedItems: [205, 211, 203],
    startingDate: "2038-10-07T21:00:00.000Z",
    title: "Eras tour",
  },
];
const handleDelete = vi.fn();

describe("Bookings", () => {
  test("Renders bookings title", () => {
    render(
      <MemoryRouter>
        <Bookings bookings={bookings} handleDelete={handleDelete} />
      </MemoryRouter>
    );
    expect(screen.getByText(/Eras tour/)).toBeInTheDocument();
  });
  test("Renders booking name", () => {
    render(
      <MemoryRouter>
        <Bookings bookings={bookings} handleDelete={handleDelete} />
      </MemoryRouter>
    );
    expect(screen.getByText(/Thomas/)).toBeInTheDocument();
  });
  test("Delete booking", async () => {
    render(
      <MemoryRouter>
        <Bookings bookings={bookings} handleDelete={handleDelete} />
      </MemoryRouter>
    );
    expect(screen.getByText(/Eras tour/)).toBeInTheDocument();
    expect(handleDelete).toHaveBeenCalledTimes(0);
    await userEvent.click(screen.getByText("Delete"));
    expect(handleDelete).toHaveBeenCalledTimes(1);
  });
});
