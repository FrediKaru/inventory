import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../inventoryItems";

interface InventoryItemProps {
  id: number;
  name: string;
  cost: number;
  type: string;
  powerConsumption: number;
  manufacturer: string;
  weight: number;
  quantity?: number;
  lastModified?: number;
}

export default function Inventory() {
  const [inventory, setInventory] = useState<InventoryItemProps[]>([]);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const inventoryItems = await getProducts();
        setInventory(inventoryItems);
      } catch (e) {
        console.log("Fetching products is not possible!");
      }
    };
    fetchInventory();
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-between ">
        <h2 className="component-label">Inventory</h2>
        <input type="text" placeholder="Search.." />
      </div>
      <table className="w-full">
        <thead className="bg-lightPrimary">
          <tr className="inventory-header">
            <td scope="col">
              {" "}
              <input type="checkbox"></input>
            </td>
            <td scope="col">Product ID</td>
            <td scope="col">Name</td>
            <td scope="col">Category</td>
            <td scope="col">Quantity</td>
            <td scope="col">Actions</td>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <InventoryItem key={item.id} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function InventoryItem({ item }: { item: InventoryItemProps }) {
  return (
    <tr className="result">
      <td>
        <input type="checkbox"></input>
      </td>
      <td scope="row">#{item.id}</td>
      <td>{item.name}</td>
      <td>{item.type}</td>
      <td>{item.quantity}</td>
      <td className="flex action-btn">
        <Link to={`/edit/${item.id}`}>Edit</Link>
        <button>Delete</button>
      </td>
    </tr>
  );
}
