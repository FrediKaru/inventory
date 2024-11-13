import React, { useEffect, useState } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import { saveBooking, getBooking } from "../inventoryItems";
import { BookingProps } from "../components/Bookings";
import "react-calendar/dist/Calendar.css";

import Calendar from "react-calendar";
import BookedProducts from "../components/BookedProducts";
import { useQuery } from "@tanstack/react-query";

type BookingDate = Date | null;

type DateRange = [BookingDate, BookingDate];
type Params = { id: string };

export default function EditBooking() {
  const [datesrange, setDatesRange] = useState<DateRange>([null, null]);
  const [formData, setFormData] = useState<BookingProps>({
    id: "",
    startingDate: undefined,
    endingDate: undefined,
    savedItems: [],
  });
  const navigate = useNavigate();
  const { id } = useParams<Params>();

  const bookingsQuery = useQuery({
    queryKey: ["booking", id],
    queryFn: () => getBooking(id),
  });

  useEffect(() => {
    if (bookingsQuery.data) {
      const booking = bookingsQuery.data as BookingProps;
      setFormData(booking);

      setDatesRange([
        booking.startingDate ? new Date(booking.startingDate) : null,
        booking.endingDate ? new Date(booking.endingDate) : null,
      ]);
    }
  }, []);

  //update formData when calendar dates change
  useEffect(() => {
    if (datesrange[0] && datesrange[1]) {
      setFormData((prevData) => ({
        ...prevData,
        startingDate: datesrange[0].toISOString(),
        endingDate: datesrange[1].toISOString(),
      }));
    }
  }, [datesrange]);

  const handleFieldChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (datesrange[0] && datesrange[1] && datesrange[0] > datesrange[1]) {
      alert("Starting date must be before ending date");
      return;
    }
    console.log("Saving booking with data:", formData);
    if (formData) {
      await saveBooking(formData);
      navigate("/dashboard");
    }
  };
  return (
    <div className="min-h-screen bg-lightPrimary w-full ">
      <div className="content-padding">
        <h2 className="text-2xl font-medium mb-8">Edit booking</h2>
        <div className="md:flex gap-4">
          <Form
            method="post"
            action="/"
            className="edit-form flex flex-col"
            onSubmit={handleSave}
          >
            <div className="grid lg:grid-cols-2 gap-4 mr-auto">
              <div className="edit-field">
                <label>Booking title</label>
                <input
                  type="text"
                  name="title"
                  onChange={handleFieldChange}
                  value={formData.title}
                />
              </div>
              <div className="edit-field">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  onChange={handleFieldChange}
                  value={formData.name}
                />
              </div>
              <div>
                <input
                  type="text"
                  name="startingDate"
                  value={
                    datesrange[0] instanceof Date
                      ? new Date(datesrange[0]).toISOString().split("T")[0]
                      : ""
                  }
                  readOnly
                ></input>
                <Calendar
                  onChange={(range) => setDatesRange(range as DateRange)}
                  selectRange={true}
                  value={datesrange}
                />
              </div>
              <div>
                <input
                  type="text"
                  name="endingDate"
                  value={
                    datesrange[1] instanceof Date
                      ? new Date(datesrange[1]).toISOString().split("T")[0]
                      : ""
                  }
                  readOnly
                ></input>
              </div>
            </div>
            {/* <label>Amount</label>
                    <input type="text" name="amount" value={formData.amount} /> */}
            <div className="flex gap-2 mt-7">
              <button type="submit" className="btn">
                Save
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>
            </div>
          </Form>
        </div>
        <BookedProducts setFormData={setFormData} formData={formData} />
      </div>
    </div>
  );
}
