import * as React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Bookings from "../Bookings";
import { expect } from "chai";
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

describe("Bookings", () => {
  test("Renders bookings title", () => {
    const handleDelete = vi.fn();
    render(
      <MemoryRouter>
        <Bookings bookings={bookings} handleDelete={handleDelete} />
      </MemoryRouter>
    );
    screen.debug();
    expect(screen.getByText(/Eras tour/)).toBeInTheDocument();
  });
});
