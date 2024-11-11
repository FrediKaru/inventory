import React, { useState } from "react";
import { Link } from "react-router-dom";
import { InventoryFilter, getProducts } from "../inventoryItems";

import { FaUser } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export interface InventoryItemProps {
  id: number;
  name: string;
  cost: number;
  type?: string;
  powerConsumption: number;
  manufacturer: string;
  weight: number;
  quantity?: number;
  lastModified?: number;
  img?: string;
}

export default function Inventory() {
  const [filter, setFilter] = useState<InventoryFilter>(InventoryFilter.All);
  const [searchInput, setSearchInput] = useState<string>("");

  const query = useQuery({
    queryKey: ["products", filter],
    queryFn: () => getProducts(filter),
  });

  const filteredInventory = searchInput
    ? query.data?.filter((item) =>
        Object.values(item).some((value) =>
          value.toString().toLowerCase().includes(searchInput.toLowerCase())
        )
      )
    : query.data;

  function handleFilterChange(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const value = e.currentTarget.value;

    if (value in InventoryFilter) {
      const newState = value as keyof typeof InventoryFilter;
      setFilter(InventoryFilter[newState]);
    } else {
      console.log("Invalid filter value", value);
    }
  }

  return (
    <div className="w-full content-area">
      <div className="flex justify-between content-padding bg-lightPrimary border-top-bottom">
        <h2 className="page-title">Inventory</h2>
        <input
          type="text"
          placeholder="Search.."
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      <div className="content-padding">
        <div className="mb-3">
          <button
            className={
              filter === InventoryFilter.All
                ? "btn"
                : "empty-btn bg-lightPrimary"
            }
            onClick={handleFilterChange}
            value={InventoryFilter.All}
          >
            All products
          </button>
          <button
            className={
              filter === InventoryFilter.Available
                ? "btn"
                : "empty-btn bg-lightPrimary"
            }
            onClick={handleFilterChange}
            value={InventoryFilter.Available}
          >
            Available
          </button>
          <button
            className={
              filter === InventoryFilter.Unavailable
                ? "btn"
                : "empty-btn bg-lightPrimary"
            }
            onClick={handleFilterChange}
            value={InventoryFilter.Unavailable}
          >
            Reserved
          </button>
        </div>
        <table className="w-full inventory-list ">
          <thead className="bg-lightPrimary">
            <tr className="inventory-header">
              <td scope="col">
                {" "}
                <input type="checkbox"></input>
              </td>
              <td scope="col">Product ID</td>
              <td scope="col">Name</td>
              <td scope="col">
                <div className="list-heading">
                  <MdCategory className="mr-2" />
                  Category
                </div>
              </td>
              <td scope="col">
                <div className="list-heading">Status</div>
              </td>
              <td scope="col">
                <div>Quantity</div>
              </td>
              <td scope="col" className="list-heading">
                <div className="list-heading">
                  <FaUser className="mr-2" />
                  Actions
                </div>
              </td>
            </tr>
          </thead>
          <tbody>
            {filteredInventory &&
              filteredInventory.map((item) => (
                <InventoryItem key={item.id} item={item} />
              ))}
          </tbody>
        </table>
      </div>
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
      <td>
        {typeof item.quantity === "number" && item.quantity > 0 ? (
          <>
            <div className="circle green"></div> Available
          </>
        ) : (
          <>
            <div className="circle red"></div> Unavailable
          </>
        )}{" "}
      </td>
      <td>{item.quantity}</td>
      <td className="flex btn-group gap-2">
        <Link to={`/edit/${item.id}`} className="btn">
          Edit
        </Link>
        <button className="btn">Delete</button>
      </td>
    </tr>
  );
}
