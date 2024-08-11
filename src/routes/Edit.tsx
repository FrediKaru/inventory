import React, { Suspense, useEffect, useState } from "react";
import { Form, useParams } from "react-router-dom";
import { getProduct, saveProduct, setSampleProducts } from "../inventoryItems";
import Loading from "../components/Loading";

export default function Edit() {
  const [formData, setFormData] = useState("");
  const [contentLoaded, setContentLoaded] = useState(false);
  const { id } = useParams();

  //import product data from ID included in URL
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProduct(id);
        setFormData(productData);
        setContentLoaded(true);
      } catch (e) {
        console.log("The product was not found", e);
      }
    };
    fetchProduct();
  }, [id]);

  async function handleSave() {
    await saveProduct(id, formData);
  }

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData);
  };

  return (
    <div>
      {contentLoaded ? (
        <>
          <h2>Edit item</h2>
          <Form
            method="post"
            action="/"
            className="edit-form flex flex-col"
            onSubmit={handleSave}
          >
            <label>ID</label>
            <input
              type="text"
              name="id"
              value={id}
              onChange={handleFieldChange}
            />

            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleFieldChange}
            />
            <label>Power consumption</label>
            <input
              type="text"
              name="powerConsumption"
              value={formData.powerConsumption}
              onChange={handleFieldChange}
            />
            <label>Cost</label>
            <input
              type="text"
              name="cost"
              value={formData.cost}
              onChange={handleFieldChange}
            />
            <label>Type</label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleFieldChange}
            />
            <label>Weight</label>
            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleFieldChange}
            />

            {/* <label>Amount</label>
        <input type="text" name="amount" value={formData.amount} /> */}

            <button type="submit">Save</button>
          </Form>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
