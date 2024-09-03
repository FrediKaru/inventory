import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../inventoryItems";

import { FaUser } from "react-icons/fa";
import { MdCategory } from "react-icons/md";

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

enum InventoryFilter {
  All = "All",
  Available = "Available",
  Unavailable = "Unavailable",
}

export default function Inventory() {
  const [inventory, setInventory] = useState<InventoryItemProps[]>([]);
  const [filter, setFilter] = useState<InventoryFilter>(InventoryFilter.All);
  const [filteredInventory, setFilteredInventory] = useState(inventory);
  const [searchInput, setSearchInput] = useState<String>("this");

  function searchInventory(searchInput: string) {
    return filteredInventory.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchInput.toLowerCase())
      )
    );
  }

  function handleSearchInput(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const value = e.currentTarget.value;
    setSearchInput(value);
  }

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
  useEffect(() => {
    setFilteredInventory(inventory);
  }, [inventory]);
  useEffect(() => {
    if (searchInput === "") {
      setFilteredInventory(inventory);
    } else {
      const searchedItems = searchInventory(searchInput);
      setFilteredInventory(searchedItems);
    }
  });

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
    <div className="w-full content-area">
      <div className="flex justify-between content-padding bg-lightPrimary border-top-bottom">
        <h2 className="page-title">Inventory</h2>
        <input
          type="text"
          placeholder="Search.."
          onChange={handleSearchInput}
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
            {filter === InventoryFilter.All &&
              filteredInventory.map((item) => (
                <InventoryItem key={item.id} item={item} />
              ))}
            {filter === InventoryFilter.Available &&
              filteredInventory
                .filter((item) => item.quantity > 0)
                .map((item) => <InventoryItem key={item.id} item={item} />)}
            {filter === InventoryFilter.Unavailable &&
              filteredInventory
                .filter((item) => !item.quantity)
                .map((item) => <InventoryItem key={item.id} item={item} />)}
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
