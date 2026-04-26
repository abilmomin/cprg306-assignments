"use client";

import { useState } from "react";
import Item from "./item";

interface ItemType {
  id: string;
  name: string;
  quantity: number;
  category: string;
}

interface ItemListProps {
  items: ItemType[];
  onItemSelect: (itemName: string) => void;
}

export default function ItemList({ items, onItemSelect }: ItemListProps) {
  const [sortBy, setSortBy] = useState<"name" | "category" | "grouped">("name");

  const getSortedItems = () => {
    const itemsCopy = [...items];
    if (sortBy === "name") {
      return itemsCopy.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "category") {
      return itemsCopy.sort((a, b) => a.category.localeCompare(b.category));
    }
    return itemsCopy;
  };

  const getGroupedItems = () => {
    const grouped = items.reduce(
      (acc, item) => {
        const category = item.category;
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(item);
        return acc;
      },
      {} as Record<string, ItemType[]>,
    );

    // Sort categories alphabetically and sort items within each category
    return Object.entries(grouped)
      .sort(([catA], [catB]) => catA.localeCompare(catB))
      .map(([category, categoryItems]) => ({
        category,
        items: categoryItems.sort((a, b) => a.name.localeCompare(b.name)),
      }));
  };

  const sortedItems = getSortedItems();
  const groupedItems = getGroupedItems();

  return (
    <div>
      <div className="flex gap-3 mb-6 justify-center flex-wrap">
        <button
          onClick={() => setSortBy("name")}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            sortBy === "name"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          Sort by Name
        </button>
        <button
          onClick={() => setSortBy("category")}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            sortBy === "category"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          Sort by Category
        </button>
        <button
          onClick={() => setSortBy("grouped")}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            sortBy === "grouped"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          Group by Category
        </button>
      </div>

      {sortBy === "grouped" ? (
        <div className="space-y-6">
          {groupedItems.map(({ category, items: categoryItems }) => (
            <div key={category}>
              <h2 className="text-xl font-bold text-gray-800 mb-3 capitalize">
                {category}
              </h2>
              <ul className="space-y-3 p-4">
                {categoryItems.map((item) => (
                  <Item
                    key={item.id}
                    name={item.name}
                    quantity={item.quantity}
                    category={item.category}
                    onSelect={onItemSelect}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <ul className="space-y-3 p-4">
          {sortedItems.map((item) => (
            <Item
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              category={item.category}
              onSelect={onItemSelect}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
