// yarn add @nivo/line
import { ResponsiveLine } from "@nivo/line";
import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../inventoryItems";
import { useEffect, useState } from "react";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

function MyResponsiveLine() {
  const [statistics, setStatistics] = useState([]);
  const query = useQuery({ queryKey: ["bookings"], queryFn: getBookings });

  const bookingsPerMonth = () => {
    // Parse the start and end dates
    const acc = {};
    const today = new Date();
    const current = new Date(today.getUTCFullYear(), today.getUTCMonth(), 1);

    for (let i = 0; i < 12; i++) {
      const year = current.getUTCFullYear();
      const month = current.getUTCMonth() + 1;
      const key = `${year}-${String(month).padStart(2, "0")}`;
      acc[key] = 0;
      current.setUTCMonth(current.getUTCMonth() + 1);
    }

    return query.data?.reduce((acc, booking) => {
      const startDate = new Date(booking.startingDate);
      const endDate = new Date(booking.endingDate);
      let current = new Date(startDate);

      while (current <= endDate) {
        const year = current.getUTCFullYear();
        const month = current.getUTCMonth() + 1;
        const key = `${year}-${String(month).padStart(2, "0")}`;

        if (acc[key] !== undefined) {
          acc[key] += 1;
        }
        current.setUTCMonth(current.getUTCMonth() + 1);
      }
      return acc;
    }, acc);
  };

  useEffect(() => {
    if (query.data) {
      const bookingsData = bookingsPerMonth();

      const transformedData = [
        {
          id: "Bookings",
          color: "hsl(200, 70%, 50%)",
          data: Object.keys(bookingsData).map((key) => ({
            x: key,
            y: bookingsData[key],
          })),
        },
      ];
      setStatistics(transformedData);
    }
  }, [query.data]);

  return (
    <ResponsiveLine
      data={statistics || data}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "year",
        legendOffset: 36,
        legendPosition: "middle",
        truncateTickAt: 0,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "bookings count",
        legendOffset: -40,
        legendPosition: "middle",
        truncateTickAt: 0,
      }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabel="data.yFormatted"
      pointLabelYOffset={-12}
      enableTouchCrosshair={true}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
}

export default MyResponsiveLine;
