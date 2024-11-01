import { FC, useEffect, useState } from "react";
import { BookingProps, InventoryItemProps } from "../routes/Inventory"; // Keep this if used for typing inventory
import { getProducts } from "../inventoryItems";

interface BookedProductsProps {
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  formData: BookingProps;
}

const BookedProducts: FC<BookedProductsProps> = ({ setFormData, formData }) => {
  const [inventory, setInventory] = useState<InventoryItemProps[]>([]);
  const [filteredItems, setFilteredItems] = useState<InventoryItemProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // To manage loading state

  // Fetch inventory on component mount
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const inventoryItems = await getProducts();
        setInventory(inventoryItems);
      } catch (e) {
        console.log("Fetching products is not possible!", e);
      } finally {
        setLoading(false)
      }
    };
    fetchInventory();
  }, []);

  // Filter items based on savedItems
  useEffect(() => {
    const filtered = inventory.filter((item) =>
      formData.savedItems.includes(item.id)
    );
    setFilteredItems(filtered);
  }, [inventory, formData.savedItems]);

  // Add product to booking
  const addProductToBooking = (id: number) => {
    if (!formData.savedItems.includes(id)) {
      // Prevent duplicates
      setFormData((prevData: BookingProps) => ({
        ...prevData,
        savedItems: [...prevData.savedItems, id],
      }));
    }
  };

  // Remove item from savedItems
  const removeItem = (id: number) => {
    const updatedArr = formData.savedItems.filter((item) => item !== id);
    setFormData((prevData: BookingProps) => ({
      ...prevData,
      savedItems: updatedArr,
    }));
  };

  return (
    <div>
      <h2 className="uppercase">All products</h2>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <ul>
          {inventory.map((item) => (
            <li key={item.id}>
              {item.name}{" "}
              <button onClick={() => addProductToBooking(item.id)}>Add</button>
            </li>
          ))}
        </ul>
      )}
      <h2 className="uppercase">Booked items</h2>
      <ul>
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <li key={item.id}>
              {item.name} <button onClick={() => removeItem(item.id)}>X</button>
            </li>
          ))
        ) : (
          <li>No items</li>
        )}
      </ul>
    </div>
  );
};

export default BookedProducts;
