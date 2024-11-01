import { BookingProps } from "../routes/Inventory";
import { NavLink } from "react-router-dom";
// Define props for BookingsMonitor

type BookingsProps = {
  bookings: BookingProps[];
};

const Bookings = ({ bookings }: BookingsProps) => (
  <section className="my-10 dashboard-section">
    <h2>Recent bookings</h2>
    <div>
      <table className="bookings-table w-full my-6">
        <thead className="uppercase text-xs font-medium text-Primary">
          <tr className="text-left">
            <th>Name</th>
            <th>Title</th>
            <th>Items</th>
            <th>Starting date</th>
            <th>Ending date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id} className="result">
              <td>{booking.name}</td>
              <td>{booking.title}</td>
              <td>{booking.savedItems.length}</td>
              <td>
                {booking.startingDate
                  ? new Date(booking.startingDate).toLocaleDateString()
                  : ""}
              </td>
              <td>
                {booking.endingDate
                  ? new Date(booking.endingDate).toLocaleDateString()
                  : ""}
              </td>
              <td className="text-lightPrimary">
                <NavLink
                  to={`/b/${booking.id}`}
                  className={"px-6 py-2 rounded-sm bg-primary"}
                >
                  Edit
                </NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

export default Bookings;
