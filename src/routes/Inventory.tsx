import React from "react";
import { Link } from "react-router-dom";

interface InventoryItemProps {
  name: string;
  id: number;
  status: string;
  lastModified?: number;
}

export default function Inventory() {
  return (
    <div className="w-full">
      <div className="flex justify-between ">
        <h2 className="component-label">Inventory</h2>
        <input type="text" placeholder="Search.." />
      </div>
      <table className="w-full">
        <thead>
          <tr className="inventory-header ">
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <InventoryItem
            id={878}
            name="Robe T2 Profile FS"
            status="2"
            lastModified={Date.now()}
          />
          <InventoryItem id={831} name="Robe T2 Profile" status="2" />
          <InventoryItem id={832} name="Robe Robospot" status="2" />
          <InventoryItem id={112} name="ETC series 3" status="2" />
          <InventoryItem id={122} name="ETC series 2" status="10" />
          <InventoryItem id={131} name="Luxibel Blinder" status="13" />
        </tbody>
      </table>
    </div>
  );
}

function InventoryItem({ id, name, status, lastModified }: InventoryItemProps) {
  return (
    <tr className="result">
      <th scope="row">{id}</th>
      <td>{name}</td>
      <td>{status}</td>
      <td>{lastModified}</td>
      <td className="flex action-btn">
        <Link to={`/edit/${id}`}>Edit</Link>
        <button>Delete</button>
      </td>
    </tr>
  );
}
