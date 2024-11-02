import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { BookingProps } from "../components/Bookings";
import {
  getProductsCount,
  getBookings,
  deleteBooking,
} from "../inventoryItems";

import Bookings from "../components/Bookings";

type OverviewCardsProps = {
  totalItems: number;
  activeProductions: number;
  totalBookings: number;
};

const OverviewCards = ({
  totalItems,
  activeProductions,
  totalBookings,
}: OverviewCardsProps) => (
  <section className="dashboard-section">
    <h2>Overview</h2>
    <div className="flex gap-3 cards py-6">
      <div>
        <p>Total Items</p> <h2 className="text-2xl">{totalItems}</h2>
      </div>
      <div>
        <p>Active bookings</p> <h2 className="text-2xl">{activeProductions}</h2>
      </div>
      <div>
        <p>Total bookings</p> <h2 className="text-2xl">{totalBookings}</h2>
      </div>
    </div>
  </section>
);

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
    <div>Something here</div>
  </section>
);

// Main Dashboard Component
function Dashboard() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [bookings, setBookings] = useState<BookingProps[]>([]);

  async function handleDelete(id: string) {
    const newState = bookings.filter((booking) => booking.id !== id);
    setBookings(newState);
    console.log("handle delete");
    deleteBooking(id);
  }

  // get bookings and total number of products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsCount = await getProductsCount();
        setTotalProducts(productsCount);

        const fetchedBookings = await getBookings();
        setBookings(fetchedBookings);
        console.log(bookings);
      } catch (e) {
        console.log("Fetching product count is not possible!");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {});
  return (
    <div className="w-full">
      <div className="flex justify-between content-padding bg-lightPrimary border-top-bottom">
        <h2 className="page-title">Dashboard</h2>
      </div>
      <main className="content-padding">
        <OverviewCards
          totalItems={totalProducts}
          activeProductions={12}
          totalBookings={bookings.length || 99}
        />
        <QuickActions />
        <Bookings bookings={bookings} handleDelete={handleDelete} />
        <Statistics />
      </main>
    </div>
  );
}

export default Dashboard;
