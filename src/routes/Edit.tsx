import React, { useState } from "react";
import { Form, useParams } from "react-router-dom";

export default function Edit() {
  const [formData, setFormData] = useState({
    id: 42,
    name: "Robe Robospot",
    amount: 2,
  });
  const { id } = useParams();

  return (
    <div>
      <h2>Edit item</h2>
      <Form method="post" action="/" className="edit-form">
        <label>ID</label>
        <input type="text" name="id" value={id} />

        <label>Label</label>
        <input type="text" name="label" value={formData.name} />

        <label>Amount</label>
        <input type="text" name="amount" value={formData.amount} />

        <button type="submit">Save</button>
      </Form>
    </div>
  );
}
