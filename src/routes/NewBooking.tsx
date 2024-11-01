import React, { useEffect, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { saveBooking } from "../inventoryItems";
import { BookingProps } from "./Inventory";

export default function NewBooking() {
  const [formData, setFormData] = useState<BookingProps>({
    startingDate: undefined,
    endingDate: undefined,
    savedItems: [],
  });
  const navigate = useNavigate();

  async function handleSave() {
    if (formData) {
      await saveBooking(formData);
      navigate("/dashboard");
    }
  }
  useEffect(() => {
    console.log(formData);
  }, [formData]);

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
        <h2 className="text-2xl font-medium mb-8">New booking</h2>
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
                <input type="text" name="title" onChange={handleFieldChange} />
              </div>
              <div className="edit-field">
                <label>Name</label>
                <input type="text" name="name" onChange={handleFieldChange} />
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
      </div>
    </div>
  );
}
