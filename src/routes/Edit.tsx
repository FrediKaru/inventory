import React, { useEffect, useState } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import { getProduct, saveProduct } from "../inventoryItems";
import Loading from "../components/Loading";
import { InventoryItemProps } from "./Inventory";

export default function Edit() {
  const [formData, setFormData] = useState<InventoryItemProps | null>(null);
  const [contentLoaded, setContentLoaded] = useState(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  //import product data from ID included in URL
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (id) {
          const productData = await getProduct(Number(id));
          setFormData(productData);
          setContentLoaded(true);
        }
      } catch (e) {
        console.log("The product was not found", e);
      }
    };
    fetchProduct();
  }, [id]);

  async function handleSave() {
    if (formData && id) {
      await saveProduct(Number(id), formData);
      navigate("/");
    }
  }

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
      {contentLoaded && formData ? (
        <div className="content-padding">
          <h2 className="text-2xl font-medium mb-8">Edit item</h2>
          <Form
            method="post"
            action="/"
            className="edit-form flex flex-col"
            onSubmit={handleSave}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="edit-field">
                <label>ID</label>
                <input type="text" name="id" readOnly value={id} />
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
            </div>

            {/* <label>Amount</label>
        <input type="text" name="amount" value={formData.amount} /> */}

            <div className="flex">
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
      ) : (
        <div className="flex min-h-full">
          <Loading />
        </div>
      )}
    </div>
  );
}
