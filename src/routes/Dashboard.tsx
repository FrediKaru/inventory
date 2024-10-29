import React from "react";

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
);

const QuickActions = () => (
  <section className="quick-actions flex  gap-3">
    <button>Create New Booking</button>
    <button>Add New Item</button>
    <button>Check In/Out</button>
    <button>Generate Report</button>
  </section>
);

// Main Dashboard Component
const Dashboard: React.FC = () => (
  <div className="w-full content-area">
    <div className="flex justify-between content-padding bg-lightPrimary border-top-bottom">
      <h2 className="page-title">Dashboard</h2>
    </div>
    <OverviewCards totalItems={34} activeProductions={12} totalBookings={13} />
    <main className="main-content">
      <QuickActions />
    </main>
  </div>
);

export default Dashboard;
