import { useState } from "react";
import { NavLink } from "react-router-dom";
import { BookingProps } from "../components/Bookings";
import {
  getProductsCount,
  getBookings,
  deleteBooking,
} from "../inventoryItems";

import Bookings from "../components/Bookings";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import MyResponsiveLine from "../components/Line";

function OverviewCards() {
  const totalItemsQuery = useQuery({
    queryKey: ["totalItems"],
    queryFn: getProductsCount,
  });
  const totalBookingsQuery = useQuery({
    queryKey: ["totalBookings"],
    queryFn: getBookings,
  });
  return (
    <section className="dashboard-section">
      <h2>Overview</h2>
      <div className="flex gap-3 cards py-6">
        <div>
          <p>Total Items</p>{" "}
          <h2 className="text-2xl">{totalItemsQuery.data}</h2>
        </div>
        <div>
          <p>Active bookings</p> <h2 className="text-2xl">88</h2>
        </div>
        <div>
          <p>Total bookings</p>{" "}
          <h2 className="text-2xl">{totalBookingsQuery.data?.length || 999}</h2>
        </div>
      </div>
    </section>
  );
}

const QuickActions = () => (
  <section className=" dashboard-section">
    <div className="quick-actions flex gap-3">
      <NavLink to="/b">Create New Booking</NavLink>
      <button>Add New Item</button>
      <button>Check In/Out</button>
      <button>Generate Report</button>
    </div>
  </section>
);

const Statistics = () => (
  <section className="my-10 dashboard-section">
    <h2>Statistics</h2>

    <div className="h-80">
      <MyResponsiveLine />
    </div>
  </section>
);

// Main Dashboard Component
function Dashboard() {
  const [bookings, setBookings] = useState<BookingProps[]>([]);

  async function handleDelete(id: string) {
    const newState = bookings.filter((booking) => booking.id !== id);
    setBookings(newState);
    console.log("handle delete");
    deleteBooking(id);
  }

  return (
    <div className="w-full">
      <div className="flex justify-between content-padding bg-lightPrimary border-top-bottom">
        <h2 className="page-title">Dashboard</h2>
      </div>
      <main className="content-padding">
        <OverviewCards />
        <QuickActions />
        <Statistics />
        <Bookings handleDelete={handleDelete} />
      </main>
    </div>
  );
}

export default Dashboard;
