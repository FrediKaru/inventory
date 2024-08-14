import React, { Suspense, useEffect, useState } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import { getProduct, saveProduct, setSampleProducts } from "../inventoryItems";
import Loading from "../components/Loading";

export default function Edit() {
  const [formData, setFormData] = useState("");
  const [contentLoaded, setContentLoaded] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

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
    navigate("/");
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
    <div className="min-h-screen bg-lightPrimary w-full ">
      {contentLoaded ? (
        <div className="content-padding">
          <h2 className="text-2xl font-medium mb-8">Edit item</h2>
          <Form
            method="post"
            action="/"
            className="edit-form flex flex-col"
            onSubmit={handleSave}
          >
            <div className="edit-field">
              <label>ID</label>
              <input
                type="text"
                name="id"
                value={id}
                onChange={handleFieldChange}
              />
            </div>

            <div className="edit-field">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFieldChange}
              />
            </div>

            <div className="edit-field">
              <label>Cost</label>
              <input
                type="text"
                name="cost"
                value={formData.cost}
                onChange={handleFieldChange}
              />
            </div>
            <div className="edit-field">
              <label>Type</label>
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleFieldChange}
              />
            </div>
            <div className="edit-field">
              <label>Power consumption</label>
              <input
                type="text"
                name="powerConsumption"
                value={formData.powerConsumption}
                onChange={handleFieldChange}
              />
            </div>
            <div className="edit-field">
              <label>Weight</label>
              <input
                type="text"
                name="weight"
                value={formData.weight}
                onChange={handleFieldChange}
              />
            </div>
            <div className="edit-field">
              <label>Quantity</label>
              <input
                type="text"
                name="quantity"
                value={formData.quantity}
                onChange={handleFieldChange}
              />
            </div>

            {/* <label>Amount</label>
        <input type="text" name="amount" value={formData.amount} /> */}

            <button type="submit">Save</button>
            <button type="button" onClick={() => navigate("/")}>
              Cancel
            </button>
          </Form>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
