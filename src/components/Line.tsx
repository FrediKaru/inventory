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
const data = [
  {
    id: "japan",
    color: "hsl(79, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 89,
      },
      {
        x: "helicopter",
        y: 106,
      },
      {
        x: "boat",
        y: 71,
      },
      {
        x: "train",
        y: 42,
      },
      {
        x: "subway",
        y: 219,
      },
      {
        x: "bus",
        y: 24,
      },
      {
        x: "car",
        y: 37,
      },
      {
        x: "moto",
        y: 166,
      },
      {
        x: "bicycle",
        y: 198,
      },
      {
        x: "horse",
        y: 20,
      },
      {
        x: "skateboard",
        y: 175,
      },
      {
        x: "others",
        y: 21,
      },
    ],
  },
  // {
  //   id: "france",
  //   color: "hsl(226, 70%, 50%)",
  //   data: [
  //     {
  //       x: "plane",
  //       y: 46,
  //     },
  //     {
  //       x: "helicopter",
  //       y: 4,
  //     },
  //     {
  //       x: "boat",
  //       y: 264,
  //     },
  //     {
  //       x: "train",
  //       y: 3,
  //     },
  //     {
  //       x: "subway",
  //       y: 31,
  //     },
  //     {
  //       x: "bus",
  //       y: 42,
  //     },
  //     {
  //       x: "car",
  //       y: 221,
  //     },
  //     {
  //       x: "moto",
  //       y: 49,
  //     },
  //     {
  //       x: "bicycle",
  //       y: 281,
  //     },
  //     {
  //       x: "horse",
  //       y: 257,
  //     },
  //     {
  //       x: "skateboard",
  //       y: 229,
  //     },
  //     {
  //       x: "others",
  //       y: 122,
  //     },
  //   ],
  // },
  // {
  //   id: "us",
  //   color: "hsl(157, 70%, 50%)",
  //   data: [
  //     {
  //       x: "plane",
  //       y: 185,
  //     },
  //     {
  //       x: "helicopter",
  //       y: 225,
  //     },
  //     {
  //       x: "boat",
  //       y: 119,
  //     },
  //     {
  //       x: "train",
  //       y: 193,
  //     },
  //     {
  //       x: "subway",
  //       y: 191,
  //     },
  //     {
  //       x: "bus",
  //       y: 277,
  //     },
  //     {
  //       x: "car",
  //       y: 83,
  //     },
  //     {
  //       x: "moto",
  //       y: 78,
  //     },
  //     {
  //       x: "bicycle",
  //       y: 79,
  //     },
  //     {
  //       x: "horse",
  //       y: 109,
  //     },
  //     {
  //       x: "skateboard",
  //       y: 121,
  //     },
  //     {
  //       x: "others",
  //       y: 54,
  //     },
  //   ],
  // },
  // {
  //   id: "germany",
  //   color: "hsl(345, 70%, 50%)",
  //   data: [
  //     {
  //       x: "plane",
  //       y: 260,
  //     },
  //     {
  //       x: "helicopter",
  //       y: 232,
  //     },
  //     {
  //       x: "boat",
  //       y: 180,
  //     },
  //     {
  //       x: "train",
  //       y: 221,
  //     },
  //     {
  //       x: "subway",
  //       y: 142,
  //     },
  //     {
  //       x: "bus",
  //       y: 92,
  //     },
  //     {
  //       x: "car",
  //       y: 52,
  //     },
  //     {
  //       x: "moto",
  //       y: 49,
  //     },
  //     {
  //       x: "bicycle",
  //       y: 277,
  //     },
  //     {
  //       x: "horse",
  //       y: 33,
  //     },
  //     {
  //       x: "skateboard",
  //       y: 22,
  //     },
  //     {
  //       x: "others",
  //       y: 228,
  //     },
  //   ],
  // },
  // {
  //   id: "norway",
  //   color: "hsl(172, 70%, 50%)",
  //   data: [
  //     {
  //       x: "plane",
  //       y: 193,
  //     },
  //     {
  //       x: "helicopter",
  //       y: 291,
  //     },
  //     {
  //       x: "boat",
  //       y: 216,
  //     },
  //     {
  //       x: "train",
  //       y: 206,
  //     },
  //     {
  //       x: "subway",
  //       y: 295,
  //     },
  //     {
  //       x: "bus",
  //       y: 247,
  //     },
  //     {
  //       x: "car",
  //       y: 133,
  //     },
  //     {
  //       x: "moto",
  //       y: 204,
  //     },
  //     {
  //       x: "bicycle",
  //       y: 234,
  //     },
  //     {
  //       x: "horse",
  //       y: 164,
  //     },
  //     {
  //       x: "skateboard",
  //       y: 34,
  //     },
  //     {
  //       x: "others",
  //       y: 185,
  //     },
  //   ],
  // },
];

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
