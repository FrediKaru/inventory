import { Link } from "react-router-dom";

export interface BookingProps {
  id: string;
  name?: string;
  title?: string;
  startingDate?: Date | string;
  endingDate?: Date | string;
  savedItems: number[];
}

export type BookingsProps = {
  bookings: BookingProps[];
  handleDelete: (id: string) => void;
};

const Bookings = ({ bookings, handleDelete }: BookingsProps) => (
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
              <td className="flex btn-group gap-2">
                <Link to={`/b/${booking.id}`} className="btn">
                  Edit
                </Link>
                <button
                  className="btn"
                  onClick={() => handleDelete(booking.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

export default Bookings;
