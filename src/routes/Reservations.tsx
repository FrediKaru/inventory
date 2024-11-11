import Bookings from "../components/Bookings";

function Reservations() {
  return (
    <div className="w-full content-area">
      <div className="flex justify-between content-padding bg-lightPrimary border-top-bottom">
        <h2 className="page-title">Reservations</h2>
      </div>
      <div className="content-padding">
        <Bookings />
      </div>
    </div>
  );
}

export default Reservations;
