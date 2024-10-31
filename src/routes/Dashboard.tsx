import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getProductsCount, getBookings } from "../inventoryItems";
import { BookingProps } from "./Inventory";

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

// Define props for BookingsMonitor
type BookingsMonitorProps = {
  bookings: BookingProps[];
};

const BookingsMonitor = ({ bookings }: BookingsMonitorProps) => (
  <section className="my-10 dashboard-section">
    <h2>Recent bookings</h2>
    <div>
      <table className="bookings-table w-full my-6">
        <thead className="uppercase text-xs font-bold text-Primary">
          <td>Name</td>
          <td>Title</td>
          <td>Items</td>
          <td>Starting date</td>
          <td>Ending date</td>
          <td>Actions</td>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id} className="result">
              <td>{booking.name}</td>
              <td>{booking.title}</td>
              <td>12</td>
              <td>{booking.startingDate.toLocaleString().split("T")[0]}</td>
              <td>{booking.endingDate.toLocaleString().split("T")[0]}</td>
              <td>
                <NavLink to={`/b/${booking.id}`}>Edit</NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
        <BookingsMonitor bookings={bookings} />
        <Statistics />
      </main>
    </div>
  );
}

export default Dashboard;
