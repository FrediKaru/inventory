import React, { useEffect, useState } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import { saveBooking, getBooking } from "../inventoryItems";
import { BookingProps } from "../components/Bookings";
import "react-calendar/dist/Calendar.css";

import Calendar from "react-calendar";
import BookedProducts from "../components/BookedProducts";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function EditBooking() {
  const [formData, setFormData] = useState<BookingProps>({
    id: "",
    startingDate: undefined,
    endingDate: undefined,
    savedItems: [],
  });
  const [startingDate, setStarting] = useState<Value>(null);
  const [endingDate, setEnding] = useState<Value>(null);
  const navigate = useNavigate();
  const { id } = useParams();

  async function handleSave() {
    if (formData) {
      await saveBooking(formData);
      navigate("/dashboard");
    }
  }

  // update formData when calendar dates change
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      startingDate:
        startingDate instanceof Date ? startingDate.toISOString() : undefined,
      endingDate:
        endingDate instanceof Date ? endingDate.toISOString() : undefined,
    }));
  }, [startingDate, endingDate]);

  // get booking data when page loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const bookingData = await getBooking(id);
          console.log("booking data recieved:", bookingData);
          if (bookingData) {
            setFormData(bookingData as BookingProps);
            setStarting(
              bookingData.startingDate
                ? new Date(bookingData.startingDate)
                : new Date("2033-10-5")
            );
            setEnding(
              bookingData.endingDate
                ? new Date(bookingData.endingDate)
                : new Date("2033-10-18T21:00:00.000Z")
            );
          }
        }
      } catch (e) {
        console.log("Sorry, cant fetch booking!");
      }
    };
    fetchData();
  }, []);

  const handleFieldChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormData((prevData) => {
      if (!prevData) return prevData;
      return {
        ...prevData,
        [name]: value,
      };
    });
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
                    startingDate instanceof Date
                      ? new Date(startingDate).toISOString().split("T")[0]
                      : ""
                  }
                  readOnly
                ></input>
                <Calendar onChange={setStarting} value={startingDate} />
              </div>
              <div>
                <input
                  type="text"
                  name="endingDate"
                  value={
                    endingDate instanceof Date
                      ? new Date(endingDate).toISOString().split("T")[0]
                      : ""
                  }
                  readOnly
                ></input>
                <Calendar onChange={setEnding} value={endingDate} />
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
